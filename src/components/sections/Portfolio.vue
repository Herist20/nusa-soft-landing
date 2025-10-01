<template>
  <section id="portfolio" class="py-16 lg:py-24 relative overflow-hidden">
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
          <span class="text-cyan-300 font-semibold text-sm">{{ t('navigation.portfolio') }}</span>
        </div>
        <h2 class="font-sans text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-6">
          {{ t('portfolio.title') }}
        </h2>
        <p class="text-xl text-cyan-100/80 max-w-2xl mx-auto leading-relaxed">
          {{ t('portfolio.subtitle') }}
        </p>
      </div>

      <!-- Filter Categories -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="setActiveCategory(category)"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-all duration-300 border transform hover:-translate-y-1',
            activeCategory === category
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/20'
              : 'bg-gray-800/50 backdrop-blur-sm text-cyan-100 border-cyan-800/50 hover:bg-gray-700/50 hover:border-cyan-600/50'
          ]"
        >
          {{ getCategoryName(category) }}
        </button>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <div
          v-for="(project, index) in displayedProjects"
          :key="project.id"
          class="group bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden border border-gray-700 hover:border-cyan-500/50 cursor-pointer transform hover:-translate-y-2"
          :style="`opacity: 0; animation: fadeInStagger 0.6s ease-out forwards; animation-delay: ${index * 0.1}s;`"
          @click="openCaseStudy(project)"
        >
          <!-- Project Image -->
          <div class="relative h-48 overflow-hidden rounded-t-xl">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
            />

            <!-- Category Badge -->
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 bg-cyan-900/70 backdrop-blur-sm text-cyan-300 text-xs font-medium rounded-lg shadow-sm">
                {{ project.category }}
              </span>
            </div>

          </div>

          <!-- Project Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
              {{ project.title }}
            </h3>
            <p class="text-cyan-100/70 mb-4 text-sm overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
              {{ project.description }}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies.slice(0, 3)"
                :key="tech"
                class="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-sm font-medium rounded-full"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.technologies.length > 3"
                class="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-sm font-medium rounded-full"
              >
                +{{ project.technologies.length - 3 }}
              </span>
            </div>

            <!-- Case Study Link -->
            <button
              class="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-all duration-300 group-hover:translate-x-1"
              @click.stop="openCaseStudy(project)"
            >
              <span>{{ t('portfolio.viewProject') }}</span>
              <svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreProjects" class="text-center mt-12">
        <button
          @click="loadMore"
          class="bg-gray-800/50 backdrop-blur-sm border border-cyan-800/50 text-cyan-300 px-8 py-4 rounded-lg font-medium hover:bg-gray-700/50 hover:border-cyan-600/50 transition-all duration-300 flex items-center space-x-2 mx-auto transform hover:-translate-y-1"
        >
          <span>{{ t('common.viewAll') }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Case Study Modal -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeCaseStudy"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>

        <div
          class="inline-block align-bottom bg-gray-800/90 backdrop-blur-lg rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-700"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="relative">
            <img :src="selectedProject.image" :alt="selectedProject.title" loading="lazy" class="w-full h-64 lg:h-80 object-cover" />
            <button
              @click="closeCaseStudy"
              class="absolute top-4 right-4 w-10 h-10 bg-gray-800/70 backdrop-blur-sm rounded-full flex items-center justify-center text-cyan-300 hover:bg-gray-700/70 transition-colors shadow-lg"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="absolute bottom-6 left-6">
              <span class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold inline-block text-white">
                {{ selectedProject.category }}
              </span>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-6 lg:p-8">
            <h3 class="text-2xl font-bold text-cyan-300 mb-6">{{ selectedProject.title }}</h3>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div class="lg:col-span-2">
                <h4 class="font-bold text-xl mb-4 text-cyan-300">{{ t('portfolio.modal.overview') || 'Project Overview' }}</h4>
                <p class="text-cyan-100/80 mb-6 leading-relaxed">{{ selectedProject.fullDescription }}</p>

                <h4 class="font-bold text-xl mb-4 text-cyan-300">{{ t('portfolio.modal.features') || 'Key Features' }}</h4>
                <ul class="space-y-2 mb-6">
                  <li v-for="feature in selectedProject.features" :key="feature" class="flex items-start space-x-3">
                    <div class="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <svg class="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span class="text-cyan-100/80">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-xl mb-4 text-cyan-300">{{ t('portfolio.modal.details') || 'Project Details' }}</h4>
                <div class="space-y-4 mb-6">
                  <div>
                    <span class="text-cyan-100/50 text-sm">{{ t('portfolio.modal.duration') || 'Duration' }}</span>
                    <p class="font-semibold text-white">{{ selectedProject.duration }}</p>
                  </div>
                  <div>
                    <span class="text-cyan-100/50 text-sm">{{ t('portfolio.modal.teamSize') || 'Team Size' }}</span>
                    <p class="font-semibold text-white">{{ selectedProject.teamSize }}</p>
                  </div>
                  <div>
                    <span class="text-cyan-100/50 text-sm">{{ t('portfolio.modal.client') || 'Client' }}</span>
                    <p class="font-semibold text-white">{{ selectedProject.client }}</p>
                  </div>
                </div>

                <h4 class="font-bold text-lg mb-3 text-cyan-300">{{ t('portfolio.modal.technologies') || 'Technologies' }}</h4>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-sm font-medium rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/locales'

const { t } = useI18n()

const activeCategory = ref('All')
const displayedCount = ref(6)
const selectedProject = ref(null)

const categories = ['All', 'Web', 'Mobile']

const getCategoryName = (category) => {
  return category === 'All' ? t('portfolio.categories.all') : category
}

const allProjects = computed(() => {
  const currentLocale = i18n.global.locale.value
  const messages = i18n.global.messages.value
  return messages[currentLocale]?.portfolio?.projects || []
})

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return allProjects.value
  }
  return allProjects.value.filter(project => project.category === activeCategory.value)
})

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, displayedCount.value)
})

const hasMoreProjects = computed(() => {
  return displayedCount.value < filteredProjects.value.length
})

const setActiveCategory = (category) => {
  activeCategory.value = category
  displayedCount.value = 6 // Reset displayed count when changing category
}

const loadMore = () => {
  displayedCount.value += 6
}

const openCaseStudy = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeCaseStudy = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
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

/* Animasi fade in untuk kartu proyek */
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

/* Animasi pulse yang lebih lambat */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>