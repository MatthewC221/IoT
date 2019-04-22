import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import Home from './Home';
import CameraManager from './CameraManager';
import ModuleManager from './ModuleManager';
import Store from './Store';
import AccountManager from './AccountManager';

class Main extends Component {
    constructor(props) {
        super(props);

        this.menuItems = [
            {name: "home page", icon: "home_heart.png"},
            {name: "device", icon: "camera.png"},
            {name: "manage", icon: "contract.png"},
            {name: "store", icon: "coin.png"},
            {name: "account", icon: "key.png"}
        ];

        this.storeModules = [
            {
                name: 'Animal Count',
                img: 'duck.png',
                description: "Count the number of animals within the camera's vision by species.",
                price: 400
            },
            {
                name: 'Animal Identification',
                img: 'cow.png',
                description: "Identify animals by species.",
                price: 200
            },
            {
                name: 'Vehicle Identification',
                img: 'pickup-truck.png',
                description: "Identify vehicles by model, make, colour and number plate.",
                price: 500
            }
        ]

        this.state = {
            notifications: [
                {
                    message: "tester",
                    timestamp: new Date()
                }
            ]
        }

        this.getTTNConnection = this.getTTNConnection.bind(this);

    }

    handleNewNotification(notification) {
        let updatedNotifList = this.state.notifications.slice();
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

    render() {
        this.getTTNConnection();

        return (
            <BrowserRouter>
                <div>
                    <NavigationMenu menuItems={this.menuItems} />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/device" component={() => <CameraManager notifications={this.state.notifications} />} />
                            <Route path="/manage" component={ModuleManager} />
                            <Route path="/store" component={() => <Store modules={this.storeModules} />} />
                            <Route path="/account" component={AccountManager} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }    
}

export default Main;