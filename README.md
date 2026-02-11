# Same Day

A news exploration app centered around time, not feeds. Discover what happened on this exact day historically, explore current events, and see how topics evolve across time.

## 🎯 Core Concept

Same Day answers three fundamental questions:
- **What happened on this exact day (historically)?** - Explore headlines from the same date across different years
- **What's happening right now?** - Stay grounded in the present with recent news
- **How does a topic evolve across time?** - Track how stories develop and change over time

This is not a Twitter clone, not an RSS reader, not a dashboard. It's a focused exploration tool for understanding news through the lens of time.

## ✨ Features

### 1. On This Day
Select a date (day + month, year optional) and explore headlines from that exact date across different years, grouped by year.

### 2. Recent News
Latest headlines with pagination or infinite scroll to keep you connected to current events.

### 3. Topics
Explore fixed topics (business, tech, world, science, culture) to see how stories evolve over time.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **React**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Sass Modules](https://sass-lang.com/) with CSS variables
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Runtime**: [Bun](https://bun.sh/)

## 📋 Prerequisites

- **Bun** >= 1.0.0 (or Node.js >= 20)
- **NY Times API Key** - Get yours at [developer.nytimes.com](https://developer.nytimes.com/)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd next

# Install dependencies
bun install
```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your NY Times API key to `.env.local`:
   ```env
   NEXT_PUBLIC_NYT_API_KEY=your_nytimes_api_key_here
   ```

   Get your API key from [NY Times Developer Portal](https://developer.nytimes.com/).

### Development

```bash
# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
bun run build

# Start production server
bun run start
```

## 📁 Project Structure

```
src/
  app/                    # Next.js App Router
    (routes)/            # Route groups
    layout.tsx           # Root layout
    page.tsx             # Home page
    globals.scss         # Global styles with CSS variables
  assets/
    scss/                # Design system
      _variables.scss    # Design tokens
      _mixins.scss      # SCSS mixins
      _utils.scss       # Utility classes
  components/            # React components
    ComponentName/
      ComponentName.tsx
      ComponentName.module.scss
      index.ts
  hooks/                 # Custom React hooks
  lib/
    api/                # API configuration
      nytimes/          # NY Times API endpoints
      baseApi.ts        # Base API setup
    constants/          # App constants
    schemas/            # Zod validation schemas
    store/              # Redux store configuration
    utils/              # Utility functions
  types/                # TypeScript type definitions
```

## 🎨 Architecture

- **Server Components** by default for layouts and data boundaries
- **Client Components** only where interaction is needed
- **RTK Query** for all server state management
- **Zod** as the single source of truth for data validation
- **Sass Modules** with CSS variables for styling and theming

## 📝 Available Scripts

```bash
# Development
bun run dev              # Start development server

# Production
bun run build            # Build for production
bun run start            # Start production server

# Code Quality
bun run lint             # Run linter
bun run lint:fix         # Fix linting issues
bun run format           # Format code
bun run type-check       # TypeScript type checking
```

## 🔧 Code Quality

This project follows strict code quality standards:

- **TypeScript** strict mode with additional checks
- **Biome** for linting and formatting
- **Zod** for runtime type validation
- **Explicit typing** - no `any` types
- **Small, composable components**
- **No code duplication**

## 📚 API Integration

This app uses the [NY Times API](https://developer.nytimes.com/):

- **Archive API** - Get articles for a specific month/year (for "On This Day")
- **Article Search API** - Search articles by query, date range, section (for Topics)
- **Top Stories API** - Get current top stories by section (for Recent News)

## 🎯 Development Principles

- Simple, clean, explicit code
- No over-engineering
- No premature abstraction
- Follow best practices consistently
- Prioritize UX, performance, and clarity

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NY Times](https://www.nytimes.com/) for providing the API
- Built with modern web technologies and best practices

---

**Built with ❤️ for exploring news through time**
