// Analytics and Tracking Utilities

// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your GA4 Measurement ID

// Initialize Google Analytics
export function initGoogleAnalytics() {
  if (typeof window === 'undefined') return

  // Load GA4 script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true
  })
}

// Track page views
export function trackPageView(path, title) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    })
  }
}

// Track custom events
export function trackEvent(category, action, label = null, value = null) {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams = {
      event_category: category,
      event_label: label,
      value: value
    }

    // Remove null values
    Object.keys(eventParams).forEach(key => {
      if (eventParams[key] === null) {
        delete eventParams[key]
      }
    })

    window.gtag('event', action, eventParams)
  }
}

// Track conversions
export function trackConversion(conversionType, data = {}) {
  const conversions = {
    form_submission: {
      event: 'generate_lead',
      value: data.value || 0,
      currency: 'USD',
      ...data
    },
    whatsapp_click: {
      event: 'contact',
      method: 'whatsapp',
      ...data
    },
    consultation_request: {
      event: 'begin_checkout',
      value: data.value || 0,
      currency: 'USD',
      items: [
        {
          item_name: 'Consultation',
          item_category: 'Service',
          quantity: 1
        }
      ],
      ...data
    },
    download: {
      event: 'file_download',
      file_name: data.fileName,
      file_extension: data.fileExtension,
      ...data
    }
  }

  if (conversions[conversionType] && typeof window !== 'undefined' && window.gtag) {
    const { event, ...params } = conversions[conversionType]
    window.gtag('event', event, params)
  }
}

// Track form interactions
export function trackFormInteraction(formId, action, fieldName = null) {
  const eventData = {
    form_id: formId,
    action: action
  }

  if (fieldName) {
    eventData.field_name = fieldName
  }

  trackEvent('Form', action, formId)

  // Also send to GA4 with more detailed data
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_interaction', eventData)
  }
}

// Track scroll depth
export function trackScrollDepth() {
  let scrollDepths = [25, 50, 75, 90, 100]
  let scrollDepthsReached = []

  const handleScroll = () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    )

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !scrollDepthsReached.includes(depth)) {
        scrollDepthsReached.push(depth)
        trackEvent('Engagement', 'scroll_depth', `${depth}%`, depth)
      }
    })
  }

  // Throttle scroll event
  let scrollTimer
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(handleScroll, 100)
  })
}

// Track time on page
export function trackTimeOnPage() {
  let startTime = Date.now()
  let isActive = true
  let totalActiveTime = 0

  // Track when user becomes inactive/active
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isActive) {
        totalActiveTime += Date.now() - startTime
        isActive = false
      }
    } else {
      if (!isActive) {
        startTime = Date.now()
        isActive = true
      }
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Send time data before page unload
  window.addEventListener('beforeunload', () => {
    if (isActive) {
      totalActiveTime += Date.now() - startTime
    }

    const timeInSeconds = Math.round(totalActiveTime / 1000)

    if (timeInSeconds > 0) {
      // Use sendBeacon for reliable data sending
      if (navigator.sendBeacon && window.gtag) {
        const data = new FormData()
        data.append('event', 'timing_complete')
        data.append('name', 'time_on_page')
        data.append('value', timeInSeconds)

        navigator.sendBeacon('/analytics', data)
      }

      trackEvent('Engagement', 'time_on_page', null, timeInSeconds)
    }
  })
}

// Track CTA clicks
export function trackCTA(ctaName, ctaLocation, ctaType = 'button') {
  const eventData = {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_type: ctaType
  }

  trackEvent('CTA', 'click', ctaName)

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_content', {
      content_type: 'cta',
      ...eventData
    })
  }
}

// Track WhatsApp interactions
export function trackWhatsApp(action, message = null) {
  const eventData = {
    action: action,
    communication_method: 'whatsapp'
  }

  if (message) {
    eventData.message_type = message
  }

  trackEvent('WhatsApp', action, message)
  trackConversion('whatsapp_click', eventData)
}

// Track performance metrics
export function trackPerformance() {
  if (typeof window === 'undefined' || !window.performance) return

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart
      const tcpTime = perfData.connectEnd - perfData.connectStart
      const ttfb = perfData.responseStart - perfData.navigationStart
      const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart

      // Track performance metrics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'page_load',
          value: pageLoadTime,
          event_category: 'Performance',
          event_label: 'Page Load Time'
        })

        window.gtag('event', 'timing_complete', {
          name: 'ttfb',
          value: ttfb,
          event_category: 'Performance',
          event_label: 'Time to First Byte'
        })

        window.gtag('event', 'timing_complete', {
          name: 'dom_ready',
          value: domReady,
          event_category: 'Performance',
          event_label: 'DOM Ready'
        })
      }
    }, 0)
  })
}

// Initialize all tracking
export function initializeTracking() {
  initGoogleAnalytics()
  trackScrollDepth()
  trackTimeOnPage()
  trackPerformance()
}

// Hotjar tracking code placeholder
export function initHotjar(hjid, hjsv) {
  (function(h, o, t, j, a, r) {
    h.hj = h.hj || function() {
      (h.hj.q = h.hj.q || []).push(arguments)
    }
    h._hjSettings = { hjid: hjid, hjsv: hjsv }
    a = o.getElementsByTagName('head')[0]
    r = o.createElement('script')
    r.async = 1
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
    a.appendChild(r)
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
}

// Export all tracking functions
export default {
  initGoogleAnalytics,
  trackPageView,
  trackEvent,
  trackConversion,
  trackFormInteraction,
  trackScrollDepth,
  trackTimeOnPage,
  trackCTA,
  trackWhatsApp,
  trackPerformance,
  initializeTracking,
  initHotjar
}