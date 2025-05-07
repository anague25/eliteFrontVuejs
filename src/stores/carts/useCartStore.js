import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';

export const useCartStore = defineStore("cartStore", {
    state: () => ({
        cart: [], // Stocke les formations dans le localStorage
    }),

    persist: true, // 🔥 Sauvegarde les données après refresh

    actions: {
        addToCart(course) {
            // Vérifier si le cours est déjà dans le panier
            const exists = this.cart.some(item => item.id === course.id);
            if (!exists) {
                this.cart.push({ ...course });
                toast.success("Cours ajouter au panier!");

            } else {
                toast.info("Deja dans le panier!");

            }
        },
        removeFromCart(courseId) {
            this.cart = this.cart.filter(item => item.id !== courseId);
            toast.success("Vous avez supprimer ce cours de votre panier!");
        },
        clearCart() {
            this.cart = [];
        },
    },
    getters: {
        cartTotal() {
            return this.cart.reduce((total, item) => total + Number(item.price), 0);
        },
        cartItemCount() {
            return this.cart.length;
        },
        isInCart: (state) => (courseId) => {
            return state.cart.some(item => item.id === courseId);
        }
    },
});
