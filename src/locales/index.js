import { createI18n } from 'vue-i18n'
import id from './id.json'
import en from './en.json'

const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale && ['id', 'en'].includes(savedLocale)) {
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

const locale = getDefaultLocale()

document.documentElement.lang = locale

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: {
    id,
    en
  },
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  formatFallbackMessages: true,
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    },
    id: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    }
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }
    },
    id: {
      currency: {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }
    }
  }
})

export default i18n

export const supportedLocales = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

export const getSupportedLocales = () => supportedLocales

export const setI18nLanguage = (locale) => {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  localStorage.setItem('userLocale', locale)
}