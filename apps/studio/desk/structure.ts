import type { StructureResolver } from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('DESCF Studio')
    .items([
      S.listItem()
        .title('DESCF Website')
        .child(
          S.list()
            .title('DESCF Website')
            .items([
              S.listItem()
                .title('Site Settings')
                .schemaType('siteSettings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings'),
                ),

              S.listItem()
                .title('Homepage Curation')
                .schemaType('homepageCuration')
                .child(
                  S.document()
                    .schemaType('homepageCuration')
                    .documentId('homepageCuration')
                    .title('Homepage Curation'),
                ),

              S.divider(),

              S.listItem()
                .title('Programmes')
                .schemaType('programme')
                .child(
                  S.documentTypeList('programme')
                    .title('Programmes')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                ),

              S.listItem()
                .title('Partners')
                .schemaType('partner')
                .child(
                  S.documentTypeList('partner')
                    .title('Partners')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
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
                .title('Team Members')
                .schemaType('teamMember')
                .child(
                  S.documentTypeList('teamMember')
                    .title('Team Members')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),

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
                .title('Drafts')
                .schemaType('post')
                .child(
                  S.documentTypeList('post')
                    .title('Draft Posts')
                    .filter('_type == "post" && status == "draft"')
                    .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }]),
                ),

              S.listItem()
                .title('In Review')
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
        .title('Resources')
        .child(
          S.list()
            .title('Resources')
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

      S.listItem()
        .title('Governance')
        .child(
          S.list()
            .title('Governance')
            .items([
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
        .title('People')
        .child(
          S.list()
            .title('People')
            .items([
              S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(S.documentTypeList('author').title('Authors')),

              S.listItem()
                .title('Team Members')
                .schemaType('teamMember')
                .child(
                  S.documentTypeList('teamMember')
                    .title('Team Members')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),

              S.listItem()
                .title('Partners')
                .schemaType('partner')
                .child(
                  S.documentTypeList('partner')
                    .title('Partners')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),

      S.listItem()
        .title('Operations')
        .child(
          S.list()
            .title('Operations')
            .items([
              S.listItem()
                .title('Redirects')
                .schemaType('redirect')
                .child(
                  S.documentTypeList('redirect')
                    .title('Redirects')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                ),

              S.divider(),

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
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .schemaType('siteSettings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Site Settings'),
                ),

              S.listItem()
                .title('Homepage Curation')
                .schemaType('homepageCuration')
                .child(
                  S.document()
                    .schemaType('homepageCuration')
                    .documentId('homepageCuration')
                    .title('Homepage Curation'),
                ),
            ]),
        ),
    ])
