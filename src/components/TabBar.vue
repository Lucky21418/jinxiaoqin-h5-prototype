<template>
  <nav class="tabbar">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="tab-item"
      :class="{ active: isActive(item) }"
    >
      <span class="tab-icon" v-html="item.icon"></span>
      <span>{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const items = [
  {
    to: '/',
    label: '首页',
    tab: 'home',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" fill="currentColor"/></svg>',
  },
  {
    to: '/records',
    label: '我的记录',
    tab: 'records',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 1.5V9h4.5L14 4.5zM8 12h8v1.5H8V12zm0 3.5h8V17H8v-1.5z" fill="currentColor"/></svg>',
  },
  {
    to: '/account',
    label: '个人中心',
    tab: 'account',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.2 0-7.5 2.1-7.5 4.7V21h15v-2.3c0-2.6-3.3-4.7-7.5-4.7z" fill="currentColor"/></svg>',
  },
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
  border-top: 1px solid #eef1f5;
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
  min-height: 56px;
  font-size: 11px;
  color: #9aa3af;
}
.tab-item.active { color: var(--primary); font-weight: 600; }
.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
