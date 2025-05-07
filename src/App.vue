<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GlobalLoader from '@/components/Loader/GlobalLoader.vue';

</script>

<template>
  <!-- app.vue -->
  <RouterView />
  <GlobalLoader /> <!-- Loader global visible ici -->

</template>
