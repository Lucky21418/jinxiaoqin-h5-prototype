<template>
  <div class="page">
    <button class="nav-back" type="button" @click="$router.back()">← 返回</button>
    <h1 class="page-title">账号信息</h1>
    <p class="page-sub">演示身份，非真实登录</p>
    <div class="card">
      <div class="row"><span>姓名</span><strong>{{ identity.name }}</strong></div>
      <div class="row"><span>科室</span><strong>{{ identity.dept }}</strong></div>
      <div class="row"><span>手机</span><strong>{{ identity.phone }}</strong></div>
      <div class="row"><span>角色</span><strong>{{ identity.role }}</strong></div>
      <div class="row"><span>关联方式</span><strong>演示身份切换</strong></div>
    </div>
    <p class="note">正式环境将通过微信服务号网页授权关联平台账号。本原型不收集密码或证件信息。</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getIdentity } from '../store/demo'
const identity = reactive({ ...getIdentity() })
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.row:last-child { border-bottom: none; }
.row span { color: var(--text-secondary); }
.note { font-size: 12px; color: var(--text-muted); line-height: 1.6; }
</style>
