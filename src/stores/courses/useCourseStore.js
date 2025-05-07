import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useCourseStore = defineStore("courses", {
    state: () => ({
        loader : useLoaderStore(),
        courses: [],
        orders: [],
        errors: null,
        course: {},
        allCourses: [],
        getCoursesInstructor: [],
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

        async fetchCourses(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/courses?page=${page}&query=${query}`);
                this.courses = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des cours", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async purchasedCourses(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/purchasedCourses?page=${page}&query=${query}`);
                this.courses = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des cours", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async soldCourses(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/soldCourses?page=${page}&query=${query}`);
                this.orders = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des commandes", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async adminOrder(page = 1, query = "") {

            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/orders?page=${page}&query=${query}`);
                this.orders = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des commandes", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        // recuperer le tous avec pagination

        async fetchAllCourses(query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/courses/all?query=${query}`);
                this.allCourses = response.data.data; // Stocke les secteurs

            } catch (error) {
                console.error("Erreur lors de la récupération des Cours non pagines :", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async coursesInstructor(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/coursesInstructor?page=${page}&query=${query}`);
                this.getCoursesInstructor = response.data.data; // Stocke les secteurs
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des Cours non pagines :", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        async fetchCourseById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/courses/${id}`);
                return response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des courses", error);
                throw error;
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async createCourse(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post(`/courses`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.message = "Le cours a ete creer avec succes"; // Afficher le message de vérification email
                notification.setMessage(this.message);
            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async updateCourse(data) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post(`/courses/${data.get('id')}`, data);
                this.message = "Le cours a été mis à jour avec succès";
                notification.setMessage(this.message);
                this.fetchCourses();
            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteCourse(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/courses/${id}`);
                this.message = 'La cours a ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchCourses();
            } catch (error) {
                console.error("Erreur lors de la suppression du cours", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async deleteMultipleCourses(ids) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.delete(`/courses/delete-multiple`, { data: { ids: ids } });
                this.message = 'Les cours ont ete supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchCourses();
            } catch (error) {
                console.error("Erreur lors de la suppression multiple", error);
            }finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
    },
});
