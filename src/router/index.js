import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { supportedLocales } from '@/locales'
import { multilingualSEO } from '@/utils/seoMultilingual'

const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale && supportedLocales.find(l => l.code === savedLocale)) {
    return savedLocale
  }

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('id')) {
    return 'id'
  } else if (browserLang.startsWith('en')) {
    return 'en'
  }

  return 'id'
}

const createLocaleRoute = (route, locale) => {
  return {
    ...route,
    path: `/${locale}${route.path === '/' ? '' : route.path}`,
    name: `${route.name}-${locale}`,
    meta: {
      ...route.meta,
      locale
    }
  }
}

// SEO-friendly localized routes
const localizedRoutes = {
  'id': [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'home',
        locale: 'id'
      }
    },
    {
      path: '/portofolio',
      name: 'Portfolio',
      component: () => import('../views/Portfolio.vue'),
      meta: {
        title: 'portfolio',
        locale: 'id'
      }
    },
    {
      path: '/kontak',
      name: 'Contact',
      component: () => import('../views/Contact.vue'),
      meta: {
        title: 'contact',
        locale: 'id'
      }
    }
  ],
  'en': [
    {
      path: '/en',
      name: 'Home-en',
      component: Home,
      meta: {
        title: 'home',
        locale: 'en'
      }
    },
    {
      path: '/en/portfolio',
      name: 'Portfolio-en',
      component: () => import('../views/Portfolio.vue'),
      meta: {
        title: 'portfolio',
        locale: 'en'
      }
    },
    {
      path: '/en/contact',
      name: 'Contact-en',
      component: () => import('../views/Contact.vue'),
      meta: {
        title: 'contact',
        locale: 'en'
      }
    }
  ]
}

// Legacy redirects for SEO
const legacyRedirects = [
  { path: '/portfolio', redirect: '/portofolio' },
  { path: '/contact', redirect: '/kontak' }
]

// Flatten all localized routes
const allRoutes = [...localizedRoutes.id, ...localizedRoutes.en]

const routes = [
  // Main routes
  ...allRoutes,

  // Legacy redirects
  ...legacyRedirects,

  // 404 fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const locale = getDefaultLocale()
      return locale === 'id' ? '/' : '/en'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const locale = to.meta.locale || (to.path.startsWith('/en') ? 'en' : 'id')

  if (locale && supportedLocales.find(l => l.code === locale)) {
    document.documentElement.lang = locale

    if (typeof window !== 'undefined' && window.i18n) {
      window.i18n.global.locale.value = locale
    }
  }

  next()
})

// SEO optimization after each route
router.afterEach((to, from) => {
  if (typeof window !== 'undefined') {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const currentLocale = to.params.lang || 'id'
      multilingualSEO.initializeSEO(to, currentLocale)
    }, 100)
  }
})

export default router