import React, { Component } from 'react';
import MapContainer from './MapContainer';
// import config from '../config';
import '../css/content.css';
import NotificationContainer from './NotificationContainer';

class CameraManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: null
        }

        this.getTTNConnection = this.getTTNConnection.bind(this);
        this.getStoredMessages = this.getStoredMessages.bind(this);

    }

    handleNewNotification(notification) {
        let updatedNotifList = this.state.notifications.slice();
        updatedNotifList.unshift(notification);
        this.setState({
            notifications: updatedNotifList
        });
    }

    //called once only when the page is loaded
    getStoredMessages(){
        fetch('/DBget')
            .then((res) => res.json())
            .then((msgs) => {
                var prep = [];
                for (var i=0;i<msgs.length;++i) {
                    console.log(msgs[i]);
                    prep.push({
                        timestamp: new Date(msgs[i].timestamp),
                        message: msgs[i].message,
                    })
                } 
                prep = prep.sort((msg1,msg2) => {
                    if (msg1.timestamp > msg2.timestamp)
                        return -1;
                    else if (msg1.timestamp < msg2.timestamp)
                        return 1;
                    else 
                        return 0;
                })
                // initialize notifications array with loaded messages
                return this.setState({notifications: prep});
            })
            .catch((err) => console.log(err));
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

    componentDidMount() {
        this.getStoredMessages();
    }

    render() {
        const sectionStyle = {

        }

        if (this.state.notifications != null){
            this.getTTNConnection();
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
        } else {
            return (
                <div className="content">
                    <h1>Your Device</h1>
                    <div className="section-heading">NOTIFICATIONS</div>
                    <hr />
                    <div className="section" style={sectionStyle}>
                        <NotificationContainer notifications={[]}/>
                    </div>
                </div>
            )

        }
    }
}

export default CameraManager;
