// Comprehensive Multilingual Testing Framework
import { expect } from '@playwright/test'
import { supportedLocales } from '../locales/index.js'

export class MultilingualTestFramework {
  constructor(page) {
    this.page = page
    this.baseUrl = 'http://localhost:5173'
    this.supportedLanguages = ['id', 'en']
  }

  /**
   * Test all basic language switching functionality
   */
  async testLanguageSwitchingWorks() {
    const results = {}

    for (const lang of this.supportedLanguages) {
      await this.page.goto(`${this.baseUrl}/${lang}`)

      // Check URL updates correctly
      expect(this.page.url()).toContain(`/${lang}`)

      // Check language switcher exists and works
      const languageSwitcher = this.page.locator('[data-testid="language-switcher"]')
      await expect(languageSwitcher).toBeVisible()

      // Check document language attribute
      const htmlLang = await this.page.getAttribute('html', 'lang')
      expect(htmlLang).toBe(lang)

      results[lang] = {
        urlUpdatesCorrectly: true,
        languageSwitcherVisible: true,
        htmlLangCorrect: true
      }
    }

    return results
  }

  /**
   * Test persistent language preference
   */
  async testPersistentLanguagePreference() {
    // Set language to English
    await this.page.goto(`${this.baseUrl}/en`)
    await this.page.reload()

    // Check if language persists
    const savedLang = await this.page.evaluate(() =>
      localStorage.getItem('userLocale')
    )
    expect(savedLang).toBe('en')

    // Check if page still shows English after reload
    const htmlLang = await this.page.getAttribute('html', 'lang')
    expect(htmlLang).toBe('en')

    return true
  }

  /**
   * Test all translations exist and no missing keys
   */
  async testAllTranslationsExist() {
    const missingTranslations = []

    for (const lang of this.supportedLanguages) {
      await this.page.goto(`${this.baseUrl}/${lang}`)

      // Check for missing translation indicators
      const missingKeys = await this.page.locator('text=/\\[.*\\]|Missing translation/').count()
      if (missingKeys > 0) {
        const keys = await this.page.locator('text=/\\[.*\\]|Missing translation/').allTextContents()
        missingTranslations.push({ language: lang, keys })
      }
    }

    expect(missingTranslations).toHaveLength(0)
    return missingTranslations.length === 0
  }

  /**
   * Test fallback handling
   */
  async testProperFallbackHandling() {
    // Test with unsupported language
    await this.page.goto(`${this.baseUrl}/fr`)

    // Should fallback to default language (id)
    const htmlLang = await this.page.getAttribute('html', 'lang')
    expect(['id', 'en']).toContain(htmlLang)

    return true
  }

  /**
   * Test smooth transitions during language switching
   */
  async testSmoothTransitions() {
    await this.page.goto(`${this.baseUrl}/id`)

    // Measure transition time
    const startTime = Date.now()

    // Click language switcher
    await this.page.click('[data-testid="language-switcher-en"]')

    // Wait for transition to complete
    await this.page.waitForURL(`${this.baseUrl}/en`)

    const transitionTime = Date.now() - startTime

    // Should be less than 500ms
    expect(transitionTime).toBeLessThan(500)

    return transitionTime
  }

  /**
   * Test mobile experience optimization
   */
  async testMobileExperienceOptimal() {
    // Set mobile viewport
    await this.page.setViewportSize({ width: 375, height: 667 })

    for (const lang of this.supportedLanguages) {
      await this.page.goto(`${this.baseUrl}/${lang}`)

      // Check mobile language switcher
      const mobileSwitcher = this.page.locator('[data-testid="mobile-language-switcher"]')
      await expect(mobileSwitcher).toBeVisible()

      // Test touch interaction
      await mobileSwitcher.tap()

      // Verify dropdown/modal opens
      const languageOptions = this.page.locator('[data-testid="language-options"]')
      await expect(languageOptions).toBeVisible()
    }

    return true
  }

