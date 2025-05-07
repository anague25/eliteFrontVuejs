import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useReviewsStore = defineStore("reviews", {
    state: () => ({
        loader: useLoaderStore(),

        reviews: [],
        errors: null,
        review: {},
        allReviews: [],
        message: "",
        pagination: {}, // Ajout pour stocker les données de pagination
    }),
    persist: true,
    actions: {

        clearErrors() {
            this.errors = {}; // 🔥 Réinitialisation manuelle des erreurs
        },

        setErrors(errors) {
            this.errors = errors; // ✅ Assigne les erreurs reçues ou un objet vide
        },

        async fetchReviews(reviewableId, reviewableType, page = 1) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get('/all-reviews', {
                    params: {
                        reviewable_id: reviewableId,
                        reviewable_type: reviewableType,
                        page
                    }
                })
                this.reviews = response.data.data
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error('Erreur lors de la récupération des reviews :', error)
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },












        // recuperer le tous avec pagination

        async fetchAllReviews(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/reviews/all?query=${query}`);
                this.allReviews = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des reviews non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },






        async fetchReviewById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/reviews/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération de la review", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createReview(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post("/reviews", data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = 'La review a ete creer avec succes'; // Afficher le message de vérification email
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




        async updateReview(category) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post(`/reviews/${category.get('id')}`, category);
                this.message = 'La review a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchReviews();
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

        async deleteReview(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/reviews/${id}`);
                this.message = 'La review a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchReviews();
            } catch (error) {
                console.error("Erreur lors de la suppression da la review", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleReviews(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/reviews/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les reviews ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchReviews();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
