# DESCF Website

Official website of the **Deep Ecology and Snake Conservation Foundation** — built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS.

---

## Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | Next.js 14 (App Router) |
| Language   | TypeScript (strict)     |
| Styling    | Tailwind CSS v3         |
| CMS        | Sanity v3               |
| Queries    | GROQ                    |
| Monorepo   | Turborepo               |
| Deploy     | Vercel (primary)        |

---

## Project structure

```
descf-website/
├── apps/
│   ├── web/          # Next.js frontend → descf.org
│   └── studio/       # Sanity Studio   → studio.descf.org
├── turbo.json
└── package.json
```

---

## Prerequisites

- Node.js 18.17+
- A [Sanity](https://sanity.io) account (free tier works)
- A [Vercel](https://vercel.com) account

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/your-org/descf-website.git
cd descf-website
npm install
```

### 2. Create a Sanity project

```bash
cd apps/studio
npx sanity init
# Choose: Create new project → name it "DESCF" → dataset: production
```

Copy your **Project ID** from the output.

### 3. Configure environment variables

```bash
cd apps/web
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_WEBHOOK_SECRET=a_random_secret_you_choose
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

To get your read token:
→ sanity.io/manage → your project → API → Tokens → Add token (viewer)

### 4. Run in development

```bash
# From repo root — runs both web and studio simultaneously
npm run dev
```

- Web app: `http://localhost:3000`
- Sanity Studio: `http://localhost:3333`

---

## First CMS setup

After running the studio, add content in this order:

1. **Site Settings** — title, tagline, contact email, donation link
2. **Categories** — Field Notes, Conservation Explainers, DESCF Updates, etc.
3. **Tags** — snake conservation, bioacoustics, Bangladesh, etc.
4. **Authors** — one per team member who will write
5. **Team Members** — leadership team (for leadership page)
6. **Programmes** — all programme areas with correct status labels
7. **Posts** — first articles

---

## Deploying to Vercel

### Web app

```bash
# Install Vercel CLI
npm i -g vercel

cd apps/web
vercel
```

Add these environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL` (set to `https://descf.org`)

### Sanity Studio

```bash
cd apps/studio
npx sanity deploy
# Studio name: descf → deploys to descf.sanity.studio
```

Or deploy to Vercel as a separate project for a custom `studio.descf.org` domain.

### Set up the revalidation webhook

1. Go to sanity.io/manage → your project → API → Webhooks
2. Add webhook:
   - **URL**: `https://descf.org/api/revalidate`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **HTTP Method**: POST
   - **Secret**: same value as `SANITY_WEBHOOK_SECRET`

This ensures the website updates within seconds of publishing in the Studio.

---

## Deploying to Cloudflare Pages (alternative)

```bash
cd apps/web
npm install @cloudflare/next-on-pages
npx @cloudflare/next-on-pages
```

Add environment variables in Cloudflare Pages dashboard (same as Vercel).

---

## Adding Bangla content

The architecture supports Bengali content from day one:

1. Set `language` to `bn` when creating a post in Sanity Studio
2. GROQ queries can filter by language:
   ```groq
   *[_type == "post" && language == "bn" && status == "published"]
   ```
3. Add a `/bn/newsroom` route group in `apps/web/app/` when ready
4. The `SiteSettings` schema has `tagline_bn` for translated UI strings

---

## Adding new writers/editors

1. Go to `studio.descf.org` → Manage → Members
2. Invite by email
3. Assign role:
   - **Editor**: can publish content
   - **Author**: can create drafts, cannot publish
   - **Viewer**: read-only access

---

## Tailwind configuration

All design tokens are in `apps/web/tailwind.config.ts`:

- `forest.*` — primary conservation green palette
- `earth.*` — neutral stone/earth palette
- `bark.*` — warm amber/brown accent
- Custom font sizes: `text-display-xl`, `text-h1`, `text-body-lg`, `text-label`, etc.
- Custom spacing: `section-padding`, `container-site`, `max-w-prose-lg`

---

## Content types

| Schema       | Purpose                                          |
|--------------|--------------------------------------------------|
| `post`       | Articles, field notes, news, reports             |
| `author`     | Writer profiles with bio and social links        |
| `category`   | Newsroom categories (Field Notes, Explainers...) |
| `tag`        | Content tags for filtering                       |
| `programme`  | Programme areas with status labels               |
| `resource`   | Reports, concept notes, governance documents     |
| `event`      | Events, seminars, talks                          |
| `teamMember` | Leadership page profiles                         |
| `siteSettings` | Global site config (nav, footer, SEO)          |

---

## Licence

Copyright © DESCF. All rights reserved.

This codebase is built for the exclusive use of the Deep Ecology and Snake Conservation Foundation.
