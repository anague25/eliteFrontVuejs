<template>
    <div class="bgcolor2">
        <Navbar></Navbar>
        <!-- Section formulaire de connexion -->
        <section class="form-section ">
            <div class="form-container bgcolor1">
                <h2 class="text-white text-center">Réinitialisation du mot de passe</h2>
                <form @submit.prevent="sendLink" class="text">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="Votre email">
                    </div>
                    <span v-if="authStore.errors?.email" class="text-danger">
                        {{ authStore.errors.email[0] }}
                    </span>
                    <button type="submit" class="btn btn-success w-100">Envoyer le lien</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const email = ref('');
const error = ref('');
const router = useRouter();

const sendLink = async () => {
    try {
        await authStore.sendResetLinkEmail(email.value);

        router.push('/'); // Rediriger après connexion

    } catch (err) {
        error.value = "Erreur lors de l'envoi du lien.";
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}
</style>