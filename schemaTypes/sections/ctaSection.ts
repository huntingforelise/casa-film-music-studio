import {defineType} from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'intro', title: 'Intro', type: 'text', rows: 3},
    {name: 'text', type: 'string'},
    {name: 'buttonLabel', type: 'string'},
    {name: 'buttonLink', type: 'string'},
  ],
  preview: {
    select: {
      text: 'text',
      buttonLabel: 'buttonLabel',
      buttonLink: 'buttonLink',
    },
    prepare({text, buttonLabel}: {text?: string; buttonLabel?: string}) {
      const trimmedText = text?.trim() || ''
      const textPreview = trimmedText.length > 80 ? `${trimmedText.slice(0, 80)}...` : trimmedText
      const parts: string[] = []

      if (textPreview) {
        parts.push(textPreview)
      }

      if (buttonLabel) {
        parts.push(`Button: ${buttonLabel}`)
      }

      return {
        title: 'CTA Section',
        subtitle: parts.length ? parts.join(' | ') : 'No call to action yet',
      }
    },
  },
})
