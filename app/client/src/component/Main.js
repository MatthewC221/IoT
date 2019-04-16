import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import Home from './Home';
import CameraManager from './CameraManager';
import ModuleManager from './ModuleManager';
import Store from './Store';
import AccountManager from './AccountManager';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationMenu />
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/device" component={CameraManager} />
                            <Route path="/manage" component={ModuleManager} />
                            <Route path="/store" component={Store} />
                            <Route path="/account" component={AccountManager} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }    
}

export default Main;