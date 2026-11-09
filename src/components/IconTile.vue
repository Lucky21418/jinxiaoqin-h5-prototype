<template>
  <div class="icon-tile" :style="{ background: color, width: size + 'px', height: size + 'px', borderRadius: radius + 'px' }">
    <AppIcon :icon="icon" :size="iconSize" :stroke-width="2.25" />
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: [Object, Function], required: true },
  color: { type: String, default: 'var(--tile-blue)' },
  size: { type: Number, default: 48 },
  iconSize: { type: Number, default: 24 },
  radius: { type: Number, default: 12 },
})
</script>

<style scoped>
.icon-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
.icon-tile :deep(svg) {
  color: #fff;
  stroke: #fff;
}
</style>
