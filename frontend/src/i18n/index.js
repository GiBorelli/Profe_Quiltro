import en from "./locales/es.json"
import lv from "./locales/pt.json"

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  globalInjection: true,
  messages: {
    es,
    pt,
  },
})

