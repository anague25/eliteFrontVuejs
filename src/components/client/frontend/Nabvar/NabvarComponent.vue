<template>
    <!-- TopNabvar -->
    <nav class="bg-dark text-white top-nav-bar d-flex shadow pt-3 px-1 " style="font-size: 12px;">

        <p class="me-auto">
            <!-- <img src="/images/svgs/translate.svg" alt="" class="ps-1"> -->
        </p>
        <ul class=" d-flex top-navbar-option">
            <li class="me-2"><router-link class="nav-link active" aria-current="page"
                    to="/users-dashboard">Dashboard</router-link></li>
            <li class="me-2"> <router-link class="nav-link active" aria-current="page"
                    to="/categories">Categories</router-link>
            </li>
            <li class="me-2"> <router-link to="/about" class="nav-link active" aria-current="page">Abouts</router-link>
            </li>
            <li class="me-2"> <router-link to="/contact" class="nav-link active"
                    aria-current="page">Contacts</router-link>
            </li>
        </ul>
    </nav>

    <!-- Nabvar -->
    <nav class="navbar navbar-expand-lg bg-light shadow border " style="z-index: 10;">
        <div class="container-fluid">
            <router-link class="navbar-brand fw-bold text-success" to="/">
                Novademia</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1"
                id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title fw-bold text-success" id="offcanvasNavbarLabel">Novademia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body d-lg-flex justify-content-lg-between mt-3">

                    <router-link v-if="!(instructorStore.getuser && instructorStore.getuser?.user && instructorStore.getuser?.user?.instructor && instructorStore.getuser?.user?.instructor?.id)" to="/users-dashboard/create-instructor" class="pt-2 nav-link">
                        Devenir instructeur
                    </router-link>
                    <a href="#" class="pt-2 nav-link"></a>

                    <div class="position-relative">
                        <form @submit.prevent class="d-flex">
                            <input class="form-control ps-5" v-model="searchQuery" @keyup.enter="submitSearch"
                                id="search" type="search" aria-label="Search" placeholder="Search...">
                           
                                <i class="bi bi-search mb-3 position-absolute icon-search" style="font-size: 20px;"></i>
                            
                        </form>
                    </div>





                    <p>
                        <router-link to="/users-dashboard/My-favorites-courses" class="">
                            <img src="/images/svgs/favorite.svg" alt="" width="40">
                        </router-link>
                    </p>

                    <p class="">
                        <router-link to="/panier"><img src="/images/svgs/basket.svg" alt="" width="48"
                                class="me-1"></router-link>
                        <span class="badge bg-success">{{ cartStore.cart.length }}</span>
                    </p>

                    <ul class="navbar-nav pe-3">
                        <template v-if="isAuthenticated">
                            <li class="nav-item">
                                <button @click="logout" class="btn btn-danger">Déconnexion</button>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item">
                                <router-link class="nav-link active" to="/login">Se Connecter</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link active" to="/register">S'inscrire</router-link>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from '@/stores/auth/authStore';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useRouter } from 'vue-router';
import { useCartStore } from "@/stores/carts/useCartStore";
import { useInstructorStore } from "@/stores/instructors/useInstructorStore";
import Instructor from "../reviews/Instructor.vue";


const authStore = useAuthStore();
const instructorStore = useInstructorStore();
const cartStore = useCartStore();
const router = useRouter();

// Vérifie si l'utilisateur est connecté
const isAuthenticated = computed(() => !!authStore.user);






const searchQuery = ref('');



const submitSearch = () => {
    if (searchQuery.value.trim() !== '') {
        console.log(searchQuery.value);
        router.push({ name: 'search', query: { query: searchQuery.value } });
    }
};


onMounted(async() => {
   
    
});



// Fonction pour la déconnexion
const logout = async () => {
    try {
        await authStore.logout();
        const notification = useNotificationStore();

        if (notification.message) {
            toast.success(notification.message);
            notification.clearMessage(); // Effacer après affichage
        }
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }

};
</script>



<style scoped>
.top-navbar-option {
    list-style: none;
}

#search::placeholder {
    color: #000000;
    /* Changer la couleur du placeholder */
    font-size: 18px;

    /* Mettre en gras */
    opacity: 1;
    /* Rendre le placeholder complètement visible (valeur par défaut : 0.5) */
}

.icon-search{
    top: 5px;
    left: 5px;
}

/*gpt*/

@media (max-width: 768px) {
   


    .navbar-nav {
        flex-direction: column !important;
        /* Pour éviter que les éléments s'étalent */
    }

    .offcanvas-body {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 35px;
        /* Réduit l'espace entre les éléments */
        padding: 10px;
        /* Ajuste le padding général */
    }

    .navbar-nav .nav-item {
        margin-bottom: 3px !important;
        /* Moins d’espace entre les liens */
    }
}
</style>
