import {defineField, defineType} from 'sanity'

export const testimonialCard = defineType({
  name: 'testimonialCard',
  title: 'Testimonial Card',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
      media: 'image',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Testimonial',
        subtitle: subtitle || 'Card',
        media,
      }
    },
  },
})
