import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    defineField({
      name: 'cards',
      title: 'Testimonial cards',
      type: 'array',
      of: [{type: 'testimonialCard'}],
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
        title: sectionPreviewTitle('Testimonial Section', title),
        subtitle: `${count} testimonial${count === 1 ? '' : 's'}`,
      }
    },
  },
})
