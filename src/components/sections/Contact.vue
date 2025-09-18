<template>
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-primary font-semibold tracking-wide uppercase text-sm">Let's Connect</span>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Start Your Project Today
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Ready to transform your ideas into reality? Fill out the form below and we'll get back to you within 24 hours.
          Or reach us instantly via WhatsApp for immediate assistance.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm p-8 lg:p-12 relative border border-gray-200">

            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-8">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-display text-2xl font-bold text-gray-900">Tell Us About Your Project</h3>
                  <p class="text-gray-600">All fields marked with * are required</p>
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="showSuccess" class="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 class="font-semibold text-green-800 mb-2">Message Sent Successfully!</h4>
                    <p class="text-green-700 mb-3">{{ successMessage }}</p>
                    <div class="text-sm text-green-600">
                      <strong>Next Steps:</strong>
                      <ul class="list-disc list-inside mt-1 space-y-1">
                        <li>We'll review your project details within 2-4 hours</li>
                        <li>Our team will prepare a preliminary proposal</li>
                        <li>You'll receive a detailed response within 24 hours</li>
                        <li>We'll schedule a consultation call at your convenience</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form -->
              <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
                <!-- Honeypot field for spam protection -->
                <input v-model="form.honeypot" type="text" name="website" class="hidden" autocomplete="off" />

                <!-- Personal Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="fullName" class="block font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      v-model="form.fullName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      :class="{ 'border-red-500': errors.fullName }"
                      placeholder="Enter your full name"
                    />
                    <p v-if="errors.fullName" class="mt-1 text-sm text-red-500">{{ errors.fullName }}</p>
                  </div>

                  <div>
                    <label for="email" class="block font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      :class="{ 'border-red-500': errors.email }"
                      placeholder="your@email.com"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="phone" class="block font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="form.phone"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>

                  <div>
                    <label for="company" class="block font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      v-model="form.company"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <!-- Project Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="projectType" class="block font-medium text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      v-model="form.projectType"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      :class="{ 'border-red-500': errors.projectType }"
                    >
                      <option value="">Select project type</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="consultation">Technical Consultation</option>
                    </select>
                    <p v-if="errors.projectType" class="mt-1 text-sm text-red-500">{{ errors.projectType }}</p>
                  </div>

                  <div>
                    <label for="budget" class="block font-medium text-gray-700 mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      v-model="form.budget"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                      :class="{ 'border-red-500': errors.budget }"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-30k">$15,000 - $30,000</option>
                      <option value="30k-plus">$30,000+</option>
                      <option value="discuss">Let's Discuss</option>
                    </select>
                    <p v-if="errors.budget" class="mt-1 text-sm text-red-500">{{ errors.budget }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="contactMethod" class="block font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="contactMethod"
                      v-model="form.contactMethod"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    >
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label for="timeline" class="block font-medium text-gray-700 mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      v-model="form.timeline"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    >
                      <option value="asap">ASAP</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-plus-months">6+ months</option>
                    </select>
                  </div>
                </div>

                <!-- Project Description -->
                <div>
                  <label for="description" class="block font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    required
                    rows="5"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    :class="{ 'border-red-500': errors.description }"
                    placeholder="Please describe your project in detail. Include your goals, requirements, and any specific features you need..."
                  ></textarea>
                  <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ form.description.length }}/500 characters</p>
                </div>

                <!-- Submit Button -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="!loading" class="flex items-center justify-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Project Details
                    </span>
                    <span v-else class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  </button>

                  <!-- WhatsApp Alternative -->
                  <a
                    :href="whatsappUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Quick WhatsApp
                  </a>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ errorMessage }}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Contact Info & Trust Signals -->
        <div class="space-y-6">
          <!-- Contact Information -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 class="font-display text-xl font-bold text-gray-900">Get In Touch</h3>
            </div>

            <div class="space-y-4">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <div>
                  <p class="font-semibold text-gray-900">Office</p>
                  <p class="text-gray-600 text-sm">Jakarta, Indonesia</p>
                </div>
              </div>

              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="font-semibold text-gray-900">Email</p>
                  <a href="mailto:hello@nusasoftware.com" class="text-primary text-sm hover:underline">hello@nusasoftware.com</a>
                </div>
              </div>

              <div class="flex items-start">
                <svg class="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <div>
                  <p class="font-semibold text-gray-900">WhatsApp</p>
                  <a href="https://wa.me/6281234567890" class="text-primary text-sm hover:underline">+62 812-3456-7890</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Time Promise -->
          <div class="bg-accent rounded-2xl shadow-sm p-8 text-white border border-emerald-600">
            <div class="flex items-center gap-3 mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="font-display text-xl font-bold">Response Guarantee</h3>
            </div>
            <div class="space-y-3 text-sm">
              <div class="flex items-center">
                <span class="font-semibold mr-2">⚡</span>
                <span>Response within 2-4 hours</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold mr-2">📋</span>
                <span>Detailed proposal within 24 hours</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold mr-2">🤝</span>
                <span>Free consultation call included</span>
              </div>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
            <h3 class="font-display text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
            <div class="space-y-3">
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>100+ Successful Projects</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>5+ Years Experience</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>98% Client Satisfaction</span>
              </div>
              <div class="flex items-center text-sm">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Free Post-Launch Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../../utils/emailjs-config'

