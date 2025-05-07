<template>
    <div class="bgcolor2">
        <Navbar></Navbar>


        <div class="row ">


            <div class="col-3 d-lg-none">
                <!-- Bouton pour ouvrir la sidebar sur mobile -->
                <button @click="toggleSidebar" class="filter-btn d-lg-none d-block">
                    Filtrer
                </button>
            </div>



            <!-- side bar pour mobile  -->

            <!-- Sidebar qui se glisse -->
            <transition name="sidebar">

                <div v-show="isSidebarVisible" class="sidebar d-lg-none" :class="{ 'sidebar-active': isSidebarVisible }">
                    <div class="border-start border-end border-bottom p-3">
                        <h2 class="text-white">Filtres</h2>
                        <button @click="toggleSidebar" class="close-sidebar-btn">Fermer</button>
                    </div>

                    <div class="border mt-4 p-3">
                        <h3 class="white">Langue</h3>
                        <select v-model="filters.language_id" @change="fetchCourses" class="form-control">
                            <option :value="null">Toutes</option>
                            <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
                        </select>
                    </div>

                    <div class="mt-4 border p-3">
                        <h3 class="white">Niveau</h3>
                        <span class="white">Début</span>
                        <select v-model="filters.levelStart" @change="fetchCourses" class="form-control mt-1">
                            <option :value="null" selected>Veuillez choisir un niveau de départ</option>
                            <option v-for="levelS in levelStartTab" :key="levelS" :value="levelS">{{ levelS }}</option>
                        </select>
                        <span class="white">Fin</span>
                        <select v-model="filters.levelEnd" @change="fetchCourses" class="form-control mt-1">
                            <option :value="null" selected>Veuillez choisir un niveau de fin</option>
                            <option v-for="levelE in levelEndTab" :key="levelE" :value="levelE">{{ levelE }}</option>
                        </select>
                    </div>

                    <div class="mt-4 border p-3">
                        <h3 class="white">Catégories</h3>
                        <div v-for="category in categories" :key="category.id">
                            <input :id="category.id" type="checkbox" :value="category.id"
                                @change="toggleCategory(category.id)" />
                            <label :for="category.id" class="white fw-bold">{{ category.name }}</label>
                        </div>
                    </div>
                </div>
            </transition>




            <section class=" mt-2 pt-5   col-4 d-lg-block d-none  ">

                <div>
                    <div class="border-start border-end border-bottom p-3">
                        <h2 class="text-white">Résultats de recherche</h2>
                        <input type="text" v-model="filters.query" @keyup.enter="updateSearch"
                            placeholder="Rechercher..." class="form-control" />
                    </div>

                    <!-- Filtres -->
                    <div class="border mt-4 p-3">
                        <h3 class="white mb-1">Langue</h3>
                        <select v-model="filters.language_id" @change="fetchCourses" class="form-control">
                            <option :value="null">Toutes</option>
                            <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
                        </select>
                    </div>

                    <div class="mt-4 border p-3">
                        <h3 class="white mb-1">Niveau</h3>
                        <span class="white">Debut</span>
                        <select v-model="filters.levelStart" @change="fetchCourses" class="form-control mt-1">
                            <!-- <option :value="null">Toutes</option>
                            <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option> -->
                            <option :value="null" selected>Veuillez choisir un niveau de depart</option>
                            <option v-for="levelS in levelStartTab" :key="levelS" :value="levelS">
                                {{ levelS }}
                            </option>
                        </select> <br>
                        <span class="white">Fin</span>
                        <select v-model="filters.levelEnd" @change="fetchCourses" class="form-control mt-1">
                            <!-- <option :value="null">Toutes</option>
                            <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option> -->
                            <option :value="null" selected>Veuillez choisir un niveau de fin</option>
                            <option v-for="levelE in levelEndTab" :key="levelE" :value="levelE">
                                {{ levelE }}
                            </option>
                        </select>
                    </div>

                    <div class="mt-4 border p-3">
                        <h3 class="white mb-1">Catégories</h3>
                        <div v-for="category in categories" :key="category.id">
                            <input :id="category.name" type="checkbox" :value="category.id"
                                @change="toggleCategory(category.id)" />
                            <label :for="category.name" class="white fw-bold">{{ category.name }}</label>
                        </div>
                    </div>

                    <!-- Affichage des résultats -->
                    <div v-if="loading">Chargement...</div>
                    <ul v-else>
                        <li v-for="course in courses" :key="course.id">{{ course.title }}</li>
                    </ul>
                </div>

            </section>

            <section class=" mt-2 pt-5   col-8 d-lg-block d-none ">

                <div v-if="searchStore.courses.length > 0" class="d-flex flex-wrap" style="width: 100%;">


                    <div v-for="course in searchStore.courses" :key="course.id"
                        class="card card-course-some  position-relative course me-1">
                        <!-- Lien vers le cours -->
                        <router-link :to="'/home-course/' + course.id" class="course-link text-dark">
                            <img :src="$baseUrl + course.image" class="card-img-top img-cat" alt="Image du cours">
                            <div class="card-body">
                                <h5 class="card-title">{{ truncateText(course.title, 45) }}</h5>
                                <p class="card-text">{{ truncateText(course.description, 45) }}</p>
                            </div>
                        </router-link>

                        <!-- Icône panier (en dehors du lien) -->
                        <!-- <img width="35" src="/images/pngs/icons8-caddie-100.png"
                            class="panier cursor-pointer position-absolute" alt="Ajouter au panier"
                            @click="addToCart(course)"
                            style="position: absolute; bottom: 10px; right: 10px; cursor: pointer;"> -->
                        <CartButton :course="course" />
                    </div>

                </div>

                <div v-else>
                    <h3 class="white">Aucun resultat</h3>
                </div>

            </section>


            <section class=" mt-2 pt-5 pb-5 container d-lg-none">

                <div v-if="searchStore.courses.length > 0" class="  d-flex justify-content-center gap-2 flex-wrap">


                    <div v-for="course in searchStore.courses" :key="course.id" class="card   position-relative course">
                        <!-- Lien vers le cours -->
                        <router-link :to="'/home-course/' + course.id" class="course-link text-dark">
                            <img :src="$baseUrl + course.image" class="card-img-top img-cat" alt="Image du cours">
                            <div class="card-body">
                                <h5 class="card-title">{{ truncateText(course.title, 45) }}</h5>
                                <p class="card-text">{{ truncateText(course.description, 45) }}</p>
                            </div>
                        </router-link>


                        <CartButton :course="course" />
                    </div>

                </div>

                <div v-else>
                    <h3 class="white">Aucun resultat</h3>
                </div>

            </section>
        </div>



        <FooterComponent></FooterComponent>


    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import { ref, onMounted, watch } from 'vue';
