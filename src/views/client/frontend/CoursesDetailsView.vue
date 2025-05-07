<template>
  <div class="bgcolor2 par ">
    <Navbar></Navbar>
    <div class="course-banner py-5 col-12 bgcolor1">
      <div class="container">
        <div class="row">
          <!-- Section principale -->
          <div class="col-lg-7 text-white">
            <h1 class="fw-bold mb-3">{{ cours.title }}</h1>
            <p class="text-light">{{ cours.description }}</p>
            <div class="d-flex align-items-center mb-3">
              <span v-if="nbrStudent > 200" class="badge bg-success me-2">Meilleure vente</span>
              <span class="fw-bold">{{ averageRating }} ⭐ ({{ nbrReviews }} notes)</span>
            </div>
            <p class="mb-2 "><strong class="text-white">{{ nbrStudent }}</strong> <span
                class="text-success">participants</span></p>
            <p><span class="text-white">De : {{ cours.levelStart }} <b class="text-danger fw-bold"> à </b> </span> <span
                class="text-warning"> {{ cours.levelEnd }}</span></p>
            <p><span class="text">Créé par : </span> <a href="#" class="text-warning">{{
              cours.instructor?.user?.firstName }} {{ cours.instructor?.user?.lastName }}</a></p>
            <p class="text-success fw-bold">📅 Dernière mise à jour : {{ cours.updated_at }}</p>
          </div>

          <!-- Carte d'achat -->
          <div class="col-lg-5 d-none d-xl-block bgcolor1 parent-fixed-buy-card ">
            <div class="bgcolor1 card   fixed-buy-card" :class="{ 'fixed-buy-card-top': isFixed }">
              <img :src="$baseUrl + cours.image" width="200" height="200" class="card-img-top">
              <div class="card-body text-center">
                <h4 class="fw-bold text-danger">{{ (Number(cours.price)).toFixed(2) }} XAFCM</h4>
                <button class="btn btn-primary w-100 py-2 mt-2">Ajouter au panier</button>
                <button class="btn btn-success w-100 py-2 mt-2">Acheter maintenant</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Carte d'achat en bas sur mobile -->
    <div class="container  mt-4 bgcolor1 py-2 py-xl-0">

      <div class="bgcolor1 d-xl-none ">
        <div class="">
          <img :src="$baseUrl + cours.image" width="200" height="200" class="card-img-top">
          <div class="card-body text-center">
            <h4 class="fw-bold text-danger">{{ (Number(cours.price)).toFixed(2) }} XAF CM</h4>
            <button class="btn btn-primary w-100 py-2 mt-2">Ajouter au panier</button>
            <button class="btn btn-success w-100 py-2 mt-2">Acheter maintenant</button>
          </div>
        </div>
      </div>
    </div>


    <div class="mt-4 col-xl-6 d-none d-xl-block  ms-md-5 ps-md-5 ">


      <div class=" bgcolor1 p-3">
        <h3 class="fw-bold text">Ce que vous apprendrez</h3>
        <div class="row ">
          <div class="col-md-6" v-for="(point, index) in cours.intrests" :key="index">
            <p class="text-white">✅ {{ point.description }}</p>
          </div>
        </div>

      </div>
    </div>

    <div class="mt-4 container d-xl-none  bgcolor1">
      <div class=" bgcolor1 p-3">
        <h3 class="fw-bold text">Ce que vous apprendrez</h3>
        <div class="row ">
          <div class="col-md-6" v-for="(point, index) in cours.intrests" :key="index">
            <p class="text-white">✅ {{ point.description }}</p>
          </div>
        </div>

      </div>
    </div>

    <div class="container d-xl-none  col-xl-6    mt-5 p-0">
      <h4 class="fw-bold text">Découvrir les sujets associés</h4>
      <div class="d-flex gap-2 mt-2 flex-wrap">
        <span class="badge bg-success text-white " v-for="(point, index) in cours.categories" :key="index">{{ point.name
        }}</span>
      </div>
    </div>
    <div class="d-none d-xl-block  ms-md-5 ps-md-5 col-xl-6    mt-5  ps-1">
      <h4 class="fw-bold text">Découvrir les sujets associés</h4>
      <div class="d-flex gap-2 mt-2 flex-wrap">
        <span class="badge bg-success text-white " v-for="(point, index) in cours.categories" :key="index">{{ point.name
        }}</span>
      </div>
    </div>

    <div class="col-12 d-none d-xl-block   mt-4 col-xl-6   ms-md-5 ps-md-5">
      <div class=" bgcolor1 p-4 shadow-sm">
        <h3 class="fw-bold text-white">Ce cours comprend :</h3>
        <div class="row">
          <div class="col-md-6" v-for="(feature, index) in features" :key="index">
            <p class="text"><span class="text">📌 {{ feature }}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container d-xl-none p-0  mt-5">
      <div class=" bgcolor1 p-4 shadow-sm">
        <h3 class="fw-bold text-white">Ce cours comprend :</h3>
        <div class="row">
          <div class="col-md-6" v-for="(feature, index) in features" :key="index">
            <p class="text"><span class="text">📌 {{ feature }}</span></p>
          </div>
        </div>
      </div>
    </div>





    <div class="d-none d-xl-block col-xl-6  mt-3 ms-md-5 ps-md-5">
      <h1 class="mx-2 text-white fw-bold fs-3">Contenu du cours</h1>
      <p class="mx-2 text-white">{{ cours?.chapters?.length }} sections • {{ totalSessions }} sessions • Durée totale :
        {{ totalDuration }}
        <!-- <a href="#" class="text-success">Développer toutes les sections</a> -->
      </p>

      <div class="accordion " id="courseContent">
        <div v-if="cours?.chapters?.length > 0" v-for="chapter in cours?.chapters" class="accordion-item bgcolor1">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button fs-4 text-white border-0" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#chap' + chapter.id" aria-expanded="true" aria-controls="collapseOne">
              {{ chapter.title }}
            </button>
          </h2>
          <div :id="'chap' + chapter.id" class="accordion-collapse collapse show border-0 " aria-labelledby="headingOne"
            data-bs-parent="#courseContent">
            <div class="accordion-body">
              <div v-if="chapter?.videos?.length > 0" v-for="vid in chapter?.videos"
                class="d-flex justify-content-between">
                <!-- <p>
                  <a :href="$baseUrl + vid.url" target="_blank" class="text">{{ vid.name }}</a>
                </p> -->
                <p>
                  <a v-if="hasAccessToCourse" href="#" class="text"
                    @click.prevent="playVideo(vid.url, vid.name)">
                    {{ vid.name }}
                  </a>
                  <a v-else href="#" class="text">
                    {{ vid.name }}
                  </a>
                </p>
                <p><span class="text">{{ vid.duration }}</span></p>
              </div>
              <div v-else>
                <p class="text-warning fs-6">Aucune video</p>
              </div>
              <hr class=" border border-2 " v-if="chapter?.resources?.length > 0 && chapter?.videos?.length > 0">
              <div v-if="chapter?.resources?.length > 0" v-for="res in chapter?.resources"
                class="d-flex justify-content-between">
                <p>
                  <a v-if="hasAccessToCourse" :href="$baseUrl + res.file" target="_blank" class="text">{{ res.fileName
                  }}</a>
                  <a v-else href="#" class="text">{{ res.fileName }}</a>
                </p>
                <!-- <p>
                  <a href="#" class="text" @click.prevent="playVideo($baseUrl + vid.url, vid.name)">
                    {{ vid.name }}
                  </a>
                </p> -->
                <p></p>
              </div>
              <div v-else>
                <p class="text-info fs-6">Aucun fichier</p>
              </div>


            </div>
          </div>
        </div>






      </div>

      <button class="btn btn-outline-white"><span class="text-white">{{ cours?.chapters?.length }} sections au
          total</span></button>
    </div>
    <div class="container d-xl-none p-0   mt-5 ">
      <h1 class="mx-2 text-white fw-bold fs-3">Contenu du cours</h1>
      <p class="mx-2 text-white">{{ cours?.chapters?.length }} sections • {{ totalSessions }} sessions • Durée totale :
        {{ totalDuration }}
        <!-- <a href="#" class="text-success">Développer toutes les sections</a> -->
      </p>

      <div class="accordion " id="courseContent">
        <div v-if="cours?.chapters?.length > 0" v-for="chapter in cours?.chapters" class="accordion-item bgcolor1">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button fs-4 text-white border-0" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#chap' + chapter.id" aria-expanded="true" aria-controls="collapseOne">
              {{ chapter.title }}
            </button>
          </h2>
          <div :id="'chap' + chapter.id" class="accordion-collapse collapse show border-0 " aria-labelledby="headingOne"
            data-bs-parent="#courseContent">
            <div class="accordion-body">
              <div v-if="chapter?.videos?.length > 0" v-for="vid in chapter?.videos"
                class="d-flex justify-content-between">
                <p>
                  <a v-if="hasAccessToCourse" href="#" class="text"
                    @click.prevent="playVideo(vid.url, vid.name)">
                    {{ vid.name }}
                  </a>
                  <a v-else href="#" class="text">
                    {{ vid.name }}
                  </a>
                </p>
                <p><span class="text">{{ vid.duration }}</span></p>
              </div>
              <div v-else>
                <p class="text-warning fs-6">Aucune video</p>
              </div>

              <hr class=" border border-2 " v-if="chapter?.resources?.length > 0 && chapter?.videos?.length > 0">
              <div v-if="chapter?.resources?.length > 0" v-for="res in chapter?.resources"
                class="d-flex justify-content-between">
                <p>
                  <a v-if="hasAccessToCourse" :href="$baseUrl + res.file" target="_blank" class="text">{{ res.fileName
                  }}</a>
                  <a v-else href="#" class="text">{{ res.fileName }}</a>
                </p>
                <!-- <p>
                  <a href="#" class="text" @click.prevent="playVideo($baseUrl + vid.url, vid.name)">
                    {{ vid.name }}
                  </a>
                </p> -->
                <p></p>
              </div>
              <div v-else>
                <p class="text-info fs-6">Aucun fichier</p>
              </div>


            </div>
          </div>
        </div>


        <div v-else class="accordion-item bgcolor1">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button text-white border-0" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne">
              Bien démarrer dans la formation
            </button>
          </h2>
          <div id="collapseOne2" class="accordion-collapse collapse show border-0 " aria-labelledby="headingOne"
            data-bs-parent="#courseContent">
            <div class="accordion-body">
              <div class="d-flex justify-content-between">
                <p><a href="#" class="text">Est - ce que l'IA remplace les développeurs ?</a></p>
                <p><a href="#" class="text">Aperçu 02:06</a></p>
              </div>
              <div class="d-flex justify-content-between">
                <p><a href="#" class="text">Est - ce que l'IA remplace les développeurs ?</a></p>
                <p><a href="#" class="text">Aperçu 02:06</a></p>
              </div>
              <div class="d-flex justify-content-between">
                <p><a href="#" class="text">Est - ce que l'IA remplace les développeurs ?</a></p>
                <p><a href="#" class="text">02:06</a></p>
              </div>
              <div class="d-flex justify-content-between">
                <p><a href="#" class="text">Est - ce que l'IA remplace les développeurs ?</a></p>
                <p><a href="#" class="text">02:06</a></p>
              </div>

            </div>
          </div>
        </div>



      </div>

      <button class="btn btn-outline-white"><span class="text-white">{{ cours?.chapters?.length }} sections au
          total</span></button>
    </div>

    <div class="container d-xl-none  mt-5 p-0 ">
      <div class="card bgcolor1 ">
        <div class="ms-3 mt-3 ">
          <img :src="$baseUrl + cours?.instructor?.image" width="150" height="150" class=" rounded-circle"
            alt="Jonathan Roux">

        </div>
        <div class="card-body ">
          <h5 class="card-title text-white">{{ cours?.instructor?.user?.firstName }}
            {{ cours?.instructor?.user?.lastName }}</h5>
          <span class="text-white " v-for="spe in cours?.instructor?.specialties">{{ spe.name }} | </span>
          <p class="card-text text-success mt-2">{{ cours?.instructor?.bio }}</p>
          <ul class="list-unstyled">
            <li><i class="bi bi-star-fill text-white"></i><span class="text-white"> {{ averageRatingInstructor }} Note
                du formateur</span></li>
            <li><i class="bi bi-people-fill text-white"></i> <span class="text-white">{{ nbrReviewsInstructor }}
                avis</span></li>
            <li><i class="bi bi-person-lines-fill text-white"></i> <span class="text-white">{{ nbrStudent }}
                participants</span>
            </li>
            <li><i class="bi bi-journal-bookmark-fill text-white"></i> <span class="text-white">{{ nbrCoursesInstructor
                }} cours</span></li>
          </ul>
          <p class="card-text text">
            {{ cours?.instructor?.experience }}
          </p>
          <!-- <a href="#">Afficher plus</a> -->
        </div>
      </div>
      <div class="mb-3" v-if="authStore.user && authStore.user">
        <InstructorReview v-if="instructorId !== null" :instructorId="instructorId"
          :onReviewSubmitted="refreshDataAfterReview" />
      </div>
      <div class="">
        <h2 class="text-white">★ {{ averageRatingInstructor }} note du formateur • {{ nbrReviewsInstructor }} notes</h2>
        <div v-if="reviewsInstructor?.length > 0" class="row d-flex flex-wrap gap-4 px-md-0 px-5">
          <div v-for="re in reviewsInstructor.slice(0, 2)" class="card col-md-5 bgcolor1">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style="width: 40px; height: 40px; overflow: hidden;">
                  <img :src="$baseUrl + re.user.profile" alt="">
                </div>
                <div class="ms-3">
                  <h6 class="mb-0 text-white">{{ re.user.firstName }}</h6>
                  <small class="text">{{ re.created_at }}</small>
                </div>
              </div>
              <div class="mt-2">
                <span v-for="n in 5" :key="n">
                  <i v-if="n <= re.rating" class="bi bi-star-fill text-white fw-bold"></i>
                  <i v-else class="bi bi-star text-white fw-bold"></i>
                </span>

              </div>
              <p class="mt-2 text">
                {{ re.comment }}
              </p>
              <div class="d-flex align-items-center ">
                <!-- <small class="text-white">Est - ce utile ?</small>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-up text-white"></i></button>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-down text-white"></i></button> -->
              </div>
            </div>
          </div>


          <div class=" px-4  mb-4">
            <button class="btn btn-outline-light w-100" @click="openPopup('instructor')">Voir tous les avis sur le
              formateur</button>
          </div>



        </div>

      </div>
      <div class="ms-3">
        <h2 class="text-white">★ {{ averageRating }} note du cours • {{ nbrReviews }} notes</h2>
        <div v-if="cours.reviews?.length > 0" class="row d-flex flex-wrap gap-4 px-md-0 px-5">
          <div v-for="review in cours.reviews.slice(0, 2)" class="card col-md-5 bgcolor1">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style="width: 40px; height: 40px; overflow: hidden;">
                  <img :src="$baseUrl + review.user.profile" alt="">
                </div>
                <div class="ms-3">
                  <h6 class="mb-0 text-white">{{ review.user.firstName }}</h6>
                  <small class="text">{{ review.created_at }}</small>
                </div>
              </div>
              <div class="mt-2">
                <span v-for="n in 5" :key="n">
                  <i v-if="n <= review.rating" class="bi bi-star-fill text-white fw-bold"></i>
                  <i v-else class="bi bi-star text-white fw-bold"></i>
                </span>

              </div>
              <p class="mt-2 text">
                {{ review.comment }}
              </p>
              <div class="d-flex align-items-center ">
                <!-- <small class="text-white">Est - ce utile ?</small>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-up text-white"></i></button>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-down text-white"></i></button> -->
              </div>
            </div>
          </div>

          <div class="px-4">
            <button class="btn btn-outline-light w-100" @click="openPopup('course')">Voir tous les du cours</button>

          </div>





        </div>

      </div>
    </div>


    <div class="col-xl-6 d-none d-xl-block   mt-4 ms-md-5 ps-md-5">
      <div class="card bgcolor1 ">
        <div class="ms-3 mt-3 ">
          <img :src="$baseUrl + cours?.instructor?.image" width="40" height="40" class=" rounded-circle"
            alt="Jonathan Roux">

        </div>
        <div class="card-body ">
          <h5 class="card-title text-white">{{ cours?.instructor?.user?.firstName }}
            {{ cours?.instructor?.user?.lastName }}</h5>
          <span class="text-white " v-for="spe in cours?.instructor?.specialties">{{ spe.name }} | </span>
          <p class="card-text text-success mt-2">{{ cours?.instructor?.bio }}</p>
          <ul class="list-unstyled">
            <li><i class="bi bi-star-fill text-white"></i><span class="text-white"> {{ averageRatingInstructor }} Note
                du formateur</span></li>
            <li><i class="bi bi-people-fill text-white"></i> <span class="text-white">{{ nbrReviewsInstructor }}
                avis</span></li>
            <li><i class="bi bi-person-lines-fill text-white"></i> <span class="text-white">{{ nbrStudent }}
                participants</span>
            </li>
            <li><i class="bi bi-journal-bookmark-fill text-white"></i> <span class="text-white">{{ nbrCoursesInstructor
                }} cours</span></li>
          </ul>
          <p class="card-text text">
            {{ cours?.instructor?.experience }}
          </p>
          <!-- <a href="#">Afficher plus</a> -->
        </div>
      </div>
      <div class="mb-3" v-if="authStore.user && authStore.user">
        <InstructorReview v-if="instructorId !== null" :instructorId="instructorId"
          :onReviewSubmitted="refreshDataAfterReview" />
      </div>

      <div class="">
        <h2 class="text-white">★ {{ averageRatingInstructor }} note du formateur • {{ nbrReviewsInstructor }} notes</h2>
        <div v-if="reviewsInstructor?.length > 0" class="row d-flex flex-wrap gap-4 px-md-0 px-5 mb-5">
          <div v-for="re in reviewsInstructor.slice(0, 2)" class="card col-md-5 bgcolor1">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style="width: 40px; height: 40px; overflow: hidden;">
                  <img :src="$baseUrl + re.user.profile" alt="">
                </div>
                <div class="ms-3">
                  <h6 class="mb-0 text-white">{{ re.user.firstName }}</h6>
                  <small class="text">{{ re.created_at }}</small>
                </div>
              </div>
              <div class="mt-2">
                <span v-for="n in 5" :key="n">
                  <i v-if="n <= re.rating" class="bi bi-star-fill text-white fw-bold"></i>
                  <i v-else class="bi bi-star text-white fw-bold"></i>
                </span>

              </div>
              <p class="mt-2 text">
                {{ re.comment }}
              </p>
              <div class="d-flex align-items-center ">
                <!-- <small class="text-white">Est - ce utile ?</small>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-up text-white"></i></button>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-down text-white"></i></button> -->
              </div>
            </div>
          </div>


          <div class="px-1">
            <button class="btn btn-outline-light w-100" @click="openPopup('instructor')">Voir tous les avis sur
              l'intructeur</button>

          </div>


        </div>


      </div>











      <div class="ms-3">
        <h2 class="text-white">★ {{ averageRating }} note du cours • {{ nbrReviews }} notes</h2>
        <div v-if="cours.reviews?.length > 0" class="row d-flex flex-wrap gap-4 px-md-0 px-5">
          <div v-for="review in cours.reviews.slice(0, 2)" class="card col-md-5 bgcolor1">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                  style="width: 40px; height: 40px; overflow: hidden;">
                  <img :src="$baseUrl + review.user.profile" alt="">
                </div>
                <div class="ms-3">
                  <h6 class="mb-0 text-white">{{ review.user.firstName }}</h6>
                  <small class="text">{{ review.created_at }}</small>
                </div>
              </div>
              <div class="mt-2">
                <span v-for="n in 5" :key="n">
                  <i v-if="n <= review.rating" class="bi bi-star-fill text-white fw-bold"></i>
                  <i v-else class="bi bi-star text-white fw-bold"></i>
                </span>

              </div>
              <p class="mt-2 text">
                {{ review.comment }}
              </p>
              <div class="d-flex align-items-center ">
                <!-- <small class="text-white">Est - ce utile ?</small>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-up text-white"></i></button>
                <button class="btn btn-sm"><i class="bi bi-hand-thumbs-down text-white"></i></button> -->
              </div>
            </div>
          </div>



          <div class="px-1">
            <button class="btn btn-outline-light w-100" @click="openPopup('course')">Voir tous les avis du
              cours</button>

          </div>

        </div>

      </div>



    </div>



    <div v-if="authStore.user && authStore.user" class="col-xl-6 d-none d-xl-block   mt-4 ms-md-5 ps-md-5">
      <courseReview :onReviewSubmitted="refreshDataAfterReview" />
    </div>
    <div v-if="authStore.user && authStore.user" class="container d-xl-none   p-0 mt-5">
      <courseReview :onReviewSubmitted="refreshDataAfterReview" />
    </div>


    <allReviews :reviews="currentReviews" :show="showPopup" @close="showPopup = false" />




    <!-- Modal pour la vidéo -->
    <div v-if="showPopupV" class="video-popup">
      <div class="popup-overlay" @click="closeVideoPopup"></div>
      <div class="popup-content">
        <button @click="closeVideoPopup" class="close-btn">X</button>
        <VideoPlayer :videoUrl="currentVideoUrl" />
      </div>
    </div>







    <FooterComponent></FooterComponent>
  </div>

