<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">création des videos</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Créer Une video</h2>
                <form @submit.prevent="createVideo" class="text">

                    <div class="mb-3">
                        <label class="form-label">Cours</label>
                        <select v-model="selectedCourse" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un cours</option>
                            <option v-for="cours in courseStore.allCourses" :key="cours.id" :value="cours.id">
                                {{ cours.title }}
                            </option>
                        </select>

                    </div>

                    <div class="mb-3" v-if="selectedCourse">
                        <label class="form-label">Chapitre</label>
                        <select v-model="video.chapter_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un chapitre</option>
                            <option v-for="chapter in filteredChapters" :key="chapter.id" :value="chapter.id">
                                {{ chapter.title }}
                            </option>
                        </select>
                        <span v-if="videoStore.errors?.chapter_id" class="error-text">
                            {{ videoStore.errors.chapter_id[0] }}
                        </span>

                    </div>




                    <div class="mb-3">
                        <label for="url" class="form-label">fichier(Video)</label>
                        <input class="form-control" type="file" multiple @change="handleFileUpload" id="url" />
                        <span v-if="videoStore.errors?.url" class="error-text">
                            {{ videoStore.errors.url[0] }}
                        </span>
                    </div>
                    <div v-if="imageUrl" class="mt-1 mb-2">
                        <video width="200" height="120" controls>
                            <source :src="imageUrl" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture de vidéo.
                        </video>
                    </div>

                    <div v-if="video.url && video.url.length > 0" class="mt-1 mb-2">
                        <ul>
                            <li v-for="(file, index) in video.url" :key="index">
                                {{ file.name }}
                            </li>
                        </ul>
                    </div>


                    <button type="submit" class="btn btn-success w-100">Créer</button>
                </form>
                <div class="mt-2"><router-link to="/admin-videos" class="text-decoration-none">Retour</router-link>
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
import { useVideoStore } from '@/stores/videos/useVideoStore';



const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const videoStore = useVideoStore();

const selectedCourse = ref("");
const selectedChapter = ref("");
const filteredChapters = ref([]);


const video = ref({ id: '', url: [], chapter_id: "" });

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
    const files = event.target.files;
    if (files.length) {
        video.value.url = Array.from(files); // Stocker plusieurs fichiers

        if (files[0].type.startsWith("video/")) {
            imageUrl.value = URL.createObjectURL(files[0]);
        } else {
            imageUrl.value = ""; // Réinitialiser si le fichier n'est pas une vidéo
        }




    }
};


const createVideo = async () => {
    try {

        const formData = new FormData();

        Object.entries(video.value).forEach(([key, value]) => {
            if (key === "url") {
                value.forEach((file, index) => {
                    formData.append(`url[${index}]`, file); // Ajouter chaque fichier séparément
                });
            } else {
                formData.append(key, value);
            }
        });


        await videoStore.createVideo(formData);
        const notification = useNotificationStore();

        video.value = ref({ id: '', url: [], chapter_id: "" });
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
