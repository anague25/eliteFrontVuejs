import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useCategoryStore = defineStore("categories", {
    state: () => ({
        loader: useLoaderStore(),
        categories: [],
        errors: null,
        category: {},
        allCategories: [],
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

        async fetchCategories(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/categories?page=${page}&query=${query}`);
                this.categories = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des categories", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        // recuperer le tous avec pagination

        async fetchAllCategories(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/categories/all?query=${query}`);
                this.allCategories = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des categories non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },






        async fetchCategoryById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/categories/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération de la categorie", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createCategory(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.post("/categories", data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = 'La categorie a ete creer avec succes'; // Afficher le message de vérification email
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




        async updateCategory(category) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.post(`/categories/${category.get('id')}`, category);
                this.message = 'La categorie a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchCategories();
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

        async deleteCategory(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.delete(`/categories/${id}`);
                this.message = 'La categorie a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchCategories();
            } catch (error) {
                console.error("Erreur lors de la suppression da la categorie", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleCategories(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.delete(`/categories/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les categories ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchCategories();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
