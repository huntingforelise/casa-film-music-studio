import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'splitHeroSection' },
        { type: 'heroSection' },
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'ctaSection' },
      ],
    }),
  ],
})
