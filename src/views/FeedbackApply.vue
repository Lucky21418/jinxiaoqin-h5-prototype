<template>
  <div class="page apply-page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">
        <AppIcon :icon="ArrowLeft" :size="18" /> 返回
      </button>
      <h1>意见反馈</h1>
      <p>按类别归口办理 · 实名提交</p>
    </header>
    <div class="card">
      <div class="form-item">
        <label class="form-label">反馈类别<span class="req">*</span></label>
        <div class="chip-row">
          <button
            v-for="c in categories"
            :key="c"
            type="button"
            class="chip"
            :class="{ active: form.category === c }"
            @click="form.category = c"
          >{{ c }}</button>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">意见内容<span class="req">*</span></label>
        <textarea v-model="form.content" class="form-textarea" :class="{ 'is-error': errors.content }" placeholder="请客观描述问题或建议" />
        <div v-if="errors.content" class="form-error">{{ errors.content }}</div>
      </div>
      <div class="form-item">
        <label class="form-label">附件</label>
        <div class="upload-box" :class="{ 'has-file': form.attachment }" @click="form.attachment = form.attachment ? '' : '反馈附件-演示.jpg'">
          <AppIcon :icon="ImagePlus" :size="22" />
          <span>{{ form.attachment || '点击模拟上传图片（原型占位）' }}</span>
        </div>
      </div>
      <button class="btn btn-block" type="button" @click="submit">
        <AppIcon :icon="Send" :size="18" /> 提交反馈
      </button>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addFeedback } from '../store/demo'
import AppIcon from '../components/AppIcon.vue'
import { ArrowLeft, ImagePlus, Send } from '../icons'

const router = useRouter()
const categories = ['物业', '就餐', '安保', '卫生']
const toast = ref('')
const errors = reactive({})
const form = reactive({ category: '物业', content: '', attachment: '' })

function submit() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.content.trim()) {
    errors.content = '请填写意见内容'
    toast.value = '请完善必填项'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  const item = addFeedback({ ...form })
  router.replace(`/feedback/${item.id}`)
}
</script>

<style scoped>
.apply-page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }
</style>
