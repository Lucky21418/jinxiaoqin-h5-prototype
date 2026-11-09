<template>
  <div class="page">
    <button class="nav-back" type="button" @click="$router.back()">← 返回</button>
    <h1 class="page-title">意见反馈</h1>
    <p class="page-sub">按类别归口办理 · 实名提交</p>
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
        <textarea v-model="form.content" class="form-textarea" placeholder="请客观描述问题或建议" />
      </div>
      <div class="form-item">
        <label class="form-label">附件</label>
        <div class="upload-box" :class="{ 'has-file': form.attachment }" @click="form.attachment = form.attachment ? '' : '反馈附件-演示.jpg'">
          {{ form.attachment || '点击模拟上传图片（原型占位）' }}
        </div>
      </div>
      <button class="btn btn-block" type="button" @click="submit">提交反馈</button>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addFeedback } from '../store/demo'

const router = useRouter()
const categories = ['物业', '就餐', '安保', '卫生']
const toast = ref('')
const form = reactive({ category: '物业', content: '', attachment: '' })

function submit() {
  if (!form.content.trim()) {
    toast.value = '请填写意见内容'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  const item = addFeedback({ ...form })
  router.replace(`/feedback/${item.id}`)
}
</script>
