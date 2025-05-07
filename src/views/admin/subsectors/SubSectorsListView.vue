<template>
    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">liste des sous-secteurs</li>
            </ol>
        </nav>
    </div>


    <div class="table-container card">
        <div class="card-body">
            <h3 class="text-center text-uppercase text-white fw-bold mb-3">listes des sous-secteurs</h3>
            <div class="card-title my-0 py-0 ">
                <router-link to="/admin-create-subsector" class="float-end btn btn-sm btn-success ">Créer des
                    Sous-secteurs</router-link>
                <span class="row col-md-6 col-4 "><input type="search" v-model="searchQuery" @input="searchSubSectors"
                        placeholder="Rechercher" class="form-control mb-2"></span>
            </div>
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                        </th>
                        <th>Nom</th>
                        <th>Secteur</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>


                    <tr v-for="(subSector, index) in subSectorStore.subSectors" :key="subSector.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <input type="checkbox" :value="subSector.id" v-model="selectedSubSectors">
                        </td>
                        <td>{{ subSector.name }}</td>
                        <td>{{ subSector.sector.name }}</td>
                        <td class="d-flex">
                            <button class="btn btn-sm btn-danger ms-1"
                                @click="deleteSubSector(subSector.id)">Supprimer</button>
                            <button class="btn btn-sm btn-primary ms-1"
                                @click="editSubSector(subSector.id)">Modifier</button>

                        </td>
                    </tr>
                    <tr v-if="subSectorStore.subSectors.length === 0">
                        <td colspan="3" class="text-center">Aucun sous-secteur trouvé.</td>
                    </tr>

                </tbody>
            </table>
            <!-- Bouton pour suppression multiple -->
            <button class="btn btn-danger mt-2 float-end" @click="deleteMultipleSubSectors"
                :disabled="selectedSubSectors.length === 0">
                Supprimer les sélections
            </button>
        </div>

        <div class="container-fluid ">
            <div class="pagination d-flex gap-2 float-end flex-wrap">
                <!-- Bouton "Précédent" -->
                <button class="btn btn-dark btn-pag" :disabled="subSectorStore.pagination.current_page === 1"
                    @click="fetchPage(subSectorStore.pagination.current_page - 1)">
                    &laquo; Précédent
                </button>

                <!-- Affichage dynamique des pages -->
                <template v-for="(link, index) in formattedLinks" :key="index">
                    <button v-if="link.page" class="btn btn-dark btn-pag" :class="{ 'active': link.active }"
                        @click="fetchPage(link.page)">
                        {{ link.label }}
                    </button>
                    <span v-else class="btn btn-dark btn-pag disabled">...</span>
                </template>

                <!-- Bouton "Suivant" -->
                <button class="btn btn-dark btn-pag"
                    :disabled="subSectorStore.pagination.current_page === subSectorStore.pagination.last_page"
                    @click="fetchPage(subSectorStore.pagination.current_page + 1)">
                    Suivant &raquo;
                </button>
            </div>
        </div>
    </div>
    <!-- Modale de confirmation -->
    <ConfirmModal ref="confirmModal" />


</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useSectorStore } from '@/stores/sectors/useSectorStore';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useSubSectorStore } from "@/stores/subsectors/useSubSectorStore";


const router = useRouter();
const sectorStore = useSectorStore();
const subSectorStore = useSubSectorStore();
const searchQuery = ref("");
const page = 1;
const selectedSubSectors = ref([]);
const selectAll = ref(false);
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    subSectorStore.fetchSubSectors();
    sectorStore.fetchSectors();

});





const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedSubSectors.value = subSectorStore.subSectors.map(subSector => subSector.id);
        console.log(selectedSubSectors.value);
    } else {
        selectedSubSectors.value = [];
    }
};


// Fonction pour afficher la modale de confirmation avant de supprimer un secteur
const deleteSubSector = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer ce sous-secteur ?",
        async () => {
            await subSectorStore.deleteSubSector(id);
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage
            }
        }
    );
};


const editSubSector = (id) => {
    router.push({ name: "editSubSector", params: { id } });
};




const deleteMultipleSubSectors = async () => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer les sous-secteurs sélectionnés ?",
        async () => {
            await subSectorStore.deleteMultipleSubSectors(selectedSubSectors.value);
            selectedSubSectors.value = [];
            selectAll.value = false;
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage

            }

            subSectorStore.fetchSubSectors();
        }
    );
};

const searchSubSectors = () => {
    subSectorStore.fetchSubSectors(page.value, searchQuery.value);
};


const fetchPage = (page) => {
    if (page) {
        subSectorStore.fetchSubSectors(page, searchQuery.value);
    }
};

// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = subSectorStore.pagination;
    const links = [];

    // Toujours inclure la première page
    if (last_page > 1) {
        links.push({ label: '1', page: 1, active: current_page === 1 });
    }

    // Afficher "..." si nécessaire
    if (current_page > 3) {
        links.push({ label: '...', page: null });
    }

    // Ajouter les pages autour de la page actuelle
    for (let i = Math.max(2, current_page - 4); i <= Math.min(last_page - 1, current_page + 4); i++) {
        links.push({ label: i.toString(), page: i, active: i === current_page });
    }

    // Afficher "..." si nécessaire
    if (current_page < last_page - 2) {
        links.push({ label: '...', page: null });
    }

    // Toujours inclure la dernière page
    if (last_page > 1) {
        links.push({ label: last_page.toString(), page: last_page, active: current_page === last_page });
    }

    return links;
});





</script>


<style scoped>
/* 🌙 Style général du conteneur */
.table-container {
    width: 100%;
    overflow-x: auto;
    padding: 10px;
    background-color: #000000;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* 🎨 Table stylisée */
.custom-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #191c24;
    color: #6c7293;
    text-align: left;
    border-radius: 8px;
    overflow: hidden;
}

/* 🔵 En-tête */
.custom-table thead {
    background-color: #232530;
    color: #ffffff;
}

.custom-table th {
    padding: 12px;
    text-transform: uppercase;
    font-size: 14px;
    border-bottom: 2px solid #2e2f40;
}

/* 🟢 Cellules du tableau */
.custom-table td {
    padding: 10px;
    border-bottom: 1px solid #2e2f40;
}

/* 🟠 Effet au survol */
.custom-table tbody tr:hover {
    background-color: #000000 !important;
    color: #ffffff !important;
    transition: background-color 0.3s ease-in-out;
}

/* 📱 Responsive : scroll horizontal si besoin */
@media screen and (max-width: 768px) {
    .custom-table {
        font-size: 12px;
    }

    .custom-table th,
    .custom-table td {
        padding: 8px;
    }
}
</style>