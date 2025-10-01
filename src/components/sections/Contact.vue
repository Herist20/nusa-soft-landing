<template>
  <section id="contact" class="relative py-20 overflow-hidden">
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

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 backdrop-blur-sm text-sm font-semibold text-cyan-300 border border-cyan-700/50">
          {{ t('contact.title') }}
        </span>
        <h2 class="font-sans text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 mt-6 mb-4 leading-tight">
          {{ t('contact.title') }}
        </h2>
        <p class="text-xl text-cyan-100/80 max-w-3xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 lg:p-12 relative border border-cyan-500/20">
            <!-- Glow effect untuk form -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-lg -z-10"></div>
            
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-8">
                <div class="w-12 h-12 bg-cyan-900/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-cyan-500/30">
                  <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-sans text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{{ t('contact.form.title') }}</h3>
                  <p class="text-cyan-200/70">{{ t('contact.form.required') || 'All fields marked with * are required' }}</p>
                </div>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleSubmit" class="space-y-6">

                <!-- Personal Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="fullName" class="block font-medium text-cyan-200 mb-2">
                      {{ t('contact.form.name') }}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      v-model="form.fullName"
                      required
                      class="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all duration-200 placeholder-cyan-500/50 text-cyan-100"
                      :placeholder="t('contact.form.placeholder.name')"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block font-medium text-cyan-200 mb-2">
                      {{ t('contact.form.phone') }}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="form.phone"
                      required
                      class="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all duration-200 placeholder-cyan-500/50 text-cyan-100"
                      :placeholder="t('contact.form.placeholder.phone')"
                    />
                  </div>
                </div>

                <div>
                  <label for="company" class="block font-medium text-cyan-200 mb-2">
                    {{ t('contact.form.company') }}
                  </label>
                  <input
                    type="text"
                    id="company"
                    v-model="form.company"
                    class="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all duration-200 placeholder-cyan-500/50 text-cyan-100"
                    :placeholder="t('contact.form.placeholder.company')"
                  />
                </div>

                <!-- Project Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="projectType" class="block font-medium text-cyan-200 mb-2">
                      {{ t('contact.form.projectType.label') }}
                    </label>
                    <select
                      id="projectType"
                      v-model="form.projectType"
                      required
                      class="w-full px-4 pr-10 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all duration-200 placeholder-cyan-500/50 text-cyan-100 appearance-none"
                    >
                      <option value="">{{ t('contact.form.projectType.placeholder') || 'Select project type' }}</option>
                      <option value="website">{{ t('contact.form.projectType.options.website') }}</option>
                      <option value="ecommerce">{{ t('contact.form.projectType.options.ecommerce') }}</option>
                      <option value="mobile">{{ t('contact.form.projectType.options.mobile') }}</option>
                      <option value="system">{{ t('contact.form.projectType.options.system') }}</option>
                      <option value="uiux">{{ t('contact.form.projectType.options.uiux') }}</option>
                      <option value="consultation">{{ t('contact.form.projectType.options.consultation') }}</option>
                      <option value="thesis">{{ t('contact.form.projectType.options.thesis') }}</option>
                      <option value="other">{{ t('contact.form.projectType.options.other') }}</option>
                    </select>
                  </div>

                  <div>
                    <label for="budget" class="block font-medium text-cyan-200 mb-2">
                      {{ t('contact.form.budget.label') }}
                    </label>
                    <select
                      id="budget"
                      v-model="form.budget"
                      class="w-full px-4 pr-10 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all duration-200 placeholder-cyan-500/50 text-cyan-100 appearance-none"
                    >
                      <option value="">{{ t('contact.form.budget.placeholder') || 'Select budget range' }}</option>
                      <option value="under10k">{{ t('contact.form.budget.options.under10k') }}</option>
                      <option value="10to25k">{{ t('contact.form.budget.options.10to25k') }}</option>
                      <option value="25to50k">{{ t('contact.form.budget.options.25to50k') }}</option>
                      <option value="50to100k">{{ t('contact.form.budget.options.50to100k') }}</option>
                      <option value="above100k">{{ t('contact.form.budget.options.above100k') }}</option>
                      <option value="discuss">{{ t('contact.form.budget.options.discuss') }}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="timeline" class="block font-medium text-cyan-200 mb-2">
                    {{ t('contact.form.timeline.label') }}
                  </label>
                  <select
                    id="timeline"
                    v-model="form.timeline"
                    class="w-full px-4 pr-10 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none transition-all duration-200 placeholder-cyan-500/50 text-cyan-100 appearance-none"
                  >
                    <option value="">{{ t('contact.form.timeline.placeholder') || 'Select start time' }}</option>
                    <option value="asap">{{ t('contact.form.timeline.options.asap') }}</option>
                    <option value="1month">{{ t('contact.form.timeline.options.1month') }}</option>
                    <option value="3months">{{ t('contact.form.timeline.options.3months') }}</option>
                    <option value="6months">{{ t('contact.form.timeline.options.6months') }}</option>
                    <option value="flexible">{{ t('contact.form.timeline.options.flexible') }}</option>
                  </select>
                </div>

                <!-- Project Description -->
                <div>
                  <label for="description" class="block font-medium text-cyan-200 mb-2">
                    {{ t('contact.form.message') }}
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="5"
                    required
                    class="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:outline-none transition-all duration-200 resize-none text-cyan-100"
                    :placeholder="t('contact.form.placeholder.message')"
                  ></textarea>
                </div>

                <!-- WhatsApp Button -->
                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-200 relative overflow-hidden group"
                  >
                    <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    {{ t('contact.cta.whatsapp') }}
                    <!-- Efek cahaya pada tombol WhatsApp -->
                    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Contact Info & Trust Signals -->
        <div class="space-y-6">
          <!-- Contact Information -->
          <div class="bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-cyan-500/20">
            <!-- Glow effect untuk card -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-lg -z-10"></div>
            
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-cyan-900/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-cyan-500/30">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 class="font-sans text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{{ t('contact.info.title') || 'Get In Touch' }}</h3>
            </div>

            <div class="space-y-4">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <div>
                  <p class="font-semibold text-cyan-200">{{ t('contact.info.address') }}</p>
                  <p class="text-cyan-200/70 text-sm">{{ t('contact.info.addressDetail') }}</p>
                </div>
              </div>

              <div class="flex items-start">
                <svg class="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="font-semibold text-cyan-200">{{ t('contact.info.email') }}</p>
                  <a href="mailto:hello@nusasoftware.com" class="text-cyan-300 text-sm hover:underline">{{ t('contact.info.emailDetail') }}</a>
                </div>
              </div>

              <div class="flex items-start">
                <svg class="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <div>
                  <p class="font-semibold text-cyan-200">{{ t('contact.info.phone') }}</p>
                  <a href="https://wa.me/6287860628412" class="text-cyan-300 text-sm hover:underline">{{ t('contact.info.phoneDetail') }}</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Time Promise -->
          <div class="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-emerald-500/30">
            <!-- Glow effect untuk card -->
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-lg -z-10"></div>
            
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="font-sans text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">{{ t('contact.info.response') }}</h3>
            </div>
            <div class="space-y-3 text-sm">
              <div class="flex items-center">
                <span class="font-semibold mr-2 text-emerald-300">⚡</span>
                <span class="text-emerald-200/80">{{ t('contact.info.hoursDetail') }}</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold mr-2 text-emerald-300">📋</span>
                <span class="text-emerald-200/80">{{ t('contact.info.response') }}</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold mr-2 text-emerald-300">🤝</span>
                <span class="text-emerald-200/80">{{ t('navigation.getConsultation') }}</span>
              </div>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-cyan-500/20">
            <!-- Glow effect untuk card -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-lg -z-10"></div>
            
            <h3 class="font-sans text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-4">{{ t('about.title') || 'Why Choose Us?' }}</h3>
            <div class="space-y-3">
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-cyan-200/80">100+ Successful Projects</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-cyan-200/80">5+ Years Experience</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-cyan-200/80">98% Client Satisfaction</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-cyan-200/80">Free Post-Launch Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Elemen bawah futuristik -->
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Form data - simplified for WhatsApp only
const form = ref({
  fullName: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  description: ''
})


