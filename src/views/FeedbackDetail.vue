<template>
  <div class="page" v-if="item">
    <button class="nav-back" type="button" @click="$router.push('/records')">← 我的记录</button>
    <div class="head">
      <h1 class="page-title">意见详情</h1>
      <StatusTag :status="item.rated ? 'rated' : item.status" />
    </div>
    <p class="page-sub">单号 {{ item.id }} · {{ item.category }}</p>
    <div class="card">
      <div class="kv"><span>内容</span><b>{{ item.content }}</b></div>
      <div class="kv" v-if="item.attachment"><span>附件</span><b>{{ item.attachment }}</b></div>
      <div class="kv" v-if="item.reply"><span>回复</span><b>{{ item.reply }}</b></div>
    </div>
    <div class="card">
      <div class="card-title">办理时间线</div>
      <div class="timeline">
        <div v-for="(t, i) in item.timeline" :key="i" class="timeline-item">
          <div class="t-title">{{ t.title }}</div>
          <div class="t-meta">{{ t.time }}</div>
          <div class="t-desc">{{ t.desc }}</div>
        </div>
      </div>
    </div>

    <div v-if="item.status === 'done' && !item.rated" class="card">
      <div class="card-title">办结评价（仅一次）</div>
      <div class="form-item">
        <label class="form-label">评分<span class="req">*</span></label>
        <div class="chip-row">
          <button
            v-for="n in 5"
            :key="n"
            type="button"
            class="chip"
            :class="{ active: rating === n }"
            @click="rating = n"
          >{{ n }} 分</button>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">文字评价</label>
        <textarea v-model="ratingText" class="form-textarea" placeholder="选填" />
      </div>
      <button class="btn btn-block" type="button" @click="submitRate">提交评价</button>
    </div>

    <div v-if="item.rated" class="card">
      <div class="card-title">我的评价</div>
      <p>评分：{{ item.rating }} 分</p>
      <p v-if="item.ratingText" style="margin-top:6px;color:var(--text-secondary)">{{ item.ratingText }}</p>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
  <div v-else class="page empty">未找到该反馈</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import StatusTag from '../components/StatusTag.vue'
import { getFeedback, rateFeedback } from '../store/demo'

const route = useRoute()
const rating = ref(5)
const ratingText = ref('')
const toast = ref('')
const tick = ref(0)
const item = computed(() => {
  tick.value
  return getFeedback(route.params.id)
})

function submitRate() {
  if (!rating.value) {
    toast.value = '请选择评分'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  const updated = rateFeedback(route.params.id, rating.value, ratingText.value)
  if (!updated) {
    toast.value = '无法评价'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  tick.value++
  toast.value = '评价已提交'
  setTimeout(() => (toast.value = ''), 1600)
}
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
