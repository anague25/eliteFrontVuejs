<template>
    <div class="pagenumber">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">liste des Recommandations</li>
            </ol>
        </nav>
    </div>


    <div class="table-container card">
        <div class="card-body">
            <h3 class="text-center text-uppercase text-white fw-bold mb-3">listes des recommandation</h3>
            <div class="card-number my-0 py-0 ">
                <router-link to="/admin-recommandations-sum" class="float-end btn btn-sm btn-success ">Les plus
                    recommandés</router-link>

                <span class="row col-md-6 col-4 "><input type="search" v-model="searchQuery"
                        @input="searchRecommandations" placeholder="Rechercher user" class="form-control mb-2 col-2">
                    <input type="search" v-model="searchCourse" @input="searchRecommandations"
                        placeholder="Rechercher cours" class="form-control mb-2 col-2"></span>
            </div>
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                        </th>
                        <th>number</th>
                        <th>Cours</th>
                        <th>firstName</th>
                        <th>lastName</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(recommandation, index) in recommandationStore.recommandations" :key="recommandation.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <input type="checkbox" :value="recommandation.id" v-model="selectedRecommandations">
                        </td>
                        <td>{{ recommandation.number }}</td>
                        <td>{{ recommandation.course?.title }}</td>
                        <td>{{ recommandation.user?.firstName }}</td>
                        <td>{{ recommandation.user?.lastName }}</td>



                        <td class="d-flex ">
                            <button class="btn btn-sm btn-danger my-1 ms-1"
                                @click="deleteRecommandation(recommandation.id)">Supprimer</button>
                            <button class="btn btn-sm btn-primary my-1 ms-1"
                                @click="editRecommandation(recommandation.id)">Modifier</button>

                        </td>
                    </tr>
                    <tr v-if="recommandationStore.recommandations.length === 0">
                        <td colspan="3" class="text-center">Aucune recommandation n'a été trouvé.</td>
                    </tr>

                </tbody>
            </table>
            <!-- Bouton pour suppression multiple -->
            <button class="btn btn-danger mt-2 float-end" @click="deleteMultipleRecommandations"
                :disabled="selectedRecommandations.length === 0">
                Supprimer les sélections
            </button>
        </div>

        <div class="container-fluid ">
            <div class="pagination d-flex gap-2 float-end flex-wrap">
                <!-- Bouton "Précédent" -->
                <button class="btn btn-dark btn-pag" :disabled="recommandationStore.pagination.current_page === 1"
                    @click="fetchPage(recommandationStore.pagination.current_page - 1)">
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
                    :disabled="recommandationStore.pagination.current_page === recommandationStore.pagination.last_page"
                    @click="fetchPage(recommandationStore.pagination.current_page + 1)">
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
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useRecommandationStore } from '@/stores/recommandations/useRecommandationStore';




const recommandationStore = useRecommandationStore();
const router = useRouter();
const searchQuery = ref("");
const searchCourse = ref("");
const page = 1;
const selectedRecommandations = ref([]);
const selectAll = ref(false);
const confirmModal = ref(null);  // Référence pour la modale


onMounted(() => {

    const notification = useNotificationStore();

    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }
    recommandationStore.fetchRecommandations();

});





const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedRecommandations.value = recommandationStore.recommandations.map(recommandation => recommandation.id);
        console.log(selectedRecommandations.value);
    } else {
        selectedRecommandations.value = [];
    }
};


// Fonction pour afficher la modale de confirmation avant de supprimer un secteur
const deleteRecommandation = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer cette recommandation ?",
        async () => {
            await recommandationStore.deleteRecommandation(id);
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage
            }
        }
    );
};


const editRecommandation = (id) => {
    router.push({ name: "editRecommandation", params: { id } });
};




const deleteMultipleRecommandations = async () => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer les Recommandations sélectionnés ?",
        async () => {
            await recommandationStore.deleteMultipleRecommandations(selectedRecommandations.value);
            selectedRecommandations.value = [];
            selectAll.value = false;
            const notification = useNotificationStore();

            if (notification.message) {
                toast.success(notification.message);
                notification.clearMessage(); // Effacer après affichage

            }

            recommandationStore.fetchRecommandations();
        }
    );
};

const searchRecommandations = () => {
    recommandationStore.fetchRecommandations(page.value, searchQuery.value, searchCourse.value);
};


const fetchPage = (page) => {
    if (page) {
        recommandationStore.fetchRecommandations(page, searchQuery.value, searchCourse.value);
    }
};

// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = recommandationStore.pagination;
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