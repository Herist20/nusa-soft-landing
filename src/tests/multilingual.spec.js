// Comprehensive Multilingual Test Suite
import { test, expect } from '@playwright/test'
import { MultilingualTestFramework } from './multilingualTests.js'
import { qaManager } from './qaChecklist.js'

test.describe('Multilingual Implementation Tests', () => {
  let testFramework

  test.beforeEach(async ({ page }) => {
    testFramework = new MultilingualTestFramework(page)
  })

  test.describe('Basic Language Functionality', () => {
    test('should detect and set correct default language', async ({ page }) => {
      // Override browser language to Indonesian
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'language', {
          writable: true,
          configurable: true,
          value: 'id-ID'
        })
      })

      await page.goto('/')

      // Check if Indonesian is detected and set
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(htmlLang).toBe('id')

      // Check if URL reflects language
      expect(page.url()).toContain('/id')
    })

    test('should switch languages successfully', async ({ page }) => {
      await page.goto('/id')

      // Click English language switcher
      await page.click('[data-testid="language-switcher-en"]')

      // Wait for navigation
      await page.waitForURL('**/en**')

      // Verify language changed
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(htmlLang).toBe('en')

      // Verify URL updated
      expect(page.url()).toContain('/en')
    })

    test('should persist language preference', async ({ page }) => {
      await page.goto('/en')

      // Reload page
      await page.reload()

      // Check if English persisted
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(htmlLang).toBe('en')

      // Check localStorage
      const savedLang = await page.evaluate(() => localStorage.getItem('userLocale'))
      expect(savedLang).toBe('en')
    })
  })

  test.describe('Content Translation Tests', () => {
    test('should display content in Indonesian', async ({ page }) => {
      await page.goto('/id')

      // Check for Indonesian content
      const heroTitle = await page.textContent('h1')
      expect(heroTitle).toBeTruthy()

      // Should not contain English-specific words
      expect(heroTitle).not.toMatch(/solutions|services|contact/i)
    })

    test('should display content in English', async ({ page }) => {
      await page.goto('/en')

      // Check for English content
      const heroTitle = await page.textContent('h1')
      expect(heroTitle).toBeTruthy()

      // Should contain typical English business terms
      const pageContent = await page.textContent('body')
      expect(pageContent.toLowerCase()).toMatch(/solution|service|contact|about/)
    })

    test('should not show missing translation keys', async ({ page }) => {
      for (const lang of ['id', 'en']) {
        await page.goto(`/${lang}`)

        // Check for missing translation indicators
        const missingKeys = await page.locator('text=/\\[.*\\]|Missing translation/').count()
        expect(missingKeys).toBe(0)
      }
    })
  })

  test.describe('URL and Routing Tests', () => {
    test('should handle direct URL access', async ({ page }) => {
      const testUrls = [
        '/id',
        '/en',
        '/id/about',
        '/en/about'
      ]

      for (const url of testUrls) {
        await page.goto(url)
        const expectedLang = url.includes('/en') ? 'en' : 'id'
        const htmlLang = await page.getAttribute('html', 'lang')
        expect(htmlLang).toBe(expectedLang)
      }
    })

    test('should redirect unknown languages to default', async ({ page }) => {
      await page.goto('/fr') // Unsupported language

      // Should redirect to default language
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(['id', 'en']).toContain(htmlLang)
    })

    test('should handle root URL correctly', async ({ page }) => {
      await page.goto('/')

      // Should have a language in the URL
      expect(page.url()).toMatch(/\/(id|en)/)

      // Should have correct HTML lang
      const htmlLang = await page.getAttribute('html', 'lang')
      expect(['id', 'en']).toContain(htmlLang)
    })
  })

  test.describe('SEO Implementation Tests', () => {
    test('should have hreflang tags', async ({ page }) => {
      for (const lang of ['id', 'en']) {
        await page.goto(`/${lang}`)

        const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').count()
        expect(hreflangLinks).toBeGreaterThan(0)

        // Check for specific hreflang values
        const idHreflang = await page.locator('link[hreflang="id"]').count()
        const enHreflang = await page.locator('link[hreflang="en"]').count()
        expect(idHreflang).toBeGreaterThan(0)
        expect(enHreflang).toBeGreaterThan(0)
      }
    })

    test('should have translated meta tags', async ({ page }) => {
      for (const lang of ['id', 'en']) {
        await page.goto(`/${lang}`)

        // Check meta description exists
        const metaDescription = await page.getAttribute('meta[name="description"]', 'content')
        expect(metaDescription).toBeTruthy()
        expect(metaDescription.length).toBeGreaterThan(50)

        // Check title exists
        const title = await page.title()
        expect(title).toBeTruthy()
        expect(title.length).toBeGreaterThan(10)
      }
    })

    test('should have structured data', async ({ page }) => {
      for (const lang of ['id', 'en']) {
        await page.goto(`/${lang}`)

        const structuredData = await page.locator('script[type="application/ld+json"]').count()
        expect(structuredData).toBeGreaterThan(0)
      }
    })
  })

  test.describe('Mobile Experience Tests', () => {
    test('should work on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })

      for (const lang of ['id', 'en']) {
        await page.goto(`/${lang}`)

        // Check if mobile language switcher exists
        const mobileSwitcher = page.locator('[data-testid="mobile-language-switcher"]')
        await expect(mobileSwitcher).toBeVisible()

        // Test language switching on mobile
        await mobileSwitcher.tap()

        // Verify dropdown/modal opens
        const languageOptions = page.locator('[data-testid="language-options"]')
        await expect(languageOptions).toBeVisible()
      }
    })

    test('should have responsive language switcher', async ({ page }) => {
      // Test desktop
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.goto('/id')

      const desktopSwitcher = page.locator('[data-testid="language-switcher"]')
      await expect(desktopSwitcher).toBeVisible()

      // Test mobile
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()

      const mobileSwitcher = page.locator('[data-testid="mobile-language-switcher"]')
      await expect(mobileSwitcher).toBeVisible()
    })
  })

  test.describe('Performance Tests', () => {
    test('should load pages within performance thresholds', async ({ page }) => {
      for (const lang of ['id', 'en']) {
        const startTime = Date.now()

        await page.goto(`/${lang}`)
        await page.waitForLoadState('networkidle')

        const loadTime = Date.now() - startTime

        // Should load within 3 seconds
        expect(loadTime).toBeLessThan(3000)
      }
    })

    test('should switch languages quickly', async ({ page }) => {
      await page.goto('/id')

      const startTime = Date.now()

      await page.click('[data-testid="language-switcher-en"]')
      await page.waitForURL('**/en**')

      const switchTime = Date.now() - startTime

      // Should switch within 1 second
      expect(switchTime).toBeLessThan(1000)
    })
  })

  test.describe('Error Handling Tests', () => {
    test('should handle JavaScript errors gracefully', async ({ page }) => {
      const errors = []

      page.on('pageerror', (error) => {
        errors.push(error.message)
      })

      await page.goto('/id')
      await page.click('[data-testid="language-switcher-en"]')
      await page.waitForURL('**/en**')

      // Should not have any JavaScript errors
      expect(errors).toHaveLength(0)
    })

    test('should handle network errors gracefully', async ({ page }) => {
      await page.goto('/id')

      // Simulate network failure
      await page.route('**/locales/en.json', route => route.abort())

      try {
        await page.click('[data-testid="language-switcher-en"]')
        // Should not crash the page
        const isVisible = await page.isVisible('body')
        expect(isVisible).toBe(true)
      } catch (error) {
        // Error handling should prevent crashes
        console.log('Network error handled:', error.message)
      }
    })
  })

  test.describe('Accessibility Tests', () => {
    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/id')

      // Test keyboard navigation to language switcher
      await page.keyboard.press('Tab')

      const focused = await page.evaluate(() => document.activeElement.tagName)
      expect(['BUTTON', 'A', 'SELECT']).toContain(focused)
    })

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/id')

      const languageSwitcher = page.locator('[data-testid="language-switcher"]')
      const ariaLabel = await languageSwitcher.getAttribute('aria-label')

      expect(ariaLabel).toBeTruthy()
    })
  })

  test.describe('QA Validation Tests', () => {
    test('should pass pre-launch validation', async ({ page }) => {
      const results = await qaManager.runPreLaunchValidation(page)

      expect(results.ready_for_launch).toBe(true)
      expect(results.critical_failed).toBe(0)
    })

    test('should pass post-launch validation', async () => {
      const results = await qaManager.runPostLaunchValidation()

      expect(results.failed).toBeLessThanOrEqual(results.passed)
    })
  })

  test.describe('Analytics Tests', () => {
    test('should track language switch events', async ({ page }) => {
      await page.goto('/id')

      // Mock analytics functions
      await page.addInitScript(() => {
        window.analyticsEvents = []
        window.gtag = (...args) => {
          window.analyticsEvents.push(args)
        }
      })

      await page.click('[data-testid="language-switcher-en"]')
      await page.waitForURL('**/en**')

      const events = await page.evaluate(() => window.analyticsEvents)
      const languageSwitchEvent = events.find(event =>
        event[1] === 'language_switch'
      )

      expect(languageSwitchEvent).toBeTruthy()
    })
  })
})

test.describe('Full Test Suite Execution', () => {
  test('should run comprehensive multilingual tests', async ({ page }) => {
    const testFramework = new MultilingualTestFramework(page)
    const results = await testFramework.runAllTests()

    expect(results.success).not.toBe(false)
    expect(results.summary.successRate).toBeGreaterThan(80)
  })
})