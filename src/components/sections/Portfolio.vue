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
          @click="openProject(project)"
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

            <!-- Action Buttons -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="flex space-x-2">
                <a
                  v-if="project.liveDemo"
                  :href="project.liveDemo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-8 h-8 bg-cyan-900/70 backdrop-blur-sm rounded-lg flex items-center justify-center text-cyan-300 hover:bg-cyan-800/70 transition-colors duration-300 shadow-sm"
                  title="Live Demo"
                  @click.stop
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-8 h-8 bg-cyan-900/70 backdrop-blur-sm rounded-lg flex items-center justify-center text-cyan-300 hover:bg-cyan-800/70 transition-colors duration-300 shadow-sm"
                  title="GitHub"
                  @click.stop
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
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
            <div class="absolute bottom-6 left-6 text-white">
              <span class="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold mb-2 inline-block">
                {{ selectedProject.category }}
              </span>
              <h3 class="text-3xl font-bold">{{ selectedProject.title }}</h3>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-6 lg:p-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div class="lg:col-span-2">
                <h4 class="font-bold text-xl mb-4 text-cyan-300">Project Overview</h4>
                <p class="text-cyan-100/80 mb-6 leading-relaxed">{{ selectedProject.fullDescription }}</p>

                <h4 class="font-bold text-xl mb-4 text-cyan-300">Key Features</h4>
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
                <h4 class="font-bold text-xl mb-4 text-cyan-300">Project Details</h4>
                <div class="space-y-4 mb-6">
                  <div>
                    <span class="text-cyan-100/50 text-sm">Duration</span>
                    <p class="font-semibold text-white">{{ selectedProject.duration }}</p>
                  </div>
                  <div>
                    <span class="text-cyan-100/50 text-sm">Team Size</span>
                    <p class="font-semibold text-white">{{ selectedProject.teamSize }}</p>
                  </div>
                  <div>
                    <span class="text-cyan-100/50 text-sm">Client</span>
                    <p class="font-semibold text-white">{{ selectedProject.client }}</p>
                  </div>
                </div>

                <h4 class="font-bold text-lg mb-3 text-cyan-300">Technologies</h4>
                <div class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-sm font-medium rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="space-y-3">
                  <a
                    v-if="selectedProject.liveDemo"
                    :href="selectedProject.liveDemo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center space-x-2 transform hover:-translate-y-1"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>{{ t('portfolio.liveDemo') }}</span>
                  </a>
                  <a
                    v-if="selectedProject.github"
                    :href="selectedProject.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full border-2 border-cyan-800/50 text-cyan-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:border-cyan-600/50 hover:shadow-lg hover:shadow-cyan-500/10 flex items-center justify-center space-x-2 transform hover:-translate-y-1"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>{{ t('common.viewAll') }}</span>
                  </a>
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

const { t } = useI18n()

const emit = defineEmits(['openProject'])

const activeCategory = ref('All')
const displayedCount = ref(6)
const selectedProject = ref(null)

const categories = ['all', 'website', 'mobile', 'ecommerce', 'enterprise']

const getCategoryName = (category) => {
  return t(`portfolio.categories.${category}`)
}

