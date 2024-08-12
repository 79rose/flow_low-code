export const useToggle = (initialisOpen: boolean = false) => {
  const isOpen = ref(initialisOpen);
  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    open,
    close,
  };
};
