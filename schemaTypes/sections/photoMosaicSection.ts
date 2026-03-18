import {defineField, defineType} from 'sanity'

const SLOT_KEYS = [
  'slotA',
  'slotB',
  'slotC',
  'slotD',
  'slotE',
  'slotF',
  'slotG',
  'slotH',
  'slotI',
] as const

type SlotKey = (typeof SLOT_KEYS)[number]

const hasImage = (value: Record<string, unknown>, slot: SlotKey) =>
  Boolean((value[slot] as {image?: unknown} | undefined)?.image)

export const photoMosaicSection = defineType({
  name: 'photoMosaicSection',
  title: 'Photo Mosaic Section',
  description: 'Use exactly 3, 6, or 9 photos.',
  type: 'object',
  fields: [
    defineField({
      name: 'slotA',
      title: 'Slot A — Large Landscape',
      description: 'Best for a landscape image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotB',
      title: 'Slot B — Portrait',
      description: 'Best for a portrait image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotC',
      title: 'Slot C — Portrait',
      description: 'Best for a portrait image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotD',
      title: 'Slot D — Portrait',
      description: 'Best for a portrait image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotE',
      title: 'Slot E — Large Landscape',
      description: 'Best for a landscape image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotF',
      title: 'Slot F — Portrait',
      description: 'Best for a portrait image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotG',
      title: 'Slot G — Portrait',
      description: 'Best for a portrait image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotH',
      title: 'Slot H — Portrait',
      description: 'Best for a portrait image',
      type: 'photoItem',
    }),
    defineField({
      name: 'slotI',
      title: 'Slot I — Large Landscape',
      description: 'Best for a landscape image',
      type: 'photoItem',
    }),
  ],

  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value || typeof value !== 'object') return true

      const slotValue = value as Record<string, unknown>
      const count = SLOT_KEYS.filter((key) => hasImage(slotValue, key)).length

      return [3, 6, 9].includes(count) || 'Must contain exactly 3, 6, or 9 images.'
    }),

  preview: {
    select: {
      slotA: 'slotA',
      slotB: 'slotB',
      slotC: 'slotC',
      slotD: 'slotD',
      slotE: 'slotE',
      slotF: 'slotF',
      slotG: 'slotG',
      slotH: 'slotH',
      slotI: 'slotI',
    },
    prepare(selection) {
      const count = SLOT_KEYS.filter((key) =>
        Boolean((selection[key] as {image?: unknown} | undefined)?.image),
      ).length

      const layoutLabel =
        count >= 9 ? '9 images' : count >= 6 ? '6 images' : count >= 3 ? '3 images' : '0 images'

      return {
        title: 'Photo Mosaic Section',
        subtitle: layoutLabel,
      }
    },
  },
})
