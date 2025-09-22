// Browser Compatibility Testing Matrix for Multilingual Features
import { devices } from '@playwright/test'

export class BrowserCompatibilityTester {
  constructor() {
    this.testMatrix = [
      {
        name: 'Chrome Desktop',
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      {
        name: 'Chrome Mobile',
        ...devices['Pixel 7'],
        userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
      },
      {
        name: 'Safari Desktop',
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
      },
      {
        name: 'Safari iOS',
        ...devices['iPhone 14'],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      },
      {
        name: 'Firefox Desktop',
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
      },
      {
        name: 'Firefox Mobile',
        viewport: { width: 375, height: 812 },
        userAgent: 'Mozilla/5.0 (Mobile; rv:120.0) Gecko/120.0 Firefox/120.0'
      },
      {
        name: 'Edge Desktop',
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
      },
      {
        name: 'Samsung Internet',
        viewport: { width: 412, height: 869 },
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/20.0 Chrome/106.0.0.0 Mobile Safari/537.36'
      }
    ]

    this.testSuites = [
      'languageDetection',
      'languageSwitching',
      'persistentPreferences',
      'urlHandling',
      'localStorage',
      'metaTags',
      'performance'
    ]
  }

  /**
   * Run compatibility tests across all browsers
   */
  async runFullCompatibilityTest(browser) {
    const results = {
      timestamp: new Date().toISOString(),
      browsers: {},
      summary: {
        totalBrowsers: this.testMatrix.length,
        passedBrowsers: 0,
        failedBrowsers: 0,
        issues: []
      }
    }

    for (const browserConfig of this.testMatrix) {
      try {
        const context = await browser.newContext(browserConfig)
        const page = await context.newPage()

        results.browsers[browserConfig.name] = await this.runBrowserTests(page, browserConfig)

        if (results.browsers[browserConfig.name].success) {
          results.summary.passedBrowsers++
        } else {
          results.summary.failedBrowsers++
          results.summary.issues.push({
            browser: browserConfig.name,
            issues: results.browsers[browserConfig.name].failures
          })
        }

        await context.close()
      } catch (error) {
        results.browsers[browserConfig.name] = {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        }
        results.summary.failedBrowsers++
      }
    }

    return results
  }

  /**
   * Run tests for a specific browser
   */
  async runBrowserTests(page, browserConfig) {
    const testResults = {
      browser: browserConfig.name,
      userAgent: browserConfig.userAgent,
      viewport: browserConfig.viewport,
      timestamp: new Date().toISOString(),
      tests: {},
      success: true,
      failures: []
    }

    // Test language detection
    testResults.tests.languageDetection = await this.testLanguageDetection(page)

    // Test language switching
    testResults.tests.languageSwitching = await this.testLanguageSwitching(page)

    // Test persistent preferences
    testResults.tests.persistentPreferences = await this.testPersistentPreferences(page)

    // Test URL handling
    testResults.tests.urlHandling = await this.testUrlHandling(page)

    // Test localStorage support
    testResults.tests.localStorage = await this.testLocalStorage(page)

    // Test meta tags
    testResults.tests.metaTags = await this.testMetaTags(page)

    // Test performance
    testResults.tests.performance = await this.testPerformance(page)

    // Check for failures
    for (const [testName, result] of Object.entries(testResults.tests)) {
      if (!result.success) {
        testResults.success = false
        testResults.failures.push({
          test: testName,
          error: result.error,
          details: result.details
        })
      }
    }

    return testResults
  }

  /**
   * Test browser language preference detection
   */
  async testLanguageDetection(page) {
    try {
      // Override navigator.language to test detection
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'language', {
          writable: true,
          configurable: true,
          value: 'id-ID'
        })
      })

      await page.goto('http://localhost:5173')

      // Check if Indonesian is detected and set
      const htmlLang = await page.getAttribute('html', 'lang')
      const success = htmlLang === 'id'

