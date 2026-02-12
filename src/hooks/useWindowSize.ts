import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/lib/constants/breakpoints";

export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const DEFAULT_SIZE: WindowSize = {
  width: 0,
  height: 0,
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(DEFAULT_SIZE);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width,
        height,
        isMobile: width <= BREAKPOINTS.sm,
        isTablet: width <= BREAKPOINTS.lg,
        isDesktop: width > BREAKPOINTS.lg,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return windowSize;
}
