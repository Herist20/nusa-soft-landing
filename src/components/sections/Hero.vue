<template>
  <section id="hero" class="relative w-full h-screen flex items-center justify-center overflow-hidden"
           :class="{ 'typing-active': !showTitle, 'content-active': showTitle }">
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

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8 z-10">
      <!-- Animasi Mengetik Kode dengan Full Height pada Mobile -->
      <div v-if="!showTitle"
           class="text-center transition-all duration-1000 typing-animation-mobile"
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
           class="text-center transition-all duration-1000 mt-12 mb-16 md:mt-0 md:mb-0"
           :class="{
             'opacity-0 translate-y-10': titleTransitioning,
             'opacity-100 translate-y-0': !titleTransitioning
           }">

        <!-- Title dengan Tag Harga di Sebelah Kanan yang Diperbesar -->
        <div class="relative mb-6 opacity-0 animate-fade-in-up" style="animation-delay: 0.4s">
          <h1 class="font-sans text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 leading-[1.1] tracking-tight inline-block relative z-20">
            {{ t('hero.title') }}
          </h1>
          
        </div>

        <p class="text-xl md:text-2xl text-cyan-100/80 font-normal mb-8 opacity-0 animate-fade-in-up leading-relaxed max-w-3xl mx-auto" style="animation-delay: 0.6s">
          {{ t('hero.description') }}
        </p>

        <!-- Minimal Inline Price & Subtitle -->
        <div class="text-center mb-4 opacity-0 animate-fade-in-up" style="animation-delay: 0.7s">
          <!-- Compact inline price display -->
          <div class="inline-flex items-center gap-1 md:gap-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/20 shadow-lg hover:scale-105 transition-transform duration-300">
            <!-- Starting from label -->
            <span class="text-cyan-300/70 text-sm font-medium">{{ t('hero.price.startingFrom') }}</span>

            <!-- Price display -->
            <div class="flex items-baseline gap-1">
              <span class="text-lg font-bold text-white">Rp</span>
              <span class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{{ basicPrice }}</span>
              <span class="text-sm text-cyan-200/90 font-semibold">{{ t('hero.price.thousand') }}</span>
            </div>

            <!-- Divider dot -->
            <div class="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"></div>

            <!-- One-time payment info -->
            <span class="text-sm text-cyan-100/70 font-medium">{{ t('hero.price.oneTimePayment') }}</span>
          </div>

          <!-- Subtitle below with responsive checkmark -->
          <div class="mt-3">
            <p class="text-base text-cyan-100/60 font-medium flex items-center justify-center gap-2">
              <svg class="w-4 h-4 text-green-400 flex-shrink-0 hidden md:block" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              {{ t('hero.subtitle') }}
            </p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.8s">
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

        <!-- Statistics Counter - Hidden on mobile -->
        <div class="hidden md:flex flex-wrap justify-center gap-12 mb-8 opacity-0 animate-fade-in-up" style="animation-delay: 1s">
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
              <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
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
    
    <!-- Indikator scroll - hidden on mobile -->
    <div v-if="showTitle" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
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
const basicPrice = ref(850)
const professionalPrice = ref(1000)

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

/* Ensure full height hero section but allow content to be visible */
#hero {
  height: 100vh !important;
  height: 100dvh !important; /* Dynamic viewport height for mobile browsers */
  max-height: 100vh !important;
  max-height: 100dvh !important;
  padding-top: 60px !important;
  padding-bottom: 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

