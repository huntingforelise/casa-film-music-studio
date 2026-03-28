import {defineField, defineType} from 'sanity'

export const cookieBanner = defineType({
  name: 'cookieBanner',
  title: 'Cookie Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Privacy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Cookies, kept simple.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'body',
      title: 'Body copy',
      type: 'text',
      rows: 4,
      initialValue:
        'We use essential cookies to keep the website secure and remember your preference. Accepting cookies also allows embedded videos to load from Vimeo.',
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'essentialButtonLabel',
      title: 'Essential only button label',
      type: 'string',
      initialValue: 'Essential only',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'acceptButtonLabel',
      title: 'Accept all button label',
      type: 'string',
      initialValue: 'Accept all cookies',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'cookieSettingsLabel',
      title: 'Cookie settings label',
      type: 'string',
      initialValue: 'Cookie settings',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'videoBlockedEyebrow',
      title: 'Video blocked eyebrow',
      type: 'string',
      initialValue: 'Video',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'videoBlockedHeading',
      title: 'Video blocked heading',
      type: 'string',
      initialValue: 'Cookies are needed to play this video.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'videoBlockedBody',
      title: 'Video blocked body copy',
      type: 'text',
      rows: 4,
      initialValue:
        'Vimeo embeds are only loaded after you accept cookies. You can still browse the rest of the site with essential cookies only.',
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'videoBlockedButtonLabel',
      title: 'Video blocked button label',
      type: 'string',
      initialValue: 'Enable video',
      validation: (Rule) => Rule.required().max(40),
    }),
  ],
})
