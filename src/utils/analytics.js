// Comprehensive Analytics Setup for Multilingual Site
export class AnalyticsManager {
  constructor() {
    this.initialized = false
    this.currentLanguage = 'id'
    this.config = {
      ga4: {
        measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
        enabled: import.meta.env.PROD
      },
      facebook: {
        pixelId: import.meta.env.VITE_FB_PIXEL_ID || '123456789',
        enabled: import.meta.env.PROD && import.meta.env.VITE_FB_PIXEL_ID
      }
    }
  }

  /**
   * Initialize all analytics services
   */
  async initialize(language = 'id') {
    if (this.initialized) {
      console.warn('Analytics already initialized')
      return
    }
    this.currentLanguage = language

    try {
      if (this.config.ga4.enabled) {
        await this.initializeGA4()
      }
      if (this.config.facebook.enabled) {
        await this.initializeFacebookPixel()
      }

      this.setLanguageContext(language)
      this.initialized = true
      // Analytics initialized successfully
    } catch (error) {
      console.error('❌ Analytics initialization failed:', error)
    }
  }

  /**
   * Initialize Google Analytics 4
   */
  async initializeGA4() {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4.measurementId}`
      document.head.appendChild(script)

      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        function gtag() { dataLayer.push(arguments) }
        window.gtag = gtag

        gtag('js', new Date())
        gtag('config', this.config.ga4.measurementId, {
          send_page_view: true,
          custom_map: {
            'custom_parameter_1': 'language'
          },
          user_properties: {
            language: this.currentLanguage
          }
        })

        // Google Analytics 4 initialized
        resolve()
      }
    })
  }

  /**
   * Initialize Facebook Pixel
   */
  async initializeFacebookPixel() {
    return new Promise((resolve) => {
      // Check if Facebook Pixel is already initialized
      if (window.fbq) {
        console.warn('Facebook Pixel already initialized')
        resolve()
        return
      }

      const script = document.createElement('script')
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', '${this.config.facebook.pixelId}');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script)
      // Facebook Pixel initialized
      resolve()
    })
  }

  /**
   * Set language context for all analytics
   */
  setLanguageContext(language) {
    this.currentLanguage = language
    if (window.gtag) {
      window.gtag('config', this.config.ga4.measurementId, {
        user_properties: { language: language }
      })
    }
  }

  /**
   * Track language switch event
   */
  trackLanguageSwitch(fromLang, toLang, url) {
    if (window.gtag) {
      window.gtag('event', 'language_switch', {
        event_category: 'engagement',
        from_language: fromLang,
        to_language: toLang,
        page_location: url
      })
    }

    if (window.fbq) {
      window.fbq('trackCustom', 'LanguageSwitch', {
        from_language: fromLang,
        to_language: toLang
      })
    }

    // Language switch tracked
  }

  /**
   * Track language preference detection
   */
  trackLanguagePreferenceDetected(detectedLang, browserLang, savedLang) {
    if (window.gtag) {
      window.gtag('event', 'language_preference_detected', {
        event_category: 'user_behavior',
        detected_language: detectedLang,
        browser_language: browserLang,
        saved_language: savedLang || 'none'
      })
    }

    // Language preference detected
  }

  /**
   * Track CTA clicks by language
   */
  trackCTAClickByLanguage(ctaName, language, section) {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'conversion',
        cta_name: ctaName,
        language: language,
        section: section
      })
    }

    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: ctaName,
        language: language
      })
    }

    // CTA click tracked
  }

  /**
   * Track form submissions by language
   */
  trackFormSubmissionByLanguage(formType, language, success = true) {
    if (window.gtag) {
      window.gtag('event', 'form_submission', {
        event_category: 'conversion',
        form_type: formType,
        language: language,
        success: success
      })
    }

    if (window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: formType,
        language: language
      })
    }

    // Form submission tracked
  }

  /**
   * Track WhatsApp clicks by language
   */
  trackWhatsAppClickByLanguage(language, source) {
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        language: language,
        source: source
      })
    }

    if (window.fbq) {
      window.fbq('trackCustom', 'WhatsAppClick', {
        language: language,
        source: source
      })
    }

    // WhatsApp click tracked
  }

  /**
   * Track engagement by language
   */
  trackEngagementByLanguage(eventType, language, value) {
    if (window.gtag) {
      window.gtag('event', 'engagement', {
        event_category: 'user_behavior',
        event_type: eventType,
        language: language,
        value: value
      })
    }

    // Engagement tracked
  }

  /**
   * Track scroll depth by language
   */
  trackScrollDepthByLanguage(depth, language, page) {
    if (window.gtag) {
      window.gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        scroll_depth: depth,
        language: language,
        page: page
      })
    }

    // Scroll depth tracked
  }

  /**
   * Track bounce rate by language
   */
  trackBounceRateByLanguage(timeOnPage, language) {
    const isBounce = timeOnPage < 10000 // Less than 10 seconds

    if (window.gtag) {
      window.gtag('event', 'bounce_rate', {
        event_category: 'user_behavior',
        time_on_page: timeOnPage,
        language: language,
        is_bounce: isBounce
      })
    }

    // Bounce rate tracked
  }

  /**
   * Track translation errors
   */
  trackTranslationError(key, language, fallbackUsed) {
    if (window.gtag) {
      window.gtag('event', 'translation_error', {
        event_category: 'error',
        translation_key: key,
        language: language,
        fallback_used: fallbackUsed
      })
    }

    // Translation error tracked
  }

  /**
   * Track conversion rates by language
   */
  trackConversionByLanguage(conversionType, language, value = null) {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'conversion',
        conversion_type: conversionType,
        language: language,
        value: value
      })
    }

    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        content_name: conversionType,
        language: language,
        value: value
      })
    }

    // Conversion tracked
  }

  /**
   * Setup automated tracking for common events
   */
  setupAutomatedTracking() {
    // Track page load time by language
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      this.trackEngagementByLanguage('page_load', this.currentLanguage, loadTime)
    })

    // Track time on page
    let startTime = Date.now()
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - startTime
      this.trackBounceRateByLanguage(timeOnPage, this.currentLanguage)
    })

    // Track scroll depth
    let maxScrollDepth = 0
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        if (scrollDepth % 25 === 0 && scrollDepth > 0) { // Track at 25%, 50%, 75%, 100%
          this.trackScrollDepthByLanguage(scrollDepth, this.currentLanguage, window.location.pathname)
        }
      }
    })

    // Automated tracking setup complete
  }
}

export const analytics = new AnalyticsManager()