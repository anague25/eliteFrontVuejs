<template>
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">édition d'un sous-secteur</li>
            </ol>
        </nav>
    </div>


    <div class="bgcolor2">
        <!-- formulaire de creation -->
        <section class="form-section">

            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Modifier un Sous-secteur</h2>
                <form @submit.prevent="updateSubSector" class="text">
                    <div class="mb-3">
                        <label class="form-label">Nom</label>
                        <input v-model="subSector.name" type="text" class="form-control" />
                        <span v-if="subSectorStore.errors?.name" class="error-text">
                            {{ subSectorStore.errors.name[0] }}
                        </span>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Secteur</label>
                        <select v-model="subSector.sector_id" class="form-control">
                            <option v-for="sector in sectorStore.allSectors" :key="sector.id" :value="sector.id">
                                {{ sector.name }}
                            </option>
                        </select>
                        <span v-if="subSectorStore.errors?.sector_id" class="error-text">
                            {{ "The sector field is required" }}
                        </span>
                    </div>

                    <button type="submit" class="btn btn-success w-100">Mettre à jour</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSectorStore } from '@/stores/sectors/useSectorStore';
import { useSubSectorStore } from "@/stores/subsectors/useSubSectorStore";
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();
const subSectorStore = useSubSectorStore();
const sectorStore = useSectorStore();
const subSector = ref({ id: null, name: "", sector_id: null });



onMounted(async () => {

    try {
        sectorStore.fetchAllSectors();
        subSector.value = await subSectorStore.fetchSubSectorById(route.params.id);
        subSector.value.sector_id = subSector.value.sector?.id;
        console.log(subSector.value);
    } catch (error) {
        toast.error("Une erreur s'est produite lors de la modification!");
    }
});


const updateSubSector = async () => {
    try {
        await subSectorStore.updateSubSector(subSector.value);
        router.push("/admin-subsectors");
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
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
