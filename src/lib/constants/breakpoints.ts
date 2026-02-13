/** Keep in sync with assets/scss/_variables.scss ($screen-*-max) */
export const BREAKPOINTS = {
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1230,
  xxl: 1440,
  "3xl": 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
