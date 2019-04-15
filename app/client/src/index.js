import React from 'react';
import RenderDOM from 'react-dom';
import Main from './component/Main'; 
import './css/index.css';

const destination = document.querySelector("#container");

RenderDOM.render(
    <Main />,
    destination
);