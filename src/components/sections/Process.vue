<template>
  <section id="process" class="py-20 relative overflow-hidden">
    <!-- Background futuristik -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 z-0"></div>
    
    <!-- Grid pattern futuristik -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
    
    <!-- Elemen geometris dengan animasi -->
    <div class="absolute top-1/4 left-10 w-32 h-32 border-2 border-cyan-400 rounded-full opacity-20 animate-pulse-slow"></div>
    <div class="absolute bottom-1/4 right-10 w-40 h-40 border-2 border-indigo-400 rotate-45 opacity-20 animate-pulse-slow"></div>
    
    <!-- Glow effect dengan animasi -->
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse-glow"></div>
    
    <!-- Partikel animasi -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 20" :key="i" 
           class="absolute rounded-full bg-cyan-400 opacity-20"
           :style="{
             width: `${Math.random() * 10 + 2}px`,
             height: `${Math.random() * 10 + 2}px`,
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             animation: `float ${Math.random() * 20 + 10}s linear infinite`,
             animationDelay: `${Math.random() * 5}s`
           }">
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-16">
        <span class="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 backdrop-blur-sm text-sm font-semibold text-cyan-300 border border-cyan-700/50 mb-4">
          {{ t('navigation.process') }}
        </span>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 mt-2 mb-4">
          {{ t('process.title') }}
        </h2>
        <p class="text-xl text-cyan-100/80 max-w-3xl mx-auto">
          {{ t('process.subtitle') }}
        </p>
      </div>
      
      <div class="relative">
        <!-- Timeline line for desktop -->
        <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-cyan-500/30"></div>
        
        <div class="space-y-12">
          <div v-for="(step, index) in processSteps" :key="step.title"
               :class="[
                 'flex flex-col md:flex-row items-center gap-8',
                 index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
               ]">
            <div class="flex-1 text-center md:text-left" :class="index % 2 === 0 ? 'md:text-right' : ''">
              <div class="inline-block">
                <div
                  class="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-cyan-500/20 p-8 relative transform transition-all duration-500 hover:-translate-y-2 group border border-gray-700 hover:border-cyan-500/50"
                  :class="{ 'process-card-id': locale === 'id', 'process-card-en': locale === 'en' }"
                >
                  <div class="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {{ index + 1 }}
                  </div>

                  <!-- Trust indicator -->
                  <div class="absolute top-4 left-4 flex items-center space-x-1 opacity-75 group-hover:opacity-100 transition-opacity">
                    <svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-xs text-cyan-300 font-medium">Proven Process</span>
                  </div>

                  <div class="mt-6">
                    <h3 class="font-display text-2xl font-bold mb-4 text-cyan-300">{{ t(`process.steps[${index}].title`) }}</h3>
                    <p class="text-cyan-100/80 mb-6 leading-relaxed">{{ t(`process.steps[${index}].description`) }}</p>
                    <ul class="space-y-3 process-deliverables">
                      <li v-for="(item, idx) in getProcessDeliverables(index)" :key="idx"
                          class="flex items-center group-hover:translate-x-1 transition-transform duration-200 process-item"
                          :class="index % 2 === 0 ? 'md:justify-end' : ''">
                        <svg class="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span
                          class="text-cyan-100/80 font-medium"
                          :class="{ 'deliverable-text-id': locale === 'id', 'deliverable-text-en': locale === 'en' }"
                        >{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Center icon -->
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-300 hover:scale-110">
                <component :is="step.icon" class="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div class="flex-1"></div>
          </div>
        </div>
      </div>
      
      <!-- Trust Building Section -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="text-center p-6 bg-cyan-900/30 backdrop-blur-sm rounded-xl border border-cyan-800/50 transform transition-all duration-300 hover:scale-105">
          <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-lg mb-2 text-cyan-300">100% Transparency</h4>
          <p class="text-cyan-100/70 text-sm">Regular updates and clear communication throughout the entire process</p>
        </div>
        <div class="text-center p-6 bg-cyan-900/30 backdrop-blur-sm rounded-xl border border-cyan-800/50 transform transition-all duration-300 hover:scale-105">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-lg mb-2 text-cyan-300">On-Time Delivery</h4>
          <p class="text-cyan-100/70 text-sm">We meet deadlines and deliver projects exactly when promised</p>
        </div>
        <div class="text-center p-6 bg-cyan-900/30 backdrop-blur-sm rounded-xl border border-cyan-800/50 transform transition-all duration-300 hover:scale-105">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-lg mb-2 text-cyan-300">Client Satisfaction</h4>
          <p class="text-cyan-100/70 text-sm">95% of our clients recommend us and return for additional projects</p>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-16 text-center bg-gradient-to-r from-cyan-900/30 to-blue-900/30 backdrop-blur-md rounded-2xl p-12 border border-cyan-800/50 shadow-lg">
        <h3 class="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-4">
          Ready to Experience Our Process?
        </h3>
        <p class="text-lg text-cyan-100/80 mb-8 max-w-2xl mx-auto">
          Join 100+ satisfied clients who trust our proven development process.
          Let's discuss your project and show you how we can bring your vision to life.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="$emit('openContact')" class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            {{ t('navigation.startProject') }}
          </button>
          <button class="border-2 border-cyan-400/50 text-cyan-300 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-900/30 transition-all duration-300 hover:border-cyan-300">
            {{ t('portfolio.viewProject') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
defineEmits(['openContact'])

// Debug: let's see what locale value we're getting
console.log('Process locale:', locale.value)

// Helper function to get process deliverables
const getProcessDeliverables = (stepIndex) => {
  try {
    // Get the raw process object and access the nested property
    const processData = t('process')
    console.log('Raw process data:', processData)

    if (processData && processData.steps && processData.steps[stepIndex] && processData.steps[stepIndex].deliverables) {
      const deliverables = processData.steps[stepIndex].deliverables
      console.log(`Deliverables for step ${stepIndex}:`, deliverables)
      return Array.isArray(deliverables) ? deliverables : []
    }

    // Fallback: try direct translation
    const deliverables = t(`process.steps.${stepIndex}.deliverables`)
    console.log(`Fallback deliverables for step ${stepIndex}:`, deliverables, typeof deliverables)

    if (Array.isArray(deliverables)) {
      return deliverables
    }

    // If translation fails, it returns the key string
    console.log(`Translation failed for step ${stepIndex}, returning empty array`)
    return []
  } catch (error) {
    console.error(`Error getting deliverables for step ${stepIndex}:`, error)
    return []
  }
}


const DiscoveryIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
    )
  }
}

const DesignIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' })
    )
  }
}

const DevelopmentIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
    )
  }
}

const TestingIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    )
  }
}

const LaunchIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' })
    )
  }
}

const SupportIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' })
    )
  }
}

const processSteps = [
  {
    icon: DiscoveryIcon,
    title: 'Discovery & Planning',
    description: 'We start by understanding your business goals, requirements, and market position to create a solid foundation for success.',
    items: [
      'Requirements analysis',
      'Market research',
      'Project roadmap',
      'Technology stack selection'
    ]
  },
  {
    icon: DesignIcon,
    title: 'Design & Prototyping',
    description: 'Creating intuitive and beautiful user experiences through careful design and interactive prototyping.',
    items: [
      'UI/UX design',
      'Wireframing',
      'Interactive prototypes',
      'User journey mapping'
    ]
  },
  {
    icon: DevelopmentIcon,
    title: 'Development',
    description: 'Building your solution with clean, scalable code using agile methodology and regular progress updates.',
    items: [
      'Agile development',
      'Regular updates',
      'Quality assurance',
      'Code review process'
    ]
  },
  {
    icon: TestingIcon,
    title: 'Testing & Optimization',
    description: 'Comprehensive testing to ensure your application performs flawlessly across all platforms and scenarios.',
    items: [
      'Cross-browser testing',
      'Performance optimization',
      'Security audit',
      'Load testing'
    ]
  },
  {
    icon: LaunchIcon,
    title: 'Deployment & Launch',
    description: 'Seamless deployment to production with complete go-live support and comprehensive documentation.',
    items: [
      'Production deployment',
      'Go-live support',
      'Training & documentation',
      'Performance monitoring'
    ]
  },
  {
    icon: SupportIcon,
    title: 'Maintenance & Support',
    description: 'Ongoing support and maintenance to ensure your application continues to perform optimally and stays secure.',
    items: [
      'Ongoing support',
      'Regular maintenance',
      'Security updates',
      'Feature enhancements'
    ]
  }
]
</script>

<style scoped>
/* Grid pattern untuk background futuristik */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(100, 200, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 200, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Animasi pulse yang lebih lambat */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animasi glow untuk efek cahaya */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
}

.animate-pulse-glow {
  animation: pulse-glow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animasi partikel melayang */
@keyframes float {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 0.2; }
  90% { opacity: 0.2; }
  100% { transform: translate(var(--tx, 100px), var(--ty, -100px)); opacity: 0; }
}
</style>