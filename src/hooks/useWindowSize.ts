import { useEffect, useState } from "react";

interface WindowSize {
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

    const updateWindowSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height,
        isMobile: width <= 576,
        isTablet: width <= 992,
        isDesktop: width > 992,
      });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return windowSize;
}
