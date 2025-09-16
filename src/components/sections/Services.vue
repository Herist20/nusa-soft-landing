<template>
  <section id="services" class="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
          <span class="text-primary font-semibold text-sm">Our Expertise</span>
        </div>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Professional Development Services
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Transform your ideas into powerful digital solutions with our comprehensive suite of development services
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <div v-for="(service, index) in services" :key="service.title"
             class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 lg:p-10 group cursor-pointer border border-gray-100 hover:border-primary/20 hover:-translate-y-2"
             :style="`opacity: 0; animation: fadeInStagger 0.8s ease-out forwards; animation-delay: ${index * 0.3}s;`">

          <!-- Service Header -->
          <div class="flex items-start space-x-6 mb-6">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                   :class="service.iconBg">
                <component :is="service.icon" class="w-9 h-9" :class="service.iconColor" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-gray-600 text-lg leading-relaxed mb-4">
                {{ service.description }}
              </p>
            </div>
          </div>

          <!-- Service Features -->
          <div class="mb-8">
            <h4 class="font-semibold text-gray-800 mb-4">Key Features:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="feature in service.features" :key="feature"
                   class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mt-0.5">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Learn More Button -->
          <button class="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group-hover:from-secondary group-hover:to-primary flex items-center justify-center space-x-2">
            <span>Learn More</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <div class="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100">
          <h3 class="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life with our expert development services
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20project%20requirements"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Get Free Consultation</span>
            </a>
            <button class="border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-lg hover:scale-105">
              View Our Portfolio
            </button>
          </div>
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
    description: 'Create powerful, responsive websites that engage users and drive business growth. Our custom web solutions are built with modern technologies and best practices.',
    features: [
      'Custom Website Development',
      'E-commerce Solutions',
      'CMS Development',
      'Progressive Web Apps (PWA)'
    ]
  },
  {
    icon: MobileIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Mobile App Development',
    description: 'Build stunning native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.',
    features: [
      'Native iOS/Android Apps',
      'Cross-platform (React Native/Flutter)',
      'App Store Optimization',
      'Maintenance & Support'
    ]
  },
  {
    icon: UIIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'UI/UX Design',
    description: 'Design intuitive and visually appealing interfaces that convert visitors into customers through strategic user experience research and design.',
    features: [
      'User Interface Design',
      'User Experience Research',
      'Prototyping & Wireframing',
      'Brand Identity Design'
    ]
  },
  {
    icon: ApiIcon,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Digital Solutions',
    description: 'Comprehensive digital transformation services including API development, cloud migration, and technical consulting to optimize your business operations.',
    features: [
      'API Development & Integration',
      'Cloud Migration',
      'Performance Optimization',
      'Technical Consulting'
    ]
  }
]
</script>