/* Mobile-first responsive approach */
@media (max-width: 768px) {
  /* Mobile typing animation - keep it simple */
  .typing-animation-mobile .font-mono {
    font-size: 1.25rem !important;
  }

  /* Full height during typing animation */
  #hero:has(.typing-animation-mobile) {
    height: 100vh !important;
    height: 100dvh !important;
    min-height: 100vh !important;
    min-height: 100dvh !important;
    max-height: 100vh !important;
    max-height: 100dvh !important;
    align-items: center !important;
    justify-content: center !important;
  }

  /* Normal height after typing animation */
  #hero:not(:has(.typing-animation-mobile)) {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    align-items: flex-start !important;
  }

  /* Fallback for browsers that don't support :has() */
  @supports not selector(:has(*)) {
    #hero.typing-active {
      height: 100vh !important;
      height: 100dvh !important;
      min-height: 100vh !important;
      min-height: 100dvh !important;
      max-height: 100vh !important;
      max-height: 100dvh !important;
      align-items: center !important;
      justify-content: center !important;
    }

    #hero.content-active {
      height: auto !important;
      min-height: auto !important;
      max-height: none !important;
      align-items: flex-start !important;
    }
  }

  #hero {
    padding-top: 80px !important;
    padding-bottom: 2rem !important;
  }

  #hero .relative.max-w-6xl {
    padding: 1rem !important;
  }

  /* Mobile price tag adjustments - more rectangular design */
  #hero .inline-flex.items-center.gap-1 {
    flex-direction: column !important;
    padding: 1.25rem 1.5rem !important;
    max-width: 300px !important;
    margin: 0 auto !important;
    border-radius: 1rem !important;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.1)) !important;
    border: 1px solid rgba(6, 182, 212, 0.3) !important;
  }

  /* Adjust price text size on mobile */
  #hero .inline-flex .text-2xl {
    font-size: 1.75rem !important;
  }

  /* Center align all mobile price elements */
  #hero .inline-flex .flex.items-baseline {
    justify-content: center !important;
  }

  #hero h1 {
    font-size: 2.5rem !important;
    margin-bottom: 1rem !important;
  }

  #hero p {
    font-size: 1rem !important;
    margin-bottom: 1.5rem !important;
  }
}

/* Responsive optimizations for desktop only */
@media (max-height: 900px) and (min-width: 769px) {
  #hero {
    height: 100vh !important;
    height: 100dvh !important;
    max-height: 100vh !important;
    max-height: 100dvh !important;
  }

  #hero h1 {
    font-size: 4rem !important;
    margin-bottom: 1.5rem !important;
  }

  #hero p {
    font-size: 1.25rem !important;
    margin-bottom: 1.5rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 1.5rem !important;
  }
}

@media (max-height: 800px) {
  #hero {
    padding-top: 40px !important;
    padding-bottom: 1rem !important;
  }

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
    margin-bottom: 1.5rem !important;
  }
}

@media (max-height: 700px) {
  #hero {
    padding-top: 30px !important;
  }

  #hero h1 {
    font-size: 3rem !important;
    margin-bottom: 0.75rem !important;
  }

  #hero p {
    font-size: 1rem !important;
    margin-bottom: 1rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 1rem !important;
  }

  #hero .flex.gap-12 {
    margin-bottom: 1rem !important;
    gap: 1.5rem !important;
  }
}

@media (max-height: 600px) {
  #hero {
    padding-top: 20px !important;
  }

  #hero h1 {
    font-size: 2.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  #hero p {
    font-size: 0.875rem !important;
    margin-bottom: 0.75rem !important;
  }

  #hero .flex.gap-6 {
    margin-bottom: 0.75rem !important;
  }

  #hero .flex.gap-12 {
    margin-bottom: 0.75rem !important;
    gap: 1rem !important;
  }

}


@media (max-width: 640px) {
  #hero {
    padding-top: 50px !important;
  }

  #hero .relative.max-w-6xl {
    padding: 0.75rem !important;
  }

  /* Smaller rectangular price tag on small screens */
  #hero .inline-flex.items-center.gap-4 {
    max-width: 280px !important;
    padding: 1rem 1.25rem !important;
    gap: 0.5rem !important;
    border-radius: 0.875rem !important;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.1)) !important;
    border: 1px solid rgba(6, 182, 212, 0.25) !important;
  }

  #hero .inline-flex .text-2xl {
    font-size: 1.5rem !important;
  }

  #hero .inline-flex .text-lg {
    font-size: 1rem !important;
  }

  #hero .inline-flex .text-sm {
    font-size: 0.8125rem !important;
  }

  #hero h1 {
    font-size: 2.25rem !important;
    margin-bottom: 0.75rem !important;
  }

  #hero p {
    font-size: 0.95rem !important;
    margin-bottom: 1.25rem !important;
  }

  #hero .flex.gap-6 {
    gap: 0.75rem !important;
    margin-bottom: 1.5rem !important;
  }

  #hero .flex.gap-12 {
    gap: 1rem !important;
    flex-wrap: wrap;
    margin-bottom: 1.5rem !important;
  }

  /* Adjust button sizes for small screens */
  #hero .flex.gap-6 a {
    padding: 0.75rem 1.5rem !important;
    font-size: 0.875rem !important;
  }
}

