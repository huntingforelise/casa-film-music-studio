import {defineField, defineType} from 'sanity'

export const navigationSubLink = defineType({
  name: 'navigationSubLink',
  title: 'Navigation Sub Link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', title: 'Label'}),
    defineField({name: 'url', type: 'string', title: 'URL or slug'}),
  ],
})
