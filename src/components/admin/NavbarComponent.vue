<template>
  <nav class="header-nav ms-auto ">
    <ul class="d-flex align-items-center">
      <li class="me-2"><router-link class="nav-item white " aria-current="page" to="/">Accueil</router-link></li>

      <!-- <li class="nav-item d-block d-lg-none text-white">
        <a class="nav-link nav-icon search-bar-toggle text-white" href="#">
          <i class="bi bi-search"></i>
        </a>
      </li> -->

      <!-- End Search Icon-->

      <li class="nav-item dropdown ">

        <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
          <i class="bi bi-bell text-white"></i>
          <span class="badge bg-primary badge-number">{{ unreadCount }}</span>
        </a><!-- End Notification Icon --><!-- End Notification Icon -->

        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications box-notification">
          <li class="dropdown-header text-white">
            Vous avez {{ unreadCount }} nouvelles notifications
            <router-link to="/admin-notifications">
              <span class="badge rounded-pill bg-primary p-2 ms-2">Tous Voir</span>
            </router-link>
          </li>

          <li v-for="(notif, index) in notifis.slice(0, 5)" :key="notif.id">
            <hr class="dropdown-divider" v-if="index > 0">
          <li class="notification-item">
            <i class="bi bi-info-circle text-primary"></i>
            <div>
              <h4>{{ notif.data.title || 'Notification' }}</h4>
              <p>{{ notif.data.message || notif.data }}</p>
              <p>{{ new Date(notif.created_at).toLocaleString() }}</p>
            </div>
          </li>
      </li>

      <li class="dropdown-footer">
        <router-link to="/admin-notifications" class="text-white">Voir toutes les notifications</router-link>
      </li>
    </ul><!-- End Notification Dropdown Items -->

    </li><!-- End Notification Nav -->

    <!-- <li class="nav-item dropdown ">

      <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i class="bi bi-chat-left-text text-white"></i>
        <span class="badge bg-success badge-number">3</span>
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages box-message">
        <li class="dropdown-header text-white">
          You have 3 new messages
          <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="/assets/img/messages-1.jpg" alt="" class="rounded-circle">
            <div>
              <h4 class="message-name">Maria Hudson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>4 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>


        <li class="dropdown-footer">
          <a href="#" class=" text-white">Show all messages</a>
        </li>

      </ul>

    </li> -->
    <!-- End Messages Nav -->

    <li class="nav-item dropdown pe-3">

<a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
  <img v-if="authStore.getuser.user && authStore.getuser?.user.firstName" :src="$baseUrl+authStore.getuser.user?.profile" alt="Profile" class="rounded-circle">
  <span v-if="authStore.getuser.user && authStore.getuser?.user.firstName" class="d-none d-md-block dropdown-toggle ps-2 text-white">{{ authStore.getuser.user?.firstName?.slice(0,1) }}.
    {{ authStore.getuser.user?.lastName }}</span>
</a><!-- End Profile Iamge Icon -->

<ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile box-profile" id="profile">
  <li class="dropdown-header">
    <h6 v-if="authStore.getuser.user && authStore.getuser?.user.firstName" class="text-white">{{ authStore.getuser.user?.firstName }}</h6>
    <!-- <span class="text-white">Web Designer</span> -->
    <span v-if="authStore.getuser.user && authStore.getuser?.user.firstName" class="text-white">{{ authStore.getuser.user?.lastName }}</span>
  </li>
  <li>
    <hr class="dropdown-divider">
  </li>

  <li>
    <router-link class="dropdown-item d-flex align-items-center" to="/users-dashboard/profile">
      <i class="bi bi-person"></i>
      <span>Mon Profil</span>
    </router-link>
  </li>



  <li>
    <hr class="dropdown-divider">
  </li>

  <li>
    <a class="dropdown-item d-flex align-items-center" href="#">
      <i class="bi bi-box-arrow-right"></i>
      <span>Sign Out</span>
    </a>
  </li>

</ul><!-- End Profile Dropdown Items -->
</li><!-- End Profile Nav -->

    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios' // ton instance Axios
import { useAuthStore } from '@/stores/auth/authStore' // si tu as Pinia/Vuex pour l'utilisateur

const notifis = ref([]);
const unreadCount = ref(0);
const authStore = useAuthStore();


onMounted(async () => {
  try {
    const res = await axios.get('/notifications-apercu');
    notifis.value = res.data.notifications;
    unreadCount.value = res.data.unread_count;
    await authStore.getUser();
  } catch (err) {
    console.error('Erreur lors du chargement des notifications:', err)
  }
})

</script>

<style scoped>
.box-message {
  background-color: #191c24
}

.box-notification {
  background-color: #191c24
}

.box-profile {
  background-color: #191c24;

}

.message-item p {
  color: #6c7293;
}

.message-item h4 {
  color: #ffffff;
}

.notification-item p {
  color: #6c7293;
}

.notification-item h4 {
  color: #ffffff;
}

#profile li a {
  color: #6c7293;

}

#profile li a i {
  color: #ffffff;

}
</style>