import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useVideoStore = defineStore("videos", {
    state: () => ({
        loader: useLoaderStore(),

        videos: [],
        errors: null,
        video: {},
        allVideos: [],
        message: "",
        pagination: {}, // Ajout pour stocker les données de pagination
    }),
    actions: {

        clearErrors() {
            this.errors = {}; // 🔥 Réinitialisation manuelle des erreurs
        },

        setErrors(errors) {
            this.errors = errors; // ✅ Assigne les erreurs reçues ou un objet vide
        },


        async createVideo(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post(`/videos`, data);
                this.message = "Le video a ete creer avec succes"; // Afficher le message de vérification email
                notification.setMessage(this.message);
            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async fetchVideos(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/videos?page=${page}&query=${query}`);
                this.videos = response.data.data;
                console.log(this.videos);
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des video", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous avec pagination

        async fetchAllVideos(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/videos/all?query=${query}`);
                this.allVideos = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des Cours non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        async fetchVideoById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/videos/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des videos", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        async updateVideo(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post(`/videos/${data.id}`, data);
                this.message = "Le video a été mis à jour avec succès";
                notification.setMessage(this.message);
                this.fetchVideos();
            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteVideo(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/videos/${id}`);
                this.message = 'La video a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchVideos();
            } catch (error) {
                console.error("Erreur lors de la suppression de la video", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleVideos(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/videos/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les videos ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchVideos();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
