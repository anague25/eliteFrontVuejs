<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">création des categories</li>
            </ol>
        </nav>
    </div>
    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Créer Une Categorie</h2>
                <form @submit.prevent="createCategory" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="category.name" type="text" class="form-control"
                            placeholder="Nom de la categorie" />
                        <span v-if="categoryStore.errors?.name" class="error-text">
                            {{ categoryStore.errors.name[0] }}
                        </span>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea rows="2" v-model="category.description" type="text" class="form-control"
                            placeholder="Donner une description"></textarea>
                        <span v-if="categoryStore.errors?.description" class="error-text">
                            {{ categoryStore.errors.description[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Sous-secteur</label>
                        <select v-model="category.sub_sector_id" class="form-control">
                            <option value="" disabled selected>Veuillez choisir un sous-secteur</option>
                            <option v-for="subSector in subSectorStore.allSubSectors" :key="subSector.id"
                                :value="subSector.id">
                                {{ subSector.name }}
                            </option>
                        </select>
                        <span v-if="categoryStore.errors?.sub_sector_id" class="error-text">
                            {{ "The sub-sector field is required" }}
                        </span>
                    </div>


                    <div class="mb-3">
                        <label for="file" class="form-label">Image</label>
                        <input class="form-control" type="file" @change="handleFileUpload" id="file" />
                        <span v-if="categoryStore.errors?.image" class="error-text">
                            {{ categoryStore.errors.image[0] }}
                        </span>
                    </div>
                    <div v-if="imageUrl" class="mt-1 mb-2">
                        <img class="img" :src="imageUrl" alt="" width="60" height="60" />
                    </div>
                   

                    <button type="submit" class="btn btn-success w-100">Créer</button>
                </form>
                <div class="mt-2"><router-link to="/admin-categories" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useSubSectorStore } from "@/stores/subsectors/useSubSectorStore";
import { useCategoryStore } from '@/stores/categories/useCategoryStore';

const subSectorStore = useSubSectorStore();
const categoryStore = useCategoryStore();
const category = ref({ name: "", sub_sector_id: "", description: "", image: "" });
const imageUrl = ref('');



onMounted(() => {
    try {
        subSectorStore.clearErrors();
        subSectorStore.fetchAllSubSectors();
    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        category.value.image = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(category.value.image);
    }
};



const createCategory = async () => {
    try {
        const formData = new FormData();
        Object.entries(category.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await categoryStore.createCategory(formData);
        const notification = useNotificationStore();

        category.value = { name: "", sub_sector_id: "", description: "", image: "" };


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
