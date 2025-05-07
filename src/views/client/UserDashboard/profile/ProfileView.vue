<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><router-link to="/users-dashboard">Dashboard</router-link>
                    </li>
                    <li class="breadcrumb-item active text-success">Profil</li>
                </ol>
            </nav>
        </div>
        <div class="bgcolor2 row">





            <section v-if="authStore.getuser?.user" class="section profile  col-10">
                <div class="row">
                    <div class="col-xl-4 ">

                        <div class="card bgcolor1 text">
                            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                <img :src="$baseUrl + authStore.getuser.user.profile" alt="Profile"
                                    class="rounded-circle">
                                <h2 class="text-white">{{ authStore.getuser.user.lastName }}</h2>
                                <h3 v-if="authStore.getuser.user?.instructor && authStore.getuser.user?.instructor?.bio">{{ authStore.getuser.user.instructor.bio }}</h3>
                                <!-- <div class="social-links mt-2">
                                        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                                        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                                        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                                        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                                    </div> -->
                            </div>
                        </div>

                    </div>

                    <div class="col-xl-8 ">

                        <div class="card bgcolor1 text">
                            <div class="card-body pt-3">
                                <!-- Bordered Tabs -->
                                <ul class="nav nav-tabs nav-tabs-bordered" role="tablist">

                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" data-bs-toggle="tab"
                                            data-bs-target="#profile-overview" aria-selected="true"
                                            role="tab">Overview</button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit"
                                            aria-selected="false" role="tab" tabindex="-1">Modifier le profil</button>
                                    </li>

                                    <!-- <li class="nav-item" role="presentation">
                                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings"
                                            aria-selected="false" role="tab" tabindex="-1">Settings</button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" data-bs-toggle="tab"
                                            data-bs-target="#profile-change-password" aria-selected="false" role="tab"
                                            tabindex="-1">Change Password</button>
                                    </li> -->

                                </ul>
                                <div class="tab-content pt-2">

                                    <div class="tab-pane fade profile-overview active show" id="profile-overview"
                                        role="tabpanel">
                                        <h5 v-if="authStore.getuser.user?.instructor && authStore.getuser.user?.instructor?.id" class="card-title white">A Propos</h5>
                                        <p v-if="authStore.getuser.user?.instructor && authStore.getuser.user?.instructor?.id" class="small fst-italic text">{{
                                            authStore.getuser.user.instructor.experience }}</p>

                                        <h5 class="card-title white">Details du profil</h5>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 label  white">Nom complet</div>
                                            <div class="col-lg-9 col-md-8">{{ authStore.getuser.user.firstName }} {{
                                                authStore.getuser.user.lastName }}</div>
                                        </div>

                                        <div v-if="authStore.getuser.user?.instructor && authStore.getuser.user?.instructor?.id" class="row">
                                            <div class="col-lg-3 col-md-4 label white">Spécialités</div>
                                            <div class="col-lg-9 col-md-8"><span
                                                    v-for="spe in authStore.getuser.user.instructor.specialties">{{
                                                        spe.name }}, </span></div>
                                        </div>

                                        <!-- <div class="row">
                                            <div class="col-lg-3 col-md-4 label white">Job</div>
                                            <div class="col-lg-9 col-md-8">Web Designer</div>
                                        </div> -->

                                        <div v-if="authStore.getuser.user?.instructor && authStore.getuser.user?.instructor?.id" class="row">
                                            <div class="col-lg-3 col-md-4 label white">Pays</div>
                                            <div class="col-lg-9 col-md-8">{{ authStore.getuser.user.instructor.country
                                            }} </div>
                                        </div>

                                        <div v-if="authStore.getuser.user?.instructor && authStore.getuser.user?.instructor?.id" class="row">
                                            <div class="col-lg-3 col-md-4 label white">Adresse</div>
                                            <div class="col-lg-9 col-md-8">{{
                                                authStore.getuser.user.instructor.address }}
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 label white">Tel</div>
                                            <div class="col-lg-9 col-md-8">{{ authStore.getuser.user.phone }} </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 label white">Email</div>
                                            <div class="col-lg-9 col-md-8">{{ authStore.getuser.user.email }}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3 col-md-4 label white">Email</div>
                                            <div class="col-lg-9 col-md-8">{{ authStore.getuser.user.gender }}</div>
                                        </div>

                                    </div>

                                    <div class="tab-pane fade profile-edit pt-3" id="profile-edit" role="tabpanel">

                                        <!-- Profile Edit Form -->
                                        <form @submit.prevent="submit" class="text">
                                            <div class="row mb-3">
                                                <label for="profileImage"
                                                    class="col-md-4 col-lg-3 col-form-label white">Profil
                                                    </label>
                                                <div class="col-md-8 col-lg-9">
                                                    <img :src="$baseUrl + authStore.getuser.user.profile" alt="Profile">
                                                    <div class="pt-2">
                                                        <div class="mb-3">
                                                            <input class="form-control" type="file"
                                                                @change="handleFileUpload" id="file" />
                                                        </div>
                                                        <span v-if="authStore.errors?.profile" class="error-text">
                                                            {{ authStore.errors.profile[0] }}
                                                        </span>
                                                        <div v-if="url" class="mt-1 mb-2">
                                                            <img class="img" :src="url" alt="" width="60" height="60" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="full"
                                                    class="col-md-4 col-lg-3 col-form-label white">Prenom</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input v-model="form.firstName" type="text" class="form-control"
                                                        id="full" value="Kevin Anderson">
                                                    <span v-if="authStore.errors?.firstName" class="error-text">
                                                        {{ authStore.errors.firstName[0] }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label for="Name"
                                                    class="col-md-4 col-lg-3 col-form-label white">Nom</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input v-model="form.lastName" type="text" class="form-control"
                                                        id="Name" value="Kevin Anderson">
                                                    <span v-if="authStore.errors?.lastName" class="error-text">
                                                        {{ authStore.errors.lastName[0] }}
                                                    </span>
                                                </div>
                                            </div>



                                            <!-- <div class="row mb-3">
                                                <label for="about"
                                                    class="col-md-4 col-lg-3 col-form-label">About</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <textarea name="about" class="form-control" id="about"
                                                        style="height: 100px">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
                                                </div>
                                            </div> -->

                                            <!-- <div class="row mb-3">
                                                <label for="company"
                                                    class="col-md-4 col-lg-3 col-form-label">Company</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="company" type="text" class="form-control" id="company"
                                                        value="Lueilwitz, Wisoky and Leuschke">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="Job" class="col-md-4 col-lg-3 col-form-label">Job</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="job" type="text" class="form-control" id="Job"
                                                        value="Web Designer">
                                                </div>
                                            </div> -->

                                            <!-- <div class="row mb-3">
                                                <label for="Country"
                                                    class="col-md-4 col-lg-3 col-form-label">Country</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="country" type="text" class="form-control" id="Country"
                                                        value="USA">
                                                </div>
                                            </div> -->



                                            <div class="row mb-3">
                                                <label for="Phone" class="col-md-4 col-lg-3 col-form-label white">Numero
                                                    de
                                                    telephone</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input v-model="form.phone" type="text" class="form-control"
                                                        id="Phone" value="653 95 78 24">
                                                    <span v-if="authStore.errors?.phone" class="error-text">
                                                        {{ authStore.errors.phone[0] }}
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="row mb-3">
                                                <label for="Email"
                                                    class="col-md-4 col-lg-3 col-form-label white">Email</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input v-model="form.email" type="email" class="form-control"
                                                        id="Email" value="anderson@example.com">
                                                    <span v-if="authStore.errors?.email" class="error-text">
                                                        {{ authStore.errors.email[0] }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="genre"
                                                    class="col-md-4 col-lg-3 col-form-label white">Genre<span
                                                        class="text-white fw-bold">(Choisissez votre
                                                        genre)</span></label>
                                                <div class="col-md-8 col-lg-9">
                                                    <select v-model="form.gender" class="form-control" id="genre">
                                                        <option value="" selected>Choisissez votre genre</option>
                                                        <option value="M">Homme</option>
                                                        <option value="W">Femme</option>
                                                    </select>
                                                    <span v-if="authStore.errors?.gender" class="error-text">
                                                        {{ authStore.errors.gender[0] }}
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="row mb-3">
                                                <label for="password" class="col-md-4 col-lg-3 col-form-label white">Mot
                                                    de
                                                    passe</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input v-model="form.password" autocomplete="off" type="password"
                                                        class="form-control" id="password"
                                                        placeholder="Votre mot de passe">
                                                    <span v-if="authStore.errors?.password" class="error-text">
                                                        {{ authStore.errors.password[0] }}
                                                    </span>

                                                </div>

                                            </div>

                                            <div class="row mb-3">
                                                <label for="confirm-password"
                                                    class="col-md-4 col-lg-3 col-form-label white">Confirmer le mot de
                                                    passe</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input autocomplete="off" v-model="form.password_confirmation"
                                                        type="password" class="form-control" id="confirm-password"
                                                        placeholder="Confirmez votre mot de passe">
                                                    <span v-if="authStore.errors?.password_confirmation"
                                                        class="error-text">
                                                        {{ authStore.errors.password_confirmation[0] }}
                                                    </span>
                                                </div>
                                            </div>





                                            <!-- <div class="row mb-3">
                                                <label for="Twitter" class="col-md-4 col-lg-3 col-form-label">Twitter
                                                    Profile</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="twitter" type="text" class="form-control" id="Twitter"
                                                        value="https://twitter.com/#">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="Facebook" class="col-md-4 col-lg-3 col-form-label">Facebook
                                                    Profile</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="facebook" type="text" class="form-control"
                                                        id="Facebook" value="https://facebook.com/#">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="Instagram"
                                                    class="col-md-4 col-lg-3 col-form-label">Instagram
                                                    Profile</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="instagram" type="text" class="form-control"
                                                        id="Instagram" value="https://instagram.com/#">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="Linkedin" class="col-md-4 col-lg-3 col-form-label">Linkedin
                                                    Profile</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="linkedin" type="text" class="form-control"
                                                        id="Linkedin" value="https://linkedin.com/#">
                                                </div>
                                            </div> -->

                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary">Modifier
                                                </button>
                                            </div>
                                        </form><!-- End Profile Edit Form -->

                                    </div>

                                    <!-- Settings Form -->
                                    <!-- <div class="tab-pane fade pt-3" id="profile-settings" role="tabpanel">

                                        <form>

                                            <div class="row mb-3">
                                                <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Email
                                                    Notifications</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="changesMade"
                                                            checked="">
                                                        <label class="form-check-label" for="changesMade">
                                                            Changes made to your account
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="newProducts"
                                                            checked="">
                                                        <label class="form-check-label" for="newProducts">
                                                            Information on new products and services
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" id="proOffers">
                                                        <label class="form-check-label" for="proOffers">
                                                            Marketing and promo offers
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="securityNotify" checked="" disabled="">
                                                        <label class="form-check-label" for="securityNotify">
                                                            Security alerts
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary">Save
                                                    Changes</button>
                                            </div>
                                            </form>
                                            
                                            </div> -->
                                    <!-- End settings Form -->



                                    <!-- password -->

                                    <!-- <div class="tab-pane fade pt-3" id="profile-change-password" role="tabpanel">
                                       
                                        <form>

                                            <div class="row mb-3">
                                                <label for="currentPassword"
                                                    class="col-md-4 col-lg-3 col-form-label">Current
                                                    Password</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="password" type="password" class="form-control"
                                                        id="currentPassword">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New
                                                    Password</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="newpassword" type="password" class="form-control"
                                                        id="newPassword">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <label for="renewPassword"
                                                    class="col-md-4 col-lg-3 col-form-label">Re-enter New
                                                    Password</label>
                                                <div class="col-md-8 col-lg-9">
                                                    <input name="renewpassword" type="password" class="form-control"
                                                        id="renewPassword">
                                                </div>
                                            </div>

                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary">Change
                                                    Password</button>
                                            </div>
                                        </form>
                                    </div> -->

                                </div><!-- End Bordered Tabs -->

                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </div>
    </main>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useAuthStore } from '@/stores/auth/authStore';
import { useRouter } from 'vue-router';



const authStore = useAuthStore();

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    password_confirmation: '',
    profile: null
});

