import React, { Component } from 'react';
import ModuleStoreItem from './ModuleStoreItem';
import config from '../config';
import '../css/content.css';

class Store extends Component {
    render() {
        const modules = [
            {
                name: 'Animal Count',
                img: 'duck.png',
                description: "Count the number of animals within the camera's vision by species.",
                price: 400
            },
            {
                name: 'Animal Identification',
                img: 'cow.png',
                description: "Identify animals by species.",
                price: 200
            },
            {
                name: 'Vehicle Identification',
                img: 'pickup-truck.png',
                description: "Identify vehicles by model, make, colour and number plate.",
                price: 500
            }
        ]

        return (
            <div className="content">
                <h1>{config.productConfig.name} Store</h1>
                <div className="flex-box-horizontal">
                    <ModuleStoreItem module={modules[0]} />
                    <ModuleStoreItem module={modules[1]} />
                    <ModuleStoreItem module={modules[2]} />
                </div>
            </div>
        )
    }
}

export default Store;