// WhatsApp URL generation
const whatsappUrl = computed(() => {
  const projectTypeLabel = form.value.projectType
    ? t(`contact.form.projectType.options.${form.value.projectType}`)
    : t('whatsapp.contactForm.notSpecified')

  const budgetLabel = form.value.budget
    ? t(`contact.form.budget.options.${form.value.budget}`)
    : t('whatsapp.contactForm.notSpecified')

  const timelineLabel = form.value.timeline
    ? t(`contact.form.timeline.options.${form.value.timeline}`)
    : t('whatsapp.contactForm.notSpecified')

  const greeting = t('whatsapp.contactForm.greeting', { projectType: projectTypeLabel })

  const message = `${greeting}

${t('whatsapp.contactForm.name')}: ${form.value.fullName || t('whatsapp.contactForm.notProvided')}
${t('whatsapp.contactForm.phone')}: ${form.value.phone || t('whatsapp.contactForm.notProvided')}
${t('whatsapp.contactForm.company')}: ${form.value.company || t('whatsapp.contactForm.notProvided')}
${t('whatsapp.contactForm.service')}: ${projectTypeLabel}
${t('whatsapp.contactForm.budget')}: ${budgetLabel}
${t('whatsapp.contactForm.timeline')}: ${timelineLabel}
${t('whatsapp.contactForm.description')}: ${form.value.description || t('whatsapp.contactForm.discuss')}

${t('whatsapp.contactForm.closing')}`

  return `https://wa.me/6287860628412?text=${encodeURIComponent(message)}`
})

