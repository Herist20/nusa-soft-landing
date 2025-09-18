<template>
  <section id="process" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-primary font-semibold tracking-wide uppercase text-sm">How We Work</span>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Our 6-Step Development Process
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          A proven methodology that ensures your project is delivered on time, within budget, and exceeds expectations.
          Every step is designed to maximize value and minimize risk.
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
                <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 relative transform transition-all duration-500 hover:-translate-y-2 group">
                  <div class="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {{ index + 1 }}
                  </div>

                  <!-- Trust indicator -->
                  <div class="absolute top-4 left-4 flex items-center space-x-1 opacity-75 group-hover:opacity-100 transition-opacity">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-xs text-green-600 font-medium">Proven Process</span>
                  </div>

                  <div class="mt-6">
                    <h3 class="font-display text-2xl font-bold mb-4 text-gray-900">{{ step.title }}</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">{{ step.description }}</p>
                    <ul class="space-y-3">
                      <li v-for="item in step.items" :key="item"
                          class="flex items-center group-hover:translate-x-1 transition-transform duration-200"
                          :class="index % 2 === 0 ? 'md:justify-end' : ''">
                        <svg class="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-gray-700 font-medium">{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Center icon -->
            <div class="relative z-10">
              <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <component :is="step.icon" class="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div class="flex-1"></div>
          </div>
        </div>
      </div>
      
      <!-- Trust Building Section -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="text-center p-6 bg-gray-50 rounded-xl">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-lg mb-2">100% Transparency</h4>
          <p class="text-gray-600 text-sm">Regular updates and clear communication throughout the entire process</p>
        </div>
        <div class="text-center p-6 bg-gray-50 rounded-xl">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-lg mb-2">On-Time Delivery</h4>
          <p class="text-gray-600 text-sm">We meet deadlines and deliver projects exactly when promised</p>
        </div>
        <div class="text-center p-6 bg-gray-50 rounded-xl">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h4 class="font-semibold text-lg mb-2">Client Satisfaction</h4>
          <p class="text-gray-600 text-sm">95% of our clients recommend us and return for additional projects</p>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-16 text-center bg-blue-600 rounded-2xl p-12 text-white">
        <h3 class="font-display text-3xl font-bold mb-4">
          Ready to Experience Our Process?
        </h3>
        <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join 100+ satisfied clients who trust our proven development process.
          Let's discuss your project and show you how we can bring your vision to life.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="$emit('openContact')" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
            Start Your Project
          </button>
          <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
            View Case Studies
          </button>
        </div>
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