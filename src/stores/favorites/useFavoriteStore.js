import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth/authStore';
import { useLoaderStore } from "@/stores/loader/useLoaderStore";


export const useFavoriteStore = defineStore("favorites", {
    state: () => ({
        loader: useLoaderStore(),
        favorites: [],
        mostfavorites: [],
        mostinstructorfavorites: [],
        errors: null,
        favorite: {},
        allFavorites: [],
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

        async fetchfavorites(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/favorites?page=${page}`);
                this.favorites = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des favories", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
        async mostFavorites() {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/mostFavorites`);
                this.mostfavorites = response.data;

            } catch (error) {
                console.error("Erreur lors de la récupération des favories", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async mostInstructorFavorites() {
            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get(`/mostInstructorFavorites`);
                this.mostinstructorfavorites = response.data;

            } catch (error) {
                console.error("Erreur lors de la récupération des favories", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        async addFavorite(data) {
            const authStore = useAuthStore();

            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global
                if (!authStore.user) {
                    toast.info("Vous devez vous connectez pour mettre un cours en favoris");
                    return;
                }
                const response = await axios.post("/add-favorite", { course_id: data.id }, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data.already == true) {
                    toast.info("Ce cours est deja dans vos favories");
                } else {
                    toast.success("Vous avez ajouter ce cours a vos favories");

                }

                console.log(response);

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





        async removeFavorite(course) {
            try {
                this.loader.show(); // 👉 Active le loader global
                await axios.post(`/remove-favorite`, { course_id: course.id });
                toast.success("Vous avez retirer ce cours de vos favories");
                this.fetchfavorites();
            } catch (error) {
                console.error("Erreur lors de la suppression du favorie", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


    },
});
