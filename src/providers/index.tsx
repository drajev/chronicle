"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, type Theme } from "@/contexts/ThemeContext";
import { makeStore, type AppStore } from "@/lib/store/store";

/**
 * Single app-level providers wrapper. Composes Redux and Theme.
 * Use as the one wrapper in root layout. initialTheme from server (cookie) keeps hydration in sync.
 */
const AppProviders = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider initialTheme={initialTheme ?? "light"}>
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
