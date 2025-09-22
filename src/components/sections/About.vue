<template>
  <section id="about" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="font-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {{ t('about.title') }}
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            {{ t('about.subtitle') }}
          </p>
          <p class="text-gray-600 mb-6">
            {{ t('about.description') }}
          </p>
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 class="font-semibold text-xl mb-2">{{ t('about.mission') }}</h3>
              <p class="text-gray-600 text-sm">
                {{ t('about.mission') }}
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-xl mb-2">{{ t('about.vision') }}</h3>
              <p class="text-gray-600 text-sm">
                {{ t('about.vision') }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{{ t('hero.stats.team') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{{ t('about.values.innovation.title') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{{ t('services.list.maintenance.shortTitle') }}</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.experience') }}</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">{{ t('hero.stats.experience') }}</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.clients') }}</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">{{ t('hero.stats.clients') }}</p>
            </div>
          </div>
          <div class="space-y-4 mt-8">
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.projects') }}</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">{{ t('hero.stats.projects') }}</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.satisfaction') }}</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">{{ t('hero.stats.team') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const team = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
  },
  {
    name: 'Sarah Williams',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
  }
]
</script>