import {defineField, defineType} from 'sanity'

export const mediaRowSection = defineType({
  name: 'mediaRowSection',
  title: 'Media Row Section',
  description:
    'Render one media type at a time (photos or videos) with a single orientation. Rows show up to four cards before wrapping and stay responsive at smaller breakpoints.',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mediaOrientation',
      title: 'Media orientation',
      type: 'string',
      description:
        'Choose portrait or landscape for every item in this row (mixing is not supported).',
      initialValue: 'portrait',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Portrait (tall)', value: 'portrait'},
          {title: 'Landscape (wide)', value: 'landscape'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      description:
        'Select whether this row uses photos or videos; items must all be the same type.',
      initialValue: 'photo',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Video', value: 'video'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{type: 'photoItem'}],
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'photo',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{type: 'videoItem'}],
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'video',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || typeof value !== 'object') return true

      const mediaType = (value as {mediaType?: string}).mediaType
      const photos = (value as {photos?: unknown[]}).photos
      const videos = (value as {videos?: unknown[]}).videos

      if (mediaType === 'photo') {
        if (!Array.isArray(photos) || photos.length === 0) {
          return 'Add at least one photo for this section.'
        }
      }

      if (mediaType === 'video') {
        if (!Array.isArray(videos) || videos.length === 0) {
          return 'Add at least one video for this section.'
        }
      }

      return true
    }),
  preview: {
    select: {
      mediaType: 'mediaType',
      photos: 'photos',
      videos: 'videos',
      mediaOrientation: 'mediaOrientation',
    },
    prepare({mediaType, photos, videos, mediaOrientation}) {
      const count =
        mediaType === 'video'
          ? Array.isArray(videos)
            ? videos.length
            : 0
          : Array.isArray(photos)
            ? photos.length
            : 0
      const orientationLabel = mediaOrientation === 'landscape' ? 'landscape' : 'portrait'

      return {
        title: 'Media Row Section',
        subtitle: `${count} ${mediaType === 'video' ? 'videos' : 'photos'} (${orientationLabel})`,
      }
    },
  },
})
