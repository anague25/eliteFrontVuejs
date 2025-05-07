<template>
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">liste des cours</li>
            </ol>
        </nav>
    </div>


    <div class="table-container card">
        <div class="card-body">
            <h3 class="text-center text-uppercase text-white fw-bold mb-3">listes des cours</h3>
            <div class="card-title my-0 py-0 ">
                <router-link to="/admin-create-course" class="float-end btn btn-sm btn-success ">Créer des
                    cours</router-link>
                <span class="row col-md-6 col-4 "><input type="search" v-model="searchQuery" @input="searchInstructors"
                        placeholder="Rechercher" class="form-control mb-2"></span>
            </div>
            <div> <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
            </div>

            <div class="d-flex flex-wrap gap-2 ">


                <div v-for="(course, index) in courseStore.courses" :key="course.id" class="card" style="width: 13rem;">
                    <img class="img card-img-top" height="120" :src="$baseUrl + course.image" alt="" />
                    <div class="card-body">
                        <p class="p-0 m-0"><span class="text-success fw-bold">No : </span><b>{{ index + 1 }}</b> <input
                                type="checkbox" class="float-end" :value="course.id" v-model="selectedCourses">
                        </p>
                        <h5 class="card-title p-0 my-1">{{ course.title }}</h5>
                        <p class="card-text">{{ course.header }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Instructeur : {{ course.instructor?.user?.firstName }}</li>
                        <li class="list-group-item">Prix : {{ course.price }}</li>
                        <li class="list-group-item">Langue : {{ course.language.name }}</li>
                        <li class="list-group-item">Cat : <span v-for="category in course.categories">{{ category.name
                        }} </span></li>
                    </ul>
                    <div class="card-body position-relative mt-2">
                        <button class="btn btn-sm btn-danger my-1 ms-1 position-absolute bottom-0 start-0"
                            @click="deleteCourse(course.id)">Supprimer</button>
                        <button class="btn btn-sm btn-primary my-1 ms-1 position-absolute bottom-0 end-0"
                            @click="editCourse(course.id)">Modifier</button>

                    </div>
                </div>

            </div>
            <div v-if="courseStore.courses.length === 0">
                <td colspan="3" class="text-center">Aucun cours n'a été trouvé.</td>
            </div>
            <!-- Bouton pour suppression multiple -->
            <button class="btn btn-danger mt-2 float-end" @click="deleteMultipleCourses"
                :disabled="selectedCourses.length === 0">
                Supprimer les sélections
            </button>
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


</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';




const courseStore = useCourseStore();
const router = useRouter();
const searchQuery = ref("");
const page = 1;
const selectedCourses = ref([]);
const selectAll = ref(false);
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    courseStore.fetchCourses();

});





const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedCourses.value = courseStore.courses.map(course => course.id);
        console.log(selectedCourses.value);
    } else {
        selectedCourses.value = [];
    }
};


// Fonction pour afficher la modale de confirmation avant de supprimer un secteur
const deleteCourse = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer ce cours ?",
        async () => {
            await courseStore.deleteCourse(id);
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage
            }
        }
    );
};


const editCourse = (id) => {
    router.push({ name: "editCourses", params: { id } });
};




const deleteMultipleCourses = async () => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer les Cours sélectionnés ?",
        async () => {
            console.log(selectedCourses.value);
            await courseStore.deleteMultipleCourses(selectedCourses.value);
            selectedCourses.value = [];
            selectAll.value = false;
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage

            }

            courseStore.fetchCourses();
        }
    );
};

const searchInstructors = () => {
    courseStore.fetchCourses(page.value, searchQuery.value);
};


const fetchPage = (page) => {
    if (page) {
        courseStore.fetchCourses(page, searchQuery.value);
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