import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://hsmalley.github.io/velvet-chains-ttrpg',
  base: '/velvet-chains-ttrpg/',
  integrations: [
    sitemap(),
    starlight({
      title: "Velvet Chains & Voidlight",
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/hsmalley/velvet-chains-ttrpg'
        }
      ],
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'Characters', link: '/characters/' },
        { label: 'Companions', link: '/companions/' },
        { label: 'Factions', link: '/factions/' }
      ]
    })
  ]
});
