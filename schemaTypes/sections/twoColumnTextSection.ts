import {defineField, defineType} from 'sanity'
import {sectionHeaderFields} from './sectionHeader'
import {sectionPreviewTitle} from './sectionPreview'

export const twoColumnTextSection = defineType({
  name: 'twoColumnTextSection',
  title: 'Two Column Text Section',
  type: 'object',
  fields: [
    ...sectionHeaderFields,
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
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
          validation: (Rule) => Rule.required().max(140),
        }),
      ],
    }),
    defineField({
      name: 'leftContent',
      title: 'Left content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rightContent',
      title: 'Right content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      backgroundImage: 'backgroundImage',
    },
    prepare({title, backgroundImage}) {
      return {
        title: sectionPreviewTitle('Two Column Text Section', title),
        subtitle: backgroundImage
          ? 'Two rich text columns with a background image'
          : 'Two rich text columns that stack on mobile',
        media: backgroundImage,
      }
    },
  },
})
