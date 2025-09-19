<template>
  <section id="services" class="py-16 lg:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg mb-4">
          <span class="text-secondary font-semibold text-sm">{{ t('services.title') }}</span>
        </div>
        <h2 class="font-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {{ t('services.title') }}
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in servicesList" :key="service.key"
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-8 group cursor-pointer border border-gray-200 hover:border-blue-200 flex flex-col h-full"
             :style="`opacity: 0; animation: fadeInStagger 0.6s ease-out forwards; animation-delay: ${index * 0.1}s;`">

          <!-- Service Icon -->
          <div class="mb-6">
            <div class="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-100">
              <component :is="service.icon" class="w-8 h-8 text-secondary" />
            </div>
          </div>

          <!-- Service Content -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ t(`services.list.${service.key}.title`) }}
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6">
              {{ t(`services.list.${service.key}.description`) }}
            </p>
          </div>

          <!-- Service Features -->
          <div class="mb-6">
            <div class="space-y-3">
              <div v-for="(feature, idx) in t(`services.list.${service.key}.features`)" :key="idx"
                   class="flex items-start space-x-3">
                <div class="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-600 text-sm">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Service CTA -->
          <div class="mt-auto">
            <a
              :href="getWhatsAppUrl(service.key)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-secondary hover:text-blue-600 font-medium text-sm transition-colors duration-200"
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
        <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            {{ t('hero.cta.primaryCTA') }}
          </h3>
          <p class="text-gray-600 mb-6 max-w-xl mx-auto">
            {{ t('contact.subtitle') }}
          </p>
          <a
            :href="getWhatsAppUrl('general')"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            {{ t('navigation.startProject') }}
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const { t } = useI18n()

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