<template>
  <div v-if="open" class="modal-mask" @click.self="close">
    <div class="modal-sheet">
      <div class="modal-head">
        <h3>蓉政通会议预定引导</h3>
        <button class="btn btn-sm btn-ghost" type="button" @click="close">
          <AppIcon :icon="X" :size="16" />
          关闭
        </button>
      </div>
      <div class="guide">
        <div class="guide-banner">
          <AppIcon :icon="CalendarDays" :size="18" />
          <span>演示图文 · 非官方页面</span>
        </div>
        <h4>如何预定会议室</h4>
        <ol>
          <li>打开「蓉政通」应用并登录机关账号。</li>
          <li>进入「会议服务 / 会议室预定」模块。</li>
          <li>选择日期、时段与会议室，填写会议主题与参会人数。</li>
          <li>按单位流程提交审批；审批通过后即可使用。</li>
        </ol>
        <h4>注意事项</h4>
        <ul>
          <li>请提前至少 1 个工作日预定；紧急会议请联系办公室。</li>
          <li>使用后请恢复桌椅摆放，关闭灯光与空调。</li>
          <li>本入口仅提供图文引导，不跳转外部系统。</li>
        </ul>
        <p class="tip">关闭后将停留在当前页面。</p>
      </div>
      <button class="btn btn-block" type="button" @click="close">我知道了</button>
    </div>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { CalendarDays, X } from '../icons'
defineProps({ open: Boolean })
const emit = defineEmits(['close'])
function close() { emit('close') }
</script>

<style scoped>
.guide-banner {
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: var(--fs-sm);
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.guide h4 { font-size: var(--fs-md); margin: 12px 0 8px; }
.guide ol, .guide ul { padding-left: 18px; color: var(--color-text-secondary); font-size: var(--fs-md); line-height: 1.7; }
.tip { margin: 12px 0 16px; font-size: var(--fs-xs); color: var(--color-text-tertiary); }
</style>
