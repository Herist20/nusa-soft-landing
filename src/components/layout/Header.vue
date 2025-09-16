<template>
  <header>
    <Navigation @open-contact="$emit('openContact')" />
  </header>
</template>

<script setup>
import Navigation from './Navigation.vue'

defineEmits(['openContact'])
</script>