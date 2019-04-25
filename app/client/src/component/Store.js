import React from 'react';
import ModuleStoreItem from './ModuleStoreItem';
import config from '../config';
import '../css/content.css';

function Store(props) {
    const containerStyle = {
        display: "grid",
        gridTemplateColumns: "33% 33% 33%"
    }

    return (
        <div className="content">
            <h1>{config.productConfig.name} Store</h1>
                <div className="section-heading">SECURITY</div>
                <hr />
                <div className="section" style={containerStyle}>
                    {
                        props.modules.security.map(module => (
                            <ModuleStoreItem module={module} key={module.name} />
                        ))
                    }
                </div>
                <div className="section-heading">LIVESTOCK</div>
                <hr />
                <div className="section" style={containerStyle}>
                    {
                        props.modules.livestock.map(module => (
                            <ModuleStoreItem module={module} key={module.name} />
                        ))
                    }
                </div>
                <div className="section-heading">CROP</div>
                <hr />
                <div className="section" style={containerStyle}>
                    {
                        props.modules.crop.map(module => (
                            <ModuleStoreItem module={module} key={module.name} />
                        ))
                    }
                </div>
            </div>
    )
}

export default Store;