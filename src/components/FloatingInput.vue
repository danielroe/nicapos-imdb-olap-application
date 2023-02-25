<template>
  <div class="relative overflow-visible">
    <slot></slot>
    <b
      class="absolute top-2.5 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500"
    >
      {{ props.label }}
    </b>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
