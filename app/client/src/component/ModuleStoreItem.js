import React, { Component } from 'react';
// import config from '../config';
import '../css/content.css';

class ModuleStoreItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }

        this.handleHover = this.handleHover.bind(this);
    }

    handleHover() {
        this.setState({hover: !this.state.hover});
    }

    render() {
        const itemContainerStyle = {
            width: 300,
            display: "flex",
            flexFlow: "column wrap",
            marginBottom: 30
        }

        const imageStyle = {
            width: 250,
            height: "auto",
            paddingLeft: 10,
            paddingRight: 10,
            margin: "auto",
            marginTop: 15,
        }

        const nameStyle = {
            fontWeight: "bold",
            textAlign: "center",
            margin: "10px 0px 10px 0px",
            fontSize: 20,
            letterSpacing: "-1px"
        }

        const descriptionStyle = {
            textAlign: "justify",
            marginBottom: 10
        }

        const priceStyle = {

        }

        // const hoverStyle = {
        //     backgroundColor: "#000000",
        //     opacity: 0.6,
        //     zIndex: 100,
        //     visibility: this.state.hover ? "visible" : "hidden",
        //     color: "#ffffff",
        //     width: "100%",
        //     height: "100%",
        //     position: "relative"
        // }

        const imgURL = `image/${this.props.module.img}`;

        return (
            <div style={itemContainerStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                <img src={imgURL} style={imageStyle} alt={imgURL} />
                <div style={nameStyle}>{this.props.module.name}</div>
                <div style={descriptionStyle}>{this.props.module.description}</div>
                <div style={priceStyle}>${this.props.module.price}/month</div>
            </div>
        )
    }
}

export default ModuleStoreItem;