<template>
  <section id="process" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Development Process
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          A streamlined approach to deliver exceptional results
        </p>
      </div>
      
      <div class="relative">
        <!-- Timeline line for desktop -->
        <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
        
        <div class="space-y-12">
          <div v-for="(step, index) in processSteps" :key="step.title"
               :class="[
                 'flex flex-col md:flex-row items-center gap-8',
                 index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
               ]">
            <div class="flex-1 text-center md:text-left" :class="index % 2 === 0 ? 'md:text-right' : ''">
              <div class="inline-block">
                <div class="bg-white rounded-xl shadow-lg p-6 relative">
                  <div class="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                  <h3 class="font-display text-xl font-semibold mb-3">{{ step.title }}</h3>
                  <p class="text-gray-600 mb-4">{{ step.description }}</p>
                  <ul class="space-y-2">
                    <li v-for="item in step.items" :key="item" class="flex items-center" :class="index % 2 === 0 ? 'md:justify-end' : ''">
                      <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="text-sm text-gray-600">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Center icon -->
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <component :is="step.icon" class="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div class="flex-1"></div>
          </div>
        </div>
      </div>
      
      <!-- CTA Section -->
      <div class="mt-16 text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
        <h3 class="font-display text-2xl font-bold mb-4">
          Ready to Start Your Project?
        </h3>
        <p class="mb-6 max-w-2xl mx-auto">
          Let's discuss your ideas and turn them into reality. Our team is ready to help you achieve your goals.
        </p>
        <button @click="$emit('openContact')" class="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
          Get Started Today
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

defineEmits(['openContact'])

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
    description: 'We start by understanding your business goals and requirements',
    items: [
      'Requirements gathering',
      'Market research',
      'Project roadmap',
      'Budget planning'
    ]
  },
  {
    icon: DesignIcon,
    title: 'Design & Prototyping',
    description: 'Creating intuitive and beautiful user interfaces',
    items: [
      'Wireframe creation',
      'UI/UX design',
      'Interactive prototypes',
      'Design review'
    ]
  },
  {
    icon: DevelopmentIcon,
    title: 'Development',
    description: 'Building your solution with clean, maintainable code',
    items: [
      'Frontend development',
      'Backend development',
      'API integration',
      'Database setup'
    ]
  },
  {
    icon: TestingIcon,
    title: 'Testing & QA',
    description: 'Ensuring everything works perfectly before launch',
    items: [
      'Unit testing',
      'Integration testing',
      'Performance testing',
      'Bug fixing'
    ]
  },
  {
    icon: LaunchIcon,
    title: 'Launch & Deployment',
    description: 'Going live with your new digital solution',
    items: [
      'Server setup',
      'Deployment',
      'DNS configuration',
      'SSL certificate'
    ]
  },
  {
    icon: SupportIcon,
    title: 'Support & Maintenance',
    description: 'Ongoing support to keep your application running smoothly',
    items: [
      '24/7 monitoring',
      'Regular updates',
      'Performance optimization',
      'Technical support'
    ]
  }
]
</script>