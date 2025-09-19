<template>
  <div>
    <Header @open-contact="scrollToContact" />

    <main class="pt-16">
      <div class="py-20 px-8 max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-center mb-8">{{ t('nav.products') }}</h1>
        <p class="text-lg text-gray-600 text-center">Coming soon...</p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'

const { t } = useI18n()

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>