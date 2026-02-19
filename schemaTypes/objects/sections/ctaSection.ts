import { defineType } from "sanity";

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    { name: 'text', type: 'string' },
    { name: 'buttonLabel', type: 'string' },
    { name: 'buttonLink', type: 'string' },
  ],
})
