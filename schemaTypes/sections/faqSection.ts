import {defineField, defineType} from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading above the FAQ cards.',
    }),
    defineField({
      name: 'intro',
      title: 'Intro copy',
      type: 'text',
      rows: 2,
      description: 'Optional supporting copy above the FAQ cards.',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [{type: 'faqItem'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      intro: 'intro',
      items: 'items',
    },
    prepare({title, intro, items}: {title?: string; intro?: string; items?: unknown[]}) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'FAQ Section',
        subtitle:
          intro?.trim() ||
          (count ? `${count} question${count === 1 ? '' : 's'}` : 'No questions yet'),
      }
    },
  },
})
