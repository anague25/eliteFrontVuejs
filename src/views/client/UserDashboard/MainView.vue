<template>
    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-white">Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item text-white"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active text-success">Dashboard</li>
                </ol>
            </nav>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">

                <!-- Left side columns -->
                <div class="col-lg-12">
                    <div class="row">

                        <!-- Sales Card -->
                        <div class="col-xxl-3 col-md-3">
                            <div class="card border info-card sales-card">



                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 15px;">Vos cours favoris</h5>

                                    <div class="d-flex align-items-center">
                                        <div
                                            class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <img src="/images/pngs/icons8-favorite-48.png" alt="">
                                        </div>
                                        <div class="ps-3">
                                            <h6>{{ FavoriteStore.favorites.length }}</h6>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div><!-- End Sales Card -->

                      

                        <!-- Customers Card -->
                        <div class="col-xxl-3 col-md-3">

                            <div class="card border info-card customers-card">


                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 15px;">Cours achetés</h5>

                                    <div class="d-flex align-items-center">
                                        <div
                                            class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-people"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6>{{ countBuyCoures }}</h6>


                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div><!-- End Customers Card -->
                        <!-- Customers Card -->
                        <div class="col-xxl-3 col-md-3 ">

                            <div class="card border info-card customers-card">


                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 15px;">Dépenses</h5>

                                    <div class="d-flex align-items-center">
                                        <div
                                            class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-cash"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6 class="fs-5">{{ totalDepense }} XAF</h6>


                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div><!-- End Customers Card -->



                        <!-- Right side columns -->
                        <div class=" d-md-flex gap-2 ">




                            <!-- Budget Report -->
                            <div class="card col-md-6 border p-3">
                                <h3>Quelques cours les plus recommandés</h3>
                                <div class="d-flex flex-wrap" v-if="recommandationStore.courses.length > 0">
                                    <div v-for="(course, index) in recommandationStore.courses.slice(0, 5)"
                                        :key="course.id" class="card card-course-some shadow-lg border me-2"
                                        style="position: relative; width: 110px;">
                                        <span style="position: absolute; top: 0px; right: 0px; cursor: pointer;"
                                            class="rounded-circle bg-white ">
                                            <Favorite :course="course" style="width: 25px;" />
                                        </span>
                                        <!-- Lien vers le cours -->
                                        <router-link :to="'/home-course/' + course.id" class="text-dark">
                                            <img :src="$baseUrl + course.image" height="65"
                                                class="card-img-top img-cat">
                                            <div class="card-body white">
                                                <h5 class="card-title m-0 p-0" style="font-size: 13px;">{{
                                                    $truncate(course.title, 4) }}
                                                </h5>
                                                <p class="card-text m-0 p-0" style="font-size: 13px;">{{
                                                    $truncate(course.description, 4) }}
                                                </p>
                                                <p class="card-text m-0 p-0 text-success" style="font-size: 13px;">
                                                    {{ $truncate(course.price, 4) }} XAF
                                                </p>
                                            </div>
                                        </router-link>

                                        <!-- Icône panier en dehors du lien-->
                                        <CartButton :course="course" style="width: 20px;" />
                                    </div>
                                </div>

                            </div><!-- End Budget Report -->


                            <!-- Budget Report -->
                            <div class="card col-md-6 border p-3">
                                <h3>Quelques cours les plus aimés</h3>
                                <div class="d-flex flex-wrap" v-if="FavoriteStore.mostfavorites.length > 0">
                                    <div v-for="(course, index) in FavoriteStore.mostfavorites.slice(0, 5)"
                                        :key="course.id" class="card card-course-some shadow-lg border me-2"
                                        style="position: relative; width: 110px;">
                                        <span style="position: absolute; top: 0px; right: 0px; cursor: pointer;"
                                            class="rounded-circle bg-white ">
                                            <Favorite :course="course" style="width: 25px;" />
                                        </span>
                                        <!-- Lien vers le cours -->
                                        <router-link :to="'/home-course/' + course.id" class="text-dark">
                                            <img :src="$baseUrl + course.image" height="65"
                                                class="card-img-top img-cat">
                                            <div class="card-body white">
                                                <h5 class="card-title m-0 p-0" style="font-size: 13px;">{{
                                                    $truncate(course.title, 4) }}
                                                </h5>
                                                <p class="card-text m-0 p-0" style="font-size: 13px;">{{
                                                    $truncate(course.description, 4) }}
                                                </p>
                                                <p class="card-text m-0 p-0 text-success" style="font-size: 13px;">
                                                    {{ $truncate(course.price, 4) }} XAF
                                                </p>
                                            </div>
                                        </router-link>

                                        <!-- Icône panier en dehors du lien-->
                                        <CartButton :course="course" style="width: 20px;" />
                                    </div>
                                </div>

                            </div><!-- End Budget Report -->




                        </div><!-- End Right side columns -->




                        <!-- Right side columns -->
                        <div class=" d-md-flex gap-2 ">

                            <!-- Budget Report -->
                            <div class="card col-md-6 border p-3">
                                <h3 class="text-center fw-bold">Vos Dépenses Mensuelles</h3>
                                <div class=" card card-course-some shadow-lg border ">
                                    <ChartBar />
                                </div>
                            </div><!-- End Budget Report -->
                            <!-- Budget Report -->
                            <div class="card col-md-6 border p-3">
                                <h3 class="text-center fw-bold">Vos Dépenses mensuelles</h3>
                                <div class=" card card-course-some shadow-lg border ">
                                    <LinearChart />
                                </div>

                            </div><!-- End Budget Report -->





                        </div><!-- End Right side columns -->



                        <!-- Right side columns -->
                        <div v-if="instructorId" class=" d-md-flex gap-2 mt-5">

                            <!-- Budget Report -->
                            <div class="card col-md-12 border p-3 ">
                                <h3 class="text-center">Bienvenue Formateur : {{ authStore.getuser?.user?.firstName }}
                                    {{
                                        authStore.getuser?.user?.lastName }}</h3>


                            </div><!-- End Budget Report -->





                        </div><!-- End Right side columns -->







                        <!-- Left side columns -->
                        <div class="row" v-if="instructorId">
                            <!-- Sales Card -->
                            <div class="col-md-4">
                                <div class="card info-card revenue-card">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Solde</h5>
                                        <div class="d-flex flex-column align-items-center justify-content-center">
                                            <p class="bg-success rounded-circle d-flex align-items-center justify-content-center"
                                                style="width: 64px; height: 64px; font-size: 30px;">
                                                <i class="bi bi-currency-dollar"></i>
                                            </p> 
                                            <h6>{{ Number(authStore.getuser?.user?.solde).toFixed(2) }} XAF</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Revenue Card -->
                            <div class="col-md-4">
                                <div class="card info-card revenue-card">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Formations vendues</h5>
                                        <div class="d-flex flex-column align-items-center justify-content-center">
                                            <div
                                                class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i class="bi bi-journal-bookmark"></i>
                                            </div>
                                            <div class="mt-3 text-center">
                                                <h6>{{ orderStore.ordersInstructorCount?.total_courses_sold }}
                                                    formations</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Customers Card -->
                            <!-- <div class="col-md-4">
                                <div class="card info-card customers-card">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Suiveurs</h5>
                                        <div class="d-flex flex-column align-items-center justify-content-center">
                                            <div
                                                class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i class="bi bi-people"></i>
                                            </div>
                                            <div class=" text-center">
                                                <h6>1244</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

                            <!-- Your Rating Card -->
                            <div class="col-md-4">
                                <div class="card info-card customers-card">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Votre note</h5>
                                        <div class="d-flex flex-column align-items-center justify-content-center">
                                            <div
                                                class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i class="bi bi-star"></i>
                                            </div>
                                            <div class=" text-center mt-3">
                                                <h6>{{ averageRatingInstructor }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Right side columns -->
                        <div v-if="instructorId" class=" d-md-flex gap-2 ">

                            <!-- Budget Report -->
                            <div class="card col-md-6 border p-3">
                                <h3 class="text-center fw-bold">Vos Ventes Mensuelles</h3>
                                <div class=" card card-course-some shadow-lg border ">
                                    <SaleChart />
                                </div>
                            </div><!-- End Budget Report -->
                            <!-- Budget Report -->
                            <div class="card col-md-6 border p-3">
                                <h3 class="text-center fw-bold">Vos Ventes mensuelles</h3>
                                <div class=" card card-course-some shadow-lg border ">
                                    <SaleLinearChart />
                                </div>

                            </div><!-- End Budget Report -->





                        </div><!-- End Right side columns -->








                        <div class="row " v-if="instructorId">
                            <div class="col-12 ">
                                <div class="card " style="background-color: #191c24; color: #6c7293;">
                                    <div class="card-body" id="order-status">
                                        <h4 class="card-title fs-2 white">Les dernières ventes</h4>
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>

                                                        <th> Nom du client </th>
                                                        <th> Numméro de COM</th>
                                                        <th> Titre du cours </th>
                                                        <th> Prix </th>
                                                        <th> Mode de paiement </th>
                                                        <th> Date </th>
                                                        <th> Statut de la vente </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <template v-if="orderStore.ordersInstructor.length > 0"
                                                        v-for="order in orderStore.ordersInstructor.slice(0, 5)">

                                                        <tr v-for="course in order.orderCourses">
                                                            <td class="">
                                                                <div class="w-full d-flex gap-2">

                                                                    <span class="pl-2">{{ order.user.firstName }}</span>
                                                                </div>
                                                            </td>
                                                            <td> {{ $truncate(order.number, 20) }} </td>
                                                            <td> {{ $truncate(course.title, 20) }} </td>
                                                            <td> {{ course.price }} </td>
                                                            <td> {{ order.payment_method }}</td>
                                                            <td>{{ order.created_at }} </td>
                                                            <td>
                                                                <div class="badge badge-outline-success">{{ order.state
                                                                }}
                                                                </div>
                                                            </td>

                                                        </tr>


                                                    </template>
                                                    <template v-else>

                                                        <td colspan="7" class="white fw-bold text-center"> PAS DE VENTE
                                                        </td>

                                                    </template>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Top Selling -->
                        <!-- <div class="col-12">
                            <div class="card top-selling overflow-auto " id="bg-card-stat">

                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i
                                            class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body pb-0 ">
                                    <h5 class="card-title">Top Selling <span>| Today</span></h5>

                                    <table class="table table-borderless ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Preview</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Sold</th>
                                                <th scope="col">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row" class=""><a href="#"><img
                                                            src="/assets/img/product-1.jpg" alt=""></a></th>
                                                <td><a href="#" class="text-primary fw-bold">Ut inventore
                                                        ipsa
                                                        voluptas
                                                        nulla</a></td>
                                                <td>$64</td>
                                                <td class="fw-bold">124</td>
                                                <td>$5,828</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src="/assets/img/product-2.jpg"
                                                            alt=""></a></th>
                                                <td><a href="#" class="text-primary fw-bold">Exercitationem
                                                        similique
                                                        doloremque</a></td>
                                                <td>$46</td>
                                                <td class="fw-bold">98</td>
                                                <td>$4,508</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src="/assets/img/product-3.jpg"
                                                            alt=""></a></th>
                                                <td><a href="#" class="text-primary fw-bold">Doloribus nisi
                                                        exercitationem</a></td>
                                                <td>$59</td>
                                                <td class="fw-bold">74</td>
                                                <td>$4,366</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src="/assets/img/product-4.jpg"
                                                            alt=""></a></th>
                                                <td><a href="#" class="text-primary fw-bold">Officiis quaerat sint
                                                        rerum
                                                        error</a></td>
                                                <td>$32</td>
                                                <td class="fw-bold">63</td>
                                                <td>$2,016</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><a href="#"><img src="/assets/img/product-5.jpg"
                                                            alt=""></a></th>
                                                <td><a href="#" class="text-primary fw-bold">Sit unde debitis
                                                        delectus
                                                        repellendus</a></td>
                                                <td>$79</td>
                                                <td class="fw-bold">41</td>
                                                <td>$3,239</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div> -->
                        <!-- End Top Selling -->

                    </div>
                </div><!-- End Left side columns -->



            </div>
        </section>

    </main><!-- End #main -->
</template>


<script setup>

import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useFavoriteStore } from '@/stores/favorites/useFavoriteStore';
import CartButton from "@/components/client/frontend/cart/CartButton.vue";
import { useAuthStore } from '@/stores/auth/authStore';
import { useRecommandationStore } from '@/stores/recommandations/useRecommandationStore';
import Favorite from '@/components/client/user-dashboard/Favorite.vue'
import ChartBar from '@/components/client/user-dashboard/ChartBar.vue'
import LinearChart from '@/components/client/user-dashboard/LinearChart.vue'
import SaleLinearChart from '@/components/client/user-dashboard/SaleLinearChart.vue'
import SaleChart from '@/components/client/user-dashboard/SaleChart.vue'
import { useOrderStore } from '@/stores/orders/useOrderStore'
import { useReviewsStore } from '@/stores/reviews/useReviewStore'


