import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useInstructorStore = defineStore("instructors", {
    state: () => ({
        loader: useLoaderStore(),

        instructors: [],
        errors: null,
        instructor: {},
        getinstructor: {},
        allInstructors: [],
        message: "",
        pagination: {}, // Ajout pour stocker les données de pagination
    }),
    persist: true, // 🔥 Sauvegarde les données après refresh
    actions: {

        clearErrors() {
            this.errors = {}; // 🔥 Réinitialisation manuelle des erreurs
        },

        setErrors(errors) {
            this.errors = errors; // ✅ Assigne les erreurs reçues ou un objet vide
        },

        async fetchInstructors(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/instructors?page=${page}&query=${query}`);
                this.instructors = response.data.data;
                console.log(this.instructors);
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des instructeurs", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous avec pagination

        async fetchAllInstructors(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/instructors/all?query=${query}`);
                this.allInstructors = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des Instructeurs non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        async fetchInstructorById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/instructors/${id}`);
                this.instructor = response.data.data;
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des instructeurs", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        async getInstructor() {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/getInstructor`);
                this.getinstructor = response.data.data;
                return response.data.data;

            } catch (error) {
                console.error("Erreur lors de la récupération de l'instructeur", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createInstructor(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.post(`/instructors`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = "L'instructeur a ete creer avec succes"; // Afficher le message de vérification email
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




        async updateInstructor(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.post(`/instructors/update/${data.get('id')}`, data);
                this.message = "L'instructeur a été mis à jour avec succès";
                notification.setMessage(this.message);
                this.fetchInstructors();
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

        async deleteInstructor(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.delete(`/instructors/${id}`);
                this.message = 'Profil du Formateur supprimer avec succe'; // Afficher le message de vérification email
                this.instructor = {};
                this.getinstructor = {};
                notification.setMessage(this.message);
                this.fetchInstructors();
            } catch (error) {
                console.error("Erreur lors de la suppression da la instructor", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleInstructors(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.delete(`/instructors/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les instructeurs ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchInstructors();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
