<template>
    <!-- ======= Sidebar ======= -->
    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item">
                <router-link class="nav-link " to="/users-dashboard">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li><!-- End Dashboard Nav -->

            <li class="nav-item">
                <router-link class="nav-link collapsed" to="/users-dashboard/profile">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                </router-link>
            </li><!-- End Profile Page Nav -->




            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#instructeur" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Instructeur</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="instructeur" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li v-if="!instructorStore.getinstructor?.id">
                        <router-link to="/users-dashboard/create-instructor">
                            <i class="bi bi-circle"></i><span>Devenir instructeur</span>
                        </router-link>
                    </li>
                    <li v-if="instructorStore.getinstructor?.id">
                        <router-link to="/users-dashboard/profile-instructor">
                            <i class="bi bi-circle"></i><span>Details</span>
                        </router-link>
                    </li>


                </ul>
            </li>
            <li v-if="instructorStore.getinstructor?.id" class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Retrait" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Retrait</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Retrait" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li v-if="instructorStore.getinstructor.id">
                        <router-link to="/users-dashboard/withdraw">
                            <i class="bi bi-circle"></i><span>Retirer vos gains</span>
                        </router-link>
                    </li>



                </ul>
            </li>





            <li class="nav-item" v-if="instructorStore.getinstructor?.id">
                <a class="nav-link collapsed" data-bs-target="#Cours" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Cours</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Cours" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                    <li>
                        <router-link to="/users-dashboard/courses">
                            <i class="bi bi-circle"></i><span>Vos formations</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/users-dashboard/create-course">
                            <i class="bi bi-circle"></i><span>Creer une formation </span>
                        </router-link>
                    </li>

                </ul>
            </li>




            <li class="nav-item" v-if="instructorStore.getinstructor?.id">
                <a class="nav-link collapsed" data-bs-target="#chapitres" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Chapitres</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="chapitres" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                    <li>
                        <router-link to="/users-dashboard/chapters">
                            <i class="bi bi-circle"></i><span>Vos Chapitres</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/users-dashboard/create-chapter">
                            <i class="bi bi-circle"></i><span>Creer un Chapitre </span>
                        </router-link>
                    </li>

                </ul>
            </li>

            <li class="nav-item" v-if="instructorStore.getinstructor?.id">
                <a class="nav-link collapsed" data-bs-target="#Videos" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Videos</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Videos" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                    <li>
                        <router-link to="/users-dashboard/videos">
                            <i class="bi bi-circle"></i><span>Vos Videos</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/users-dashboard/create-video">
                            <i class="bi bi-circle"></i><span>Creer des videos </span>
                        </router-link>
                    </li>

                </ul>
            </li>


            <li class="nav-item" v-if="instructorStore.getinstructor?.id">
                <a class="nav-link collapsed" data-bs-target="#Ressources" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Ressources(fiche d'exercice etc)</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Ressources" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                    <li>
                        <router-link to="/users-dashboard/resources">
                            <i class="bi bi-circle"></i><span>Vos Ressources</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/users-dashboard/create-resource">
                            <i class="bi bi-circle"></i><span>Creer des Ressources </span>
                        </router-link>
                    </li>

                </ul>
            </li>


            <li class="nav-item" v-if="instructorStore.getinstructor?.id">
                <a class="nav-link collapsed" data-bs-target="#Specialites" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Specialites</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Specialites" class="nav-content collapse " data-bs-parent="#sidebar-nav">

                    <li>
                        <router-link to="/users-dashboard/specialties">
                            <i class="bi bi-circle"></i><span>Vos specialites</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/users-dashboard/create-specialty">
                            <i class="bi bi-circle"></i><span>Creer des specialites </span>
                        </router-link>
                    </li>

                </ul>
            </li>






            <li class="nav-item">
                <router-link class="nav-link " to="/users-dashboard/buys-courses">
                    <i class="bi bi-grid"></i>
                    <span>Cours achetes</span>
                </router-link>
            </li><!-- End cours Nav -->



            <!-- ============================================================================================================== -->
            <!-- =============================================================================================================== -->

            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#fav-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Favorites</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="fav-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/users-dashboard/My-favorites-courses">
                            <i class="bi bi-circle"></i><span>Favorites Courses</span>
                        </router-link>
                    </li>

                    <!-- <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>Favorites Instructors</span>
                        </a>
                    </li> -->

                </ul>
            </li><!-- End favorite  -->

            <!-- ============================================================================================================== -->

            <!-- <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#trans-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Transactions</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="trans-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>Ventes</span>
                        </a>
                    </li>

                    <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>Retrait</span>
                        </a>
                    </li>

                </ul>
            </li> -->
            <!-- End transactions  -->

            <!-- ================================================================================================================ -->

            <li v-if="instructorStore.getinstructor?.id" class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#cours-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Vos Ventes</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="cours-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/users-dashboard/selling-courses">
                            <i class="bi bi-circle"></i><span>cours vendus</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End cours Nav -->

            <!-- =============================================================================================================== -->


            <!-- <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-journal-text"></i><span>Forms</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="forms-elements.html">
                            <i class="bi bi-circle"></i><span>Form Elements</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms-layouts.html">
                            <i class="bi bi-circle"></i><span>Form Layouts</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms-editors.html">
                            <i class="bi bi-circle"></i><span>Form Editors</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms-validation.html">
                            <i class="bi bi-circle"></i><span>Form Validation</span>
                        </a>
                    </li>
                </ul>
            </li> -->
            <!-- End Forms Nav -->



            <!-- <li class="nav-heading">Pages</li> -->

            <li class="nav-item">
                <router-link class="nav-link collapsed" to="/contact">
                    <i class="bi bi-envelope"></i>
                    <span>Contact</span>
                </router-link>
            </li><!-- End Contact Page Nav -->




        </ul>

    </aside><!-- End Sidebar-->
</template>

<script setup>
import { useInstructorStore } from '@/stores/instructors/useInstructorStore';
import { useAuthStore } from '@/stores/auth/authStore';
import { onMounted } from "vue";


const instructorStore = useInstructorStore();



onMounted(async () => {
    await instructorStore.getInstructor();

});

</script>

<style scoped>
.nav-item .nav-link span {
    color: #6c7293;
}

.nav-item .nav-link i {
    color: #ffffff;
}

.nav-item .nav-link:hover span {
    color: #ffffff;
}

#sidebar .nav-link:hover {
    background-color: #000000;

}

