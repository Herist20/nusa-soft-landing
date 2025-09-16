<template>
  <section id="services" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Services
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          We offer comprehensive development solutions tailored to your business needs
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="service in services" :key="service.title" 
             class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 group cursor-pointer transform hover:-translate-y-1 transition-all">
          <div class="w-14 h-14 rounded-lg mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
               :class="service.iconBg">
            <component :is="service.icon" class="w-8 h-8" :class="service.iconColor" />
          </div>
          <h3 class="font-display text-xl font-semibold mb-3">{{ service.title }}</h3>
          <p class="text-gray-600 mb-4">{{ service.description }}</p>
          <ul class="space-y-2">
            <li v-for="feature in service.features" :key="feature" class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">{{ feature }}</span>
            </li>
          </ul>
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
    description: 'Modern, responsive websites built with the latest technologies',
    features: [
      'React, Vue.js, Angular',
      'Progressive Web Apps',
      'SEO Optimization',
      'Performance Optimization'
    ]
  },
  {
    icon: MobileIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    features: [
      'React Native',
      'Flutter Development',
      'iOS & Android',
      'App Store Deployment'
    ]
  },
  {
    icon: UIIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'UI/UX Design',
    description: 'User-centered design that converts visitors into customers',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Usability Testing'
    ]
  },
  {
    icon: ApiIcon,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Backend Development',
    description: 'Robust and scalable server-side solutions',
    features: [
      'Node.js, Python, PHP',
      'RESTful APIs',
      'Database Design',
      'Cloud Infrastructure'
    ]
  },
  {
    icon: EcommerceIcon,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    title: 'E-Commerce Solutions',
    description: 'Complete online store setup and management',
    features: [
      'Shopify, WooCommerce',
      'Payment Integration',
      'Inventory Management',
      'Analytics & Reporting'
    ]
  },
  {
    icon: ConsultingIcon,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    title: 'Tech Consulting',
    description: 'Strategic technology guidance for your business',
    features: [
      'Technology Assessment',
      'Digital Transformation',
      'Architecture Planning',
      'Team Training'
    ]
  }
]
</script>