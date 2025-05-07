import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useOrderStore = defineStore("orderStore", {
    state: () => ({
        loader: useLoaderStore(),

        orders: [], // Stocke les formations dans le localStorage
        ordersInstructor: [], // Stocke les formations dans le localStorage
        ordersInstructorCount: {}, // Stocke les formations dans le localStorage
    }),

    clearErrors() {
        this.errors = {}; // 🔥 Réinitialisation manuelle des erreurs
    },

    setErrors(errors) {
        this.errors = errors; // ✅ Assigne les erreurs reçues ou un objet vide
    },

    actions: {
        async getOrdersInstructor(page = 1) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/orders/orderInstructor?page=${page}`);
                this.ordersInstructor = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des commandes", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
        async orderInstructorCount() {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/orders/orderInstructorCount`);
                this.ordersInstructorCount = response.data.data[0];

            } catch (error) {
                console.error("Erreur lors de la récupération des commandes", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },

});
