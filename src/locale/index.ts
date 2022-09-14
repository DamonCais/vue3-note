import { createI18n } from 'vue-i18n';
import en from './i18n/en';
import zh from './i18n/zh';

const i18n = createI18n({
  locale: 'en',
  globalInjection: true,
  messages: {
    en,
    zh
  }
});

export default i18n;
