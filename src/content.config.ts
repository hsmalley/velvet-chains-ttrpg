import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { ENTRY_TYPES } from './entry-types.mjs';

const docs = defineCollection({
  schema: docsSchema({
    extend: z.object({
      publish: z.boolean().optional(),
      featured: z.boolean().optional(),
      entryType: z.enum(ENTRY_TYPES).default('page'),
      id: z.string().optional(),
      name: z.string().optional(),
      class: z.string().optional(),
      level: z.number().optional(),
      system: z.string().optional(),
      alignment: z.string().optional(),
      species: z.string().optional(),
      bonded_to: z.string().optional(),
      location: z.string().optional(),
      recommendedLevel: z.union([z.number(), z.string()]).optional(),
      duration: z.string().optional(),
      mapScale: z.string().optional(),
      mapDimensions: z.string().optional(),
      rarity: z.string().optional(),
      arc: z.string().optional(),
      affiliation: z.string().optional(),
      captain: z.string().optional(),
      castingTime: z.string().optional(),
      participants: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
  }),
});

export const collections = {
  docs,
};
