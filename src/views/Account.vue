<template>
  <div class="page account">
    <header class="profile-banner">
      <div class="avatar">{{ identity.name.slice(0,1) }}</div>
      <div>
        <h1>{{ identity.name }}</h1>
        <p>{{ identity.dept }} · {{ identity.role }}</p>
      </div>
    </header>

    <div class="card">
      <div class="card-title">账号信息</div>
      <div class="row"><span>手机</span><strong>{{ identity.phone }}</strong></div>
      <div class="row"><span>关联方式</span><strong>演示身份切换</strong></div>
      <div class="row"><span>单位</span><strong>金牛区机关事务管理局</strong></div>
    </div>

    <div class="card">
      <div class="card-title">常用入口</div>
      <div class="menu" @click="$router.push('/records')">我的记录</div>
      <div class="menu" @click="$router.push('/survey')">满意度调查</div>
      <div class="menu" @click="$router.push('/feedback/apply')">意见反馈</div>
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
.account { padding-top: 0; }
.profile-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(165deg, #5eb0ff, #2b7de9);
  color: #fff;
  margin: -12px -12px 14px;
  padding: 22px 16px 24px;
  border-radius: 0 0 18px 18px;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  border: 2px solid rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
}
.profile-banner h1 { font-size: 18px; }
.profile-banner p { margin-top: 4px; font-size: 12px; opacity: 0.92; }
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
.menu {
  padding: 14px 4px;
  border-bottom: 1px solid var(--border);
  font-size: 15px;
  cursor: pointer;
}
.menu:last-child { border-bottom: none; }
.menu:active { color: var(--primary); }
.note { font-size: 12px; color: var(--text-muted); line-height: 1.6; padding: 0 2px; }
</style>
