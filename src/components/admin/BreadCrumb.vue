<template>
    <nav>
      <ol class="breadcrumb">
       
        <li
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item"
          :class="{ active: index === breadcrumbs.length - 1 }"
        >
          <template v-if="index < breadcrumbs.length - 1">
            <router-link :to="crumb.path">{{ crumb.path }}</router-link>
          </template>
          <span v-else>{{ crumb.path }}</span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  
  const breadcrumbs = computed(() => {
    return route.matched.map((r) => ({
      path: r.path, // On affiche l'URL brute
    }));
  });
  </script>
  
  <style scoped>
  .breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0;
  }
  
  .breadcrumb-item a {
    text-decoration: none;
    color: #007bff;
  }
  
  .breadcrumb-item.active {
    font-weight: bold;
    color: #28a745;
  }
  </style>
  