<template>
    <div class="bgcolor2">
        <Navbar></Navbar>
        <!-- Section Panier -->
        <section class="cart-section">
            <div class="px-5 py-5">
                <h2 class="text-center py-3 px-5 border text-white fw-bold mb-5 title-panier">Votre Panier</h2>
                <div v-if="cartStore.cart.length > 0" class="row">
                    <div class="col-lg-8">
                        <div class="bgcolor1 text p-4 border shadow">
                            <div v-for="course in cartStore.cart" :key="course.id"
                                class="cart-item d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <img :src="$baseUrl + course.image" alt="Image du cours" class="img-fluid"
                                        style="width: 80px; height: 80px; margin-right: 20px;">
                                    <div>
                                        <h5 class="mb-1 text-white">{{ course.title }}</h5>
                                        <p class="mb-1">{{ truncateText(course.description, 45) }}</p>
                                        <span class="text-green fw-bold">Prix : {{ (Number(course.price)).toFixed(2) }}XAF</span>
                                    </div>
                                </div>
                                <a href="#" class="btn-remove" @click.prevent="removeFromCart(course.id)">Supprimer</a>
                            </div>
                        </div>
                    </div>

                    <!-- Résumé de la commande -->
                    <div class="col-lg-4">
                        <div class="bgcolor1 p-4 border shadow">
                            <h4 class="text-success">Résumé de la Commande</h4>
                            <hr>
                            <div class="d-flex justify-content-between mb-3 text-white">
                                <span>Sous-total</span>
                                <span class="fw-bold">{{ (Number(cartStore.cartTotal)).toFixed(2) }}XAF</span>
                            </div>
                            <div class="d-flex justify-content-between mb-3 text-white">
                                <span>Frais</span>
                                <span class="fw-bold">{{ (500).toFixed(2) }}XAF</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between mb-3">
                                <span class="text-success fw-bold">Total</span>
                                <span class="text-success fw-bold">{{ (Number(cartStore.cartTotal + 500)).toFixed(2)
                                    }}XAF</span>
                            </div>
                            <!-- Choix du moyen de paiement -->
                            <div class="payment-method mb-3">
                                <label class="text-white mb-1">Méthode de Paiement:</label>
                                <div>
                                    <input type="radio" id="mtn" value="MTN" v-model="paymentMethod" />
                                    <label for="mtn" class="text-white">MTN</label>
                                </div>
                                <div>
                                    <input type="radio" id="orange" value="Orange" v-model="paymentMethod" />
                                    <label for="orange" class="text-white">Orange</label>
                                </div>
                            </div>

                            <!-- Numéro de téléphone -->
                            <div class="phone-number mb-3">
                                <label for="phone" class="text-white mb-1">Numéro de téléphone:</label>
                                <input type="tel" id="phone" v-model="from" class="form-control"
                                    placeholder="Entrez votre numéro" required />
                            </div>
                            <button @click="handleCheckout"
                                class="btn btn-checkout btn-success text-white w-100 mt-3">Procéder au
                                Paiement</button>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-white py-5">
                    <h4>Votre panier est vide</h4>
                    <router-link to="/" class="btn btn-primary mt-3">Explorer les cours</router-link>
                </div>
            </div>
        </section>
        <FooterComponent></FooterComponent>
    </div>
</template>

<script setup>
import { useCartStore } from "@/stores/carts/useCartStore";
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import { computed, ref } from "vue";
import { toast } from 'vue3-toastify';
import axios from '@/plugins/axios';
import { useLoaderStore } from "@/stores/loader/useLoaderStore";

const loader = useLoaderStore();



const cartStore = useCartStore();
const removeFromCart = (courseId) => {
    cartStore.removeFromCart(courseId);
};


// Variables pour la méthode de paiement et le numéro de téléphone
const paymentMethod = ref(null);
const from = ref("");


// Fonction pour tronquer le texte
const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
};







// Fonction pour gérer le processus de paiement
const handleCheckout = async () => {
    if (!paymentMethod.value) {
        toast.error("Veuillez choisir une méthode de paiement.");
        return;
    }

    if (!from.value) {
        toast.error("Veuillez entrer votre numéro de téléphone.");
        return;
    }

    // Récupérer les cours dans le panier
    const courses = cartStore.cart.map(item => ({
        course_id: item.id,
        price: item.price
    }));

    const data = {
        payment_method: paymentMethod.value,
        amount: cartStore.cartTotal + 500, // Tu devras calculer le montant total du panier
        courses: courses,
        from: from.value,
    };

    try {
        loader.show(); // 👉 Active le loader global


        const response = await axios.post("/orders", data, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8' // Ajoute charset=UTF-8 ici si tu envoies du JSON
            }
        }
        );

        if (response.status === 201) {
            toast.success("Commande créée avec succès!");
            // Rediriger l'utilisateur vers la page de paiement ou autre
        } 
    } catch (error) {
        toast.error("Echec de l'achat , paiement annuler ou non valider.");
    } finally {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        loader.hide(); // 👉 Désactive le loader global
    }
};






</script>

<style scoped>
.bgcolor2 {
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
}

.cart-section {
    min-height: 80vh;
    overflow-y: auto;
}

.row {
    margin: 0;
    width: 100%;
}

.bg-dark-green {
    background-color: #004d00;
}

.text-green {
    color: #28a745;
}

.cart-section {
    padding: 0 0;
}

.cart-item {
    padding: 20px;
    border-bottom: 1px solid #ddd;
}

.btn-remove {
    color: #dc3545;
}

.title-panier:hover {
    background-color: #191c24;
    color: #6c7293 !important;
}
</style>