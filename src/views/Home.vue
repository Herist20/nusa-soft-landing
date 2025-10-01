<template>
  <div>
    <Header @open-contact="scrollToContact" />
    
    <main>
      <Hero @open-contact="scrollToContact" />
      <Portfolio @open-project="openProjectModal" />
      <Pricing />
      <!-- <Testimonials /> -->
      <Contact />
    </main>
    
    <Footer />

    <!-- WhatsApp Floating Button -->
    <WhatsAppFloat />

    <!-- Project Modal -->
    <Modal v-model="projectModalOpen" size="lg" :title="selectedProject?.title">
      <div v-if="selectedProject" class="space-y-4">
        <img :src="selectedProject.image" :alt="selectedProject.title" class="w-full h-64 object-cover rounded-lg">
        <p class="text-gray-600">{{ selectedProject.description }}</p>
        <div>
          <h4 class="font-semibold mb-2">{{ t('portfolio.technologies') || 'Technologies Used:' }}</h4>
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
          <Button variant="outline" @click="projectModalOpen = false">{{ t('common.close') }}</Button>
          <Button variant="primary">{{ t('portfolio.liveDemo') }}</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import Hero from '../components/sections/Hero.vue'
import Portfolio from '../components/sections/Portfolio.vue'
import Pricing from '../components/sections/Pricing.vue'
// import Testimonials from '../components/sections/Testimonials.vue'
import Contact from '../components/sections/Contact.vue'
import Modal from '../components/ui/Modal.vue'
import Button from '../components/ui/Button.vue'
import WhatsAppFloat from '../components/ui/WhatsAppFloat.vue'

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