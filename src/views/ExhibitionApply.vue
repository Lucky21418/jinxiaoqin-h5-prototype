<template>
  <div class="page apply-page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">
        <AppIcon :icon="ArrowLeft" :size="18" /> 返回
      </button>
      <h1>布展申请</h1>
      <p>物业单级审批 · 固定表单</p>
    </header>
    <div class="card">
      <div class="form-item">
        <label class="form-label">申请人</label>
        <input class="form-input" :value="identity.name" disabled />
      </div>
      <div class="form-item">
        <label class="form-label">联系电话<span class="req">*</span></label>
        <input v-model="form.phone" class="form-input" :class="{ 'is-error': errors.phone }" placeholder="请输入手机号" />
        <div v-if="errors.phone" class="form-error">{{ errors.phone }}</div>
      </div>
      <div class="form-item">
        <label class="form-label">布展地点<span class="req">*</span></label>
        <input v-model="form.place" class="form-input" :class="{ 'is-error': errors.place }" placeholder="楼宇 / 区域" />
        <div v-if="errors.place" class="form-error">{{ errors.place }}</div>
      </div>
      <div class="form-item">
        <label class="form-label">开始时间<span class="req">*</span></label>
        <input v-model="form.startAt" class="form-input" type="datetime-local" />
      </div>
      <div class="form-item">
        <label class="form-label">结束时间<span class="req">*</span></label>
        <input v-model="form.endAt" class="form-input" type="datetime-local" />
      </div>
      <div class="form-item">
        <label class="form-label">布展内容说明<span class="req">*</span></label>
        <textarea v-model="form.content" class="form-textarea" :class="{ 'is-error': errors.content }" placeholder="用途与内容" />
        <div v-if="errors.content" class="form-error">{{ errors.content }}</div>
      </div>
      <div class="form-item">
        <label class="form-label">附件资料</label>
        <div class="upload-box" :class="{ 'has-file': form.attachment }" @click="pickFile">
          <AppIcon :icon="ImagePlus" :size="22" />
          <span>{{ form.attachment || '点击模拟上传图片 / 资料（原型占位）' }}</span>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">备注</label>
        <textarea v-model="form.remark" class="form-textarea" placeholder="选填" />
      </div>
      <button class="btn btn-block" type="button" :disabled="submitting" @click="submit">
        <AppIcon :icon="Send" :size="18" /> 提交申请
      </button>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addExhibition, getIdentity } from '../store/demo'
import AppIcon from '../components/AppIcon.vue'
import { ArrowLeft, ImagePlus, Send } from '../icons'

const router = useRouter()
const identity = getIdentity()
const submitting = ref(false)
const toast = ref('')
const errors = reactive({})
const form = reactive({
  phone: identity.phone.replace(/\*/g, '8'),
  place: '',
  startAt: '',
  endAt: '',
  content: '',
  attachment: '',
  remark: '',
})

function pickFile() {
  form.attachment = form.attachment ? '' : '布展资料-演示.jpg'
}

function fmt(v) {
  if (!v) return ''
  return v.replace('T', ' ')
}

function submit() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.phone) errors.phone = '请填写联系电话'
  if (!form.place) errors.place = '请填写布展地点'
  if (!form.content) errors.content = '请填写布展内容'
  if (!form.startAt || !form.endAt) {
    toast.value = '请完善起止时间'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  if (Object.keys(errors).length) {
    toast.value = '请完善必填项'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  submitting.value = true
  const item = addExhibition({
    place: form.place,
    startAt: fmt(form.startAt),
    endAt: fmt(form.endAt),
    content: form.content,
    phone: form.phone,
    remark: form.remark,
    attachment: form.attachment,
  })
  router.replace(`/exhibition/${item.id}`)
}
</script>

<style scoped>
.apply-page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }
</style>
