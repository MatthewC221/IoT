import React from 'react';
import ModuleStoreItem from './ModuleStoreItem';
import config from '../config';
import '../css/content.css';

function Store(props) {
    return (
        <div className="content">
            <h1>{config.productConfig.name} Store</h1>
            <div className="flex-box-horizontal">
                {
                    props.modules.map(module => (
                        <ModuleStoreItem module={module} />
                    ))
                }
            </div>
        </div>
    )
}

export default Store;