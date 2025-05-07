<template>
    <!-- ======= Sidebar ======= -->
    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item">
                <router-link class="nav-link " to="/admin">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li><!-- End Dashboard Nav -->

            <li class="nav-item">
                <router-link class="nav-link " to="/users-dashboard/profile">
                    <i class="bi bi-grid"></i>
                    <span>Profil</span>
                </router-link>
            </li><!-- End profil Nav -->




            <!-- End cours Nav -->

            <!-- =============================================================================================================== -->
            <!-- sectors -->

            <!--   courses -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Utilisateur" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Utilisateur</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Utilisateur" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-users">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-user">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End courses  -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Contacts" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Contacts</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Contacts" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-contacts">
                            <i class="bi bi-circle"></i><span>Voir les contacts</span>
                        </router-link>
                    </li>
                </ul>
            </li><!-- End courses  -->
            <!--   courses -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Ventes" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Ventes</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Ventes" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-orders">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>



                </ul>
            </li><!-- End courses  -->

            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Secteurs" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Secteurs</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Secteurs" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-sectors">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-sector">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End Sectors  -->
            <!-- =============================================================================================================== -->
            <!-- sous-secteurs -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#SubSecteurs" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Sous-Secteurs</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="SubSecteurs" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-subsectors">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-subsector">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End SubSectors  -->
            <!-- sous-secteurs -->



            <!-- categories -->


            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#cat" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Categories</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="cat" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-categories">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-category">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End category  -->

            <!-- ============================================================================================================== -->
            <!-- =============================================================================================================== -->

            <!-- language -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#lang" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Languages</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="lang" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-languages">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-language">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End languages  -->

            <!-- instructor -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#instr" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Instructeur</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="instr" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-instructors">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-instructor">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End instructor  -->


            <!--   specialites -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#specialties" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Specialites</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="specialties" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-specialties">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-specialty">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>



            </li><!-- End specialites  -->





            <!--   courses -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Cours" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Cours</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Cours" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-courses">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-course">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End courses  -->


            <!--   prerequis -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#prerequisites" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Prerequis</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="prerequisites" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-prerequisites">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-prerequisite">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End courses  -->


            <!--   prerequis -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Chapitres" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Chapitres</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Chapitres" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-chapters">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-chapter">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End   -->


            <!--   recommandation -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#recommandation" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Recommandations</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="recommandation" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-recommandations">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-recommandation">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End recommandation  -->




            <!--   resource -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#Ressources" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Ressources</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="Ressources" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-resources">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-resource">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End resource  -->



            <!--   videos -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#videos" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Videos</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="videos" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link to="/admin-videos">
                            <i class="bi bi-circle"></i><span>List</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/admin-create-video">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </router-link>
                    </li>

                </ul>
            </li><!-- End videos  -->



            <!-- <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#fav-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Favorites</span><i
                        class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="fav-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>Favorites Courses</span>
                        </a>
                    </li>

                    <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>Favorites Instructors</span>
                        </a>
                    </li>

                </ul>
            </li>
             -->

            <!-- End favorite  -->

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

            <!-- <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#cours-nav" data-bs-toggle="collapse" href="#">
                    <i class="bi bi-menu-button-wide"></i><span>Cours</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="cours-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>List</span>
                        </a>
                    </li>

                    <li>
                        <a href="components-alerts.html">
                            <i class="bi bi-circle"></i><span>Create</span>
                        </a>
                    </li>

                </ul>
            </li> -->

            <!-- End cours Nav -->

            <!-- =============================================================================================================== -->






            <!-- <li class="nav-heading">Pages</li> -->



        </ul>

    </aside><!-- End Sidebar-->
</template>

<script setup>


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