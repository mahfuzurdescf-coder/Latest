import { defineField, defineType } from 'sanity'

const VENOM_STATUSES = [
  { title: 'Non-venomous', value: 'non-venomous' },
  { title: 'Mildly venomous', value: 'mildly-venomous' },
  { title: 'Venomous', value: 'venomous' },
  { title: 'Highly venomous', value: 'highly-venomous' },
  { title: 'Unknown / needs verification', value: 'unknown' },
]

const MEDICAL_IMPORTANCE = [
  { title: 'Medically important', value: 'medically-important' },
  { title: 'Not medically important', value: 'not-medically-important' },
  { title: 'Uncertain / needs verification', value: 'uncertain' },
]

const CONSERVATION_STATUSES = [
  { title: 'Not Evaluated (NE)', value: 'NE' },
  { title: 'Data Deficient (DD)', value: 'DD' },
  { title: 'Least Concern (LC)', value: 'LC' },
  { title: 'Near Threatened (NT)', value: 'NT' },
  { title: 'Vulnerable (VU)', value: 'VU' },
  { title: 'Endangered (EN)', value: 'EN' },
  { title: 'Critically Endangered (CR)', value: 'CR' },
  { title: 'Extinct in the Wild (EW)', value: 'EW' },
  { title: 'Extinct (EX)', value: 'EX' },
]

const PUBLICATION_STATUSES = [
  { title: 'Draft', value: 'draft' },
  { title: 'In review', value: 'review' },
  { title: 'Published', value: 'published' },
  { title: 'Archived', value: 'archived' },
]

const PUBLIC_PRECISION_OPTIONS = [
  { title: 'Hidden from public', value: 'hidden' },
  { title: 'District only', value: 'district-only' },
  { title: 'Approximate area only', value: 'approximate' },
  { title: 'Exact point allowed', value: 'exact' },
]

