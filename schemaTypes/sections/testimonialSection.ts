import {defineField, defineType} from 'sanity'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro copy',
      type: 'text',
      rows: 2,
      description: 'Optional supporting copy above the cards.',
    }),
    defineField({
      name: 'cards',
      title: 'Testimonial cards',
      type: 'array',
      of: [{type: 'testimonialCard'}],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}: {title?: string}) {
      return {
        title: title || 'Testimonial Section',
      }
    },
  },
})
