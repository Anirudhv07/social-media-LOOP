import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Define the fallback prop with an optional ReactNode type
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback prop if an error occurs
      return this.props.fallback || null; // Provide a default value of null if fallback is not provided
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
