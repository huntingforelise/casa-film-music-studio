import { defineField, defineType } from 'sanity';
export const heroSection = defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    description: 'Describe the image for screen readers.',
                    validation: (Rule) => Rule.max(140),
                }),
            ],
        }),
    ],
    preview: {
        select: {
            media: 'image',
        },
        prepare({ media }) {
            return {
                title: 'Hero section',
                subtitle: 'Fullscreen hero image',
                media,
            };
        },
    },
});
