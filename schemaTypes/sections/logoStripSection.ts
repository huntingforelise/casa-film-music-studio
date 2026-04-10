import {defineField, defineType} from 'sanity'

export const logoStripSection = defineType({
  name: 'logoStripSection',
  title: 'Logo Strip Section',
  description: 'A responsive grid of client or partner logos.',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short label for the section, such as Clients or Partners.',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'intro',
      title: 'Intro copy',
      type: 'text',
      rows: 2,
      description: 'Supporting copy above the logo grid.',
      validation: (Rule) => Rule.required().max(120),
    }),
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
        title: title || 'Logo Strip Section',
        subtitle: `${count} logo${count === 1 ? '' : 's'}`,
      }
    },
  },
})