</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, onUnmounted, computed, getCurrentInstance } from 'vue';
import { useCourseStore } from '@/stores/courses/useCourseStore';
import { useAuthStore } from '@/stores/auth/authStore';
import { toast } from 'vue3-toastify';
import { useRoute, useRouter } from 'vue-router';
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import courseReview from '@/components/client/frontend/reviews/course.vue';
import InstructorReview from '@/components/client/frontend/reviews/Instructor.vue'
import allReviews from '@/components/client/frontend/reviews/allReviews.vue'
import VideoPlayer from '@/components/client/frontend/VideoPlayer.vue'
import videojs from 'video.js';




const instance = getCurrentInstance();
const baseUrl = instance?.appContext.config.globalProperties.$baseUrl; // Récupérer $baseUrl
const authStore = useAuthStore();
const courseStore = useCourseStore();
const cours = ref({});
const route = useRoute();
const router = useRouter();
const nbrStudent = ref(0);
const nbrReviews = ref(0);
const nbrReviewsInstructor = ref(0);
const nbrCoursesInstructor = ref(0);
const reviews = ref([]);
const reviewsInstructor = ref([]);
const chapters = ref([]);

const isFixed = ref(false);

const instructorId = ref(null);
const showPopupV = ref(false);
const currentVideoUrl = ref('');
const hasAccessToCourse = ref(false);




