import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useI18n } from "@/i18n/context";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function ErrorFallbackUI({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-destructive/50 p-8 cyber-border text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground font-orbitron">
            {t("errorBoundary.title")}
          </h1>
          <p className="text-muted-foreground">{t("errorBoundary.body")}</p>
        </div>

        {import.meta.env.DEV && error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded text-left">
            <p className="text-sm font-mono text-destructive break-all">
              {error.toString()}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={onReset} className="font-orbitron">
            {t("errorBoundary.retry")}
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="font-orbitron"
          >
            {t("errorBoundary.home")}
          </Button>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
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
        <ErrorFallbackUI error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
