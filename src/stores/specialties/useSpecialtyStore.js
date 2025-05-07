import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useSpecialtyStore = defineStore("specialties", {
    state: () => ({
        loader: useLoaderStore(),

        specialties: [],
        errors: null,
        specialty: {},
        allSpecialties: [],
        getSpecialtiesInstructor: [],
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

        async fetchSpecialties(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/specialties?page=${page}&query=${query}`);
                this.specialties = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des specialtees", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async fetchSpecialtiesInstructor(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/fetchSpecialtiesInstructor?page=${page}&query=${query}`);
                this.getSpecialtiesInstructor = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des specialtees", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        async fetchSpecialtyById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/specialties/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération de la specialite", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous avec pagination

        async fetchAllSpecialties(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/specialties/all?query=${query}`);
                this.allSpecialties = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des specialites non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        async createSpecialty(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post("/specialties", data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = 'La specialites a ete creer avec succes'; // Afficher le message de vérification email
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




        async updateSpecialty(specialty) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.put(`/specialties/${specialty.id}`, specialty);
                this.message = 'La specialite a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchSpecialties();
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

        async deleteSpecialty(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/specialties/${id}`);
                this.message = 'La specialte a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchSpecialties();
            } catch (error) {
                console.error("Erreur lors de la suppression da la specialte", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleSpecialties(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/specialties/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les specialties ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchSpecialties();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
