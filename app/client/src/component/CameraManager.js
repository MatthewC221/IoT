import React, { Component } from 'react';
// import config from '../config';
import '../css/content.css';

class CameraManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            timestamp: null,
        };

        this.getTTNConnection = this.getTTNConnection.bind(this);
        this.getMessage = this.getMessage.bind(this);

    }

    getTTNConnection() {
        fetch('/ttn')
        .then(res => res.json())
        .then(payload => {
            console.log(payload);
            this.setState({
                timestamp: new Date(payload.timestamp),
                message: payload.message
            })
        })
        // .then(res => {
        //     console.log(res);
        //     return res.json()
        // })
        // .then(payload => {
        //     console.log(payload.toString());
        //     this.setState({payload: payload.toString()})
        // });
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

        return (
            <div className="content">
                <h1>Your Device</h1>
                <div className="section-heading">COMING SOON...</div>
                <hr />
                <div className="section">
                    {this.getMessage()}
                </div>
            </div>
        )
    }
}

export default CameraManager;