<template>
  <div>
    <Header @open-contact="scrollToContact" />

    <main class="pt-16">
      <Portfolio @open-project="openProjectModal" />
    </main>

    <Footer />

    <!-- Project Modal -->
    <Modal v-model="projectModalOpen" size="lg" :title="selectedProject?.title">
      <div v-if="selectedProject" class="space-y-4">
        <img :src="selectedProject.image" :alt="selectedProject.title" class="w-full h-64 object-cover rounded-lg">
        <p class="text-gray-600">{{ selectedProject.description }}</p>
        <div>
          <h4 class="font-semibold mb-2">Technologies Used:</h4>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in selectedProject.technologies" :key="tech"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-4">
          <Button variant="outline" @click="projectModalOpen = false">Close</Button>
          <Button variant="primary">View Live Demo</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import Portfolio from '../components/sections/Portfolio.vue'
import Modal from '../components/ui/Modal.vue'
import Button from '../components/ui/Button.vue'

const projectModalOpen = ref(false)
const selectedProject = ref(null)

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const openProjectModal = (project) => {
  selectedProject.value = project
  projectModalOpen.value = true
}
</script>