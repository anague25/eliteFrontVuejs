<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/admin">Dashboard</router-link></li>
                    <li class="breadcrumb-item active text-success">Modifier vos info</li>
                </ol>
            </nav>
        </div>


        <div class="bgcolor2">
            <!-- formulaire de creation -->
            <section class="form-section">

                <div class="form-container bgcolor1">
                    <h2 class="text-center text-white fw-bold">Modifier vos informations de formateur</h2>
                    <form @submit.prevent="updateInstructor" class="text">


                        <div class="mb-3">
                            <label class="form-label">Bio</label>
                            <textarea rows="2" v-model="instructor.bio" type="text" class="form-control"
                                placeholder="Donner une description"></textarea>
                            <span v-if="instructorStore.errors?.bio" class="error-text">
                                {{ instructorStore.errors.bio[0] }}
                            </span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Experience</label>
                            <textarea rows="2" v-model="instructor.experience" type="text" class="form-control"
                                placeholder="Votre experience"></textarea>
                            <span v-if="instructorStore.errors?.experience" class="error-text">
                                {{ instructorStore.errors.experience[0] }}
                            </span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Pays</label>
                            <input v-model="instructor.country" type="text" class="form-control"
                                placeholder="Nom du Pays" />
                            <span v-if="instructorStore.errors?.country" class="error-text">
                                {{ instructorStore.errors.country[0] }}
                            </span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Adresse</label>
                            <input v-model="instructor.address" type="text" class="form-control"
                                placeholder="Donnez une adresse" />
                            <span v-if="instructorStore.errors?.address" class="error-text">
                                {{ instructorStore.errors.address[0] }}
                            </span>
                        </div>


                        <div class="mb-3">
                            <label for="file" class="form-label">Image</label>
                            <input class="form-control" type="file" @change="handleFileUpload" id="file" />
                            <span v-if="instructorStore.errors?.image" class="error-text">
                                {{ instructorStore.errors.image[0] }}
                            </span>
                        </div>
                        <div v-if="imageUrl" class="mt-1 mb-2">
                            <img class="img" :src="imageUrl" alt="" width="60" height="60" />
                        </div>
                        <div v-else class="mt-1 mb-2">
                            <img class="img" :src="$baseUrl + instructor.image" alt="" width="60" height="60" />
                        </div>
                        <div class="mb-3">
                            <label for="file" class="form-label">Image IDcart 1(recto)</label>
                            <input class="form-control" type="file" @change="handleFileUpload1" id="file" />
                            <span v-if="instructorStore.errors?.idCart1" class="error-text">
                                {{ instructorStore.errors.idCart1[0] }}
                            </span>
                        </div>
                        <div v-if="idCart1Url" class="mt-1 mb-2">
                            <img class="img" :src="idCart1Url" alt="" width="60" height="60" />
                        </div>
                        <div v-else class="mt-1 mb-2">
                            <img class="img" :src="$baseUrl + instructor.idCart2" alt="" width="60" height="60" />
                        </div>
                        <div class="mb-3">
                            <label for="file" class="form-label">Image idCart2(verso)</label>
                            <input class="form-control" type="file" @change="handleFileUpload2" id="file" />
                            <span v-if="instructorStore.errors?.idCart2" class="error-text">
                                {{ instructorStore.errors.idCart2[0] }}
                            </span>
                        </div>
                        <div v-if="idCart2Url" class="mt-1 mb-2">
                            <img class="img" :src="idCart2Url" alt="" width="60" height="60" />
                        </div>
                        <div v-else class="mt-1 mb-2">
                            <img class="img" :src="$baseUrl + instructor.idCart2" alt="" width="60" height="60" />
                        </div>

                        <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                    </form>
                    <div class="mt-2"><router-link to="/users-dashboard/profile-instructor"
                            class="text-decoration-none">Retour</router-link>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useInstructorStore } from '@/stores/instructors/useInstructorStore';
import { useAuthStore } from '@/stores/auth/authStore';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const instructorStore = useInstructorStore();
const instructor = ref({ user_id: '', idCart1: "", idCart2: "", image: "", address: "", country: "", bio: "", experience: "" });

const imageUrl = ref('');
const idCart1Url = ref('');
const idCart2Url = ref('');

onMounted(async () => {

    try {
        instructor.value = await instructorStore.getInstructor();
    } catch (error) {
        toast.error("Une erreur s'est produite lors de la modification!");
    }
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        instructor.value.image = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(instructor.value.image);
    }
};
const handleFileUpload1 = (event) => {
    const file = event.target.files[0];
    if (file) {
        instructor.value.idCart1 = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            idCart1Url.value = e.target.result;
        };
        reader.readAsDataURL(instructor.value.idCart1);
    }
};
const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    if (file) {
        instructor.value.idCart2 = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            idCart2Url.value = e.target.result;
        };
        reader.readAsDataURL(instructor.value.idCart2);
    }
};


const updateInstructor = async () => {
    try {
        // Supprimer le champ `image` si ce n'est pas un fichier (donc si aucune nouvelle image n'a été sélectionnée)
        if (!(instructor.value.image instanceof File)) {
            delete instructor.value.image;
        }
        if (!(instructor.value.idCart1 instanceof File)) {
            delete instructor.value.idCart1;
        }
        if (!(instructor.value.idCart2 instanceof File)) {
            delete instructor.value.idCart2;
        }
        const formData = new FormData();
        Object.entries(instructor.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await instructorStore.updateInstructor(formData);
        await authStore.getUser();
        router.push("/users-dashboard/profile-instructor");
    }
    catch (error) {
        if (error.response?.data?.message) {
            toast.error("Echec lors de la modification");
        }
    }

};
</script>

<style scoped>
#main {
    background-color: #000000;
}

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
