import React from 'react';
import NavigationMenuItem from './NavigationMenuItem';
import '../css/NavigationMenu.css';

function NavigationMenu(props) {
    return (
        <div className="navigation">
            {
                props.menuItems.map(item => (
                    <NavigationMenuItem
                        value={item.name}
                        img={item.icon}
                        key={item.name}
                        showNotifBubble={item.name === 'device' && props.showNotifBubble}
                    />
                ))
            }
        </div>
    )
}

export default NavigationMenu;