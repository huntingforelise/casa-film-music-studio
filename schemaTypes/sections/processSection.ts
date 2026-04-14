import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section',
  description: 'A step-by-step section with numbered steps.',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(2).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'steps',
    },
    prepare({title, steps}: {title?: string; steps?: unknown[]}) {
      const count = Array.isArray(steps) ? steps.length : 0

      return {
        title: sectionPreviewTitle('Process Section', title),
        subtitle: `${count} step${count === 1 ? '' : 's'}`,
      }
    },
  },
})
