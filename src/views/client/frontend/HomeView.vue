<template>
  <div class="bgcolor2">
    <Navbar></Navbar>
    <div id="carouselExampleCaptions" class="container carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/images/jpgs/pexels-jeshoots-com-147458-714698.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>

        <div class="carousel-item position-relative">
          <img src="/images/jpgs/pexels-max-fischer-5212340.jpg" class="d-block w-100 " alt="...">
          <div class="card d-none p-3 d-md-block position-absolute"
            style="width: 29rem; top: 20%; left: 5%; border: none;">
            <div class="card-body" style="word-wrap: break-word; overflow-wrap: break-word;">
              <h1 class="card-title fw-bold">Special title eatment</h1>
              <p class="card-text">With supporting text below Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Alias quam excepturi, distinctio With
              </p>
            </div>
          </div>
          <div class="carousel-caption d-none d-md-block">
            <!-- <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p> -->
          </div>
        </div>

        <div class="carousel-item">
          <img src="/images/jpgs/pexels-polina-tankilevitch-8217198.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <section class="d-none container-fluid bgcolor1  p-3 d-flex justify-content-between gap-4 mt-5">
      <div class="bg-white p-2 rounded">
        <img src="/images/svgs/undraw_browsing_re_eycn.svg" alt="browsing" width="220">
      </div>
      <div>
        <div class="mb-3">
          <h1 class="text-center text-white ">Valorisez vos formations et atteignez des milliers d’étudiants.</h1>
        </div>
        <div class="container text-center text fs-4 " style="width: 70%;">
          <p>Notre plateforme vous permet de valoriser vos formations de manière simple et efficace. Grâce à des outils
            intuitifs, publiez vos cours en ligne et rendez-les accessibles à des milliers d’étudiants à travers le
            monde. </p>
        </div>
        <!-- Que vous soyez un formateur expérimenté ou débutant, vous pouvez rapidement créer, gérer et
            promouvoir vos contenus pédagogiques tout en maximisant votre visibilité. Rejoignez notre communauté et
            faites passer vos formations à l’échelle supérieure en touchant un public plus large. -->
      </div>

      <div class="bg-white p-2 rounded">
        <img src=" /images/svgs/undraw_online_learning_re_qw08.svg" alt="online learning" width="220">
      </div>

    </section>

    <!-- toutes les categories -->
    <section class="mt-5 container bgcolor1 border border-secondary px-5 py-5">
      <div class="mb-3">
        <h3 class="text-capitalize fs-2 text-white">acceder a une multtitude de categories de formations</h3>
      </div>

      <div id="carouselExampleControls" class="carousel slide carousel-dark" data-bs-ride="carousel"
        style="height: 447px;">
        <div class="carousel-inner  " style="height: 100%;">
          <div v-if="categoryGroups.length > 0" v-for="(group, index) in categoryGroups" :key="index"
            class="carousel-item" :class="{ active: index === 0 }">
            <div class="cards-wrapper gap-3">
              <div v-for="category in group" :key="category.id" class="card card-cat">
                <img :src="$baseUrl + category.image" class="card-img-top img-cat" :alt="category.name">
                <div class="card-body">
                  <h5 class="card-title">{{ truncateText(category.name, 40) }}</h5>
                  <p class="card-text">{{ truncateText(category.description, 40) }}</p>

                  <router-link :to="'/category-details/' + category.id" class="btn btn-dark fw-bold"
                    id="btn-ai">+</router-link>
                </div>
              </div>

            </div>
          </div>





        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    </section>


    <!--  les meilleurs cours -->
    <section class="mt-5 container bgcolor1 border border-secondary px-5 py-5">
      <div class="mb-3">
        <h3 class="text-capitalize fs-2 text-white">les meilleurs cours</h3>
      </div>

      <div id="carouselExampleControls1" class="carousel slide carousel-dark" data-bs-ride="carousel"
        style="height: 447px;">
        <div class="carousel-inner  " style="height: 100%;">
          <div v-if="courseGroups.length > 0" v-for="(group, index) in courseGroups" :key="index" class="carousel-item"
            :class="{ active: index === 0 }">
            <div class="cards-wrapper gap-3">
              <div v-for="course in group" :key="course.id" class="card card-cat">
                <span style="position: absolute; top: 0px; right: 0px; cursor: pointer;">
                  <Favorite :course="course" />
                </span>
                <img :src="$baseUrl + course.image" :alt="course.name" class="card-img-top img-cat ">
                <div class="card-body">
                  <h5 class="card-title">{{ truncateText(course.title, 40) }} ...</h5>
                  <p class="card-text">{{ truncateText(course.description, 40) }} ...</p>
                  <div class="d-flex justify-content-between">
                    <router-link :to="'/home-course/' + course.id" class="btn btn-sm btn-dark" id="btn-ai">Voir le
                      cours</router-link>
                    <!-- Icône panier en dehors du lien -->
                    <CartButton :course="course" />

                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls1"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls1"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    </section>





    <!-- les meilleurs categories -->
    <section class="container mt-5 pt-5 pb-5 bgcolor1 border border-secondary px-5 pt-5">
      <div class="px-4 mb-3">
        <h3 class="text-capitalize fs-2 text-white">les meilleurs categories</h3>
      </div>
      <div class="d-flex flex-wrap gap-2 px-2 justify-content-center">
        <template v-if="categoryStore.allCategories.length > 0">
          <div v-for="(cat, index) in categoryStore.allCategories.slice(0, 10)" :key="index" class="card card-cat-best">
            <img :src="$baseUrl + cat.image" class="card-img-top img-cat" :alt="cat.name">
            <div class="card-body">
              <h5 class="card-title">{{ truncateText(cat.name, 45) }}</h5>
              <p class="card-text">{{ truncateText(cat.description, 45) }}</p>

              <router-link :to="'/category-details/' + cat.id" class="btn btn-dark fw-bold">+</router-link>
            </div>
          </div>
        </template>



      </div>
    </section>

    <!-- quelques cours -->
    <section class=" container mt-5 pt-5 pb-5 bgcolor1 border border-secondary px-5 pt-5">
      <div class="px-4 mb-3">
        <h3 class="text-capitalize fs-2 text-white">quelques cours</h3>
      </div>

      <div class="d-flex flex-wrap justify-content-center gap-2 px-2">
        <!-- <template v-if="courseStore.allCourses.length > 0" style="position: relative;">
          <router-link v-for="course in courseStore.allCourses.slice(0, 10)" :to="'/home-course/' + course.id"
            class="card card-course-some shadow" style="text-decoration: none;position: relative;">
            <img :src="$baseUrl + course.image" class="card-img-top img-cat" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ truncateText(course.title, 45) }}</h5>
              <p class="card-text">{{ truncateText(course.description, 45) }}</p>
            </div>
          </router-link>
          <img width="35" src="/images/pngs/icons8-caddie-100.png" class="panier cursor-pointer" alt=""
            style="position: absolute; bottom: 10px; right: 10px; cursor: pointer;">

        </template> -->


        <template v-if="courseStore.allCourses.length > 0">

          <div v-for="course in courseStore.allCourses.slice(0, 10)" :key="course.id"
            class="card card-course-some shadow position-relative">
            <span style="position: absolute; bottom: 80px; right: 5px; cursor: pointer;">
              <Favorite :course="course" />
            </span>
            <!-- Lien vers le cours -->
            <router-link :to="'/home-course/' + course.id" class="course-link text-dark">
              <img :src="$baseUrl + course.image" class="card-img-top img-cat" alt="Image du cours">
              <div class="card-body">
                <h5 class="card-title">{{ truncateText(course.title, 45) }}</h5>
                <p class="card-text">{{ truncateText(course.description, 45) }}</p>
              </div>
            </router-link>

            <!-- Icône panier (en dehors du lien) -->
            <CartButton :course="course" />

          </div>

        </template>








      </div>
    </section>

    <!-- les cours les plus recommandes-->
    <section class="container mt-5 pt-5 pb-5 bgcolor1 border border-secondary px-5 pt-5">
      <div class="px-4 mb-3">
        <h3 class="text-capitalize fs-2 text-white">Les cours les plus recommandés</h3>
      </div>

      <div class="d-flex flex-wrap justify-content-center gap-2 px-2">

        <template v-if="recommandationStore.courses.length > 0"
          v-for="(course, index) in recommandationStore.courses.slice(0, 10)" :key="course.id">
          <div class="card card-course-some shadow" style="position: relative;">
            <span style="position: absolute; bottom: 80px; right: 5px; cursor: pointer;">
              <Favorite :course="course" />
            </span>
            <!-- Lien vers le cours -->
            <router-link :to="'/home-course/' + course.id" class="text-dark">
              <img :src="$baseUrl + course.image" class="card-img-top img-cat">
              <div class="card-body">
                <h5 class="card-title">{{ truncateText(course.title, 45) }}</h5>
                <p class="card-text">{{ truncateText(course.description, 45) }}</p>
              </div>
            </router-link>

            <!-- Icône panier en dehors du lien -->
            <CartButton :course="course" />
          </div>
        </template>






      </div>
    </section>

    <FooterComponent></FooterComponent>

  </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import CartButton from "@/components/client/frontend/cart/CartButton.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import Favorite from '@/components/client/user-dashboard/Favorite.vue'
