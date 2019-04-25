import React from 'react';
import { NotificationContainer } from './NotificationContainer';
import MapContainer from './MapContainer';
import '../css/content.css';

export function CameraManager(props) {
    const sectionStyle = {

    }

    return (
        <div className="content">
            <h1>Your Device</h1>
            <div className="section-heading">NOTIFICATIONS</div>
            <hr />
            <div className="section" style={sectionStyle}>
                <NotificationContainer {...props} />
                <MapContainer selectedNotif={props.selectedNotif} />
            </div>
        </div>
    )

}