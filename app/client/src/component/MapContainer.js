import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../css/map.css';
 
export class MapContainer extends Component {
    render() {
        const mapStyle = {
            marginTop: 30
        }

        const centre = {
            lat: -33.9173,
            lng: 151.2313
        }

        if (this.props.selectedNotif) {
            centre.lat = this.props.selectedNotif.lat;
            centre.long = this.props.selectedNotif.long;
        }

        console.log(this.props.selectedNotif);

        return (
        <Map style={mapStyle} className="map" initialCenter={centre} google={this.props.google} zoom={15}>
            {
                this.props.selectedNotif ?
                <Marker
                    title={`Sighting at ${this.props.selectedNotif.timestamp.toLocaleString()}`}
                    position={{lat: centre.lat, lng: centre.long}}
                /> :
                null
            }
        </Map>
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: "AIzaSyCCcrMNsAZnLxERQxNyY-W3aUMxb6U0jeU"
})(MapContainer)