const url = ref('');
const router = useRouter();


function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        url.value = URL.createObjectURL(file); // Prévisualisation sans modifier le profil
        form.value.profile = file;
    }
}



const submit = async () => {
    try {

        const formData = new FormData();
        if (!(form.value.profile instanceof File)) {
            delete form.value.profile;
        }
        if (!form.value.password) {
            delete form.value.password;
        }
        if (!form.value.password) {
            delete form.value.password_confirmation;
        }
        Object.entries(form.value).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await authStore.Profile(formData);
        toast.success('profile modifie avec succes');
    } catch (error) {
        if (error.response?.data?.message) {
            toast.error(error.response?.data?.message || "Erreur lors de la modification !");
        } else {
            console.error("erreurs d'inscription : ", error);
        }
    }
};





onMounted(async () => {
    try {
        authStore.clearErrors();
        await authStore.getUser();

        if (authStore.getuser?.user?.firstName) {
            form.value.firstName = authStore.getuser.user.firstName;
            form.value.lastName = authStore.getuser.user.lastName;
            form.value.email = authStore.getuser.user.email;
            form.value.phone = authStore.getuser.user.phone;
            form.value.gender = authStore.getuser.user.gender;
        }

    } catch (error) {
        toast.error("echec de la recuperation des elements");
    }
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
