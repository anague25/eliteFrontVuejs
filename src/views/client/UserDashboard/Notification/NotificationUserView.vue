<template>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">Détails de l'instructeur</li>
                </ol>
            </nav>
        </div>


        <div class="container card bgcolor2">



            <div class="container mt-4">
                <h2 class="mb-4 white">Mes Notifications</h2>

                <!-- Notifications non lues -->
                <div v-if="unread.length">
                    <h4 class="text fw-bold">Nouvelles notifications</h4>
                    <div v-for="notif in unread" :key="notif.id" class="card mb-2 border bgcolor1">
                        <div class="card-body">
                            <h5 class="card-title white">{{ notif.data.title }}</h5>
                            <p class="card-text text">{{ notif.data.message }}</p>
                            <small class="white">{{ formatDate(notif.created_at) }}</small>
                        </div>
                    </div>
                </div>

                <!-- Ligne de séparation -->
                <hr v-if="unread.length && read.length" class="my-4" />

                <!-- Notifications lues -->
                <div v-if="read.length">
                    <h4 class="text fw-bold">Anciennes notifications</h4>
                    <div v-for="notif in read" :key="notif.id" class="card mb-2 bgcolor1 border">
                        <div class="card-body">
                            <h5 class="card-title white">{{ notif.data.title }}</h5>
                            <p class="card-text text">{{ notif.data.message }}</p>
                            <small class="white">{{ formatDate(notif.created_at) }}</small>
                        </div>
                    </div>
                </div>

                <div v-if="!unread.length && !read.length" class="text-center text fw-bold mt-5">
                    Aucune notification pour le moment.
                </div>
            </div>




        </div>
        <!-- Modale de confirmation -->
        <ConfirmModal ref="confirmModal" />

    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import axios from '@/plugins/axios'


const confirmModal = ref(null);  // Référence pour la modale
const unread = ref([])
const read = ref([])

const fetchNotifications = async () => {
    try {
        const { data } = await axios.get('/notifications')
        unread.value = data.unread;
        read.value = data.read;
        // Marquer les notifications non lues comme lues
        if (data.unread.length) {
            await axios.post('/notifications/mark-as-read');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des notifications', error)
    }
}

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
}

onMounted(fetchNotifications);







// Fonction pour afficher la modale de confirmation avant de supprimer un secteur
const deleteInstructor = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer votre statut d'instructeur ? cela entrainera egalement la suppression de vos formations",
        async () => {
            await instructorStore.deleteInstructor(id);
            instructorStore.getinstructor = {};
            router.push("/users-dashboard/create-instructor");
        }
    );
};



</script>


<style scoped>
#main {
    background-color: #000000;
}

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