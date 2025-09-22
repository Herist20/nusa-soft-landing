// Multilingual Sitemap Generator
import { multilingualSEO } from './seoMultilingual.js'

export class SitemapGenerator {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || 'https://nusasoft.id'
    this.supportedLanguages = ['id', 'en']
  }

  /**
   * Generate XML sitemap for all languages
   */
  generateSitemapXML() {
    const sitemapData = multilingualSEO.generateSitemapData()

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

    sitemapData.forEach(url => {
      xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`

      // Add hreflang alternates
      url.alternates.forEach(alternate => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />
`
      })

      xml += `  </url>
`
    })

    xml += `</urlset>`
    return xml
  }

  /**
   * Generate sitemap index for multiple sitemaps
   */
  generateSitemapIndex() {
    const lastmod = new Date().toISOString().split('T')[0]

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${this.baseUrl}/sitemap-main.xml</loc>
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

    return xml
  }

  /**
   * Generate language-specific sitemap
   */
  generateLanguageSitemap(language) {
    const routes = this.getRoutesForLanguage(language)

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

    routes.forEach(route => {
      xml += `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
    })

    xml += `</urlset>`
    return xml
  }

  /**
   * Get routes for specific language
   */
  getRoutesForLanguage(language) {
    const baseRoutes = [
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

    return baseRoutes.map(route => {
      const localizedPath = language === 'en' ? englishPaths[route.path] : route.path

      return {
        url: `${this.baseUrl}${localizedPath}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: route.changefreq,
        priority: route.priority
      }
    })
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml
Sitemap: ${this.baseUrl}/sitemap-id.xml
Sitemap: ${this.baseUrl}/sitemap-en.xml

# Block development files
Disallow: /src/
Disallow: /node_modules/
Disallow: /*.json$
Disallow: /*.js.map$

# Block duplicate content
Disallow: /*?*

# Crawl delay
Crawl-delay: 1`
  }

  /**
   * Save sitemap to public directory (for build process)
   */
  async saveSitemaps() {
    const fs = await import('fs/promises')
    const path = await import('path')

    const publicDir = path.resolve(process.cwd(), 'public')

    try {
      // Main sitemap with hreflang
      const mainSitemap = this.generateSitemapXML()
      await fs.writeFile(path.join(publicDir, 'sitemap.xml'), mainSitemap)

      // Language-specific sitemaps
      for (const lang of this.supportedLanguages) {
        const langSitemap = this.generateLanguageSitemap(lang)
        await fs.writeFile(path.join(publicDir, `sitemap-${lang}.xml`), langSitemap)
      }

      // Sitemap index
      const sitemapIndex = this.generateSitemapIndex()
      await fs.writeFile(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex)

      // Robots.txt
      const robotsTxt = this.generateRobotsTxt()
      await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt)

      console.log('✅ Sitemaps generated successfully!')

    } catch (error) {
      console.error('❌ Error generating sitemaps:', error)
    }
  }
}

// Export instance
export const sitemapGenerator = new SitemapGenerator()

// Build-time sitemap generation
if (import.meta.env.NODE_ENV === 'development') {
  // Generate sitemaps during development
  sitemapGenerator.saveSitemaps()
}