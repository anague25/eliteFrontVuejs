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


        <div class="table-container card">
            <div class="card-body">
                <h3 class="text-center text-uppercase text-white fw-bold mb-3">Détails de l'instructeur</h3>
                <div class="card-title my-0 py-0 ">

                </div>
                <table class="custom-table">
                    <thead>
                        <tr>

                            <th>Utilisateur</th>
                            <th>Pays</th>
                            <th>Adresse</th>
                            <th>Bio</th>
                            <th>Experience</th>
                            <th>image</th>
                            <th>ID cart 1</th>
                            <th>ID cart 2</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="instructor.user?.firstName">


                            <td>{{ instructor.user?.firstName }}</td>
                            <td>{{ instructor.country }}</td>
                            <td>{{ instructor.address }}</td>
                            <td>{{ instructor.bio }}</td>
                            <td>{{ instructor.experience }}</td>


                            <td class=""> <img class="img" :src="$baseUrl + instructor.image" alt="" width="28"
                                    height="28" />
                            </td>
                            <td class=""> <img class="img" :src="$baseUrl + instructor.idCart1" alt="" width="28"
                                    height="28" />
                            </td>
                            <td class=""> <img class="img" :src="$baseUrl + instructor.idCart2" alt="" width="28"
                                    height="28" />
                            </td>

                            <td class="d-flex ">
                                <button class="btn btn-sm btn-danger my-1 ms-1"
                                    @click="deleteInstructor(instructor.id)">Supprimer</button>
                                <button class="btn btn-sm btn-primary my-1 ms-1"
                                    @click="editInstructor(instructor.id)">Modifier</button>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Bouton pour suppression multiple -->

            </div>


        </div>
        <!-- Modale de confirmation -->
        <ConfirmModal ref="confirmModal" />

    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useInstructorStore } from '@/stores/instructors/useInstructorStore';

const notification = useNotificationStore();
const instructorStore = useInstructorStore();
const router = useRouter();
const confirmModal = ref(null);  // Référence pour la modale
const instructor = ref({});

onMounted(async () => {


    if (notification.message) {
        toast.success(notification.message);
        notification.clearMessage(); // Effacer après affichage
    }

    instructor.value = await instructorStore.getInstructor();

});







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


const editInstructor = (id) => {
    router.push({ name: "UpdateInstructorU" });
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