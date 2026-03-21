import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#00d9ff] mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-400 mb-4">
                Please refresh the page to continue
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#00d9ff] text-black rounded-lg hover:bg-[#00b8d4] transition-colors"
              >
                Reload App
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
