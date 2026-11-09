<template>
  <div class="app-shell">
    <DemoBar />
    <main class="app-main">
      <router-view />
    </main>
    <TabBar v-if="showTab" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DemoBar from './components/DemoBar.vue'
import TabBar from './components/TabBar.vue'

const route = useRoute()
const showTab = computed(() => route.meta.tab !== false)
</script>
