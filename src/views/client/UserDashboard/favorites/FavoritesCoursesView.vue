<template>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">liste de vos cours favories</li>
                </ol>
            </nav>
        </div>


        <div class="table-container card  bgcolor2">
            <div class="card-body">
                <h3 class="text-center text-uppercase text-white fw-bold mb-3">Vos favories</h3>



                <div class="d-flex flex-wrap gap-2 " v-if="FavoriteStore.favorites.length > 0">




                    <div v-for="favorite in FavoriteStore.favorites" :key="favorite.id"
                        class="card card-course-some  position-relative">
                        <span @click="deleteFavorite(favorite.course)" style="position: absolute; top: 5px; right: 5px; cursor: pointer;">
                            <span class="badge bg-danger">Suppr</span>
                        </span>
                        <!-- Lien vers le cours -->
                        <router-link :to="'/home-course/' + favorite.course.id" class="course-link text-dark">
                            <img :src="$baseUrl + favorite.course.image" class="card-img-top img-cat"
                                alt="Image du cours">
                            <div class="card-body">
                                <h5 class="card-title">{{ truncateText(favorite.course.title, 45) }}</h5>
                                <p class="card-text">{{ truncateText(favorite.course.description, 45) }}</p>
                                <p class="card-text">Prix : {{ truncateText(favorite.course.price, 45) }} XAF</p>
                            </div>
                        </router-link>

                        <!-- Icône panier (en dehors du lien) -->
                        <CartButton :course="favorite.course" />
                    </div>


                </div>
                <div v-if="FavoriteStore.favorites.length === 0">
                    <p colspan="3" class="text-center">Aucun favori n'a été trouvé.</p>
                </div>

            </div>

            <div class="container-fluid ">
                <div class="pagination d-flex gap-2 float-end flex-wrap">
                    <!-- Bouton "Précédent" -->
                    <button class="btn btn-dark btn-pag" :disabled="FavoriteStore.pagination.current_page === 1"
                        @click="fetchPage(FavoriteStore.pagination.current_page - 1)">
                        &laquo; Précédent
                    </button>

                    <!-- Affichage dynamique des pages -->
                    <template v-for="(link, index) in formattedLinks" :key="index">
                        <button v-if="link.page" class="btn btn-dark btn-pag" :class="{ 'active': link.active }"
                            @click="fetchPage(link.page)">
                            {{ link.label }}
                        </button>
                        <span v-else class="btn btn-dark btn-pag disabled">...</span>
                    </template>

                    <!-- Bouton "Suivant" -->
                    <button class="btn btn-dark btn-pag"
                        :disabled="FavoriteStore.pagination.current_page === FavoriteStore.pagination.last_page"
                        @click="fetchPage(FavoriteStore.pagination.current_page + 1)">
                        Suivant &raquo;
                    </button>
                </div>
            </div>
        </div>
        <!-- Modale de confirmation -->
        <ConfirmModal ref="confirmModal" />
    </main>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useFavoriteStore } from '@/stores/favorites/useFavoriteStore';
import CartButton from "@/components/client/frontend/cart/CartButton.vue";




const FavoriteStore = useFavoriteStore();
const router = useRouter();
const page = 1;
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    FavoriteStore.fetchfavorites();

});

const deleteFavorite = (course)=>{
    FavoriteStore.removeFavorite(course);

}

const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
};




const fetchPage = (page) => {
    if (page) {
        FavoriteStore.fetchfavorites(page);
    }
};

// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = FavoriteStore.pagination;
    const links = [];

    // Toujours inclure la première page
    if (last_page > 1) {
        links.push({ label: '1', page: 1, active: current_page === 1 });
    }

    // Afficher "..." si nécessaire
    if (current_page > 3) {
        links.push({ label: '...', page: null });
    }

    // Ajouter les pages autour de la page actuelle
    for (let i = Math.max(2, current_page - 4); i <= Math.min(last_page - 1, current_page + 4); i++) {
        links.push({ label: i.toString(), page: i, active: i === current_page });
    }

    // Afficher "..." si nécessaire
    if (current_page < last_page - 2) {
        links.push({ label: '...', page: null });
    }

    // Toujours inclure la dernière page
    if (last_page > 1) {
        links.push({ label: last_page.toString(), page: last_page, active: current_page === last_page });
    }

    return links;
});





</script>


<style scoped>
/* 🌙 Style général du conteneur */

#main {
    background-color: #000000;
}


.card-course-some {
    width: 350px;
}
</style>