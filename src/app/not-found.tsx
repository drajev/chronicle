"use client";

import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

const NotFound = () => {
  return (
    <main className="app-not-found" aria-labelledby="not-found-title">
      <div className="app-not-found__content">
        <h1 id="not-found-title" className="app-not-found__title">
          404
        </h1>
        <h2 className="app-not-found__subtitle">Page Not Found</h2>
        <p className="app-not-found__message">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="app-not-found__actions">
          <Button href={ROUTES.home}>Go Home</Button>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
