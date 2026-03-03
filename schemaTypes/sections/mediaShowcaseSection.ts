import {defineField, defineType} from 'sanity'

export const mediaShowcaseSection = defineType({
  name: 'mediaShowcaseSection',
  title: 'Media Showcase',
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
      name: 'layoutVariant',
      title: 'Single item layout',
      type: 'string',
      initialValue: 'auto',
      options: {
        list: [
          {title: 'Auto', value: 'auto'},
          {title: 'Compact', value: 'compact'},
          {title: 'Hero', value: 'hero'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Used when there are no supporting items.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredPhoto',
      title: 'Featured photo',
      type: 'photoItem',
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'photo',
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured video',
      type: 'videoItem',
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'video',
    }),
    defineField({
      name: 'photos',
      title: 'Supporting photos',
      type: 'array',
      of: [{type: 'photoItem'}],
      validation: (Rule) => Rule.max(6),
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'photo',
    }),
    defineField({
      name: 'videos',
      title: 'Supporting videos',
      type: 'array',
      of: [{type: 'videoItem'}],
      validation: (Rule) => Rule.max(6),
      hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'video',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || typeof value !== 'object') return true

      const mediaType = (value as {mediaType?: string}).mediaType
      const featuredPhoto = (value as {featuredPhoto?: unknown}).featuredPhoto
      const featuredVideo = (value as {featuredVideo?: unknown}).featuredVideo

      if (mediaType === 'photo' && !featuredPhoto) {
        return 'Select a featured photo when media type is photo.'
      }

      if (mediaType === 'video' && !featuredVideo) {
        return 'Select a featured video when media type is video.'
      }

      return true
    }),
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      photos: 'photos',
      videos: 'videos',
    },
    prepare({title, mediaType, photos, videos}) {
      const count =
        mediaType === 'video'
          ? Array.isArray(videos)
            ? videos.length
            : 0
          : Array.isArray(photos)
            ? photos.length
            : 0

      return {
        title: title || 'Media Showcase',
        subtitle: `${count} supporting ${mediaType === 'video' ? 'videos' : 'photos'}`,
      }
    },
  },
})
