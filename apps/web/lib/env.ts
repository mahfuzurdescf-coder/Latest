type PublicVercelEnv = 'production' | 'preview' | 'development' | undefined

type WebEnv = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: string
  NEXT_PUBLIC_SANITY_DATASET: string
  NEXT_PUBLIC_SANITY_STUDIO_URL: string
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_VERCEL_ENV: PublicVercelEnv
  SANITY_API_READ_TOKEN?: string
  SANITY_WEBHOOK_SECRET?: string
}

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value.trim()
}

function optionalEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : undefined
}

function normaliseUrl(name: string, value: string): string {
  try {
    const url = new URL(value)
    return url.origin
  } catch {
    throw new Error(`Invalid URL in environment variable ${name}: ${value}`)
  }
}

function validateSanityProjectId(projectId: string): string {
  if (!/^[a-z0-9]+$/i.test(projectId)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SANITY_PROJECT_ID: "${projectId}". Sanity project IDs should contain only letters and numbers.`,
    )
  }

  return projectId
}

function validateDataset(dataset: string): string {
  if (!/^[a-zA-Z0-9_-]+$/.test(dataset)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SANITY_DATASET: "${dataset}". Dataset names should contain only letters, numbers, underscores, or hyphens.`,
    )
  }

  return dataset
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://descf.org'
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'https://studio.descf.org'

export const env: WebEnv = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: validateSanityProjectId(
    requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  ),
  NEXT_PUBLIC_SANITY_DATASET: validateDataset(
    process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production',
  ),
  NEXT_PUBLIC_SANITY_STUDIO_URL: normaliseUrl(
    'NEXT_PUBLIC_SANITY_STUDIO_URL',
    studioUrl,
  ),
  NEXT_PUBLIC_SITE_URL: normaliseUrl(
    'NEXT_PUBLIC_SITE_URL',
    siteUrl,
  ),
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV as PublicVercelEnv,
  SANITY_API_READ_TOKEN: optionalEnv(process.env.SANITY_API_READ_TOKEN),
  SANITY_WEBHOOK_SECRET: optionalEnv(process.env.SANITY_WEBHOOK_SECRET),
}

export const isProduction = process.env.NODE_ENV === 'production'
export const isPreviewDeployment = env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
