import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavigationMenuItem extends Component {
    render() {
        let imgURL = "/image/" + this.props.img;
        let endpoint = (this.props.value === "home page") ? "/" : `/${this.props.value}`;

        return (
            <NavLink exact to={endpoint} className="nav-item">
                <img src={imgURL} alt={this.props.value} className="nav-icon" />
                <div className="nav-label">{this.props.value}</div>
            </NavLink>
        );
    }
}

export default NavigationMenuItem;