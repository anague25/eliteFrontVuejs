import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const usePrerequisiteStore = defineStore("prerequisites", {
    state: () => ({
        loader: useLoaderStore(),

        prerequisites: [],
        errors: null,
        prerequisite: {},
        allPrerequisites: [],
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

        async fetchPrerequisites(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/prerequisites?page=${page}&query=${query}`);
                this.prerequisites = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des prerequisites", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        // recuperer le tous avec pagination

        async fetchAllPrerequisites(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/prerequisites/all?query=${query}`);
                this.allPrerequisites = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des prerequisites non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },






        async fetchPrerequisiteById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/prerequisites/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération de la prerequisite", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createPrerequisite(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post("/prerequisites", data, {
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

        async updatePrerequisite(prerequisite) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.put(`/prerequisites/${prerequisite.id}`, prerequisite);
                this.message = 'La prerequie a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchPrerequisites();
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

        async deletePrerequisite(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/prerequisites/${id}`);
                this.message = 'La prerequisite a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchPrerequisites();
            } catch (error) {
                console.error("Erreur lors de la suppression da la prerequisite", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultiplePrerequisites(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/prerequisites/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les prerequisites ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchPrerequisites();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
