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
    type: 'text',
    rows: 2,
    description: 'Optional supporting copy above the main content.',
  }),
] as const
