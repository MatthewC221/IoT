import React from 'react';

function MemberProfile(props) {
    const memberProfileStyle = {
        width: 300,
        display: "flex",
        flexFlow: "column wrap",
        marginBottom: 30
    }

    const imageStyle = {
        border: "1px solid #808080",
        width: 250,
        height: "auto",
        paddingTop: 10,
        margin: "auto",
        marginTop: 15,
        marginBottom: 15,
    }

    const nameStyle = {
        fontWeight: "bold",
        textAlign: "center",
    }

    const descriptionStyle = {
        textAlign: "justify"
    }

    return (
        <div style={memberProfileStyle}>
            <div style={nameStyle}>{props.name}</div>
            <img src="image/unknown_identity.png" style={imageStyle} alt={`${props.name}`} />
            <div style={descriptionStyle}>{props.description}</div>
        </div>
    )
}

export default MemberProfile;