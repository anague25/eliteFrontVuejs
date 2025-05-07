import { defineStore } from "pinia";
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        loader: useLoaderStore(),

        courses: [],
        filters: {
            query: '',
            language_id: null,
            levelStart: null,
            levelEnd: null,
            categories: [],
        }
    }),

    actions: {
        async fetchCourses() {

            try {
                this.loader.show(); // 👉 Active le loader global
                const response = await axios.get('/courses', {
                    params: this.filters,
                });

                this.courses = response.data.data;
            } catch (error) {
                console.error('Erreur lors du chargement des cours:', error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        setQuery(query) {
            this.filters.query = query;
        },

        toggleCategory(categoryId) {
            const index = this.filters.categories.indexOf(categoryId);
            if (index === -1) {
                this.filters.categories.push(categoryId);
            } else {
                this.filters.categories.splice(index, 1);
            }
        },

        setLanguage(languageId) {
            this.filters.language_id = languageId;
        },

        setLevelRange(start, end) {
            this.filters.levelStart = start;
            this.filters.levelEnd = end;
        },
    },
});