import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useLanguageStore = defineStore("languages", {
    state: () => ({
        loader: useLoaderStore(),

        languages: [],
        errors: null,
        language: {},
        allLanguages: [],
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

        async fetchLanguages(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/languages?page=${page}&query=${query}`);
                this.languages = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des languages", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        async fetchLanguageById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/languages/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération de la langue", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous avec pagination

        async fetchAllLanguages(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/languages/all?query=${query}`);
                this.allLanguages = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des languages non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        async createLanguage(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.post("/languages", data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = 'La langue a ete creer avec succes'; // Afficher le message de vérification email
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




        async updateLanguage(language) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.put(`/languages/${language.id}`, language);
                this.message = 'La langue a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchLanguages();
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

        async deleteLanguage(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.delete(`/languages/${id}`);
                this.message = 'La language a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchLanguages();
            } catch (error) {
                console.error("Erreur lors de la suppression da la language", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleLanguages(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.delete(`/languages/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les langues ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchLanguages();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
