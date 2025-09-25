<template>
  <section id="hero" class="relative w-full h-screen flex items-center justify-center overflow-hidden">
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

    <div class="relative max-w-6xl mx-auto px-8 lg:px-16 py-12 z-10">
      <!-- Animasi Mengetik Kode -->
      <div v-if="!showTitle" 
           class="text-center transition-all duration-1000"
           :class="{
             'opacity-100 scale-100': !typingComplete,
             'opacity-0 scale-150': typingComplete
           }">
        <div class="font-mono text-2xl md:text-4xl lg:text-5xl text-cyan-400 leading-relaxed">
          <span>{{ typedCode.substring(0, typedIndex) }}</span>
          <span class="animate-pulse">|</span>
        </div>
      </div>

      <!-- Konten Hero (Muncul Setelah Kode) -->
      <div v-if="showTitle" 
           class="text-center transition-all duration-1000"
           :class="{
             'opacity-0 translate-y-10': titleTransitioning,
             'opacity-100 translate-y-0': !titleTransitioning
           }">
        <div class="mb-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.2s">
          <span class="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 backdrop-blur-sm text-sm font-semibold text-cyan-300 border border-cyan-700/50">
            ✓ {{ t('hero.subtitle') }}
          </span>
        </div>

        <!-- Title dengan Tag Harga di Sebelah Kanan yang Diperbesar -->
        <div class="relative mb-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.4s">
          <h1 class="font-sans text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 leading-[1.1] tracking-tight inline-block relative z-20">
            {{ t('hero.title') }}
          </h1>
          
          <!-- Tag Harga di Sebelah Kanan Title untuk Desktop/Large Screens -->
          <div class="price-tag-desktop hidden xl:block absolute top-1/2 -right-12 transform -translate-y-1/2 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-cyan-500/60 shadow-2xl transform rotate-6 hover:rotate-3 transition-all duration-500 hover:scale-105 z-10">
            <div class="flex flex-col items-center relative">
              <!-- Glow background untuk text -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-lg"></div>

              <div class="text-cyan-200/80 text-sm mb-2 relative z-10">{{ t('pricing.startingAt') }}</div>
              <div class="flex items-baseline relative z-10">
                <span class="text-2xl font-bold text-white">$</span>
                <span class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 drop-shadow-2xl">{{ basicPrice }}</span>
                <span class="text-xs text-cyan-200/80 ml-1">{{ t('pricing.perMonth') }}</span>
              </div>
              <div class="mt-1 text-cyan-300 text-xs font-medium relative z-10">{{ t('pricing.noCreditCard') }}</div>

              <!-- Text overlay effect -->
              <div class="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-2xl"></div>
            </div>

            <!-- Efek cahaya pada tag -->
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-ping"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-ping" style="animation-delay: 0.5s"></div>

            <!-- Glow effect di sekitar tag -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
          </div>
        </div>

        <p class="text-xl md:text-2xl text-cyan-100/80 font-normal mb-6 opacity-0 animate-fade-in-up leading-relaxed max-w-3xl mx-auto" style="animation-delay: 0.6s">
          {{ t('hero.description') }}
        </p>

        <!-- Tag Harga Responsif - Muncul di bawah deskripsi pada ukuran kecil sampai large -->
        <div class="price-tag-responsive xl:hidden opacity-0 animate-fade-in-up mb-8" style="animation-delay: 0.7s">
          <div class="inline-flex flex-col items-center bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/60 shadow-2xl relative transform hover:scale-105 transition-all duration-300">
            <!-- Glow background -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-3xl blur-lg"></div>

            <div class="text-cyan-200/80 text-sm sm:text-base mb-3 relative z-10">{{ t('pricing.startingAt') }}</div>
            <div class="flex items-baseline relative z-10">
              <span class="text-3xl sm:text-4xl font-bold text-white">$</span>
              <span class="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 drop-shadow-2xl">{{ basicPrice }}</span>
              <span class="text-base sm:text-lg text-cyan-200/80 ml-2">{{ t('pricing.perMonth') }}</span>
            </div>
            <div class="mt-3 text-cyan-300 text-sm sm:text-base font-medium relative z-10">{{ t('pricing.noCreditCard') }}</div>

            <!-- Text overlay effect -->
            <div class="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-3xl"></div>

            <!-- Efek cahaya pada tag -->
            <div class="absolute -top-3 -right-3 w-5 h-5 bg-cyan-400 rounded-full opacity-60 animate-ping"></div>
            <div class="absolute -bottom-3 -left-3 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-ping" style="animation-delay: 0.5s"></div>
            <div class="absolute top-0 right-0 w-3 h-3 bg-indigo-400 rounded-full opacity-40 animate-ping" style="animation-delay: 1s"></div>

            <!-- Glow effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-xl -z-10 animate-pulse-glow"></div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16 opacity-0 animate-fade-in-up" style="animation-delay: 0.8s">
          <a
            href="https://wa.me/6281234567890?text=Hi%2C%20I%27d%20like%20a%20free%20consultation%20for%20my%20project"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1 hover:scale-105 inline-flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            {{ t('hero.cta.primary') }}
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
            <!-- Efek cahaya pada tombol -->
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>
          <a
            href="#portfolio"
            @click="scrollToSection($event, '#portfolio')"
            class="bg-transparent border-2 border-cyan-400/50 text-cyan-300 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-900/30 transition-all duration-300 hover:border-cyan-300 transform hover:-translate-y-1 hover:scale-105 text-center"
          >
            {{ t('hero.cta.secondary') }}
          </a>
        </div>

        <!-- Statistics Counter -->
        <div class="flex flex-wrap justify-center gap-12 mb-16 opacity-0 animate-fade-in-up" style="animation-delay: 1s">
          <div class="flex items-center gap-3 group">
            <div class="w-12 h-12 bg-cyan-900/30 backdrop-blur-sm rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 relative">
                <span ref="projectsCounter">{{ currentProjects }}</span>+
                <!-- Efek glow di belakang angka -->
                <div class="absolute inset-0 bg-cyan-500/20 rounded-full blur-md -z-10"></div>
              </div>
              <p class="text-cyan-200/70 text-sm">{{ t('hero.stats.projects') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 group">
            <div class="w-12 h-12 bg-indigo-900/30 backdrop-blur-sm rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 relative">
                <span ref="yearsCounter">{{ currentYears }}</span>+
                <!-- Efek glow di belakang angka -->
                <div class="absolute inset-0 bg-indigo-500/20 rounded-full blur-md -z-10"></div>
              </div>
              <p class="text-cyan-200/70 text-sm">{{ t('hero.stats.experience') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 group">
            <div class="w-12 h-12 bg-purple-900/30 backdrop-blur-sm rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 relative">
                <span ref="clientsCounter">{{ currentClients }}</span>+
                <!-- Efek glow di belakang angka -->
                <div class="absolute inset-0 bg-purple-500/20 rounded-full blur-md -z-10"></div>
              </div>
              <p class="text-cyan-200/70 text-sm">{{ t('hero.stats.clients') }}</p>
            </div>
          </div>
        </div>

        <!-- Code Preview sebagai dekorasi di belakang -->
        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-10">
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
            <div class="text-xs font-mono text-cyan-400">
              <span>{{ typedCode.substring(0, Math.min(typedIndex, 30)) }}...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Elemen bawah futuristik -->
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
    
    <!-- Indikator scroll -->
    <div v-if="showTitle" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits(['openContact'])

const currentProjects = ref(0)
const currentYears = ref(0)
const currentClients = ref(0)
const projectsCounter = ref(null)
const yearsCounter = ref(null)
const clientsCounter = ref(null)

// State untuk animasi mengetik
const typedCode = ref('const hero = {\n  title: "Nusa Software",\n  description: "Creating Digital Experiences",\n  technologies: ["Vue.js", "Node.js", "AI"],\n  launch: () => {\n    // Building the future...\n  }\n}')
const typedIndex = ref(0)

// State untuk transisi
const typingComplete = ref(false)
const showTitle = ref(false)
const titleTransitioning = ref(false)

// Pricing data
const basicPrice = ref(99)
const professionalPrice = ref(299)

const basicFeatures = computed(() => [
  t('pricing.basic.features.0'),
  t('pricing.basic.features.1'),
  t('pricing.basic.features.2'),
  t('pricing.basic.features.3')
])

const professionalFeatures = computed(() => [
  t('pricing.professional.features.0'),
  t('pricing.professional.features.1'),
  t('pricing.professional.features.2'),
  t('pricing.professional.features.3'),
  t('pricing.professional.features.4'),
  t('pricing.professional.features.5')
])

const enterpriseFeatures = computed(() => [
  t('pricing.enterprise.features.0'),
  t('pricing.enterprise.features.1'),
  t('pricing.enterprise.features.2'),
  t('pricing.enterprise.features.3'),
  t('pricing.enterprise.features.4'),
  t('pricing.enterprise.features.5'),
  t('pricing.enterprise.features.6')
])

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

const animateCounter = (current, target, duration = 2000, elementRef) => {
  const start = performance.now()
  const animate = (timestamp) => {
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    
    // Fungsi easing yang lebih menarik
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    current.value = Math.floor(easeOutQuart * target)
    
    // Update DOM langsung untuk animasi yang lebih halus
    if (elementRef && elementRef.value) {
      elementRef.value.textContent = current.value
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

const typeCode = () => {
  if (typedIndex.value < typedCode.value.length) {
    setTimeout(() => {
      typedIndex.value++
      typeCode()
    }, 15) // Kecepatan mengetik
  } else {
    // Setelah selesai mengetik, tunggu 1 detik lalu transisi ke title
    setTimeout(() => {
      typingComplete.value = true
      
      setTimeout(() => {
        showTitle.value = true
        titleTransitioning.value = true
        
        setTimeout(() => {
          titleTransitioning.value = false
          
          // Mulai animasi counter setelah konten muncul
          setTimeout(() => {
            animateCounter(currentProjects, projectsCount, 2000, projectsCounter)
          }, 200)
          
          setTimeout(() => {
            animateCounter(currentYears, yearsCount, 1500, yearsCounter)
          }, 400)
          
          setTimeout(() => {
            animateCounter(currentClients, clientsCount, 2500, clientsCounter)
          }, 600)
        }, 100)
      }, 500)
    }, 1000)
  }
}

onMounted(() => {
  // Mulai animasi mengetik
  typeCode()
})
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

/* Animasi fade in up */
@keyframes fade-in-up {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

/* Efek glow untuk tombol */
.shadow-cyan-500\/30 {
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(6, 182, 212, 0.1);
}

/* Animasi kursor berkedip */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-pulse {
  animation: blink 1s infinite;
}

/* Animasi ping untuk efek cahaya */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Custom drop shadow untuk text */
.drop-shadow-2xl {
  filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));
}

/* Ensure full height hero section */
#hero {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
}

/* Responsive optimizations for all screen sizes */
@media (max-height: 900px) {
  #hero {
    height: 100vh !important;
    min-height: 100vh !important;
  }

  #hero h1 {
    font-size: 4rem !important;
    margin-bottom: 1.5rem !important;
  }

  #hero p {
    font-size: 1.25rem !important;
    margin-bottom: 2rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 2rem !important;
  }
}

@media (max-height: 800px) {
  #hero h1 {
    font-size: 3.5rem !important;
    margin-bottom: 1rem !important;
  }

  #hero p {
    font-size: 1.125rem !important;
    margin-bottom: 1.5rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 1.5rem !important;
  }

  #hero .flex.gap-12 {
    margin-bottom: 2rem !important;
  }
}

