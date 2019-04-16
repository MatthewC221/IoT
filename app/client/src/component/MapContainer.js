import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
 
export class MapContainer extends Component {
    render() {
        const mapStyle = {
            position: "relative",
            height: 500,
            width: 300
        }

        const centre = {
            lat: -33.9173,
            lng: 151.2313
        }

        return (
        <Map style={mapStyle} initialCenter={centre} google={this.props.google} zoom={15}>
    
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
    
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                <h1>Hi</h1>
                </div>
            </InfoWindow>
        </Map>
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: "AIzaSyCCcrMNsAZnLxERQxNyY-W3aUMxb6U0jeU"
})(MapContainer)