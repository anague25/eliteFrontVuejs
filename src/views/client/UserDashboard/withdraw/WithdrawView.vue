<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/users-dashboard">admin</router-link></li>
                    <li class="breadcrumb-item active text-success">Retrait des gains</li>
                </ol>
            </nav>
        </div>
        <div class="bgcolor2">
            <!-- formulaire de creation -->
            <div class="form-container bgcolor1">
                <h2 class="text-center text-white fw-bold">Retrait des gains </h2>


                <form @submit.prevent="submitWithdrawal">
                    <div class="mb-3">
                        <label for="amount" class="form-label white">Montant</label>
                        <input v-model="amount" type="number" class="form-control" placeholder="1000" id="amount" />
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label white">Numéro (ex: 2376XXXXXXX)</label>
                        <input v-model="phone" type="text" class="form-control" id="phone" placeholder="2376XXXXXXXX" />
                    </div>

                    <button type="submit" class="btn btn-primary" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                        Retirer
                    </button>
                </form>

                <!-- <div v-if="response" class="alert alert-success mt-3">
                    {{ response }}
                </div> -->


                <div class="mt-2"><router-link to="/users-dashboard" class="text-decoration-none">Retour</router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth/authStore';
import axios from '@/plugins/axios';
import { useLoaderStore } from "@/stores/loader/useLoaderStore";


const amount = ref('');
const loader = useLoaderStore();

const phone = ref('');
const response = ref(null);

const submitWithdrawal = async () => {
    response.value = null

    try {
        if (amount.value == "") {
            toast.error("Veuillez fourni le montant à retirer");
            return;
        }
        if (phone.value == "") {
            toast.error("Veuillez fourni un numero de téléphone!");
            return;
        }

        // if (amount.value < 1000) {
        //     toast.info("Le montant doit etre superieure ou égale à 1000 XAF");
        //     return;
        // }

        const phoneRegex = /^2376\d{8}$/;
        if (!phoneRegex.test(phone.value)) {
            toast.error("Le numéro doit être au format 2376XXXXXXXX (8 chiffres après 2376)");
            return;
        }




        loader.show();
        const res = await axios.post('/withdraw', {
            amount: amount.value,
            phone: phone.value
        })

        response.value = res.data.message;
        toast.success(response.value);
    } catch (err) {
        console.log(err);
        if (err.response?.data?.message) {
            toast.error(err.response?.data?.message);
        }
    } finally {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        loader.hide(); // 👉 Désactive le loader global
    }
}





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