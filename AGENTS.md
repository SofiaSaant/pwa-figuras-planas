# Repository Guidelines

## Project Structure & Module Organization
- `index.html` hosts the full PWA: Tailwind-powered UI, inline modules defined in the `content` object, SVG interactions, and the developer test panel launched with `Ctrl+Shift+T`.
- `sw.js` contains the service-worker cache logic; bump `CACHE_NAME` when static assets change.
- `manifest.json` manages install metadata; keep icon files next to it and update sizes when assets change.
- Test specifications and fixtures live in `test-*.md` and `test-*.html`; use them to understand expected behaviours before editing features.

## Build, Test, and Development Commands
- Serve locally with any static server to activate the PWA flow, e.g. `python3 -m http.server 5173` or `npx http-server .`; both need the project root as the working directory.
- Reload after enabling the service worker; use an incognito window when testing fresh installs to avoid stale caches.
- Run in-browser tests via the console command `testCircleElements()` or by opening `test-evaluation-system.html` etc. directly in the browser for manual walkthroughs.

## Coding Style & Naming Conventions
- Follow the existing four-space indentation and keep inline `<script>` blocks formatted with trailing commas in objects for readability.
- Module IDs use kebab-case (`suma-angulos`); keep new keys consistent and supply Spanish titles/descriptions to match the current UX.
- Prefer Tailwind utility classes for new styling; reserve custom CSS for behaviours not attainable with Tailwind.
- JavaScript uses `const`/`let`, descriptive camelCase functions, and template literals for HTML fragments; keep data attributes (`data-element`) when wiring interactive states.

## Testing Guidelines
- Extend the `CircleElementsTests` class (see `test-circle-elements.md`) for automated checks and wire new methods into `runAllTests()`.
- Name new helpers `test[Feature]` to align with the current documentation and ensure each returns `{ status, message }`.
- Document any manual regression steps in the nearest `test-*.md` file so future agents can replay them.
- Before submitting, run the test panel and exercise SVG drag interactions, evaluation quizzes, and offline mode toggles.

## Commit & Pull Request Guidelines
- Commits follow short, imperative summaries (`first part web progressive`); include scoped details in the body when touching multiple modules.
- Reference related test files or manual scripts in PR descriptions, state how caching was invalidated, and add screenshots or GIFs when UI elements change.
- Verify the build steps used locally and list them under a "Verification" checklist so reviewers can reproduce results.

## PWA & Asset Notes
- Update service-worker caches and manifest fields together to avoid mismatched offline assets.
- Confirm new icons stay at `/icon-192.png` and `/icon-512.png`; regenerate favicons or splash screens before shipping brand updates.
