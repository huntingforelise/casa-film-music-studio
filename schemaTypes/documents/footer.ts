import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('Please enter a valid email address'),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [{type: 'navigationLink'}],
      validation: (Rule) => Rule.required().min(1),
      description: 'Add links such as /legal and /faq.',
    }),
    defineField({
      name: 'developerCreditLabel',
      title: 'Developer Credit Label',
      type: 'string',
      initialValue: 'D·EV',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'developerCreditUrl',
      title: 'Developer Credit URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
})
