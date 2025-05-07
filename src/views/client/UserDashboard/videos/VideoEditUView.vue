<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/users-dashboard">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">edition d'une categorie</li>
                </ol>
            </nav>
        </div>


        <div class="bgcolor2">
            <!-- formulaire de creation -->
            <section class="form-section">

                <div class="form-container bgcolor1">
                    <h2 class="text-center text-white fw-bold">Modifier une video</h2>
                    <form @submit.prevent="updateVideo" class="text">
                        <div class="mb-3">
                            <label class="form-label">Cours</label>
                            <select v-model="selectedCourse" class="form-control">
                                <option value="" disabled selected>Veuillez choisir une cours</option>
                                <option v-for="course in courseStore.getCoursesInstructor" :key="course.id"
                                    :value="course.id">
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
                            <label for="videoUploadBtn" class="form-label">fichier(Video)</label>
                            <input id="videoUploadBtn" class="form-control" type="file" @change="handleFileChange" />
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

                        <div v-if="video.url" class="mt-1 mb-2">
                            <h5>Ancienne video</h5>
                            <video width="300" height="160" controls>
                                <source :src="$baseUrl + video.url" type="video/mp4">
                                Votre navigateur ne supporte pas la lecture de vidéo.
                            </video>
                            <p> {{ data.name }}</p>
                        </div>

                        <button type="submit" class="btn btn-success w-100" :disabled="!allUploaded">Mettre à
                            jour</button>
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
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';


import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useChapterStore } from '@/stores/chapters/useChapterStore';
import { useVideoStore } from '@/stores/videos/useVideoStore';
import Resumable from 'resumablejs';
import { useAuthStore } from '@/stores/auth/authStore';


const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const videoStore = useVideoStore();
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const selectedCourse = ref("");
const selectedChapter = ref("");
const filteredChapters = ref([]);
const videoUploaded = ref({});
const filesUploadedCount = ref(0);
const allUploaded = ref(false);
const resumable = ref(null);

const video = ref({ id: '', url: "", chapter_id: "" });
const data = ref({});


const imageUrl = ref('');


onMounted(async () => {

    try {
        courseStore.coursesInstructor();
        courseStore.fetchAllCourses();
        chapterStore.fetchAllChapters();
        data.value = await videoStore.fetchVideoById(route.params.id);
        video.value.id = data.value.id;
        video.value.chapter_id = data.value.chapter_id;
        video.value.url = data.value.url;
        video.value.name = data.value.name;
        selectedCourse.value = data.value.chapter?.course_id;
        console.log(data);
    } catch (error) {
        console.log(error);
        toast.error("Une erreur s'est produite lors de la modification!");
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
                videoUploaded.value = {
                    url: data.relative_path,
                    name: file.fileName,
                };

                filesUploadedCount.value++;
                checkAllUploadsComplete();

                video.value.url = data.relative_path;
                video.value.name = file.fileName;
            } else {
                toast.error(`Erreur lors de l'assemblage`);
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





    function checkAllUploadsComplete() {
        if (resumable.value.files.length === filesUploadedCount.value) {
            allUploaded.value = true;
        }
    }



});

watch(selectedCourse, (newSector) => {
    selectedChapter.value = "";
    filteredChapters.value = chapterStore.allChapters.filter(
        (chapter) => chapter.course.id === newSector
    );
});







function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
        imageUrl.value = URL.createObjectURL(files[0]);
    }
}




const updateVideo = async () => {
    try {

        await videoStore.updateVideo(video.value);
        allUploaded.value = false;
        console.log(video.value);
        router.push("/users-dashboard/videos");
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
