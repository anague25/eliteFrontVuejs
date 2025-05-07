import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'; // Importer Axios
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import truncate from './utils/truncate';


import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 🔥 Active la persistance des données Pinia

const app = createApp(App)

// Ajouter la fonction à toutes les instances de composant
app.config.globalProperties.$truncate = truncate;

app.use(pinia)
app.use(router)


app.use(Vue3Toastify, {
  autoClose: 3000, // Durée d'affichage des toasts en millisecondes
  position: "top-right", // Position du toast
  theme: "light", // Thème du toast (light, dark, auto)
});

app.config.globalProperties.$toast = toast; // Pour pouvoir l'utiliser globalement
app.config.globalProperties.$baseUrl = import.meta.env.VITE_API_BASE_URL_IMAGE;
app.config.globalProperties.$baseUrlVideo = import.meta.env.VITE_API_BASE_URL_VIDEO;
app.config.globalProperties.$axios = axios; // Optionnel : accès global


app.mount('#app')
