<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Global transition styles for language switching */
.language-transitioning {
  transition: all 0.3s ease-in-out;
}

.language-transitioning * {
  transition: opacity 0.2s ease-in-out;
}

/* Smooth page transitions */
.router-enter-active,
.router-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.router-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.router-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Loading state for language transitions */
.language-loading {
  position: relative;
  overflow: hidden;
}

.language-loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  animation: loading 1.5s infinite;
  z-index: 9999;
}

@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Enhanced focus states for accessibility */
.language-toggle button:focus-visible,
.mobile-language-toggle button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .language-transitioning,
  .language-transitioning *,
  .router-enter-active,
  .router-leave-active,
  .toggle-slider,
  .chevron {
    transition: none !important;
    animation: none !important;
  }
}
</style>
