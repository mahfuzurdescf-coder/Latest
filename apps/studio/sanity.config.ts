import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { post, author, category, tag, programme, resource, event, teamMember, siteSettings } from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset   = process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineConfig({
  name:    'descf-studio',
  title:   'DESCF Content Studio',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('DESCF Content')
          .items([
            S.listItem().title('Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.listItem().title('Posts & Articles').schemaType('post').child(
              S.documentTypeList('post').title('All posts')
            ),
            S.listItem().title('Authors').schemaType('author').child(
              S.documentTypeList('author')
            ),
            S.listItem().title('Categories').schemaType('category').child(
              S.documentTypeList('category')
            ),
            S.listItem().title('Tags').schemaType('tag').child(
              S.documentTypeList('tag')
            ),
            S.divider(),
            S.listItem().title('Programmes').schemaType('programme').child(
              S.documentTypeList('programme')
            ),
            S.listItem().title('Resources').schemaType('resource').child(
              S.documentTypeList('resource')
            ),
            S.listItem().title('Events').schemaType('event').child(
              S.documentTypeList('event')
            ),
            S.divider(),
            S.listItem().title('Team Members').schemaType('teamMember').child(
              S.documentTypeList('teamMember')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [post, author, category, tag, programme, resource, event, teamMember, siteSettings],
  },
})
