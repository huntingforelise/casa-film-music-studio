import {defineField, defineType} from 'sanity'

export const logoItem = defineType({
  name: 'logoItem',
  title: 'Logo Item',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Logo image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the logo for screen readers.',
          validation: (Rule) => Rule.required().max(140),
        }),
      ],
    }),
    defineField({
      name: 'url',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link to the client or partner website.',
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({media}) {
      return {
        title: 'Logo item',
        media,
      }
    },
  },
})
