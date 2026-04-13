import {defineField} from 'sanity'

export const sectionHeaderFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    description: 'Optional short label above the title.',
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: 'Optional section title.',
  }),
  defineField({
    name: 'intro',
    title: 'Intro copy',
    type: 'array',
    description: 'Optional supporting copy above the main content. Links are allowed.',
    of: [
      {
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: (Rule) => Rule.uri({allowRelative: true}),
                },
              ],
            },
          ],
        },
      },
    ],
  }),
] as const

export const portableTextToPlainText = (value: unknown) => {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (!Array.isArray(value)) {
    return ''
  }

  return value
    .map((block) => {
      if (!block || typeof block !== 'object') return ''

      const children = Array.isArray((block as {children?: unknown[]}).children)
        ? ((block as {children?: {text?: unknown}[]}).children ?? [])
        : []

      return children
        .map((child) => (typeof child?.text === 'string' ? child.text : ''))
        .join('')
        .trim()
    })
    .filter(Boolean)
    .join(' ')
    .trim()
}
