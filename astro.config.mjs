import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import fs from 'node:fs';

/**
 * Capitalizes the first letter of each word in a kebab-case string and joins them with spaces.
 * @param {string} str The kebab-case string to convert.
 * @returns {string}
 */
function kebabToTitleCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Reads the content directory and generates sidebar items for Starlight.
 * @returns {import('@astrojs/starlight/types').SidebarItem[]}
 */
function getSidebarItems() {
  const contentDir = 'src/content/docs';
  const excludedDirs = new Set(['media']);

  const directories = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !excludedDirs.has(dirent.name))
    .map((dirent) => ({
      label: kebabToTitleCase(dirent.name),
      autogenerate: { directory: dirent.name },
    }));

  // Sort alphabetically by label
  directories.sort((a, b) => a.label.localeCompare(b.label));

  return directories;
}

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
      sidebar: [{ label: 'Home', link: '/' }, ...getSidebarItems()],
      // Include our custom stylesheet.  Starlight will load this file after
      // its own styles, allowing us to override variables and base styles.
      customCss: ['./src/styles/velvet-chains-theme.css'],
    }),
  ],
});
