import {defineType, defineField} from 'sanity'

export const textImageSection = defineType({
  name: 'textImageSection',
  title: 'Text + Image Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'reverse', // optional: image left or right
      title: 'Reverse layout',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
