<template>
    <div class="pagenumber">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">édition d'une recommandation</li>
            </ol>
        </nav>
    </div>


    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">

            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Modifier une recommandation</h2>
                <form @submit.prevent="updateRecommandation" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nombre</label>
                        <input v-model="recommandation.number" type="number" min="0" class="form-control"
                            placeholder="entrer le nombre" />
                        <span v-if="recommandationStore.errors?.number" class="error-text">
                            {{ recommandationStore.errors.number[0] }}
                        </span>
                    </div>




                    <div class="mb-3">
                        <label class="form-label">Cours</label>
                        <select v-model="recommandation.course_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un cours</option>
                            <option v-for="course in courseStore.allCourses" :key="course.id" :value="course.id">
                                {{ course.title }}
                            </option>
                        </select>
                        <span v-if="recommandationStore.errors?.course_id" class="error-text">
                            {{ recommandationStore.errors?.course_id[0] }}
                        </span>
                    </div>






                    <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                </form>
                <div class="mt-2"><router-link to="/admin-recommandations" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useRecommandationStore } from '@/stores/recommandations/useRecommandationStore';
import { useCourseStore } from '@/stores/courses/useCourseStore';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const recommandationStore = useRecommandationStore();
const recommandation = ref({ number: "", course_id: "" });




onMounted(async () => {

    try {
        courseStore.fetchAllCourses();
        recommandation.value = await recommandationStore.fetchRecommandationById(route.params.id);
    } catch (error) {
        toast.error("Une erreur s'est produite lors de la modification!");
    }
});



const updateRecommandation = async () => {
    try {
        await recommandationStore.updateRecommandation(recommandation.value);
        router.push("/admin-recommandations");
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
