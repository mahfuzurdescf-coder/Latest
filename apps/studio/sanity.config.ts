import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { deskStructure } from './desk/structure'
import {
  post,
  author,
  category,
  tag,
  programme,
  resource,
  event,
  teamMember,
  siteSettings,
  imageWithAltCredit,
  seoFields,
  editorialWorkflow,
  link,
  formField,
  partner,
  governanceDocument,
  policy,
  homepageCuration,
  redirect,
  registrationForm,
  contactSubmission,
  eventRegistration,
} from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '7guoe2i2'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'descf-studio',
  title: 'DESCF Studio',

  projectId,
  dataset,

  basePath: '/',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: [
      imageWithAltCredit,
      seoFields,
      editorialWorkflow,
      link,
      formField,

      post,
      author,
      category,
      tag,
      programme,
      resource,
      event,
      teamMember,
      siteSettings,

      partner,
      governanceDocument,
      policy,
      homepageCuration,
      redirect,
      registrationForm,
      contactSubmission,
      eventRegistration,
    ],
  },
})
