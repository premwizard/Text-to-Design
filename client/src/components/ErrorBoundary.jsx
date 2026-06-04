import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-screen bg-[#050505] flex items-center justify-center p-6 text-zinc-200">
          <div className="max-w-md w-full bg-zinc-900/50 border border-red-500/20 p-8 rounded-3xl shadow-2xl backdrop-blur-xl text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertTriangle className="text-red-400 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
              An unexpected error occurred in the application. We've logged the issue, but you can try refreshing the page to recover.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw size={18} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
