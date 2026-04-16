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
      name: 'subtitle',
      type: 'string',
      description: 'Short supporting line shown in the hero for this page.',
      hidden: ({document}) =>
        (document as {template?: string} | undefined)?.template === 'compactHero',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const template = (context?.document as {template?: string} | undefined)?.template

          if (template === 'compactHero') {
            return true
          }

          return typeof value === 'string' && value.trim().length > 0
            ? true
            : 'Add a subtitle for standard and full screen hero pages.'
        }),
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
        {type: 'featureCardSection'},
        {type: 'processSection'},
        {type: 'logoStripSection'},
        {type: 'faqSection'},
        {type: 'photoMosaicSection'},
      ],
      validation: (Rule) =>
        Rule.custom((sections, context) => {
          const template = (context?.document as {template?: string} | undefined)?.template
          const heroCount = Array.isArray(sections)
            ? sections.filter((section) => (section as {_type?: string})?._type === 'heroSection')
                .length
            : 0

          if (template === 'compactHero') {
            return heroCount === 0 ? true : 'Compact hero pages cannot include a Hero section.'
          }

          if (template === 'standardHero' || template === 'fullScreenHero') {
            if (heroCount === 0) {
              return 'Add exactly one Hero section for this page template.'
            }

            if (heroCount > 1) {
              return 'Use only one Hero section for this page template.'
            }
          }

          return true
        }),
    }),
  ],
})
