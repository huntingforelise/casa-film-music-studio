import {defineType, defineField} from 'sanity'

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameLabel',
      title: 'Name label',
      type: 'string',
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email label',
      type: 'string',
    }),
    defineField({
      name: 'messageLabel',
      title: 'Message label',
      type: 'string',
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit label',
      type: 'string',
    }),
    defineField({
      name: 'submittingLabel',
      title: 'Submitting label',
      type: 'string',
    }),
    defineField({
      name: 'feedbackSuccess',
      title: 'Success feedback',
      type: 'string',
    }),
    defineField({
      name: 'feedbackError',
      title: 'Error feedback',
      type: 'string',
    }),
    defineField({
      name: 'feedbackNetworkError',
      title: 'Network error feedback',
      type: 'string',
    }),
  ],
})
