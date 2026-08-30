<script setup>
    import {ref, onMounted, onUnmounted} from 'vue'
    import { useI18n } from 'vue-i18n'
    import LanguageSwitcher from './LanguageSwitcher.vue'
    import I18nManager from '@/i18n/manager.js'

    const { t } = useI18n()

    const menuAberto = ref(false)
    const perfil = ref(null)
    /*
    const menuItens = ref([
        {chave: 'historico', acao: 'historico'},
        {chave: 'estatisticas', acao: 'estatisticas'},
        {chave: 'login', acao: 'login'},
    ])
    */
    function selecionarItem(item){
        console.log('Selecionado:', item.acao)
        menuAberto.value = false
    }

    function cliqueForaDaArea(event) {
        if (perfil.value && !perfil.value.contains(event.target)) {
            menuAberto.value = false
        }
    }

    onMounted(() => document.addEventListener("click", cliqueForaDaArea));
    onUnmounted(() => document.removeEventListener("click", cliqueForaDaArea));
</script>

<template>
  <header class="barra-superior">
      <div class="barra-superior-container">
          <!--logo-->
          <div class="logo">
              <div class="barra-superior-logo"></div>
              <h1 class="barra-titulo">Profe Quiltro</h1>
          </div>

          <!--idioma e perfil-->
          <div class="barra-superior-acoes">
              <LanguageSwitcher />
              
              <div class="barra-superior-perfil" ref="perfil">
                  <a class="barra-superior-botao-perfil" @click="menuAberto = !menuAberto" :aria-expanded="menuAberto" aria-label="Abrir menu opções">
                    <img src="../../public/images/Perfil.svg" class="logo-perfil">
                  </a>

                  <!--menu expansivel-->
                  <ul v-if="menuAberto" class="menu-expansivel">
                      <!--li v-for="item in menuItens" :key="item.label" class="menu-expansivel-item" @click="selecionarItem(item)">
                          {{ t(`perfil-dropdown.${item.chave}`) }}
                      </li>-->
                      <li class="menu-expansivel-item">
                        <RouterLink :to="I18nManager.i18nRoute({ name: 'historico' })">
                        {{ t('perfil-dropdown.historico') }}
                        </RouterLink>
                      </li>
                      <li class="menu-expansivel-item">
                        <RouterLink :to="I18nManager.i18nRoute({ name: 'estatisticas' })">
                          {{ t('perfil-dropdown.estatisticas') }}
                        </RouterLink>
                      </li>
                      <li class="menu-expansivel-item" @click="selecionarItem({ chave: 'login', acao: 'login' })">
                        {{ t('perfil-dropdown.login') }}
                      </li>
                  </ul>
              </div>
          </div>
      </div>  
  </header>
</template>

<style>
/*logo e definicoes gerais*/
.barra-superior{
  width: 100%;
  background-color: #d9d9d9;
}

.barra-superior-container{
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.barra-superior-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #2b2b2b;
  flex-shrink: 0;
}

.barra-titulo {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.9rem;
  font-weight: 400;
  color: #1a1a1a;
  margin: 0;
}

/*acoes*/
.barra-superior-acoes {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.barra-superior-perfil {
  position: relative;
}

.barra-superior-botao-perfil {
  width: 50%;
  border-radius: 8px;
  background-color: #1a1a1a;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.barra-superior-botao-perfil:hover {
  background-color: #333;
}

.logo-perfil{
  width: 100%;
  height: auto;
}

/*dropdown perfil*/
.menu-expansivel {
  position: absolute;
  top: calc(145%);
  right: 0;
  min-width: 260px;
  background-color: #d9d9d9;
  border: 1px solid #4a4a4a;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 50;
}

.menu-expansivel-item {
  padding: 0.9rem 1.1rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.05rem;
  color: #1a1a1a;
  border-bottom: 1px solid #4a4a4a;
  cursor: pointer;
}

.menu-expansivel-item:last-child {
  border-bottom: none;
}

.menu-expansivel-item:hover {
  background-color: #c9c9c9;
}
</style>