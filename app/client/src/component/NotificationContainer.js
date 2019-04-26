import React, { Component } from 'react';
import { Notification } from './Notification';
import '../css/content.css';

export class NotificationContainer extends Component {

    render() {
        const optionsDate = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Australia/Sydney',
            timeZoneName: 'short'
        }

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
                            <div 
                                onClick={() => this.props.onClick(index, entry.ID)} 
                                key={index}
                            >
                                <Notification notification={entry} />
                            </div>
                        ))
                    }
                </div>

                <div style={itemStyle}>
                    <div style={infoStyle}>
                    {   this.props.selectedNotif !== null &&    
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th><b>Date:</b></th>
                                        <td>{new Intl.DateTimeFormat("en-AU", optionsDate).format(this.props.selectedNotif.timestamp)}</td>
                                    </tr>
                                    <tr>
                                        <th><b>Time:</b></th>
                                        <td>{new Intl.DateTimeFormat("en-AU", optionsTime).format(this.props.selectedNotif.timestamp)}</td>
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
                                        <td>{this.props.selectedNotif.devId}</td>
                                    </tr>
                                    <tr>
                                        <th><b>Message:</b></th>
                                        <td>{this.props.selectedNotif.message}</td>
                                    </tr>
                                </tbody>
                             </table>
                             
                             <div className="action-buttons">
                                <button className="police-button">Alert Police</button>
                                <button className="alarm-button">Sound Alarm</button>
                                <button onClick={() => this.props.onDelete(this.props.selectedNotif.ID)} className="delete-button">Delete</button>
                            </div>
                        </div>
                    }
                    </div>
                </div>

            </div>
        )
    }
}
