<template>
  <div class="page" v-if="item">
    <button class="nav-back" type="button" @click="$router.push('/records')"><AppIcon :icon="ArrowLeft" :size="18" /> 我的记录</button>
    <div class="head">
      <h1 class="page-title">布展详情</h1>
      <StatusTag :status="item.status" />
    </div>
    <p class="page-sub">单号 {{ item.id }}</p>
    <div class="card">
      <div class="kv"><span>地点</span><b>{{ item.place }}</b></div>
      <div class="kv"><span>时间</span><b>{{ item.startAt }} ~ {{ item.endAt }}</b></div>
      <div class="kv"><span>内容</span><b>{{ item.content }}</b></div>
      <div class="kv"><span>电话</span><b>{{ item.phone }}</b></div>
      <div class="kv" v-if="item.attachment"><span>附件</span><b>{{ item.attachment }}</b></div>
      <div class="kv" v-if="item.remark"><span>备注</span><b>{{ item.remark }}</b></div>
      <div class="kv" v-if="item.opinion"><span>审批意见</span><b>{{ item.opinion }}</b></div>
    </div>
    <div class="card">
      <div class="card-title">办理进度</div>
      <div class="timeline">
        <div v-for="(t, i) in item.timeline" :key="i" class="timeline-item">
          <div class="t-title">{{ t.title }}</div>
          <div class="t-meta">{{ t.time }}</div>
          <div class="t-desc">{{ t.desc }}</div>
        </div>
      </div>
    </div>
    <button class="btn btn-block btn-ghost" type="button" @click="$router.push('/exhibition/apply')">再申请一单</button>
  </div>
  <div v-else class="page empty">未找到该申请</div>
</template>

<script setup>
import AppIcon from '../components/AppIcon.vue'
import { ArrowLeft } from '../icons'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StatusTag from '../components/StatusTag.vue'
import { getExhibition } from '../store/demo'
const route = useRoute()
const item = computed(() => getExhibition(route.params.id))
</script>

<style scoped>
.head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.kv {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.kv:last-child { border-bottom: none; }
.kv span { color: var(--text-secondary); }
.kv b { font-weight: 500; word-break: break-all; }
</style>
