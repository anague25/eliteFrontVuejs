<template>
    <div class="bgcolor2">
        <Navbar></Navbar>

        <!-- Section formulaire d'inscription -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-white fw-bold text-center pb-2">Inscrivez-vous</h2>
                <form @submit.prevent="submit" class="text">
                    <div class="mb-3">
                        <label for="Prenom" class="form-label">Prenom</label>
                        <input v-model="form.firstName" type="text" class="form-control" id="Prenom"
                            placeholder="Votre Prenom">
                        <span v-if="authStore.errors?.firstName" class="error-text">
                            {{ authStore.errors.firstName[0] }}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="Nom" class="form-label">Nom</label>
                        <input v-model="form.lastName" type="text" class="form-control" id="Nom"
                            placeholder="Votre Nom">
                        <span v-if="authStore.errors?.lastName" class="error-text">
                            {{ authStore.errors.lastName[0] }}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="form.email" type="email" class="form-control" id="email"
                            placeholder="Votre email">
                        <span v-if="authStore.errors?.email" class="error-text">
                            {{ authStore.errors.email[0] }}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Numero de telephone</label>
                        <input v-model="form.phone" type="phone" class="form-control" id="phone"
                            placeholder="Numero de telephone">
                        <span v-if="authStore.errors?.phone" class="error-text">
                            {{ authStore.errors.phone[0] }}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="gender" class="form-label">Genre <span class="text-white fw-bold">(Choisissez votre
                                genre)</span></label>
                        <select v-model="form.gender" class="form-control" id="gender">
                            <option value="" selected>Choisissez votre genre</option>
                            <option value="M">Homme</option>
                            <option value="W">Femme</option>
                        </select>
                        <span v-if="authStore.errors?.gender" class="error-text">
                            {{ authStore.errors.gender[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label for="file" class="form-label">Profile</label>
                        <input class="form-control" type="file" @change="handleFileUpload" id="file" />
                    </div>
                    <span v-if="authStore.errors?.profile" class="error-text">
                        {{ authStore.errors.profile[0] }}
                    </span>

                    <div class="mb-3">
                        <label for="password" class="form-label">Mot de passe</label>
                        <input v-model="form.password" autocomplete="off" type="password" class="form-control"
                            id="password" placeholder="Votre mot de passe">
                        <span v-if="authStore.errors?.password" class="error-text">
                            {{ authStore.errors.password[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label for="confirm-password" class="form-label">Confirmer le mot de passe</label>
                        <input autocomplete="off" v-model="form.password_confirmation" type="password"
                            class="form-control" id="confirm-password" placeholder="Confirmez votre mot de passe">
                        <span v-if="authStore.errors?.password_confirmation" class="error-text">
                            {{ authStore.errors.password_confirmation[0] }}
                        </span>
                    </div>
                    <button type="submit" class="btn btn-success w-100">S'inscrire</button>
                </form>
                <div class="text-center mt-3">
                    <p class="text-white">Déjà inscrit ?
                        <router-link class="text-green" aria-current="page" to="/login">Connectez-vous</router-link>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/authStore';
import { toast } from 'vue3-toastify';


const authStore = useAuthStore();
const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    password_confirmation: '',
    profile: null
});

const router = useRouter();


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.profile = file;
    }
};


onMounted(() => {
    authStore.clearErrors();
});


const submit = async () => {
    try {

        const formData = new FormData();
        Object.entries(form.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await authStore.register(formData);
        router.push('/login'); // Rediriger après connexion
    } catch (error) {
        if (error.response?.data?.message) {
            toast.error(error.response?.data?.message || "Erreur lors de l'inscription !");
        } else {
            console.error("erreurs d'inscription : ", error);
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
</style>