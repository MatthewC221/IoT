import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavigationMenuItem extends Component {
    render() {
        let imgURL = "/image/" + this.props.img;
        let endpoint = (this.props.value === "home page") ? "/" : `/${this.props.value}`;

        // const iconStyle = {
        //     zIndex: 0
        // }

        const notifBubbleStyle = {
            position: "absolute",
            marginTop: -20,
            marginLeft: 33,
            backgroundColor: "red",
            width: 14,
            height: 14,
            borderRadius: 7,
            zIndex: 100,
            visibility: (this.props.value === 'device' && this.props.hasUnreadNotif) ? 'visible' : 'hidden'
        }

        return (
            <NavLink exact to={endpoint} className="nav-item">
                <img src={imgURL} alt={this.props.value} className="nav-icon" />
                <div style={notifBubbleStyle} />
                <div className="nav-label">{this.props.value}</div>
            </NavLink>
        );
    }
}

export default NavigationMenuItem;