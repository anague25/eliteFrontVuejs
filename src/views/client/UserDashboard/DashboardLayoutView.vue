<template>
    <!-- dasboard layout pour le client -->
    <div class="layout">
        <!-- ======= Header ======= -->
        <header id="header" class="header fixed-top d-flex align-items-center">

            <div class="d-flex align-items-center justify-content-between">
                <router-link to="/" class="logo d-flex align-items-center">
                    <img src="/assets/img/logo.png" alt="">
                    <span class="d-none d-lg-block text-white">Novademia</span>
                </router-link>
                <i class="bi bi-list toggle-sidebar-btn text-white"></i>
            </div><!-- End Logo -->

            <!-- <div class="search-bar ">
                <form class="search-form d-flex align-items-center" method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" class="bg-dark">
                    <button type="submit" title="Search" class=""><i class="bi bi-search text-white"></i></button>
                </form>
            </div> -->
            <!-- End Search Bar -->

            <!-- ==============NAVBAR----======================================= -->
            <Navbar></Navbar>

            <!-- End Icons Navigation -->

        </header><!-- End Header -->

        <!-- ======= Sidebar ======= -->
        <Sidebar></Sidebar>
        <!-- End Sidebar-->

        <RouterView />

        <!-- ======= Footer ======= -->
        <Footer></Footer>
        <!-- End Footer -->

    </div>
</template>


<script setup>
import Navbar from '@/components/client/user-dashboard/NavbarComponent.vue';
import Sidebar from '@/components/client/user-dashboard/SidebarComponent.vue'
import Footer from '@/components/client/user-dashboard/FooterComponent.vue'
import { toggleSidebarBtn } from '@/assets/js/client/toggleSidebarBtn';
import { onMounted } from 'vue';








onMounted(() => {
    toggleSidebarBtn()
})


</script>


<style scoped>
/* .logo {
    text-decoration: none;
} */

header {
    background-color: #191c24;
}



.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* Prend toute la hauteur de l'écran */
}

#header {
    flex-shrink: 0;
    /* Garde le header à sa taille normale */
}

#footer {
    flex-shrink: 0;
    /* Garde le footer en bas */
}

main {
    flex: 1;
    /* Permet au contenu principal de prendre l'espace restant */
}
</style>