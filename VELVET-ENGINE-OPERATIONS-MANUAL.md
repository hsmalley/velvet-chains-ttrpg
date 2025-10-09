# Repository Guidelines

## Project Structure & Module Organization

The Astro Starlight site lives under `src/`. Content and docs go in
`src/content/docs/<collection>/<entry>.mdx`, while shared components are in `src/components/` and
theme assets in `src/styles/`. The top-level symlinks (`adventures/`, `characters/`, etc.) mirror
those collections for Obsidian convenience. Authoring templates sit in `obsidian-templates/`, and
schema helpers live in `schema/` and `src/content.config.ts`. Automation scripts, including the
frontmatter validator, are in `scripts/`.

## Build, Test, and Development Commands

- `npm run dev`: start the Astro dev server on `http://localhost:4321` with hot reload for MDX and
  Astro files.
- `npm run validate:content`: enforce schema rules and required frontmatter before you commit.
- `npm run lint:md`: apply markdownlint to every `.md`/`.mdx`, skipping generated directories.
- `npm run build`: run validation automatically, then emit the static site into `dist/`.
- `npm run preview`: serve the latest build locally.
- `npm run deploy`: build and push the `dist/` output to GitHub Pages via `gh-pages`.

## Coding Style & Naming Conventions

Use TypeScript with Astro components; stick to ES modules and the existing two-space indentation.
Name content files with kebab-case (e.g., `voidlight-smuggler.mdx`) and keep frontmatter keys
lowercase with underscores where scripted (`bonded_to`, `arc`). Favor small, focused components and
reuse helpers from `src/utils/` when manipulating URLs or metadata. Run `npm run lint:md` after
editing long-form prose to catch style issues.

## Testing Guidelines

There is no unit-test harness yet; treat `npm run validate:content` as the gatekeeper. Extend
`src/entry-types.mjs` and `src/content.config.ts` whenever you introduce a new entry type, and add
validator rules in `scripts/validate-content.mjs`. Always finish with `npm run build` to ensure
Astro compiles and the output renders. If you touch CSS, spot-check the relevant page in
`npm run preview` for regressions.

## Commit & Pull Request Guidelines

Recent commits use short, descriptive titles in sentence or title case (e.g., "Rule book drafts");
follow that pattern and keep them scoped to one concern. Reference the primary collection in the
title when possible (`characters: update void bond`). In PRs, include a summary, screenshots or
recordings for visual changes, and call out validation or build commands you ran. Link issues or
notes for arc updates so archivists can trace narrative changes.
