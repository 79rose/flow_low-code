<template>
  <div class="flex items-center">
    <div class="mr-auto"></div>
    <el-switch v-model="isDark" @click.passive="toggle">
      <template #active-action>
        <MoonNight />
      </template>
      <template #inactive-action>
        <Sunny />
      </template>
    </el-switch>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTheme } from 'hooks/useTheme';
  import { isReducedMotion } from 'utils/theme';

  const { theme, toggleTheme } = useTheme();
  const isDark = computed(() => theme.value === 'dark');

  const toggle = (event?: MouseEvent) => {
    const willDark = !isDark.value;
    // 浏览器新特性不支持 或者 开启了动画减弱
    if (!document.startViewTransition || isReducedMotion()) {
      toggleTheme();
      return;
    }
    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    // 传入点击事件，从点击处开始扩散。否则，从右上角开始扩散
    const x = event?.clientX ?? window.innerWidth;
    const y = event?.clientY ?? 0;

    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    void transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        {
          clipPath: willDark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: willDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
        },
      );
    });
  };
</script>

<style scoped></style>