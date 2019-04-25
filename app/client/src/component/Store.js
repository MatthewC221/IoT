import React from 'react';
import ModuleStoreItem from './ModuleStoreItem';
import config from '../config';
import '../css/content.css';

function Store(props) {
    const containerStyle = {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
    }

    return (
        <div className="content">
            <h1>{config.productConfig.name} Store</h1>
            <div style={containerStyle}>
                {
                    props.modules.map(module => (
                        <ModuleStoreItem module={module} key={module.name} />
                    ))
                }
            </div>
        </div>
    )
}

export default Store;