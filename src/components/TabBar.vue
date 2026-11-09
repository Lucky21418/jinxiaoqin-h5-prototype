<template>
  <nav class="tabbar">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="tab-item"
      :class="{ active: isActive(item) }"
    >
      <span class="tab-icon">{{ item.icon }}</span>
      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const items = [
  { to: '/', label: '办事服务', icon: '办', tab: 'service' },
  { to: '/records', label: '我的', icon: '我', tab: 'mine' },
  { to: '/more', label: '更多', icon: '多', tab: 'more' },
]

function isActive(item) {
  return route.meta.tab === item.tab || route.path === item.to
}
</script>

<style scoped>
.tabbar {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #fff;
  border-top: 1px solid var(--border);
  padding-bottom: var(--safe-bottom);
  z-index: 50;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 56px;
  font-size: 11px;
  color: var(--text-muted);
}
.tab-item.active { color: var(--primary); font-weight: 600; }
.tab-icon {
  width: 22px;
  height: 22px;
  border-radius: 8px;
  background: var(--bg);
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}
.tab-item.active .tab-icon { background: var(--primary-light); }
</style>
