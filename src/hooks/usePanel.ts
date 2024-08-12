import { usePanelStore } from 'store/panel';

export const usePanel = () => {
  const panelStore = usePanelStore();
  const openPanel = (panel: string | string[]) => {
    panelStore.open();
    panelStore.setCurrentPanel(panel);
  };

  const closePanel = () => {
    panelStore.close();
  };

  const currentPanel = computed(() => panelStore.currentPanel);
  const isOpen = computed(() => panelStore.isOpen);
  return {
    isOpen,
    openPanel,
    closePanel,
    currentPanel,
  };
};
