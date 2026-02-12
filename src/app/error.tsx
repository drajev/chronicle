"use client";

import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="app-error" role="alert">
      <div className="app-error__content">
        <h1 className="app-error__title">Something went wrong!</h1>
        <p className="app-error__message">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && (
          <p className="app-error__digest">Error ID: {error.digest}</p>
        )}
        <div className="app-error__actions">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" href={ROUTES.home}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