// Méthode pour ouvrir la pop-up avec la vidéo sélectionnée
const playVideo = (url, name) => {
  currentVideoUrl.value = url;
  showPopupV.value = true;
};

// Méthode pour fermer la pop-up
const closeVideoPopup = () => {
  showPopupV.value = false;
};







//reviews
const showPopup = ref(false)
const activeType = ref('course') // ou 'instructor'

const openPopup = (type) => {
  console.log(type);
  activeType.value = type
  showPopup.value = true
}

const currentReviews = computed(() => {
  return activeType.value === 'course' ? reviews.value : reviewsInstructor.value
});






const handleScroll = () => {
  const navbar = document.querySelector('.navbar'); // Assurez-vous que la classe de la navbar est correcte
  if (navbar) {
    const navbarBottom = navbar.getBoundingClientRect().bottom;
    isFixed.value = navbarBottom <= 0;
  }
};



onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});



const features = computed(() => {
  return [
    `${totalDuration.value} de videos compétentes`,
    `${totalResources.value} Resources d'exercices, de pratique et ou des documents pour approfondir vos competences`,
    "Assignations",
    "Des explications detailles",
    "Accès sur mobiles et TV",
  ]
});

// Nombre total de vidéos
const totalSessions = computed(() => {
  return chapters.value.reduce((total, chapter) => {
    return total + (chapter.videos ? chapter.videos.length : 0);
  }, 0);
});

