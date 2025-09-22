// Performance Monitoring System for Multilingual Implementation
import { analytics } from './analytics.js'

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map()
    this.observers = new Map()
    this.config = {
      enableLogging: import.meta.env.DEV,
      enableAnalytics: import.meta.env.PROD,
      thresholds: {
        initialLoad: 2000,
        languageSwitch: 500,
        translationLoad: 200,
        coreWebVitals: {
          LCP: 2500,
          FID: 100,
          CLS: 0.1
        }
      }
    }
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    this.setupWebVitalsObserver()
    this.setupNavigationObserver()
    this.setupResourceObserver()
    this.setupLanguageSwitchMonitor()

    if (this.config.enableLogging) {
      console.log('🚀 Performance Monitor initialized')
    }
  }

  /**
   * Setup Core Web Vitals observer
   */
  setupWebVitalsObserver() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.recordMetric('LCP', entry.startTime, {
          url: window.location.href,
          language: document.documentElement.lang
        })
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.recordMetric('FID', entry.processingStart - entry.startTime, {
          url: window.location.href,
          language: document.documentElement.lang
        })
      }
    }).observe({ type: 'first-input', buffered: true })

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      let clsValue = 0
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      this.recordMetric('CLS', clsValue, {
        url: window.location.href,
        language: document.documentElement.lang
      })
    }).observe({ type: 'layout-shift', buffered: true })
  }

  /**
   * Setup navigation observer
   */
  setupNavigationObserver() {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.recordMetric('navigationTiming', {
          domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
          loadComplete: entry.loadEventEnd - entry.loadEventStart,
          domInteractive: entry.domInteractive - entry.fetchStart,
          ttfb: entry.responseStart - entry.requestStart
        }, {
          url: entry.name,
          language: document.documentElement.lang
        })
      }
    }).observe({ type: 'navigation', buffered: true })
  }

  /**
   * Setup resource observer for translation files
   */
  setupResourceObserver() {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name.includes('/locales/') || entry.name.includes('.json')) {
          this.recordMetric('translationLoad', entry.responseEnd - entry.startTime, {
            resource: entry.name,
            language: document.documentElement.lang,
            size: entry.transferSize
          })
        }
      }
    }).observe({ type: 'resource', buffered: true })
  }

  /**
   * Monitor language switch performance
   */
  setupLanguageSwitchMonitor() {
    let switchStartTime = null

    // Listen for language switch events
    window.addEventListener('languageSwitchStart', (event) => {
      switchStartTime = performance.now()
      this.recordMetric('languageSwitchInitiated', switchStartTime, {
        fromLanguage: event.detail.from,
        toLanguage: event.detail.to,
        url: window.location.href
      })
    })

    window.addEventListener('languageSwitchComplete', (event) => {
      if (switchStartTime) {
        const switchDuration = performance.now() - switchStartTime
        this.recordMetric('languageSwitchDuration', switchDuration, {
          fromLanguage: event.detail.from,
          toLanguage: event.detail.to,
          url: window.location.href
        })

        // Track if exceeds threshold
        if (switchDuration > this.config.thresholds.languageSwitch) {
          this.recordMetric('languageSwitchSlow', switchDuration, {
            threshold: this.config.thresholds.languageSwitch,
            fromLanguage: event.detail.from,
            toLanguage: event.detail.to
          })
        }

        switchStartTime = null
      }
    })
  }

  /**
   * Record performance metric
   */
  recordMetric(name, value, metadata = {}) {
    const timestamp = Date.now()
    const metric = {
      name,
      value,
      timestamp,
      metadata: {
        ...metadata,
        userAgent: navigator.userAgent,
        connection: navigator.connection?.effectiveType || 'unknown',
        language: document.documentElement.lang,
        url: window.location.href
      }
    }

    // Store metric
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name).push(metric)

    // Log if enabled
    if (this.config.enableLogging) {
      console.log(`📊 Performance: ${name}`, metric)
    }

    // Send to analytics if enabled
    if (this.config.enableAnalytics && analytics.initialized) {
      this.sendToAnalytics(metric)
    }

    // Check thresholds
    this.checkThresholds(name, value, metadata)
  }

  /**
   * Send metric to analytics
   */
  sendToAnalytics(metric) {
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'performance',
        metric_name: metric.name,
        metric_value: typeof metric.value === 'number' ? metric.value : JSON.stringify(metric.value),
        language: metric.metadata.language,
        url: metric.metadata.url
      })
    }
  }

  /**
   * Check performance thresholds
   */
  checkThresholds(name, value, metadata) {
    const thresholds = this.config.thresholds

    let threshold = null
    let actualValue = value

    switch (name) {
      case 'LCP':
        threshold = thresholds.coreWebVitals.LCP
        break
      case 'FID':
        threshold = thresholds.coreWebVitals.FID
        break
      case 'CLS':
        threshold = thresholds.coreWebVitals.CLS
        break
      case 'languageSwitchDuration':
        threshold = thresholds.languageSwitch
        break
      case 'translationLoad':
        threshold = thresholds.translationLoad
        break
    }

    if (threshold && actualValue > threshold) {
      this.recordThresholdViolation(name, actualValue, threshold, metadata)
    }
  }

  /**
   * Record threshold violation
   */
  recordThresholdViolation(metricName, actualValue, threshold, metadata) {
    const violation = {
      metric: metricName,
      actual: actualValue,
      threshold,
      excess: actualValue - threshold,
      timestamp: Date.now(),
      metadata
    }

    console.warn('⚠️ Performance threshold exceeded:', violation)

    // Send to analytics
    if (this.config.enableAnalytics && window.gtag) {
      window.gtag('event', 'performance_threshold_exceeded', {
        event_category: 'performance',
        metric_name: metricName,
        actual_value: actualValue,
        threshold_value: threshold,
        language: metadata.language
      })
    }
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      language: document.documentElement.lang,
      url: window.location.href,
      metrics: {},
      summary: {}
    }

    // Process metrics
    for (const [name, values] of this.metrics.entries()) {
      const numericValues = values
        .map(v => typeof v.value === 'number' ? v.value : null)
        .filter(v => v !== null)

      if (numericValues.length > 0) {
        report.metrics[name] = {
          count: values.length,
          average: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
          min: Math.min(...numericValues),
          max: Math.max(...numericValues),
          latest: values[values.length - 1]
        }
      }
    }

    // Generate summary
    report.summary = this.generateSummary(report.metrics)

    return report
  }

  /**
   * Generate performance summary
   */
  generateSummary(metrics) {
    const summary = {
      score: 100,
      issues: [],
      recommendations: []
    }

    // Check Core Web Vitals
    if (metrics.LCP?.average > this.config.thresholds.coreWebVitals.LCP) {
      summary.score -= 20
      summary.issues.push('LCP exceeds threshold')
      summary.recommendations.push('Optimize largest contentful paint')
    }

    if (metrics.FID?.average > this.config.thresholds.coreWebVitals.FID) {
      summary.score -= 15
      summary.issues.push('FID exceeds threshold')
      summary.recommendations.push('Reduce JavaScript execution time')
    }

    if (metrics.CLS?.average > this.config.thresholds.coreWebVitals.CLS) {
      summary.score -= 15
      summary.issues.push('CLS exceeds threshold')
      summary.recommendations.push('Stabilize layout shifts')
    }

    // Check language switch performance
    if (metrics.languageSwitchDuration?.average > this.config.thresholds.languageSwitch) {
      summary.score -= 10
      summary.issues.push('Language switching is slow')
      summary.recommendations.push('Optimize language switch performance')
    }

    // Check translation loading
    if (metrics.translationLoad?.average > this.config.thresholds.translationLoad) {
      summary.score -= 10
      summary.issues.push('Translation loading is slow')
      summary.recommendations.push('Optimize translation file loading')
    }

    return summary
  }

  /**
   * Monitor bundle size by language
   */
  async measureBundleSize() {
    const sizes = {}

    for (const lang of ['id', 'en']) {
      try {
        const response = await fetch(`/locales/${lang}.json`)
        sizes[lang] = {
          compressed: response.headers.get('content-length'),
          uncompressed: (await response.text()).length
        }
      } catch (error) {
        console.error(`Failed to measure bundle size for ${lang}:`, error)
      }
    }

    this.recordMetric('bundleSizes', sizes)
    return sizes
  }

  /**
   * Start continuous monitoring
   */
  startContinuousMonitoring() {
    // Monitor every 30 seconds
    setInterval(() => {
      this.measureBundleSize()
    }, 30000)

    // Generate report every 5 minutes
    setInterval(() => {
      const report = this.getPerformanceReport()
      if (this.config.enableLogging) {
        console.log('📈 Performance Report:', report)
      }
    }, 300000)
  }
}

// Create and export instance
export const performanceMonitor = new PerformanceMonitor()

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  performanceMonitor.init()
  performanceMonitor.startContinuousMonitoring()
}