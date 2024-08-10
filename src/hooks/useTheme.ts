import { storage } from 'utils/storage';
import { THEME } from 'const/app';

export const useTheme = () => {
  const theme = ref(storage.get(THEME.THEME, THEME.LIGHT));

  function toggleTheme(varTheme?: string) {
    if (varTheme) {
      theme.value = varTheme;
    } else {
      theme.value = theme.value === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    }
    storage.set(THEME.THEME, theme.value);
  }

  function syncThemeWithSystem() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (e: MediaQueryListEvent) => {
      toggleTheme(e.matches ? THEME.DARK : THEME.LIGHT);
    };
    toggleTheme(mediaQuery.matches ? THEME.DARK : THEME.LIGHT);
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }

  function syncThemeAcrossTabs() {
    const updateTheme = (e: StorageEvent) => {
      if (e.key === storage.getKey(THEME.THEME)) {
        theme.value = storage.get(THEME.THEME, THEME.LIGHT);
      }
    };
    window.addEventListener('storage', updateTheme);
    return () => window.removeEventListener('storage', updateTheme);
  }

  onMounted(() => {
    const cleanupSystemThemeSync = syncThemeWithSystem();
    const cleanupTabSync = syncThemeAcrossTabs();
    return () => {
      cleanupSystemThemeSync();
      cleanupTabSync();
    };
  });

  watch(
    theme,
    (value: string) => {
      document.documentElement.classList.toggle(THEME.DARK, value === THEME.DARK);
    },
    {
      immediate: true,
    },
  );
  return {
    theme,
    toggleTheme,
  };
};
