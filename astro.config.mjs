import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

// This configuration powers the Velvet Chains TTRPG site.  It mirrors the
// existing setup from the original repository but adds a custom CSS file to
// align the look and feel with the Next.js docs site contained in the
// `velvet-chains` project.  See `src/styles/velvet-chains-theme.css` for
// the actual styles that implement the dark‑romance theme.
export default defineConfig({
  site: 'https://hsmalley.github.io/velvet-chains-ttrpg',
  base: '/velvet-chains-ttrpg/',
  integrations: [
    sitemap(),
    starlight({
      title: 'Velvet Chains & Voidlight',
      logo: {
        src: './src/assets/vcvl.webp',
        alt: 'Velvet Chains & Voidlight sigil',
      },
      favicon: '/favicon.png',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://hsmalley.github.io/velvet-chains-ttrpg/social/vcvl-og.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:width',
            content: '1200',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:height',
            content: '630',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://hsmalley.github.io/velvet-chains-ttrpg/social/vcvl-og.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            href: 'https://hsmalley.github.io/velvet-chains-ttrpg/social/vcvl-avatar.png',
          },
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/hsmalley/velvet-chains-ttrpg',
        },
      ],
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Characters',
          autogenerate: { directory: 'characters' },
        },
        {
          label: 'Companions',
          autogenerate: { directory: 'companions' },
        },
        {
          label: 'Factions',
          autogenerate: { directory: 'factions' },
        },
        {
          label: 'Adventures',
          autogenerate: { directory: 'adventures' },
        },
        {
          label: 'Story Arcs',
          autogenerate: { directory: 'arcs' },
        },
        {
          label: 'Artifact Collections',
          autogenerate: { directory: 'artifact-collections' },
        },
        {
          label: 'Artifacts',
          autogenerate: { directory: 'artifacts' },
        },
        {
          label: 'Rituals',
          autogenerate: { directory: 'rituals' },
        },
        {
          label: 'Logbooks',
          autogenerate: { directory: 'logbooks' },
        },
        {
          label: 'Ships',
          autogenerate: { directory: 'ships' },
        },
        {
          label: 'GM Guides',
          autogenerate: { directory: 'gm-guides' },
        },
        {
          label: 'Places',
          autogenerate: { directory: 'places' },
        },
        {
          label: 'Maps',
          autogenerate: { directory: 'maps' },
        },
      ],
      // Include our custom stylesheet.  Starlight will load this file after
      // its own styles, allowing us to override variables and base styles.
      customCss: [
        './src/styles/velvet-chains-theme.css',
      ],
    }),
  ],
});
