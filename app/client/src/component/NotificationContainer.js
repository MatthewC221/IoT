import React, { Component } from 'react';
import Notification from './Notification';

class NotificationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentNotif: null
        }

        this.getInfo = this.getInfo.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
    }

    getInfo() {
        const optionsDate = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Australia/Sydney',
            timeZoneName: 'short'};

        const currentNotif = this.state.currentNotif;
        let markUp = {__html: ''};

        if (currentNotif !== null) {

            markUp.__html = `
                <b>Date:</b> ${new Intl.DateTimeFormat("en-AU", optionsDate).format(currentNotif.timestamp)}<br>
                <b>Time:</b> ${new Intl.DateTimeFormat("en-AU", optionsTime).format(currentNotif.timestamp)}<br>
                <b>Longitude:</b> FAKE<br>
                <b>Latitude</b> FAKE<br>
                <b>Device ID:</b> FAKE<br>
                <b>Message:</b> ${currentNotif.message}`
        }
        return markUp;
    }

    handleNotificationClick(notifIndex) {
        this.setState({
            currentNotif: this.props.notifications[notifIndex]
        })
    }

    render() {
        const containerStyle = {
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between"
        }

        const itemStyle = {
            backgroundColor: "#E2D5CA",
            minHeight: 500,
            width: "48%",
        }

        const infoStyle = {
            padding: 10,
        }

        return (
            <div style={containerStyle}>
            
                <div style={itemStyle}>
                    {
                        this.props.notifications.map((entry, index) => (
                            <div onClick={() => this.handleNotificationClick(index)}>
                                <Notification notification={entry} key={index} />
                            </div>
                        ))
                    }
                </div>

                <div style={itemStyle}>
                    <div style={infoStyle} dangerouslySetInnerHTML={this.getInfo()} />
                </div>
            </div>
        )
    }
}

export default NotificationContainer;