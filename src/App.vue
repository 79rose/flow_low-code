<script setup lang="ts">
  // import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/es/locale/lang/en'
  // todo i18n
</script>

<template>
  <el-config-provider namespace="el" :locale="en">
    <Application>
      <RouterView />
    </Application>
  </el-config-provider>
</template>

<style scoped>
  #app {
    color: var(--el-text-color-primary);
  }
</style>
