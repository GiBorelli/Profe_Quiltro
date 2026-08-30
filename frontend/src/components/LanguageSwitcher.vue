<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useI18n } from "vue-i18n";
  import I18nManager from "@/i18n/manager";

  const { t } = useI18n();

  const estaAberto = ref(false);
  const rootRef = ref(null);
  const idiomaAtual = computed(() => t(`locale.${I18nManager.currentLocale}`));
  const listaIdiomas = computed(() => I18nManager.supportedLocales.map((code) => ({
    code,
    label: t(`locale.${code}`),
    }))
  );

  async function selectLocale(code) {
    await I18nManager.setLocale(code);
    estaAberto.value = false;
  }

  function cliqueForaDaArea(event) {
    if (rootRef.value && !rootRef.value.contains(event.target)) {
      estaAberto.value = false;
    }
  }

  onMounted(() => document.addEventListener("click", cliqueForaDaArea));
  onUnmounted(() => document.removeEventListener("click", cliqueForaDaArea));
</script>

<template>
  <div class="lang-switcher" ref="rootRef">
    <button
      class="lang-switcher__btn"
      type="button"
      @click="estaAberto = !estaAberto"
     
    >
      {{ idiomaAtual }}
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <ul v-if="estaAberto" class="lang-switcher__menu">
      <li
        v-for="idioma in listaIdiomas"
        :key="idioma.code"
        class="lang-switcher__item"
        @click="selectLocale(idioma.code)"
      >
        {{ idioma.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.lang-switcher {
  position: relative;
}

.lang-switcher__btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a1a;
  cursor: pointer;
}

.lang-switcher__menu {
  position: absolute;
  top: calc(260%);
  right: 0;
  min-width: 160px;
  background-color: #d9d9d9;
  border: 1px solid #4a4a4a;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 50;
}

.lang-switcher__item {
  padding: 0.7rem 1rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.95rem;
  color: #1a1a1a;
  border-bottom: 1px solid #4a4a4a;
  cursor: pointer;
}

.lang-switcher__item:last-child {
  border-bottom: none;
}

.lang-switcher__item:hover {
  background-color: #c9c9c9;
}

.lang-switcher__item.is-active {
  font-weight: 700;
}
</style>