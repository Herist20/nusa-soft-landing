<template>
  <section id="about" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Nusa Software
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            We are a passionate team of developers and designers dedicated to creating exceptional digital experiences. With years of expertise in web and mobile development, we transform ideas into powerful, user-friendly solutions.
          </p>
          <p class="text-gray-600 mb-6">
            Our approach combines technical excellence with creative innovation to deliver projects that not only meet but exceed expectations. We believe in building long-term partnerships with our clients, ensuring their digital success.
          </p>
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 class="font-semibold text-xl mb-2">Our Mission</h3>
              <p class="text-gray-600 text-sm">
                To empower businesses with cutting-edge technology solutions that drive growth and innovation.
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-xl mb-2">Our Vision</h3>
              <p class="text-gray-600 text-sm">
                To be the leading technology partner for businesses seeking digital transformation.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Expert Team</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Agile Development</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-4">
            <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div class="text-3xl font-bold text-primary mb-2">5+</div>
              <p class="text-gray-600">Years Experience</p>
            </div>
            <div class="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
              <div class="text-3xl font-bold mb-2">150+</div>
              <p>Happy Clients</p>
            </div>
          </div>
          <div class="space-y-4 mt-8">
            <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div class="text-3xl font-bold text-secondary mb-2">200+</div>
              <p class="text-gray-600">Projects Delivered</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div class="text-3xl font-bold text-accent mb-2">15+</div>
              <p class="text-gray-600">Team Members</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Team Section -->
      <div class="mt-20">
        <h3 class="font-display text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Team
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="member in team" :key="member.name" class="text-center">
            <div class="relative mb-4 group">
              <img :src="member.image" :alt="member.name" class="w-32 h-32 rounded-full mx-auto object-cover">
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div class="bg-black/60 rounded-full w-32 h-32 flex items-center justify-center">
                  <div class="flex gap-2">
                    <a href="#" class="text-white hover:text-primary transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" class="text-white hover:text-primary transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="font-semibold text-lg">{{ member.name }}</h4>
            <p class="text-gray-600 text-sm">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const team = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop'
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
  },
  {
    name: 'Sarah Williams',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop'
  }
]
</script>