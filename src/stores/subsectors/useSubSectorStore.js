import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useSubSectorStore = defineStore("subSectorStore", {
    state: () => ({
        loader: useLoaderStore(),

        subSectors: [],
        errors: null,
        subSector: {},
        allSubSectors: [],
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

        async fetchSubSectors(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/subsectors?page=${page}&query=${query}`);
                this.subSectors = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des sous-secteurs", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous sans pagination

        async fetchAllSubSectors(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/subsectors/all?query=${query}`);
                this.allSubSectors = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des sous-secteurs non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },





        async fetchSubSectorById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/subsectors/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération du sous-secteur", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createSubSector(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post("/subsectors", data);
                this.message = 'Le sous-secteur a ete creer avec succes'; // Afficher le message de vérification email
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

        async updateSubSector(subSector) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.put(`/subsectors/${subSector.id}`, subSector);
                this.message = 'Le sous-secteur a été mis à jour avec succès';
                notification.setMessage(this.message);
                this.fetchSubSectors();
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

        async deleteSubSector(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/subsectors/${id}`);
                this.message = 'Le sous-secteur a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchSubSectors();
            } catch (error) {
                console.error("Erreur lors de la suppression du sous-secteur", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleSubSectors(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/subsectors/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les sous-secteurs ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchSubSectors();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
