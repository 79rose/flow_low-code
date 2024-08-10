import { storage } from 'utils/storage';
export const useAppStore = defineStore('app', () => {
  const lang = ref(storage.get('lang', navigator.language));
  const setLang = (value: string) => {
    lang.value = value;
    storage.set('lang', value);
  };
  return {
    lang,
    setLang,
  };
});
