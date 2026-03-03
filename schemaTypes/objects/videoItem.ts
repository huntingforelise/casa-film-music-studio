import {defineField, defineType} from 'sanity'

export const videoItem = defineType({
  name: 'videoItem',
  title: 'Video Item',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'title',
      title: 'Video title',
      type: 'string',
      description: 'Used as iframe title for accessibility.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      videoTitle: 'title',
      subtitle: 'url',
    },
    prepare({title, videoTitle, subtitle}) {
      return {
        title: title || videoTitle || 'Video item',
        subtitle,
      }
    },
  },
})
