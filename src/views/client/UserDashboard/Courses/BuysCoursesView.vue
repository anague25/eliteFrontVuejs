<template>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">liste de vos cours</li>
                </ol>
            </nav>
        </div>



        <div class="table-container card">
            <div class="card-body">
                <h3 class="text-center text-uppercase text-white fw-bold mb-3">liste de vos cours</h3>
                <div class="card-title my-0 py-0 ">

                    <span class="row col-md-6 col-4 "><input type="search" v-model="searchQuery" @input="searchCourses"
                            placeholder="Rechercher" class="form-control mb-2"></span>
                </div>


                <div class="d-flex flex-wrap gap-2 ">
                    <router-link v-for="(course, index) in courseStore.courses" :key="course.id"
                        :to="'/home-course/' + course.id" class="card" style="width: 13rem;">
                        <img class="img card-img-top" height="120" :src="$baseUrl + course.image" alt="" />
                        <div class="card-body p-0 m-1" style="font-size: 14px;">
                            <p class="p-0 m-1"><span class="text-success fw-bold">No : </span><b>{{ index + 1 }}</b>
                            </p>
                            <h5 class="card-title p-0 my-1">{{ course.title }}</h5>
                            <p class="card-text">{{ course.header }}</p>
                        </div>
                        <ul class="list-group list-group-flush p-0 m-0">
                            <li class="list-group-item p-0 m-1 " style="font-size: 14px;">Instructeur : {{
                                course.instructor?.user?.firstName }}</li>
                            <li class="list-group-item p-0 m-1 " style="font-size: 14px;">Prix : {{ course.price }}</li>
                            <li class="list-group-item p-0 m-1 " style="font-size: 14px;">Num de commande : {{
                                course.price }}</li>

                        </ul>

                    </router-link>

                </div>
                <div v-if="courseStore.courses.length === 0">
                    <p colspan="3" class="text-center">Aucun cours trouvé. Veuillez acheter une formation.</p>
                </div>

            </div>

            <div class="container-fluid ">
                <div class="pagination d-flex gap-2 float-end flex-wrap">
                    <!-- Bouton "Précédent" -->
                    <button class="btn btn-dark btn-pag" :disabled="courseStore.pagination.current_page === 1"
                        @click="fetchPage(courseStore.pagination.current_page - 1)">
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
                        :disabled="courseStore.pagination.current_page === courseStore.pagination.last_page"
                        @click="fetchPage(courseStore.pagination.current_page + 1)">
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
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';




const courseStore = useCourseStore();
const searchQuery = ref("");
const page = 1;
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    courseStore.purchasedCourses();

});







const searchCourses = () => {
    courseStore.coursesInstructor(page.value, searchQuery.value);
};


const fetchPage = (page) => {
    if (page) {
        courseStore.purchasedCourses(page, searchQuery.value);
    }
};

// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = courseStore.pagination;
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

.table-container {
    width: 100%;
    overflow-x: auto;
    padding: 10px;
    background-color: #000000;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* 🎨 Table stylisée */
.custom-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #191c24;
    color: #6c7293;
    text-align: left;
    border-radius: 8px;
    overflow: hidden;
}

/* 🔵 En-tête */
.custom-table thead {
    background-color: #232530;
    color: #ffffff;
}

.custom-table th {
    padding: 12px;
    text-transform: uppercase;
    font-size: 14px;
    border-bottom: 2px solid #2e2f40;
}

/* 🟢 Cellules du tableau */
.custom-table td {
    padding: 7px;
    border-bottom: 1px solid #2e2f40;
}

.custom-table td img {
    padding: 0px;
    margin: 0px;
}

/* 🟠 Effet au survol */
.custom-table tbody tr:hover {
    background-color: #000000 !important;
    color: #ffffff !important;
    transition: background-color 0.3s ease-in-out;
}

/* 📱 Responsive : scroll horizontal si besoin */
@media screen and (max-width: 768px) {
    .custom-table {
        font-size: 12px;
    }

    .custom-table th,
    .custom-table td {
        padding: 8px;
    }

}




.custom-table td {
    vertical-align: middle;
}
</style>