// Nombre total de resources
const totalResources = computed(() => {
  return chapters.value.reduce((total, chapter) => {
    return total + (chapter.resources ? chapter.resources.length : 0);
  }, 0);
});


// Convertir "HH:mm:ss" en minutes
const convertToMinutes = (duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 60 + minutes + seconds / 60;
};

// Durée totale en minutes
const totalDuration = computed(() => {
  const totalMinutes = chapters.value.reduce((sum, chapter) => {
    return sum + (chapter.videos ? chapter.videos.reduce((acc, video) => acc + convertToMinutes(video.duration), 0) : 0);
  }, 0);

  // Conversion en format "HH h MM min"
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return `${hours} h ${minutes} min`;
});



// Définir averageRating AVANT le rendu initial
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const totalWeight = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return (totalWeight / reviews.value.length).toFixed(1); // Arrondi à 1 décimale
});

const averageRatingInstructor = computed(() => {
  if (reviewsInstructor.value.length === 0) return 0;
  const totalWeight = reviewsInstructor.value.reduce((acc, review) => acc + review.rating, 0);
  return (totalWeight / reviewsInstructor.value.length).toFixed(1); // Arrondi à 1 décimale
});

onMounted(async () => {

  window.addEventListener('scroll', handleScroll);





  try {

    cours.value = await courseStore.fetchCourseById(route.params.id);

    if (authStore.token) {

      await authStore.getUser();

      if (authStore.getuser && cours.value && authStore.getuser?.user?.learning_courses) {
        hasAccessToCourse.value = authStore.getuser?.user?.learning_courses.some(
          (c) => Number(c.id) == Number(cours.value.id)
        );
      }
    }


    nbrStudent.value = cours.value.students?.length;
    nbrReviews.value = cours.value.reviews?.length;
    nbrReviewsInstructor.value = cours.value?.instructor?.reviews?.length;
    nbrCoursesInstructor.value = cours.value?.instructor?.courses?.length;
    instructorId.value = Number(cours.value?.instructor_id);
    reviews.value = cours.value.reviews;
    reviewsInstructor.value = cours.value?.instructor?.reviews;
    chapters.value = cours.value?.chapters;


  } catch (error) {
    console.log(error);
    toast.error("Une erreur s'est produite!");
  }



});



