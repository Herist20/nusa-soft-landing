<template>
  <div>
    <Header />

    <main class="pt-16">
      <Contact />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import Contact from '../components/sections/Contact.vue'
</script>