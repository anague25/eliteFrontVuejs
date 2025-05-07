<template>
    <div class="bgcolor2">
        <Navbar></Navbar>
        <!-- Section formulaire de connexion -->
        <section class="form-section ">
            <div class="form-container bgcolor1">
                <h2 class="text-white text-center">Connectez-vous</h2>
                <form @submit.prevent="submit" class="text">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="form.email" type="email" class="form-control" id="email"
                            placeholder="Votre email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Mot de passe</label>
                        <input v-model="form.password" type="password" class="form-control" id="password"
                            placeholder="Votre mot de passe">
                    </div>
                    <div class="mb-3 form-check">
                        <input v-model="form.remember" type="checkbox" class="form-check-input" id="remember">
                        <label class="form-check-label" for="remember">Se souvenir de moi</label>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Se connecter</button>
                </form>
                <div class="text-center mt-3 ">
                    <p class="text-white">Pas encore de compte ? <router-link class="text-green" aria-current="page"
                            to="/register">Inscrivez-vous</router-link></p>
                    <p><router-link to="/request-reset-password" class="text-green">Mot de passe oublié ?</router-link>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/authStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
    email: '',
    password: '',
    remember: false
});

const submit = async () => {
    try {
        await authStore.login(form.value);
        router.push('/'); // Rediriger après connexion
    } catch (error) {
        if (error.response?.data?.message) {
            toast.error("Identifiants incorrects");
        }
    }
};


onMounted(() => {
    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }

// Préremplir les champs si "Se souvenir de moi" est coché
if (authStore.remember) {
        form.value.email = authStore.email;
        form.value.password = authStore.password;
        form.value.remember = true; // Cocher la case "Se souvenir de moi"
    }

});


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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}
</style>