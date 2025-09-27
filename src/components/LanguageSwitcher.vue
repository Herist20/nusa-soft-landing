<template>
  <div class="language-switcher" :class="{ 'dropdown-open': isOpen }">
    <button
      @click="toggleDropdown"
      class="language-button"
      :aria-label="$t('common.changeLanguage')"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <span class="flag">{{ currentFlag }}</span>
      <span class="language-name">{{ currentLanguageName }}</span>
      <svg
        class="chevron"
        :class="{ 'rotate-180': isOpen }"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <transition name="dropdown">
      <ul v-if="isOpen" class="language-dropdown" role="menu">
        <li
          v-for="locale in availableLocales"
          :key="locale.code"
          role="menuitem"
        >
          <button
            @click="selectLanguage(locale.code)"
            class="language-option"
            :class="{ active: locale.code === currentLocale }"
            :aria-current="locale.code === currentLocale ? 'true' : 'false'"
          >
            <span class="flag">{{ locale.flag }}</span>
            <span class="language-name">{{ locale.name }}</span>
            <svg
              v-if="locale.code === currentLocale"
              class="check-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </transition>

    <div v-if="isOpen" class="backdrop" @click="closeDropdown"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'compact', 'inline'].includes(value)
  },
  showFlag: {
    type: Boolean,
    default: true
  },
  showName: {
    type: Boolean,
    default: true
  }
})

const { currentLocale, availableLocales, changeLanguage } = useLanguage()
const isOpen = ref(false)

const currentLanguage = computed(() => {
  return availableLocales.value.find(l => l.code === currentLocale.value)
})

const currentFlag = computed(() => {
  return props.showFlag ? currentLanguage.value?.flag : ''
})

const currentLanguageName = computed(() => {
  if (!props.showName) return ''
  if (props.variant === 'compact') {
    return currentLocale.value.toUpperCase()
  }
  return currentLanguage.value?.name
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectLanguage = async (locale) => {
  if (locale !== currentLocale.value) {
    await changeLanguage(locale)
  }
  closeDropdown()
}

const handleClickOutside = (event) => {
  const switcher = document.querySelector('.language-switcher')
  if (switcher && !switcher.contains(event.target)) {
    closeDropdown()
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
  z-index: 50;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(15, 23, 42, 0.8) !important;
  border: 1px solid rgba(34, 197, 238, 0.2);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0 !important;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
  backdrop-filter: blur(8px);
}

.language-button:hover {
  background: rgba(34, 197, 238, 0.1) !important;
  border-color: rgba(34, 197, 238, 0.4);
}

.language-button:focus {
  outline: none;
  border-color: rgba(34, 197, 238, 0.6);
  box-shadow: 0 0 0 2px rgba(34, 197, 238, 0.2);
}

.flag {
  font-size: 1.25rem;
  line-height: 1;
}

.language-name {
  flex: 1;
  text-align: left;
}

.chevron {
  transition: transform 0.2s;
  color: #94a3b8;
}

.chevron.rotate-180 {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: rgba(15, 23, 42, 0.95) !important;
  border: 1px solid rgba(34, 197, 238, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
  backdrop-filter: blur(12px);
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.language-option:hover {
  background-color: rgba(34, 197, 238, 0.1);
}

.language-option.active {
  background-color: rgba(34, 197, 238, 0.2);
  color: #22d3ee;
}

.check-icon {
  margin-left: auto;
  color: #22d3ee;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .language-button {
    min-width: auto;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    min-height: 44px;
  }

  .language-name {
    display: none;
  }

  .flag {
    font-size: 1.1rem;
  }

  .language-dropdown {
    right: 0;
    left: auto;
    transform: none;
    min-width: 180px;
    max-width: 90vw;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    transform: translateY(-10px);
  }
}

@media (max-width: 480px) {
  .language-button {
    padding: 0.4rem 0.6rem;
    border-radius: 0.4rem;
  }

  .chevron {
    width: 16px;
    height: 16px;
  }

  .language-dropdown {
    min-width: 160px;
    padding: 0.25rem 0;
  }

  .language-option {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
}

.variant-compact .language-button {
  min-width: auto;
  padding: 0.375rem 0.75rem;
}

.variant-inline {
  display: inline-flex;
}

.variant-inline .language-dropdown {
  position: fixed;
  top: auto;
  right: auto;
}

:root[dir="rtl"] .language-dropdown {
  right: auto;
  left: 0;
}

:root[dir="rtl"] .language-name {
  text-align: right;
}

:root[dir="rtl"] .check-icon {
  margin-left: 0;
  margin-right: auto;
}
</style>