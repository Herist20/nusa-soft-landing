<template>
  <section id="portfolio" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our Portfolio
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our recent projects and success stories
        </p>
      </div>
      
      <div class="flex justify-center mb-8">
        <div class="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          <button v-for="category in categories" :key="category"
                  @click="activeCategory = category"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    activeCategory === category 
                      ? 'bg-primary text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  ]">
            {{ category }}
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id"
             class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
             @click="openProject(project)">
          <div class="aspect-w-16 aspect-h-12 bg-gray-200">
            <img :src="project.image" :alt="project.title" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span class="inline-block px-3 py-1 bg-primary rounded-full text-xs mb-2">{{ project.category }}</span>
              <h3 class="font-display text-xl font-semibold mb-2">{{ project.title }}</h3>
              <p class="text-sm opacity-90">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span v-for="tech in project.technologies" :key="tech"
                      class="text-xs bg-white/20 px-2 py-1 rounded">
                  {{ tech }}
                </span>
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

const emit = defineEmits(['openProject'])

const activeCategory = ref('All')

const categories = ['All', 'Web App', 'Mobile App', 'E-Commerce', 'Corporate']

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    description: 'Modern online shopping platform with advanced features',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'Web App',
    description: 'Collaborative project management solution for teams',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    technologies: ['React', 'Firebase', 'Material-UI'],
    link: '#'
  },
  {
    id: 3,
    title: 'Fitness Tracker',
    category: 'Mobile App',
    description: 'Health and fitness tracking mobile application',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&h=400&fit=crop',
    technologies: ['React Native', 'Redux', 'Node.js'],
    link: '#'
  },
  {
    id: 4,
    title: 'Corporate Website',
    category: 'Corporate',
    description: 'Professional website for a consulting firm',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'Tailwind CSS', 'Strapi'],
    link: '#'
  },
  {
    id: 5,
    title: 'Food Delivery App',
    category: 'Mobile App',
    description: 'On-demand food delivery service application',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    technologies: ['Flutter', 'Firebase', 'Google Maps API'],
    link: '#'
  },
  {
    id: 6,
    title: 'Learning Platform',
    category: 'Web App',
    description: 'Online education and course management system',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC'],
    link: '#'
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

const openProject = (project) => {
  emit('openProject', project)
}
</script>