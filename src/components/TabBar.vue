<template>
  <nav class="tabbar">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="tab-item"
      :class="{ active: isActive(item) }"
    >
      <AppIcon :icon="item.icon" :size="22" :stroke-width="isActive(item) ? 2.4 : 2" />
      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import { Home, FileText, User } from '../icons'

const route = useRoute()
const items = [
  { to: '/', label: '首页', tab: 'home', icon: Home },
  { to: '/records', label: '我的记录', tab: 'records', icon: FileText },
  { to: '/account', label: '个人中心', tab: 'account', icon: User },
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
  border-top: 1px solid var(--color-border);
  padding-bottom: var(--safe-bottom);
  z-index: 50;
  box-shadow: 0 -4px 16px rgba(20, 40, 80, 0.04);
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: var(--tabbar-h);
  font-size: 11px;
  color: var(--color-text-tertiary);
}
.tab-item.active { color: var(--color-primary); font-weight: 600; }
</style>
