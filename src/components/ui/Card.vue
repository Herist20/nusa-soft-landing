<template>
  <div
    :class="[
      'bg-white rounded-xl overflow-hidden transition-all duration-300',
      shadow ? 'shadow-lg hover:shadow-xl' : '',
      hoverable ? 'transform hover:-translate-y-1 cursor-pointer' : '',
      className
    ]"
    @click="$emit('click', $event)"
  >
    <div v-if="$slots.image" class="aspect-w-16 aspect-h-9">
      <slot name="image"></slot>
    </div>
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-100">
      <slot name="header"></slot>
    </div>
    <div :class="['px-6 py-4', padding]">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 bg-gray-50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shadow: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script>