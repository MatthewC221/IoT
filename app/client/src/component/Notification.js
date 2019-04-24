import React, { Component } from 'react';
import '../css/Notification.css';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            read: false,
            timestamp: null,
            message: null
        }

        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleHover() {
        this.setState({hover: !this.state.hover})
    }

    handleClick() {
        this.setState({read: !this.state.read});
    }

    render() {
        let bgColour = "transparent";
        if (!this.state.read) {
            bgColour = "#BDD299";
        } else if (this.state.hover) {
            bgColour = "#D1C6B9";
        }

        const notificationStyle = {
            backgroundColor: bgColour,
            padding: 10
        }

        return (
            <div className="notification" style={notificationStyle} onClick={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                Message received: <b>{this.props.notification.message}</b> at <b>{this.props.notification.timestamp.toLocaleString()}</b>
            </div>
        )
    }
}

export default Notification;
