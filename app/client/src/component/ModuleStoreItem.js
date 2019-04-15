import React from 'react';
// import config from '../config';
import '../css/content.css';

function ModuleStoreItem(props) {
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

    const imgURL = `image/${props.module.img}`;

    return (
        <div style={itemContainerStyle}>
            <img src={imgURL} style={imageStyle} />
            <div style={nameStyle}>{props.module.name}</div>
            <div style={descriptionStyle}>{props.module.description}</div>
            <div style={priceStyle}>${props.module.price}/month</div>
        </div>
    )
}

export default ModuleStoreItem;