<template>
  <section id="testimonials" class="py-16 lg:py-24 relative overflow-hidden">
    <!-- Background futuristik -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 z-0"></div>

    <!-- Grid pattern futuristik -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>

    <!-- Elemen geometris -->
    <div class="absolute top-1/4 left-10 w-32 h-32 border-2 border-cyan-400 rounded-full opacity-20 animate-pulse-slow"></div>
    <div class="absolute bottom-1/4 right-10 w-40 h-40 border-2 border-indigo-400 rotate-45 opacity-20 animate-pulse-slow"></div>

    <!-- Glow effect -->
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center px-4 py-2 bg-cyan-900/30 backdrop-blur-sm border border-cyan-700/50 rounded-full mb-4">
          <span class="text-cyan-300 font-semibold text-sm">{{ t('testimonials.badge') }}</span>
        </div>
        <h2 class="font-sans text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-6">
          {{ t('testimonials.title') }}
        </h2>
        <p class="text-xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed">
          {{ t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Smartphone and Client Profile Container -->
      <div v-if="testimonials && testimonials.length > 0" class="relative max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <!-- Smartphone Section -->
          <div class="relative max-w-md mx-auto lg:mx-0"
               @mouseenter="pauseAutoSlide"
               @mouseleave="resumeAutoSlide">
            <!-- Phone Frame dengan animasi transisi -->
            <div ref="containerRef"
                 class="relative mx-auto phone-container transition-all duration-500 ease-in-out"
                 style="max-width: 375px;"
                 :class="{ 'phone-slide-out': isTransitioning, 'phone-loading': isLoading }"
                 @touchstart="handleTouchStart"
                 @touchend="handleTouchEnd">
          <!-- Phone Shell dengan glow effect yang lebih realistis -->
          <div class="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] shadow-2xl p-2 border-2 border-slate-700 phone-frame">
            <!-- Phone bezel dengan refleksi -->
            <div class="absolute inset-1 bg-gradient-to-br from-slate-600/20 to-transparent rounded-[2.8rem] pointer-events-none"></div>

            <!-- Home indicator area -->
            <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-600 rounded-full z-10"></div>

            <!-- Screen dengan realistic glow -->
            <div class="relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[2.5rem] overflow-hidden border border-slate-600 screen-glow">
              <!-- Status Bar dengan notch -->
              <div class="relative bg-gradient-to-r from-cyan-500 to-blue-500 pt-2 px-4">
                <!-- Phone notch -->
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10 flex items-center justify-center space-x-3">
                  <!-- Speaker -->
                  <div class="w-10 h-1.5 bg-slate-600 rounded-full"></div>
                  <!-- Camera -->
                  <div class="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
                </div>

                <!-- Status info positioned to the right of notch -->
                <div class="flex justify-end pt-1 pb-1">
                  <div class="flex items-center space-x-1">
                    <!-- Signal bars -->
                    <div class="flex items-end space-x-0.5">
                      <div class="w-0.5 h-1 bg-white rounded-full"></div>
                      <div class="w-0.5 h-1.5 bg-white rounded-full"></div>
                      <div class="w-0.5 h-2 bg-white rounded-full"></div>
                      <div class="w-0.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    <!-- WiFi icon -->
                    <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.24 0 1 1 0 01-1.415-1.414 5 5 0 017.07 0 1 1 0 01-1.415 1.414zM9 16a1 1 0 112 0 1 1 0 01-2 0z"/>
                    </svg>
                    <!-- Battery -->
                    <div class="w-4 h-2 border border-white rounded-sm relative">
                      <div class="absolute inset-0.5 bg-white rounded-sm w-3/4"></div>
                      <div class="absolute -right-0.5 top-0.5 w-0.5 h-1 bg-white rounded-r-sm"></div>
                    </div>
                    <!-- Time -->
                    <div class="text-white text-xs font-medium">{{ currentTime }}</div>
                  </div>
                </div>
              </div>

              <!-- Chat Header Bar -->
              <div class="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 flex items-center justify-between border-b border-cyan-400/30">
                <!-- Left side: Back arrow and contact info -->
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <!-- Contact avatar -->
                  <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-semibold">{{ currentTestimonial?.name?.charAt(0) || 'N' }}</span>
                  </div>
                  <!-- Contact name and status -->
                  <div>
                    <div class="text-white font-medium text-sm slide-text">{{ currentTestimonial?.name || 'Demo User' }}</div>
                    <div class="text-white/80 text-xs">online</div>
                  </div>
                </div>

                <!-- Right side: Call and menu icons -->
                <div class="flex items-center space-x-4">
                  <!-- Phone call icon -->
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <!-- Three dots menu -->
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
              </div>

              <!-- Chat Container dengan background yang lebih terang -->
              <div class="bg-gray-100 p-4 h-[520px] overflow-y-auto custom-scrollbar chat-container transition-opacity duration-300"
                   :class="{ 'opacity-50': isLoading }">
                <!-- Date -->
                <div class="text-center mb-6">
                  <span class="inline-block px-4 py-2 bg-gray-300 text-gray-700 text-xs rounded-full shadow-sm font-medium">
                    {{ currentTestimonial?.date || 'Today' }}
                  </span>
                </div>

                <!-- Chat Messages dengan safe access -->
                <div class="space-y-6 chat-messages transition-all duration-500 ease-in-out"
                     :key="currentIndex"
                     :class="{ 'transform translate-y-2 opacity-75': isTransitioning }">
                  <!-- Customer Message -->
                  <div class="flex justify-end">
                    <div class="max-w-[80%]">
                      <div class="bg-blue-500 text-white p-3 rounded-3xl rounded-tr-lg shadow-xl border-2 border-blue-400">
                        <p class="text-sm leading-relaxed font-medium">{{ currentTestimonial?.initialMessage || 'Loading...' }}</p>
                      </div>
                      <div class="text-xs text-gray-600 text-right mt-1.5 flex items-center justify-end space-x-2">
                        <span class="font-medium">{{ currentTestimonial?.time1 || '10:00' }}</span>
                        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Nusa Response -->
                  <div class="flex justify-start">
                    <div class="max-w-[80%]">
                      <div class="bg-white text-gray-900 p-3 rounded-3xl rounded-tl-lg shadow-xl border-2 border-gray-300">
                        <p class="text-sm leading-relaxed font-medium">{{ currentTestimonial?.response || 'Loading...' }}</p>
                      </div>
                      <div class="text-xs text-gray-600 mt-1.5 flex items-center space-x-2">
                        <span class="font-medium">{{ currentTestimonial?.time2 || '10:05' }}</span>
                        <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Customer Testimonial -->
                  <div class="flex justify-end">
                    <div class="max-w-[80%]">
                      <div class="bg-blue-500 text-white p-3 rounded-3xl rounded-tr-lg shadow-xl border-2 border-blue-400">
                        <p class="text-sm leading-relaxed font-medium">{{ currentTestimonial?.testimonial || 'Loading...' }}</p>
                      </div>
                      <div class="text-xs text-gray-600 text-right mt-1.5 flex items-center justify-end space-x-2">
                        <span class="font-medium">{{ currentTestimonial?.time3 || '10:10' }}</span>
                        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Rating Stars if exists -->
                  <div v-if="currentTestimonial?.rating" class="flex justify-end">
                    <div class="max-w-[80%]">
                      <div class="bg-blue-500 text-white p-3 rounded-3xl rounded-tr-lg shadow-xl border-2 border-blue-400">
                        <div class="flex space-x-1.5 items-center justify-center">
                          <svg v-for="n in 5" :key="n"
                               class="w-4 h-4 transition-transform hover:scale-110"
                               :class="n <= currentTestimonial.rating ? 'text-yellow-300' : 'text-blue-300'"
                               fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div class="text-xs text-gray-600 text-right mt-1.5 flex items-center justify-end space-x-2">
                        <span class="font-medium">{{ currentTestimonial?.time4 || '10:11' }}</span>
                        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Input Bar -->
              <div class="bg-gray-200 border-t border-gray-300 px-3 py-2">
                <div class="flex items-center space-x-2">
                  <!-- Attachment icon -->
                  <button class="text-gray-500 hover:text-cyan-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <!-- Text input -->
                  <input type="text"
                         class="flex-1 bg-white border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                         :placeholder="t('testimonials.messagePlaceholder')"
                         disabled>
                  <!-- Camera icon -->
                  <button class="text-gray-500 hover:text-cyan-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <!-- Send button -->
                  <button class="text-cyan-500 hover:text-cyan-600 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


            <!-- Navigation Buttons -->
            <template v-if="testimonials && testimonials.length > 1">
              <button @click="previousTestimonial"
                      :disabled="isTransitioning || isLoading"
                      class="absolute -left-6 lg:-left-7 top-1/2 -translate-y-1/2 bg-gray-800/90 border border-cyan-500/40 p-3 rounded-full shadow-xl shadow-cyan-500/30 navigation-button group transition-all duration-200"
                      :class="{ 'opacity-50 cursor-not-allowed': isTransitioning || isLoading, 'hover:scale-105': !(isTransitioning || isLoading) }">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button @click="nextTestimonial"
                      :disabled="isTransitioning || isLoading"
                      class="absolute -right-6 lg:-right-7 top-1/2 -translate-y-1/2 bg-gray-800/90 border border-cyan-500/40 p-3 rounded-full shadow-xl shadow-cyan-500/30 navigation-button group transition-all duration-200"
                      :class="{ 'opacity-50 cursor-not-allowed': isTransitioning || isLoading, 'hover:scale-105': !(isTransitioning || isLoading) }">
                <svg class="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </template>
          </div>

          <!-- Client Profile Section -->
          <div v-if="currentTestimonial"
               class="space-y-6 flex flex-col justify-center min-h-[600px] transition-all duration-500 ease-in-out"
               :class="{ 'transform translate-x-4 opacity-75': isTransitioning }"
               @mouseenter="pauseAutoSlide"
               @mouseleave="resumeAutoSlide">
            <!-- Client Header -->
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                <span class="text-white text-2xl font-bold">{{ currentTestimonial.name?.charAt(0) || 'N' }}</span>
              </div>
              <h3 class="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mb-2">
                {{ currentTestimonial.name }}
              </h3>
              <div class="inline-flex items-center px-4 py-1.5 bg-cyan-900/40 backdrop-blur-sm border border-cyan-700/50 rounded-full mb-2">
                <span class="text-cyan-300 font-medium text-sm">{{ currentTestimonial.position }}</span>
              </div>
              <p class="text-cyan-100/70 text-sm">{{ currentTestimonial.company }}</p>
            </div>

            <!-- Project Info -->
            <div class="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-cyan-700/30 rounded-xl p-6">
              <div class="text-center mb-4">
                <div class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full mb-2">
                  <span class="text-cyan-300 font-semibold text-sm">{{ currentTestimonial.projectType }}</span>
                </div>
                <div class="flex justify-center items-center space-x-4 text-sm">
                  <div class="flex items-center space-x-1">
                    <div class="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span class="text-cyan-100">{{ currentTestimonial.duration }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="flex space-x-0.5">
                      <svg v-for="n in currentTestimonial.rating" :key="n"
                           class="w-3 h-3 text-yellow-400"
                           fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Client Testimonial Quote -->
              <div class="relative">
                <div class="absolute -top-2 -left-2 text-cyan-400/30">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <blockquote class="text-cyan-100/90 text-center leading-relaxed italic font-medium pl-4">
                  "{{ currentTestimonial.impression }}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots Indicator -->
      <div v-if="testimonials && testimonials.length > 1" class="flex justify-center space-x-2 mt-8">
        <button v-for="(testimonial, index) in testimonials"
                :key="index"
                @click="!isTransitioning && !isLoading && (currentIndex = index)"
                :disabled="isTransitioning || isLoading"
                class="h-2 rounded-full dots-indicator transition-all duration-300"
                :class="[
                  currentIndex === index ? 'bg-gradient-to-r from-cyan-400 to-blue-400 w-8' : 'bg-gray-600 w-2',
                  { 'opacity-50 cursor-not-allowed': isTransitioning || isLoading, 'hover:bg-cyan-500': !(isTransitioning || isLoading) && currentIndex !== index }
                ]">
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex justify-center mt-4">
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>

      <!-- Swipe Hint for Mobile -->
      <div class="lg:hidden text-center mt-4">
        <p class="text-cyan-300/60 text-xs">
          <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Swipe to navigate
          <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentIndex = ref(0)
const isTransitioning = ref(false)
const isLoading = ref(false)
const containerRef = ref(null)

const testimonials = computed(() => {
  try {
    const items = t('testimonials.items')
    console.log('Testimonials from locale:', items)
    console.log('Type of items:', typeof items)
    console.log('Is array:', Array.isArray(items))

    // Cek juga apakah t function bekerja
    console.log('t function works:', t('testimonials.title'))

    // Gunakan data dari locale jika ada dan valid
    if (items && Array.isArray(items) && items.length > 0) {
      return items
    }

    // Fallback dengan data profesional jika locale tidak ada
    return [
      {
        name: "Budi Santoso",
        position: "CEO & Founder",
        company: "PT. Maju Bersama",
        projectType: "Company Profile Website",
        duration: "3 weeks",
        impression: "Tim Nusa Software sangat profesional dan responsif. Mereka memahami kebutuhan bisnis saya dengan baik dan memberikan solusi yang tepat. Website yang dibuat sangat membantu meningkatkan citra perusahaan.",
        date: "Hari ini",
        time1: "09:15",
        time2: "09:18",
        time3: "09:25",
        time4: "09:26",
        initialMessage: "Halo tim Nusa Software, saya butuh website company profile untuk perusahaan saya. Bisa dibantu?",
        response: "Tentu bisa Pak Budi! Kami siap membantu membuat website company profile yang profesional. Tim kami akan segera menghubungi Bapak untuk diskusi lebih lanjut.",
        testimonial: "Pelayanan luar biasa! Website selesai tepat waktu dengan hasil yang sangat memuaskan. Tim sangat responsif dan profesional. Highly recommended! 👍",
        rating: 5
      },
      {
        name: "Siti Nurhaliza",
        position: "Owner",
        company: "Toko Fashion Cantik",
        projectType: "E-commerce Website",
        duration: "4 weeks",
        impression: "Luar biasa! Toko online yang dibuat sangat user-friendly dan fitur-fiturnya lengkap. Customer service yang excellent dan proses development yang transparan. Highly recommended untuk UMKM yang ingin go digital.",
        date: "Kemarin",
        time1: "14:30",
        time2: "14:35",
        time3: "14:45",
        time4: "14:46",
        initialMessage: "Saya ingin membuat toko online untuk bisnis fashion saya. Apakah bisa include dengan payment gateway?",
        response: "Bisa sekali Bu Siti! Kami akan buatkan toko online lengkap dengan payment gateway, sistem inventory, dan fitur-fitur e-commerce lainnya.",
        testimonial: "Toko online saya sekarang sangat membantu penjualan! Orderan meningkat 300% sejak launching. Fitur-fiturnya lengkap dan mudah digunakan. Terima kasih Nusa Software!",
        rating: 5
      },
      {
        name: "Ahmad Fauzi",
        position: "Mahasiswa",
        company: "Universitas Teknologi",
        projectType: "Academic Information System",
        duration: "6 weeks",
        impression: "Tim yang sangat sabar dan membantu. Mereka tidak hanya mengerjakan sistem tapi juga memberikan edukasi dan mentoring. Dokumentasi yang diberikan sangat lengkap dan membantu saya memahami setiap detail sistem.",
        date: "2 hari lalu",
        time1: "19:00",
        time2: "19:05",
        time3: "19:15",
        time4: "19:16",
        initialMessage: "Mas, saya butuh bantuan untuk skripsi sistem informasi akademik. Bisa konsultasi dulu?",
        response: "Tentu bisa mas Ahmad! Kami punya paket khusus untuk mahasiswa. Bisa konsultasi gratis dulu untuk diskusi requirement sistemnya.",
        testimonial: "Alhamdulillah skripsi saya lancar berkat bantuan tim Nusa Software. Sistem berjalan sempurna, dokumentasi lengkap, dan bimbingannya sangat membantu. Lulus tepat waktu dengan nilai A!",
        rating: 5
      }
    ]
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return []
  }
})

const currentTestimonial = computed(() => {
  if (!testimonials.value || testimonials.value.length === 0) return null
  return testimonials.value[currentIndex.value] || testimonials.value[0]
})

// Current time for status bar
const currentTime = computed(() => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
})

