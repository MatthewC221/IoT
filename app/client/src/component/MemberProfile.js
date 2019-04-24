import React from 'react';

function MemberProfile(props) {
    const memberProfileStyle = {
        width: 200,
        display: "flex",
        flexFlow: "column wrap",
        marginBottom: 30
    }

    const imageStyle = {
        width: 200,
        height: 200,
        margin: "auto",
        marginTop: 5,
        marginBottom: 15,
    }

    const nameStyle = {
        textAlign: "center",
        fontSize: 20,
        letterSpacing: -1
    }

    const descriptionStyle = {
        textAlign: "justify"
    }

    const profile = props.profile;

    return (
        <div style={memberProfileStyle}>
            <div style={nameStyle}>{profile.name.toUpperCase()}</div>
            <img src={`image/headshots/${profile.img}`} style={imageStyle} alt={`${profile.name}`} />
            <div style={descriptionStyle}>{profile.description}</div>
        </div>
    )
}

export default MemberProfile;