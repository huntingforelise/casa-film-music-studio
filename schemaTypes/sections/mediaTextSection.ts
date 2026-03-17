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
    },
    prepare({
      title,
      mediaType,
      mediaOrientation,
    }: {
      title?: string
      mediaType?: string
      mediaOrientation?: string
    }) {
      const mediaLabel = mediaType === 'video' ? 'Video' : 'Photo'
      const orientationLabel = mediaOrientation === 'portrait' ? 'portrait' : 'landscape'
      return {
        title: title ? `Media + Text Section · ${title}` : 'Media + Text Section',
        subtitle: `${mediaLabel} (${orientationLabel})`,
      }
    },
  },
})
