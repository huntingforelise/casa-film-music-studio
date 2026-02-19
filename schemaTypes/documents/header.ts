import { defineType, defineField } from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({ name: 'logo', type: 'image' }),
    defineField({
      name: 'navigation',
      type: 'array',
      of: [{ type: 'navigationLink' }],
    }),
  ],
})
