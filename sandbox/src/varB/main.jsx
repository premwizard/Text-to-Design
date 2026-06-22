import React, { StrictMode } from 'react'
import * as React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ErrorBoundary } from './ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
