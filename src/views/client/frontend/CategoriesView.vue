<template>
    <div class="bgcolor2">
        <Navbar></Navbar>

        <!-- les meilleurs categories -->
        <section class=" mt-2 pt-5 pb-5">
            <div class="px-2 text-center mb-5 border py-3" style="margin:0 103px;">
                <h1 class="text-capitalize fs-2 text-white fw-bold">Découvrez une panoplie de catégories de cours pour
                    enrichir votre expérience et accédez à la formation la plus adaptée à vos compétences.</h1>
            </div>
            <div v-if="categoryStore.categories.length > 0" class="d-flex justify-content-center flex-wrap gap-2 px-2">
                <div v-for="(category, index) in categoryStore.categories" :key="category.id"
                    class="card card-cat-best shadow">
                    <img :src="$baseUrl + category.image" class="card-img-top img-cat" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ $truncate(category.name, 3) }}</h5>
                        <p class="card-text">{{ $truncate(category.description, 3) }}</p>
                        <router-link :to="'/category-details/' + category.id" class="btn btn-dark">Voir les
                            cours</router-link>
                    </div>
                </div>

            </div>
           

            <!-- <div class="container-fluid mt-3">
                <div class="pagination d-flex justify-content-center gap-2">
                    <button class="btn btn-dark btn-pag shadow">1</button>
                    <button class="btn btn-dark btn-pag">2</button>
                    <button class="btn btn-dark btn-pag">3</button>
                    <button class="btn btn-dark btn-pag">4</button>
                    <span class="">...</span>
                    <button class="btn btn-dark btn-pag">10</button>
                    <button class="btn btn-dark btn-pag">11</button>
                    <button class="btn btn-dark btn-pag">12</button>
                    <button class="btn btn-dark btn-pag">13</button>
                </div>
            </div> -->
            <div class="container-fluid mt-3">
                <div class="pagination d-flex gap-2 float-end flex-wrap">
                    <!-- Bouton "Précédent" -->
                    <button class="btn btn-dark btn-pag" :disabled="categoryStore.pagination.current_page === 1"
                        @click="fetchPage(categoryStore.pagination.current_page - 1)">
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
                        :disabled="categoryStore.pagination.current_page === categoryStore.pagination.last_page"
                        @click="fetchPage(categoryStore.pagination.current_page + 1)">
                        Suivant &raquo;
                    </button>
                </div>
            </div>
        </section>
        <FooterComponent></FooterComponent>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import { ref, onMounted, computed } from 'vue';
import { useCategoryStore } from '@/stores/categories/useCategoryStore';

const categoryStore = useCategoryStore();




const page = 1;


onMounted(async () => {


    await categoryStore.fetchCategories();

});

const fetchPage = (page) => {
    if (page) {
        categoryStore.fetchCategories(page);
    }
};

// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = categoryStore.pagination;
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
.btn-pag:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(14, 168, 24);
    border: none;
}

.btn-pag {
    color: rgb(255, 255, 255);

}

.img-cat {

    height: 215px;
}

.card-cat-best {
    width: 18rem;
}

.card-body {
    border: none;
}
</style>
