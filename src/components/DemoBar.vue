<template>
  <div class="demo-bar">
    <div class="demo-left">
      <strong>演示身份</strong>
      <span>{{ identity.name }} · {{ identity.role }}</span>
    </div>
    <button class="btn btn-sm btn-ghost" type="button" @click="onReset">重置数据</button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getIdentity, resetDemo } from '../store/demo'

const router = useRouter()
const identity = reactive({ ...getIdentity() })

onMounted(() => Object.assign(identity, getIdentity()))

function onReset() {
  if (!confirm('确认重置全部演示数据？将恢复预置样例。')) return
  resetDemo()
  Object.assign(identity, getIdentity())
  router.push('/')
  location.reload()
}
</script>

<style scoped>
.demo-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: #123a6e;
  color: #fff;
  font-size: 12px;
}
.demo-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.demo-left strong { font-size: 12px; opacity: 0.9; }
.demo-left span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.95;
}
.demo-bar :deep(.btn-ghost) {
  background: rgba(255,255,255,0.14);
  color: #fff;
  flex-shrink: 0;
}
</style>
