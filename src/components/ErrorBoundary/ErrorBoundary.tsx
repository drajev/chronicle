"use client";

import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { Component } from "react";
import type { ReactNode } from "react";
import classes from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={classes.root} role="alert">
          <div className={classes.content}>
            <h1 className={classes.title}>Something went wrong</h1>
            <p className={classes.message}>
              {this.state.error?.message || "An unexpected error occurred. Please try again."}
            </p>
            <div className={classes.actions}>
              <Button onClick={this.handleReset}>Try Again</Button>
              <Button variant="secondary" href={ROUTES.home}>
                Go Home
              </Button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className={classes.details}>
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error.stack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
