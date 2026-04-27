/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://descf.org',
  generateRobotsTxt: false,  // We handle robots.ts in App Router
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
