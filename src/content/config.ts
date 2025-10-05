import { defineCollection, z } from 'astro:content';

const characters = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    class: z.string(),
    level: z.number(),
    system: z.string(),
    alignment: z.string(),
    tags: z.array(z.string()),
    type: z.literal('character'),
    layout: z.string().optional()
  })
});

const companions = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    species: z.string(),
    bonded_to: z.string(),
    tags: z.array(z.string()),
    type: z.literal('companion'),
    layout: z.string().optional()
  })
});

const factions = defineCollection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    alignment: z.string(),
    tags: z.array(z.string()),
    type: z.literal('faction'),
    layout: z.string().optional()
  })
});

export const collections = {
  characters,
  companions,
  factions
};
