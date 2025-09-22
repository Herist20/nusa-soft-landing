// Comprehensive Multilingual SEO Utils
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

export class MultilingualSEO {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || 'https://nusasoft.id'
    this.supportedLanguages = ['id', 'en']
    this.defaultLanguage = 'id'
    this.currentLanguage = 'id'
  }

  /**
   * Generate hreflang tags for current page
   */
  generateHrefLangTags(currentPath = '/') {
    const hrefLangTags = []

    // Generate tags for each language
    this.supportedLanguages.forEach(lang => {
      const href = this.getLocalizedUrl(currentPath, lang)
      hrefLangTags.push({
        rel: 'alternate',
        hreflang: lang,
        href: href
      })
    })

    // Add x-default (points to Indonesian as default)
    hrefLangTags.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: this.getLocalizedUrl(currentPath, this.defaultLanguage)
    })

    return hrefLangTags
  }

  /**
   * Get localized URL for a path and language
   */
  getLocalizedUrl(path, language) {
    // Remove any existing language prefix
    const cleanPath = path.replace(/^\/(id|en)/, '') || '/'

    if (language === this.defaultLanguage) {
      // Indonesian is default, no prefix needed
      return `${this.baseUrl}${cleanPath === '/' ? '' : cleanPath}`
    } else {
      // Add language prefix for non-default languages
      return `${this.baseUrl}/${language}${cleanPath}`
    }
  }

  /**
   * Update HTML head with SEO meta tags
   */
  updateHtmlHead(routeData, language) {
    const { t } = useI18n()

    // Update HTML lang attribute
    document.documentElement.lang = language

    // Update title
    document.title = t('meta.title')

    // Update meta description
    this.updateMetaTag('name', 'description', t('meta.description'))

    // Update Open Graph tags
    this.updateMetaTag('property', 'og:title', t('meta.ogTitle') || t('meta.title'))
    this.updateMetaTag('property', 'og:description', t('meta.ogDescription') || t('meta.description'))
    this.updateMetaTag('property', 'og:locale', language === 'id' ? 'id_ID' : 'en_US')
    this.updateMetaTag('property', 'og:url', window.location.href)

    // Update canonical URL
    this.updateCanonicalUrl(window.location.href)

    // Update hreflang tags
    this.updateHrefLangTags(routeData.path)
  }

  /**
   * Update or create meta tag
   */
  updateMetaTag(attribute, name, content) {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`)

    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attribute, name)
      document.head.appendChild(tag)
    }

    tag.content = content
  }

  /**
   * Update canonical URL
   */
  updateCanonicalUrl(url) {
    let canonical = document.querySelector('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }

    canonical.href = url
  }

  /**
   * Update hreflang tags in head
   */
  updateHrefLangTags(currentPath) {
    // Remove existing hreflang tags
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]')
    existingTags.forEach(tag => tag.remove())

    // Add new hreflang tags
    const hrefLangTags = this.generateHrefLangTags(currentPath)
    hrefLangTags.forEach(tagData => {
      const link = document.createElement('link')
      link.rel = tagData.rel
      link.hreflang = tagData.hreflang
      link.href = tagData.href
      document.head.appendChild(link)
    })
  }

  /**
   * Generate structured data for organization
   */
  generateOrganizationSchema(language) {
    const { t } = useI18n()

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Nusa Software",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/logo.png`,
      "sameAs": [
        "https://facebook.com/nusasoftware",
        "https://instagram.com/nusasoftware",
        "https://linkedin.com/company/nusasoftware"
      ]
    }

    if (language === 'id') {
      return {
        ...baseSchema,
        "description": "Jasa pengembangan web dan aplikasi mobile profesional untuk bisnis Indonesia",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "ID",
          "addressLocality": "Jakarta",
          "addressRegion": "DKI Jakarta"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+62-812-3456-7890",
          "contactType": "customer service",
          "availableLanguage": ["Indonesian", "English"],
          "areaServed": "ID"
        },
        "service": [
          {
            "@type": "Service",
            "name": "Pengembangan Website",
            "description": "Jasa pembuatan website profesional dan responsif"
          },
          {
            "@type": "Service",
            "name": "Pengembangan Aplikasi Mobile",
            "description": "Jasa pembuatan aplikasi iOS dan Android"
          }
        ]
      }
    } else {
      return {
        ...baseSchema,
        "description": "Professional web and mobile app development services for businesses worldwide",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "ID",
          "addressLocality": "Jakarta",
          "addressRegion": "Jakarta"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+62-812-3456-7890",
          "contactType": "customer service",
          "availableLanguage": ["English", "Indonesian"],
          "areaServed": ["ID", "US", "SG", "MY"]
        },
        "service": [
          {
            "@type": "Service",
            "name": "Web Development",
            "description": "Professional and responsive website development services"
          },
          {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "iOS and Android mobile application development"
          }
        ]
      }
    }
  }

  /**
   * Inject structured data into page
   */
  injectStructuredData(language) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create new structured data
    const schema = this.generateOrganizationSchema(language)
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema, null, 2)
    document.head.appendChild(script)
  }

  /**
   * Generate sitemap data for all languages
   */
  generateSitemapData() {
    const routes = [
      { path: '/', priority: 1.0, changefreq: 'weekly' },
      { path: '/layanan', priority: 0.8, changefreq: 'monthly' },
      { path: '/portofolio', priority: 0.8, changefreq: 'monthly' },
      { path: '/tentang', priority: 0.6, changefreq: 'monthly' },
      { path: '/kontak', priority: 0.7, changefreq: 'monthly' }
    ]

    const englishRoutes = [
      { path: '/en', priority: 1.0, changefreq: 'weekly' },
      { path: '/en/services', priority: 0.8, changefreq: 'monthly' },
      { path: '/en/portfolio', priority: 0.8, changefreq: 'monthly' },
      { path: '/en/about', priority: 0.6, changefreq: 'monthly' },
      { path: '/en/contact', priority: 0.7, changefreq: 'monthly' }
    ]

    const allRoutes = [...routes, ...englishRoutes]

    return allRoutes.map(route => ({
      loc: `${this.baseUrl}${route.path}`,
      priority: route.priority,
      changefreq: route.changefreq,
      lastmod: new Date().toISOString().split('T')[0],
      alternates: this.generateAlternatesForRoute(route.path)
    }))
  }

  /**
   * Generate alternate URLs for a route
   */
  generateAlternatesForRoute(path) {
    const alternates = []

    this.supportedLanguages.forEach(lang => {
      alternates.push({
        hreflang: lang,
        href: this.getLocalizedUrl(path, lang)
      })
    })

    return alternates
  }

  /**
   * Track language switching in analytics
   */
  trackLanguageSwitch(fromLang, toLang, currentUrl) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_switch', {
        'from_language': fromLang,
        'to_language': toLang,
        'page_location': currentUrl,
        'event_category': 'engagement',
        'event_label': `${fromLang}_to_${toLang}`
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'LanguageSwitch', {
        from_language: fromLang,
        to_language: toLang,
        page_url: currentUrl
      })
    }

    // Custom analytics
    console.log('Language switch tracked:', {
      from: fromLang,
      to: toLang,
      url: currentUrl,
      timestamp: new Date().toISOString()
    })
  }

  /**
   * Get localized route mapping
   */
  getLocalizedRoutes() {
    return {
      'id': {
        '/': '/',
        '/layanan': '/layanan',
        '/portofolio': '/portofolio',
        '/tentang': '/tentang',
        '/kontak': '/kontak'
      },
      'en': {
        '/': '/en',
        '/layanan': '/en/services',
        '/portofolio': '/en/portfolio',
        '/tentang': '/en/about',
        '/kontak': '/en/contact'
      }
    }
  }

  /**
   * Initialize SEO for current page
   */
  initializeSEO(route, language) {
    this.currentLanguage = language
    this.updateHtmlHead(route, language)
    this.injectStructuredData(language)
  }
}

// Export singleton instance
export const multilingualSEO = new MultilingualSEO()

// Export composable
export function useMultilingualSEO() {
  const route = useRoute()
  const router = useRouter()
  const { locale } = useI18n()

  const initializeSEO = () => {
    multilingualSEO.initializeSEO(route, locale.value)
  }

  const trackLanguageSwitch = (fromLang, toLang) => {
    multilingualSEO.trackLanguageSwitch(fromLang, toLang, window.location.href)
  }

  return {
    initializeSEO,
    trackLanguageSwitch,
    generateSitemapData: () => multilingualSEO.generateSitemapData(),
    getLocalizedRoutes: () => multilingualSEO.getLocalizedRoutes()
  }
}