import React, { Component } from 'react';
import Notification from './Notification';

class NotificationContainer extends Component {
    render() {
        const containerStyle = {
            backgroundColor: "#E2D5CA",
            minHeight: 500
        }

        return (
            <div style={containerStyle}>
                {
                    this.props.notifications.map((entry, index) => (
                        <Notification notification={entry} key={index}/>
                    ))
                }
            </div>
        )
    }
}

export default NotificationContainer;
