<template>
  <component
    :is="icon"
    class="app-icon"
    :size="size"
    :stroke-width="strokeWidth"
    :absolute-stroke-width="false"
    aria-hidden="true"
  />
</template>

<script setup>
defineProps({
  icon: { type: [Object, Function], required: true },
  size: { type: [Number, String], default: 22 },
  strokeWidth: { type: [Number, String], default: 2 },
})
</script>

<style scoped>
.app-icon {
  display: block;
  flex-shrink: 0;
}
</style>