      return {
        success,
        detectedLanguage: htmlLang,
        expectedLanguage: 'id',
        error: success ? null : `Expected 'id', got '${htmlLang}'`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Test language switching functionality
   */
  async testLanguageSwitching(page) {
    try {
      await page.goto('http://localhost:5173/id')

      // Find and click language switcher
      const languageSwitcher = page.locator('[data-testid="language-switcher-en"]')
      await languageSwitcher.click()

      // Wait for navigation
      await page.waitForURL('**/en**')

      // Verify language changed
      const htmlLang = await page.getAttribute('html', 'lang')
      const urlLang = page.url().includes('/en')

      const success = htmlLang === 'en' && urlLang

      return {
        success,
        htmlLang,
        urlChanged: urlLang,
        error: success ? null : `Language switch failed: HTML lang=${htmlLang}, URL changed=${urlLang}`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Test persistent language preferences
   */
  async testPersistentPreferences(page) {
    try {
      // Set language preference
      await page.goto('http://localhost:5173/en')

      // Check localStorage
      const storedLang = await page.evaluate(() => localStorage.getItem('userLocale'))

      // Reload page
      await page.reload()

      // Check if preference persisted
      const htmlLang = await page.getAttribute('html', 'lang')
      const success = storedLang === 'en' && htmlLang === 'en'

      return {
        success,
        storedLanguage: storedLang,
        htmlLang,
        error: success ? null : `Persistence failed: stored=${storedLang}, html=${htmlLang}`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Test URL handling and routing
   */
  async testUrlHandling(page) {
    try {
      const testUrls = [
        'http://localhost:5173/id',
        'http://localhost:5173/en',
        'http://localhost:5173/id/about',
        'http://localhost:5173/en/about'
      ]

      const results = []

      for (const url of testUrls) {
        await page.goto(url)
        const htmlLang = await page.getAttribute('html', 'lang')
        const expectedLang = url.includes('/en') ? 'en' : 'id'

        results.push({
          url,
          expectedLang,
          actualLang: htmlLang,
          success: htmlLang === expectedLang
        })
      }

      const success = results.every(r => r.success)

      return {
        success,
        results,
        error: success ? null : 'Some URL tests failed'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Test localStorage support
   */
  async testLocalStorage(page) {
    try {
      await page.goto('http://localhost:5173')

      // Test setting and getting localStorage
      const testValue = await page.evaluate(() => {
        localStorage.setItem('test', 'value')
        return localStorage.getItem('test')
      })

      const success = testValue === 'value'

      return {
        success,
        testValue,
        error: success ? null : 'localStorage not working properly'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Test meta tags for SEO
   */
  async testMetaTags(page) {
    try {
      const results = {}

      for (const lang of ['id', 'en']) {
        await page.goto(`http://localhost:5173/${lang}`)

        const metaDescription = await page.getAttribute('meta[name="description"]', 'content')
        const metaTitle = await page.title()
        const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').count()

        results[lang] = {
          hasDescription: !!metaDescription,
          hasTitle: !!metaTitle,
          hasHreflang: hreflangLinks > 0,
          description: metaDescription,
          title: metaTitle
        }
      }

      const success = Object.values(results).every(r =>
        r.hasDescription && r.hasTitle && r.hasHreflang
      )

      return {
        success,
        results,
        error: success ? null : 'Some meta tags missing'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Test performance across browsers
   */
  async testPerformance(page) {
    try {
      const performanceResults = {}

      for (const lang of ['id', 'en']) {
        const startTime = Date.now()

        await page.goto(`http://localhost:5173/${lang}`)
        await page.waitForLoadState('networkidle')

        const loadTime = Date.now() - startTime

        // Test language switch performance
        const switchStartTime = Date.now()
        const otherLang = lang === 'id' ? 'en' : 'id'

        try {
          await page.click(`[data-testid="language-switcher-${otherLang}"]`)
          await page.waitForURL(`**/\${otherLang}**`, { timeout: 5000 })

          const switchTime = Date.now() - switchStartTime

          performanceResults[lang] = {
            loadTime,
            switchTime,
            loadTimeAcceptable: loadTime < 3000,
            switchTimeAcceptable: switchTime < 1000
          }
        } catch (switchError) {
          performanceResults[lang] = {
            loadTime,
            switchTime: null,
            loadTimeAcceptable: loadTime < 3000,
            switchTimeAcceptable: false,
            switchError: switchError.message
          }
        }
      }

      const success = Object.values(performanceResults).every(r =>
        r.loadTimeAcceptable && r.switchTimeAcceptable
      )

      return {
        success,
        results: performanceResults,
        error: success ? null : 'Performance thresholds not met'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Generate compatibility report
   */
  generateCompatibilityReport(results) {
    const report = {
      summary: results.summary,
      timestamp: results.timestamp,
      recommendations: [],
      criticalIssues: [],
      browserSupport: {}
    }

    // Analyze browser support
    for (const [browserName, browserResult] of Object.entries(results.browsers)) {
      if (browserResult.success) {
        report.browserSupport[browserName] = 'FULL_SUPPORT'
      } else if (browserResult.failures?.length > 0) {
        const criticalFailures = browserResult.failures.filter(f =>
          ['languageDetection', 'languageSwitching', 'localStorage'].includes(f.test)
        )

        if (criticalFailures.length > 0) {
          report.browserSupport[browserName] = 'NO_SUPPORT'
          report.criticalIssues.push({
            browser: browserName,
            issues: criticalFailures
          })
        } else {
          report.browserSupport[browserName] = 'PARTIAL_SUPPORT'
        }
      } else {
        report.browserSupport[browserName] = 'NO_SUPPORT'
      }
    }

    // Generate recommendations
    const supportLevels = Object.values(report.browserSupport)
    const fullSupport = supportLevels.filter(s => s === 'FULL_SUPPORT').length
    const totalBrowsers = supportLevels.length

    if (fullSupport / totalBrowsers < 0.8) {
      report.recommendations.push('Review browser compatibility issues')
    }

    if (report.criticalIssues.length > 0) {
      report.recommendations.push('Fix critical compatibility issues')
    }

    return report
  }
}

// Browser-specific feature detection
export const BROWSER_FEATURES = {
  localStorage: () => {
    try {
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  },

  internationalization: () => {
    return typeof Intl !== 'undefined' &&
           typeof Intl.DateTimeFormat !== 'undefined' &&
           typeof Intl.NumberFormat !== 'undefined'
  },

  historyAPI: () => {
    return !!(window.history && window.history.pushState)
  },

  fetch: () => {
    return typeof fetch !== 'undefined'
  },

  promise: () => {
    return typeof Promise !== 'undefined'
  },

  es6: () => {
    try {
      eval('const test = () => {}')
      return true
    } catch (e) {
      return false
    }
  }
}

// Export browser compatibility tester instance
export const browserCompatibilityTester = new BrowserCompatibilityTester()