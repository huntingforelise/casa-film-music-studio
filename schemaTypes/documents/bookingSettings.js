import { defineArrayMember, defineField, defineType } from 'sanity';
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
                        select: { title: 'title', subtitle: 'value' },
                        prepare({ title, subtitle }) {
                            return { title, subtitle };
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
                        defineField({ name: 'description', title: 'Description', type: 'string' }),
                        defineField({
                            name: 'basePrice',
                            title: 'Starting price',
                            type: 'number',
                            validation: (Rule) => Rule.min(0),
                        }),
                        defineField({ name: 'priceNote', title: 'Price note', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'value', basePrice: 'basePrice' },
                        prepare({ title, subtitle, basePrice }) {
                            return {
                                title,
                                subtitle: basePrice ? `${subtitle} - from ${basePrice}` : subtitle,
                            };
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
                        defineField({ name: 'description', title: 'Description', type: 'string' }),
                        defineField({
                            name: 'includedServices',
                            title: 'Included services',
                            type: 'array',
                            of: [defineArrayMember({ type: 'string' })],
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
                        defineField({ name: 'priceNote', title: 'Price note', type: 'string' }),
                        defineField({ name: 'highlightLabel', title: 'Highlight label', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'code', startingPrice: 'startingPrice' },
                        prepare({ title, subtitle, startingPrice }) {
                            return {
                                title,
                                subtitle: startingPrice ? `${subtitle} - from ${startingPrice}` : subtitle,
                            };
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
                        defineField({ name: 'description', title: 'Description', type: 'string' }),
                        defineField({
                            name: 'price',
                            title: 'Price',
                            type: 'number',
                            validation: (Rule) => Rule.min(0),
                        }),
                        defineField({ name: 'priceNote', title: 'Price note', type: 'string' }),
                        defineField({
                            name: 'applicableServices',
                            title: 'Applicable services (optional)',
                            type: 'array',
                            of: [defineArrayMember({ type: 'string' })],
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'code', price: 'price', priceNote: 'priceNote' },
                        prepare({ title, subtitle, price, priceNote }) {
                            const detail = typeof price === 'number' ? `${price}` : priceNote;
                            return {
                                title,
                                subtitle: detail ? `${subtitle} - ${detail}` : subtitle,
                            };
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
                        defineField({ name: 'feeNote', title: 'Fee note', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'value', fee: 'fee', feeNote: 'feeNote' },
                        prepare({ title, subtitle, fee, feeNote }) {
                            const detail = typeof fee === 'number' ? fee : feeNote;
                            return {
                                title,
                                subtitle: detail ? `${subtitle} - ${detail}` : subtitle,
                            };
                        },
                    },
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'copy',
            title: 'Copy text',
            type: 'object',
            fields: [
                defineField({
                    name: 'eventTypeLabel',
                    title: 'Event type label',
                    type: 'string',
                }),
                defineField({
                    name: 'eventDateLabel',
                    title: 'Event date label',
                    type: 'string',
                }),
                defineField({
                    name: 'startTimeLabel',
                    title: 'Start time label',
                    type: 'string',
                }),
                defineField({
                    name: 'durationLabel',
                    title: 'Duration label',
                    type: 'string',
                }),
                defineField({
                    name: 'guestCountLabel',
                    title: 'Estimated guests label',
                    type: 'string',
                }),
                defineField({
                    name: 'travelRegionLabel',
                    title: 'Travel region label',
                    type: 'string',
                }),
                defineField({
                    name: 'venueLabel',
                    title: 'Venue label',
                    type: 'string',
                }),
                defineField({
                    name: 'venuePlaceholder',
                    title: 'Venue placeholder',
                    type: 'string',
                }),
                defineField({
                    name: 'serviceFromLabel',
                    title: 'Service price prefix',
                    type: 'string',
                }),
                defineField({
                    name: 'priceOnRequestText',
                    title: 'Price on request text',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleIntro',
                    title: 'Bundle intro',
                    type: 'text',
                    rows: 3,
                }),
                defineField({
                    name: 'bundleNoSuggestions',
                    title: 'Bundle no suggestions',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleSelectLabel',
                    title: 'Bundle select label',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleSelectedLabel',
                    title: 'Bundle selected label',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleAddMissingLabel',
                    title: 'Bundle add missing label',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleIncludesLabel',
                    title: 'Bundle includes label',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleStartingPricePrefix',
                    title: 'Bundle starting price prefix',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleOriginalPricePrefix',
                    title: 'Bundle comparison price prefix',
                    type: 'string',
                }),
                defineField({
                    name: 'bundleRegularPricePrefix',
                    title: 'Bundle fallback price prefix',
                    type: 'string',
                }),
                defineField({
                    name: 'addOnsEmptyText',
                    title: 'Add-ons empty state text',
                    type: 'text',
                    rows: 2,
                }),
                defineField({
                    name: 'summaryTitle',
                    title: 'Summary title',
                    type: 'string',
                }),
                defineField({
                    name: 'summarySubtitle',
                    title: 'Summary subtitle',
                    type: 'text',
                    rows: 2,
                }),
                defineField({
                    name: 'summaryNoneSelectedText',
                    title: 'Summary none selected text',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryNotProvidedText',
                    title: 'Summary not provided text',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryNoPackageText',
                    title: 'Summary no package text',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelEvent',
                    title: 'Summary label (event)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelDate',
                    title: 'Summary label (date)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelTime',
                    title: 'Summary label (time)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelDuration',
                    title: 'Summary label (duration)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelGuests',
                    title: 'Summary label (guests)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelVenue',
                    title: 'Summary label (venue)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelTravel',
                    title: 'Summary label (travel)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelServices',
                    title: 'Summary label (services)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelPackage',
                    title: 'Summary label (package)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryLabelAddOns',
                    title: 'Summary label (add-ons)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryContactNameLabel',
                    title: 'Summary contact label (name)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryContactEmailLabel',
                    title: 'Summary contact label (email)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryContactPhoneLabel',
                    title: 'Summary contact label (phone)',
                    type: 'string',
                }),
                defineField({
                    name: 'summaryNotesLabel',
                    title: 'Summary notes label',
                    type: 'string',
                }),
                defineField({
                    name: 'buttonBackText',
                    title: 'Button back label',
                    type: 'string',
                }),
                defineField({
                    name: 'buttonContinueText',
                    title: 'Button continue label',
                    type: 'string',
                }),
                defineField({
                    name: 'buttonSubmitText',
                    title: 'Button submit label',
                    type: 'string',
                }),
                defineField({
                    name: 'buttonSubmittingText',
                    title: 'Button submitting label',
                    type: 'string',
                }),
                defineField({
                    name: 'feedbackNetworkErrorText',
                    title: 'Network error text',
                    type: 'string',
                }),
                defineField({
                    name: 'feedbackGenericErrorText',
                    title: 'Generic error text',
                    type: 'string',
                }),
                defineField({
                    name: 'feedbackPersistedText',
                    title: 'Persisted success text',
                    type: 'string',
                }),
                defineField({
                    name: 'feedbackNotPersistedText',
                    title: 'Not persisted success text',
                    type: 'string',
                }),
            ],
        }),
    ],
});
