import { defineType } from "sanity";

export const imageSection = defineType({
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',
  fields: [
    { name: 'image', type: 'image' },
    { name: 'caption', type: 'string' },
  ],
})
