import { defineType, defineField } from 'sanity'

export const splitHeroSection = defineType({
  name: 'splitHeroSection',
  title: 'Split Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Main Question',
      type: 'string',
    }),

    defineField({
      name: 'optionOne',
      title: 'Option One',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'image', type: 'image' },
        { name: 'link', type: 'string' },
      ],
    }),

    defineField({
      name: 'optionTwo',
      title: 'Option Two',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'image', type: 'image' },
        { name: 'link', type: 'string' },
      ],
    }),
  ],
})
