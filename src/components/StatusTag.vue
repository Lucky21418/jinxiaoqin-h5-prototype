<template>
  <span class="status" :class="statusClass(status)">{{ statusLabel(status) }}</span>
</template>

<script setup>
import { statusLabel, statusClass } from '../store/demo'
defineProps({ status: { type: String, required: true } })
</script>
