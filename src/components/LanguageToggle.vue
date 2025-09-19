<template>
  <div class="language-toggle" @click="toggleLanguage">
    <div class="toggle-track">
      <div class="toggle-option" :class="{ active: currentLocale === 'id' }">
        <span class="flag">🇮🇩</span>
      </div>
      <div class="toggle-option" :class="{ active: currentLocale === 'en' }">
        <span class="flag">🇬🇧</span>
      </div>
      <div
        class="toggle-slider"
        :style="{ transform: `translateX(${currentLocale === 'en' ? '100%' : '0'})` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { currentLocale, changeLanguage } = useLanguage()

const languages = ref([
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
])

const isAnimating = ref(false)

const toggleLanguage = async () => {
  const newLang = currentLocale.value === 'id' ? 'en' : 'id'
  const scrollPosition = window.scrollY

  await changeLanguage(newLang)

  setTimeout(() => {
    window.scrollTo(0, scrollPosition)
  }, 100)
}
</script>

<style scoped>
.language-toggle {
  cursor: pointer;
}

.toggle-track {
  position: relative;
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 3px;
  width: 80px;
  height: 36px;
}

.toggle-option {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  transition: all 0.3s ease;
}

.toggle-option.active {
  color: white;
}

.toggle-slider {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(50% - 3px);
  height: calc(100% - 6px);
  background: #3b82f6;
  border-radius: 9px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.flag {
  font-size: 1.125rem;
  line-height: 1;
  transition: transform 0.2s ease;
  text-align: center;
  width: 100%;
}

.toggle-option.active .flag {
  transform: scale(1.1);
}
</style>