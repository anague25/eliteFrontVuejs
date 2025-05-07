<template>
    <div v-if="show" class="popup-overlay" @click.self="emitClose">
      <div class="popup-content text">
        <h5 class="mb-4 white">Tous les avis</h5>
  
        <div v-if="reviews.length">
          <div v-for="(review, index) in reviews" :key="index" class="review-item mb-4 p-3  rounded bgcolor1">
            <div class="d-flex align-items-center mb-2">
              <div
                class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold"
                style="width: 40px; height: 40px;">
                {{ getInitials(review.user?.name || 'U') }}
              </div>
              <div class="ms-3">
                <h6 class="mb-0 white">{{ review.user?.firstName || 'Utilisateur' }}</h6>
                <small class="text-light">{{ formatDate(review.created_at) }}</small>
              </div>
            </div>
  
            <div class="text-white mb-2">
              <i v-for="n in review.rating" :key="n" class="bi bi-star-fill"></i>
            </div>
  
            <p class="mb-0">{{ review.comment }}</p>
          </div>
        </div>
        <div v-else>
          <p>Aucun avis disponible.</p>
        </div>
  
        <div class="text-end">
          <button class="btn btn-outline-light mt-2" @click="emitClose">Fermer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { formatDistanceToNow } from 'date-fns';
  import { fr } from 'date-fns/locale';
  
  const props = defineProps({
    reviews: Array,
    show: Boolean
  });
  
  const emit = defineEmits(['close']);
  
  const emitClose = () => emit('close');
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const formatDate = (date) => {
    if (!date) return '';
    return 'il y a ' + formatDistanceToNow(new Date(date), { locale: fr });
  }
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color:rgb(0, 0, 0);

    padding: 2rem;
    border-radius: 12px;
    max-width: 600px;
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }

  </style>
  