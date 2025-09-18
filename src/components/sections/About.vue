<template>
  <section id="about" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="font-sans text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
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
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">5+</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">Years Experience</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">150+</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">Happy Clients</p>
            </div>
          </div>
          <div class="space-y-4 mt-8">
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">Projects Delivered</p>
            </div>
            <div class="bg-white rounded-xl shadow-sm p-6 transition-shadow duration-200 hover:shadow-md">
              <div class="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <p class="text-gray-600 text-sm uppercase tracking-wide">Team Members</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Team Section -->
      <div class="mt-20">
        <h3 class="font-sans text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Team
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="member in team" :key="member.name" class="bg-white rounded-xl shadow-sm p-6 text-center transition-shadow duration-200 hover:shadow-md">
            <div class="mb-4">
              <img :src="member.image" :alt="member.name" class="w-20 h-20 rounded-lg mx-auto object-cover">
            </div>
            <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h4>
            <p class="text-blue-600 font-medium text-sm mb-3">{{ member.role }}</p>
            <p class="text-gray-600 text-sm">{{ member.description || 'Passionate about creating exceptional digital experiences.' }}</p>
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