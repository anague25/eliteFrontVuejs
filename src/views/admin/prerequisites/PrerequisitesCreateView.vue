<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">création des prérequis</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Créer Une Prérequis</h2>
                <form @submit.prevent="createPrerequisite" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="prerequisite.name" type="text" class="form-control"
                            placeholder="Nom de la categorie" />
                        <span v-if="prerequisiteStore.errors?.name" class="error-text">
                            {{ prerequisiteStore.errors.name[0] }}
                        </span>
                    </div>
                 

                    <div class="mb-3">
                        <label class="form-label">Cours</label>
                        <select v-model="prerequisite.course_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un cours</option>
                            <option v-for="course in courseStore.allCourses" :key="course.id"
                                :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>
                        <span v-if="prerequisiteStore.errors?.course_id" class="error-text">
                            {{ prerequisiteStore.errors?.course_id[0]}}
                        </span>
                    </div>


                   
                   

                    <button type="submit" class="btn btn-success w-100">Créer</button>
                </form>
                <div class="mt-2"><router-link to="/admin-prerequisites" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { usePrerequisiteStore } from '@/stores/prerequisites/usePrerequisiteStore';

const courseStore = useCourseStore();
const prerequisiteStore = usePrerequisiteStore();
const prerequisite = ref({ name: "", course_id: "" });



onMounted(() => {
    try {
        courseStore.clearErrors();
        courseStore.fetchAllCourses();
    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});


const createPrerequisite = async () => {
    try {
        const formData = new FormData();
        Object.entries(prerequisite.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await prerequisiteStore.createPrerequisite(formData);
        const notification = useNotificationStore();

        prerequisite.value = { name: "", course_id: ""};


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
