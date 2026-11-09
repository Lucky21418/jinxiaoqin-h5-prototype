<template>
  <div class="page apply-page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">
        <AppIcon :icon="ArrowLeft" :size="18" /> 返回
      </button>
      <h1>满意度调查</h1>
      <p>每个账号对每份问卷限提交一次</p>
    </header>
    <button
      v-for="s in surveys"
      :key="s.id"
      type="button"
      class="card survey"
      @click="$router.push(`/survey/${s.id}`)"
    >
      <IconTile :icon="ClipboardList" :color="done(s.id) ? 'var(--tile-green)' : 'var(--tile-cyan)'" :size="44" :icon-size="22" />
      <div class="body">
        <div class="title-row">
          <div class="title">{{ s.title }}</div>
          <span class="status" :class="done(s.id) ? 'status-done' : 'status-processing'">
            {{ done(s.id) ? '已提交' : '可填写' }}
          </span>
        </div>
        <div class="meta">开放：{{ s.openFrom }} 至 {{ s.openTo }} · {{ s.questions.length }} 题</div>
      </div>
      <AppIcon :icon="ChevronRight" :size="18" class="chev" />
    </button>
  </div>
</template>

<script setup>
import { getSurveys, hasSurveySubmission } from '../store/demo'
import AppIcon from '../components/AppIcon.vue'
import IconTile from '../components/IconTile.vue'
import { ArrowLeft, ClipboardList, ChevronRight } from '../icons'
const surveys = getSurveys()
function done(id) { return hasSurveySubmission(id) }
</script>

<style scoped>
.apply-page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }
.survey {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
.survey:active { background: var(--color-primary-soft); }
.body { flex: 1; min-width: 0; }
.title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.title { font-size: var(--fs-md); font-weight: 600; }
.meta { margin-top: 8px; font-size: var(--fs-xs); color: var(--color-text-tertiary); }
.chev { color: var(--color-text-tertiary); flex-shrink: 0; }
</style>
