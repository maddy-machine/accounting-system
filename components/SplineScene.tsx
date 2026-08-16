'use client';

import { useState, useEffect } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SplineScene({ scene, className, style }: SplineSceneProps) {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Dynamically import Spline only on mount, completely isolated from hydration
    import('@splinetool/react-spline')
      .then((mod) => {
        setSplineComponent(() => mod.default);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  if (hasError || !scene) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.4), rgba(10, 10, 11, 0.95))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', opacity: 0.6 }}>
          <div style={{
            fontSize: '56px',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>✦</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>3D Scene</div>
        </div>
      </div>
    );
  }

  // Show beautiful gradient placeholder while Spline loads
  if (!SplineComponent) {
    return (
      <div
        className={`spline-container ${className || ''}`}
        style={{
          ...style,
          background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.3), rgba(10, 10, 11, 0.9))',
        }}
      >
        <div className="spline-loading">
          <div className="spline-loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className={`spline-container ${className || ''}`} style={style}>
      {!isLoaded && (
        <div className="spline-loading">
          <div className="spline-loading-spinner" />
        </div>
      )}
      <ErrorBoundary onError={() => setHasError(true)}>
        <SplineComponent
          scene={scene}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </ErrorBoundary>
    </div>
  );
}

/* ── Simple Error Boundary ── */
import React, { Component, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.4), rgba(10, 10, 11, 0.95))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', opacity: 0.6 }}>
            <div style={{
              fontSize: '56px',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>✦</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>3D Scene</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
