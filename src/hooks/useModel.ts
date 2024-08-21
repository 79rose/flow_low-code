/**
 * useModel 切换只读 / 编辑状态
 */

import { useAppStore } from 'store/modules/app';

export const useModel = () => {
  const app = useAppStore();
  const { setReadOnly: appSetReadOnly } = app;
  const readOnly = computed(() => app.readOnly);
  const setReadOnly = (value: boolean) => {
    appSetReadOnly(value);
  };
  return {
    readOnly,
    setReadOnly,
  };
};
