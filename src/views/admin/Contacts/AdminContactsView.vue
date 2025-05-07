<template>

    <div class="pagetitle">
        <h1 class="text-white">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item text-white"><router-link to="/admin">admin</router-link></li>
                <li class="breadcrumb-item active text-success">Méssages</li>
            </ol>
        </nav>
    </div>
    <div class="row bgcolor2 px-5">

        <section class=" row mb-5 form-section">
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Repondre aux méssages</h2>
                <form @submit.prevent="SendMessage" class="contact-form text">
                    <div class="mb-3">
                        <label for="m" class="form-label">Email</label>
                        <input type="text" v-model="email" class="form-control" id="m" placeholder="email">
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Reponse</label>
                        <textarea type="text" v-model="message" class="form-control" id="message"
                            placeholder="Message"></textarea>
                        <span v-if="contactStore.errors?.response" class="error-text">
                            {{ contactStore.errors.response[0] }}
                        </span>
                    </div>


                    <button type="submit" class="btn btn-success">Envoyer le message</button>
                </form>

            </div>
        </section>






        <div class=" bgcolor2 row" v-if="contactStore.contacts.length > 0">
            <div class="card-body p-2">
                <h3 class="text-center text-uppercase text-white fw-bold mb-3">liste des messages</h3>
                <div class="card-title my-0 py-0 ">
                    <!-- <span class="col-md-6 col-4 "> <input type="checkbox" v-model="selectAll"
                            @change="toggleSelectAll"> Tous selectionnes
                    </span> -->
                </div>



                <div class="card" v-for="(contact, index) in contactStore.contacts" :key="contact.id"
                    style="width: 18rem;">
                    <div class="card-header">
                        <input type="checkbox" :value="contact.id" v-model="selectedContacts">
                        {{ contact.name }}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> {{ contact.phone }}</li>
                        <li class="list-group-item"> {{ contact.email }}</li>
                        <li class="list-group-item"> {{ contact.message }}</li>
                        <li class="list-group-item"> <button class="btn btn-sm btn-danger my-1 ms-1"
                                @click="deleteContact(contact.id)">Supprimer</button></li>
                        <li class="list-group-item"> <button class="btn btn-sm btn-success my-1 ms-1"
                                @click="respo(contact.id, contact.email)">Repondre</button></li>
                    </ul>
                </div>

                <!-- Bouton pour suppression multiple -->
                <!-- <button class="btn btn-danger mt-2 float-end" @click="deleteMultipleContacts"
                    :disabled="selectedContacts.length === 0">
                    Supprimer les sélections
                </button> -->
            </div>

            <div class="container-fluid">
                <div class="pagination d-flex gap-2 float-end flex-wrap">
                    <!-- Bouton "Précédent" -->
                    <button class="btn btn-dark btn-pag" :disabled="contactStore.pagination.current_page === 1"
                        @click="fetchPage(contactStore.pagination.current_page - 1)">
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
                        :disabled="contactStore.pagination.current_page === contactStore.pagination.last_page"
                        @click="fetchPage(contactStore.pagination.current_page + 1)">
                        Suivant &raquo;
                    </button>
                </div>
            </div>
        </div>






    </div>
    <ConfirmModal ref="confirmModal" />




</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { usecontactStore } from "@/stores/contacts/usecontactStore"
import ConfirmModal from '@/components/admin/ConfirmModal.vue';  // Importation de la modale de confirmation

const contactStore = usecontactStore();

const message = ref('');
const id = ref(null);
const email = ref('');



const page = 1;
const selectedContacts = ref([]);
const selectAll = ref(false);
const confirmModal = ref(null);  // Référence pour la modale
onMounted(() => {
    try {
        contactStore.clearErrors();
        contactStore.fetchContacts();
    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
});


const SendMessage = async () => {
    try {
        await contactStore.SendMessage({ id: id.value, response: message.value });
        id.value = null;
        message.value = '';
        email.value = '';


        toast.success('Le message a été envoyer avec succes!!!');

    }
    catch (error) {
        if (error.response?.data?.message) {
            toast.error("Echec lors de l'envoi");
        }
    }

};



const fetchPage = (page) => {
    if (page) {
        contactStore.fetchChapters(page);
    }
};

const respo = (idCon, emailCont) => {
    id.value = idCon;
    email.value = emailCont;
    console.log(email.value, id.value);
};

const deleteContact = async (id) => {
    confirmModal.value.show(
        "Voulez-vous vraiment supprimer ce message ?",
        async () => {
            await contactStore.deleteContact(id);

            toast.success('message supprimer avec succes');

        }
    );
};



const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedContacts.value = contactStore.contacts.map(contact => contact.id);
    } else {
        selectedContacts.value = [];
    }
};


// generer des pages intermediaires
const formattedLinks = computed(() => {
    const { current_page, last_page } = contactStore.pagination;
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
