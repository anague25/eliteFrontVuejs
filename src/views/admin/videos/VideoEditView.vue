<template>
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">édition d'une vidéo</li>
            </ol>
        </nav>
    </div>


    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">

            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Modifier une vidéo</h2>
                <form @submit.prevent="updateVideo" class="text">
                    <div class="mb-3">
                        <label class="form-label">Cours</label>
                        <select v-model="selectedCourse" class="form-control">
                            <option value="" disabled selected>Veuillez choisir une formation</option>
                            <option v-for="course in courseStore.allCourses" :key="course.id" :value="course.id">
                                {{ course.title }}
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
                        <label for="file" class="form-label">Video</label>
                        <input class="form-control" type="file" @change="handleFileUpload" id="file" />
                        <span v-if="videoStore.errors?.url" class="error-text">
                            {{ videoStore.errors.url[0] }}
                        </span>
                    </div>
                  
                    <div  v-if="video.url" class="mt-1 mb-2">
                        <h5>Ancienne video</h5>
                        <video width="300" height="160" controls>
                            <source :src="$baseUrl + video.url" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture de vidéo.
                        </video>
                       <p> {{ data.name }}</p>
                    </div>
                  

                    <!-- Sinon, afficher l’ancienne vidéo -->
                    <div v-if="imageUrl !== ''" class="mt-1 mb-2">
                        <h5>Nouvelle video</h5>
                        <video width="300" height="160" controls :key="imageUrl">
                            <source :src="imageUrl" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture de vidéo.
                        </video>
                        <p>{{ fileName }}</p>
                    </div>
                 
                  



                    <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                </form>
                <div class="mt-2"><router-link to="/admin-videos" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';


import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useChapterStore } from '@/stores/chapters/useChapterStore';
import { useVideoStore } from '@/stores/videos/useVideoStore';


const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const videoStore = useVideoStore();

const route = useRoute();
const router = useRouter();

const selectedCourse = ref("");
const selectedChapter = ref("");
const filteredChapters = ref([]);



const video = ref({ id: '', url: "", chapter_id: "" });
const data = ref({});

const imageUrl = ref('');
const fileName = ref(''); // Pour le nom du fichier sélectionné


onMounted(async () => {

    try {
        courseStore.fetchAllCourses();
        chapterStore.fetchAllChapters();
        data.value = await videoStore.fetchVideoById(route.params.id);
        video.value.id = data.value.id;
        video.value.chapter_id = data.value.chapter_id;
        video.value.url = data.value.url;
        selectedCourse.value = data.value.chapter?.course_id;
    } catch (error) {
        toast.error("Une erreur s'est produite lors de la modification!");
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
        video.value.url = file;
        fileName.value = file.name; // Mettre à jour le nom du fichier

        if (file.type.startsWith("video/")) {
            imageUrl.value = URL.createObjectURL(file); // Permet l’aperçu vidéo immédiat
        } else {
            imageUrl.value = "";
        }
    }
};




const updateVideo = async () => {
    try {
        // Supprimer le champ `image` si ce n'est pas un fichier (donc si aucune nouvelle image n'a été sélectionnée)
        if (!(video.value.url instanceof File)) {
            delete video.value.url;
        }
        const formData = new FormData();
        Object.entries(video.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await videoStore.updateVideo(formData);
        router.push("/admin-videos");
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
