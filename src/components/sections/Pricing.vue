<template>
  <section id="pricing" class="py-16 lg:py-24 relative overflow-hidden">
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
          <span class="text-cyan-300 font-semibold text-sm">{{ t('pricing.badge') }}</span>
        </div>
        <h2 class="font-sans text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-6">
          {{ t('pricing.title') }}
        </h2>
        <p class="text-xl text-cyan-100/80 max-w-2xl mx-auto leading-relaxed">
          {{ t('pricing.subtitle') }}
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        <!-- Basic Package -->
        <div class="group bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden border border-gray-700 hover:border-cyan-500/50 transform hover:-translate-y-2 relative flex flex-col">
          <div class="p-8 flex flex-col flex-grow">
            <h3 class="text-2xl font-bold text-white mb-2">{{ t('pricing.basic.name') }}</h3>
            <p class="text-cyan-100/70 mb-6 text-sm">{{ t('pricing.basic.description') }}</p>

            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-sm text-cyan-200/80">Rp</span>
                <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">850.000</span>
              </div>
              <p class="text-cyan-200/70 text-sm mt-1">{{ t('pricing.basic.period') }}</p>
            </div>

            <!-- Features -->
            <ul class="space-y-3 mb-8 flex-grow">
              <li v-for="(feature, index) in basicFeatures" :key="index" class="flex items-start text-sm">
                <svg class="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-cyan-100/80">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button -->
            <a
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.pricingBasic'))}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full bg-gray-700/50 hover:bg-cyan-900/50 text-cyan-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-cyan-800/50 hover:border-cyan-600/50 text-center block mt-auto"
            >
              {{ t('pricing.basic.cta') }}
            </a>
          </div>
        </div>

        <!-- Professional Package (Recommended) -->
        <div class="group bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden border-2 border-cyan-500/60 transform hover:-translate-y-2 relative scale-105 flex flex-col">
          <!-- Recommended Badge -->
          <div class="absolute top-4 right-4 z-10">
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {{ t('pricing.recommended') }}
            </div>
          </div>

          <div class="p-8 flex flex-col flex-grow">
            <h3 class="text-2xl font-bold text-white mb-2">{{ t('pricing.professional.name') }}</h3>
            <p class="text-cyan-100/70 mb-6 text-sm">{{ t('pricing.professional.description') }}</p>

            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-sm text-cyan-200/80">Rp</span>
                <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">1.000.000</span>
              </div>
              <p class="text-cyan-200/70 text-sm mt-1">{{ t('pricing.professional.period') }}</p>
            </div>

            <!-- Features -->
            <ul class="space-y-3 mb-8 flex-grow">
              <li v-for="(feature, index) in professionalFeatures" :key="index" class="flex items-start text-sm">
                <svg class="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-cyan-100/80">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button -->
            <a
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.pricingProfessional'))}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 text-center block mt-auto"
            >
              {{ t('pricing.professional.cta') }}
            </a>
          </div>
        </div>

        <!-- Enterprise Package -->
        <div class="group bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden border border-gray-700 hover:border-cyan-500/50 transform hover:-translate-y-2 relative flex flex-col">
          <div class="p-8 flex flex-col flex-grow">
            <h3 class="text-2xl font-bold text-white mb-2">{{ t('pricing.enterprise.name') }}</h3>
            <p class="text-cyan-100/70 mb-6 text-sm">{{ t('pricing.enterprise.description') }}</p>

            <!-- Price -->
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-sm text-cyan-200/80">Rp</span>
                <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">1.500.000</span>
              </div>
              <p class="text-cyan-200/70 text-sm mt-1">{{ t('pricing.enterprise.period') }}</p>
            </div>

            <!-- Features -->
            <ul class="space-y-3 mb-8 flex-grow">
              <li v-for="(feature, index) in enterpriseFeatures" :key="index" class="flex items-start text-sm">
                <svg class="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-cyan-100/80">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button -->
            <a
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.pricingEnterprise'))}`"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full bg-gray-700/50 hover:bg-cyan-900/50 text-cyan-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-cyan-800/50 hover:border-cyan-600/50 text-center block mt-auto"
            >
              {{ t('pricing.enterprise.cta') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Custom Package CTA -->
      <div class="text-center mt-16">
        <div class="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-xl p-8 border border-gray-700">
          <h3 class="text-2xl font-bold text-white mb-4">{{ t('pricing.custom.title') }}</h3>
          <p class="text-cyan-100/70 mb-6 max-w-2xl mx-auto">
            {{ t('pricing.custom.description') }}
          </p>
          <a
            :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.pricingCustom'))}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 gap-2"
          >
            {{ t('pricing.custom.cta') }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Thesis Consulting Section -->
      <div class="mt-24 relative">
        <!-- Background elements untuk section thesis -->
        <div class="absolute top-10 left-10 w-24 h-24 border-2 border-cyan-400 rounded-full opacity-20 animate-pulse-slow"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 border-2 border-indigo-400 rotate-45 opacity-20 animate-pulse-slow"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>

        <div class="text-center mb-16 relative z-10">
          <div class="inline-flex items-center px-4 py-2 bg-cyan-900/30 backdrop-blur-sm border border-cyan-700/50 rounded-full mb-4">
            <span class="text-cyan-300 font-semibold text-sm">{{ t('pricing.thesis.badge') }}</span>
          </div>
          <h2 class="font-sans text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-6">
            {{ t('pricing.thesis.title') }}
          </h2>
          <p class="text-xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed mb-4">
            {{ t('pricing.thesis.subtitle') }}
          </p>
          <p class="text-sm text-cyan-200/60 italic">
            {{ t('pricing.thesis.note') }}
          </p>
        </div>

        <!-- Thesis Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
          <!-- System Package -->
          <div class="group bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transform hover:-translate-y-2 relative flex flex-col">
            <div class="p-6 pt-8 flex flex-col flex-grow">
              <h3 class="text-xl font-bold text-white mb-2">{{ t('pricing.thesis.packages.system.name') }}</h3>
              <p class="text-gray-100/70 mb-6 text-sm">{{ t('pricing.thesis.packages.system.description') }}</p>

              <!-- Price -->
              <div class="mb-6">
                <div class="flex items-baseline">
                  <span class="text-sm text-gray-200/80">Rp</span>
                  <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">850.000</span>
                </div>
                <p class="text-gray-200/70 text-sm mt-1">{{ t('pricing.thesis.packages.system.period') }}</p>
              </div>

              <!-- Features -->
              <ul class="space-y-2 mb-6 flex-grow">
                <li v-for="(feature, index) in systemFeatures" :key="index" class="flex items-start text-sm">
                  <svg class="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-100/80">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <a
                :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.thesisSystem'))}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full bg-gray-700/50 hover:bg-cyan-900/50 text-cyan-300 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border border-cyan-800/50 hover:border-cyan-600/50 text-center block mt-auto text-sm"
              >
                {{ t('pricing.thesis.packages.system.cta') }}
              </a>
            </div>
          </div>

          <!-- Writing Package -->
          <div class="group bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transform hover:-translate-y-2 relative flex flex-col">
            <div class="p-6 pt-8 flex flex-col flex-grow">
              <h3 class="text-xl font-bold text-white mb-2">{{ t('pricing.thesis.packages.writing.name') }}</h3>
              <p class="text-gray-100/70 mb-6 text-sm">{{ t('pricing.thesis.packages.writing.description') }}</p>

              <!-- Price -->
              <div class="mb-6">
                <div class="flex items-baseline">
                  <span class="text-sm text-gray-200/80">Rp</span>
                  <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">1.000.000</span>
                </div>
                <p class="text-gray-200/70 text-sm mt-1">{{ t('pricing.thesis.packages.writing.period') }}</p>
              </div>

              <!-- Features -->
              <ul class="space-y-2 mb-6 flex-grow">
                <li v-for="(feature, index) in writingFeatures" :key="index" class="flex items-start text-sm">
                  <svg class="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-100/80">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <a
                :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.thesisWriting'))}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full bg-gray-700/50 hover:bg-cyan-900/50 text-cyan-300 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border border-cyan-800/50 hover:border-cyan-600/50 text-center block mt-auto text-sm"
              >
                {{ t('pricing.thesis.packages.writing.cta') }}
              </a>
            </div>
          </div>

          <!-- Bundle Package -->
          <div class="group bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden border-2 border-cyan-500/60 transform hover:-translate-y-2 relative scale-105 flex flex-col">
            <!-- Recommended Badge -->
            <div class="absolute top-4 right-4 z-10">
              <div class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {{ t('pricing.recommended') }}
              </div>
            </div>

            <div class="p-6 pt-10 flex flex-col flex-grow">
              <h3 class="text-xl font-bold text-white mb-2">{{ t('pricing.thesis.packages.bundle.name') }}</h3>
              <p class="text-cyan-100/70 mb-6 text-sm">{{ t('pricing.thesis.packages.bundle.description') }}</p>

              <!-- Price -->
              <div class="mb-6">
                <div class="flex items-baseline">
                  <span class="text-sm text-cyan-200/80">Rp</span>
                  <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">1.500.000</span>
                </div>
                <p class="text-cyan-200/70 text-sm mt-1">{{ t('pricing.thesis.packages.bundle.period') }}</p>
              </div>

              <!-- Features -->
              <ul class="space-y-2 mb-6 flex-grow">
                <li v-for="(feature, index) in bundleFeatures" :key="index" class="flex items-start text-sm">
                  <svg class="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-cyan-100/80">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <a
                :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.thesisBundle'))}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 text-center block mt-auto text-sm"
              >
                {{ t('pricing.thesis.packages.bundle.cta') }}
              </a>
            </div>
          </div>

          <!-- Custom Consultation -->
          <div class="group bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transform hover:-translate-y-2 relative flex flex-col">
            <div class="p-6 pt-8 flex flex-col flex-grow text-center">
              <h3 class="text-xl font-bold text-white mb-2">{{ t('pricing.thesis.packages.custom_consultation.name') }}</h3>
              <p class="text-gray-100/70 mb-6 text-sm">{{ t('pricing.thesis.packages.custom_consultation.description') }}</p>

              <!-- Price -->
              <div class="mb-6">
                <div class="flex items-center justify-center">
                  <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{{ t('pricing.thesis.packages.custom_consultation.price') }}</span>
                </div>
                <p class="text-gray-200/70 text-sm mt-1">{{ t('pricing.thesis.packages.custom_consultation.price_desc') }}</p>
              </div>

              <!-- Features placeholder -->
              <div class="flex-grow flex items-center justify-center mb-6">
                <div class="text-center">
                  <svg class="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-cyan-300/60 text-xs">{{ t('pricing.thesis.packages.custom_consultation.consultation_desc') }}</p>
                </div>
              </div>

              <!-- CTA Button -->
              <a
                :href="`https://wa.me/6281234567890?text=${encodeURIComponent(t('whatsapp.messages.thesisCustom'))}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full bg-gray-700/50 hover:bg-cyan-900/50 text-cyan-300 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 border border-cyan-800/50 hover:border-cyan-600/50 text-center block mt-auto text-sm"
              >
                {{ t('pricing.thesis.packages.custom_consultation.cta') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Get translated features arrays with computed - using proper array access
const basicFeatures = computed(() => [
  t('pricing.basic.features.0'),
  t('pricing.basic.features.1'),
  t('pricing.basic.features.2'),
  t('pricing.basic.features.3'),
  t('pricing.basic.features.4'),
  t('pricing.basic.features.5')
])

const professionalFeatures = computed(() => [
  t('pricing.professional.features.0'),
  t('pricing.professional.features.1'),
  t('pricing.professional.features.2'),
  t('pricing.professional.features.3'),
  t('pricing.professional.features.4'),
  t('pricing.professional.features.5'),
])

const enterpriseFeatures = computed(() => [
  t('pricing.enterprise.features.0'),
  t('pricing.enterprise.features.1'),
  t('pricing.enterprise.features.2'),
  t('pricing.enterprise.features.3'),
  t('pricing.enterprise.features.4'),
  t('pricing.enterprise.features.5'),
  t('pricing.enterprise.features.6'),
  t('pricing.enterprise.features.7'),
  t('pricing.enterprise.features.8'),
  t('pricing.enterprise.features.9'),
  t('pricing.enterprise.features.10'),
])

const systemFeatures = computed(() => [
  t('pricing.thesis.packages.system.features.0'),
  t('pricing.thesis.packages.system.features.1'),
  t('pricing.thesis.packages.system.features.2'),
  t('pricing.thesis.packages.system.features.3'),
  t('pricing.thesis.packages.system.features.4'),
  t('pricing.thesis.packages.system.features.5'),
])

const writingFeatures = computed(() => [
  t('pricing.thesis.packages.writing.features.0'),
  t('pricing.thesis.packages.writing.features.1'),
  t('pricing.thesis.packages.writing.features.2'),
  t('pricing.thesis.packages.writing.features.3'),
  t('pricing.thesis.packages.writing.features.4'),
  t('pricing.thesis.packages.writing.features.5'),
])

const bundleFeatures = computed(() => [
  t('pricing.thesis.packages.bundle.features.0'),
  t('pricing.thesis.packages.bundle.features.1'),
  t('pricing.thesis.packages.bundle.features.2'),
  t('pricing.thesis.packages.bundle.features.3'),
  t('pricing.thesis.packages.bundle.features.4'),
  t('pricing.thesis.packages.bundle.features.5'),
])
</script>

<style scoped>
/* Custom animations for pricing cards */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Grid pattern background */
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Enhanced hover effects */
.group:hover .absolute {
  animation-duration: 2s;
}

/* Responsive scaling for recommended card */
@media (max-width: 768px) {
  .scale-105 {
    transform: scale(1);
  }
}
</style>