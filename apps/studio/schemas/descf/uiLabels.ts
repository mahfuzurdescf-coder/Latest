import { defineField, defineType } from 'sanity'

const LABELS = [
  { name: 'readMore', title: 'Read more', bn: 'আরও পড়ুন', en: 'Read more' },
  { name: 'learnMore', title: 'Learn more', bn: 'আরও জানুন', en: 'Learn more' },
  { name: 'viewDetails', title: 'View details', bn: 'বিস্তারিত দেখুন', en: 'View details' },
  { name: 'register', title: 'Register', bn: 'নিবন্ধন করুন', en: 'Register' },
  { name: 'submit', title: 'Submit', bn: 'জমা দিন', en: 'Submit' },
  { name: 'download', title: 'Download', bn: 'ডাউনলোড করুন', en: 'Download' },
  { name: 'search', title: 'Search', bn: 'খুঁজুন', en: 'Search' },
  { name: 'filter', title: 'Filter', bn: 'ফিল্টার', en: 'Filter' },
  { name: 'clearFilters', title: 'Clear filters', bn: 'ফিল্টার মুছুন', en: 'Clear filters' },
  { name: 'backToHome', title: 'Back to home', bn: 'হোমে ফিরুন', en: 'Back to home' },
  { name: 'backToEvents', title: 'Back to events', bn: 'ইভেন্টে ফিরুন', en: 'Back to events' },
  { name: 'backToResources', title: 'Back to resources', bn: 'রিসোর্সে ফিরুন', en: 'Back to resources' },
  { name: 'contactUs', title: 'Contact us', bn: 'যোগাযোগ করুন', en: 'Contact us' },
  { name: 'partnerWithUs', title: 'Partner with us', bn: 'সহযোগিতা করুন', en: 'Partner with us' },
  { name: 'noResults', title: 'No results', bn: 'কোনো ফলাফল পাওয়া যায়নি', en: 'No results found' },
  { name: 'translationUnavailable', title: 'Translation unavailable', bn: 'ইংরেজি সংস্করণ এখনো প্রকাশিত হয়নি', en: 'English version is not available yet' },
  { name: 'viewBanglaVersion', title: 'View Bangla version', bn: 'বাংলা সংস্করণ দেখুন', en: 'View Bangla version' },
  { name: 'sending', title: 'Sending', bn: 'পাঠানো হচ্ছে...', en: 'Sending...' },
  { name: 'submitting', title: 'Submitting', bn: 'জমা হচ্ছে...', en: 'Submitting...' },
  { name: 'submissionFailed', title: 'Submission failed', bn: 'জমা দেওয়া যায়নি। আবার চেষ্টা করুন।', en: 'Submission failed. Please try again.' },
  { name: 'registrationFailed', title: 'Registration failed', bn: 'নিবন্ধন সম্পন্ন হয়নি। আবার চেষ্টা করুন।', en: 'Registration failed. Please try again.' },
]

function localizedLabelField(item: (typeof LABELS)[number]) {
  return defineField({
    name: item.name,
    title: item.title,
    type: 'object',
    fields: [
      defineField({
        name: 'bn',
        title: 'Bangla',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'en',
        title: 'English',
        type: 'string',
      }),
    ],
  })
}

export const uiLabels = defineType({
  name: 'uiLabels',
  title: 'UI Labels',
  type: 'document',
  description:
    'Central Bangla-first labels for buttons, form states, empty states, and future language-switcher messages.',
  fields: LABELS.map(localizedLabelField),
  initialValue: Object.fromEntries(
    LABELS.map((item) => [item.name, { bn: item.bn, en: item.en }]),
  ),
  preview: {
    prepare() {
      return {
        title: 'UI Labels',
        subtitle: 'Bangla-first button and interface labels',
      }
    },
  },
})
