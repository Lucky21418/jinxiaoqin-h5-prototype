<template>
  <div class="page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">← 返回</button>
      <h1>报修服务</h1>
      <p>请先选择报修类型</p>
    </header>
    <div class="card choice" @click="go('房屋')">
      <div class="icon" style="background:#ff8a3d">房</div>
      <div>
        <div class="title">房屋报修</div>
        <div class="desc">渗漏、墙面、门窗等 · 归口房车科</div>
      </div>
    </div>
    <div class="card choice" @click="go('设备')">
      <div class="icon" style="background:#2b7de9">设</div>
      <div>
        <div class="title">设备报修</div>
        <div class="desc">办公设备、空调、电梯等 · 归口物业</div>
      </div>
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
.page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }
.choice {
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}
.choice:active { background: var(--primary-light); }
.icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.title { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.desc { font-size: 13px; color: var(--text-secondary); }
</style>
