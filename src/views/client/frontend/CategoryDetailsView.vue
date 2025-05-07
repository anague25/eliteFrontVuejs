<template>
    <div class="bgcolor2">

        <div>
            <Navbar></Navbar>
        </div>


        <section class="last-courses py-5 ">
            <div class="px-2 text-center mb-5 shadow rounded py-4 presentation  border" style="margin: 0 103px;">
                <h1 class="text-capitalize fs-2 title">Développez vos compétences avec les meilleurs cours de la
                    catégorie :
                    <span class="cat-name fw-bold">{{ category.name }}</span>
                </h1>
            </div>

            <div v-if="courses.length > 0" class="d-flex flex-wrap gap-2 px-2 justify-content-center">


                <router-link :to="'/home-course/' + course.id" class="card card-course-some"
                    v-for="(course, index) in courses" :key="course.id" style="text-decoration: none;">
                    <img :src="$baseUrl + course.image" class="card-img-top " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ $truncate(course.title, 45) }}</h5>
                        <p class="card-text">{{ $truncate(course.description, 45) }}</p>
                        <p class="card-text text-success fw-bold">{{ (Number(course.price)).toFixed(2) }} XAF</p>
                    </div>
                </router-link>

            </div>
            <div v-else class="d-flex flex-wrap gap-2 px-2 justify-content-center">
                <div class="container text-center">
                    <h1 class="white fw-bold">🔴 "Aucun cours disponible pour le moment dans cette catégorie. Revenez
                        bientôt !"</h1>
                </div>

            </div>

            <!-- <div class="container-fluid mt-3">
                <div class="pagination d-flex justify-content-center gap-2">
                    <button class="btn btn-dark btn-pag shadow">1</button>
                    <button class="btn btn-dark btn-pag">2</button>
                    <button class="btn btn-dark btn-pag">3</button>
                    <button class="btn btn-dark btn-pag">4</button>
                    <span class="">...</span>
                    <button class="btn btn-dark btn-pag">10</button>
                    <button class="btn btn-dark btn-pag">11</button>
                    <button class="btn btn-dark btn-pag">12</button>
                    <button class="btn btn-dark btn-pag">13</button>
                </div>
            </div> -->
        </section>
        <FooterComponent></FooterComponent>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";
import { ref, onMounted, computed } from 'vue';
import { useCategoryStore } from '@/stores/categories/useCategoryStore';
import { useRoute } from "vue-router";



const route = useRoute();
const categoryStore = useCategoryStore();

const categoryId = ref(null);
const courses = ref([]);
const category = ref({});

onMounted(() => {
    categoryId.value = route.params.id;
    category.value = categoryStore.allCategories.find(cat => cat.id == categoryId.value);
    courses.value = category.value.courses;
    // console.log(categoryId.value, category.value)

});


</script>

<style scoped>
.btn-pag:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(14, 168, 24);
    border: none;
}

.btn-pag {
    color: rgb(255, 255, 255);

}


.card-course-some {
    width: 18rem;
}

.card-img-top {
    height: 215px;
}

.cat-name:hover {
    color: rgb(26, 54, 148);
}

.presentation {
    /* background-color: rgb(14, 168, 24); */
    color: rgb(255, 255, 255);
}
</style>