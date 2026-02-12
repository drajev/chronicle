import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Styleguide | Chronicle",
  description: "Component library and design patterns for Chronicle",
};

export default function StyleguideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
