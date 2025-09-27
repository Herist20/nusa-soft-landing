<template>
  <div class="mobile-language-switcher">
    <!-- Compact Mobile Toggle -->
    <button
      @click.stop="toggleMenu"
      class="language-toggle-btn"
      :aria-expanded="showMenu"
      aria-label="Select language"
    >
      <span class="flag-icon">{{ currentLanguage.flag }}</span>
      <span class="lang-code">{{ currentLanguage.code.toUpperCase() }}</span>
      <svg
        class="chevron-icon"
        :class="{ 'rotate-180': showMenu }"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Mobile Language Menu -->
    <Teleport to="body">
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showMenu"
          class="mobile-menu-overlay"
          @click.self="closeMenu"
        >
          <div
            class="mobile-menu-container top-menu"
            @click.stop
          >
            <div class="menu-header">
              <h3 class="menu-title">{{ t('language.selectLanguage') || 'Select Language' }}</h3>
              <button
                @click.stop="closeMenu"
                class="close-btn"
                aria-label="Close language menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="language-options">
              <button
                v-for="lang in availableLocales"
                :key="lang.code"
                @click.stop="selectLanguage(lang.code)"
                class="language-option"
                :class="{ 'active': currentLocale === lang.code }"
                :aria-current="currentLocale === lang.code ? 'true' : 'false'"
              >
                <span class="option-flag">{{ lang.flag }}</span>
                <div class="option-content">
                  <span class="option-name">{{ lang.name }}</span>
                  <span class="option-native">{{ lang.nativeName }}</span>
                </div>
                <svg
                  v-if="currentLocale === lang.code"
                  class="check-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>

            <!-- Loading indicator -->
            <div v-if="isChanging" class="loading-overlay">
              <div class="loading-spinner"></div>
              <span class="loading-text">{{ t('language.changing') || 'Changing language...' }}</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'

const { currentLocale, availableLocales, changeLanguage } = useLanguage()
const { t } = useI18n()

const showMenu = ref(false)
const isChanging = ref(false)

const currentLanguage = computed(() => {
  const current = availableLocales.value.find(lang => lang.code === currentLocale.value)
  return current || availableLocales.value[0]
})

const toggleMenu = (event) => {
  event?.stopPropagation?.()
  showMenu.value = !showMenu.value
  if (showMenu.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  showMenu.value = false
  document.body.style.overflow = ''
}

const selectLanguage = async (langCode, event) => {
  event?.stopPropagation?.()
  
  if (langCode === currentLocale.value) {
    closeMenu()
    return
  }

  isChanging.value = true

  try {
    await changeLanguage(langCode, true)

    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }

    setTimeout(() => {
      closeMenu()
      isChanging.value = false
    }, 300)
  } catch (error) {
    console.error('Language change failed:', error)
    isChanging.value = false
    closeMenu()
  }
}

// Close menu on escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && showMenu.value) {
    closeMenu()
  }
}

// Prevent scroll when menu is open
watch(showMenu, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.mobile-language-switcher {
  position: relative;
}

/* Compact Toggle Button */
.language-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s;
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}

.language-toggle-btn:active {
  transform: scale(0.98);
}

.flag-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.lang-code {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.chevron-icon {
  transition: transform 0.2s;
}

.chevron-icon.rotate-180 {
  transform: rotate(180deg);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  backdrop-filter: blur(4px);
}

.mobile-menu-container {
  position: relative;
  width: 100%;
  background: white;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  padding-top: env(safe-area-inset-top);
  max-height: 70vh;
  overflow-y: auto;
  animation: slideDown 0.3s ease-out;
}

/* Top menu variant */
.mobile-menu-container.top-menu {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.menu-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  color: #6b7280;
  transition: all 0.2s;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

/* Language Options */
.language-options {
  padding: 0.5rem;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  border-radius: 0.75rem;
  text-align: left;
  transition: all 0.2s;
  min-height: 60px;
  touch-action: manipulation;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent;
}

.language-option:active {
  transform: scale(0.98);
}

.language-option.active {
  background: #eff6ff;
  border: 1px solid #3b82f6;
}

.option-flag {
  font-size: 1.75rem;
  line-height: 1;
  flex-shrink: 0;
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.option-name {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
}

.option-native {
  font-size: 0.875rem;
  color: #6b7280;
}

.language-option.active .option-name {
  color: #2563eb;
}

.check-icon {
  flex-shrink: 0;
  color: #2563eb;
}

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .mobile-language-switcher {
    display: none;
  }
}

/* Landscape mode adjustments */
@media (max-height: 500px) {
  .mobile-menu-container {
    max-height: 90vh;
  }

  .language-option {
    min-height: 48px;
    padding: 0.75rem 1rem;
  }
}

/* RTL Support */
[dir="rtl"] .language-toggle-btn {
  flex-direction: row-reverse;
}

[dir="rtl"] .language-option {
  text-align: right;
}

[dir="rtl"] .option-content {
  align-items: flex-end;
}

/* Remove all focus rings and outlines globally */
button:focus,
button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

/* Remove webkit focus outline */
button::-moz-focus-inner {
  border: 0;
  outline: none;
}

/* Prevent text selection and touch highlights */
* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>