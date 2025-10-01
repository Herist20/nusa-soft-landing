<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Floating WhatsApp Button -->
    <div class="relative">
      <!-- Main Button -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Chat with us on WhatsApp"
      >
        <!-- Pulse Animation Ring -->
        <div class="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>

        <!-- WhatsApp Icon -->
        <svg class="relative z-10 w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>

        <!-- Notification Badge -->
        <div v-if="showNotification" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span class="text-xs font-bold text-white">!</span>
        </div>
      </a>

      <!-- Quick Message Options -->
      <div
        v-show="showQuickOptions"
        class="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 transform transition-all duration-300 origin-bottom-right"
        :class="showQuickOptions ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
      >
        <div class="p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900">{{ t('whatsapp.quickMessage.title') }}</h3>
            <button
              @click="showQuickOptions = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-2">
            <a
              v-for="option in quickMessageOptions"
              :key="option.id"
              :href="option.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
            >
              <div class="flex items-center">
                <span class="text-2xl mr-3">{{ option.icon }}</span>
                <div>
                  <h4 class="font-medium text-gray-900 group-hover:text-green-700">{{ option.title }}</h4>
                  <p class="text-sm text-gray-600">{{ option.description }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Toggle Quick Options Button -->
      <button
        @click="toggleQuickOptions"
        class="absolute -top-12 right-0 w-10 h-10 bg-white border-2 border-green-500 text-green-500 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300"
        :class="{ 'rotate-45': showQuickOptions }"
        aria-label="Show quick message options"
      >
        <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  phoneNumber: {
    type: String,
    default: '6287860628412'
  },
  showNotificationBadge: {
    type: Boolean,
    default: true
  }
})

// Component state
const showQuickOptions = ref(false)
const showNotification = ref(false)

// Computed properties
const whatsappUrl = computed(() => {
  const message = encodeURIComponent(t('whatsapp.messages.default'))
  return `https://wa.me/${props.phoneNumber}?text=${message}`
})

const quickMessageOptions = computed(() => [
  {
    id: 'general',
    icon: '💬',
    title: t('whatsapp.quickMessage.general.title'),
    description: t('whatsapp.quickMessage.general.description'),
    url: `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(t('whatsapp.quickMessage.general.message'))}`
  },
  {
    id: 'web-dev',
    icon: '🌐',
    title: t('whatsapp.quickMessage.webDev.title'),
    description: t('whatsapp.quickMessage.webDev.description'),
    url: `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(t('whatsapp.quickMessage.webDev.message'))}`
  },
  {
    id: 'mobile-app',
    icon: '📱',
    title: t('whatsapp.quickMessage.mobileApp.title'),
    description: t('whatsapp.quickMessage.mobileApp.description'),
    url: `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(t('whatsapp.quickMessage.mobileApp.message'))}`
  },
  {
    id: 'quote',
    icon: '💰',
    title: t('whatsapp.quickMessage.quote.title'),
    description: t('whatsapp.quickMessage.quote.description'),
    url: `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(t('whatsapp.quickMessage.quote.message'))}`
  },
  {
    id: 'consultation',
    icon: '🤝',
    title: t('whatsapp.quickMessage.consultation.title'),
    description: t('whatsapp.quickMessage.consultation.description'),
    url: `https://wa.me/${props.phoneNumber}?text=${encodeURIComponent(t('whatsapp.quickMessage.consultation.message'))}`
  }
])

// Methods
const toggleQuickOptions = () => {
  showQuickOptions.value = !showQuickOptions.value
  if (showQuickOptions.value) {
    showNotification.value = false
  }
}

// Show notification badge after a delay
const showNotificationBadge = () => {
  if (props.showNotificationBadge) {
    setTimeout(() => {
      showNotification.value = true
    }, 3000)
  }
}

// Hide notification badge and show tooltip periodically
const startNotificationCycle = () => {
  setInterval(() => {
    if (!showQuickOptions.value) {
      showNotification.value = true
      setTimeout(() => {
        showNotification.value = false
      }, 2000)
    }
  }, 15000) // Show notification every 15 seconds
}

// Handle click outside to close quick options
const handleClickOutside = (event) => {
  if (showQuickOptions.value && !event.target.closest('.fixed.bottom-6.right-6')) {
    showQuickOptions.value = false
  }
}

// Lifecycle
onMounted(() => {
  showNotificationBadge()
  startNotificationCycle()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  80% {
    transform: scale(1.2);
    opacity: 0;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.animate-ping {
  animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>