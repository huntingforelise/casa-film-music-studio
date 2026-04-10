import {defineField, defineType} from 'sanity'

export const featureCardSection = defineType({
  name: 'featureCardSection',
  title: 'Feature Card Section',
  description: 'A vertical card grid with a title, subtitle, image, and descriptive text.',
  type: 'object',
  fields: [
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
