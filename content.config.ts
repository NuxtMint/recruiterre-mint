import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    jobs: defineCollection({
      source: 'jobs/*.md',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        title: z.string(),
        salary: z.number(),
        location: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        description: z.string(),
        company: z.string(),
        officeHours: z.string().optional(),
        verified: z.boolean().default(false),
        featured: z.boolean().default(false),
      }),
    }),
  },
});