// Handle form submit
const handleSubmit = () => {
  // Browser will validate required fields automatically
  // If validation passes, open WhatsApp
  window.open(whatsappUrl.value, '_blank')
}
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

/* Efek glow untuk tombol */
.shadow-cyan-500\/30 {
  box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.3), 0 10px 10px -5px rgba(6, 182, 212, 0.1);
}

.shadow-green-500\/30 {
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 10px 10px -5px rgba(16, 185, 129, 0.1);
}

/* Remove all focus outlines and shadows */
input:focus,
select:focus,
textarea:focus {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

/* Remove focus visible outline */
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

/* Custom dropdown arrow */
select.appearance-none {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236ee7b7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

/* Force select dropdown styling */
select.appearance-none:focus {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

/* Override system dropdown styling */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Enhanced dropdown styling - force override browser defaults */
select option {
  background: #1f2937 !important;
  background-color: #1f2937 !important;
  color: #a7f3d0 !important;
  padding: 12px 16px !important;
  border: none !important;
  font-weight: 500 !important;
  font-family: inherit !important;
}

select option:hover {
  background: #065f46 !important;
  background-color: #065f46 !important;
  color: #6ee7b7 !important;
}

select option:checked,
select option:selected {
  background: #0891b2 !important;
  background-color: #0891b2 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

select option:focus {
  background: #0891b2 !important;
  background-color: #0891b2 !important;
  color: #ffffff !important;
  outline: 2px solid #06b6d4 !important;
  outline-offset: -2px !important;
}

/* Additional styling for WebKit browsers */
select::-webkit-select-list {
  background: #1f2937 !important;
  border: 1px solid #374151 !important;
  border-radius: 8px !important;
}

select option:hover::-webkit-option {
  background: #065f46 !important;
  color: #6ee7b7 !important;
}

/* Alternative for Firefox */
@-moz-document url-prefix() {
  select option {
    background: #1f2937 !important;
    color: #a7f3d0 !important;
  }

  select option:hover {
    background: #065f46 !important;
    color: #6ee7b7 !important;
  }
}
</style>