<template>
  <div class="page" v-if="survey">
    <button class="nav-back" type="button" @click="$router.back()"><AppIcon :icon="ArrowLeft" :size="18" /> 返回</button>
    <h1 class="page-title">{{ survey.title }}</h1>
    <p class="page-sub">共 {{ survey.questions.length }} 题 · 限提交一次</p>

    <div v-if="submitted" class="card done-card">
      <div class="ok">已提交，感谢参与</div>
      <p>提交时间：{{ submitted.submittedAt }}</p>
      <p class="hint">本账号不可再次填写本问卷。</p>
      <button class="btn btn-block btn-ghost" style="margin-top:12px" type="button" @click="$router.push('/records')">查看我的记录</button>
    </div>

    <div v-else>
      <div v-for="(q, idx) in survey.questions" :key="q.id" class="card">
        <div class="q-title">{{ idx + 1 }}. {{ q.title }}</div>
        <div v-if="q.type === 'single'" class="chip-row" style="margin-top:10px">
          <button
            v-for="opt in q.options"
            :key="opt"
            type="button"
            class="chip"
            :class="{ active: answers[q.id] === opt }"
            @click="answers[q.id] = opt"
          >{{ opt }}</button>
        </div>
        <div v-else-if="q.type === 'scale'" class="chip-row" style="margin-top:10px">
          <button
            v-for="n in q.max"
            :key="n"
            type="button"
            class="chip"
            :class="{ active: answers[q.id] === n }"
            @click="answers[q.id] = n"
          >{{ n }}</button>
        </div>
        <textarea
          v-else
          v-model="answers[q.id]"
          class="form-textarea"
          style="margin-top:10px"
          placeholder="选填"
        />
      </div>
      <button class="btn btn-block" type="button" :disabled="submitting" @click="onSubmit">提交问卷</button>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
  <div v-else class="page empty">问卷不存在</div>
</template>

<script setup>
import AppIcon from '../components/AppIcon.vue'
import { ArrowLeft } from '../icons'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSurvey, getSurveySubmission, submitSurvey } from '../store/demo'

const route = useRoute()
const survey = computed(() => getSurvey(route.params.id))
const submitted = ref(getSurveySubmission(route.params.id))
const answers = reactive({})
const submitting = ref(false)
const toast = ref('')

function onSubmit() {
  if (!survey.value) return
  for (const q of survey.value.questions) {
    if (q.type === 'text') continue
    if (answers[q.id] === undefined || answers[q.id] === '') {
      toast.value = '请完成必答题后再提交'
      setTimeout(() => (toast.value = ''), 1600)
      return
    }
  }
  submitting.value = true
  const res = submitSurvey(route.params.id, { ...answers })
  submitting.value = false
  if (!res.ok) {
    toast.value = '您已提交过本问卷'
    submitted.value = getSurveySubmission(route.params.id)
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  submitted.value = res.data
  toast.value = '提交成功'
  setTimeout(() => (toast.value = ''), 1600)
}
</script>

<style scoped>
.q-title { font-size: 14px; font-weight: 600; line-height: 1.5; }
.done-card .ok {
  font-size: 18px;
  font-weight: 700;
  color: var(--success);
  margin-bottom: 8px;
}
.hint { margin-top: 8px; font-size: 13px; color: var(--text-muted); }
</style>