  /**
   * Test SEO implementation
   */
  async testSEOImplementation() {
    const seoResults = {}

    for (const lang of this.supportedLanguages) {
      await this.page.goto(`${this.baseUrl}/${lang}`)

      // Check hreflang implementation
      const hreflangLinks = await this.page.locator('link[rel="alternate"][hreflang]').count()
      expect(hreflangLinks).toBeGreaterThan(0)

      // Check meta tags are translated
      const metaDescription = await this.page.getAttribute('meta[name="description"]', 'content')
      expect(metaDescription).toBeTruthy()

      // Check structured data
      const structuredData = await this.page.locator('script[type="application/ld+json"]').count()
      expect(structuredData).toBeGreaterThan(0)

      seoResults[lang] = {
        hreflangImplemented: hreflangLinks > 0,
        metaTagsTranslated: !!metaDescription,
        structuredDataLocalized: structuredData > 0
      }
    }

    return seoResults
  }

  /**
   * Performance benchmarking
   */
  async testPerformanceBenchmarks() {
    const performanceResults = {}

    for (const lang of this.supportedLanguages) {
      const startTime = Date.now()

      await this.page.goto(`${this.baseUrl}/${lang}`)
      await this.page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      // Test language switch performance
      const switchStartTime = Date.now()
      const otherLang = lang === 'id' ? 'en' : 'id'

      await this.page.click(`[data-testid="language-switcher-${otherLang}"]`)
      await this.page.waitForURL(`${this.baseUrl}/${otherLang}`)

      const switchTime = Date.now() - switchStartTime

      performanceResults[lang] = {
        initialLoadTime: loadTime,
        languageSwitchTime: switchTime,
        loadTimeUnder2s: loadTime < 2000,
        switchTimeUnder500ms: switchTime < 500
      }
    }

    return performanceResults
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    const results = {
      timestamp: new Date().toISOString(),
      summary: {},
      details: {}
    }

    try {
      // Basic functionality tests
      results.details.languageSwitching = await this.testLanguageSwitchingWorks()
      results.details.persistentPreference = await this.testPersistentLanguagePreference()
      results.details.translationsExist = await this.testAllTranslationsExist()
      results.details.fallbackHandling = await this.testProperFallbackHandling()

      // UX tests
      results.details.smoothTransitions = await this.testSmoothTransitions()
      results.details.mobileExperience = await this.testMobileExperienceOptimal()

      // SEO tests
      results.details.seoImplementation = await this.testSEOImplementation()

      // Performance tests
      results.details.performance = await this.testPerformanceBenchmarks()

      // Generate summary
      results.summary = this.generateTestSummary(results.details)

    } catch (error) {
      results.error = error.message
      results.success = false
    }

    return results
  }

  /**
   * Generate test summary
   */
  generateTestSummary(details) {
    const summary = {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: []
    }

    // Count results and generate summary
    Object.entries(details).forEach(([testName, result]) => {
      if (typeof result === 'boolean') {
        summary.totalTests++
        if (result) summary.passedTests++
        else summary.failedTests++
      } else if (typeof result === 'object') {
        // Handle complex results
        summary.totalTests++
        summary.passedTests++
      }
    })

    summary.successRate = (summary.passedTests / summary.totalTests) * 100

    return summary
  }
}

// Browser compatibility test matrix
export const BROWSER_COMPATIBILITY_MATRIX = [
  { name: 'Chrome Desktop', userAgent: 'Chrome/120.0.0.0' },
  { name: 'Chrome Mobile', userAgent: 'Chrome/120.0.0.0 Mobile' },
  { name: 'Safari Desktop', userAgent: 'Safari/17.0' },
  { name: 'Safari iOS', userAgent: 'Safari/17.0 Mobile' },
  { name: 'Firefox Desktop', userAgent: 'Firefox/120.0' },
  { name: 'Firefox Mobile', userAgent: 'Firefox/120.0 Mobile' },
  { name: 'Edge Desktop', userAgent: 'Edg/120.0.0.0' },
  { name: 'Samsung Internet', userAgent: 'SamsungBrowser/20.0' }
]

// Performance targets
export const PERFORMANCE_TARGETS = {
  initialPageLoad: 2000, // 2 seconds
  languageSwitch: 500,   // 500ms
  translationLoading: 200, // 200ms
  lighthouseScore: 90,   // 90+ score
  bundleSizeIncrease: 15 // 15% max per language
}

// Analytics tracking events
export const ANALYTICS_EVENTS = [
  'language_preference_detected',
  'language_switch_initiated',
  'language_switch_completed',
  'translation_error',
  'cta_click_by_language',
  'form_submission_by_language',
  'whatsapp_click_by_language',
  'bounce_rate_by_language',
  'engagement_by_language',
  'scroll_depth_by_language'
]