# Code review: Next.js & React practices

## What’s in good shape

### Next.js App Router
- **Root layout** is a Server Component; theme is read from cookies and passed as `initialTheme` to avoid hydration mismatch.
- **error.tsx** and **not-found.tsx** exist and use `"use client"` where needed (e.g. not-found for `onClick`).
- **Metadata** is exported from `layout.tsx` for SEO.
- **Fonts** are loaded via `next/font` (Geist) with CSS variables.
- **Script** for theme init uses `strategy="beforeInteractive"` and is kept small in `public/theme-init.js`.

### React 19
- **Ref as prop**: Button, Input, Card accept `ref` and pass it to the DOM node (no `forwardRef`).
- **useId**: Input uses `useId()` for stable `id` / `aria-describedby`.
- **Error boundary**: Class component for `getDerivedStateFromError` / `componentDidCatch` (still the only option for error boundaries).

### Structure
- **Single providers module** (`src/providers/index.tsx`) composes Redux + Theme; used once in root layout.
- **Theme**: Cookie + `data-theme` on `<html>` + `initialTheme` prop keep server and client in sync.
- **SCSS**: Design tokens in `_variables.scss`, semantic CSS vars in `globals.scss`, components use `var(--*)` for theme/error.
- **Utils**: `cn` from `@/lib/utils` used consistently for class names.

### Accessibility & DX
- Theme toggle and form fields use `aria-label` / `aria-invalid` / `aria-describedby` where appropriate.
- `suppressHydrationWarning` on `<html>` is used intentionally for theme.

---

## Redundancies & cleanups

### 1. Theme key in three places
- **layout.tsx**: `const THEME_COOKIE = "chronicle-theme"`
- **ThemeContext.tsx**: `STORAGE_KEY` and `COOKIE_NAME` both `"chronicle-theme"`
- **public/theme-init.js**: `var k = "chronicle-theme"`
**Done:** Added `src/lib/constants/theme.ts` with `THEME_STORAGE_KEY` and `THEME_COOKIE_MAX_AGE`; layout and ThemeContext use it. `public/theme-init.js` keeps the string with a comment that it must match.

### 2. Button props
- **Done:** Removed `asLink` (unused). Replaced `isDisabled` with native `disabled`; Button now uses `disabled={Boolean(disabled) || isLoading}` so both props work.

### 3. Redux / API layer (unused)
- **Store:** No component uses `useAppSelector`, `useAppDispatch`, or `useAppStore`.
- **baseApi:** No endpoints defined; only empty RTK Query API.
- **axiosInstance:** Exported from `baseApi.ts` but never imported; baseApi uses `fetchBaseQuery`, so axios is unused.
**Recommendation:** Either remove Redux/RTK/axios until needed, or keep and add a short comment that they are for future API/state. If kept, remove `axios` and `axiosInstance` if you’re only using RTK Query.

### 4. Hooks exported but unused
- **useInfiniteScroll**, **useWindowSize**, **useMergedRefs** are not imported anywhere.
**Recommendation:** Use them where needed or remove from the barrel until you have a use case.

### 5. Topics / types
- **lib/constants/topics.ts** and **getTopicById** / **getTopicBySection** are not imported anywhere.
**Recommendation:** Use when you add topic-based features, or remove if not part of the current scope.

---

## Next.js best-practice gaps (optional)

- **loading.tsx:** No `app/loading.tsx` (or per-route). Adding it would give automatic loading UI and better streaming.
- **Default `metadata` base:** Consider `metadataBase` in layout if you use absolute URLs in Open Graph or elsewhere.
- **Route segments:** Only `app/page.tsx`, `app/error.tsx`, `app/not-found.tsx`, `app/styleguide/page.tsx`; structure is fine for current size.

---

## Summary

| Area              | Status | Action |
|-------------------|--------|--------|
| App Router        | Good   | —      |
| Server/client split | Good | —      |
| Theme (cookie + hydration) | Good | Done: single constant in lib/constants/theme.ts |
| React 19 (ref, useId) | Good | —      |
| Providers         | Good   | —      |
| Redux/API         | Unused | Remove or document + remove axios |
| Button props      | Fixed | Dropped `asLink`; use native `disabled` only |
| Hooks             | Unused | Use or remove from barrel |
| Topics constant   | Unused | Use or remove |

(Theme constant and Button cleanups have been applied.)
