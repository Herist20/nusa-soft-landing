import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Import optimization utilities
import lazyLoad from './directives/lazyLoad'
import { updateMetaTags, injectStructuredData, preloadResources } from './utils/seo'
import { initializeTracking } from './utils/analytics'
import { initializeAccessibility } from './utils/accessibility'

const app = createApp(App)

// Register global directives
app.directive('lazy', lazyLoad)

// Use router
app.use(router)

// Initialize optimizations
app.mixin({
  mounted() {
    if (this.$el.parentElement === document.body) {
      // Initialize SEO
      updateMetaTags()
      injectStructuredData('Organization')
      preloadResources()

      // Initialize Analytics
      if (import.meta.env.PROD) {
        initializeTracking()
      }

      // Initialize Accessibility
      initializeAccessibility()

      // Performance monitoring in production
      if (import.meta.env.PROD) {
        import('./utils/seo').then(({ reportWebVitals }) => {
          reportWebVitals(console.log)
        })
      }
    }
  }
})

// Mount app
app.mount('#app')
