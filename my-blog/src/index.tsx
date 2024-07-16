// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRouter from './AppWithRouter';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