const allProjects = [
  {
    id: 1,
    title: 'TechCorp E-Commerce Platform',
    category: 'Web',
    description: 'Modern e-commerce platform with advanced features including real-time inventory, multiple payment gateways, and AI-powered recommendations.',
    fullDescription: 'A comprehensive e-commerce solution built for TechCorp, featuring modern design, seamless user experience, and robust backend infrastructure. The platform handles thousands of daily transactions with 99.9% uptime.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS'],
    liveDemo: 'https://demo-ecommerce.nusasoftware.com',
    github: 'https://github.com/nusasoftware/ecommerce-platform',
    duration: '4 months',
    teamSize: '5 developers',
    client: 'TechCorp Ltd.',
    features: [
      'Real-time inventory management',
      'Multi-vendor marketplace',
      'AI-powered product recommendations',
      'Advanced analytics dashboard',
      'Mobile-responsive design',
      'Multi-language support'
    ]
  },
  {
    id: 2,
    title: 'TaskFlow Project Manager',
    category: 'Web',
    description: 'Collaborative project management solution with real-time updates, team communication, and advanced reporting capabilities.',
    fullDescription: 'TaskFlow revolutionizes team collaboration with intuitive project management tools, real-time messaging, and comprehensive analytics. Built for modern teams who need to stay connected and productive.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Docker'],
    liveDemo: 'https://taskflow-demo.nusasoftware.com',
    github: 'https://github.com/nusasoftware/taskflow',
    duration: '3 months',
    teamSize: '4 developers',
    client: 'StartupXYZ',
    features: [
      'Real-time collaboration',
      'Gantt chart visualization',
      'Team messaging system',
      'File sharing and version control',
      'Advanced reporting',
      'Third-party integrations'
    ]
  },
  {
    id: 3,
    title: 'FitTracker Mobile App',
    category: 'Mobile',
    description: 'Comprehensive health and fitness tracking app with social features, workout plans, and nutrition tracking.',
    fullDescription: 'FitTracker combines fitness tracking, nutrition monitoring, and social engagement in one powerful mobile application. Users can track workouts, monitor progress, and connect with fitness communities.',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Redux', 'Firebase', 'Health APIs', 'Push Notifications'],
    liveDemo: 'https://play.google.com/store/apps/details?id=com.nusasoftware.fittracker',
    github: null,
    duration: '5 months',
    teamSize: '3 developers',
    client: 'FitLife Inc.',
    features: [
      'Workout tracking and planning',
      'Nutrition and calorie monitoring',
      'Social fitness challenges',
      'Wearable device integration',
      'Progress analytics',
      'Personalized recommendations'
    ]
  },
  {
    id: 4,
    title: 'InnovateCorp Brand Identity',
    category: 'Design',
    description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.',
    fullDescription: 'A comprehensive brand identity project that established InnovateCorp as a modern, trustworthy technology company. The design system includes all visual elements needed for consistent brand representation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Principle'],
    liveDemo: 'https://innovatecorp.com',
    github: null,
    duration: '2 months',
    teamSize: '2 designers',
    client: 'InnovateCorp',
    features: [
      'Logo design and variations',
      'Color palette and typography',
      'Brand guidelines document',
      'Marketing collateral design',
      'Website mockups',
      'Social media templates'
    ]
  },
  {
    id: 5,
    title: 'QuickEats Delivery App',
    category: 'Mobile',
    description: 'On-demand food delivery application with real-time tracking, multiple payment options, and restaurant management.',
    fullDescription: 'QuickEats connects hungry customers with local restaurants through an intuitive mobile app. Features include real-time order tracking, integrated payments, and a comprehensive restaurant dashboard.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe', 'Push Notifications'],
    liveDemo: 'https://quickeats-demo.nusasoftware.com',
    github: 'https://github.com/nusasoftware/quickeats',
    duration: '6 months',
    teamSize: '6 developers',
    client: 'QuickEats Ltd.',
    features: [
      'Real-time order tracking',
      'Multi-restaurant marketplace',
      'Delivery route optimization',
      'In-app payments',
      'Rating and review system',
      'Restaurant dashboard'
    ]
  },
  {
    id: 6,
    title: 'EduPlatform Learning System',
    category: 'Web',
    description: 'Comprehensive online education platform with video streaming, interactive assignments, and progress tracking.',
    fullDescription: 'EduPlatform transforms online education with interactive video lessons, real-time collaboration tools, and comprehensive progress tracking. Built to scale for institutions of all sizes.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC', 'AWS S3', 'ElasticSearch'],
    liveDemo: 'https://eduplatform-demo.nusasoftware.com',
    github: null,
    duration: '8 months',
    teamSize: '7 developers',
    client: 'EduTech Institute',
    features: [
      'HD video streaming',
      'Interactive assignments',
      'Real-time messaging',
      'Progress analytics',
      'Certificate generation',
      'Multi-language support'
    ]
  },
  {
    id: 7,
    title: 'RetailPro Dashboard Design',
    category: 'Design',
    description: 'Modern dashboard interface design for retail analytics platform with data visualization and user experience optimization.',
    fullDescription: 'RetailPro needed a complete dashboard redesign to better serve their analytics platform users. The new design focuses on data clarity, user workflow optimization, and modern aesthetics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Figma', 'Adobe XD', 'Principle', 'InVision'],
    liveDemo: 'https://retailpro.nusasoftware.com/dashboard',
    github: null,
    duration: '3 months',
    teamSize: '3 designers',
    client: 'RetailPro Analytics',
    features: [
      'Interactive data visualizations',
      'Responsive dashboard layout',
      'Dark/light mode support',
      'Custom chart components',
      'User onboarding flow',
      'Accessibility compliance'
    ]
  },
  {
    id: 8,
    title: 'HealthTracker Mobile App',
    category: 'Mobile',
    description: 'Personal health monitoring app with symptom tracking, medication reminders, and healthcare provider integration.',
    fullDescription: 'HealthTracker empowers users to take control of their health with comprehensive tracking tools, medication management, and seamless healthcare provider communication.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'HealthKit', 'Google Fit'],
    liveDemo: 'https://apps.apple.com/app/healthtracker',
    github: null,
    duration: '4 months',
    teamSize: '4 developers',
    client: 'HealthCare Solutions',
    features: [
      'Symptom tracking and logging',
      'Medication reminder system',
      'Doctor appointment scheduling',
      'Health data visualization',
      'Emergency contact integration',
      'HIPAA compliant security'
    ]
  },
  {
    id: 9,
    title: 'FinanceFlow Web Application',
    category: 'Web',
    description: 'Personal finance management platform with budget tracking, expense categorization, and financial goal setting.',
    fullDescription: 'FinanceFlow helps users take control of their finances with intuitive budgeting tools, expense tracking, and goal-setting features. Built with security and user privacy as top priorities.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Plaid API', 'Chart.js'],
    liveDemo: 'https://financeflow-demo.nusasoftware.com',
    github: 'https://github.com/nusasoftware/financeflow',
    duration: '5 months',
    teamSize: '5 developers',
    client: 'Personal Finance Inc.',
    features: [
      'Bank account integration',
      'Automated expense categorization',
      'Budget planning and tracking',
      'Financial goal setting',
      'Investment portfolio tracking',
      'Security and encryption'
    ]
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return allProjects
  }
  return allProjects.filter(project => project.category === activeCategory.value)
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

const openProject = (project) => {
  emit('openProject', project)
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