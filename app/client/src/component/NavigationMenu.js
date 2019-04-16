import React, { Component } from 'react';
import NavigationMenuItem from './NavigationMenuItem';
import '../css/NavigationMenu.css';

class NavigationMenu extends Component {
    render() {
        let menuItemsInfo = [
            {name: "home page", icon: "home_heart.png"},
            {name: "device", icon: "camera.png"},
            {name: "manage", icon: "contract.png"},
            {name: "store", icon: "coin.png"},
            {name: "account", icon: "key.png"}
        ];

        let menuItems = [];
        for (let item of menuItemsInfo) {
            menuItems.push(<NavigationMenuItem
                value={item.name}
                img={item.icon}
                key={item.name} />);
        }

        return (
            <div className="navigation">
                {menuItems}
            </div>
        )
    }
}

export default NavigationMenu;