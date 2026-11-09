<template>
  <div class="page apply-page">
    <header class="page-head">
      <button class="nav-back back" type="button" @click="$router.back()">
        <AppIcon :icon="ArrowLeft" :size="18" /> 返回
      </button>
      <h1>{{ form.type }}报修</h1>
      <p>提交后可在「我的记录」查看进度</p>
    </header>
    <div class="card">
      <div class="form-item">
        <label class="form-label">报修类型</label>
        <input class="form-input" :value="form.type" disabled />
      </div>
      <div class="form-item">
        <label class="form-label">位置<span class="req">*</span></label>
        <input v-model="form.location" class="form-input" :class="{ 'is-error': errors.location }" placeholder="楼层 / 房间 / 设备位置" />
        <div v-if="errors.location" class="form-error">{{ errors.location }}</div>
      </div>
      <div class="form-item">
        <label class="form-label">问题描述<span class="req">*</span></label>
        <textarea v-model="form.description" class="form-textarea" :class="{ 'is-error': errors.description }" placeholder="发生了什么？影响如何？" />
        <div v-if="errors.description" class="form-error">{{ errors.description }}</div>
      </div>
      <div class="form-item">
        <label class="form-label">紧急程度<span class="req">*</span></label>
        <div class="chip-row">
          <button type="button" class="chip" :class="{ active: form.urgency === '一般' }" @click="form.urgency = '一般'">一般</button>
          <button type="button" class="chip" :class="{ active: form.urgency === '紧急' }" @click="form.urgency = '紧急'">紧急</button>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">联系电话<span class="req">*</span></label>
        <input v-model="form.phone" class="form-input" />
      </div>
      <div class="form-item">
        <label class="form-label">现场图片</label>
        <div class="upload-box" :class="{ 'has-file': form.attachment }" @click="form.attachment = form.attachment ? '' : '现场照片-演示.jpg'">
          <AppIcon :icon="ImagePlus" :size="22" />
          <span>{{ form.attachment || '点击模拟上传图片（原型占位）' }}</span>
        </div>
      </div>
      <button class="btn btn-block" type="button" @click="submit">
        <AppIcon :icon="Send" :size="18" /> 提交报修
      </button>
    </div>
    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addRepair, getIdentity } from '../store/demo'
import AppIcon from '../components/AppIcon.vue'
import { ArrowLeft, ImagePlus, Send } from '../icons'

const route = useRoute()
const router = useRouter()
const identity = getIdentity()
const toast = ref('')
const errors = reactive({})
const form = reactive({
  type: route.query.type === '设备' ? '设备' : '房屋',
  location: '',
  description: '',
  urgency: '一般',
  phone: identity.phone.replace(/\*/g, '8'),
  attachment: '',
})

function submit() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.location) errors.location = '请填写位置'
  if (!form.description) errors.description = '请填写问题描述'
  if (Object.keys(errors).length || !form.phone) {
    toast.value = '请完善必填项'
    setTimeout(() => (toast.value = ''), 1600)
    return
  }
  const item = addRepair({ ...form })
  router.replace(`/repair/${item.id}`)
}
</script>

<style scoped>
.apply-page { padding-top: 0; }
.page-head { margin: -12px -12px 14px; }
</style>
