import {defineField, defineType} from 'sanity'

export const mediaGridSection = defineType({
  name: 'mediaGridSection',
  title: 'Media Grid',
  type: 'object',
  fields: [
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
      name: 'mediaType',
      title: 'Section media type',
      type: 'string',
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
      name: 'columns',
      title: 'Columns',
      type: 'string',
      initialValue: '3',
      options: {
        list: [
          {title: '2 columns', value: '2'},
          {title: '3 columns', value: '3'},
          {title: '4 columns', value: '4'},
        ],
        layout: 'radio',
        direction: 'horizontal',
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

      if (mediaType === 'photo' && (!Array.isArray(photos) || photos.length < 2)) {
        return 'Add at least 2 photos when media type is photo.'
      }

      if (mediaType === 'video' && (!Array.isArray(videos) || videos.length < 2)) {
        return 'Add at least 2 videos when media type is video.'
      }

      return true
    }),
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      photos: 'photos',
      videos: 'videos',
      mediaOrientation: 'mediaOrientation',
    },
    prepare({title, mediaType, photos, videos, mediaOrientation}) {
      const count =
        mediaType === 'video'
          ? Array.isArray(videos)
            ? videos.length
            : 0
          : Array.isArray(photos)
            ? photos.length
            : 0
      const orientationLabel = mediaOrientation === 'portrait' ? 'portrait' : 'landscape'

      return {
        title: title ? `Media Grid · ${title}` : 'Media Grid',
        subtitle: `${count} ${mediaType === 'video' ? 'videos' : 'photos'} (${orientationLabel})`,
      }
    },
  },
})
