import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
  schema: docsSchema({
    extend: z.object({
      entryType: z
        .enum(['page', 'character', 'companion', 'faction', 'adventure', 'place', 'map'])
        .default('page'),
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
      tags: z.array(z.string()).default([]),
    }),
  }),
});

export const collections = {
  docs,
};
