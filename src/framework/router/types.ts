import type { RouteRecordRaw } from "vue-router";

export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}
