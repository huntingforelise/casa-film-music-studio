import { singletonTypes } from './lib/singletons';
export const structure = (S) => S.list()
    .title('Content')
    .items([
    // SINGLETON DOCUMENTS
    S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
    S.listItem()
        .title('Header')
        .id('header')
        .child(S.document().schemaType('header').documentId('header')),
    S.listItem()
        .title('Footer')
        .id('footer')
        .child(S.document().schemaType('footer').documentId('footer')),
    S.listItem()
        .title('Booking Settings')
        .id('bookingSettings')
        .child(S.document().schemaType('bookingSettings').documentId('bookingSettings')),
    S.listItem()
        .title('Contact Form')
        .id('contactForm')
        .child(S.document().schemaType('contactForm').documentId('contactForm')),
    // OTHER DOCUMENTS (normal collection)
    ...S.documentTypeListItems().filter((listItem) => !singletonTypes.has(listItem.getId())),
]);
