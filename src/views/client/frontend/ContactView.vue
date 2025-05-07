<template>
    <div class="bgcolor2">
        <Navbar></Navbar>
        <!-- Section Héro -->
        <section class="hero-section text-center bgcolor1">
            <div class="container">
                <h1>Contactez-nous</h1>
                <p class="lead">Nous sommes là pour vous aider !</p>
            </div>
        </section>

        <!-- Formulaire de contact -->
        <section class="contact-form-section ">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 shadow p-5 bgcolor1 rounded">
                        <h2 class="pb-3 text-white">Envoyez-nous un message</h2>
                        <form @submit.prevent="Envoyer" class="contact-form text">
                            <div class="mb-3">
                                <label for="name" class="form-label">Nom</label>
                                <input type="text" v-model="form.name" class="form-control" id="name"
                                    placeholder="Votre nom">
                                <span v-if="errors?.name" class="text-danger">
                                    {{ errors.name[0] }}
                                </span>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" v-model="form.email" class="form-control" id="email"
                                    placeholder="Votre email">
                                <span v-if="errors?.email" class="text-danger">
                                    {{ errors.email[0] }}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">Numero de telephone</label>
                                <input type="phone" v-model="form.phone" class="form-control" id="email"
                                    placeholder="Votre email">
                                <span v-if="errors?.phone" class="text-danger">
                                    {{ errors.phone[0] }}
                                </span>
                            </div>
                            <!-- <div class="mb-3">
                                <label for="subject" class="form-label">Sujet</label>
                                <input type="text" v-model="form.name" class="form-control" id="subject" placeholder="Objet du message">
                                <span v-if="errors?.email" class="text-danger">
                                    {{ errors.email[0] }}
                                </span>
                            </div> -->
                            <div class="mb-3">
                                <label for="message" class="form-label">Message</label>
                                <textarea v-model="form.message" class="form-control" id="message" rows="4"
                                    placeholder="Votre message"></textarea>
                                <span v-if="errors?.message" class="text-danger">
                                    {{ errors.message[0] }}
                                </span>
                            </div>
                            <button type="submit" class="btn btn-success">Envoyer le message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Informations de contact -->
        <section class="contact-info text-center  bgcolor1">
            <div class="container">
                <h2 class="text-white">Nos coordonnées</h2>
                <div class="row text">
                    <div class="col-md-4">
                        <h4>Adresse</h4>
                        <p>Apres l'hopital generale, Kumba, Up-Station</p>
                    </div>
                    <div class="col-md-4">
                        <h4>Téléphone</h4>
                        <p>+237 653 96 38 75</p>
                    </div>
                    <div class="col-md-4">
                        <h4>Email</h4>
                        <p>contact@eleite.com</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Carte Google Maps -->
        <section class="map-section text-center">
            <div class="container">
                <h1 class="text-white fw-bold pb-3">Trouvez-nous sur la carte</h1>
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508396!2d144.95373531531832!3d-37.81627997975184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57762e07a5959e9!2sEnvato!5e0!3m2!1sen!2sau!4v1532585049810"
                                width="100%" height="400" style="border:0;" allowfullscreen loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Liens réseaux sociaux -->
        <!-- <section class="text-center py-4 bg-dark-green text-white">
            <div class="container">
                <h4>Suivez-nous</h4>
                <div class="d-flex justify-content-center">
                    <a href="#" class="text-white mx-3"><i class="bi bi-facebook"></i> Facebook</a>
                    <a href="#" class="text-white mx-3"><i class="bi bi-twitter"></i> Twitter</a>
                    <a href="#" class="text-white mx-3"><i class="bi bi-instagram"></i> Instagram</a>
                    <a href="#" class="text-white mx-3"><i class="bi bi-linkedin"></i> LinkedIn</a>
                </div>
            </div>
        </section> -->

        <!-- footer -->

        <FooterComponent></FooterComponent>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/authStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from '@/plugins/axios';


const authStore = useAuthStore();
const router = useRouter();
const errors = ref({});
const form = ref({
    email: '',
    name: '',
    phone: '',
    message: ''
});

const Envoyer = async () => {
    errors.value = {};
    try {
        await axios.post(`/contacts`, form.value);
        toast.success("Message envoyé avec succès");
    } catch (error) {
        toast.error("échec de l'envoi");

        if (error.response?.status === 422) {
            errors.value = error.response.data.errors; // 🔥 Stocker les erreurs de validation
        }

    }
};


</script>


<style scoped>
/* Couleurs principales */
.bg-dark-green {
    background-color: #004d00;
}

.text-green {
    color: #28a745;
}

/* Section Héro */
.hero-section {

    color: white;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-section h1 {
    font-size: 3rem;
    font-weight: bold;
}

/* Formulaire de contact */
.contact-form-section {
    padding: 60px 0;
}

.contact-form h2 {
    color: #004d00;
    margin-bottom: 30px;
}

/* Informations de contact */
.contact-info {
    padding: 40px 0;
}

.contact-info h4 {
    color: #ffffff;
}

/* Carte Google Maps */
.map-section {
    padding: 60px 0;
}
</style>