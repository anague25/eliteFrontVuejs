<template>
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">édition d'une langue</li>
            </ol>
        </nav>
    </div>


    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">

            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Modifier une langue</h2>
                <form @submit.prevent="updateLanguage" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="language.name" type="text" class="form-control"
                            placeholder="Nom de la langue" />
                        <span v-if="languageStore.errors?.name" class="error-text">
                            {{ languageStore.errors.name[0] }}
                        </span>
                    </div>

                    <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                </form>
                <div class="mt-2"><router-link to="/admin-languages" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useLanguageStore } from '@/stores/languages/useLanguageStore';

const route = useRoute();
const router = useRouter();
const languageStore = useLanguageStore();
const language = ref({ id: null, name: "" });

onMounted(async () => {

    try {
        language.value = await languageStore.fetchLanguageById(route.params.id);
    } catch (error) {
        toast.error("Une erreur s'est produite lors de la modification!");
    }
});

const updateLanguage = async () => {
    try {

        await languageStore.updateLanguage(language.value);
        router.push("/admin-languages");
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
