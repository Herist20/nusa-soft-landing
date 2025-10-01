<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="[
      scrolled
        ? 'bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-800'
        : 'bg-gray-900/70 backdrop-blur-sm border-b border-gray-800/50'
    ]"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a
            href="#hero"
            @click="scrollToSection($event, '#hero')"
            class="transition-all duration-200 flex items-center no-underline"
            aria-label="Nusa Software - Go to top"
            style="text-decoration: none;"
          >
            <img
              src="../../assets/images/nusa-software-logo.webp"
              alt="Nusa Software Logo"
              class="h-48 w-auto"
            />
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-8">
            <div
              v-for="item in navItems"
              :key="item.name"
              class="relative"
              @mouseenter="item.hasDropdown ? (activeDropdown = item.name()) : null"
              @mouseleave="activeDropdown = null"
            >
              <!-- Main menu item -->
              <component
                :is="item.hasDropdown ? 'div' : 'a'"
                :href="item.hasDropdown ? undefined : item.href"
                @click="item.hasDropdown ? null : scrollToSection($event, item.href)"
                class="px-3 py-2 text-sm font-medium transition-all duration-200 relative group flex items-center gap-1"
                :class="[
                  item.hasDropdown ? 'cursor-default' : 'cursor-pointer',
                  activeSection === item.href || (item.submenu && item.submenu.some(sub => activeSection === sub.href))
                    ? scrolled
                      ? 'text-cyan-400 font-semibold'
                      : 'text-cyan-400 font-semibold'
                    : scrolled
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-300 hover:text-white'
                ]"
                :aria-current="activeSection === item.href ? 'page' : undefined"
                :aria-expanded="item.hasDropdown ? activeDropdown === item.name() : undefined"
              >
                {{ typeof item.name === 'function' ? item.name() : item.name }}

                <!-- Dropdown arrow -->
                <svg
                  v-if="item.hasDropdown"
                  class="w-4 h-4 transition-transform duration-200"
                  :class="activeDropdown === item.name() ? 'rotate-180' : ''"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>

                <span
                  v-if="!item.hasDropdown"
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-200"
                  :class="activeSection === item.href
                    ? 'bg-cyan-400 w-full'
                    : 'bg-cyan-400 w-0 group-hover:w-full'
                  "
                ></span>
              </component>

              <!-- Dropdown menu -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="item.hasDropdown && activeDropdown === item.name()"
                  class="absolute top-full left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-lg rounded-lg shadow-xl border border-gray-700 py-2 z-50"
                  data-testid="about-dropdown-menu"
                >
                  <a
                    v-for="subItem in item.submenu"
                    :key="subItem.name"
                    :href="subItem.href"
                    @click="scrollToSection($event, subItem.href)"
                    class="block px-4 py-2 text-sm transition-all duration-200 relative"
                    :class="[
                      activeSection === subItem.href
                        ? 'text-cyan-400 font-semibold bg-gray-700/50 border-l-4 border-cyan-400 pl-3'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/30 hover:pl-5'
                    ]"
                    :data-testid="`dropdown-${subItem.href.replace('#', '')}`"
                  >
                    {{ typeof subItem.name === 'function' ? subItem.name() : subItem.name }}
                  </a>
                </div>
              </transition>
            </div>

            <!-- Language Toggle sejajar dengan menu -->
            <LanguageToggle />

            <a
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.startProject'))}`"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5"
              aria-label="Start project via WhatsApp"
            >
              {{ t('navigation.startProject') }}
            </a>
          </div>
        </div>

        <!-- Mobile menu button & language toggle -->
        <div class="md:hidden flex items-center gap-2">
          <!-- Mobile Language Switcher -->
          <MobileLanguageSwitcher />

          <!-- Mobile Menu Button -->
          <button
            @click.stop="toggleMobileMenu"
            class="p-2 rounded-md transition-colors duration-200 focus:outline-none"
            :class="scrolled ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'"
            aria-label="Toggle mobile menu"
            :aria-expanded="mobileMenuOpen"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Enhanced Mobile menu -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        @click.stop
        data-mobile-menu
        class="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 shadow-xl"
      >
        <div class="px-4 pt-4 pb-6 space-y-3">
          <div v-for="item in navItems" :key="item.name" class="space-y-2">
            <!-- Main menu item -->
            <component
              :is="item.hasDropdown ? 'div' : 'a'"
              :href="item.hasDropdown ? undefined : item.href"
              @click="item.hasDropdown ? toggleMobileSubmenu(item.name()) : handleMobileNavClick($event, item.href)"
              class="flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
              :class="[
                item.hasDropdown ? 'cursor-pointer' : '',
                !item.hasDropdown && activeSection === item.href
                  ? 'text-cyan-400 bg-gray-800/50 font-semibold border-l-4 border-cyan-400'
                  : item.submenu && item.submenu.some(sub => activeSection === sub.href)
                    ? 'text-cyan-400 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
              ]"
              :aria-current="!item.hasDropdown && activeSection === item.href ? 'page' : undefined"
            >
              <span>{{ typeof item.name === 'function' ? item.name() : item.name }}</span>

              <!-- Mobile dropdown arrow -->
              <svg
                v-if="item.hasDropdown"
                class="w-4 h-4 transition-transform duration-200"
                :class="activeMobileSubmenu === item.name() ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </component>

            <!-- Mobile submenu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 -translate-y-2"
              enter-to-class="transform opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 translate-y-0"
              leave-to-class="transform opacity-0 -translate-y-2"
            >
              <div
                v-if="item.hasDropdown && activeMobileSubmenu === item.name()"
                class="ml-4 space-y-1"
              >
                <a
                  v-for="subItem in item.submenu"
                  :key="subItem.name"
                  :href="subItem.href"
                  @click="handleMobileNavClick($event, subItem.href)"
                  class="block px-4 py-2 text-sm rounded-lg transition-all duration-200"
                  :class="[
                    activeSection === subItem.href
                      ? 'text-cyan-400 bg-gray-800/50 font-semibold border-l-4 border-cyan-400 pl-3'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/30 hover:pl-5'
                  ]"
                >
                  {{ typeof subItem.name === 'function' ? subItem.name() : subItem.name }}
                </a>
              </div>
            </transition>
          </div>
          <div class="pt-2 border-t border-gray-800">
            <a
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.startProject'))}`"
              target="_blank"
              rel="noopener noreferrer"
              @click="mobileMenuOpen = false"
              class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20"
              aria-label="Start project via WhatsApp"
            >
              {{ t('navigation.startProject') }}
            </a>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageToggle from '../LanguageToggle.vue'