const nextTestimonial = () => {
  if (isTransitioning.value || isLoading.value || !testimonials.value || testimonials.value.length === 0) return

  isTransitioning.value = true
  isLoading.value = true

  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
    setTimeout(() => {
      isTransitioning.value = false
      isLoading.value = false
    }, 150)
  }, 300)
}

const previousTestimonial = () => {
  if (isTransitioning.value || isLoading.value || !testimonials.value || testimonials.value.length === 0) return

  isTransitioning.value = true
  isLoading.value = true

  setTimeout(() => {
    currentIndex.value = currentIndex.value === 0 ? testimonials.value.length - 1 : currentIndex.value - 1
    setTimeout(() => {
      isTransitioning.value = false
      isLoading.value = false
    }, 150)
  }, 300)
}

// Touch/Swipe handling
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const difference = touchStartX.value - touchEndX.value

  if (Math.abs(difference) > swipeThreshold) {
    if (difference > 0) {
      // Swipe left - next
      nextTestimonial()
    } else {
      // Swipe right - previous
      previousTestimonial()
    }
  }
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    previousTestimonial()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextTestimonial()
  }
}

// Auto slide with pause on hover
let autoSlideInterval
let isPaused = ref(false)

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (!isPaused.value) {
      nextTestimonial()
    }
  }, 8000) // Increased to 8 seconds for better readability
}

