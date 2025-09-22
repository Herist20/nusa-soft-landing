<template>
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-primary font-semibold tracking-wide uppercase text-sm">{{ t('navigation.about') }}</span>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          {{ t('about.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ t('about.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h3 class="font-sans text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            {{ t('about.story.title') || 'Cerita Kami' }}
          </h3>
          <p class="text-lg text-gray-600 mb-6">
            {{ t('about.description') }}
          </p>
          <p class="text-gray-600 mb-8">
            {{ t('about.story.description') || 'Didirikan dengan visi untuk menjadi mitra digital terpercaya bagi bisnis Indonesia, kami terus berinovasi menghadirkan solusi teknologi terdepan yang tidak hanya memenuhi kebutuhan saat ini, tetapi juga mempersiapkan bisnis Anda untuk masa depan.' }}
          </p>

          <!-- Company Values -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-blue-50 p-6 rounded-xl">
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 class="font-semibold text-lg mb-2">{{ t('about.values.innovation.title') || 'Inovasi' }}</h4>
              <p class="text-gray-600 text-sm">
                {{ t('about.values.innovation.description') || 'Selalu menggunakan teknologi terdepan untuk memberikan solusi terbaik' }}
              </p>
            </div>
            <div class="bg-green-50 p-6 rounded-xl">
              <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 class="font-semibold text-lg mb-2">{{ t('about.values.quality.title') || 'Kualitas' }}</h4>
              <p class="text-gray-600 text-sm">
                {{ t('about.values.quality.description') || 'Komitmen pada standar internasional dan pengalaman pengguna terbaik' }}
              </p>
            </div>
          </div>

          <!-- Key Features -->
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700 font-medium">{{ t('about.features.experience') || 'Pengalaman 5+ Tahun' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700 font-medium">{{ t('about.features.clients') || '100+ Klien Puas' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700 font-medium">{{ t('about.features.support') || 'Support 24/7' }}</span>
            </div>
          </div>
        </div>
        <!-- Enhanced Statistics Grid -->
        <div class="relative">
          <!-- Background decoration -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl transform rotate-3"></div>
          <div class="relative bg-white rounded-3xl p-8 shadow-xl">
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.experience') || '5+' }}</div>
                <p class="text-gray-600 text-sm uppercase tracking-wide font-medium">{{ t('hero.stats.experience') || 'Tahun Pengalaman' }}</p>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.clients') || '100+' }}</div>
                <p class="text-gray-600 text-sm uppercase tracking-wide font-medium">{{ t('hero.stats.clients') || 'Klien Puas' }}</p>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.projects') || '200+' }}</div>
                <p class="text-gray-600 text-sm uppercase tracking-wide font-medium">{{ t('hero.stats.projects') || 'Proyek Selesai' }}</p>
              </div>

              <div class="text-center">
                <div class="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('about.stats.satisfaction') || '98%' }}</div>
                <p class="text-gray-600 text-sm uppercase tracking-wide font-medium">{{ t('about.stats.satisfactionLabel') || 'Tingkat Kepuasan' }}</p>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="mt-8 pt-8 border-t border-gray-200 text-center">
              <p class="text-gray-600 mb-4">{{ t('about.cta.text') || 'Siap menjadi bagian dari kesuksesan ini?' }}</p>
              <a
                href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20to%20discuss%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                {{ t('about.cta.button') || 'Konsultasi Gratis' }}
              </a>
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
</script>