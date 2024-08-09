import { storage } from 'utils/storage';
const THEME = 'theme';

export const useTheme = () => {
  const theme = ref(storage.get(THEME, 'light'));

  function toggleTheme(varTheme?: string) {
    if (varTheme) {
      theme.value = varTheme;
    } else {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    }
    storage.set(THEME, theme.value);
  }

  function syncThemeWithSystem() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (e: MediaQueryListEvent) => {
      toggleTheme(e.matches ? 'dark' : 'light');
    };
    toggleTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }

  function syncThemeAcrossTabs() {
    const updateTheme = (e: StorageEvent) => {
      if (e.key === storage.getKey(THEME)) {
        theme.value = storage.get(THEME, 'light');
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
      document.documentElement.classList.toggle('dark', value === 'dark');
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
