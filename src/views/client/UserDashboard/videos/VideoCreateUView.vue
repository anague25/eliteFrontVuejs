<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/users-dashboard">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">creation des videos</li>
                </ol>
            </nav>
        </div>
        <div class="bgcolor2">
            <!-- formulaire de creation -->
            <section class="form-section">
                <div class="form-container bgcolor1">
                    <h2 class="text-center text-white fw-bold">Créer Une video</h2>
                    <form @submit.prevent="createVideos" class="text">

                        <div class="mb-3">
                            <label class="form-label">Cours</label>
                            <select v-model="selectedCourse" class="form-control">
                                <option value="" disabled>Veuillez choisir un cours</option>
                                <option v-for="cours in courseStore.getCoursesInstructor" :key="cours.id"
                                    :value="cours.id">
                                    {{ cours.title }}
                                </option>
                            </select>

                        </div>

                        <div class="mb-3" v-if="selectedCourse">
                            <label class="form-label">Chapitre</label>
                            <select v-model="video.chapter_id" class="form-control">
                                <option value="" disabled>Veuillez choisir un chapitre</option>
                                <option v-for="chapter in filteredChapters" :key="chapter.id" :value="chapter.id">
                                    {{ chapter.title }}
                                </option>
                            </select>
                            <span v-if="videoStore.errors?.chapter_id" class="error-text">
                                {{ videoStore.errors.chapter_id[0] }}
                            </span>

                        </div>




                        <div class="mb-3">
                            <label for="videoUploadBtn" class="form-label">fichier(Video)</label>
                            <input id="videoUploadBtn" class="form-control" type="file" multiple
                                @change="handleFileChange" />
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

                        <div v-if="resumable?.files?.length" class="mt-1 mb-2">
                            <ul>
                                <li v-for="(file, index) in resumable.files" :key="index">
                                    {{ file.fileName }}
                                </li>
                            </ul>
                        </div>



                        <button class="btn btn-success" :disabled="!allUploaded">Créer</button>

                    </form>
                    <div class="mt-2"><router-link to="/users-dashboard/videos"
                            class="text-decoration-none">Retour</router-link>
                    </div>
                </div>
            </section>
        </div>

    </main>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useChapterStore } from '@/stores/chapters/useChapterStore';
import { useVideoStore } from '@/stores/videos/useVideoStore';
import { useAuthStore } from '@/stores/auth/authStore';
import Resumable from 'resumablejs';

const authStore = useAuthStore();
const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const videoStore = useVideoStore();
const filesUploadedCount = ref(0);

const selectedCourse = ref("");
const selectedChapter = ref("");
const filteredChapters = ref([]);
const video = ref({ id: '', url: [], chapter_id: "" });
const imageUrl = ref('');
const videosUploaded = ref([]);
const allUploaded = ref(false);
const resumable = ref(null);

onMounted(() => {
    try {
        courseStore.coursesInstructor();
        chapterStore.fetchAllChapters();
    } catch (error) {
        toast.error("Échec de la récupération des éléments");
    }

    // Initialisation de Resumable.js
    resumable.value = new Resumable({
        target: 'http://localhost:8000/api/chunks', // Endpoint Laravel
        chunkSize: 1 * 1024 * 1024, // 1MB par chunk
        simultaneousUploads: 3,
        testChunks: false,
        throttleProgressCallbacks: 1,
        headers: {
            'Authorization': `Bearer ${authStore.token}`,
        },

        permanentErrors: [422, 500, 501, 404, 400] // Ici tu dis à Resumable : "Ne réessaie pas ces erreurs !"
    });

    resumable.value.assignBrowse(document.getElementById('videoUploadBtn'));

    resumable.value.on('fileSuccess', async function (file, response) {
        try {
            const identifier = file.uniqueIdentifier;
            const totalChunks = file.chunks.length;
            const chapterId = video.value.chapter_id;

            // 🔧 Appel à /api/assemble pour ce fichier
            const assembleResponse = await fetch('http://localhost:8000/api/assemble', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resumableIdentifier: identifier,
                    resumableTotalChunks: totalChunks,
                    chapter_id: chapterId,
                    name: file.fileName,
                }),
            });

            const data = await assembleResponse.json();

            if (data.relative_path) {
                videosUploaded.value.push({
                    url: data.relative_path,
                    name: file.fileName,
                });

                filesUploadedCount.value++;
                checkAllUploadsComplete();
            } else {
                toast.error(`Erreur lors de l'assemblage de ${file.fileName}`);
            }
        } catch (e) {
            toast.error(`Erreur lors de l’assemblage de la vidéo ${file.fileName}`);
            console.error(e);
        }
    });



    // Écoute quand un fichier est ajouté
    resumable.value.on('fileAdded', function (file) {
        console.log('Fichier ajouté :', file.fileName);
        imageUrl.value = URL.createObjectURL(file.file);

        // 🔥 Démarrer l'upload
        resumable.value.upload();
    });


    resumable.value.on('fileError', function (file, message) {
        const errorMessage = JSON.parse(message);
        toast.error("Échec lors de l’upload : " + errorMessage.error);
    });



});

function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
        imageUrl.value = URL.createObjectURL(files[0]);
    }
}

function checkAllUploadsComplete() {
    if (resumable.value.files.length === filesUploadedCount.value) {
        allUploaded.value = true;
    }
}

watch(selectedCourse, (newCourse) => {
    selectedChapter.value = "";
    filteredChapters.value = chapterStore.allChapters.filter(
        (chapter) => chapter.course.id === newCourse
    );
});

const createVideos = async () => {
    try {

        await videoStore.createVideo({
            videos: videosUploaded.value,
            chapter_id: video.value.chapter_id,
        });

        const notification = useNotificationStore();

        // Réinitialisation
        video.value.chapter_id = "";
        videosUploaded.value = [];
        allUploaded.value = false;
        selectedCourse.value = "";

        if (notification.message) {
            toast.success(notification.message);
            notification.clearMessage();
        }
    } catch (error) {
        toast.error("Échec lors de la création de la vidéo");
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