import MobileLanguageSwitcher from '../MobileLanguageSwitcher.vue'

const { t } = useI18n()
const emit = defineEmits(['openContact'])

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('#hero')
let observer = null

const activeDropdown = ref(null)
const activeMobileSubmenu = ref(null)

const navItems = ref([
  { name: () => t('navigation.home'), href: '#hero' },
  { name: () => t('navigation.portfolio'), href: '#portfolio' },
  { name: () => t('navigation.pricing'), href: '#pricing' },
  { name: () => t('navigation.contact'), href: '#contact' }
])

const scrollToSection = (event, href) => {
  event.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const toggleMobileMenu = (event) => {
  event?.stopPropagation?.()
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    activeMobileSubmenu.value = null
  }
  
  // Prevent body scroll when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const toggleMobileSubmenu = (itemName) => {
  activeMobileSubmenu.value = activeMobileSubmenu.value === itemName ? null : itemName
}

const handleMobileNavClick = (event, href) => {
  event?.stopPropagation?.()
  scrollToSection(event, href)
  mobileMenuOpen.value = false
  activeMobileSubmenu.value = null
  document.body.style.overflow = ''
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const setupIntersectionObserver = () => {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = `#${entry.target.id}`
      }
    })
  }, observerOptions)

  // Observe all sections including submenu items
  navItems.value.forEach((item) => {
    if (!item.hasDropdown) {
      const element = document.querySelector(item.href)
      if (element) {
        observer.observe(element)
      }
    } else if (item.submenu) {
      // Also observe submenu items
      item.submenu.forEach((subItem) => {
        const element = document.querySelector(subItem.href)
        if (element) {
          observer.observe(element)
        }
      })
    }
  })
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const nav = event.target.closest('nav')
  const mobileMenu = event.target.closest('[data-mobile-menu]')
  
  if (!nav && !mobileMenu && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
    activeMobileSubmenu.value = null
    document.body.style.overflow = ''
  }
}

// Handle keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
    activeMobileSubmenu.value = null
    document.body.style.overflow = ''
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)

  await nextTick()
  setupIntersectionObserver()
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  
  // Restore body scroll when component unmounts
  document.body.style.overflow = ''

  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Ensure dropdown appears above other elements */
.relative {
  position: relative;
}

.z-50 {
  z-index: 50;
}

/* Remove all focus rings and outlines */
button:focus,
button:focus-visible,
a:focus,
a:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

/* Remove any webkit focus outline */
button::-moz-focus-inner {
  border: 0;
  outline: none;
}

/* Improve dropdown appearance */
[data-testid="about-dropdown-menu"] {
  min-width: 200px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}

/* Mobile menu improvements */
@media (max-width: 768px) {
  .ml-4 {
    margin-left: 1rem;
  }
}

/* Mobile menu overlay to prevent clicks outside */
[data-mobile-menu] {
  position: relative;
  z-index: 1000;
}

/* Hamburger button improvements */
.md\:hidden button {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Prevent accidental text selection on mobile */
.md\:hidden {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>