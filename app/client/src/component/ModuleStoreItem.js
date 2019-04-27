import React, { Component } from 'react';
import '../css/content.css';

class ModuleStoreItem extends Component {
    constructor(props) {
        super(props);

        this.subscribed = this.props.module.price === 0;

        this.state = {
            hover: false,
        }

        this.handleHover = this.handleHover.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
    }

    handleHover() {
        this.setState({hover: !this.state.hover});
    }

    handleSubscribe() {
        if (!this.subscribed) {
            document.getElementById(`subscribe-button-${this.props.module.name}`).innerHTML = `You are now subscribed!`;
        } else {
            document.getElementById(`subscribe-button-${this.props.module.name}`).innerHTML = `You have unsubscribed`;
        }
        this.subscribed = !this.subscribed;
    }

    renderOverlay() {
        const hoverStyle = {
            backgroundColor: "#000000",
            opacity: 0.6,
            zIndex: 100,
            visibility: this.state.hover ? "visible" : "hidden",
            color: "#ffffff",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 10
        }

        const buttonStyle = {
            top: "50%",
            margin: "auto",
            backgroundColor: "#fffcf9",
            position: "relative",
            transform: "translateY(-50%)",
            borderRadius: 7,
            color: "#000000",
            fontSize: 20,
            fontWeight: "bold",
            padding: 5,
            width: 170,
            textAlign: "center",
            cursor: "pointer"
        }

        return (
            <div style={hoverStyle}>
                <div style={buttonStyle} id={`subscribe-button-${this.props.module.name}`} onClick={this.handleSubscribe}>
                    {this.subscribed ? "Unsubscribe from Module" : "Subscribe to Module"}
                </div>
            </div>
        )
    }

    render() {
        const itemContainerStyle = {
            width: 300,
            height: 370,
            marginBottom: 30,
            position: "relative"
        }

        const flexContainerStyle = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            zIndex: 0
        }

        const imageStyle = {
            width: 250,
            height: 250,
            margin: "auto",
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

        const imgURL = `image/${this.props.module.img}`;

        return (
            <div style={itemContainerStyle} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                <div style={flexContainerStyle}>
                    <img src={imgURL} style={imageStyle} alt={imgURL} />
                    <div style={nameStyle}>{this.props.module.name}</div>
                    <div style={descriptionStyle}>{this.props.module.description}</div>
                    <div>
                        {this.props.module.price === 0 ? "Already subscribed to module." : `$${this.props.module.price} / month`}
                    </div>
                </div>
                {this.renderOverlay()}
            </div>
        )
    }
}

export default ModuleStoreItem;