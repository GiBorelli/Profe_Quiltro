<script setup lang="ts">
  defineOptions({ name: 'FlagUsa' });
</script>

<template>
  <div>
    <!-- Bandeira dos EUA -->
    <svg width="24" height="24" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Fundo vermelho -->
      <rect fill="#B22234" width="720" height="504" />

      <!-- Listras brancas -->
      <rect
        v-for="stripe in [1, 3, 5, 7, 9, 11, 13, 15]"
        :key="stripe"
        fill="#FFFFFF"
        :y="stripe * (400 / 13)"
        width="760"
        :height="400 / 13" />

      <!-- Cantão azul -->
      <rect fill="#3C3B6E" width="304" :height="(400 / 13) * 7" />
    </svg>
  </div>
</template>