const refreshDataAfterReview = async () => {
  cours.value = await courseStore.fetchCourseById(route.params.id);
  nbrStudent.value = cours.value.students?.length;
  nbrReviews.value = cours.value.reviews?.length;
  nbrReviewsInstructor.value = cours.value?.instructor?.reviews?.length;
  nbrCoursesInstructor.value = cours.value?.instructor?.courses?.length;
  instructorId.value = Number(cours.value?.instructor_id);
  reviews.value = cours.value.reviews;
  reviewsInstructor.value = cours.value?.instructor?.reviews;
};




</script>

<style scoped>
.course-banner {
  background-size: cover;
  background-position: center;
  color: white;
}



.card {
  border-radius: 10px;
}

.card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.list-unstyled li {
  font-size: 1.1rem;
}

.badge {
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
}






h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}



.accordion-item {
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.accordion-button {
  font-weight: bold;
}

.accordion-body {
  padding: 15px;
}

.accordion-button {
  background-color: #191c24;
}


/* Fixe la carte d'achat sur grand écran */
.fixed-buy-card {
  position: fixed;
  top: 24%;
  right: 140px;
  border: 1px solid rgb(70, 70, 70);
  box-shadow: 0px 0px 10px rgba(219, 217, 217, 0.3);
  height: 90vh;
  width: 100%;
  max-width: 350px;
  overflow: hidden;
}

.fixed-buy-card-top {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 350px;
  /* Ajustez selon vos besoins */
  height: 100vh;
  /* Occupe toute la hauteur disponible */
  overflow-y: auto;
  z-index: 1000;
}

/* Cible l'icône quand l'accordéon est fermé */
.accordion-button[aria-expanded="false"]::after {
  background-color: white !important;
  /* Applique la couleur blanche à l'icône quand l'accordéon est fermé */
}

/* Cible l'icône quand l'accordéon est ouvert */
.accordion-button[aria-expanded="true"]::after {
  background-color: white !important;
  /* Applique la couleur blanche à l'icône quand l'accordéon est ouvert */


}

.parent-fixed-buy-card {
  z-index: 1000;
}


.container,
.row,
.col-12 {
  overflow-x: hidden;
}


.video-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  border: 1px solid white;
  width: 90%;
  max-width: 800px;
  position: relative;
  background: #000000;
  padding: 1rem;
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.close-btn {
  width: 30px;
  height: 30px;
  padding-bottom: 4px;
  padding-top: 2;
  background-color: #000000;
  position: absolute;
  top: 5px;
  right: 8px;
  font-weight: bold;
  border: none;
  color: #6c7293;
  font-size: 22px;
  cursor: pointer;
  z-index: 9999;
}

.close-btn:hover {
  color: #ffffff;

  background-color: #191b26;
}
</style>