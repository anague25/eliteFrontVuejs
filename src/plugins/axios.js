// plugins/axios.js
import axios from 'axios';
import { useAuthStore } from '@/stores/auth/authStore'; // Ajuste si besoin

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Intercepteur pour ajouter dynamiquement le token à chaque requête
instance.interceptors.request.use((config) => {
  const authStore = useAuthStore(); // On récupère le store ici
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;





// import axios from 'axios';
// import { useAuthStore } from '@/stores/auth/authStore';

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// export function setAuthHeader(token) {
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete axios.defaults.headers.common['Authorization'];
//     }
// }

// export function setupAxios() {
//     const authStore = useAuthStore();

//     if (authStore.token) {
//         setAuthHeader(authStore.token);
//     }

//     authStore.$subscribe((mutation, state) => {
//         setAuthHeader(state.token);
//     });
// }

// export default axios;



