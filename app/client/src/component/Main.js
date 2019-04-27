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
            user: config.userProfile,
            notifications: [],
            selectedNotif: null,
            isLoading: false,
            isListening: false
        }

        this.toggleEmailSwitch = this.toggleEmailSwitch.bind(this);
        this.togglePhoneSwitch = this.togglePhoneSwitch.bind(this);
    }

    toggleEmailSwitch() {
        const updatedUser = this.state.user;
        updatedUser.notif.email = !this.state.user.notif.email;
        this.setState({
            user: updatedUser
        })
    }

    togglePhoneSwitch() {
        const updatedUser = this.state.user;
        updatedUser.notif.phone = !this.state.user.notif.phone;
        this.setState({
            user: updatedUser
        })
    }

    handleNewNotification(notification) {
        let updatedNotifList = this.state.notifications.slice();
        updatedNotifList.unshift(notification);
        this.setState({
            notifications: updatedNotifList
        });
    }

    handleDeleteNotif(ID) {
        var data = {ID: ID};
        fetch('/DB/remove', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then((res) => {
                console.log("notif deleted")
            })
            .catch((err) => {
                console.log(err)
            })
        var updatedNotifications = this.state.notifications.filter((notif) => {
            return notif.ID !== ID;
        })
        this.setState({
            notifications: updatedNotifications,
            selectedNotif: null
        });
    }

    hasUnreadNotification() {
        for (let notification of this.state.notifications) {
            if (!notification.read) return true;
        }
        return false;
    }

    handleNotificationClick(i, ID) {
        let updatedNotifList = this.state.notifications.slice();
        //only update with db if the notif hasnt been read before
        if (!updatedNotifList[i].read) {
            updatedNotifList[i].read = true;
            this.setState({
                notifications: updatedNotifList,
                selectedNotif: updatedNotifList[i]
            })
            var data = {
                ID: ID,
                read: true
            }
            fetch('/DB/read', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
                .then((res) => {
                    console.log("read updated")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.setState({
                selectedNotif: updatedNotifList[i]
            })
        }
    }

    getStoredMessages() {
        this.setState({isLoading: true});
        fetch('/DB/get')
            .then(res => res.json())
            .then(msgs => {
                var prep = [];
                for (var i = 0; i < msgs.length; ++i) {
                    prep.push({
                        ID: msgs[i].ID,
                        timestamp: new Date(msgs[i].timestamp),
                        long: msgs[i].long,
                        lat: msgs[i].lat,
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
        if(!this.state.isListening){
            console.log("listening to ttn")
            this.setState({isListening: true});
            fetch('/ttn')
            .then(res => res.json())
            .then(payload => {
                console.log(payload);
                this.handleNewNotification({
                    ID: payload.ID,
                    timestamp: new Date(payload.timestamp),
                    long: payload.long,
                    lat: payload.lat,
                    message: payload.message,
                    devId: payload.devId,
                    read: false
                })
                this.setState({isListening: false});
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    componentDidMount() {
        this.getStoredMessages();
    }

    render() {
        // produces a warning because updating state from within render
        this.getTTNConnection();

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
                                onClick={(i, ID) => this.handleNotificationClick(i, ID)}
                                onDelete={(ID) => this.handleDeleteNotif(ID)}
                                isLoading={this.state.isLoading}
                            />} />
                            <Route path="/manage" component={ModuleManager} />
                            <Route path="/store" component={() => <Store modules={config.storeModules} />} />
                            <Route path="/account" component={() => <AccountManager
                                user={this.state.user}
                                toggleEmailSwitch={this.toggleEmailSwitch}
                                togglePhoneSwitch={this.togglePhoneSwitch}
                            />} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Main;
