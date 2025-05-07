<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">liste des chapitres</li>
                </ol>
            </nav>
        </div>


        <div class="table-container card">
            <div class="card-body">
                <h3 class="text-center text-uppercase text-white fw-bold mb-3">liste des chapitres</h3>
                <div class="card-title my-0 py-0 ">
                    <router-link to="/users-dashboard/create-chapter" class="float-end btn btn-sm btn-success ">Creer un
                        chapitre</router-link>
                    <span class="row col-md-6 col-4 "><input type="search" v-model="searchQuery" @input="searchChapters"
                            placeholder="Rechercher" class="form-control mb-2"></span>
                </div>
                <div> <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></div>

                <div class="d-flex flex-wrap gap-2 ">
                    <div v-for="(course, index) in courseStore.getCoursesInstructor" :key="course.id"
                        class="card p-2" style="width: 33rem;">
                        <img class="img card-img-top" :src="$baseUrl + course.image" alt="" />
                        <div class="card-body">
                            <p class="p-0 m-0"><span class="text-success fw-bold">No : </span><b>{{ index + 1 }}</b>
                            </p>
                            <h5 class="card-title p-0 my-1">{{ course.title }}</h5>

                        </div>
                        <ul class="list-group list-group-flush row text-center">
                            <p class="shadow">Chapitres du cours</p>
                            <div class="d-flex flex-wrap gap-2 justify-content-center">
                                <li class="list-group-item col-5 border" v-for="chapter in course.chapters">
                                    {{ chapter.title }}
                                    <div class="mb-3 p-1">
                                        <input type="checkbox" class="float-end" :value="chapter.id"
                                            v-model="selectedChapters">
                                    </div>
                                    <div class="card-body position-relative mt-2">
                                        <button
                                            class="btn btn-sm btn-danger my-1 ms-1 position-absolute bottom-0 start-0"
                                            @click="deleteChapter(chapter.id)">Supprimer</button>
                                        <button
                                            class="btn btn-sm btn-primary my-1 ms-1 position-absolute bottom-0 end-0"
                                            @click="editChapter(chapter.id)">Modifier</button>

                                    </div>
                                </li>
                            </div>


                        </ul>

                    </div>


                </div>
                <div v-if="courseStore.getCoursesInstructor.length === 0">
                    <p class="text-center">Aucun chapitre n'a été trouvé.</p>
                </div>


                <!-- Bouton pour suppression multiple -->
                <button class="btn btn-danger mt-2 float-end" @click="deleteMultipleChapters"
                    :disabled="selectedChapters.length === 0">
                    Supprimer la sélection
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

    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useChapterStore } from '@/stores/chapters/useChapterStore';
import { useInstructorStore } from '@/stores/instructors/useInstructorStore';
import { useCourseStore } from '@/stores/courses/useCourseStore';




const courseStore = useCourseStore();


const instructorStore = useInstructorStore();
const chapterStore = useChapterStore();
const router = useRouter();
const searchQuery = ref("");
const page = 1;
const selectedChapters = ref([]);
const selectAll = ref(false);
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    courseStore.coursesInstructor();
});

const toggleSelectAll = () => {
    if (selectAll.value) {
        instructorStore.getinstructor.courses.forEach(cours => {
            cours.chapters.forEach(chapter => {
                selectedChapters.value.push(chapter.id);
            });

        });
    } else {
        selectedChapters.value = [];
    }
};


// Fonction pour afficher la modale de confirmation avant de supprimer un secteur
const deleteChapter = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer ce chapitre ?",
        async () => {
            await chapterStore.deleteChapter(id);
            const notification = useNotificationStore();
            courseStore.coursesInstructor();
            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage
            }
        }
    );
};


const editChapter = (id) => {
    router.push({ name: "userUpdateChapter", params: { id } });
};




const deleteMultipleChapters = async () => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer les chapitres sélectionnés ?",
        async () => {
            await chapterStore.deleteMultipleChapters(selectedChapters.value);
            selectedChapters.value = [];
            selectAll.value = false;
            const notification = useNotificationStore();
            courseStore.coursesInstructor();
            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage

            }

            chapterStore.fetchChapters();
        }
    );
};

const searchChapters = () => {
    courseStore.coursesInstructor(page.value, searchQuery.value);};




const fetchPage = (page) => {
    if (page) {
        courseStore.coursesInstructor(page, searchQuery.value);
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