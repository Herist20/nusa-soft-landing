// SEO Utilities and Meta Tag Management

export const defaultMeta = {
  title: 'Professional Web & App Development Services | Nusa Software',
  description: 'Expert web development and mobile app development services in Indonesia. Custom solutions for businesses. Get free consultation today! ✓ 5+ Years Experience ✓ 100+ Projects',
  keywords: 'web development, mobile app development, UI/UX design, software development Indonesia, custom web solutions, React developer, Vue.js development, Node.js backend, flutter app development, progressive web apps',
  author: 'Nusa Software',
  url: 'https://nusasoftware.com',
  image: 'https://nusasoftware.com/og-image.jpg',
  type: 'website',
  locale: 'en_US',
  siteName: 'Nusa Software'
}

// Update page meta tags
export function updateMetaTags(meta = {}) {
  const finalMeta = { ...defaultMeta, ...meta }

  // Update title
  document.title = finalMeta.title

  // Helper function to update meta tag
  const updateMeta = (selector, content, attribute = 'content') => {
    let element = document.querySelector(selector)
    if (!element) {
      element = document.createElement('meta')
      if (selector.includes('property=')) {
        element.setAttribute('property', selector.match(/property="([^"]+)"/)[1])
      } else if (selector.includes('name=')) {
        element.setAttribute('name', selector.match(/name="([^"]+)"/)[1])
      }
      document.head.appendChild(element)
    }
    element.setAttribute(attribute, content)
  }

  // Standard meta tags
  updateMeta('meta[name="description"]', finalMeta.description)
  updateMeta('meta[name="keywords"]', finalMeta.keywords)
  updateMeta('meta[name="author"]', finalMeta.author)

  // Open Graph tags
  updateMeta('meta[property="og:title"]', finalMeta.title)
  updateMeta('meta[property="og:description"]', finalMeta.description)
  updateMeta('meta[property="og:image"]', finalMeta.image)
  updateMeta('meta[property="og:url"]', finalMeta.url)
  updateMeta('meta[property="og:type"]', finalMeta.type)
  updateMeta('meta[property="og:locale"]', finalMeta.locale)
  updateMeta('meta[property="og:site_name"]', finalMeta.siteName)

  // Twitter Card tags
  updateMeta('meta[name="twitter:card"]', 'summary_large_image')
  updateMeta('meta[name="twitter:title"]', finalMeta.title)
  updateMeta('meta[name="twitter:description"]', finalMeta.description)
  updateMeta('meta[name="twitter:image"]', finalMeta.image)

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', finalMeta.url)
}

// Generate JSON-LD structured data
export function generateStructuredData(type = 'Organization', data = {}) {
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Nusa Software',
      url: 'https://nusasoftware.com',
      logo: 'https://nusasoftware.com/logo.png',
      description: 'Expert web and mobile app development services in Indonesia',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'Customer Service',
        availableLanguage: ['English', 'Indonesian'],
        areaServed: 'ID'
      },
      sameAs: [
        'https://www.linkedin.com/company/nusasoftware',
        'https://github.com/nusasoftware',
        'https://www.instagram.com/nusasoftware'
      ],
      founder: {
        '@type': 'Person',
        name: 'Ahmad Rizki'
      },
      foundingDate: '2019',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 8,
        maxValue: 15
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '87'
      },
      ...data
    },

    WebPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Professional Web & App Development Services',
      description: 'Transform your ideas into digital reality with our expert development services',
      url: 'https://nusasoftware.com',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nusasoftware.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://nusasoftware.com#services'
          }
        ]
      },
      ...data
    },

    Service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Software Development',
      provider: {
        '@type': 'Organization',
        name: 'Nusa Software'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Indonesia'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Development',
              description: 'Custom website and web application development'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobile App Development',
              description: 'iOS and Android mobile application development'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX Design',
              description: 'User interface and experience design services'
            }
          }
        ]
      },
      ...data
    },

    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Nusa Software offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer web development, mobile app development, UI/UX design, and digital transformation services.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does a typical project take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications may take 3-6 months.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you provide post-launch support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide comprehensive post-launch support and maintenance services for all our projects.'
          }
        }
      ],
      ...data
    }
  }

  return schemas[type] || schemas.Organization
}

// Inject structured data into page
export function injectStructuredData(type, data) {
  const structuredData = generateStructuredData(type, data)

  let script = document.querySelector('script[type="application/ld+json"]')
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(structuredData)
}

// Preload critical resources
export function preloadResources() {
  const resources = [
    { href: '/fonts/inter-var.woff2', type: 'font/woff2', as: 'font', crossorigin: 'anonymous' },
    { href: '/css/critical.css', as: 'style' },
    { href: '/js/main.js', as: 'script' }
  ]

  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as

    if (resource.type) link.type = resource.type
    if (resource.crossorigin) link.crossOrigin = resource.crossorigin

    document.head.appendChild(link)
  })
}

// Performance monitoring
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}