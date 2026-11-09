<template>
  <div class="page">
    <h1 class="page-title">更多</h1>
    <p class="page-sub">意见反馈、满意度调查与账号入口</p>
    <div class="card">
      <div class="menu" @click="$router.push('/feedback/apply')">意见反馈</div>
      <div class="menu" @click="$router.push('/survey')">满意度调查</div>
      <div class="menu" @click="$router.push('/account')">账号信息</div>
      <div class="menu" @click="$router.push('/records')">我的记录</div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  padding: 14px 4px;
  border-bottom: 1px solid var(--border);
  font-size: 15px;
  cursor: pointer;
}
.menu:last-child { border-bottom: none; }
.menu:active { color: var(--primary); }
</style>
