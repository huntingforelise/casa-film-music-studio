import {defineType, defineField} from 'sanity'
import {sectionPreviewTitle} from './sectionPreview'

export const splitHeroSection = defineType({
  name: 'splitHeroSection',
  title: 'Split Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'introLine',
      title: 'Intro line',
      type: 'string',
      description: 'Optional. Keep it short and direct, like a route into the page.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'optionOne',
      title: 'Option One',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          validation: (Rule) => Rule.required(),
          description: 'Use an image that speaks to this audience.',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Describe the image for screen readers.',
              validation: (Rule) => Rule.required().max(140),
            }),
          ],
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
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          validation: (Rule) => Rule.required(),
          description: 'Use an image that speaks to this audience.',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Describe the image for screen readers.',
              validation: (Rule) => Rule.required().max(140),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'optionOne.image',
    },
    prepare({media}) {
      return {
        title: sectionPreviewTitle('Split Hero Section'),
        subtitle: '2 options',
        media,
      }
    },
  },
})
