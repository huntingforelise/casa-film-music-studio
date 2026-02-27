import { defineType, defineField } from 'sanity'

export const navigationLink = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label' }),
    defineField({ name: 'url', type: 'string', title: 'URL or slug' }),
    defineField({
      name: 'subLinks',
      title: 'Sub links',
      type: 'array',
      of: [{ type: 'navigationSubLink' }],
    }),
  ],
})
