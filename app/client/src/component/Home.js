import React from 'react';
import MemberProfile from './MemberProfile';
import config from '../config';
import '../css/content.css';

export function Home(props) {
    const memberProfileContainerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    }

    return (
        <div className="content">
            <h1>{config.productConfig.name}</h1>
            <div className="section">
                Welcome to the {config.productConfig.name} Hub, an ecosystem of IoT technology for farmers and other agriculture actors.
            </div>
            <div className="section-heading">ABOUT US</div>
            <hr />
            <div className="section">
                With the guidance of Max Girault of Fleet Space Technologies, we are Computer Science and Software Engineering students at the University of New South Wales, Australia.
            </div>
            <div style={memberProfileContainerStyle}>
                {
                    props.profiles.map((entry, index) => (
                        <MemberProfile profile={entry} key={index} />
                    ))
                }
            </div>
        </div>
    )
}