import { defineType } from 'sanity';
export const ctaSection = defineType({
    name: 'ctaSection',
    title: 'CTA Section',
    type: 'object',
    fields: [
        { name: 'text', type: 'string' },
        { name: 'buttonLabel', type: 'string' },
        { name: 'buttonLink', type: 'string' },
    ],
    preview: {
        select: {
            text: 'text',
            buttonLabel: 'buttonLabel',
            buttonLink: 'buttonLink',
        },
        prepare({ text, buttonLabel }) {
            const trimmedText = (text === null || text === void 0 ? void 0 : text.trim()) || '';
            const textPreview = trimmedText.length > 80 ? `${trimmedText.slice(0, 80)}...` : trimmedText;
            const parts = [];
            if (textPreview) {
                parts.push(textPreview);
            }
            if (buttonLabel) {
                parts.push(`Button: ${buttonLabel}`);
            }
            return {
                title: 'CTA Section',
                subtitle: parts.length ? parts.join(' | ') : 'No call to action yet',
            };
        },
    },
});
