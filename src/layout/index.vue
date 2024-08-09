<template>
  <el-container class="container">
    <el-header>
      <Header />
    </el-header>
    <el-main>
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
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
  import Header from './Header/index.vue'
</script>

<style lang="scss" scoped></style>