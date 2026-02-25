import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({platform, url}) {
      return {
        title: platform ? platform[0].toUpperCase() + platform.slice(1) : 'Social link',
        subtitle: url,
      }
    },
  },
})
