import  "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import MRoute from './routes/index';


ReactDOM.render(<MRoute />, document.getElementById('root'));
registerServiceWorker();