const recommandationStore = useRecommandationStore();
const authStore = useAuthStore();
const reviewsStore = useReviewsStore();
const orderStore = useOrderStore();
const FavoriteStore = useFavoriteStore();
const countBuyCoures = ref(0);
const instructorId = ref(null);
const instructorType = 'App\\Models\\Instructor';
const page = 1;


const totalDepense = computed(() => {
    return authStore.getuser?.user?.learning_courses.reduce((acc, cours) => {
        console.log(cours);
        return acc + (Number(cours.price) || 0); // s'assure que le prix existe
    }, 0);
});


const averageRatingInstructor = computed(() => {
    if (reviewsStore.reviews.length === 0) return 0;
    const totalWeight = reviewsStore.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalWeight / reviewsStore.reviews.length).toFixed(1); // Arrondi à 1 décimale
});



onMounted(async () => {
    await FavoriteStore.fetchfavorites();
    await FavoriteStore.mostFavorites();
    await authStore.getUser();
    await recommandationStore.getCoursesByRecommendations();
    await orderStore.getOrdersInstructor();
    await orderStore.orderInstructorCount();


    countBuyCoures.value = authStore.getuser?.user?.learning_courses?.length;
    instructorId.value = authStore.getuser?.user?.instructor?.id;


    reviewsStore.fetchReviews(instructorId.value, instructorType, page);



});



