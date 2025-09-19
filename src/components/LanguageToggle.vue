<template>
  <div class="language-toggle-container">
    <!-- Desktop Toggle -->
    <div class="language-toggle desktop-toggle" :class="{ 'is-animating': isAnimating }">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="handleLanguageSwitch(lang.code)"
        class="toggle-button"
        :class="{
          'active': currentLocale === lang.code,
          'inactive': currentLocale !== lang.code
        }"
        :aria-label="`Switch to ${lang.name}`"
        :aria-current="currentLocale === lang.code ? 'true' : 'false'"
      >
        <span class="flag-wrapper">
          <span class="flag">{{ lang.flag }}</span>
        </span>
        <span class="lang-code">{{ lang.code.toUpperCase() }}</span>
      </button>
      <div
        class="toggle-slider"
        :style="{ transform: `translateX(${currentLocale === 'id' ? '0' : '100%'})` }"
      ></div>
    </div>

    <!-- Mobile Floating Toggle -->
    <div
      v-if="showMobileToggle"
      class="mobile-language-toggle"
      :class="{ 'is-visible': isMobileVisible }"
    >
      <button
        @click="toggleMobileExpanded"
        class="mobile-toggle-trigger"
        :aria-expanded="isMobileExpanded"
      >
        <span class="current-flag">{{ currentLanguage.flag }}</span>
        <svg
          class="chevron"
          :class="{ 'rotate': isMobileExpanded }"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </button>

      <transition name="expand">
        <div v-if="isMobileExpanded" class="mobile-options">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="handleMobileLanguageSwitch(lang.code)"
            class="mobile-option"
            :class="{ 'active': currentLocale === lang.code }"
          >
            <span class="flag">{{ lang.flag }}</span>
            <span class="name">{{ lang.name }}</span>
            <svg v-if="currentLocale === lang.code" class="check" width="16" height="16" viewBox="0 0 16 16">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default', 'compact', 'floating'
  },
  position: {
    type: String,
    default: 'header' // 'header', 'footer', 'floating'
  },
  showMobile: {
    type: Boolean,
    default: true
  }
})

const { currentLocale, changeLanguage } = useLanguage()

const languages = ref([
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
])

const isAnimating = ref(false)
const showMobileToggle = ref(false)
const isMobileVisible = ref(false)
const isMobileExpanded = ref(false)
const scrollY = ref(0)
const lastScrollY = ref(0)

const currentLanguage = computed(() => {
  return languages.value.find(l => l.code === currentLocale.value) || languages.value[0]
})

const handleLanguageSwitch = async (langCode) => {
  if (langCode === currentLocale.value) return

  // Save scroll position
  const scrollPosition = window.scrollY

  // Add animation class
  isAnimating.value = true

  // Perform language switch
  await changeLanguage(langCode)

  // Track analytics
  trackLanguageChange(langCode)

  // Restore scroll position after DOM update
  setTimeout(() => {
    window.scrollTo(0, scrollPosition)
    isAnimating.value = false
  }, 300)
}

const handleMobileLanguageSwitch = async (langCode) => {
  await handleLanguageSwitch(langCode)
  isMobileExpanded.value = false
}

const toggleMobileExpanded = () => {
  isMobileExpanded.value = !isMobileExpanded.value
}

const trackLanguageChange = (langCode) => {
  // Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'language_change', {
      language_from: currentLocale.value,
      language_to: langCode,
      page_location: window.location.pathname
    })
  }
}

const handleScroll = () => {
  scrollY.value = window.scrollY

  // Show/hide mobile toggle based on scroll
  if (props.showMobile && window.innerWidth <= 768) {
    if (scrollY.value > 100) {
      isMobileVisible.value = true
    } else {
      isMobileVisible.value = false
      isMobileExpanded.value = false
    }

    // Hide on scroll down, show on scroll up
    if (scrollY.value > lastScrollY.value && scrollY.value > 200) {
      isMobileVisible.value = false
      isMobileExpanded.value = false
    } else if (scrollY.value < lastScrollY.value - 5) {
      isMobileVisible.value = true
    }

    lastScrollY.value = scrollY.value
  }
}

