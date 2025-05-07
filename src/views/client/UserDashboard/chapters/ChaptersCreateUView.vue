<template>
     <main id="main" class="main">
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">Création d’un chapitre</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">

        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Création d’un chapitre</h2>
                <form @submit.prevent="createChapter" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="chapter.title" type="text" class="form-control"
                            placeholder="titre du chapitre" />
                        <span v-if="chapterStore.errors?.title" class="error-text">
                            {{ chapterStore.errors.title[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea v-model="chapter.description" type="text" class="form-control"
                            placeholder="description du chapitre"></textarea>
                        <span v-if="chapterStore.errors?.description" class="error-text">
                            {{ chapterStore.errors.description[0] }}
                        </span>
                    </div>


                    <div class="mb-3">
                        <label class="form-label">Cours</label>
                        <select v-model="chapter.course_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un cours</option>
                            <option v-for="course in instructorStore.getinstructor.courses" :key="course.id" :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>
                        <span v-if="chapterStore.errors?.course_id" class="error-text">
                            {{ chapterStore.errors?.course_id[0] }}
                        </span>
                    </div>





                    <button type="submit" class="btn btn-success w-100">Créer</button>
                </form>
                <div class="mt-2"><router-link to="/users-dashboard/chapters" class="text-decoration-none">Retour à la liste des chapitres</router-link>
                </div>
            </div>
        </section>
    </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useChapterStore } from '@/stores/chapters/useChapterStore';
import { useInstructorStore } from '@/stores/instructors/useInstructorStore';

const instructorStore = useInstructorStore();
const courseStore = useCourseStore();
const chapterStore = useChapterStore();
const chapter = ref({ title: "", course_id: "" });



onMounted(() => {
    try {
        courseStore.clearErrors();
        instructorStore.getInstructor();
    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});


const createChapter = async () => {
    try {
        const formData = new FormData();
        Object.entries(chapter.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await chapterStore.createChapter(formData);
        const notification = useNotificationStore();

        chapter.value = { title: "", course_id: "" };


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
