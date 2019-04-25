import React, { Component } from 'react';
import { Notification } from './Notification';
import '../css/content.css';

export class NotificationContainer extends Component {

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

        const selectedNotif = this.props.selectedNotif;
        let markUp = {__html: ''};

        if (selectedNotif !== null) {
            markUp.__html = `
                <table>
                    <tr>
                        <th><b>Date:</b></th>
                        <td>${new Intl.DateTimeFormat("en-AU", optionsDate).format(selectedNotif.timestamp)}</td>
                    </tr>
                    <tr>
                        <th><b>Time:</b></th>
                        <td>${new Intl.DateTimeFormat("en-AU", optionsTime).format(selectedNotif.timestamp)}</td>
                    </tr>
                    <tr>
                        <th><b>Longitude:</b></th>
                        <td>FAKE</td>
                    </tr>
                    <tr>
                        <th><b>Latitude:</b></th>
                        <td>FAKE</td>
                    </tr>
                    <tr>
                        <th><b>Device ID:</b></th>
                        <td>${selectedNotif.devId}</td>
                    </tr>
                    <tr>
                        <th><b>Message:</b></th>
                        <td>${selectedNotif.message}</td>
                    </tr>
                 </table>
                 
                 <div class="action-buttons">
                    <button class="police-button">Alert Police</button>
                    <button class="alarm-button">Sound Alarm</button>
                    <button class="delete-button">Delete</button>
                </div>`
            }
        return markUp;
    }

    render() {
        const containerStyle = {
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-between",
        }

        const itemStyle = {
            backgroundColor: "#E2D5CA",
            height: 250,
            width: "48%",
            overflowY: "auto"
        }

        const infoStyle = {
            padding: 10
        }

        return (
            <div style={containerStyle}>
            
                <div style={itemStyle}>
                    {
                        (this.props.isLoading) ?
                        <div className="loading">Loading...</div> :
                        this.props.notifications.map((entry, index) => (
                            <div onClick={() => this.props.onClick(index)} key={index}>
                                <Notification notification={entry} />
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