<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">création des specialtés</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Créer Une Spécialité</h2>
                <form @submit.prevent="createSpecialty" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="specialty.name" type="text" class="form-control"
                            placeholder="Nom de la specialite" />
                        <span v-if="specialtyStore.errors?.name" class="error-text">
                            {{ specialtyStore.errors.name[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Instructeur</label>
                        <select v-model="specialty.instructor_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un instructeur</option>
                            <option v-for="instructor in instructorStore.allInstructors" :key="instructor.id"
                                :value="instructor.id">
                                {{ instructor.user?.firstName }}
                            </option>
                        </select>
                        <span v-if="instructorStore.errors?.instructor_id" class="error-text">
                            {{ instructorStore.errors.instructor_id[0] }}
                        </span>
                    </div>




                    <button type="submit" class="btn btn-success w-100">Valider</button>
                </form>
                <div class="mt-2"><router-link to="/admin-specialties" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useSpecialtyStore } from '@/stores/specialties/useSpecialtyStore';
import { useInstructorStore } from '@/stores/instructors/useInstructorStore'

const instructorStore = useInstructorStore();
const specialtyStore = useSpecialtyStore();
const specialty = ref({ name: "", instructor_id: "" });




onMounted(() => {
    try {
        specialtyStore.clearErrors();
        instructorStore.fetchAllInstructors();
    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});




const createSpecialty = async () => {
    try {
        const formData = new FormData();
        Object.entries(specialty.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await specialtyStore.createSpecialty(formData);
        const notification = useNotificationStore();

        specialty.value = { name: "", instructor_id: "" };


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
