import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string().or(z.date()),
        subtitle: z.string().optional(),
        canonicalURL: z.string().optional(),
        bannerURL: z.string().optional(),
        published: z.boolean().optional(),
      })
    }),
  }
})
