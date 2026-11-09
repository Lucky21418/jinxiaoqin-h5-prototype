<template>
  <div class="page">
    <h1 class="page-title">我的记录</h1>
    <p class="page-sub">统一查看本人事项进度与结果</p>
    <div class="chip-row" style="margin-bottom:12px">
      <button
        v-for="f in filters"
        :key="f.value"
        type="button"
        class="chip"
        :class="{ active: filter === f.value }"
        @click="filter = f.value"
      >{{ f.label }}</button>
    </div>
    <div class="card">
      <div v-if="filtered.length === 0" class="empty">暂无记录</div>
      <div
        v-for="item in filtered"
        :key="item.kind + item.id"
        class="list-item"
        @click="$router.push(item.route)"
      >
        <div class="li-body">
          <div class="li-title">{{ item.title }}</div>
          <div class="li-meta">{{ item.time }} · {{ item.id }}</div>
        </div>
        <StatusTag :status="item.status" />
      </div>
    </div>
    <button class="btn btn-block btn-ghost" type="button" @click="$router.push('/account')">账号信息</button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import StatusTag from '../components/StatusTag.vue'
import { listAllRecords } from '../store/demo'

const filter = ref('all')
const rows = ref([])
const filters = [
  { label: '全部', value: 'all' },
  { label: '布展', value: 'exhibition' },
  { label: '报修', value: 'repair' },
  { label: '意见', value: 'feedback' },
  { label: '问卷', value: 'survey' },
]

onMounted(() => { rows.value = listAllRecords() })

const filtered = computed(() => {
  if (filter.value === 'all') return rows.value
  return rows.value.filter((x) => x.kind === filter.value)
})
</script>
