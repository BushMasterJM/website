import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// This finds the <div id="root"> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// This puts your App component inside that div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);