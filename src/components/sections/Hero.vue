<template>
  <section id="hero" class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
    <!-- Subtle Grid Pattern -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 grid-pattern"></div>
      <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-50/30 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-8 lg:px-16 py-12 z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="hero-content">
          <div class="mb-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.2s">
            <span class="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-sm font-semibold text-secondary border border-blue-100">
              ✓ Trusted by 120+ Companies
            </span>
          </div>

          <h1 class="font-sans text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up text-gray-900 leading-[1.1] tracking-tight" style="animation-delay: 0.4s">
            Build Your Next
            <span class="block text-secondary">Digital Product</span>
            <span class="block text-3xl md:text-4xl lg:text-5xl text-gray-600 font-normal mt-2">With Confidence</span>
          </h1>

          <p class="text-xl text-gray-600 font-normal mb-8 opacity-0 animate-fade-in-up leading-relaxed max-w-lg" style="animation-delay: 0.6s">
            We help businesses transform their ideas into scalable digital products. From concept to launch, we're your technical partner.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-16 opacity-0 animate-fade-in-up" style="animation-delay: 0.8s">
            <a
              href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20a%20free%20consultation%20for%20my%20project"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-secondary text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 inline-flex items-center justify-center gap-3"
            >
              Start Your Project
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <a
              href="#portfolio"
              @click="scrollToSection($event, '#portfolio')"
              class="bg-white border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 text-center"
            >
              View Portfolio
            </a>
          </div>

          <!-- Statistics Counter -->
          <div class="flex flex-wrap gap-8 opacity-0 animate-fade-in-up" style="animation-delay: 1s">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ currentProjects }}+</div>
                <p class="text-gray-600 text-sm">Projects</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ currentYears }}+</div>
                <p class="text-gray-600 text-sm">Years</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">{{ currentClients }}+</div>
                <p class="text-gray-600 text-sm">Clients</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Hero Visual -->
        <div class="relative opacity-0 animate-fade-in-right" style="animation-delay: 1.2s">
          <!-- Main Card -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Modern Development</h3>
                <p class="text-sm text-gray-500">Clean, Scalable Code</p>
              </div>
            </div>

            <!-- Code Preview -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <div class="space-y-2 text-sm font-mono">
                <div class="text-blue-600">const app = createApp({</div>
                <div class="text-gray-600 ml-4">components: { Header, Main },</div>
                <div class="text-gray-600 ml-4">data() { return { ... } }</div>
                <div class="text-blue-600">})</div>
              </div>
            </div>

            <!-- Features -->
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">TypeScript Ready</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">Responsive Design</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">SEO Optimized</span>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg class="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['openContact'])

const currentProjects = ref(0)
const currentYears = ref(0)
const currentClients = ref(0)

const projectsCount = 150
const yearsCount = 5
const clientsCount = 120

const scrollToSection = (event, href) => {
  event.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    const offsetTop = element.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const animateCounter = (current, target, duration = 2000) => {
  const start = performance.now()
  const animate = (timestamp) => {
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    current.value = Math.floor(easeOut * target)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  setTimeout(() => {
    animateCounter(currentProjects, projectsCount, 2000)
  }, 1200)

  setTimeout(() => {
    animateCounter(currentYears, yearsCount, 1500)
  }, 1400)

  setTimeout(() => {
    animateCounter(currentClients, clientsCount, 2500)
  }, 1600)
})
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in-right {
  animation: fade-in-right 1s ease-out forwards;
}

.grid-pattern {
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: 0 0, 0 0;
}
</style>