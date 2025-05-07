<template>

    <!-- Icône panier en dehors du lien -->
    <img width="35" @click="addToCart(course)" src="/images/pngs/icons8-caddie-100.png" class="panier cursor-pointer"
        alt="" style="position: absolute; bottom: 10px; right: 10px; cursor: pointer;">
</template>


<script setup>

import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";

import { useCartStore } from '@/stores/carts/useCartStore';

const cartStore = useCartStore();

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})


// Fonction pour ajouter un cours au panier
const addToCart = (course) => {

    cartStore.addToCart(course);
};


</script>