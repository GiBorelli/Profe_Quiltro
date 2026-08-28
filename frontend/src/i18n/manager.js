const localeModules = import.meta.glob('./locales/*.json');
let _i18n = null;

const I18nManager = {
  init(i18nInstance) {
    if (!i18nInstance?.global?.locale) {
      throw new Error("I18nManager.init: invalid i18n instance");
    }
    _i18n = i18nInstance;
  },
  
  async setLocale(newLocale) {
    if (!_i18n) throw new Error("I18nManager.setLocale called before init");

    const current = _i18n.global.locale.value;

    if (current !== newLocale) {
      _i18n.global.locale.value = newLocale;
    }

    document.documentElement.lang = newLocale;
    localStorage.setItem("user-locale", newLocale);   //sera usado localStorage? Revisar
  },

  get supportedLocales() {
    if (supportedLocalesCache) return supportedLocalesCache;

    supportedLocalesCache = Object.keys(localeModules)
      .map(file => file.match(/\.\/locales\/([^/]+)\.json$/)?.[1])
      .filter(Boolean);

    return supportedLocalesCache;
  },

  isLocaleSupported(locale) {
    const normalized = this.normalizeLocale(locale);
    return !!normalized && this.supportedLocales.includes(normalized);
  },

  resolveLocale(locale) {
    const normalized = this.normalizeLocale(locale);
    if (!normalized) return null;

    if (this.isLocaleSupported(normalized)) return normalized;

    const base = normalized.split('_')[0];
    if (this.isLocaleSupported(base)) return base;

    return null;
  },

  getUserLocale() {
    const raw =
      window.navigator.language ||
      window.navigator.userLanguage ||
      this.defaultLocale;

    const normalized = this.normalizeLocale(raw);

    return {
      locale: normalized,              
      localeNoRegion: normalized.split('_')[0]
    };
  },

  getPersistedLocale() {
    const stored = localStorage.getItem("user-locale");
    const normalized = this.normalizeLocale(stored);
    return this.isLocaleSupported(normalized) ? normalized : null;
  },
  
  normalizeLocale(locale) {
    if (!locale) return null;

    return locale
      .toLowerCase()
      .replace('-', '_')
      .replace(/\s+/g, '');
  },

  guessDefaultLocale() {
    const saved = this.getPersistedLocale();
    if (saved) return saved;

    const pref = this.getUserLocale();

    const resolved =
      this.resolveLocale(pref.locale) ||
      this.resolveLocale(pref.localeNoRegion);

    return resolved || this.defaultLocale;
  },

  get defaultLocale() {
    return this.normalizeLocale(import.meta.env.VITE_DEFAULT_LOCALE || "en");
  },

  async routeMiddleware(to) {
    const raw = to.params.locale;
    const fallback = this.guessDefaultLocale();

    const resolved = raw ? this.resolveLocale(raw) : null;

    if (!resolved) {
      return {
        name: to.name,
        params: { ...to.params, locale: fallback },
        query: to.query,
        hash: to.hash,
      };
    }

    if (this.normalizeLocale(raw) !== resolved) {
      return {
        name: to.name,
        params: { ...to.params, locale: resolved },
        query: to.query,
        hash: to.hash,
      };
    }

    this.setLocale(resolved);
    return true;
  },

  get currentLocale() {
    return _i18n?.global?.locale?.value || this.guessDefaultLocale();
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        ...(to?.params || {}),
        locale: this.currentLocale,
      },
    };
  },
};

export default I18nManager;

