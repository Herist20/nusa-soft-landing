<template>
  <section id="services" class="py-16 lg:py-24 relative overflow-hidden">
    <!-- Background futuristik -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 z-0"></div>
    
    <!-- Grid pattern futuristik -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
    
    <!-- Elemen geometris -->
    <div class="absolute top-1/4 left-10 w-32 h-32 border-2 border-cyan-400 rounded-full opacity-20 animate-pulse-slow"></div>
    <div class="absolute bottom-1/4 right-10 w-40 h-40 border-2 border-indigo-400 rotate-45 opacity-20 animate-pulse-slow"></div>
    
    <!-- Glow effect -->
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>
    
    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-cyan-900/30 backdrop-blur-sm border border-cyan-700/50 rounded-full mb-4">
          <span class="text-cyan-300 font-semibold text-sm">{{ t('services.title') }}</span>
        </div>
        <h2 class="font-sans text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-6">
          {{ t('services.title') }}
        </h2>
        <p class="text-xl text-cyan-100/80 max-w-2xl mx-auto leading-relaxed">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 services-grid">
        <div v-for="(service, index) in servicesList" :key="service.key"
             class="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 p-8 group cursor-pointer border border-gray-700 hover:border-cyan-500/50 flex flex-col h-full transform hover:-translate-y-2"
             :class="{ 'service-card-id': locale === 'id', 'service-card-en': locale === 'en' }"
             :style="`opacity: 0; animation: fadeInStagger 0.6s ease-out forwards; animation-delay: ${index * 0.1}s;`">

          <!-- Service Icon -->
          <div class="mb-6">
            <div class="w-16 h-16 bg-cyan-900/30 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-800/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transform group-hover:scale-110">
              <component :is="service.icon" class="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <!-- Service Content -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
              {{ t(`services.list.${service.key}.title`) }}
            </h3>
            <p class="text-cyan-100/70 leading-relaxed mb-6">
              {{ t(`services.list.${service.key}.description`) }}
            </p>
          </div>

          <!-- Service Features -->
          <div class="mb-6">
            <div class="space-y-3">
              <div v-for="(feature, idx) in getServiceFeatures(service.key)" :key="idx"
                   class="flex items-start space-x-3 service-feature-item opacity-0"
                   :style="`animation: fadeIn 0.5s ease-out forwards; animation-delay: ${(index * 0.1) + (idx * 0.05) + 0.3}s;`">
                <div class="w-5 h-5 bg-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-cyan-800/50 group-hover:shadow-cyan-500/20">
                  <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span
                  class="text-cyan-100/70 text-sm group-hover:text-cyan-100 transition-colors duration-300"
                  :class="{ 'feature-text-id': locale === 'id', 'feature-text-en': locale === 'en' }"
                >{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Service CTA -->
          <div class="mt-auto">
            <a
              :href="getWhatsAppUrl(service.key)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-all duration-300 group-hover:translate-x-1"
            >
              {{ t('services.learnMore') }}
              <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <div class="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl p-8 border border-gray-700 transform transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-500/30">
          <h3 class="text-2xl font-bold text-white mb-4">
            {{ t('hero.cta.primaryCTA') }}
          </h3>
          <p class="text-cyan-100/70 mb-6 max-w-xl mx-auto">
            {{ t('contact.subtitle') }}
          </p>
          <a
            :href="getWhatsAppUrl('general')"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            {{ t('navigation.startProject') }}
            <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Debug: let's see what locale value we're getting
console.log('Current locale:', locale.value)

// Helper function to get service features
const getServiceFeatures = (serviceKey) => {
  try {
    // Get the raw message object and access the nested property
    const messages = t('services.list')
    console.log('Raw services messages:', messages)

    if (messages && messages[serviceKey] && messages[serviceKey].features) {
      const features = messages[serviceKey].features
      console.log(`Features for ${serviceKey}:`, features)
      return Array.isArray(features) ? features : []
    }

    // Fallback: try direct translation
    const features = t(`services.list.${serviceKey}.features`)
    console.log(`Fallback features for ${serviceKey}:`, features, typeof features)

    if (Array.isArray(features)) {
      return features
    }

    // If translation fails, it returns the key string
    console.log(`Translation failed for ${serviceKey}, returning empty array`)
    return []
  } catch (error) {
    console.error(`Error getting features for ${serviceKey}:`, error)
    return []
  }
}

const WebIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' })
    )
  }
}

const MobileIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' })
    )
  }
}

const UIIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' })
    )
  }
}

const ApiIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    )
  }
}

const EcommerceIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' })
    )
  }
}

const ConsultingIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    )
  }
}

const servicesList = [
  { key: 'webDev', icon: WebIcon },
  { key: 'mobileDev', icon: MobileIcon },
  { key: 'uiux', icon: UIIcon },
  { key: 'enterprise', icon: ApiIcon },
  { key: 'consulting', icon: ConsultingIcon },
  { key: 'maintenance', icon: EcommerceIcon }
]

const getWhatsAppUrl = (serviceKey) => {
  const message = serviceKey === 'general' ?
    t('hero.whatsappMessage') :
    `Halo! Saya tertarik dengan layanan ${t(`services.list.${serviceKey}.shortTitle`)}. Bisakah kita diskusi kebutuhan proyek saya?`

  return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
}
</script>

<style scoped>
/* Grid pattern untuk background futuristik */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(100, 200, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 200, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Animasi fade in untuk kartu layanan */
@keyframes fadeInStagger {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Animasi fade in untuk fitur layanan */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateX(-10px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

/* Animasi pulse yang lebih lambat */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Efek glow untuk shadow */
.shadow-cyan-500\/10 {
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04);
}

.shadow-cyan-500\/30 {
  box-shadow: 0 20px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(6, 182, 212, 0.1);
}

.shadow-cyan-500\/20 {
  box-shadow: 0 10px 15px -3px rgba(6, 182, 212, 0.2), 0 4px 6px -2px rgba(6, 182, 212, 0.05);
}
</style>