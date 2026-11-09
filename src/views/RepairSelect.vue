<template>
  <div class="page">
    <button class="nav-back" type="button" @click="$router.back()">← 返回</button>
    <h1 class="page-title">报修服务</h1>
    <p class="page-sub">请先选择报修类型</p>
    <div class="card choice" @click="go('房屋')">
      <div class="title">房屋报修</div>
      <div class="desc">渗漏、墙面、门窗等 · 归口房车科</div>
    </div>
    <div class="card choice" @click="go('设备')">
      <div class="title">设备报修</div>
      <div class="desc">办公设备、空调、电梯等 · 归口物业</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function go(type) {
  router.push({ path: '/repair/apply', query: { type } })
}
</script>

<style scoped>
.choice { cursor: pointer; }
.choice:active { background: var(--primary-light); }
.title { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
.desc { font-size: 13px; color: var(--text-secondary); }
</style>
