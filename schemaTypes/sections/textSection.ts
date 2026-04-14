import {defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    {
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({title, content}: {title?: string; content?: unknown[]}) {
      const contentCount = Array.isArray(content) ? content.length : 0

      return {
        title: sectionPreviewTitle('Text Section', title),
        subtitle: `${contentCount} block${contentCount === 1 ? '' : 's'}`,
      }
    },
  },
})
