/**
 * Bootstraps application and adds it to the DOM
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Readings from './features/Readings';

ReactDOM.render(
  <React.StrictMode>
    <Readings />
  </React.StrictMode>,
  document.getElementById('root')
);
