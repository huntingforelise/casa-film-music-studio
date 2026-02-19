import { defineType } from "sanity";

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'subtitle', type: 'text' },
    { name: 'image', type: 'image' },
  ],
})
