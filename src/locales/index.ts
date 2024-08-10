import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { storage } from 'utils/storage';

interface Module {
  default: Record<string, any>;
}

const modules = import.meta.glob<Module>('./lang/**/*.ts', { eager: true });
const messages = Object.entries(modules).reduce(
  (acc, [key, value]: [string, Module]) => {
    const name = key.match(/\.\/lang\/(.*)\.ts/)![1];
    acc[name] = value.default;
    return acc;
  },
  {} as Record<string, any>,
);

const i18n = createI18n({
  legacy: false,
  locale: storage.get('lang', navigator.language),
  messages,
});

export const setupI18n = (app: App<Element>) => {
  app.use(i18n);
};
