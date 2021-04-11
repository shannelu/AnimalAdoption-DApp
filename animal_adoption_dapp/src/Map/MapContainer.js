import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {getAllAnimalsInfo} from './map_middleware'
import CurrentLocation from './Map';
import Agent from '../Agent/Agent';

var agent = new Agent(null,null);
export class MapContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: {},
        readyJump: false,
        myAgent : null,
        animals: []
      };
  }
  

  onMarkerClick = (props, marker, e) =>{
    var lat = localStorage.getItem('lat');
    var lng = localStorage.getItem('lng');
    console.log(lat,lng);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  jumpClick(){
    this.setState({
      readyJump: true
    })
  }

  async componentDidMount(){
    await agent.initialize()
    agent.uuid = localStorage.getItem(agent.myAccount)
    var temp;
    var getResult = await agent.getAnimalNearBy()
    var lat = localStorage.getItem("lat")
    var lng = localStorage.getItem("lng")
    temp = [{
        title:"Post Animal",
        position: {lat:lat, lng:lng},
        imageBase64: null
    }];
    if (getResult.length != 0) {
        console.log(getResult);
        var i;
        for (i = 0; i < getResult.length; i++) {
          if (getResult[i].status === "MISSING") {
            temp.push({
              title: getResult[i].title,
              position: {lat:getResult[i].latitude, lng:getResult[i].longitude},
              imageBase64: getResult[i].imageBase64
            });
          }
          
        } 
    }
    
    this.setState({
      myAgent : agent,
      animals: temp
    })
  }

  render() {
    return (
      <div>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
        >

          {/* <Marker onClick={this.onMarkerClick} name="I am here" id="hello7"/> */}
          
          {this.state.animals.map((animal, index) => (
            <Marker
              key={index} // Need to be unique
              onClick={this.onMarkerClick}
              name={animal.title}
              position={animal.position}
              id = {`animal_marker_${index - 1}`}
              imageBase64 = {animal.imageBase64}
            >
            </Marker>
          ))}

          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
          >
            
            <div align="center">
              {
                this.state.activeMarker != null && this.state.activeMarker.name != "Post Animal" ?  
                <img width="80" height="80" alt="star" src={this.state.activeMarker.imageBase64}/> : ""
              }
            </div>
            <div align="center">
              {
                this.state.activeMarker != null && this.state.activeMarker.name != "Post Animal" ?  
                <a href={'/animalinfo/'+this.state.activeMarker.id}><font size="3">{this.state.activeMarker.name}</font></a> : ""
              }
            </div>
              {
                this.state.activeMarker != null && this.state.activeMarker.name == "Post Animal" ?  
                <a href={'/post'}><font size="5">{this.state.activeMarker.name}</font></a> : ""
              }
          </InfoWindow>
        </CurrentLocation>
      </div>
            
    );

}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgao-aq8zyAUnJUCg335-tYIDAI5AJeAc'
})(MapContainer);