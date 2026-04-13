import {defineField, defineType} from 'sanity'
import {portableTextToPlainText, sectionHeaderFields} from './sectionHeader'

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
      intro: 'intro',
      items: 'items',
      backgroundImage: 'backgroundImage',
    },
    prepare({
      title,
      intro,
      items,
      backgroundImage,
    }: {
      title?: string
      intro?: unknown
      items?: unknown[]
      backgroundImage?: any
    }) {
      const count = Array.isArray(items) ? items.length : 0
      const subtitle =
        portableTextToPlainText(intro) ||
        (count ? `${count} question${count === 1 ? '' : 's'}` : 'No questions yet')

      return {
        title: title || 'FAQ Section',
        subtitle: backgroundImage ? `${subtitle} with background image` : subtitle,
        media: backgroundImage || undefined,
      }
    },
  },
})
