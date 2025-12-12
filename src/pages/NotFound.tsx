import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="max-w-2xl w-full relative z-10 text-center space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse-glow" />
            <AlertTriangle className="w-24 h-24 text-destructive relative z-10" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 
            className="text-6xl md:text-8xl font-bold text-primary font-orbitron neon-text"
            aria-label="404 Error"
          >
            404
          </h1>
          <h2 
            className="text-2xl md:text-4xl font-bold text-foreground font-orbitron"
          >
            PAGE NOT FOUND
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg cyber-border animate-pulse-glow font-orbitron"
          >
            <Link to="/" aria-label="Return to home page">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              Return Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-6 text-lg font-orbitron"
            aria-label="Go back to previous page"
          >
            Go Back
          </Button>
        </div>

        <div className="mt-12 p-6 bg-card/50 border border-primary/20 rounded cyber-border">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-orbitron">// Error Details</span>
            <br />
            <code className="text-xs mt-2 block font-mono text-foreground/70">
              Route: {location.pathname}
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