@media (max-height: 700px) {
  #hero h1 {
    font-size: 3rem !important;
    margin-bottom: 0.75rem !important;
  }

  #hero p {
    font-size: 1rem !important;
    margin-bottom: 1.25rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 1.25rem !important;
  }

  #hero .flex.gap-12 {
    margin-bottom: 1.5rem !important;
  }
}

@media (max-height: 600px) {
  #hero h1 {
    font-size: 2.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  #hero p {
    font-size: 0.875rem !important;
    margin-bottom: 1rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 1rem !important;
  }

  #hero .flex.gap-12 {
    margin-bottom: 1rem !important;
  }
}

/* Mobile width responsive */
@media (max-width: 768px) {
  #hero {
    height: 100vh !important;
    padding: 0 !important;
  }

  #hero h1 {
    font-size: 3.5rem !important;
    line-height: 1.2 !important;
  }

  #hero p {
    font-size: 1.125rem !important;
    max-width: 90% !important;
  }

  #hero .flex.gap-6 {
    flex-direction: column;
    gap: 1rem !important;
  }

  #hero .flex.gap-12 {
    gap: 2rem !important;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  #hero h1 {
    font-size: 2.75rem !important;
  }

  #hero p {
    font-size: 1rem !important;
  }

  #hero .flex.gap-12 {
    gap: 1.5rem !important;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  #hero h1 {
    font-size: 2.25rem !important;
  }

  #hero p {
    font-size: 0.875rem !important;
  }

  #hero .flex.gap-12 {
    gap: 1rem !important;
  }
}

