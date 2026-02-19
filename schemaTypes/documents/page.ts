import { defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },

    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
    },

    {
      name: 'sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'ctaSection' },
      ],
    },
  ],
})
