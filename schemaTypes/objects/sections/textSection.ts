import { defineType } from "sanity";

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    { name: 'content', type: 'array', of: [{ type: 'block' }] },
  ],
})
