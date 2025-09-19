import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { supportedLocales } from '@/locales'

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

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'home'
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue'),
    meta: {
      title: 'services'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: {
      title: 'products'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('../views/Portfolio.vue'),
    meta: {
      title: 'portfolio'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'about'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: 'contact'
    }
  }
]

const localizedRoutes = []
supportedLocales.forEach(locale => {
  baseRoutes.forEach(route => {
    localizedRoutes.push(createLocaleRoute(route, locale.code))
  })
})

const routes = [
  {
    path: '/',
    redirect: () => {
      const locale = getDefaultLocale()
      return `/${locale}`
    }
  },
  ...localizedRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const locale = getDefaultLocale()
      return `/${locale}`
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
  const locale = to.meta.locale || to.params.locale

  if (locale && supportedLocales.find(l => l.code === locale)) {
    document.documentElement.lang = locale

    if (typeof window !== 'undefined' && window.i18n) {
      window.i18n.global.locale.value = locale
    }
  }

  next()
})

export default router