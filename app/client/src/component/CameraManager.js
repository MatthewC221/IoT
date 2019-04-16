import React, { Component } from 'react';
import MapContainer from './MapContainer';
// import config from '../config';
import '../css/content.css';
import NotificationContainer from './NotificationContainer'


class CameraManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [
                {
                    message: "tester",
                    timestamp: new Date()
                }
            ]
        }

        this.getTTNConnection = this.getTTNConnection.bind(this);
        this.getMessage = this.getMessage.bind(this);

    }

    handleNewNotification(notification) {
        const updatedNotifList = this.state.notifications.slice();
        updatedNotifList.push(notification);
        this.setState({
            notifications: updatedNotifList
        });
    }

    getTTNConnection() {
        fetch('/ttn')
        .then(res => res.json())
        .then(payload => {
            console.log(payload);
            this.handleNewNotification({
                timestamp: new Date(payload.timestamp),
                message: payload.message
            })
        })
        .catch(err => console.error(err));
    };

    getMessage() {
        if (this.state.message === null) {
            return 'No new notifications.';
        } else {
            return `Message received at ${this.state.timestamp.toLocaleString()}: ${this.state.message}`;
        }
    }

    render() {
        this.getTTNConnection();

        const sectionStyle = {

        }

        return (
            <div className="content">
                <h1>Your Device</h1>
                <div className="section-heading">NOTIFICATIONS</div>
                <hr />
                <div className="section" style={sectionStyle}>
                    <NotificationContainer notifications={this.state.notifications}/>
                </div>
            </div>
        )
    }
}

export default CameraManager;