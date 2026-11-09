<template>
  <div class="page account">
    <header class="profile-banner">
      <div class="avatar">
        <AppIcon :icon="User" :size="28" />
      </div>
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
      <button type="button" class="menu" @click="$router.push('/records')">
        <IconTile :icon="FileText" color="var(--tile-blue)" :size="36" :icon-size="18" :radius="10" />
        <span>我的记录</span>
        <AppIcon :icon="ChevronRight" :size="18" class="chev" />
      </button>
      <button type="button" class="menu" @click="$router.push('/survey')">
        <IconTile :icon="ClipboardList" color="var(--tile-cyan)" :size="36" :icon-size="18" :radius="10" />
        <span>满意度调查</span>
        <AppIcon :icon="ChevronRight" :size="18" class="chev" />
      </button>
      <button type="button" class="menu" @click="$router.push('/feedback/apply')">
        <IconTile :icon="MessageSquareText" color="var(--tile-green)" :size="36" :icon-size="18" :radius="10" />
        <span>意见反馈</span>
        <AppIcon :icon="ChevronRight" :size="18" class="chev" />
      </button>
    </div>

    <p class="note">正式环境将通过微信服务号网页授权关联平台账号。本原型不收集密码或证件信息。</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { getIdentity } from '../store/demo'
import AppIcon from '../components/AppIcon.vue'
import IconTile from '../components/IconTile.vue'
import { User, FileText, ClipboardList, MessageSquareText, ChevronRight } from '../icons'
const identity = reactive({ ...getIdentity() })
</script>

<style scoped>
.account { padding-top: 0; }
.profile-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(165deg, var(--color-sky-1), var(--color-sky-3));
  color: #fff;
  margin: -12px -12px 14px;
  padding: 22px 16px 24px;
  border-radius: 0 0 18px 18px;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.22);
  border: 2px solid rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.profile-banner h1 { font-size: var(--fs-xl); }
.profile-banner p { margin-top: 4px; font-size: var(--fs-xs); opacity: 0.92; }
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--fs-md);
}
.row:last-child { border-bottom: none; }
.row span { color: var(--color-text-secondary); }
.menu {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid var(--color-border);
  background: transparent;
  font-size: var(--fs-md);
  cursor: pointer;
  text-align: left;
}
.menu:last-child { border-bottom: none; }
.menu span { flex: 1; }
.chev { color: var(--color-text-tertiary); }
.note { font-size: var(--fs-xs); color: var(--color-text-tertiary); line-height: 1.6; padding: 0 2px; }
</style>
