// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import {getAllAnimalsInfo} from './map_middleware'


// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };


// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {}
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });

//   onClose = props => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };

//   render() {
//     // postAnAnimalInfo("julia", "https://www.ubc.ca/");
//     let markers = getAllAnimalsInfo();

//     // navigator.geolocation.getCurrentPosition(function(position) {
//     //   const initial_latitude = position.coords.latitude;
//     //   const initial_longitude = position.coords.longitude;
//     //   console.log("Latitude is :", position.coords.latitude);
//     //   console.log("Longitude is :", position.coords.longitude);
//     // });


//     return (
//       // <CurrentLocation
//       //   centerAroundCurrentLocation
//       //   google={this.props.google}
//       // ></CurrentLocation>
//       <Map
//         google={this.props.google}
//         zoom={12}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: 49.246292,
//             lng: -123.116226
//           }
//         }
//       >

//       {markers.map((marker, index) => (
//         <Marker
//           key={index} // Need to be unique
//           onClick={this.onMarkerClick}
//           name={marker.name}
//           position={marker.position}
//           url={marker.url}
//         />
//       ))}
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//         <div>
//           <h4><a href={this.state.selectedPlace.url}>{this.state.selectedPlace.name}</a></h4>
//         </div>
//         </InfoWindow>

//       </Map>
//       // </CurrentLocation>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyBgao-aq8zyAUnJUCg335-tYIDAI5AJeAc'
// })(MapContainer)

import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {getAllAnimalsInfo} from './map_middleware'
import CurrentLocation from './Map';
import { Redirect, Link} from 'react-router-dom';
import {Button, Form, Switch} from 'antd';

const animals = getAllAnimalsInfo();

export class MapContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: {},
        readyJump: false
      };
  }
  

  onMarkerClick = (props, marker, e) =>{
    console.log(this.state.activeMarker)
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

  

  render() {
    return (
      <div>

        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
        >

          <Marker onClick={this.onMarkerClick} name="I am here" id="hello7"/>
          {animals.map((animal, index) => (
            <Marker
              key={index} // Need to be unique
              onClick={this.onMarkerClick}
              name={animal.name}
              position={animal.position}
              // url={animal.url}
              id = {`animal_marker_${index}`}
            >
            </Marker>
          ))}

          

          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
            {
              this.state.activeMarker != null ?  
              <a href={'/animalinfo/'+this.state.activeMarker.id}>jump</a> : ""
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