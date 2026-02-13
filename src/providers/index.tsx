"use client";

import { type Theme, ThemeProvider } from "@/contexts/ThemeContext";
import { type AppStore, makeStore } from "@/lib/store/store";
import type { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";

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
      <ThemeProvider initialTheme={initialTheme ?? "light"}>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