@media (max-width: 480px) {
  #hero {
    padding-top: 40px !important;
  }

  #hero .relative.max-w-6xl {
    padding: 0.5rem !important;
  }

  /* Extra small rectangular price tag */
  #hero .inline-flex.items-center.gap-4 {
    max-width: 260px !important;
    padding: 0.875rem 1rem !important;
    gap: 0.5rem !important;
    border-radius: 0.75rem !important;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.1)) !important;
    border: 1px solid rgba(6, 182, 212, 0.2) !important;
  }

  #hero .inline-flex .text-2xl {
    font-size: 1.375rem !important;
  }

  #hero .inline-flex .text-lg {
    font-size: 0.875rem !important;
  }

  #hero .inline-flex .text-sm {
    font-size: 0.75rem !important;
  }

  #hero h1 {
    font-size: 2rem !important;
    margin-bottom: 0.5rem !important;
  }

  #hero p {
    font-size: 0.875rem !important;
    margin-bottom: 1rem !important;
  }

  #hero .flex.gap-6 {
    gap: 0.5rem !important;
    margin-bottom: 1.25rem !important;
  }

  #hero .flex.gap-12 {
    gap: 0.75rem !important;
    margin-bottom: 1.25rem !important;
  }

  /* Further reduce button sizes */
  #hero .flex.gap-6 a {
    padding: 0.625rem 1.25rem !important;
    font-size: 0.8125rem !important;
  }

}



/* Ultra small screens (320px and below) */
@media (max-width: 320px) {
  #hero {
    padding-top: 30px !important;
  }

  #hero .relative.max-w-6xl {
    padding: 0.25rem !important;
  }

  #hero h1 {
    font-size: 1.75rem !important;
    margin-bottom: 0.5rem !important;
  }

  #hero p {
    font-size: 0.8125rem !important;
    margin-bottom: 0.75rem !important;
  }

  #hero .flex.gap-6 {
    gap: 0.5rem !important;
    margin-bottom: 1rem !important;
  }

  #hero .flex.gap-6 a {
    padding: 0.5rem 1rem !important;
    font-size: 0.75rem !important;
  }
}

/* Landscape orientation on mobile devices */
@media (max-width: 768px) and (orientation: landscape) {
  #hero {
    padding-top: 20px !important;
    padding-bottom: 1rem !important;
  }

  #hero h1 {
    font-size: 2rem !important;
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
    gap: 1rem !important;
  }
}

/* Ensure typing animation is also responsive */
@media (max-width: 768px) {
  #hero .font-mono {
    font-size: 1.5rem !important;
  }
}

@media (max-width: 640px) {
  #hero .font-mono {
    font-size: 1.25rem !important;
  }
}

@media (max-width: 480px) {
  #hero .font-mono {
    font-size: 1rem !important;
  }
}

/* Safe area handling for notched devices */
@supports (padding: max(0px)) {
  #hero {
    padding-left: max(1rem, env(safe-area-inset-left)) !important;
    padding-right: max(1rem, env(safe-area-inset-right)) !important;
    padding-top: max(80px, env(safe-area-inset-top) + 60px) !important;
    padding-bottom: max(2rem, env(safe-area-inset-bottom) + 1rem) !important;
  }

  @media (max-width: 768px) {
    #hero {
      padding-top: max(60px, env(safe-area-inset-top) + 40px) !important;
      padding-bottom: max(1rem, env(safe-area-inset-bottom) + 0.5rem) !important;
    }
  }
}

/* Prevent content from being cut off on very short screens */
@media (max-height: 500px) {
  #hero {
    min-height: auto !important;
    height: auto !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }

  #hero .absolute.bottom-8 {
    display: none !important;
  }
}
</style>