import {defineField, defineType} from 'sanity'

export const quoteSection = defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The main quote text.',
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'author',
      title: 'Name',
      type: 'string',
      description: 'Who said the quote.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'The year to show after the name.',
      validation: (Rule) => Rule.required().min(1000).max(9999),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      year: 'year',
    },
    prepare({
      quote,
      author,
      year,
    }: {
      quote?: string
      author?: string
      year?: number
    }) {
      const trimmedQuote = quote?.trim() || ''
      const quotePreview = trimmedQuote
        ? `"${trimmedQuote.slice(0, 40)}${trimmedQuote.length > 40 ? '...' : ''}"`
        : ''
      const attribution = [author, year].filter(Boolean).join(', ')

      return {
        title: 'Quote Section',
        subtitle: [quotePreview, attribution].filter(Boolean).join(' · '),
      }
    },
  },
})
