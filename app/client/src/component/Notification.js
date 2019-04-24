import React from 'react';
import '../css/Notification.css';

export function Notification(props) {
    const notif = props.notification;

    let bgColour = "transparent";
    if (!notif.read) {
        bgColour = "#BDD299";
    }
    // hover colour if re-implementing later: #D1C6B9

    const notificationStyle = {
        backgroundColor: bgColour,
        padding: 10
    }

    return (
        <div className="notification" style={notificationStyle} >
            Sighting at <b>{notif.timestamp.toLocaleString()}</b>
        </div>
    )
}