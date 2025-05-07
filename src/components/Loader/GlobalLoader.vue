<!-- components/GlobalLoader.vue -->
<template>
    <div v-if="loader.loading" class="global-loader">
        <div class="spinner-border custom-spinner text-success" role="status">
        </div>
        <span class="visually p-2 white">Loading...</span>
    </div>
</template>

<script setup>
import { useLoaderStore } from '@/stores/loader/useLoaderStore';
const loader = useLoaderStore();
</script>

<style scoped>
.global-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner-text {
    color: white;
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
}

.custom-spinner {
    width: 12rem;
    /* taille du spinner */
    height: 12rem;
    border-width: 12px;
}
</style>