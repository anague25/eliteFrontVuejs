<template>
         <main id="main" class="main">

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">édition d'un cours</li>
            </ol>
        </nav>
    </div>


    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">

            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Modifier un cours</h2>
                <form @submit.prevent="updateCourse" class="text">

                   
                    <div class="mb-3">
                        <label class="form-label">Secteur</label>
                        <select v-model="selectedSector" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un secteur</option>
                            <option v-for="sector in sectorStore.allSectors" :key="sector.id" :value="sector.id">
                                {{ sector.name }}
                            </option>
                        </select>

                    </div>

                    <div class="mb-3" v-if="selectedSector">
                        <label class="form-label">Sous-secteur</label>
                        <select v-model="selectedSubSector" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un sous-secteur</option>
                            <option v-for="subSector in filteredSubSectors" :key="subSector.id" :value="subSector.id">
                                {{ subSector.name }}
                            </option>
                        </select>

                    </div>
                    <div class="mb-3" v-if="selectedSubSector">
                        <label class="form-label">Categories</label>
                        <select multiple v-model="course.category_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir les categories</option>
                            <option v-for="category in filteredCategories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                        <span v-if="courseStore.errors?.category_id" class="error-text">
                            {{ courseStore.errors.category_id[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Langue</label>
                        <select v-model="course.language_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir la langue de votre formation</option>
                            <option v-for="language in languageStore.allLanguages" :key="language.id"
                                :value="language.id">
                                {{ language.name }}
                            </option>
                        </select>
                        <span v-if="courseStore.errors?.language_id" class="error-text">
                            {{ courseStore.errors.language_id[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Titre</label>
                        <input v-model="course.title" type="text" class="form-control" placeholder="Donner une titre">
                        <span v-if="courseStore.errors?.title" class="error-text">
                            {{ courseStore.errors.title[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">En-tete</label>
                        <textarea rows="2" v-model="course.header" type="text" class="form-control"
                            placeholder="Donner un texte pour l'entete"></textarea>
                        <span v-if="courseStore.errors?.header" class="error-text">
                            {{ courseStore.errors.header[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea v-model="course.description" type="text" class="form-control"
                            placeholder="Nom du Pays"></textarea>
                        <span v-if="courseStore.errors?.description" class="error-text">
                            {{ courseStore.errors.description[0] }}
                        </span>
                    </div>

                  
                    <div class="mb-3">
                        <label class="form-label">Prix</label>
                        <input v-model="course.price" min="0" type="number" class="form-control"
                            placeholder="Donnez un prix" />
                        <span v-if="courseStore.errors?.price" class="error-text">
                            {{ courseStore.errors.price[0] }}
                        </span>
                    </div>





                    <div class="mb-3">
                        <label class="form-label">Niveau de depart</label>
                        <select v-model="course.levelStart" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un niveau de depart</option>
                            <option v-for="levelS in levelStartTab" :key="levelS" :value="levelS">
                                {{ levelS }}
                            </option>
                        </select>
                        <span v-if="courseStore.errors?.levelStart" class="error-text">
                            {{ courseStore.errors.levelStart[0] }}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Niveau finale</label>
                        <select v-model="course.levelEnd" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un niveau final</option>
                            <option v-for="levelE in levelEndTab" :key="levelE" :value="levelE">
                                {{ levelE }}
                            </option>
                        </select>
                        <span v-if="courseStore.errors?.levelEnd" class="error-text">
                            {{ courseStore.errors.levelEnd[0] }}
                        </span>
                    </div>







                    <div class="mb-3">
                        <label for="file" class="form-label">Image</label>
                        <input class="form-control" type="file" @change="handleFileUpload" id="file" />
                        <span v-if="courseStore.errors?.image" class="error-text">
                            {{ courseStore.errors.image[0] }}
                        </span>
                    </div>
                    <div v-if="imageUrl" class="mt-1 mb-2">
                        <img class="img" :src="imageUrl" alt="" width="60" height="60" />
                    </div>
                    <div v-else class="mt-1 mb-2">
                        <img class="img" :src="$baseUrl + course.image" alt="" width="60" height="60" />
                    </div>



                    <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                </form>
                <div class="mt-2"><router-link to="/users-dashboard/courses" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useAuthStore } from '@/stores/auth/authStore';

import { useSubSectorStore } from "@/stores/subsectors/useSubSectorStore";
import { useCategoryStore } from '@/stores/categories/useCategoryStore';
import { useSectorStore } from '@/stores/sectors/useSectorStore';
import { useInstructorStore } from '@/stores/instructors/useInstructorStore';
import { useLanguageStore } from '@/stores/languages/useLanguageStore';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const sectorStore = useSectorStore();
const languageStore = useLanguageStore();
const subSectorStore = useSubSectorStore();
const categoryStore = useCategoryStore();
const instructorStore = useInstructorStore();

const selectedSector = ref("");
const selectedSubSector = ref("");
const filteredSubSectors = ref([]);
const filteredCategories = ref([]);

const course = ref({ instructor_id: "", language_id: "", header: "", title: "", image: "", price: "", levelStart: "", levelEnd: "", description: "", category_id: [] });
const getCourse = {};
const imageUrl = ref('');
const levelStartTab = ref(["beginners", "intermediates", "seniors"]);
const levelEndTab = ref(["beginners", "intermediates", "seniors"]);



onMounted(async () => {

    try {
        authStore.fetchAllUsers();
        instructorStore.fetchAllInstructors();
        sectorStore.fetchAllSectors();
        subSectorStore.fetchAllSubSectors();
        categoryStore.fetchAllCategories();
        languageStore.fetchAllLanguages();





        const data = await courseStore.fetchCourseById(route.params.id);
        console.log(data);
        course.value = data;
        course.value.category_id = ref([]);
        data.categories.forEach((c) => {
            course.value.category_id.push(c.id);

        });
        course.value.instructor_id = data.instructor.id;
        selectedSubSector.value = data.categories[0]?.sub_sector_id
        selectedSector.value = data.categories[0]?.sub_sector?.sector_id
    } catch (error) {
        toast.error("Une erreur s'est produite lors de la modification!");
    }
});

watch(selectedSector, (newSector) => {
    filteredSubSectors.value = subSectorStore.allSubSectors.filter(
        (subSector) => subSector.sector.id === newSector
    );
    // filteredCategories.value = []; 
});



watch(selectedSubSector, (newSubSector) => {
    if (!newSubSector) {
        filteredCategories.value = [];
        return;
    }
    filteredCategories.value = categoryStore.allCategories.filter(
        (category) => category.SubSector.id === newSubSector
    ) || [];
});


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        course.value.image = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};



const updateCourse = async () => {
    try {
        // Supprimer le champ `image` si ce n'est pas un fichier (donc si aucune nouvelle image n'a été sélectionnée)
        if (!(course.value.image instanceof File)) {
            delete course.value.image;
        }

        const formData = new FormData();

        Object.entries(course.value).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v, index) => {
                    formData.append(`${key}[${index}]`, v); // Ajoute chaque élément du tableau séparément
                });
            } else {
                formData.append(key, value);
            }
        });

        await courseStore.updateCourse(formData);
        router.push("/users-dashboard/courses");
    }
    catch (error) {
        if (error.response?.data?.message) {
            toast.error("Echec lors de la modification");
        }
    }

};
</script>

<style scoped>
.bg-dark-green {
    background-color: #004d00;
}

.text-green {
    color: #28a745;
}

.form-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-container {
    padding: 40px;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
}

.error-text {
    color: red;
    font-size: 0.9rem;
}

.text-decoration-none {
    text-decoration: none;
    color: aliceblue;
}

.text-decoration-none:hover {
    text-decoration: none;
    color: rgb(0, 255, 229);
}

.bgcolor2 {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
