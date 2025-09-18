<template>
  <section id="services" class="py-16 lg:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg mb-4">
          <span class="text-secondary font-semibold text-sm">Our Services</span>
        </div>
        <h2 class="font-sans text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          What We Do Best
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We help businesses build digital products that users love and that scale with your growth.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(service, index) in services" :key="service.title"
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 group cursor-pointer border border-gray-200 hover:border-blue-200 flex flex-col h-full"
             :style="`opacity: 0; animation: fadeInStagger 0.6s ease-out forwards; animation-delay: ${index * 0.1}s;`">

          <!-- Service Icon -->
          <div class="mb-4">
            <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:bg-blue-100">
              <component :is="service.icon" class="w-6 h-6 text-secondary" />
            </div>
          </div>

          <!-- Service Content -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed text-sm">
              {{ service.description }}
            </p>
          </div>

          <!-- Service Features -->
          <div class="mb-6">
            <div class="space-y-2">
              <div v-for="feature in service.features.slice(0, 3)" :key="feature"
                   class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                <span class="text-gray-500 text-sm">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Service CTA -->
          <div class="mt-auto">
            <a
              :href="service.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-secondary hover:text-blue-600 font-medium text-sm transition-colors duration-200"
            >
              Learn more
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
            Ready to Get Started?
          </h3>
          <p class="text-gray-600 mb-6 max-w-xl mx-auto">
            Let's discuss your project and see how we can help bring your ideas to life.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20project%20requirements"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            Start a Project
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
import { h } from 'vue'

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

const services = [
  {
    icon: WebIcon,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Web Development',
    shortName: 'Web Project',
    description: 'Create powerful, responsive websites that engage users and drive business growth. Our custom web solutions are built with modern technologies and best practices.',
    features: [
      'Custom Website Development',
      'E-commerce Solutions',
      'CMS Development',
      'Progressive Web Apps (PWA)'
    ],
    whatsappUrl: `https://wa.me/6281234567890?text=${encodeURIComponent("Hi! I'm interested in Web Development services. I'd like to discuss my website project requirements including features, timeline, and budget.")}`
  },
  {
    icon: MobileIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Mobile App Development',
    shortName: 'Mobile App',
    description: 'Build stunning native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.',
    features: [
      'Native iOS/Android Apps',
      'Cross-platform (React Native/Flutter)',
      'App Store Optimization',
      'Maintenance & Support'
    ],
    whatsappUrl: `https://wa.me/6281234567890?text=${encodeURIComponent("Hi! I need a mobile app developed. I'd like to discuss whether I need iOS, Android, or both platforms, along with the app features and timeline.")}`
  },
  {
    icon: UIIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'UI/UX Design',
    shortName: 'Design Project',
    description: 'Design intuitive and visually appealing interfaces that convert visitors into customers through strategic user experience research and design.',
    features: [
      'User Interface Design',
      'User Experience Research',
      'Prototyping & Wireframing',
      'Brand Identity Design'
    ],
    whatsappUrl: `https://wa.me/6281234567890?text=${encodeURIComponent("Hi! I'm interested in UI/UX Design services. I need help with designing user-friendly interfaces and improving user experience for my project.")}`
  },
  {
    icon: ApiIcon,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Digital Solutions',
    shortName: 'Digital Project',
    description: 'Comprehensive digital transformation services including API development, cloud migration, and technical consulting to optimize your business operations.',
    features: [
      'API Development & Integration',
      'Cloud Migration',
      'Performance Optimization',
      'Technical Consulting'
    ],
    whatsappUrl: `https://wa.me/6281234567890?text=${encodeURIComponent("Hi! I'm looking for Digital Solutions and technical consulting. I'd like to discuss API development, cloud migration, or performance optimization for my business.")}`
  }
]
</script>