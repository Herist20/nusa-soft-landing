<template>
  <section id="hero" class="min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="animate-slide-up">
          <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Ideas Into
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Digital Reality</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 mb-8">
            Professional web and mobile app development services. We build scalable, user-friendly solutions that drive your business forward.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="$emit('openContact')" class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Start Your Project
            </button>
            <a href="#portfolio" class="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center">
              View Portfolio
            </a>
          </div>
          <div class="mt-8 flex items-center gap-8">
            <div>
              <p class="text-3xl font-bold text-primary">50+</p>
              <p class="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-secondary">98%</p>
              <p class="text-gray-600">Client Satisfaction</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-accent">24/7</p>
              <p class="text-gray-600">Support</p>
            </div>
          </div>
        </div>
        <div class="relative animate-fade-in">
          <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl transform rotate-6 opacity-20"></div>
          <div class="relative bg-white rounded-3xl shadow-2xl p-8">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">Clean Code</h3>
                  <p class="text-sm text-gray-600">Maintainable and scalable solutions</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">Mobile Responsive</h3>
                  <p class="text-sm text-gray-600">Perfect on all devices</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">Fast Performance</h3>
                  <p class="text-sm text-gray-600">Optimized for speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['openContact'])
</script>