.sidebar-nav .nav-content a {
    color: #6c7293;
}

.sidebar-nav .nav-content a {
    color: #6c7293;
}

.sidebar-nav .nav-content a:hover {
    color: #ffffff;
}

/* .sidebar-nav .nav-content a:hover #sidebar .nav-link {
    color: #ffffff;
    background-color: #000000;
} */

.sidebar-nav .nav-item:has(.nav-content a:hover)>.nav-link {
    background-color: #000000;
}

.sidebar-nav .nav-item:has(.nav-content a:hover)>.nav-link span {
    color: #ffffff;
}


#sidebar {
    background-color: #191c24;
}



.sidebar-nav .nav-link {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #6c7293;
    transition: 0.3;
    background: #191c24;
    padding: 10px 15px;
    border-radius: 4px;
}

.sidebar-nav .nav-link i {
    font-size: 16px;
    margin-right: 10px;

}


.sidebar-nav .nav-link:hover i {
    color: #ffffff;
}

.sidebar-nav .nav-link .bi-chevron-down {
    margin-right: 0;
    transition: transform 0.2s ease-in-out;
}

.sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
    transform: rotate(180deg);
}

.sidebar-nav .nav-content {
    padding: 5px 0 0 0;
    margin: 0;
    list-style: none;
}

.sidebar-nav .nav-content a {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    transition: 0.3;
    padding: 10px 0 10px 40px;
    transition: 0.3s;
}

.sidebar-nav .nav-content a i {
    font-size: 6px;
    margin-right: 8px;
    line-height: 0;
    border-radius: 50%;
}
</style>