import { onMounted, computed } from "vue";
import { toast } from 'vue3-toastify';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useCategoryStore } from '@/stores/categories/useCategoryStore';
import { useRecommandationStore } from '@/stores/recommandations/useRecommandationStore';
import { useCartStore } from '@/stores/carts/useCartStore';

const recommandationStore = useRecommandationStore();
const cartStore = useCartStore();

const categoryStore = useCategoryStore();
const courseStore = useCourseStore();

onMounted(() => {
  const notification = useNotificationStore();

  if (notification.message) {
    toast.success(notification.message);
    notification.clearMessage(); // Effacer après affichage
  }

  categoryStore.fetchAllCategories();
  courseStore.fetchAllCourses();
  recommandationStore.getCoursesByRecommendations();



});

const truncateText = (text, length) => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};



// Fonction pour diviser les catégories en groupes de 5
const categoryGroups = computed(() => {
  const groups = [];
  const categories = categoryStore.allCategories;
  for (let i = 0; i < categories.length; i += 5) {
    groups.push(categories.slice(i, i + 5));
  }
  return groups;
});

// Fonction pour diviser les catégories en groupes de 5
const courseGroups = computed(() => {
  const groupsC = [];
  const courses = courseStore.allCourses;
  for (let i = 0; i < courses.length; i += 5) {
    groupsC.push(courses.slice(i, i + 5));
  }
  return groupsC;
});