/* Price tag responsive positioning */
@media (min-width: 1280px) {
  .price-tag-desktop {
    right: -2rem !important;
  }
}

@media (min-width: 1400px) {
  .price-tag-desktop {
    right: -2.5rem !important;
  }
}

@media (min-width: 1536px) {
  .price-tag-desktop {
    right: -3rem !important;
  }
}

/* Mobile width responsive */
@media (max-width: 1279px) {
  /* Ensure price tag appears below description on all sizes below xl */
  .price-tag-responsive {
    margin-bottom: 2rem !important;
  }
}

@media (max-width: 768px) {
  /* Price tag sizing for tablet */
  .price-tag-responsive {
    margin-bottom: 1.5rem !important;
  }

  .price-tag-responsive .rounded-3xl {
    padding: 1rem !important;
  }

  .price-tag-responsive .text-5xl {
    font-size: 2.5rem !important;
  }

  .price-tag-responsive .text-3xl {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 640px) {
  /* Price tag sizing for mobile */
  .price-tag-responsive {
    margin-bottom: 1rem !important;
  }

  .price-tag-responsive .rounded-3xl {
    padding: 0.75rem !important;
  }

  .price-tag-responsive .text-5xl {
    font-size: 2rem !important;
  }

  .price-tag-responsive .text-3xl {
    font-size: 1.25rem !important;
  }
}

@media (max-width: 480px) {
  /* Price tag sizing for small mobile */
  .price-tag-responsive {
    margin-bottom: 0.75rem !important;
  }

  .price-tag-responsive .rounded-3xl {
    padding: 0.5rem !important;
  }

  .price-tag-responsive .text-5xl {
    font-size: 1.75rem !important;
  }

  .price-tag-responsive .text-3xl {
    font-size: 1rem !important;
  }

  .price-tag-responsive .text-sm {
    font-size: 0.75rem !important;
  }
}
</style>