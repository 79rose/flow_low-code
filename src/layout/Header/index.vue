<template>
  <header class="flex items-center gap-2 px-4">
    <div class="mr-auto text-sm flex items-center gap-2">
      <h2>
        {{ $t('flow.header.title') }}
      </h2>
      <p>
        {{ $t('flow.header.description') }}
      </p>
    </div>

    <el-dropdown @command="handleCommand" size="small">
      <el-button type="text" size="small">
        {{ curLang }}
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for=" item in langList" :command="item.command" :key="item.text">
            {{ item.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-button size="small" type="text" plain>
        {{ $t('common.fileOperation') }}
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExprotJson">
            {{ $t('common.export') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-switch v-model="readOnly" @click="toggleModel" inline-prompt :active-text="$t('common.editableModel')"
      :inactive-text="$t('common.readonlyModel')" />
    <el-switch v-model="isDark" @click.passive="toggle">
      <template #active-action>
        <Moon />
      </template>
      <template #inactive-action>
        <Sunny />
      </template>
    </el-switch>
  </header>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTheme } from 'hooks/useTheme';
  import { useLang } from 'hooks/useLang'
  import { useModel } from 'hooks/useModel';
  import { LANG, THEME } from 'const/app'
  import { isReducedMotion } from 'utils/theme';

  import { useDataStore } from 'store/modules/data'

  const { fields, process } = useDataStore();
  const { t } = useI18n()
  const { theme, toggleTheme } = useTheme();
  const { changeLang, lang } = useLang()

  const { readOnly, setReadOnly } = useModel();
  const isDark = computed(() => theme.value === THEME.DARK);
  const curLang = computed(() => {
    return lang.value === LANG.CHINESE ? t('common.lang.chinese') : t('common.lang.english')
  })
  const toggleModel = () => {
    setReadOnly(!readOnly.value)
  }
  const handleExprotJson = () => {
    const data = {
      fields,
      process
    }
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  const langList = [
    {
      command: 'zh',
      text: t('common.lang.chinese')
    },
    {
      command: 'en',
      text: t('common.lang.english')
    },
  ]
  const handleCommand = (command: string) => {
    changeLang(command)
  };
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