import './main.css';
import React from 'react';
import App from './components/App.jsx';
import alt from './libs/Alt';
import storage from './libs/Storage';
import persist from './libs/Persist';

(function(){
	const mountNode = document.createElement('div');

	// Bootstrap
	persist(alt, storage, 'app');
	
	document.body.appendChild(mountNode);

	React.render(<App />, mountNode)
})()