const pauseAutoSlide = () => {
  isPaused.value = true
}

const resumeAutoSlide = () => {
  isPaused.value = false
}

onMounted(() => {
  console.log('Testimonials component mounted')
  console.log('Testimonials data:', testimonials.value)
  console.log('Current testimonial:', currentTestimonial.value)

  // Add keyboard event listener
  document.addEventListener('keydown', handleKeydown)

  // Start auto slide
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Phone frame animations - subtle glow */
.phone-frame {
  animation: phoneGlow 4s ease-in-out infinite alternate;
}

@keyframes phoneGlow {
  0% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.1), 0 0 30px rgba(6, 182, 212, 0.05);
    transform: translateY(0px);
  }
  100% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.15), 0 0 40px rgba(6, 182, 212, 0.08);
    transform: translateY(-2px);
  }
}

.screen-glow {
  box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.1);
}

/* Phone container slide animations - enhanced */
.phone-container {
  transform: translateX(0) scale(1);
}

.phone-slide-out {
  transform: translateX(15px) scale(0.98);
  opacity: 0.85;
}

.phone-loading {
  transform: scale(0.99);
  opacity: 0.9;
}

/* Enhanced smooth transitions */
.chat-messages {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading state animations */
.phone-loading {
  animation: phoneLoading 1s ease-in-out infinite alternate;
}

@keyframes phoneLoading {
  0% {
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.1);
  }
  100% {
    box-shadow: 0 0 25px rgba(6, 182, 212, 0.2);
  }
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(156, 163, 175, 0.2);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.5);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.7);
}

