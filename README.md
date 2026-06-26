# personal-frontend

James McNiff's personal site — a single-page landing built with a modern,
terminal/Matrix-themed React frontend.

## Tech stack

- **React 19** with the **React Compiler** (automatic memoization)
- **TypeScript 6**
- **Vite 8** (Rolldown-powered) for dev server and builds
- **Oxlint** for linting
- **Prettier** for formatting
- **mise** for pinning the Node toolchain

## Getting started

The Node version is pinned in [`mise.toml`](./mise.toml), so the only thing you
need installed up front is [mise](https://mise.jdx.dev/).

```sh
# 1. Install mise (see https://mise.jdx.dev/getting-started.html)
#    e.g. on macOS: brew install mise

# 2. Install the pinned Node version into this project
mise install

# 3. Install dependencies
npm install

# 4. Start the dev server (http://localhost:5173)
npm run dev
```

> Don't have / want mise? Just install the Node version listed in
> [`mise.toml`](./mise.toml) by hand, then run `npm install`.

## Scripts

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR              |
| `npm run build`        | Type-check (`tsc -b`) and build to `dist/`      |
| `npm run preview`      | Serve the production build locally              |
| `npm run lint`         | Lint with Oxlint                                |
| `npm run format`       | Format all files with Prettier (writes changes) |
| `npm run format:check` | Check formatting without writing (CI-friendly)  |
| `npm run check`        | Run lint + format check together                |

Before committing, run `npm run format` to apply formatting and `npm run check`
to confirm lint and formatting are clean.

## Git hooks

A `pre-commit` hook runs `npm run check` (lint + format check) and blocks the
commit if anything fails. It lives in [`.githooks/`](./.githooks) and is wired
up automatically by the `prepare` script on `npm install` (via
`git config core.hooksPath .githooks`), so a fresh clone gets it for free.

To bypass it for a one-off commit, use `git commit --no-verify`.

## Project structure

```
src/
  App.tsx                 # landing page markup + content
  App.css                 # page styles
  index.css               # design tokens (:root variables) + base styles
  main.tsx                # React entry point
  components/
    MatrixRain.tsx        # ambient Matrix-style canvas background
public/                   # static assets served as-is
```

## Notes

- **Design tokens:** colors, spacing, and the type scale live as CSS custom
  properties in [`src/index.css`](./src/index.css). Prefer editing those over
  hard-coding values.
- **React Compiler** is enabled and adds a Babel pass, which slightly impacts
  dev/build performance. See the
  [React Compiler docs](https://react.dev/learn/react-compiler).
- **Reduced motion:** the Matrix rain and blinking cursor disable themselves for
  users with `prefers-reduced-motion: reduce`.
