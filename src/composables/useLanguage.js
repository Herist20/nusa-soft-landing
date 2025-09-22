import { computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { setI18nLanguage, supportedLocales } from '@/locales'

export function useLanguage() {
  const { locale, t, n, d } = useI18n()
  const router = useRouter()
  const route = useRoute()

  const currentLocale = computed(() => locale.value)

  const availableLocales = computed(() => supportedLocales)

  const isRTL = computed(() => {
    return ['ar', 'he', 'fa', 'ur'].includes(locale.value)
  })

  const changeLanguage = async (newLocale, preserveScrollPosition = true) => {
    if (!supportedLocales.find(l => l.code === newLocale)) {
      console.warn(`Locale ${newLocale} is not supported`)
      return
    }

    // Mobile optimization: detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768

    // Save current scroll position if requested
    const scrollPosition = preserveScrollPosition ? window.scrollY : 0

    // Save form data before language change
    const formData = preserveFormData()

    // Add transition class to body for smooth animations
    document.body.classList.add('language-transitioning')

    // Mobile optimization: Preload critical translations
    if (isMobile) {
      // Minimal loading state for mobile
      document.body.classList.add('language-loading-mobile')
    }

    try {
      // Lazy load language chunks for mobile optimization
      setI18nLanguage(newLocale)

      const currentPath = route.path
      const segments = currentPath.split('/').filter(Boolean)

      if (segments[0] && supportedLocales.find(l => l.code === segments[0])) {
        segments[0] = newLocale
      } else {
        segments.unshift(newLocale)
      }

      const newPath = '/' + segments.join('/')

      await router.push(newPath)

      // Restore scroll position and form data after DOM update
      await nextTick()

      if (preserveScrollPosition) {
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
      }

      restoreFormData(formData)
      updateMetaTags()

      // Track language change
      trackLanguageChange(locale.value, newLocale)

      // Mobile optimization: Clear unnecessary caches
      if (isMobile && 'caches' in window) {
        // Clear old language assets from cache
        caches.open('language-cache').then(cache => {
          cache.keys().then(keys => {
            keys.forEach(key => {
              if (!key.url.includes(newLocale)) {
                cache.delete(key)
              }
            })
          })
        }).catch(() => {})
      }

    } catch (error) {
      if (error.name !== 'NavigationDuplicated') {
        console.error('Navigation error:', error)
      }
    } finally {
      // Remove transition class after animation
      const transitionDelay = isMobile ? 200 : 300
      setTimeout(() => {
        document.body.classList.remove('language-transitioning')
        document.body.classList.remove('language-loading-mobile')
      }, transitionDelay)
    }
  }

  const getLocalizedRoute = (name, locale = currentLocale.value) => {
    const baseRoute = router.resolve({ name })
    const path = baseRoute.path

    if (path.startsWith('/' + currentLocale.value)) {
      return path.replace('/' + currentLocale.value, '/' + locale)
    }

    return '/' + locale + path
  }

  const updateMetaTags = () => {
    document.title = t('meta.title')

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.content = t('meta.description')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = t('meta.description')
      document.head.appendChild(meta)
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.content = t('meta.keywords')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = t('meta.keywords')
      document.head.appendChild(meta)
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.content = locale.value === 'id' ? 'id_ID' : 'en_US'
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:locale')
      meta.content = locale.value === 'id' ? 'id_ID' : 'en_US'
      document.head.appendChild(meta)
    }

    const alternateLocales = supportedLocales.filter(l => l.code !== locale.value)
    alternateLocales.forEach(altLocale => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${altLocale.code}"]`)
      if (!link) {
        link = document.createElement('link')
        link.rel = 'alternate'
        link.hreflang = altLocale.code
        document.head.appendChild(link)
      }
      link.href = window.location.origin + getLocalizedRoute(route.name, altLocale.code)
    })

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.href
  }

  const formatCurrency = (value, currency = null) => {
    if (currency) {
      return new Intl.NumberFormat(locale.value === 'id' ? 'id-ID' : 'en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    }
    return n(value, 'currency')
  }

  const formatDate = (date, format = 'short') => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return d(date, format)
  }

  const formatNumber = (value, format = 'decimal') => {
    return n(value, format)
  }

  const getDirection = () => {
    return isRTL.value ? 'rtl' : 'ltr'
  }

  // Form data preservation utilities
  const preserveFormData = () => {
    const formData = new Map()
    const forms = document.querySelectorAll('form')

    forms.forEach((form, formIndex) => {
      const inputs = form.querySelectorAll('input, textarea, select')
      inputs.forEach((input, inputIndex) => {
        if (input.name || input.id) {
          const key = input.name || input.id || `form-${formIndex}-input-${inputIndex}`
          formData.set(key, {
            value: input.value,
            type: input.type,
            checked: input.checked,
            selected: input.selected
          })
        }
      })
    })

    return formData
  }

  const restoreFormData = (formData) => {
    setTimeout(() => {
      formData.forEach((data, key) => {
        const input = document.querySelector(`[name="${key}"], [id="${key}"]`)
        if (input && data.value) {
          input.value = data.value
          if (data.type === 'checkbox' || data.type === 'radio') {
            input.checked = data.checked
          }
          if (input.tagName === 'SELECT' && data.selected) {
            input.selected = data.selected
          }
        }
      })
    }, 100)
  }

  // Analytics tracking
  const trackLanguageChange = (fromLang, toLang) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_change', {
        custom_parameter_1: fromLang,
        custom_parameter_2: toLang,
        page_location: window.location.href,
        page_title: document.title
      })
    }

    // Custom analytics
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Language Changed', {
        from: fromLang,
        to: toLang,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    }
  }

  watch(locale, () => {
    updateMetaTags()
    document.documentElement.dir = getDirection()
  })

  return {
    currentLocale,
    availableLocales,
    isRTL,
    changeLanguage,
    getLocalizedRoute,
    updateMetaTags,
    formatCurrency,
    formatDate,
    formatNumber,
    getDirection,
    t
  }
}