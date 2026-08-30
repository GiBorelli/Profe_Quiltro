<template>
  <main>
    <h1>{{ t("home.header") }}</h1>
    <p>{{ t("home.created_by") }}</p>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, d } = useI18n()
</script>