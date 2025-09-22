#!/usr/bin/env node

// Build-time sitemap generation script
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class SitemapBuilder {
  constructor() {
    this.baseUrl = process.env.VITE_BASE_URL || 'https://nusasoft.id'
    this.supportedLanguages = ['id', 'en']
    this.outputDir = path.resolve(__dirname, '../public')
  }

  /**
   * Generate main sitemap with hreflang
   */
  generateMainSitemap() {
    const routes = [
      { path: '/', priority: 1.0, changefreq: 'weekly' },
      { path: '/layanan', priority: 0.8, changefreq: 'monthly' },
      { path: '/portofolio', priority: 0.8, changefreq: 'monthly' },
      { path: '/tentang', priority: 0.6, changefreq: 'monthly' },
      { path: '/kontak', priority: 0.7, changefreq: 'monthly' }
    ]

    const englishPaths = {
      '/': '/en',
      '/layanan': '/en/services',
      '/portofolio': '/en/portfolio',
      '/tentang': '/en/about',
      '/kontak': '/en/contact'
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

    routes.forEach(route => {
      const idPath = route.path
      const enPath = englishPaths[route.path]
      const lastmod = new Date().toISOString().split('T')[0]

      // Indonesian URL
      xml += `  <url>
    <loc>${this.baseUrl}${idPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="id" href="${this.baseUrl}${idPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${this.baseUrl}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${this.baseUrl}${idPath}" />
  </url>
`

      // English URL
      xml += `  <url>
    <loc>${this.baseUrl}${enPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="id" href="${this.baseUrl}${idPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${this.baseUrl}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${this.baseUrl}${idPath}" />
  </url>
`
    })

    xml += `</urlset>`
    return xml
  }

  /**
   * Generate language-specific sitemap
   */
  generateLanguageSitemap(language) {
    const routes = [
      { path: '/', priority: 1.0, changefreq: 'weekly' },
      { path: '/layanan', priority: 0.8, changefreq: 'monthly' },
      { path: '/portofolio', priority: 0.8, changefreq: 'monthly' },
      { path: '/tentang', priority: 0.6, changefreq: 'monthly' },
      { path: '/kontak', priority: 0.7, changefreq: 'monthly' }
    ]

    const englishPaths = {
      '/': '/en',
      '/layanan': '/en/services',
      '/portofolio': '/en/portfolio',
      '/tentang': '/en/about',
      '/kontak': '/en/contact'
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    routes.forEach(route => {
      const localizedPath = language === 'en' ? englishPaths[route.path] : route.path
      const lastmod = new Date().toISOString().split('T')[0]

      xml += `  <url>
    <loc>${this.baseUrl}${localizedPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
    })

    xml += `</urlset>`
    return xml
  }

  /**
   * Generate sitemap index
   */
  generateSitemapIndex() {
    const lastmod = new Date().toISOString().split('T')[0]

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${this.baseUrl}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${this.baseUrl}/sitemap-id.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${this.baseUrl}/sitemap-en.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`
  }

  /**
   * Generate robots.txt
   */
  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Language-specific sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-id.xml
Sitemap: ${this.baseUrl}/sitemap-en.xml

# Block development files
Disallow: /src/
Disallow: /node_modules/
Disallow: /*.json$
Disallow: /*.js.map$
Disallow: /scripts/

# Block duplicate content and parameters
Disallow: /*?*
Disallow: /*#*

# Allow Google to crawl CSS and JS
Allow: /*.css$
Allow: /*.js$

# Crawl delay for politeness
Crawl-delay: 1

# Additional directives for SEO
# Block crawling of API endpoints if any
Disallow: /api/`
  }

  /**
   * Build all sitemaps
   */
  async build() {
    try {
      console.log('🚀 Generating multilingual sitemaps...')

      // Ensure output directory exists
      await fs.mkdir(this.outputDir, { recursive: true })

      // Generate main sitemap with hreflang
      const mainSitemap = this.generateMainSitemap()
      await fs.writeFile(path.join(this.outputDir, 'sitemap.xml'), mainSitemap)
      console.log('✅ Generated sitemap.xml')

      // Generate language-specific sitemaps
      for (const lang of this.supportedLanguages) {
        const langSitemap = this.generateLanguageSitemap(lang)
        await fs.writeFile(path.join(this.outputDir, `sitemap-${lang}.xml`), langSitemap)
        console.log(`✅ Generated sitemap-${lang}.xml`)
      }

      // Generate sitemap index
      const sitemapIndex = this.generateSitemapIndex()
      await fs.writeFile(path.join(this.outputDir, 'sitemap-index.xml'), sitemapIndex)
      console.log('✅ Generated sitemap-index.xml')

      // Generate robots.txt
      const robotsTxt = this.generateRobotsTxt()
      await fs.writeFile(path.join(this.outputDir, 'robots.txt'), robotsTxt)
      console.log('✅ Generated robots.txt')

      console.log('🎉 All sitemaps generated successfully!')
      console.log('\nGenerated files:')
      console.log(`- ${this.outputDir}/sitemap.xml`)
      console.log(`- ${this.outputDir}/sitemap-id.xml`)
      console.log(`- ${this.outputDir}/sitemap-en.xml`)
      console.log(`- ${this.outputDir}/sitemap-index.xml`)
      console.log(`- ${this.outputDir}/robots.txt`)

    } catch (error) {
      console.error('❌ Error generating sitemaps:', error)
      process.exit(1)
    }
  }
}

// Run if called directly
if (process.argv[1] === __filename) {
  const builder = new SitemapBuilder()
  builder.build()
}

export { SitemapBuilder }