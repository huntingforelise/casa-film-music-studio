import {defineField, defineType} from 'sanity'

const getParentFieldName = (path: unknown[] | undefined) => {
  if (!Array.isArray(path)) return undefined

  for (let index = path.length - 2; index >= 0; index -= 1) {
    const segment = path[index]
    if (typeof segment === 'string') {
      return segment
    }
  }

  return undefined
}

const getValueAtPath = (value: unknown, path: unknown[] | undefined) => {
  if (!Array.isArray(path)) return undefined

  return path.reduce<unknown>((current, segment) => {
    if (current == null) {
      return undefined
    }

    if (typeof segment === 'string' || typeof segment === 'number') {
      return (current as Record<string | number, unknown>)[segment]
    }

    return undefined
  }, value)
}

export const videoItem = defineType({
  name: 'videoItem',
  title: 'Video Item',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }).custom((value, context) => {
          const parentField = getParentFieldName(context?.path)

          if (parentField === 'video') {
            const section = getValueAtPath(context?.document, context?.path?.slice(0, -2))
            const mediaType = (section as {mediaType?: string} | undefined)?.mediaType

            if (mediaType !== 'video' && !value) {
              return true
            }
          }

          if (!value) {
            return 'Add a video URL.'
          }

          return true
        }),
    }),
    defineField({
      name: 'title',
      title: 'Video title',
      type: 'string',
      description: 'Used as iframe title for accessibility.',
    }),
    defineField({
      name: 'interactive',
      title: 'Interactive player',
      type: 'boolean',
      initialValue: false,
      description: 'Enable controls and sound for the one video that should be interactive.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      interactive: 'interactive',
    },
    prepare({title, subtitle, interactive}) {
      return {
        title: title || 'Video item',
        subtitle: subtitle ? `${interactive ? 'interactive player' : 'muted autoplay'} · ${subtitle}` : interactive ? 'interactive player' : 'muted autoplay',
      }
    },
  },
})
