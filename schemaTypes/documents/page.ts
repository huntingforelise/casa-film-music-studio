import {defineType, defineField} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),

    defineField({
      name: 'template',
      title: 'Template',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default page', value: 'default'},
          {title: 'About page', value: 'about'},
          {title: 'Contact page', value: 'contact'},
          {title: 'Booking page', value: 'booking'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sections',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'textSection'},
        {type: 'imageSection'},
        {type: 'ctaSection'},
        {type: 'textImageSection'},
      ],
    }),
  ],
})
