<template>
  <div>
    <Header @open-contact="scrollToContact" />

    <main class="pt-16">
      <About />
      <Team />
      <Process @open-contact="scrollToContact" />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import About from '../components/sections/About.vue'
import Team from '../components/sections/Team.vue'
import Process from '../components/sections/Process.vue'

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>