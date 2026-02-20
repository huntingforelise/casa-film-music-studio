import { StructureResolver } from 'sanity/structure'
import { singletonTypes } from './lib/singletons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // SINGLETON DOCUMENTS
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),

      S.listItem()
        .title('Header')
        .id('header')
        .child(
          S.document()
            .schemaType('header')
            .documentId('header')
        ),

      S.listItem()
        .title('Footer')
        .id('footer')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),

      // OTHER DOCUMENTS (normal collection)
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId()!)
      ),
    ])
