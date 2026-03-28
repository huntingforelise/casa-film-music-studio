import { defineField, defineType } from 'sanity';
export const testimonialCard = defineType({
    name: 'testimonialCard',
    title: 'Testimonial Card',
    type: 'object',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'author',
        },
        prepare({ title }) {
            return {
                title: title ? `Testimonial by ${title}` : 'Testimonial',
            };
        },
    },
});
