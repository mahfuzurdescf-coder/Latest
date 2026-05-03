import type { UiLabels } from '@/types/sanity'

type UiLabelKey = keyof Omit<UiLabels, '_id' | '_type'>

const FALLBACK_BN: Record<UiLabelKey, string> = {
  readMore: 'আরও পড়ুন',
  learnMore: 'আরও জানুন',
  viewDetails: 'বিস্তারিত দেখুন',
  register: 'নিবন্ধন করুন',
  submit: 'জমা দিন',
  download: 'ডাউনলোড করুন',
  search: 'খুঁজুন',
  filter: 'ফিল্টার',
  clearFilters: 'ফিল্টার মুছুন',
  backToHome: 'হোমে ফিরুন',
  backToEvents: 'ইভেন্টে ফিরুন',
  backToResources: 'রিসোর্সে ফিরুন',
  contactUs: 'যোগাযোগ করুন',
  partnerWithUs: 'সহযোগিতা করুন',
  noResults: 'কোনো ফলাফল পাওয়া যায়নি',
  translationUnavailable: 'ইংরেজি সংস্করণ এখনো প্রকাশিত হয়নি',
  viewBanglaVersion: 'বাংলা সংস্করণ দেখুন',
  sending: 'পাঠানো হচ্ছে...',
  submitting: 'জমা হচ্ছে...',
  submissionFailed: 'জমা দেওয়া যায়নি। আবার চেষ্টা করুন।',
  registrationFailed: 'নিবন্ধন সম্পন্ন হয়নি। আবার চেষ্টা করুন।',
}

export function getUiLabel(labels: UiLabels | null | undefined, key: UiLabelKey) {
  return labels?.[key]?.bn?.trim() || FALLBACK_BN[key]
}
