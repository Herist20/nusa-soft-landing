<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="[
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border'
        : 'bg-white/80 backdrop-blur-sm border-b border-border/50'
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
            class="font-sans font-extrabold text-2xl transition-all duration-200 flex items-center gap-2 no-underline"
            :class="scrolled
              ? 'text-primary'
              : 'text-primary'
            "
            aria-label="Nusa Software - Go to top"
            style="text-decoration: none;"
          >
            <span class="text-secondary text-3xl">•</span>
            <span>Nusa<span class="text-secondary">Soft</span></span>
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
              <a
                :href="item.href"
                @click="scrollToSection($event, item.href)"
                class="px-3 py-2 text-sm font-medium transition-all duration-200 relative group flex items-center gap-1"
                :class="[
                  activeSection === item.href || (item.submenu && item.submenu.some(sub => activeSection === sub.href))
                    ? scrolled
                      ? 'text-secondary font-semibold'
                      : 'text-secondary font-semibold'
                    : scrolled
                      ? 'text-text-secondary hover:text-primary'
                      : 'text-text-secondary hover:text-primary'
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
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-200"
                  :class="activeSection === item.href || (item.submenu && item.submenu.some(sub => activeSection === sub.href))
                    ? 'bg-secondary w-full'
                    : 'bg-secondary w-0 group-hover:w-full'
                  "
                ></span>
              </a>

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
                  class="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-border py-2 z-50"
                  data-testid="about-dropdown-menu"
                >
                  <a
                    v-for="subItem in item.submenu"
                    :key="subItem.name"
                    :href="subItem.href"
                    @click="scrollToSection($event, subItem.href)"
                    class="block px-4 py-2 text-sm transition-all duration-200 hover:bg-surface"
                    :class="[
                      activeSection === subItem.href
                        ? 'text-secondary font-semibold bg-surface border-l-4 border-secondary'
                        : 'text-text-secondary hover:text-primary'
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
              href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20to%20start%20a%20project%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-secondary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              aria-label="Start project via WhatsApp"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
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
            @click="toggleMobileMenu"
            class="p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            :class="scrolled ? 'text-text-secondary hover:text-primary' : 'text-primary hover:text-secondary'"
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
        class="md:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
      >
        <div class="px-4 pt-4 pb-6 space-y-3">
          <div v-for="item in navItems" :key="item.name" class="space-y-2">
            <!-- Main menu item -->
            <a
              :href="item.href"
              @click="item.hasDropdown ? toggleMobileSubmenu(item.name()) : handleMobileNavClick($event, item.href)"
              class="flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
              :class="[
                activeSection === item.href || (item.submenu && item.submenu.some(sub => activeSection === sub.href))
                  ? 'text-secondary bg-surface font-semibold border-l-4 border-secondary'
                  : 'text-text-secondary hover:text-primary hover:bg-surface'
              ]"
              :aria-current="activeSection === item.href ? 'page' : undefined"
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
            </a>

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
                      ? 'text-secondary bg-surface font-semibold border-l-4 border-secondary'
                      : 'text-text-secondary hover:text-primary hover:bg-surface'
                  ]"
                >
                  {{ typeof subItem.name === 'function' ? subItem.name() : subItem.name }}
                </a>
              </div>
            </transition>
          </div>
          <div class="pt-2 border-t border-border">
            <a
              href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20to%20start%20a%20project%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              @click="mobileMenuOpen = false"
              class="w-full bg-secondary hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-md"
              aria-label="Start project via WhatsApp"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
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
  { name: () => t('navigation.services'), href: '#services' },
  { name: () => t('navigation.portfolio'), href: '#portfolio' },
  {
    name: () => t('navigation.about'),
    href: '#about',
    hasDropdown: true,
    submenu: [
      { name: () => t('navigation.about'), href: '#about' },
      { name: () => t('navigation.team'), href: '#team' },
      { name: () => t('navigation.process'), href: '#process' }
    ]
  },
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

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    activeMobileSubmenu.value = null
  }
}

const toggleMobileSubmenu = (itemName) => {
  activeMobileSubmenu.value = activeMobileSubmenu.value === itemName ? null : itemName
}

const handleMobileNavClick = (event, href) => {
  scrollToSection(event, href)
  mobileMenuOpen.value = false
  activeMobileSubmenu.value = null
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

  // Observe all sections
  navItems.value.forEach((item) => {
    const element = document.querySelector(item.href)
    if (element) {
      observer.observe(element)
    }
  })
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const nav = event.target.closest('nav')
  if (!nav && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

// Handle keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
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

/* Improve dropdown appearance */
[data-testid="about-dropdown-menu"] {
  min-width: 200px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth hover effects */
.hover\:bg-surface:hover {
  background-color: var(--surface, #f8fafc);
}

/* Mobile menu improvements */
@media (max-width: 768px) {
  .ml-4 {
    margin-left: 1rem;
  }
}
</style>

