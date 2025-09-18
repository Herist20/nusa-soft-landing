<template>
  <section id="hero" class="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white">
    <!-- Clean Background Pattern -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-surface opacity-50"></div>
      <div class="hero-pattern">
        <div class="pattern-dot pattern-dot-1"></div>
        <div class="pattern-dot pattern-dot-2"></div>
        <div class="pattern-dot pattern-dot-3"></div>
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-primary hero-content">
          <div class="mb-4 opacity-0 animate-fade-in-up" style="animation-delay: 0.2s">
            <span class="inline-flex items-center px-4 py-2 rounded-full bg-surface border border-border text-sm font-semibold text-secondary">
              Fast • Reliable • Scalable Solutions
            </span>
          </div>

          <h1 class="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 opacity-0 animate-fade-in-up text-primary leading-tight" style="animation-delay: 0.4s">
            Transforming Ideas into
            <span class="text-secondary"> Digital Reality</span>
          </h1>

          <p class="text-xl md:text-2xl mb-2 font-semibold text-primary opacity-0 animate-fade-in-up" style="animation-delay: 0.6s">
            Expert Web & Mobile App Development Services
          </p>

          <p class="text-lg text-text-secondary mb-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.8s">
            We transform your vision into powerful digital solutions that drive business growth and user engagement.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-fade-in-up" style="animation-delay: 1s">
            <a
              href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20a%20free%20consultation%20for%20my%20project"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-secondary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Get Free Consultation
            </a>
            <a
              href="#portfolio"
              @click="scrollToSection($event, '#portfolio')"
              class="border-2 border-border text-primary px-8 py-4 rounded-lg font-semibold hover:bg-surface hover:border-secondary transition-all duration-200 text-center"
            >
              View Our Work
            </a>
          </div>

          <!-- Statistics Counter -->
          <div class="grid grid-cols-3 gap-8 opacity-0 animate-fade-in-up" style="animation-delay: 1.2s">
            <div class="text-center">
              <div class="text-4xl font-bold text-secondary mb-1 counter" :data-target="projectsCount">{{ currentProjects }}</div>
              <p class="text-text-muted text-sm font-medium">Projects Completed</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-accent mb-1 counter" :data-target="yearsCount">{{ currentYears }}</div>
              <p class="text-text-muted text-sm font-medium">Years Experience</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-secondary mb-1 counter" :data-target="clientsCount">{{ currentClients }}</div>
              <p class="text-text-muted text-sm font-medium">Happy Clients</p>
            </div>
          </div>
        </div>
        <!-- Hero Illustration/Mockup -->
        <div class="relative opacity-0 animate-fade-in-right" style="animation-delay: 1.4s">
          <div class="relative z-10">
            <!-- Device Mockup Stack -->
            <div class="relative">
              <!-- Desktop Browser -->
              <div class="bg-white rounded-2xl p-6 shadow-xl border border-border">
                <div class="flex items-center gap-2 mb-4">
                  <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div class="flex-1 bg-surface rounded-md h-6 ml-4"></div>
                </div>
                <div class="space-y-3">
                  <div class="bg-surface h-4 rounded"></div>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-surface h-20 rounded-lg"></div>
                    <div class="bg-surface h-20 rounded-lg"></div>
                  </div>
                  <div class="bg-surface h-3 rounded"></div>
                  <div class="bg-surface h-3 rounded w-3/4"></div>
                </div>
              </div>

              <!-- Mobile Phone -->
              <div class="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-border transform rotate-12">
                <div class="w-4 h-1 bg-border rounded-full mx-auto mb-3"></div>
                <div class="space-y-2">
                  <div class="bg-surface h-8 rounded"></div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="bg-surface h-12 rounded"></div>
                    <div class="bg-surface h-12 rounded"></div>
                  </div>
                  <div class="bg-surface h-2 rounded"></div>
                  <div class="bg-surface h-2 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-4 -left-4 w-8 h-8 bg-secondary/20 rounded-full animate-pulse" style="animation-delay: 2s"></div>
          <div class="absolute -bottom-8 -left-8 w-6 h-6 bg-accent/20 rounded-full animate-pulse" style="animation-delay: 2.5s"></div>
          <div class="absolute -top-8 -right-2 w-4 h-4 bg-secondary/20 rounded-full animate-pulse" style="animation-delay: 3s"></div>
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

.hero-pattern {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.pattern-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--color-border);
  border-radius: 50%;
}

.pattern-dot-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  background: linear-gradient(135deg, var(--color-secondary) 0%, transparent 50%);
  opacity: 0.1;
}

.pattern-dot-2 {
  width: 60px;
  height: 60px;
  top: 70%;
  right: 15%;
  background: linear-gradient(135deg, var(--color-accent) 0%, transparent 50%);
  opacity: 0.1;
}

.pattern-dot-3 {
  width: 40px;
  height: 40px;
  top: 40%;
  right: 40%;
  background: linear-gradient(135deg, var(--color-secondary) 0%, transparent 50%);
  opacity: 0.1;
}
</style>