import {defineField, defineType} from 'sanity'

export const featureCardSection = defineType({
  name: 'featureCardSection',
  title: 'Feature Card Section',
  description:
    'A vertical card grid with an optional eyebrow, intro copy, images, and a supporting callout.',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Optional short label above the title.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Supporting copy above the cards.',
    }),
    defineField({
      name: 'cards',
      title: 'Feature cards',
      type: 'array',
      of: [{type: 'featureCard'}],
      validation: (Rule) => Rule.required().min(2).max(12),
    }),
    defineField({
      name: 'calloutTitle',
      title: 'Callout title',
      type: 'string',
      description: 'Optional heading for an included-in-all-options panel.',
    }),
    defineField({
      name: 'calloutText',
      title: 'Callout text',
      type: 'text',
      rows: 3,
      description: 'Optional short paragraph for the support panel.',
    }),
    defineField({
      name: 'calloutItems',
      title: 'Callout items',
      type: 'array',
      description: 'Optional bullet list for shared inclusions or setup details.',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cards: 'cards',
    },
    prepare({title, cards}: {title?: string; cards?: unknown[]}) {
      const count = Array.isArray(cards) ? cards.length : 0

      return {
        title: title || 'Feature Card Section',
        subtitle: `${count} card${count === 1 ? '' : 's'}`,
      }
    },
  },
})
