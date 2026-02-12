import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "@/providers";
import { MainLayout } from "@/components/layout";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import { THEME_STORAGE_KEY } from "@/lib/constants/theme";
import "./globals.scss";

const getServerTheme = async (): Promise<"light" | "dark"> => {
  const store = await cookies();
  const value = store.get(THEME_STORAGE_KEY)?.value;
  return value === "dark" ? "dark" : "light";
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chronicle",
  description: "A simple place for your notes and thoughts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getServerTheme();

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive" src="/theme-init.js" />
        <AppProviders initialTheme={theme}>
          <ErrorBoundary>
            <MainLayout>{children}</MainLayout>
          </ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}
