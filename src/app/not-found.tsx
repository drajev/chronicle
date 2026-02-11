"use client";

import { Button } from "@/components/ui";
import classes from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.notFound__content}>
        <h1 className={classes.notFound__title}>404</h1>
        <h2 className={classes.notFound__subtitle}>Page Not Found</h2>
        <p className={classes.notFound__message}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className={classes.notFound__actions}>
          <Button href="/">Go Home</Button>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