export const speciesProfile = defineType({
  name: 'speciesProfile',
  title: 'Species Profile',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'status', title: 'Status and taxonomy' },
    { name: 'content', title: 'Field guide content' },
    { name: 'media', title: 'Images' },
    { name: 'distribution', title: 'Distribution' },
    { name: 'sources', title: 'Sources and review' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'group',
      title: 'Wildlife group',
      type: 'reference',
      group: 'identity',
      to: [{ type: 'wildlifeGroup' }],
      description: 'Example: বাংলাদেশের সাপ. This keeps snakes, frogs, birds, etc. under separate groups.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banglaName',
      title: 'Bangla name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'englishName',
      title: 'English name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required().min(2).max(140),
    }),
    defineField({
      name: 'scientificName',
      title: 'Scientific name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required().min(2).max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      options: {
        source: 'englishName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'localNames',
      title: 'Local names',
      type: 'array',
      group: 'identity',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'Short card text for checklist and listing pages.',
      validation: (Rule) => Rule.max(280),
    }),

    defineField({
      name: 'family',
      title: 'Family',
      type: 'string',
      group: 'status',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'string',
      group: 'status',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'venomStatus',
      title: 'Venom status',
      type: 'string',
      group: 'status',
      options: {
        layout: 'dropdown',
        list: VENOM_STATUSES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'medicalImportance',
      title: 'Medical importance',
      type: 'string',
      group: 'status',
      options: {
        layout: 'dropdown',
        list: MEDICAL_IMPORTANCE,
      },
    }),
    defineField({
      name: 'iucnGlobalStatus',
      title: 'Global IUCN status',
      type: 'string',
      group: 'status',
      options: {
        layout: 'dropdown',
        list: CONSERVATION_STATUSES,
      },
    }),
    defineField({
      name: 'bangladeshStatus',
      title: 'Bangladesh national status',
      type: 'string',
      group: 'status',
      options: {
        layout: 'dropdown',
        list: CONSERVATION_STATUSES,
      },
    }),
    defineField({
      name: 'statusSource',
      title: 'Status source note',
      type: 'text',
      rows: 2,
      group: 'status',
      description: 'Mention source/version for IUCN or national conservation status.',
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: 'identification',
      title: 'Identification',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'scaleDescription',
      title: 'Scale and body description',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'behaviour',
      title: 'Behaviour',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'habitat',
      title: 'Habitat',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'diet',
      title: 'Diet',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'distributionText',
      title: 'Distribution text',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'ecologicalRole',
      title: 'Ecological role',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'mythsAndFacts',
      title: 'Myths and facts',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Use this for public myth-busting. Keep it educational and non-sensational.',
    }),
    defineField({
      name: 'safetyNote',
      title: 'Safety note',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Use broad safety guidance only. Do not add catching or handling instructions.',
    }),
    defineField({
      name: 'similarSpecies',
      title: 'Similar species',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'speciesProfile' }] }],
    }),

    defineField({
      name: 'relatedProkritiKothaArticles',
      title: 'Related Prokriti Kotha articles',
      type: 'array',
      group: 'content',
      description: 'Connect this species profile to relevant Prokriti Kotha articles, field notes, rescue experiences, or myth-busting writings.',
      of: [{ type: 'reference', to: [{ type: 'prokritiKothaArticle' }] }],
    }),
    defineField({
      name: 'primaryImage',
      title: 'Primary image',
      type: 'imageWithAltCredit',
      group: 'media',
    }),
    defineField({
      name: 'images',
      title: 'Image gallery',
      type: 'array',
      group: 'media',
      of: [{ type: 'imageWithAltCredit' }],
      validation: (Rule) => Rule.max(8),
    }),

    defineField({
      name: 'zones',
      title: 'Wildlife zones',
      type: 'array',
      group: 'distribution',
      of: [{ type: 'reference', to: [{ type: 'speciesZone' }] }],
    }),
    defineField({
      name: 'districts',
      title: 'Known districts',
      type: 'array',
      group: 'distribution',
      of: [{ type: 'reference', to: [{ type: 'speciesDistrict' }] }],
    }),
    defineField({
      name: 'occurrencePoints',
      title: 'Occurrence points',
      type: 'array',
      group: 'distribution',
      description: 'Internal occurrence records. Exact sensitive locations should not be public by default.',
      of: [
        {
          type: 'object',
          name: 'occurrencePoint',
          title: 'Occurrence point',
          fields: [
            defineField({ name: 'lat', title: 'Latitude', type: 'number', validation: (Rule) => Rule.min(20).max(27) }),
            defineField({ name: 'lng', title: 'Longitude', type: 'number', validation: (Rule) => Rule.min(88).max(93) }),
            defineField({ name: 'accuracy', title: 'Accuracy / note', type: 'string', validation: (Rule) => Rule.max(120) }),
            defineField({ name: 'date', title: 'Observation date', type: 'date' }),
            defineField({ name: 'source', title: 'Source', type: 'string', validation: (Rule) => Rule.max(160) }),
            defineField({ name: 'verified', title: 'Verified', type: 'boolean', initialValue: false }),
            defineField({
              name: 'publicPrecision',
              title: 'Public precision',
              type: 'string',
              initialValue: 'hidden',
              options: { layout: 'dropdown', list: PUBLIC_PRECISION_OPTIONS },
            }),
          ],
          preview: {
            select: { title: 'source', subtitle: 'date' },
            prepare({ title, subtitle }) {
              return { title: title || 'Occurrence point', subtitle }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'sourceReferences',
      title: 'References / sources',
      type: 'array',
      group: 'sources',
      of: [
        {
          type: 'object',
          name: 'speciesReference',
          title: 'Reference',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(180) }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'note', title: 'Note', type: 'text', rows: 2, validation: (Rule) => Rule.max(240) }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed by',
      type: 'string',
      group: 'sources',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'publishedStatus',
      title: 'Publication status',
      type: 'string',
      group: 'sources',
      initialValue: 'draft',
      options: {
        layout: 'dropdown',
        list: PUBLICATION_STATUSES,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(170),
    }),
  ],
  preview: {
    select: {
      title: 'englishName',
      banglaName: 'banglaName',
      scientificName: 'scientificName',
      media: 'primaryImage',
    },
    prepare({ title, banglaName, scientificName, media }) {
      return {
        title: title || banglaName || 'Untitled species',
        subtitle: scientificName ? banglaName + ' - ' + scientificName : banglaName,
        media,
      }
    },
  },
})




