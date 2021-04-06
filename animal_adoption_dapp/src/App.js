import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import CurrentLocation from './Map/Map';

const mapStyles = {
  width: '100%',
  height: '100%'
};


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    let markers = [ // Just an example this should probably be in your state or props. 
      {
        name: "marker1",
        position: { lat: 49.246292, lng: -123.116226 },
        url:'http://www.google.com/'
      },
      {
        name: "marker2",
        position: { lat: 49.166592, lng: -123.133568 },
        url:'https://www.youtube.com/'
      },
      {
        name: "marker3",
        position: { lat: 49.267132, lng: -122.968941 },
        url:'https://www.ubc.ca/'
      }
    ];

    return (
      // <CurrentLocation
      //   centerAroundCurrentLocation
      //   google={this.props.google}
      // ></CurrentLocation>
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={
          {
            lat: 49.246292,
            lng: -123.116226
          }
        }
      >

      {markers.map((marker, index) => (
        <Marker
          key={index} // Need to be unique
          onClick={this.onMarkerClick}
          name={marker.name}
          position={marker.position}
          url={marker.url}
        />
      ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
        <div>
          <h4><a href={this.state.selectedPlace.url}>{this.state.selectedPlace.name}</a></h4>
        </div>
    </InfoWindow>

      </Map>
      // </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgao-aq8zyAUnJUCg335-tYIDAI5AJeAc'
})(MapContainer)





