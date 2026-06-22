import React from 'react';

import * as React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught in ErrorBoundary:", error, errorInfo);
    window.parent.postMessage({
      type: 'runtime_error',
      error: error.message,
      stack: errorInfo.componentStack
    }, '*');
  }

  render() {
    if (this.state.hasError) {
      // The IDE parent window will render the beautiful overlay.
      // This is just a minimal fallback for the iframe itself.
      return (
        <div style={{ padding: '2rem', color: '#f87171', fontFamily: 'sans-serif', backgroundColor: '#09090b', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Component Crashed</h2>
          <p style={{ color: '#a1a1aa' }}>A React runtime error occurred.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
