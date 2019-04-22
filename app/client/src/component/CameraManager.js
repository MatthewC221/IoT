import React, { Component } from 'react';
import MapContainer from './MapContainer';
// import config from '../config';
import '../css/content.css';
import NotificationContainer from './NotificationContainer'


class CameraManager extends Component {
    render() {

        const sectionStyle = {

        }

        return (
            <div className="content">
                <h1>Your Device</h1>
                <div className="section-heading">NOTIFICATIONS</div>
                <hr />
                <div className="section" style={sectionStyle}>
                    <NotificationContainer notifications={this.props.notifications}/>
                </div>
            </div>
        )
    }
}

export default CameraManager;