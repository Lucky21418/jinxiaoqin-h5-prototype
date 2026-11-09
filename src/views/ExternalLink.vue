<template>
  <div class="page">
    <button class="nav-back" type="button" @click="$router.back()">← 返回</button>
    <h1 class="page-title">{{ meta.title }}</h1>
    <p class="page-sub">原型占位确认页</p>
    <div class="card">
      <div class="warn">将离开本平台，跳转至原系统办理</div>
      <p class="desc">{{ meta.desc }}</p>
      <ul>
        <li>登录、审核、支付与结果仍在原平台完成</li>
        <li>本期不做跨系统免登录与数据同步</li>
        <li>本页为可点击原型占位，不发起真实跳转</li>
      </ul>
    </div>
    <button class="btn btn-block" type="button" @click="fakeJump">确认跳转（演示）</button>
    <button class="btn btn-block btn-ghost" style="margin-top:10px" type="button" @click="$router.push('/')">留在金小勤</button>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const toast = ref('')
const map = {
  dining: { title: '就餐服务', desc: '将跳转农行应用/既有就餐入口办理充值与就餐相关业务。' },
  visitor: { title: '访客登记与车牌录入', desc: '将跳转保卫科关联的访客与车辆登记系统。' },
  'official-meal': { title: '公务餐', desc: '将跳转甲方后续提供的公务餐办理入口。' },
}
const meta = computed(() => map[route.params.type] || { title: '外链服务', desc: '将跳转原系统。' })

function fakeJump() {
  toast.value = '原型占位：未跳转真实系统'
  setTimeout(() => { toast.value = '' }, 1800)
}
</script>

<style scoped>
.warn {
  background: #fff4e5;
  color: var(--warning);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}
.desc { font-size: 14px; line-height: 1.6; margin-bottom: 10px; }
ul { padding-left: 18px; color: var(--text-secondary); font-size: 13px; line-height: 1.7; }
</style>
