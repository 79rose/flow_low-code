import { storage } from 'utils/storage';
export const useAppStore = defineStore('app', () => {
  const lang = ref(storage.get('lang', navigator.language));
  const readOnly = ref(false);
  const setLang = (value: string) => {
    lang.value = value;
    storage.set('lang', value);
  };
  const setReadOnly = (value: boolean) => {
    readOnly.value = value;
  };
  return {
    lang,
    setLang,
    readOnly,
    setReadOnly,
  };
});
