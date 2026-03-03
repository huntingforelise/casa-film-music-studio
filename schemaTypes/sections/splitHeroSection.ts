import {defineType, defineField} from 'sanity'

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
      name: 'image',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.max(140),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'optionOne',
      title: 'Option One',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'optionTwo',
      title: 'Option Two',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'question',
      media: 'image',
      optionOne: 'optionOne.title',
      optionTwo: 'optionTwo.title',
    },
    prepare({title, media, optionOne, optionTwo}) {
      return {
        title: title || 'Split Hero',
        subtitle: `${optionOne || 'Left'} / ${optionTwo || 'Right'}`,
        media,
      }
    },
  },
})
