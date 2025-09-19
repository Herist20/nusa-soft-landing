<template>
  <div>
    <Header @open-contact="scrollToContact" />

    <main class="pt-16">
      <Services />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import Services from '../components/sections/Services.vue'

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>