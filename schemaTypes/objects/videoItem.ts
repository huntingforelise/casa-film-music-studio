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
      name: 'interactive',
      title: 'Interactive player',
      type: 'boolean',
      initialValue: false,
      description: 'Enable controls and sound for the one video that should be interactive.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      interactive: 'interactive',
    },
    prepare({title, subtitle, interactive}) {
      return {
        title: title || 'Video item',
        subtitle: subtitle ? `${interactive ? 'interactive player' : 'muted autoplay'} · ${subtitle}` : interactive ? 'interactive player' : 'muted autoplay',
      }
    },
  },
})
