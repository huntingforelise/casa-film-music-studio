import {defineArrayMember, defineField, defineType} from 'sanity'

export const bookingSettings = defineType({
  name: 'bookingSettings',
  title: 'Booking Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'introTitle',
      title: 'Intro title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introText',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer note',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventTypes',
      title: 'Event types',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'value'},
            prepare({title, subtitle}) {
              return {title, subtitle}
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({
              name: 'basePrice',
              title: 'Starting price',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({name: 'priceNote', title: 'Price note', type: 'string'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'value', basePrice: 'basePrice'},
            prepare({title, subtitle, basePrice}) {
              return {
                title,
                subtitle: basePrice ? `${subtitle} - from ${basePrice}` : subtitle,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'bundles',
      title: 'Bundle packages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'code',
              title: 'Code',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({
              name: 'includedServices',
              title: 'Included services',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              validation: (Rule) => Rule.required().min(2),
            }),
            defineField({
              name: 'startingPrice',
              title: 'Starting price',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'originalPrice',
              title: 'Original price',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({name: 'priceNote', title: 'Price note', type: 'string'}),
            defineField({name: 'highlightLabel', title: 'Highlight label', type: 'string'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'code', startingPrice: 'startingPrice'},
            prepare({title, subtitle, startingPrice}) {
              return {
                title,
                subtitle: startingPrice ? `${subtitle} - from ${startingPrice}` : subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'addOns',
      title: 'Add-ons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'code',
              title: 'Code',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'description', title: 'Description', type: 'string'}),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({name: 'priceNote', title: 'Price note', type: 'string'}),
            defineField({
              name: 'applicableServices',
              title: 'Applicable services (optional)',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'code', price: 'price', priceNote: 'priceNote'},
            prepare({title, subtitle, price, priceNote}) {
              const detail = typeof price === 'number' ? `${price}` : priceNote
              return {
                title,
                subtitle: detail ? `${subtitle} - ${detail}` : subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'travelRegions',
      title: 'Travel regions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fee',
              title: 'Estimated fee',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({name: 'feeNote', title: 'Fee note', type: 'string'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'value', fee: 'fee', feeNote: 'feeNote'},
            prepare({title, subtitle, fee, feeNote}) {
              const detail = typeof fee === 'number' ? fee : feeNote
              return {
                title,
                subtitle: detail ? `${subtitle} - ${detail}` : subtitle,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