</script>


<style scoped>
/*Badge outlined variations*/
.badge-outline-primary {
    color: #0090e7;
    border: 1px solid #0090e7;
}

.badge-outline-secondary {
    color: #e4eaec;
    border: 1px solid #e4eaec;
}

.badge-outline-success {
    color: #00d25b;
    border: 1px solid #00d25b;
}

.badge-outline-info {
    color: #8f5fe8;
    border: 1px solid #8f5fe8;
}

.badge-outline-warning {
    color: #ffab00;
    border: 1px solid #ffab00;
}

.badge-outline-danger {
    color: #fc424a;
    border: 1px solid #fc424a;
}

.badge-outline-light {
    color: #ffffff;
    border: 1px solid #ffffff;
}

.badge-outline-dark {
    color: #0d0d0d;
    border: 1px solid #0d0d0d;
}


#order-status table th {
    background-color: #191c24;
    color: #6c7293;
}

#order-status table td {
    background-color: #191c24;
    color: #6c7293;
    vertical-align: middle;
}

#order-status table td img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

#order-status table td {
    font-size: 0.875rem;
}


#main {
    background-color: #000000;
}

.card {
    background-color: #191c24;
    color: #ffff;
}

.card .card-body h6 {
    color: #ffff;
}



.top-selling tr th {
    background-color: #191c24;
    color: #ffff;

}

.top-selling tr td {
    background-color: #191c24;
    color: #ffff;
}



.top-selling tr td a {
    color: #ffff !important;
}
</style>