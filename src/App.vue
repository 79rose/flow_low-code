<script setup lang="ts">
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import en from 'element-plus/es/locale/lang/en'
  import { LANG } from 'const/app'
  import { useLang } from 'hooks/useLang'

  const { lang } = useLang()
  const locale = computed(() => {
    return lang.value === LANG.CHINESE ? zhCn : en
  })
</script>

<template>
  <el-config-provider namespace="el" :locale>
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
