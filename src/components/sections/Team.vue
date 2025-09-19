<template>
  <section id="team" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-primary font-semibold tracking-wide uppercase text-sm">{{ t('team.title') }}</span>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          {{ t('team.title') }}
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          {{ t('team.subtitle') }}
        </p>
      </div>

      <!-- Company Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
        <div v-for="stat in companyStats" :key="stat.label"
             class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div class="text-center">
            <component :is="stat.icon" class="w-10 h-10 mx-auto mb-3 text-primary" />
            <div class="text-3xl font-bold text-gray-900 mb-1">{{ stat.value }}</div>
            <p class="text-sm text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Team Introduction -->
      <div class="text-center mb-12 max-w-4xl mx-auto">
        <p class="text-lg text-gray-700 leading-relaxed">
          {{ t('about.description') }}
        </p>
      </div>

      <!-- Team Members Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div v-for="(member, index) in teamMembers" :key="member.name"
             class="group relative"
             :class="{ 'animate-fadeInUp': isVisible }"
             :style="{ animationDelay: `${index * 100}ms` }">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <!-- Member Photo -->
            <div class="relative h-64 bg-gray-100 overflow-hidden">
              <img v-if="member.image"
                   :src="member.image"
                   :alt="member.name"
                   loading="lazy"
                   class="w-full h-full object-cover">
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <!-- Social Links Overlay -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <a v-if="member.linkedin"
                   :href="member.linkedin"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a v-if="member.github"
                   :href="member.github"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Member Info -->
            <div class="p-6">
              <h3 class="font-semibold text-xl text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-primary font-medium mb-3">{{ member.role }}</p>

              <!-- Expertise Areas -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="skill in member.expertise" :key="skill"
                      class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {{ skill }}
                </span>
              </div>

              <!-- Experience -->
              <div class="flex items-center text-gray-600 text-sm">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ member.experience }} {{ t('hero.stats.experience') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <div class="bg-blue-600 rounded-2xl p-12 text-white">
          <h3 class="font-display text-3xl font-bold mb-4">
            {{ t('team.cta.title') || 'Join Our Growing Team' }}
          </h3>
          <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {{ t('team.cta.description') || "We're always looking for talented individuals who share our passion for technology and innovation." }}
          </p>
          <a href="mailto:careers@nusasoftware.com"
             class="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
            {{ t('team.cta.button') || 'View Open Positions' }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// Icon Components
const YearsIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    )
  }
}

const ProjectsIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' })
    )
  }
}

const ClientsIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    )
  }
}

const TeamIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })
    )
  }
}

const TechIcon = {
  render() {
    return h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
    )
  }
}

const companyStats = [
  { icon: YearsIcon, value: t('about.stats.experience'), label: t('hero.stats.experience') },
  { icon: ProjectsIcon, value: t('about.stats.projects'), label: t('hero.stats.projects') },
  { icon: ClientsIcon, value: t('about.stats.clients'), label: t('hero.stats.clients') },
  { icon: TeamIcon, value: '8', label: t('hero.stats.team') },
  { icon: TechIcon, value: '25+', label: 'Technologies' }
]

const teamMembers = [
  {
    name: 'Ahmad Rizki',
    role: 'CEO & Founder',
    expertise: ['Business Strategy', 'Product Vision', 'Leadership'],
    experience: 10,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Siti Nurhaliza',
    role: 'CTO',
    expertise: ['System Architecture', 'Cloud Solutions', 'DevOps'],
    experience: 8,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Budi Santoso',
    role: 'Lead Full-Stack Developer',
    expertise: ['React', 'Node.js', 'PostgreSQL'],
    experience: 6,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Rina Wijaya',
    role: 'Senior UI/UX Designer',
    expertise: ['User Research', 'Prototyping', 'Design Systems'],
    experience: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Dedi Kurniawan',
    role: 'Mobile Developer',
    expertise: ['React Native', 'Flutter', 'iOS/Android'],
    experience: 4,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Maya Putri',
    role: 'Frontend Developer',
    expertise: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    experience: 3,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Agus Setiawan',
    role: 'Backend Developer',
    expertise: ['Python', 'Django', 'AWS'],
    experience: 4,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Linda Susanti',
    role: 'QA Engineer',
    expertise: ['Test Automation', 'Selenium', 'Performance Testing'],
    experience: 3,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    linkedin: '#',
    github: '#'
  }
]
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>