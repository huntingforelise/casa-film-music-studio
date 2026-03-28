import { defineField, defineType } from 'sanity';
export const faqSection = defineType({
    name: 'faqSection',
    title: 'FAQ Section',
    type: 'object',
    fields: [
        defineField({
            name: 'items',
            title: 'FAQ Items',
            type: 'array',
            of: [{ type: 'faqItem' }],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            items: 'items',
        },
        prepare({ items }) {
            const count = Array.isArray(items) ? items.length : 0;
            return {
                title: 'FAQ Section',
                subtitle: count ? `${count} question${count === 1 ? '' : 's'}` : 'No questions yet',
            };
        },
    },
});
