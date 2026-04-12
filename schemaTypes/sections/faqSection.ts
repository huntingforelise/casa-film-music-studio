import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
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
