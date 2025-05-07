<template>
    <div class="pagetitle">
        <h1 class="text-white">ADMIN Dashboard</h1>
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



                    <!-- Revenue Card -->
                    <div class="col-xxl-3 col-md-3">
                        <div class="card info-card revenue-card">


                            <div class="card-body">
                                <h5 class="card-title">Formations vendues</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-currency-dollar"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>
                                            <span v-if="authStore.statadmin.totalCoursesSold">
                                                {{ authStore.statadmin.totalCoursesSold }}
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </h6>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div><!-- End Revenue Card -->


                    <div class="col-xxl-3 col-md-3">

                        <div class="card info-card customers-card">


                            <div class="card-body">
                                <h5 class="card-title">Nbr D'utilisateurs</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-people"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>
                                            <span v-if="authStore.statadmin.totalUsers">
                                                {{ authStore.statadmin.totalUsers }}
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </h6>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div><!-- End Customers Card -->

                    <div class="col-xxl-3 col-md-3">

                        <div class="card info-card customers-card">


                            <div class="card-body">
                                <h5 class="card-title">Nbr De formateurs</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-people"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>
                                            <span
                                                v-if="authStore.statadmin.instructorUsers && authStore.statadmin.instructorUsers.length > 0">
                                                {{ authStore.statadmin.instructorUsers.length }}
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </h6>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div><!-- End Customers Card -->


                    <div class="col-xxl-3 col-md-3">

                        <div class="card info-card customers-card">


                            <div class="card-body">
                                <h5 class="card-title">Nbr D'etudiant</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-people"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>
                                            <span
                                                v-if="authStore.statadmin.usersWithCourses && authStore.statadmin.usersWithCourses.length > 0">
                                                {{ authStore.statadmin.usersWithCourses.length }}
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </h6>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div><!-- End Customers Card -->


                    <div class="col-xxl-6 col-md-6">

                        <div class="card info-card customers-card">


                            <div class="card-body" style="word-wrap: break-word;white-space: normal;">
                                <h5 class="card-title">Solde</h5>

                                <div class="d-flex flex-wrap align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cash"></i>
                                    </div>
                                    <div class="ps-3  ">
                                        <h6>
                                            <span
                                                v-if="authStore.statadmin.adminUsers && authStore.statadmin.adminUsers.solde">
                                                {{ Number(authStore.statadmin.adminUsers.solde).toFixed(2) }}
                                            </span>
                                            <span v-else>
                                                0
                                            </span>
                                        </h6>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div><!-- End Customers Card -->







                    <!-- Right side columns -->
                    <div class=" d-md-flex gap-2 ">

                        <!-- Budget Report -->
                        <div class="card col-md-6 border p-3">
                            <h3 class="text-center fw-bold">Ventes Mensuelles</h3>
                            <div class=" card card-course-some shadow-lg border ">
                                <CharBarSale />
                            </div>
                        </div><!-- End Budget Report -->
                        <!-- Budget Report -->
                        <div class="card col-md-6 border p-3">
                            <h3 class="text-center fw-bold">Ventes mensuelles</h3>
                            <div class=" card card-course-some shadow-lg border ">
                                <SaleLinearChart />
                            </div>

                        </div>
                        <!-- End Budget Report -->





                    </div><!-- End Right side columns -->












                    <div class="row ">
                        <div class="col-12 ">
                            <div class="card " style="background-color: #191c24; color: #6c7293;">
                                <div class="card-body" id="order-status">
                                    <h4 class="card-title">Derniers utilisateurs</h4>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>

                                                    <th>First Name </th>
                                                    <th> Last Name </th>
                                                    <th> email </th>
                                                    <th> genre </th>
                                                    <th> Tel </th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                <template
                                                    v-if="authStore.statadmin.allUsers && authStore.statadmin.allUsers.length > 0">
                                                    <tr v-for="user in authStore.statadmin.allUsers.slice(0, 10)">

                                                        <td class="">
                                                            <div class="w-full d-flex gap-2">
                                                                <img :src="$baseUrl + user.profile" alt="image" />
                                                                <span class="pl-2">{{ user.firstName }}</span>
                                                            </div>
                                                        </td>
                                                        <td> {{ user.lastName }} </td>
                                                        <td> {{ user.email }} </td>
                                                        <td> {{ user.gender }}</td>
                                                        <td>{{ user.phone }} </td>

                                                    </tr>

                                                </template>




                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div><!-- End Left side columns -->



        </div>
    </section>


</template>


<script setup>



import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth/authStore';
import CharBarSale from '@/components/admin/CharBarSale.vue';
import SaleLinearChart from '@/components/admin/SaleLinearChart.vue';


const authStore = useAuthStore();




onMounted(async () => {

    await authStore.statAdmin();



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
