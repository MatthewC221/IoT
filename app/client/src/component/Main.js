import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import { Home } from './Home';
import { CameraManager } from './CameraManager';
import ModuleManager from './ModuleManager';
import Store from './Store';
import AccountManager from './AccountManager';
import config from '../config';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            selectedNotif: null,
            isLoading: false,
            isListening: false
        }
    }

    hasUnreadNotification() {
        for (let notification of this.state.notifications) {
            if (!notification.read) return true;
        }
        return false;
    }

    handleNewNotification(notification) {
        let updatedNotifList = this.state.notifications.slice();
        updatedNotifList.unshift(notification);
        this.setState({
            notifications: updatedNotifList
        });
    }

    handleNotificationClick(i) {
        let updatedNotifList = this.state.notifications.slice();
        updatedNotifList[i].read = true;
        this.setState({
            notifications: updatedNotifList,
            selectedNotif: updatedNotifList[i]
        })
    }

    getStoredMessages() {
        this.setState({isLoading: true});
        fetch('/DBget')
            .then(res => res.json())
            .then(msgs => {
                var prep = [];
                for (var i = 0; i < msgs.length; ++i) {
                    prep.push({
                        timestamp: new Date(msgs[i].timestamp),
                        message: msgs[i].message,
                        devId: (msgs[i].devId === undefined) ? "2D6349IO2" : msgs[i].devId,
                        read: (msgs[i].read === undefined) ? false : msgs[i].read 
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
                return this.setState({
                    notifications: prep,
                    isLoading: false
                });
            })
            .catch((err) => console.log(err));
    }

    getTTNConnection() {
        this.setState({isListening: true});
        fetch('/ttn')
        .then(res => res.json())
        .then(payload => {
            console.log(payload);
            this.handleNewNotification({ 
                timestamp: new Date(payload.timestamp),
                message: payload.message,
                devId: payload.devId,
                read: false
            })
            this.setState({isListening: false});
        })
        .catch(err => console.error(err));
    };

    componentDidMount() {
        this.getStoredMessages();
    }

    render() {
        // produces a warning because updating state from within render
        if (!this.state.isListening) this.getTTNConnection();

        return (
            <BrowserRouter>
                <div>
                    <NavigationMenu menuItems={config.menuItems} showNotifBubble={this.hasUnreadNotification()} />
                    <div>
                        <Switch>
                            <Route exact path="/" component={() => <Home profiles={config.memberProfiles} />} />
                            <Route path="/device" component={() => <CameraManager
                                notifications={this.state.notifications}
                                selectedNotif={this.state.selectedNotif}
                                onClick={(i) => this.handleNotificationClick(i)}
                                isLoading={this.state.isLoading}
                            />} />
                            <Route path="/manage" component={ModuleManager} />
                            <Route path="/store" component={() => <Store modules={config.storeModules} />} />
                            <Route path="/account" component={AccountManager} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Main;