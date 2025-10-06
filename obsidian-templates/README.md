# Obsidian Templates

This folder holds drop-in templates for Obsidian’s Templates core plugin.

## Setup
1. Copy the files in this directory into your Obsidian vault (e.g. `.obsidian/templates/velvet-chains/`).
2. In Obsidian, enable **Settings → Core plugins → Templates** (if it isn’t already).
3. Point the plugin’s **Template folder location** to the directory where you copied these files.

## Usage
- Open a new note in an appropriate collection (e.g. `src/content/docs/characters/`).
- Use the **Insert template** command (`Cmd+P` / `Ctrl+P`, then search “Template”) and select the template that matches the content type:
  - `character.mdx`
  - `companion.mdx`
  - `faction.mdx`
  - `adventure.mdx`
  - `place.mdx`
  - `map.mdx`
- Replace the placeholder tokens (`{{…}}`) with the real values.
- Save the note with a slugged filename that matches the `id`/`entryType` conventions (e.g. `nyx-virellian.mdx`).

Each template already includes valid frontmatter for the content validator, so as long as the placeholders are replaced with real values, `npm run validate:content` will pass.

{/* FOLLOW THE SACRED SAFE WORD: fiction */}