const handleResize = () => {
  showMobileToggle.value = window.innerWidth <= 768 && props.showMobile
}

const handleClickOutside = (event) => {
  const mobileToggle = document.querySelector('.mobile-language-toggle')
  if (mobileToggle && !mobileToggle.contains(event.target)) {
    isMobileExpanded.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
})

// Preserve form data on language change
watch(currentLocale, (newLocale, oldLocale) => {
  if (newLocale !== oldLocale) {
    preserveFormData()
  }
})

const preserveFormData = () => {
  // Get all form inputs
  const forms = document.querySelectorAll('form')
  const formData = new Map()

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select')
    inputs.forEach(input => {
      if (input.name && input.value) {
        formData.set(input.name, input.value)
      }
    })
  })

  // Restore form data after language change
  setTimeout(() => {
    formData.forEach((value, name) => {
      const input = document.querySelector(`[name="${name}"]`)
      if (input) {
        input.value = value
      }
    })
  }, 100)
}
</script>

<style scoped>
/* Desktop Toggle Styles */
.language-toggle {
  position: relative;
  display: inline-flex;
  background: #f3f4f6;
  border-radius: 9999px;
  padding: 2px;
  gap: 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.toggle-button {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 70px;
}

.toggle-button:hover {
  color: #374151;
}

.toggle-button.active {
  color: #ffffff;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(50% - 2px);
  height: calc(100% - 4px);
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 9999px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.flag-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag {
  font-size: 1.125rem;
  line-height: 1;
  filter: grayscale(0);
  transition: transform 0.3s ease;
}

.toggle-button:not(.active) .flag {
  filter: grayscale(0.5);
  opacity: 0.8;
}

.toggle-button:hover .flag {
  transform: scale(1.1);
}

.lang-code {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.is-animating .toggle-button {
  animation: pulse 0.3s ease-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.95); }
}

/* Mobile Floating Toggle */
.mobile-language-toggle {
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  z-index: 9999;
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.mobile-language-toggle.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.mobile-toggle-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 9999px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-toggle-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.mobile-toggle-trigger:active {
  transform: scale(0.98);
}

.current-flag {
  font-size: 1.5rem;
  line-height: 1;
}

.chevron {
  transition: transform 0.3s ease;
  color: #9ca3af;
}

.chevron.rotate {
  transform: rotate(180deg);
}

.mobile-options {
  position: absolute;
  bottom: calc(100% + 0.75rem);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  min-width: 200px;
}

.mobile-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.mobile-option:hover {
  background: #f9fafb;
}

.mobile-option.active {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #2563eb;
  font-weight: 600;
}

.mobile-option .flag {
  font-size: 1.25rem;
}

.mobile-option .name {
  flex: 1;
  text-align: left;
}

.mobile-option .check {
  color: #2563eb;
  animation: checkIn 0.3s ease-out;
}

@keyframes checkIn {
  from {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom right;
}

.expand-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}

.expand-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .desktop-toggle {
    display: none;
  }
}

@media (min-width: 769px) {
  .mobile-language-toggle {
    display: none !important;
  }
}

/* Compact variant */
.language-toggle.compact {
  padding: 1px;
}

.language-toggle.compact .toggle-button {
  padding: 0.375rem 0.75rem;
  min-width: 60px;
}

.language-toggle.compact .lang-code {
  font-size: 0.6875rem;
}

/* Dark mode support preparation */
@media (prefers-color-scheme: dark) {
  .language-toggle {
    background: #1f2937;
  }

  .toggle-slider {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  }

  .toggle-button {
    color: #9ca3af;
  }

  .toggle-button.active {
    color: #ffffff;
  }
}

/* RTL support */
[dir="rtl"] .toggle-slider {
  transform: translateX(calc(-100% * var(--toggle-position, 0)));
}

[dir="rtl"] .mobile-options {
  right: auto;
  left: 0;
}

[dir="rtl"] .mobile-option .name {
  text-align: right;
}
</style>