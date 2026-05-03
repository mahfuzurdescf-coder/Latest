import type { StructureResolver } from 'sanity/structure'

import { ExportSubmissionsTool } from '../components/ExportSubmissionsTool'

const workflowStatuses = [
  { title: 'New', value: 'new' },
  { title: 'In Review', value: 'inReview' },
  { title: 'Contacted', value: 'contacted' },
  { title: 'Confirmed', value: 'confirmed' },
  { title: 'Rejected / Not Eligible', value: 'rejected' },
  { title: 'Needs Follow-up', value: 'needsFollowUp' },
  { title: 'Archived', value: 'archived' },
]

const submissionWorkflowItems = (S: any, type: string, titlePrefix: string) =>
  workflowStatuses.map((status) =>
    S.listItem()
      .title(status.title)
      .child(
        S.documentList()
          .title(titlePrefix + ' - ' + status.title)
          .filter('_type == $type && workflowStatus == $status')
          .params({ type, status: status.value })
          .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
      ),
  )

const singletonItem = (
  S: any,
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .schemaType(schemaType)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(documentId)
        .title(title),
    )

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('DESCF Studio')
    .items([
      S.listItem()
        .title('Website Management')
        .child(
          S.list()
            .title('Website Management')
            .items([
              singletonItem(S, 'Site Settings', 'siteSettings', 'siteSettings'),
              singletonItem(S, 'UI Labels', 'uiLabels', 'uiLabels'),

              singletonItem(
                S,
                'Homepage Curation',
                'homepageCuration',
                'homepageCuration',
              ),
              S.divider(),

              S.listItem()
                .title('Pages')
                .child(
                  S.list()
                    .title('Pages')
                    .items([
                      singletonItem(S, 'About Page', 'pageContent', 'pageContent.about'),
                      singletonItem(S, 'Mission Page', 'pageContent', 'pageContent.mission'),
                      singletonItem(S, 'Governance Page', 'pageContent', 'pageContent.governance'),
                      singletonItem(S, 'Team Page', 'pageContent', 'pageContent.team'),
                      singletonItem(S, 'Contact Page', 'pageContent', 'pageContent.contact'),
                      singletonItem(S, 'Resources Page', 'pageContent', 'pageContent.resources'),
                      singletonItem(S, 'Reports & Publications Page', 'pageContent', 'pageContent.reports-publications'),
                      singletonItem(S, 'Evidence & Resources Page', 'pageContent', 'pageContent.evidence-resources'),
                      singletonItem(S, 'Media Page', 'pageContent', 'pageContent.media'),
                      singletonItem(S, 'Partner With Us Page', 'pageContent', 'pageContent.partner-with-us'),
                      singletonItem(S, 'Strategic Priorities Page', 'pageContent', 'pageContent.strategic-priorities'),
                      singletonItem(S, 'Bangladesh Wildlife Page', 'pageContent', 'pageContent.bangladesh-wildlife'),
                    ]),
                )
            ]),
        ),

      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('Programmes')
                .schemaType('programme')
                .child(
                  S.documentTypeList('programme')
                    .title('Programmes')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                ),

              S.listItem()
                .title('Events')
                .schemaType('event')
                .child(
                  S.documentTypeList('event')
                    .title('Events')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }]),
                ),

              S.listItem()
                .title('Registration Forms')
                .schemaType('registrationForm')
                .child(
                  S.documentTypeList('registrationForm')
                    .title('Registration Forms')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                ),

              S.divider(),

              S.listItem()
                .title('Newsroom')
                .child(
                  S.list()
                    .title('Newsroom')
                    .items([
                      S.listItem()
                        .title('All Posts')
                        .schemaType('post')
                        .child(
                          S.documentTypeList('post')
                            .title('All Posts')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                        ),

                      S.listItem()
                        .title('Published Posts')
                        .schemaType('post')
                        .child(
                          S.documentTypeList('post')
                            .title('Published Posts')
                            .filter('_type == "post" && status == "published"')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                        ),

                      S.listItem()
                        .title('Draft Posts')
                        .schemaType('post')
                        .child(
                          S.documentTypeList('post')
                            .title('Draft Posts')
                            .filter('_type == "post" && status == "draft"')
                            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                        ),

                      S.listItem()
                        .title('Posts in Review')
                        .schemaType('post')
                        .child(
                          S.documentTypeList('post')
                            .title('Posts in Review')
                            .filter('_type == "post" && status in ["assigned", "inReview", "factCheck", "ready"]')
                            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                        ),

                      S.divider(),

                      S.listItem()
                        .title('Authors')
                        .schemaType('author')
                        .child(S.documentTypeList('author').title('Authors')),

                      S.listItem()
                        .title('Categories')
                        .schemaType('category')
                        .child(S.documentTypeList('category').title('Categories')),

                      S.listItem()
                        .title('Tags')
                        .schemaType('tag')
                        .child(S.documentTypeList('tag').title('Tags')),
                    ]),
                ),

              S.listItem()
                .title('Evidence & Resources')
                .child(
                  S.list()
                    .title('Evidence & Resources')
                    .items([
                      S.listItem()
                        .title('All Resources')
                        .schemaType('resource')
                        .child(
                          S.documentTypeList('resource')
                            .title('All Resources')
                            .defaultOrdering([{ field: 'pubDate', direction: 'desc' }]),
                        ),

                      S.listItem()
                        .title('Reports')
                        .schemaType('resource')
                        .child(
                          S.documentTypeList('resource')
                            .title('Reports')
                            .filter('_type == "resource" && type == "report"')
                            .defaultOrdering([{ field: 'pubDate', direction: 'desc' }]),
                        ),

                      S.listItem()
                        .title('Briefs and Concept Notes')
                        .schemaType('resource')
                        .child(
                          S.documentTypeList('resource')
                            .title('Briefs and Concept Notes')
                            .filter('_type == "resource" && type in ["brief", "concept-note"]')
                            .defaultOrdering([{ field: 'pubDate', direction: 'desc' }]),
                        ),

                      S.listItem()
                        .title('Governance Resources')
                        .schemaType('resource')
                        .child(
                          S.documentTypeList('resource')
                            .title('Governance Resources')
                            .filter('_type == "resource" && type == "governance"')
                            .defaultOrdering([{ field: 'pubDate', direction: 'desc' }]),
                        ),
                    ]),
                ),
            ]),
        ),

      S.listItem()
        .title('Nature Editorial')
        .child(
          S.list()
            .title('Nature Editorial')
            .items([
              S.listItem()
                .title('Prokriti Kotha Articles')
                .schemaType('prokritiKothaArticle')
                .child(
                  S.documentTypeList('prokritiKothaArticle')
                    .title('Prokriti Kotha Articles')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),

              S.listItem()
                .title('Published Articles')
                .schemaType('prokritiKothaArticle')
                .child(
                  S.documentTypeList('prokritiKothaArticle')
                    .title('Published Prokriti Kotha Articles')
                    .filter('_type == "prokritiKothaArticle" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),

              S.listItem()
                .title('Draft Articles')
                .schemaType('prokritiKothaArticle')
                .child(
                  S.documentTypeList('prokritiKothaArticle')
                    .title('Draft Prokriti Kotha Articles')
                    .filter('_type == "prokritiKothaArticle" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),
            ]),
        ),

      S.listItem()
        .title('Bangladesh Wildlife')
        .child(
          S.list()
            .title('Bangladesh Wildlife')
            .items([
              S.listItem()
                .title('Wildlife Groups')
                .schemaType('wildlifeGroup')
                .child(
                  S.documentTypeList('wildlifeGroup')
                    .title('Wildlife Groups')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),

              S.listItem()
                .title('Species Profiles')
                .schemaType('speciesProfile')
                .child(
                  S.documentTypeList('speciesProfile')
                    .title('Species Profiles')
                    .defaultOrdering([{ field: 'englishName', direction: 'asc' }]),
                ),

              S.listItem()
                .title('Published Species Profiles')
                .schemaType('speciesProfile')
                .child(
                  S.documentTypeList('speciesProfile')
                    .title('Published Species Profiles')
                    .filter('_type == "speciesProfile" && publishedStatus == "published"')
                    .defaultOrdering([{ field: 'englishName', direction: 'asc' }]),
                ),

              S.divider(),

              S.listItem()
                .title('Species Zones')
                .schemaType('speciesZone')
                .child(
                  S.documentTypeList('speciesZone')
                    .title('Species Zones')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),

              S.listItem()
                .title('Species Districts')
                .schemaType('speciesDistrict')
                .child(
                  S.documentTypeList('speciesDistrict')
                    .title('Species Districts')
                    .defaultOrdering([
                      { field: 'division', direction: 'asc' },
                      { field: 'title', direction: 'asc' },
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .title('Submissions & Exports')
        .child(
          S.list()
            .title('Submissions & Exports')
            .items([
              S.listItem()
                .title('Contact Submissions')
                .child(
                  S.list()
                    .title('Contact Submissions')
                    .items([
                      S.listItem()
                        .title('All Contact Submissions')
                        .child(
                          S.documentList()
                            .title('All Contact Submissions')
                            .filter('_type == "contactSubmission"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                        ),

                      S.divider(),

                      ...submissionWorkflowItems(
                        S,
                        'contactSubmission',
                        'Contact Submissions',
                      ),
                    ]),
                ),

              S.listItem()
                .title('Event Registrations')
                .child(
                  S.list()
                    .title('Event Registrations')
                    .items([
                      S.listItem()
                        .title('All Event Registrations')
                        .child(
                          S.documentList()
                            .title('All Event Registrations')
                            .filter('_type == "eventRegistration"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                        ),

                      S.divider(),

                      ...submissionWorkflowItems(
                        S,
                        'eventRegistration',
                        'Event Registrations',
                      ),
                    ]),
                ),

              S.divider(),

              S.listItem()
                .title('Export CSV')
                .child(S.component(ExportSubmissionsTool).title('Export CSV')),
            ]),
        ),

      S.listItem()
        .title('Institutional')
        .child(
          S.list()
            .title('Institutional')
            .items([
              S.listItem()
                .title('Partners')
                .schemaType('partner')
                .child(
                  S.documentTypeList('partner')
                    .title('Partners')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),

              S.listItem()
                .title('Team Members')
                .schemaType('teamMember')
                .child(
                  S.documentTypeList('teamMember')
                    .title('Team Members')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),

              S.divider(),

              S.listItem()
                .title('Governance Documents')
                .schemaType('governanceDocument')
                .child(
                  S.documentTypeList('governanceDocument')
                    .title('Governance Documents')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),

              S.listItem()
                .title('Published Governance Documents')
                .schemaType('governanceDocument')
                .child(
                  S.documentTypeList('governanceDocument')
                    .title('Published Governance Documents')
                    .filter('_type == "governanceDocument" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),

              S.divider(),

              S.listItem()
                .title('Policies')
                .schemaType('policy')
                .child(
                  S.documentTypeList('policy')
                    .title('Policies')
                    .defaultOrdering([{ field: 'effectiveDate', direction: 'desc' }]),
                ),

              S.listItem()
                .title('Active Policies')
                .schemaType('policy')
                .child(
                  S.documentTypeList('policy')
                    .title('Active Policies')
                    .filter('_type == "policy" && status == "active"')
                    .defaultOrdering([{ field: 'effectiveDate', direction: 'desc' }]),
                ),
            ]),
        ),

      S.listItem()
        .title('Advanced / System')
        .child(
          S.list()
            .title('Advanced / System')
            .items([
              S.listItem()
                .title('Redirects')
                .schemaType('redirect')
                .child(
                  S.documentTypeList('redirect')
                    .title('Redirects')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                ),
            ]),
        ),
    ])

