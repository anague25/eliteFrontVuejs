<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">création des ressources</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Créer Une Ressource</h2>
                <form @submit.prevent="createResource" class="text">

                    <div class="mb-3">
                        <label class="form-label">Cours</label>
                        <select v-model="selectedCourse" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un cours</option>
                            <option v-for="course in courseStore.allCourses" :key="course.id" :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>

                    </div>

                    <div class="mb-3" v-if="selectedCourse">
                        <label class="form-label">Chapitre</label>
                        <select v-model="resource.chapter_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un chapitre</option>
                            <option v-for="chapter in filteredChapters" :key="chapter.id" :value="chapter.id">
                                {{ chapter.title }}
                            </option>
                        </select>
                        <span v-if="resourceStore.errors?.chapter_id" class="error-text">
                            {{ resourceStore.errors.chapter_id[0] }}
                        </span>

                    </div>


                    <div class="mb-3">
                        <label for="file" class="form-label">fichier</label>
                        <input class="form-control" type="file" @change="handleFileUpload" id="file" />
                        <span v-if="resourceStore.errors?.file" class="error-text">
                            {{ resourceStore.errors.file[0] }}
                        </span>
                    </div>
                    <div v-if="imageUrl" class="mt-1 mb-2">
                        <img class="img" :src="imageUrl" alt="" width="60" height="60" />
                    </div>


                    <button type="submit" class="btn btn-success w-100">Créer</button>
                </form>
                <div class="mt-2"><router-link to="/admin-resources" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useChapterStore } from '@/stores/chapters/useChapterStore';
import { useResourceStore } from '@/stores/resources/useResourceStore';



const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const resourceStore = useResourceStore();

const selectedCourse = ref("");
const selectedChapter = ref("");
const filteredChapters = ref([]);


const resource = ref({ id: '', file: "", chapter_id: "" });

const imageUrl = ref('');


onMounted(() => {
    try {
        courseStore.fetchAllCourses();
        chapterStore.fetchAllChapters();

    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});


watch(selectedCourse, (newSector) => {
    selectedChapter.value = "";
    filteredChapters.value = chapterStore.allChapters.filter(
        (chapter) => chapter.course.id === newSector
    );
});


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        resource.value.file = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};



const createResource = async () => {
    try {

        console.log(resource.value.chapter_id);
        const formData = new FormData();

        Object.entries(resource.value).forEach(([key, value]) => {

            formData.append(key, value);

        });

        await resourceStore.createResource(formData);
        const notification = useNotificationStore();

        resource.value = ref({ id: '', file: "", chapter_id: "" });
        selectedCourse.value = "";
        if (notification.message) {
            toast.success(notification.message);
            notification.clearMessage(); // Effacer après affichage
        }
    }
    catch (error) {

        if (error.response?.data?.message) {
            toast.error("Echec lors de la creation");
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
    /* min-height: 100vh; */
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
