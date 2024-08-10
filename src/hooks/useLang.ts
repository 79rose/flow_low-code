import { useAppStore } from 'store/modules/app';
export const useLang = () => {
  const appStore = useAppStore();
  const { locale } = useI18n();
  const lang = computed(() => appStore.lang);
  const { setLang } = appStore;

  const changeLang = (lang: string) => {
    locale.value = lang;
    setLang(lang);
  };
  return {
    changeLang,
    lang,
  };
};
