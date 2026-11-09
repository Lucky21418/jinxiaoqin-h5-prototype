<template>
  <div class="home">
    <header class="brand-banner">
      <div class="brand-row">
        <div class="logo" aria-hidden="true">
          <span>勤</span>
        </div>
        <div class="brand-text">
          <h1>金小勤</h1>
          <div class="sub-line"><span></span><em>机关事务一站式服务</em><span></span></div>
        </div>
      </div>
      <p class="support">技术支持：请联系办公室 · 演示原型</p>
      <div class="cloud cloud-a"></div>
      <div class="cloud cloud-b"></div>
      <div class="skyline"></div>
    </header>

    <div class="home-body">
      <div class="section-label">后勤办理</div>
      <section class="card">
        <div class="card-title">业务申请</div>
        <div class="grid-services">
          <div v-for="s in logistics" :key="s.to" class="service-item" @click="go(s.to)">
            <div class="service-icon" :style="{ background: s.color }">{{ s.icon }}</div>
            <div class="service-name">{{ s.name }}</div>
          </div>
        </div>
      </section>

      <div class="section-label">调查评价</div>
      <section class="card">
        <div class="card-title">问卷与评价</div>
        <div class="grid-services">
          <div v-for="s in surveyBlock" :key="s.to" class="service-item" @click="go(s.to)">
            <div class="service-icon" :style="{ background: s.color }">{{ s.icon }}</div>
            <div class="service-name">{{ s.name }}</div>
          </div>
        </div>
      </section>

      <div class="section-label">会议引导</div>
      <section class="card">
        <div class="card-title">蓉政通说明</div>
        <div class="grid-services">
          <div class="service-item" @click="meetingOpen = true">
            <div class="service-icon" style="background:#8b6cef">会</div>
            <div class="service-name">会议预定引导</div>
          </div>
        </div>
      </section>

      <div class="section-label">生活服务</div>
      <section class="card">
        <div class="card-title">外链入口</div>
        <div class="grid-services">
          <div v-for="s in life" :key="s.to" class="service-item" @click="go(s.to)">
            <div class="service-icon" :style="{ background: s.color }">{{ s.icon }}</div>
            <div class="service-name">{{ s.name }}</div>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head">
          <div class="card-title" style="margin:0">我的事项</div>
          <router-link class="link-more" to="/records">全部</router-link>
        </div>
        <div v-if="recent.length === 0" class="empty">暂无事项</div>
        <div v-else>
          <div v-for="item in recent" :key="item.id + item.kind" class="list-item" @click="go(item.route)">
            <div class="li-body">
              <div class="li-title">{{ item.title }}</div>
              <div class="li-meta">{{ item.time }} · {{ item.id }}</div>
            </div>
            <StatusTag :status="item.status" />
          </div>
        </div>
      </section>
    </div>

    <MeetingModal :open="meetingOpen" @close="meetingOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MeetingModal from '../components/MeetingModal.vue'
import StatusTag from '../components/StatusTag.vue'
import { recentSummary } from '../store/demo'

const router = useRouter()
const meetingOpen = ref(false)
const recent = ref([])

const logistics = [
  { name: '布展申请', to: '/exhibition/apply', icon: '展', color: '#2b7de9' },
  { name: '报修服务', to: '/repair', icon: '修', color: '#ff8a3d' },
  { name: '意见反馈', to: '/feedback/apply', icon: '意', color: '#2bb673' },
]
const surveyBlock = [
  { name: '满意度调查', to: '/survey', icon: '卷', color: '#2ec4b6' },
  { name: '办结评价', to: '/records', icon: '评', color: '#f06292' },
]
const life = [
  { name: '就餐服务', to: '/link/dining', icon: '餐', color: '#f0a020' },
  { name: '访客登记', to: '/link/visitor', icon: '访', color: '#3b8ef0' },
  { name: '公务餐', to: '/link/official-meal', icon: '公', color: '#8b6cef' },
]

function go(path) { router.push(path) }
onMounted(() => { recent.value = recentSummary(3) })
</script>

<style scoped>
.home { padding-bottom: 8px; }
.brand-banner {
  position: relative;
  overflow: hidden;
  background: linear-gradient(165deg, #5eb0ff 0%, #3b8ef0 48%, #2b7de9 100%);
  color: #fff;
  padding: 18px 16px 28px;
  min-height: 148px;
}
.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
}
.logo {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffe082, #f0a020 55%, #2b7de9 56%, #1a5fb4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  flex-shrink: 0;
}
.logo span {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255,255,255,0.95);
  color: #1a5fb4;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-text h1 {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.12);
}
.sub-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.95;
}
.sub-line span {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.55);
  max-width: 36px;
}
.sub-line em { font-style: normal; white-space: nowrap; }
.support {
  position: relative;
  z-index: 2;
  margin-top: 12px;
  font-size: 11px;
  text-align: center;
  opacity: 0.92;
  line-height: 1.5;
}
.cloud {
  position: absolute;
  background: rgba(255,255,255,0.55);
  border-radius: 40px;
  z-index: 1;
}
.cloud-a { width: 70px; height: 22px; right: 18px; top: 18px; }
.cloud-a::before, .cloud-a::after,
.cloud-b::before, .cloud-b::after {
  content: "";
  position: absolute;
  background: inherit;
  border-radius: 50%;
}
.cloud-a::before { width: 28px; height: 28px; left: 10px; top: -12px; }
.cloud-a::after { width: 36px; height: 36px; left: 28px; top: -16px; }
.cloud-b { width: 90px; height: 26px; left: -10px; bottom: 18px; opacity: 0.45; }
.cloud-b::before { width: 34px; height: 34px; left: 16px; top: -14px; }
.cloud-b::after { width: 42px; height: 42px; left: 40px; top: -18px; }
.skyline {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 36px;
  background:
    linear-gradient(180deg, transparent, rgba(255,255,255,0.18)),
    repeating-linear-gradient(90deg,
      transparent 0 10px,
      rgba(255,255,255,0.22) 10px 18px,
      transparent 18px 28px,
      rgba(255,255,255,0.16) 28px 34px,
      transparent 34px 46px);
  opacity: 0.7;
  mask-image: linear-gradient(180deg, transparent, #000 40%);
}
.home-body { padding: 12px 12px 8px; margin-top: -10px; position: relative; z-index: 3; }
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.link-more { font-size: 13px; color: var(--primary); }
</style>