// Form data
const form = ref({
  honeypot: '', // Spam protection
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  contactMethod: 'email',
  timeline: '1-3-months',
  description: ''
})

// Form state
const loading = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = ref({})

// Computed properties
const whatsappUrl = computed(() => {
  const message = `Hi! I'm interested in ${form.value.projectType || 'your development services'}. Here are my project details:

📋 Project: ${form.value.projectType || 'Not specified'}
💰 Budget: ${form.value.budget || 'Not specified'}
⏰ Timeline: ${form.value.timeline || 'Not specified'}
📝 Description: ${form.value.description || 'I\'d like to discuss my project requirements'}

Can we schedule a consultation?`

  return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
})

// Validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const sanitizeInput = (input) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
             .replace(/[<>]/g, '')
             .trim()
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.fullName) {
    errors.value.fullName = 'Full name is required'
  } else if (form.value.fullName.length < 2) {
    errors.value.fullName = 'Name must be at least 2 characters'
  }

  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!form.value.projectType) {
    errors.value.projectType = 'Please select a project type'
  }

  if (!form.value.budget) {
    errors.value.budget = 'Please select a budget range'
  }

  if (!form.value.description) {
    errors.value.description = 'Project description is required'
  } else if (form.value.description.length < 20) {
    errors.value.description = 'Please provide more details (minimum 20 characters)'
  } else if (form.value.description.length > 500) {
    errors.value.description = 'Description must be less than 500 characters'
  }

  return Object.keys(errors.value).length === 0
}

// Form submission
const handleSubmit = async () => {
  // Check honeypot for spam protection
  if (form.value.honeypot) {
    console.log('Spam detected')
    return
  }

  if (!validateForm()) {
    errorMessage.value = 'Please fix the errors above and try again.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  showSuccess.value = false

  try {
    // Sanitize inputs
    const sanitizedForm = {
      fullName: sanitizeInput(form.value.fullName),
      email: sanitizeInput(form.value.email),
      phone: sanitizeInput(form.value.phone),
      company: sanitizeInput(form.value.company),
      projectType: form.value.projectType,
      budget: form.value.budget,
      contactMethod: form.value.contactMethod,
      timeline: form.value.timeline,
      description: sanitizeInput(form.value.description)
    }

    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

    // Send email
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        to_email: 'hello@nusasoftware.com',
        from_name: sanitizedForm.fullName,
        from_email: sanitizedForm.email,
        phone: sanitizedForm.phone,
        company: sanitizedForm.company,
        project_type: sanitizedForm.projectType,
        budget: sanitizedForm.budget,
        contact_method: sanitizedForm.contactMethod,
        timeline: sanitizedForm.timeline,
        description: sanitizedForm.description,
        submission_date: new Date().toLocaleString()
      }
    )

    successMessage.value = `Thank you ${sanitizedForm.fullName}! Your project inquiry has been received.`
    showSuccess.value = true

    // Reset form
    form.value = {
      honeypot: '',
      fullName: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      contactMethod: 'email',
      timeline: '1-3-months',
      description: ''
    }

    // Clear success message after 10 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 10000)

  } catch (error) {
    console.error('Error sending email:', error)
    errorMessage.value = 'Sorry, there was an error sending your message. Please try again or contact us directly via WhatsApp.'
  } finally {
    loading.value = false

    // Clear error message after 5 seconds
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  }
}
</script>