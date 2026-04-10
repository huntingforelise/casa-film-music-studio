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
          {title: 'Standard hero page', value: 'standardHero'},
          {title: 'Compact hero page', value: 'compactHero'},
          {title: 'Full screen hero page', value: 'fullScreenHero'},
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
        {type: 'twoColumnTextSection'},
        {type: 'quoteSection'},
        {type: 'mediaTextSection'},
        {type: 'mediaRowSection'},
        {type: 'videoShowcaseSection'},
        {type: 'ctaSection'},
        {type: 'testimonialSection'},
        {type: 'logoStripSection'},
        {type: 'faqSection'},
        {type: 'photoMosaicSection'},
      ],
    }),
  ],
})
