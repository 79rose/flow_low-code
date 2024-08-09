/**
 * 检测用户的系统是否被开启了动画减弱功能
 * @link https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion
 */
export function isReducedMotion() {
  return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
}
