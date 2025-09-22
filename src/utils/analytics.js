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
        enabled: import.meta.env.PROD
      }
    }
  }

  /**
   * Initialize all analytics services
   */
  async initialize(language = 'id') {
    if (this.initialized) return
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
      console.log('✅ Analytics initialized successfully')
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

        console.log('✅ Google Analytics 4 initialized')
        resolve()
      }
    })
  }

  /**
   * Initialize Facebook Pixel
   */
  async initializeFacebookPixel() {
    return new Promise((resolve) => {
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
      console.log('✅ Facebook Pixel initialized')
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

    console.log('📊 Language switch tracked:', { fromLang, toLang, url })
  }
}

export const analytics = new AnalyticsManager()