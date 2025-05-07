<template>
  <img @click="addToFavorite(course)" src="/images/pngs/icons8-favorite-48.png" alt="" width="40" class="cursor-pointer">
</template>


<script setup>

import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";

import { useFavoriteStore } from '@/stores/favorites/useFavoriteStore';

const FavoriteStore = useFavoriteStore();

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})


// Fonction pour ajouter un cours au panier
const addToFavorite = (course) => {

  FavoriteStore.addFavorite(course);
};


</script>