<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
    <RouterLink :to="{name:'inscricao'}" > Ir para Inscrição </RouterLink>
  </main>
</template>
