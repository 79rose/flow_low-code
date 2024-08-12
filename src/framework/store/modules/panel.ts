import { useToggle } from 'hooks/useToggle';
export const usePanelStore = defineStore('panel', () => {
  const { isOpen, open, close } = useToggle();
  const currentPanel = ref<string[]>([]);
  const setCurrentPanel = (value: string | string[]) => {
    currentPanel.value = Array.isArray(value) ? value : [value];
  };
  return {
    isOpen,
    open,
    close,
    currentPanel,
    setCurrentPanel,
  };
});
