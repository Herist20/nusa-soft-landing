// Comprehensive Error Handling and Monitoring System for Multilingual Implementation
import { analytics } from './analytics.js'

export class ErrorMonitor {
  constructor() {
    this.errors = new Map()
    this.config = {
      enableLogging: true,
      enableAnalytics: import.meta.env.PROD,
      maxErrors: 100,
      reportingInterval: 60000, // 1 minute
      criticalErrorThreshold: 5
    }
    this.errorCounts = new Map()
  }

  /**
   * Initialize error monitoring
   */
  init() {
    this.setupGlobalErrorHandlers()
    this.setupTranslationErrorHandling()
    this.setupI18nErrorHandling()
    this.setupRouterErrorHandling()
    this.setupPerformanceErrorHandling()
    this.startErrorReporting()

    console.log('🛡️ Error Monitor initialized')
  }

  /**
   * Setup global error handlers
   */
  setupGlobalErrorHandlers() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        language: document.documentElement.lang,
        url: window.location.href
      })
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'unhandled_promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        reason: event.reason,
        language: document.documentElement.lang,
        url: window.location.href
      })
    })

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window && event.target.tagName) {
        this.handleError({
          type: 'resource_load_error',
          message: `Failed to load ${event.target.tagName.toLowerCase()}`,
          resource: event.target.src || event.target.href,
          tagName: event.target.tagName,
          language: document.documentElement.lang,
          url: window.location.href
        })
      }
    }, true)
  }

  /**
   * Setup translation error handling
   */
  setupTranslationErrorHandling() {
    // Override console methods to catch translation warnings
    const originalWarn = console.warn
    const originalError = console.error

    console.warn = (...args) => {
      const message = args.join(' ')
      if (message.includes('translation') || message.includes('i18n') || message.includes('locale')) {
        this.handleError({
          type: 'translation_warning',
          message: message,
          language: document.documentElement.lang,
          url: window.location.href,
          severity: 'warning'
        })
      }
      originalWarn.apply(console, args)
    }

    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('translation') || message.includes('i18n') || message.includes('locale')) {
        this.handleError({
          type: 'translation_error',
          message: message,
          language: document.documentElement.lang,
          url: window.location.href,
          severity: 'error'
        })
      }
      originalError.apply(console, args)
    }
  }

  /**
   * Setup Vue i18n error handling
   */
  setupI18nErrorHandling() {
    // Listen for custom i18n events
    window.addEventListener('i18nError', (event) => {
      this.handleError({
        type: 'i18n_error',
        message: event.detail.message,
        key: event.detail.key,
        language: event.detail.language,
        fallbackUsed: event.detail.fallbackUsed,
        url: window.location.href
      })
    })

    window.addEventListener('missingTranslation', (event) => {
      this.handleError({
        type: 'missing_translation',
        message: `Missing translation for key: ${event.detail.key}`,
        key: event.detail.key,
        language: event.detail.language,
        url: window.location.href
      })
    })
  }

  /**
   * Setup router error handling
   */
  setupRouterErrorHandling() {
    window.addEventListener('routeError', (event) => {
      this.handleError({
        type: 'route_error',
        message: event.detail.message,
        route: event.detail.route,
        language: event.detail.language,
        url: window.location.href
      })
    })

    // Monitor navigation errors
    window.addEventListener('popstate', () => {
      const currentLang = document.documentElement.lang
      const urlLang = window.location.pathname.split('/')[1]

      if (urlLang && ['id', 'en'].includes(urlLang) && currentLang !== urlLang) {
        this.handleError({
          type: 'language_route_mismatch',
          message: `Language mismatch: HTML lang=${currentLang}, URL lang=${urlLang}`,
          htmlLang: currentLang,
          urlLang: urlLang,
          url: window.location.href
        })
      }
    })
  }

  /**
   * Setup performance error handling
   */
  setupPerformanceErrorHandling() {
    // Monitor language switch timeouts
    window.addEventListener('languageSwitchTimeout', (event) => {
      this.handleError({
        type: 'language_switch_timeout',
        message: `Language switch took too long: ${event.detail.duration}ms`,
        duration: event.detail.duration,
        fromLanguage: event.detail.from,
        toLanguage: event.detail.to,
        url: window.location.href
      })
    })

    // Monitor translation loading timeouts
    window.addEventListener('translationLoadTimeout', (event) => {
      this.handleError({
        type: 'translation_load_timeout',
        message: `Translation loading timed out for: ${event.detail.language}`,
        language: event.detail.language,
        duration: event.detail.duration,
        url: window.location.href
      })
    })
  }

  /**
   * Handle and process errors
   */
  handleError(errorData) {
    const timestamp = Date.now()
    const errorId = this.generateErrorId(errorData)

    // Add metadata
    const enrichedError = {
      ...errorData,
      id: errorId,
      timestamp,
      userAgent: navigator.userAgent,
      connection: navigator.connection?.effectiveType || 'unknown',
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      sessionId: this.getSessionId()
    }

    // Store error
    if (!this.errors.has(errorData.type)) {
      this.errors.set(errorData.type, [])
    }

    const typeErrors = this.errors.get(errorData.type)
    typeErrors.push(enrichedError)

    // Limit error storage
    if (typeErrors.length > this.config.maxErrors) {
      typeErrors.shift()
    }

    // Count errors
    const count = this.errorCounts.get(errorData.type) || 0
    this.errorCounts.set(errorData.type, count + 1)

    // Log error
    if (this.config.enableLogging) {
      const logLevel = enrichedError.severity === 'warning' ? 'warn' : 'error'
      console[logLevel]('🚨 Error detected:', enrichedError)
    }

    // Send to analytics
    if (this.config.enableAnalytics) {
      this.sendErrorToAnalytics(enrichedError)
    }

    // Check for critical error patterns
    this.checkCriticalErrors(errorData.type)

    return errorId
  }

  /**
   * Generate unique error ID
   */
  generateErrorId(errorData) {
    const baseString = `${errorData.type}-${errorData.message}-${errorData.language || 'unknown'}`
    return btoa(baseString).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)
  }

  /**
   * Get or create session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem('errorMonitorSessionId')
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2)
      sessionStorage.setItem('errorMonitorSessionId', sessionId)
    }
    return sessionId
  }

  /**
   * Send error to analytics
   */
  sendErrorToAnalytics(error) {
    if (analytics.initialized && window.gtag) {
      window.gtag('event', 'error_occurred', {
        event_category: 'error',
        error_type: error.type,
        error_message: error.message,
        language: error.language,
        severity: error.severity || 'error',
        page_location: error.url
      })
    }

    // Track translation errors specifically
    if (error.type.includes('translation')) {
      analytics.trackTranslationError(
        error.key || 'unknown',
        error.language || 'unknown',
        error.fallbackUsed || false
      )
    }
  }

  /**
   * Check for critical error patterns
   */
  checkCriticalErrors(errorType) {
    const count = this.errorCounts.get(errorType) || 0

    if (count >= this.config.criticalErrorThreshold) {
      this.handleCriticalError(errorType, count)
    }
  }

  /**
   * Handle critical error situations
   */
  handleCriticalError(errorType, count) {
    const criticalError = {
      type: 'critical_error_threshold',
      message: `Critical error threshold reached for ${errorType}: ${count} occurrences`,
      errorType,
      count,
      timestamp: Date.now(),
      language: document.documentElement.lang,
      url: window.location.href
    }

    console.error('🚨 CRITICAL ERROR THRESHOLD REACHED:', criticalError)

    // Send critical error notification
    if (this.config.enableAnalytics && window.gtag) {
      window.gtag('event', 'critical_error', {
        event_category: 'error',
        error_type: errorType,
        error_count: count,
        language: document.documentElement.lang
      })
    }

    // Consider fallback actions based on error type
    this.executeFallbackAction(errorType)
  }

  /**
   * Execute fallback actions for critical errors
   */
  executeFallbackAction(errorType) {
    switch (errorType) {
      case 'translation_error':
      case 'missing_translation':
        // Switch to fallback language
        this.switchToFallbackLanguage()
        break
      case 'language_switch_timeout':
        // Reload page with default language
        this.reloadWithDefaultLanguage()
        break
      case 'i18n_error':
        // Reinitialize i18n
        this.reinitializeI18n()
        break
      default:
        console.warn('No fallback action defined for error type:', errorType)
    }
  }

  /**
   * Switch to fallback language
   */
  switchToFallbackLanguage() {
    try {
      const fallbackLang = 'en'
      if (window.i18n && window.i18n.global.locale.value !== fallbackLang) {
        console.warn('🔄 Switching to fallback language:', fallbackLang)
        window.i18n.global.locale.value = fallbackLang
        document.documentElement.lang = fallbackLang
        localStorage.setItem('userLocale', fallbackLang)

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('fallbackLanguageActivated', {
          detail: { language: fallbackLang, reason: 'critical_translation_errors' }
        }))
      }
    } catch (error) {
      console.error('Failed to switch to fallback language:', error)
    }
  }

  /**
   * Reload with default language
   */
  reloadWithDefaultLanguage() {
    try {
      console.warn('🔄 Reloading with default language due to critical errors')
      const defaultLang = 'id'
      const newUrl = window.location.href.replace(/\/(en|id)\//, `/${defaultLang}/`)
      window.location.href = newUrl
    } catch (error) {
      console.error('Failed to reload with default language:', error)
    }
  }

  /**
   * Reinitialize i18n
   */
  reinitializeI18n() {
    try {
      console.warn('🔄 Attempting to reinitialize i18n')
      if (window.i18n) {
        // Reset to initial state
        const currentLang = document.documentElement.lang || 'id'
        window.i18n.global.locale.value = currentLang

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('i18nReinitialized', {
          detail: { language: currentLang }
        }))
      }
    } catch (error) {
      console.error('Failed to reinitialize i18n:', error)
    }
  }

  /**
   * Start periodic error reporting
   */
  startErrorReporting() {
    setInterval(() => {
      this.generateErrorReport()
    }, this.config.reportingInterval)
  }

  /**
   * Generate comprehensive error report
   */
  generateErrorReport() {
    const report = {
      timestamp: new Date().toISOString(),
      language: document.documentElement.lang,
      url: window.location.href,
      sessionId: this.getSessionId(),
      summary: {
        totalErrors: Array.from(this.errorCounts.values()).reduce((a, b) => a + b, 0),
        errorTypes: this.errorCounts.size,
        criticalErrors: Array.from(this.errorCounts.entries())
          .filter(([, count]) => count >= this.config.criticalErrorThreshold)
          .length
      },
      details: {},
      recommendations: []
    }

    // Process error details
    for (const [type, errors] of this.errors.entries()) {
      const count = this.errorCounts.get(type) || 0
      report.details[type] = {
        count,
        latestError: errors[errors.length - 1],
        frequency: count / (Date.now() - errors[0]?.timestamp || 1) * 60000 // errors per minute
      }
    }

    // Generate recommendations
    report.recommendations = this.generateRecommendations(report.details)

    // Log report in development
    if (this.config.enableLogging && Object.keys(report.details).length > 0) {
      console.log('📋 Error Report:', report)
    }

    return report
  }

  /**
   * Generate recommendations based on error patterns
   */
  generateRecommendations(errorDetails) {
    const recommendations = []

    for (const [type, details] of Object.entries(errorDetails)) {
      if (details.count > 0) {
        switch (type) {
          case 'translation_error':
          case 'missing_translation':
            recommendations.push('Review and update translation files')
            break
          case 'language_switch_timeout':
            recommendations.push('Optimize language switching performance')
            break
          case 'resource_load_error':
            recommendations.push('Check resource loading and CDN configuration')
            break
          case 'javascript_error':
            recommendations.push('Review JavaScript code for runtime errors')
            break
          case 'route_error':
            recommendations.push('Verify router configuration and language routing')
            break
        }
      }
    }

    return [...new Set(recommendations)] // Remove duplicates
  }

  /**
   * Get current error statistics
   */
  getErrorStats() {
    return {
      totalErrors: Array.from(this.errorCounts.values()).reduce((a, b) => a + b, 0),
      errorTypeCount: this.errorCounts.size,
      errorCounts: Object.fromEntries(this.errorCounts),
      latestErrors: Array.from(this.errors.entries()).map(([type, errors]) => ({
        type,
        latest: errors[errors.length - 1]
      }))
    }
  }
}

// Translation error handler utility
export const handleTranslationError = (key, language, fallbackUsed = false) => {
  const errorEvent = new CustomEvent('i18nError', {
    detail: {
      message: `Translation missing for key: ${key}`,
      key,
      language,
      fallbackUsed
    }
  })
  window.dispatchEvent(errorEvent)

  // Return fallback value
  return fallbackUsed ? `[${key}]` : key
}

// Robust translation function with error handling
export const safeTranslate = (i18n, key, fallback = null) => {
  try {
    const translated = i18n.global.t(key)

    // Check if translation actually exists (not just the key returned)
    if (translated === key && !i18n.global.messages.value[i18n.global.locale.value][key]) {
      throw new Error(`Missing translation for key: ${key}`)
    }

    return translated
  } catch (error) {
    handleTranslationError(key, i18n.global.locale.value, !!fallback)
    return fallback || `[${key}]`
  }
}

// Create and export error monitor instance
export const errorMonitor = new ErrorMonitor()

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  errorMonitor.init()
}