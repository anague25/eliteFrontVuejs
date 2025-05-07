import { defineStore } from 'pinia';
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";


export const useSectorStore = defineStore('sectors', {
    state: () => ({
        loader: useLoaderStore(),

        sector: {},
        sectors: [],
        allSectors: [],
        errors: {}, // 🔥 Stockage des erreurs de validation
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

        // creer
        async create(formData) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.post('/sectors', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                this.message = 'Le secteur a ete creer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                return response.data;

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

        // Récupérer un secteur par ID
        async fetchSectorById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/sectors/${id}`);
                return response.data.data;
            } catch (error) {
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // Mettre à jour un secteur
        async updateSector(sector) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête

            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.put(`/sectors/${sector.id}`, sector);
                this.message = 'Le secteur a été mis à jour avec succès';
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



        // recuperer le tous avec pagination

        async fetchSectors(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/sectors?page=${page}&query=${query}`);
                this.sectors = response.data.data; // Stocke les secteurs
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des secteurs :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous avec pagination

        async fetchAllSectors(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/sectors/all?query=${query}`);
                this.allSectors = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des secteurs non pagines :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // Supprimer un secteur
        async deleteSector(sectorId) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/sectors/${sectorId}`);
                this.message = 'Le secteur a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchSectors(); // Rafraîchir la liste après la suppression
            } catch (error) {
                console.error("Erreur lors de la suppression du secteur :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleSectors(sectorIds) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete('/sectors/delete-multiple', { data: { sector_ids: sectorIds } });
                this.message = 'Les secteurs ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
            } catch (error) {
                console.error(error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        }

    }
});
