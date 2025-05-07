<template>
    <div class="bgcolor2">
        <Navbar></Navbar>
        <!-- Section formulaire de connexion -->
        <section class="form-section ">
            <div class="form-container bgcolor1">
                <h2 class="text-white text-center">Nouveau mot de passe</h2>
                <form @submit.prevent="reset" class="text">

                    <div class="mb-3">
                        <label for="password" class="form-label">Mot de passe</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="Votre mot de passe">
                        <p v-if="authStore.errors?.password" class="text-danger pt-2">
                            {{ authStore.errors.password[0] }}
                        </p>
                    </div>


                    <div class="mb-3">
                        <label for="confirm-password" class="form-label">Confirmer le mot de passe</label>
                        <input autocomplete="off" v-model="password_confirmation" type="password" class="form-control"
                            id="confirm-password" placeholder="Confirmez votre mot de passe">

                    </div>

                    <button type="submit" class="btn btn-success w-100">Changer le mot de passe</button>
                </form>
            </div>
        </section>
    </div>
</template>


<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/authStore';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";

const route = useRoute();
const router = useRouter();


const authStore = useAuthStore();
const email = ref('');
const expires = ref('');
const signature = ref('');
const password = ref('');
const password_confirmation = ref('');
const message = ref('');
const error = ref('');

onMounted(() => {
    // Récupérer les paramètres signés
    email.value = route.query.email || '';
    expires.value = route.query.expires || '';
    signature.value = route.query.signature || '';
    authStore.clearErrors();

});






const reset = async () => {
    try {
        const response = await authStore.resetPassword({
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            expires: expires.value,
            signature: signature.value
        });

        router.push('/login'); // Rediriger après connexion
    } catch (error) {
        const notification = useNotificationStore();

        if (notification.message) {
            toast.error(notification.message);
            notification.clearMessage(); // Effacer après affichage
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}
</style>