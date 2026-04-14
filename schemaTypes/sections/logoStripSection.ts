import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const logoStripSection = defineType({
  name: 'logoStripSection',
  title: 'Logo Strip Section',
  description: 'A responsive grid of client or partner logos.',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [{type: 'logoItem'}],
      validation: (Rule) => Rule.required().min(5).max(20),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      logos: 'logos',
    },
    prepare({title, logos}: {title?: string; logos?: unknown[]}) {
      const count = Array.isArray(logos) ? logos.length : 0

      return {
        title: sectionPreviewTitle('Logo Strip Section', title),
        subtitle: `${count} logo${count === 1 ? '' : 's'}`,
      }
    },
  },
})
