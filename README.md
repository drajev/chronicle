# Chronicle

A news reader powered by [The Guardian Open Platform](https://open-platform.theguardian.com/). Browse featured stories and headlines on the home page, or go to News to search by date, topic, and keyword. Clean, fast, and easy to use.

## Features

- **Home**: Featured carousel and latest headlines with infinite scroll
- **News**: Search articles by date range, topic (Business, Technology, World, Science, Culture, Sport, Economics), and keyword; paginated results
- **Light/dark theme** with persistence (cookie + localStorage)
- **Responsive layout** and accessible UI

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Zod](https://zod.dev/) for validation
- [Sass Modules](https://sass-lang.com/) + CSS variables
- [date-fns](https://date-fns.org/), [React Icons (Hi2)](https://react-icons.github.io/react-icons/)
- [Biome](https://biomejs.dev/) for lint/format
- [Bun](https://bun.sh/) (or Node.js ≥ 20)

## Prerequisites

- **Bun** ≥ 1.0.0 or **Node.js** ≥ 20
- **Guardian API key** (required for news and home content)

## Guardian API Key

The app uses The Guardian Content API for all article data. You must create your own API key; the app will not work without it.

1. Go to [The Guardian Open Platform](https://open-platform.theguardian.com/access/).
2. Register and create an application.
3. Copy your API key from the dashboard.
4. Add it to your environment (see [Environment setup](#environment-setup) below).

Without a valid key, the News page will show an error: *"Invalid or missing API key. Set NEXT_PUBLIC_GUARDIAN_API_KEY in your environment."*

## Getting Started

### Installation

```bash
git clone <your-repo-url>
cd chronicle
bun install
```

### Environment setup

1. Copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and set your Guardian API key:
   ```env
   NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key_here
   ```

   Get your key from [Guardian Open Platform](https://open-platform.theguardian.com/access/).

3. (Optional) `NEXT_PUBLIC_API_URL` is only needed if you add custom API routes that use the base API slice; you can leave it as in the example for now.

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and run

```bash
bun run build
bun run start
```

## Project structure

```
src/
  app/                    # Next.js App Router
    layout.tsx
    page.tsx              # Home (carousel + headlines)
    news/                 # News search page
    about/
    globals.scss
  assets/scss/            # Design tokens, mixins, utilities
  components/
    layout/               # Header, Footer, MainLayout
    news/                 # ArticleCard, ArticleList, HeadlinesList, LatestNewsCarousel
    ui/                   # Button, Carousel, Input, Link, ScrollArea, Skeleton, Spinner, VirtualScroll
    ErrorBoundary/
  contexts/               # ThemeContext
  hooks/                  # useIntersectionObserver
  lib/
    api/                  # guardianApi (RTK Query), baseApi
    constants/            # navigation, topics, theme, breakpoints
    schemas/              # Zod schemas (Guardian API)
    store/                # Redux store
    utils/                # cn, stripHtml, parseDateParam, getDefaultDateRange
  providers/              # AppProviders (Redux + Theme)
  types/                  # Shared TypeScript types
```

## Scripts

| Command           | Description                |
|-------------------|----------------------------|
| `bun run dev`     | Start dev server           |
| `bun run build`   | Production build            |
| `bun run start`   | Start production server     |
| `bun run lint`    | Run Biome check             |
| `bun run lint:fix`| Fix lint issues             |
| `bun run format`  | Format with Biome           |
| `bun run type-check` | TypeScript check         |
| `bun test`        | Run Vitest tests            |

## API integration

The app uses the [Guardian Content API](https://open-platform.theguardian.com/documentation/):

- **Content API** (search): articles by section, date range, and query; used for the News page and for home carousel/headlines.

All requests require a valid `api-key` (your `NEXT_PUBLIC_GUARDIAN_API_KEY`). Responses are validated with Zod schemas in `src/lib/schemas/guardianArticle.ts`.

## Code quality

- TypeScript strict mode
- Biome for linting and formatting
- Zod at API boundaries
- Small, composable components and clear separation of concerns

## License

MIT. See [LICENSE](LICENSE).

## Acknowledgments

- [The Guardian](https://www.theguardian.com/) and [Guardian Open Platform](https://open-platform.theguardian.com/) for the API.
