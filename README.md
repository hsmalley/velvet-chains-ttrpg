# Velvet Chains & Voidlight Codex

> What happens with you take the **MOST SPECTACULAR BDSM SPACE-PIRATE ROMANCE ENGINE** ever forged
> in the fires of consensual creativity — blend it **Daggerheart** and **Thirsty Sword Lesbians?**
> You get this fuck'n thing!

Welcome to the cartographic archive for the **Velvet Chains & Voidlight** campaign setting—a
neon‑wreathed, consent‑forward space‑pirate melodrama where every soulmark has a story and the safe
word is **fiction**. This repository powers the public documentation site built with Astro
Starlight, collecting characters, companions, adventures, factions, places, and maps for the table.

## ✨ Core Themes

- **Consent is canon** – Rituals, clauses, and Drama Points reward respectful negotiation and
  theatrical creativity.
- **Neon corsair aesthetics** – Dark romance gradients, glowing typography, and Voidlight sigils
  shine through the custom theme.
- **Living archive** – Content lives under `src/content/docs/**` and automatically renders into
  routes, search, and spotlight sections.

## 🗂️ Repository Layout

```text
.
├─ adventures → symlink to src/content/docs/adventures/
├─ characters → symlink to src/content/docs/characters/
├─ companions → symlink to src/content/docs/companions/
├─ maps       → symlink to src/content/docs/maps/
├─ places     → symlink to src/content/docs/places/
├─ obsidian-templates/        # Authoring templates for the Obsidian vault
├─ obsidian-theme/            # Optional Obsidian editor theme
├─ scripts/validate-content.mjs # Frontmatter validator
├─ src/
│  ├─ assets/                  # Site imagery (sigils, promo art)
│  ├─ components/              # Featured overview + search dashboard
│  ├─ content/docs/            # Source material (MDX)
│  ├─ styles/velvet-chains-theme.css # Custom Voidlight theme
│  └─ content.config.ts        # Starlight content schema extension
└─ .obsidian/                  # Optional vault profile for local authoring
```

> **Note:** The top-level symlinks mirror the content folders for convenience in Obsidian. On
> Windows or non-symlink-friendly environments you can delete them and work directly in
> `src/content/docs/**`.

## 🛠️ Authoring Workflow

1. **Clone the repository** and (optionally) open it as an Obsidian vault. The `.obsidian/`
   directory contains a lightweight workspace profile.
2. **Use the templates** in `obsidian-templates/` when creating a new character, companion, faction,
   adventure, place, or map. Copy the file into the matching directory and replace the `{{...}}`
   placeholders.
3. **Follow the schema** defined in `src/content.config.ts`. Required frontmatter is enforced by the
   validator.
4. **Run validation** before committing: `npm run validate:content`.
5. **Build locally** with `npm run build` (validation runs automatically) or preview with
   `npm run dev`.

## 🧪 Quality Gates

| Command                    | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `npm run check:safeword`   | Warns when a document forgets to invoke the sacred safe word |
| `npm run validate:content` | Validates MD/MDX frontmatter against the campaign schema     |
| `npm run build`            | Runs validation then builds the Starlight site into `dist/`  |
| `npm run dev`              | Starts the local dev server at `http://localhost:4321`       |

CI mirrors this ritual through `.github/workflows/content-check.yml`, ensuring every PR keeps the
codex in balance.

## 🚀 Deployment

The **Deploy Velvet Codex to Pages** workflow (`.github/workflows/astro.yml`) publishes the site to
GitHub Pages on pushes to `main`. Manual dispatches are supported for emergency Voidlight rituals.

## 🕯️ Theming

The bespoke CSS in `src/styles/velvet-chains-theme.css` imports the same fonts and gradients as the
primary **velvet-chains** project. Feel free to extend the palette or add new callout variants; the
stylesheet is intentionally unlayered so it overrides Starlight defaults.

Want the same aesthetic in your editor? Copy the entire `obsidian-theme/` folder into your vault’s
`.obsidian/themes/` directory (renaming it to `velvet-chains-voidlight` keeps everything tidy) and
select **Velvet Chains & Voidlight** inside Obsidian. For bonus customisation, enable the **Style
Settings** plugin to tweak accents, glow, and background animation.

## 🤝 Contributing

1. Fork and branch from `main`.
2. Run `npm install` followed by `npm run prepare` once to install the pre-commit hooks.
3. Add or edit content/templates/components.
4. Run `npm run validate:content` and `npm run build`.
5. Open a PR. Share highlights in the commit message—hedonistic theatrics encouraged.

Remember: call the safe word if boundaries shift, celebrate every Drama Point, and let your stories
shimmer with Voidlight.
