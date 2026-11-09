<template>
  <div class="page">
    <header class="hero">
      <div class="brand">金小勤</div>
      <div class="sub">金牛区机关事务管理局一站式服务</div>
    </header>

    <section class="card">
      <div class="card-title">自建办理</div>
      <div class="grid-services">
        <div v-for="s in selfServices" :key="s.to" class="service-item" @click="go(s.to)">
          <div class="service-icon" :style="{ background: s.color }">{{ s.icon }}</div>
          <div class="service-name">{{ s.name }}</div>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title">引导说明</div>
      <button class="btn btn-block btn-outline" type="button" @click="meetingOpen = true">
        蓉政通会议预定引导
      </button>
    </section>

    <section class="card">
      <div class="card-title">外链服务</div>
      <div class="grid-services">
        <div v-for="s in linkServices" :key="s.to" class="service-item" @click="go(s.to)">
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

const selfServices = [
  { name: '布展申请', to: '/exhibition/apply', icon: '展', color: '#1a5fb4' },
  { name: '报修服务', to: '/repair', icon: '修', color: '#2a7ab8' },
  { name: '意见反馈', to: '/feedback/apply', icon: '意', color: '#3d6ea8' },
  { name: '满意度调查', to: '/survey', icon: '卷', color: '#4a78ad' },
]
const linkServices = [
  { name: '就餐服务', to: '/link/dining', icon: '餐', color: '#5a7fa0' },
  { name: '访客登记', to: '/link/visitor', icon: '访', color: '#6789a8' },
  { name: '公务餐', to: '/link/official-meal', icon: '公', color: '#7393b0' },
]

function go(path) { router.push(path) }

onMounted(() => { recent.value = recentSummary(3) })
</script>

<style scoped>
.hero {
  background: linear-gradient(145deg, #1a5fb4, #134a8c);
  color: #fff;
  border-radius: 14px;
  padding: 18px 16px;
  margin-bottom: 12px;
}
.brand { font-size: 24px; font-weight: 700; letter-spacing: 1px; }
.sub { margin-top: 6px; font-size: 13px; opacity: 0.92; }
.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}
.link-more { font-size: 13px; color: var(--primary); }
</style>