// Fonction pour ajouter un cours au panier
const addToCart = (course) => {

  cartStore.addToCart(course);
};

</script>

<style scoped>
.carousel-item {
  height: 447px;
  /* Hauteur de chaque item du carrousel */
}



.cards-wrapper {
  display: flex;
  /* Permet aux cartes de passer à la ligne */
  /* Espacement entre les cartes */
}

.card-course {
  width: calc(100% / 5);
  /* 5 cartes par ligne par défaut */
}

.img-cat {
  height: 215px;
}

.card-cat-best .card-cat-best {
  height: 215px;
}

.card {
  width: 18rem;
}

.panier {
  z-index: 20000;
}

.card-cat {
  flex: 1 1 calc(20% - 10px);
  /* 5 cartes par ligne */
  max-width: calc(20% - 10px);
}

/* Configuration des cartes sur les tablettes : 4 cartes par ligne */
@media (min-width: 768px) and (max-width: 1024px) {
  .cards-wrapper {
    flex-wrap: wrap;
    /* Permet le retour à la ligne */
    justify-content: space-between;
    /* Espacement entre les cartes */
  }

  .card-cat {
    flex: 1 1 calc(50% - 10px);
    /* 4 cartes par ligne */
    max-width: calc(50% - 10px);
  }
}


/* Mobile : 1 seule carte par ligne */
@media (max-width: 767px) {
  .cards-wrapper {
    flex-wrap: wrap;
    /* Permet le retour à la ligne */
    justify-content: center;
    /* Centre les cartes */
  }

  .card-cat {
    flex: 1 1 100%;
    /* La carte prend toute la largeur */
    max-width: 100%;
  }
}
</style>
