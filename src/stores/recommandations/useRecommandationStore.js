import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useRecommandationStore = defineStore("recommandations", {
    state: () => ({
        loader: useLoaderStore(),

        recommandations: [],
        courses: [],
        errors: null,
        recommandation: {},
        allRecommandations: [],
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

        async fetchRecommandations(page = 1, user_query = "", course_query = '') {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/recommandations?page=${page}&user_query=${user_query}&course_query=${course_query}`);
                this.recommandations = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des recommandations", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async getCoursesByRecommendations() {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/recommandations-course-count`);
                this.courses = response.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des courses", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        // recuperer le tous avec pagination

        async fetchAllRecommandations(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/recommandations/all?query=${query}`);
                this.allRecommandations = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des recommandations non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },






        async fetchRecommandationById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/recommandations/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération de la recommandation", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createRecommandation(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post("/recommandations", data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = 'La prerequie a ete creer avec succes'; // Afficher le message de vérification email
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

        async updateRecommandation(recommandation) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.put(`/recommandations/${recommandation.id}`, recommandation);
                this.message = 'La prerequie a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchRecommandations();
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

        async deleteRecommandation(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/recommandations/${id}`);
                this.message = 'La recommandation a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchRecommandations();
            } catch (error) {
                console.error("Erreur lors de la suppression da la recommandation", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleRecommandations(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/recommandations/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les recommandations ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchRecommandations();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
