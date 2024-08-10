<template>
  <Header />
  <Suspense>
    <router-view v-slot="{ Component: routerComponent }">
      <transition name="fade" mode="out-in">
        <component :is="routerComponent" />
      </transition>
    </router-view>
    <template #fallback>
      <!--  -->
    </template>
  </Suspense>
</template>
<script setup lang="ts">
  import Header from './Header/index.vue'
</script>

<style lang="scss" scoped></style>