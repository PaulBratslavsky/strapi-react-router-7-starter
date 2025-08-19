import { isRouteErrorResponse, useRouteError } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Handle HTTP errors (404, 500, etc.)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <h1 className="text-6xl font-bold text-foreground mb-4">
              {error.status}
            </h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {error.status === 404 ? "Page Not Found" : "Something Went Wrong"}
            </h2>
            <p className="text-muted-foreground">
              {error.status === 404
                ? "The page you're looking for doesn't exist."
                : error.statusText || "An unexpected error occurred."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Try Again
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              asChild
            >
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle JavaScript errors
  let errorMessage = "An unexpected error occurred";
  let errorDetails = "";

  if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || "";
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-2xl w-full mx-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Error Details:</h3>
            <p className="text-sm text-destructive font-mono">{errorMessage}</p>
            {import.meta.env.DEV && errorDetails && (
              <details className="mt-4">
                <summary className="text-sm font-semibold text-foreground cursor-pointer">
                  Stack Trace (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                  {errorDetails}
                </pre>
              </details>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => window.location.reload()}
              className="flex-1"
            >
              Reload Page
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              asChild
            >
              <a href="/">Go Home</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}