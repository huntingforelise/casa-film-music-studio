import {defineField, defineType} from 'sanity'
import {portableTextToPlainText, sectionHeaderFields} from './sectionHeader'

export const mediaTextSection = defineType({
  name: 'mediaTextSection',
  title: 'Media + Text Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaPosition',
      title: 'Media position',
      type: 'string',
      options: {
        list: [
          {title: 'Right (text on left)', value: 'right'},
          {title: 'Left (text on right)', value: 'left'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaOrientation',
      title: 'Media orientation',
      type: 'string',
      initialValue: 'landscape',
      options: {
        layout: 'radio',
        list: [
          {title: 'Landscape (wide)', value: 'landscape'},
          {title: 'Portrait (tall)', value: 'portrait'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({parent}) => parent?.mediaType !== 'photo',
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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as {mediaType?: 'photo' | 'video'} | undefined
          if (parent?.mediaType === 'photo' && !value) {
            return 'Add an image when Media type is Photo.'
          }
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoItem',
      hidden: ({parent}) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context?.parent as {mediaType?: 'photo' | 'video'} | undefined
          if (parent?.mediaType === 'video' && !value) {
            return 'Add a video when Media type is Video.'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
      title: 'title',
      intro: 'intro',
      mediaType: 'mediaType',
      mediaPosition: 'mediaPosition',
      mediaOrientation: 'mediaOrientation',
    },
    prepare({
      eyebrow,
      title,
      intro,
      mediaType,
      mediaPosition,
      mediaOrientation,
    }: {
      eyebrow?: string
      title?: string
      intro?: unknown
      mediaType?: string
      mediaPosition?: string
      mediaOrientation?: string
    }) {
      const mediaLabel = mediaType === 'video' ? 'Video' : 'Photo'
      const orientationLabel = mediaOrientation === 'portrait' ? 'portrait' : 'landscape'
      const positionLabel = mediaPosition === 'left' ? 'left' : 'right'
      const headerTitle = [eyebrow, title].filter(Boolean).join(' · ')
      const introLabel = portableTextToPlainText(intro)
      return {
        title: headerTitle ? `Media + Text Section · ${headerTitle}` : 'Media + Text Section',
        subtitle: [mediaLabel, orientationLabel, positionLabel, introLabel]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
