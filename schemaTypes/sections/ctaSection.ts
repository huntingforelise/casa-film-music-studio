import {defineField, defineType} from 'sanity'
import {portableTextToPlainText} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  description:
    'Featured CTAs use a section header plus button. Inline CTAs use a short question inside a rounded card plus button.',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description:
        'Featured shows a section header and button. Inline shows only a question and button inside a card.',
      initialValue: 'featured',
      options: {
        list: [
          {title: 'Featured CTA', value: 'featured'},
          {title: 'Inline CTA', value: 'inline'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Used only for the Featured CTA header.',
      hidden: ({parent}) => parent?.variant === 'inline',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used only for the Featured CTA header.',
      hidden: ({parent}) => parent?.variant === 'inline',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      description: 'Used only for the Featured CTA header. Links are allowed.',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({allowRelative: true}),
                  },
                ],
              },
            ],
          },
        },
      ],
      hidden: ({parent}) => parent?.variant === 'inline',
    }),
    defineField({
      name: 'text',
      title: 'Question',
      type: 'string',
      description: 'Used only for the Inline CTA. Keep it short and phrase it like a question.',
      hidden: ({parent}) => parent?.variant === 'featured',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as {variant?: 'featured' | 'inline'} | undefined
          if (parent?.variant === 'inline' && !value?.trim()) {
            return 'Add a question for the Inline CTA.'
          }
          return true
        }),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      description: 'Required for both CTA variants.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button link',
      type: 'string',
      description: 'Required for both CTA variants.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || typeof value !== 'object') return true

      const variant = (value as {variant?: 'featured' | 'inline'}).variant
      const eyebrow = (value as {eyebrow?: string}).eyebrow?.trim()
      const title = (value as {title?: string}).title?.trim()
      const intro = portableTextToPlainText((value as {intro?: unknown}).intro)

      if (variant === 'featured' && !eyebrow && !title && !intro) {
        return 'Add at least one header field for the Featured CTA.'
      }

      if (variant === 'inline') {
        const question = (value as {text?: string}).text?.trim()
        if (!question) {
          return 'Add a question for the Inline CTA.'
        }
      }

      return true
    }),
  preview: {
    select: {
      variant: 'variant',
      title: 'title',
    },
    prepare({
      variant,
      title,
    }: {
      variant?: string
      title?: string
    }) {
      return {
        title: sectionPreviewTitle('CTA Section', variant === 'featured' ? title : undefined),
        subtitle: variant === 'inline' ? 'Inline' : 'Featured',
      }
    },
  },
})
