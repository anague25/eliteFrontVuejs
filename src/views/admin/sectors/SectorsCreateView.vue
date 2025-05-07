<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">création de secteur</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-white fw-bold text-center pb-2">Créer un secteur d'activité </h2>
                <form @submit.prevent="submit" class="text">
                    <div class="mb-3">
                        <label for="nom" class="form-label">Nom</label>
                        <input v-model="form.name" type="text" class="form-control" id="nom"
                            placeholder="Le nom du secteur">
                        <span v-if="sectorStore.errors?.name" class="error-text">
                            {{ sectorStore.errors.name[0] }}
                        </span>
                    </div>

                    <button type="submit" class="btn btn-success w-100">Valider</button>
                </form>

                <div class="mt-2"><router-link to="/admin-sectors" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useSectorStore } from '@/stores/sectors/useSectorStore';
import { useNotificationStore } from "@/stores/useNotificationStore";


const sectorStore = useSectorStore();
const form = ref({
    name: '',

});

const router = useRouter();


onMounted(() => {
    sectorStore.clearErrors();
});


const submit = async () => {
    try {

        const formData = new FormData();
        Object.entries(form.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await sectorStore.create(formData);
        const notification = useNotificationStore();

        if (notification.message) {
            toast.success(notification.message);
            notification.clearMessage(); // Effacer après affichage
        }
        form.value.name = "";
    } catch (error) {
        if (error.response?.data?.message) {
            toast.error("Erreur lors de la creation !");
        } else {
            console.error("erreurs de creation : ", error);
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
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
