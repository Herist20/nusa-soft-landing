import { createApp } from 'vue'
import './style.css'
import './styles/mobile-language.css'
import './styles/simple-fixes.css'
import App from './App.vue'
import router from './router'
import i18n from './locales'

// Import optimization utilities
import lazyLoad from './directives/lazyload.js'
import { updateMetaTags, injectStructuredData, preloadResources, reportWebVitals } from './utils/seo'
import { initializeAccessibility } from './utils/accessibility'
import { multilingualSEO } from './utils/seoMultilingual'
import { analytics } from './utils/analytics'
import { performanceMonitor } from './utils/performanceMonitor'
import { errorMonitor } from './utils/errorHandling'

const app = createApp(App)

// Register global directives
app.directive('lazy', lazyLoad)

// Use plugins
app.use(router)
app.use(i18n)

// Make i18n globally available for router
window.i18n = i18n

// Initialize optimizations
app.mixin({
  mounted() {
    if (this.$el.parentElement === document.body) {
      // Initialize SEO
      updateMetaTags()
      injectStructuredData('Organization')
      preloadResources()

      // Initialize Multilingual SEO
      const currentLocale = i18n.global.locale.value
      multilingualSEO.initializeSEO(window.location, currentLocale)

      // Initialize Analytics
      if (import.meta.env.PROD) {
        analytics.initialize(currentLocale)
        analytics.setupAutomatedTracking()
      }

      // Initialize Performance Monitoring
      performanceMonitor.init()

      // Initialize Error Monitoring
      errorMonitor.init()

      // Initialize Accessibility
      initializeAccessibility()

      // Performance monitoring in production
      if (import.meta.env.PROD) {
        reportWebVitals(console.log)
      }
    }
  }
})

// Mount app
app.mount('#app')
