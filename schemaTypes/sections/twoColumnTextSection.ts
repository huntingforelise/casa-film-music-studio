import {defineField, defineType} from 'sanity'

export const twoColumnTextSection = defineType({
  name: 'twoColumnTextSection',
  title: 'Two Column Text Section',
  type: 'object',
  fields: [
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
    prepare() {
      return {
        title: 'Two Column Text Section',
        subtitle: 'Two rich text columns that stack on mobile',
      }
    },
  },
})
