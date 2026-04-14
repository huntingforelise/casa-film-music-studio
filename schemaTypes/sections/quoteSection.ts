import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const quoteSection = defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
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
      title: 'title',
    },
    prepare({title}: {title?: string}) {
      return {
        title: sectionPreviewTitle('Quote Section', title),
        subtitle: 'Quote with attribution',
      }
    },
  },
})
