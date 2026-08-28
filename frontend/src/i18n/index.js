import es from "./locales/es.json"
import pt from "./locales/pt.json"
import datetimeFormats from "./rules/datetime.js";

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  globalInjection: true,
  messages: {
    es,
    pt,
  },
  datetimeFormats,
})

