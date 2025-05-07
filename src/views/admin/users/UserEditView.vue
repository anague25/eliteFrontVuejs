<template>
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">édition d'une categorie</li>
            </ol>
        </nav>
    </div>


    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">

            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Modifier une categorie</h2>
                <form @submit.prevent="update" class="text">
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
                    <div v-if="imageUrl" class="mt-1 mb-2">
                        <img class="img" :src="imageUrl" alt="" width="60" height="60" />
                    </div>
                    <div v-else class="mt-1 mb-2">
                        <img class="img" :src="$baseUrl + image" alt="" width="60" height="60" />
                    </div>

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
                    <button type="submit" class="btn btn-success w-100">Modifier</button>
                </form>
                <div class="mt-2"><router-link to="/admin-users" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

const imageUrl = ref('');
const image = ref('');
const route = useRoute();
const router = useRouter();


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.profile = file;

        const reader = new FileReader();
        reader.onload = (event) => {
            imageUrl.value = event.target.result;
        };
        reader.readAsDataURL(form.value.profile);
    }
};



onMounted(async () => {
    try {
        authStore.clearErrors();
        await authStore.getUserById(Number(route.params.id));

        if (authStore.getuserbyid?.firstName) {
            form.value.firstName = authStore.getuserbyid.firstName;
            form.value.lastName = authStore.getuserbyid.lastName;
            form.value.email = authStore.getuserbyid.email;
            form.value.phone = authStore.getuserbyid.phone;
            form.value.gender = authStore.getuserbyid.gender;
            image.value = authStore.getuserbyid.profile;
        }

    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});



const update = async () => {
    try {

        const formData = new FormData();
        if (!(form.value.profile instanceof File)) {
            delete form.value.profile;
        }
        if (!form.value.password) {
            delete form.value.password;
        }
        if (!form.value.password) {
            delete form.value.password_confirmation;
        }


        Object.entries(form.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await authStore.UpdateUser(formData);
        router.push("/admin-users");
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
