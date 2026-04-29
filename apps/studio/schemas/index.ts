// Central schema barrel — import from here in sanity.config.ts

export { post } from './post'

export {
  author,
  category,
  tag,
  programme,
  resource,
  event,
  teamMember,
  siteSettings,
} from './other-schemas'

export { imageWithAltCredit } from './objects/imageWithAltCredit'
export { seoFields } from './objects/seoFields'
export { editorialWorkflow } from './objects/editorialWorkflow'
export { link } from './objects/link'