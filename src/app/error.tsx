"use client";

import { Button } from "@/components/ui";
import classes from "./error.module.scss";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  // TODO: send error to reporting service (e.g. in useEffect)

  return (
    <div className={classes.error}>
      <div className={classes.error__content}>
        <h1 className={classes.error__title}>Something went wrong!</h1>
        <p className={classes.error__message}>
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && (
          <p className={classes.error__digest}>Error ID: {error.digest}</p>
        )}
        <div className={classes.error__actions}>
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" href="/">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
