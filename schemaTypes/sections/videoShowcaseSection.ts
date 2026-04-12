import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'

const SUPPORTING_VIDEO_COUNTS = {
  landscape: 2,
  portrait: 4,
} as const

export const videoShowcaseSection = defineType({
  name: 'videoShowcaseSection',
  title: 'Video Showcase',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
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
      name: 'featuredVideo',
      title: 'Featured video',
      type: 'videoItem',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videos',
      title: 'Supporting videos',
      type: 'array',
      of: [{type: 'videoItem'}],
      validation: (Rule) =>
        Rule.custom((videos, context) => {
          const orientation =
            (context?.parent as {mediaOrientation?: keyof typeof SUPPORTING_VIDEO_COUNTS})
              .mediaOrientation ?? 'landscape'
          const expected = SUPPORTING_VIDEO_COUNTS[orientation]

          if (!Array.isArray(videos)) {
            return `Add exactly ${expected} supporting videos for ${orientation} orientation.`
          }

          if (videos.length !== expected) {
            return `Use exactly ${expected} supporting videos for ${orientation} orientation.`
          }

          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videos: 'videos',
      mediaOrientation: 'mediaOrientation',
    },
    prepare({title, videos, mediaOrientation}) {
      const orientationLabel = mediaOrientation === 'portrait' ? 'portrait' : 'landscape'
      const count = Array.isArray(videos) ? videos.length : 0
      const total = 1 + count

      return {
        title: title ? `Video Showcase · ${title}` : 'Video Showcase',
        subtitle: `${total} videos (${orientationLabel})`,
      }
    },
  },
})
