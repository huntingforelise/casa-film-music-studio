import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section',
  description: 'A step-by-step section with numbered steps and an optional background image.',
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
      backgroundImage: 'backgroundImage',
    },
    prepare({
      title,
      steps,
      backgroundImage,
    }: {
      title?: string
      steps?: unknown[]
      backgroundImage?: any
    }) {
      const count = Array.isArray(steps) ? steps.length : 0

      return {
        title: title || 'Process Section',
        subtitle: `${count} step${count === 1 ? '' : 's'}${backgroundImage ? ' with background image' : ''}`,
        media: backgroundImage || undefined,
      }
    },
  },
})
