<script setup lang="ts">
  defineOptions({ name: 'FlagSpain' });
</script>

<template>
  <div>
    <svg width="24" height="24" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Faixa vermelha superior -->
      <rect fill="#AA151B" width="750" height="125" />

      <!-- Faixa amarela central -->
      <rect fill="#F1BF00" y="125" width="750" height="250" />

      <!-- Faixa vermelha inferior -->
      <rect fill="#AA151B" y="375" width="750" height="125" />
    </svg>
  </div>
</template>