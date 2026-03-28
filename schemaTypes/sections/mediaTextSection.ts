import {defineField, defineType} from 'sanity'

export const mediaTextSection = defineType({
  name: 'mediaTextSection',
  title: 'Media + Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
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
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const parent = context?.parent as {
            mediaOrientation?: 'landscape' | 'portrait'
            landscapeMediaSize?: 'small' | 'large'
            portraitMediaSize?: 'small' | 'standard' | 'large'
          } | undefined

          const isSmallMedia =
            parent?.mediaOrientation === 'landscape'
              ? parent.landscapeMediaSize === 'small'
              : parent?.portraitMediaSize === 'small'

          if (value === 'left' && isSmallMedia) {
            return 'Small media must be placed on the right.'
          }

          return true
        }),
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
      name: 'landscapeMediaSize',
      title: 'Landscape media size',
      type: 'string',
      hidden: ({parent}) => parent?.mediaOrientation !== 'landscape',
      initialValue: 'large',
      options: {
        layout: 'radio',
        list: [
          {title: 'Large (default)', value: 'large'},
          {title: 'Small', value: 'small'},
        ],
      },
    }),
    defineField({
      name: 'portraitMediaSize',
      title: 'Portrait media size',
      type: 'string',
      hidden: ({parent}) => parent?.mediaOrientation !== 'portrait',
      initialValue: 'standard',
      options: {
        layout: 'radio',
        list: [
          {title: 'Standard (default)', value: 'standard'},
          {title: 'Large', value: 'large'},
          {title: 'Small (smallest)', value: 'small'},
        ],
      },
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
          validation: (Rule) => Rule.max(140),
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
      title: 'title',
      mediaType: 'mediaType',
      mediaOrientation: 'mediaOrientation',
      landscapeMediaSize: 'landscapeMediaSize',
      portraitMediaSize: 'portraitMediaSize',
    },
    prepare({
      title,
      mediaType,
      mediaOrientation,
      landscapeMediaSize,
      portraitMediaSize,
    }: {
      title?: string
      mediaType?: string
      mediaOrientation?: string
      landscapeMediaSize?: string
      portraitMediaSize?: string
    }) {
      const mediaLabel = mediaType === 'video' ? 'Video' : 'Photo'
      const orientationLabel = mediaOrientation === 'portrait' ? 'portrait' : 'landscape'
      let sizeLabel = ''

      if (mediaOrientation === 'portrait') {
        sizeLabel = `, ${
          portraitMediaSize === 'small'
            ? 'small'
            : portraitMediaSize === 'standard'
              ? 'standard'
              : 'large'
        }`
      } else {
        sizeLabel = landscapeMediaSize === 'small' ? ', small' : ', large'
      }
      return {
        title: title ? `Media + Text Section · ${title}` : 'Media + Text Section',
        subtitle: `${mediaLabel} (${orientationLabel}${sizeLabel})`,
      }
    },
  },
})