/* Status bar text smooth transition */
.slide-text {
  transition: all 0.5s ease;
}

/* Navigation button enhancements - more subtle */
.navigation-button {
  backdrop-filter: blur(10px);
  transition: all 0.2s ease-in-out;
  transform: scale(1);
}

.navigation-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(6, 182, 212, 0.2);
}

.navigation-button:active {
  transform: scale(0.95);
}

/* Enhanced dots indicator animation */
.dots-indicator {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dots-indicator:hover:not(:disabled) {
  transform: scale(1.2);
}

/* Accessibility improvements */
.navigation-button:focus {
  outline: 2px solid rgba(6, 182, 212, 0.5);
  outline-offset: 2px;
}

.dots-indicator:focus {
  outline: 2px solid rgba(6, 182, 212, 0.5);
  outline-offset: 2px;
}

/* Phone container responsive */
@media (max-width: 640px) {
  .phone-container {
    max-width: 320px !important;
  }

  .phone-slide-out {
    transform: translateX(15px) scale(0.98);
  }
}

/* Navigation buttons responsive */
@media (max-width: 768px) {
  .navigation-button {
    position: fixed !important;
    z-index: 50;
    top: 50% !important;
    transform: translateY(-50%);
  }

  .navigation-button:first-of-type {
    left: 1rem !important;
  }

  .navigation-button:last-of-type {
    right: 1rem !important;
  }
}

/* Floating animation for phone - more subtle */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(0.5deg); }
}

.phone-container:hover .phone-frame {
  animation: float 2s ease-in-out infinite;
}
</style>