import { useSearchStore } from '@/stores/search/useSearchStore';
import axios from '@/plugins/axios';
import { useRoute } from 'vue-router'; // Importez useRoute
import CartButton from '@/components/client/frontend/cart/CartButton.vue'

const route = useRoute(); // Obtenez l'objet route
const searchStore = useSearchStore();
const { filters, courses, loading, fetchCourses, toggleCategory } = searchStore;

const categories = ref([]);
const languages = ref([]);
const isSidebarVisible = ref(false); // Contrôle l'affichage de la sidebar


onMounted(async () => {

    if (route.query.query) { // Vérifiez si le paramètre query existe
        filters.query = route.query.query; // Attribuez la valeur à filters.query
    }
    await fetchCourses();


    // Charger les catégories et langues pour les filtres
    const [categoryRes, languageRes] = await Promise.all([
        axios.get('/categories/all'),
        axios.get('/languages/all'),
    ]);

    categories.value = categoryRes.data.data;
    languages.value = languageRes.data.data;
});

const levelStartTab = ref(["beginners", "intermediates"]);
const levelEndTab = ref(["intermediates", "seniors"]);

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};

const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
};



//Requête automatique à chaque modification des filtres
watch(filters, fetchCourses, { deep: true });

const updateSearch = async () => {
    await fetchCourses();
};

watch(
    () => route.query.query,
    (newQuery) => {
        filters.query = newQuery;

    }
);

</script>



<style scoped>
* {
    margin: 0;
    /* padding: 0; */
    box-sizing: border-box;
}

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

.course {
    width: 300px;
}

/* Styles pour le bouton de filtre sur mobile */
.filter-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    font-size: 18px;
    margin: 10px;
    cursor: pointer;
}

.filter-btn:hover {
    background-color: #0056b3;
}

/* Styles pour la sidebar */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%; /* ou ce que tu veux */
    height: 100vh;
    background-color: #1f1f1f; /* ou un fond adapté */
    z-index: 9999;
    overflow-y: auto;
    transition: transform 0.3s ease;
    transform: translateX(-100%);
}

.sidebar-active {
    transform: translateX(0);
}

.sidebar-enter-active, .sidebar-leave-active {
    transition: transform 0.3s ease;
}
.sidebar-enter-from, .sidebar-leave-to {
    transform: translateX(-100%);
}
.sidebar-enter-to, .sidebar-leave-from {
    transform: translateX(0);
}

.filter-btn {
    margin: 10px 0;
    padding: 10px 20px;
    background-color: #00a86b;
    color: white;
    border: none;
    border-radius: 5px;
}

.close-sidebar-btn {
    margin-top: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}


</style>