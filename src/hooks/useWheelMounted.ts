/**
 * 监听滚动事件 + ctrl
 * @param callback
 */

export const useWheelMounted = (callback: (e: WheelEvent) => void, endCallback: () => void) => {
  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      callback(e);
    }
  };

  const onCtrlUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      endCallback();
    }
  };
  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keyup', onCtrlUp);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keyup', onCtrlUp);
  });
};
