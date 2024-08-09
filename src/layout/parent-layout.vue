<template>
  <router-view v-slot="{ Component: routerComponent }">
    <transition name="fade" mode="out-in">
      <component :is="routerComponent" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
