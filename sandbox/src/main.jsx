import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// For Vite, we rely on Tailwind CSS's font-family configuration in tailwind.config.js
// and the global CSS import in index.css.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);