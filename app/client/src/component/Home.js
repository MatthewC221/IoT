import React, { Component } from 'react';
import MemberProfile from './MemberProfile';
import config from '../config';
import '../css/content.css';

class Home extends Component {
    render() {
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
                <div className="flex-box-horizontal">
                    <MemberProfile name="Max Girault" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                    <MemberProfile name="Matthew Chen" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                    <MemberProfile name="Hugo Cheng" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                    <MemberProfile name="Jason Love" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                    <MemberProfile name="Michelle Seeto" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                </div>
            </div>
        )
    }
}

export default Home;