<template>
  <div class="page apply-page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">
        <AppIcon :icon="ArrowLeft" :size="18" /> 返回
      </button>
      <h1>报修服务</h1>
      <p>请先选择报修类型</p>
    </header>
    <button type="button" class="card choice" @click="go('房屋')">
      <IconTile :icon="Building2" color="var(--tile-orange)" />
      <div>
        <div class="title">房屋报修</div>
        <div class="desc">渗漏、墙面、门窗等 · 归口房车科</div>
      </div>
      <AppIcon :icon="ChevronRight" :size="18" class="chev" />
    </button>
    <button type="button" class="card choice" @click="go('设备')">
      <IconTile :icon="Monitor" color="var(--tile-blue)" />
      <div>
        <div class="title">设备报修</div>
        <div class="desc">办公设备、空调、电梯等 · 归口物业</div>
      </div>
      <AppIcon :icon="ChevronRight" :size="18" class="chev" />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppIcon from '../components/AppIcon.vue'
import IconTile from '../components/IconTile.vue'
import { ArrowLeft, Building2, Monitor, ChevronRight } from '../icons'
const router = useRouter()
function go(type) {
  router.push({ path: '/repair/apply', query: { type } })
}
</script>

<style scoped>
.apply-page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }
.choice {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
.choice:active { background: var(--color-primary-soft); }
.choice > div { flex: 1; min-width: 0; }
.title { font-size: var(--fs-lg); font-weight: 600; margin-bottom: 4px; }
.desc { font-size: var(--fs-sm); color: var(--color-text-secondary); }
.chev { color: var(--color-text-tertiary); }
</style>
