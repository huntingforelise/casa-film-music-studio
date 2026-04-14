import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      items: 'items',
      backgroundImage: 'backgroundImage',
    },
    prepare({title, items, backgroundImage}: {title?: string; items?: unknown[]; backgroundImage?: any}) {
      const count = Array.isArray(items) ? items.length : 0

      return {
        title: sectionPreviewTitle('FAQ Section', title),
        subtitle: `${count} question${count === 1 ? '' : 's'}`,
        media: backgroundImage || undefined,
      }
    },
  },
})
