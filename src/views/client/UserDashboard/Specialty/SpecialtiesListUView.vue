<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/users-dashboard">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">liste des spécialités</li>
                </ol>
            </nav>
        </div>


        <div class="table-container card">
            <div class="card-body">
                <h3 class="text-center text-uppercase text-white fw-bold mb-3">listes des spécialités</h3>
                <div class="card-title my-0 py-0 ">
                    <router-link to="/users-dashboard/create-specialty" class="float-end btn btn-sm btn-success ">Créer
                        des
                        spécialités</router-link>
                    <span class="row col-md-6 col-4 "><input type="search" v-model="searchQuery"
                            @input="searchSpecialties" placeholder="Rechercher" class="form-control mb-2"></span>
                </div>
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                            </th>
                            <th>Nom</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(specialty, index) in specialtyStore.getSpecialtiesInstructor" :key="specialty.id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <input type="checkbox" :value="specialty.id" v-model="selectedSpecialties">
                            </td>
                            <td>{{ specialty.name }}</td>


                            <td class="d-flex ">
                                <button class="btn btn-sm btn-danger my-1 ms-1"
                                    @click="deleteSpecialty(specialty.id)">Supprimer</button>
                                <button class="btn btn-sm btn-primary my-1 ms-1"
                                    @click="editSpecialty(specialty.id)">Modifier</button>

                            </td>
                        </tr>
                        <tr v-if="specialtyStore.getSpecialtiesInstructor.length === 0">
                            <td colspan="3" class="text-center">Aucune spécialité n'a été trouvée.</td>
                        </tr>

                    </tbody>
                </table>
                <!-- Bouton pour suppression multiple -->
                <button class="btn btn-danger mt-2 float-end" @click="deleteMultipleSpecialties"
                    :disabled="selectedSpecialties.length === 0">
                    Supprimer les sélection
                </button>
            </div>

            <div class="container-fluid ">
                <div class="pagination d-flex gap-2 float-end flex-wrap">
                    <!-- Bouton "Précédent" -->
                    <button class="btn btn-dark btn-pag" :disabled="specialtyStore.pagination.current_page === 1"
                        @click="fetchPage(specialtyStore.pagination.current_page - 1)">
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
                        :disabled="specialtyStore.pagination.current_page === specialtyStore.pagination.last_page"
                        @click="fetchPage(specialtyStore.pagination.current_page + 1)">
                        Suivant &raquo;
                    </button>
                </div>
            </div>
        </div>
        <!-- Modale de confirmation -->
        <ConfirmModal ref="confirmModal" />

    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useSpecialtyStore } from '@/stores/specialties/useSpecialtyStore';

const router = useRouter();
const specialtyStore = useSpecialtyStore();
const searchQuery = ref("");
const page = 1;
const selectedSpecialties = ref([]);
const selectAll = ref(false);
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    specialtyStore.fetchSpecialtiesInstructor();

});





const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedSpecialties.value = specialtyStore.getSpecialtiesInstructor.map(specialty => specialty.id);
    } else {
        selectedSpecialties.value = [];
    }
};


// Fonction pour afficher la modale de confirmation avant de supprimer un secteur
const deleteSpecialty = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer cette specialite ?",
        async () => {
            await specialtyStore.deleteSpecialty(id);
            const notification = useNotificationStore();
            specialtyStore.fetchSpecialtiesInstructor();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage
            }
        }
    );
};


const editSpecialty = (id) => {
    router.push({ name: "userUpdateSpecialty", params: { id } });
};




const deleteMultipleSpecialties = async () => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer les specialites sélectionnés ?",
        async () => {
            await specialtyStore.deleteMultipleSpecialties(selectedSpecialties.value);
            selectedSpecialties.value = [];
            selectAll.value = false;
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage

            }

            specialtyStore.fetchSpecialtiesInstructor();
        }
    );
};

const searchSpecialties = () => {
    specialtyStore.fetchSpecialtiesInstructor(page.value, searchQuery.value);
};


const fetchPage = (page) => {
    if (page) {
        specialtyStore.fetchSpecialtiesInstructor(page, searchQuery.value);
    }
};

// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = specialtyStore.pagination;
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
    padding: 7px;
    border-bottom: 1px solid #2e2f40;
}

.custom-table td img {
    padding: 0px;
    margin: 0px;
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




.custom-table td {
    vertical-align: middle;
}
</style>