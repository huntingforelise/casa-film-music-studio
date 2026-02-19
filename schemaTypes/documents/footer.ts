import { defineType, defineField } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({ name: 'text', type: 'text' }),
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'navigationLink' }],
    }),
  ],
})
