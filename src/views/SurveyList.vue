<template>
  <div class="page apply-page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">← 返回</button>
      <h1>满意度调查</h1>
      <p>每个账号对每份问卷限提交一次</p>
    </header>
    <div
      v-for="s in surveys"
      :key="s.id"
      class="card survey"
      @click="$router.push(`/survey/${s.id}`)"
    >
      <div class="title-row">
        <div class="title">{{ s.title }}</div>
        <span class="status" :class="done(s.id) ? 'status-done' : 'status-processing'">
          {{ done(s.id) ? '已提交' : '可填写' }}
        </span>
      </div>
      <div class="meta">开放：{{ s.openFrom }} 至 {{ s.openTo }} · {{ s.questions.length }} 题</div>
    </div>
  </div>
</template>

<script setup>
import { getSurveys, hasSurveySubmission } from '../store/demo'
const surveys = getSurveys()
function done(id) { return hasSurveySubmission(id) }
</script>

<style scoped>
.apply-page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }

.survey { cursor: pointer; }
.survey:active { background: var(--primary-light); }
.title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.title { font-size: 15px; font-weight: 600; }
.meta { margin-top: 8px; font-size: 12px; color: var(--text-muted); }
</style>
