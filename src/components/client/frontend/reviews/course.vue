<template>
    <form @submit.prevent="submitReview">
        <div class="white bgcolor1 review-form ">
            <!-- Section pour la notation du cours -->
            <h5 class="white fw-bold">Laisser un avis pour ce cours</h5>
            <div class="form-group mb-4">
                <label for="courseRating" class="form-label">Évaluez ce cours</label>
                <div class="star-rating" id="courseRating">
                    <i v-for="n in 5" :key="n" class="bi bi-star-fill"
                        :class="{ 'text-white': n <= courseRating, 'text bi bi-star': n > courseRating }"
                        @click="setCourseRating(n)"></i>
                </div>
            </div>

            <!-- Section pour le commentaire -->
            <div class="form-group mb-4">
                <label for="courseReview" class="form-label">Laissez un commentaire (max 120 caractères)</label>
                <textarea v-model="courseReview" id="courseReview" class="form-control" maxlength="120"
                    placeholder="Écrivez un commentaire"></textarea>
                <div class="text-end">
                    <span>{{ 120 - courseReview.length }} caractères restants</span>
                </div>
            </div>

            <!-- Bouton de soumission -->
            <button type="submit" class="btn btn-primary" :disabled="courseReview.length === 0 || courseRating === 0">
                Soumettre l'avis
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/plugins/axios';
import { toast } from 'vue3-toastify';
import { useRoute } from 'vue-router';


// Déclaration des variables réactives pour la note et le commentaire
const courseRating = ref(0);
const courseReview = ref('');
const id = ref(null);
const route = useRoute();

const props = defineProps({
    onReviewSubmitted: {
        type: Function,
        required: false
    }
})
// Fonction pour mettre à jour la note du cours
const setCourseRating = (value) => {
    courseRating.value = value;
};

onMounted(() => {
    id.value = route.params.id;
});
// Fonction pour soumettre l'avis
const submitReview = async () => {
    if (courseReview.length === 0 || courseRating === 0) {
        toast.error('Veuillez remplir le commentaire et la note avant de soumettre.');
        return;
    }

    try {
        await axios.post('/reviews', {
            reviewable_id: id.value,
            reviewable_type: 'App\\Models\\Course',
            rating: courseRating.value,
            comment: courseReview.value
        });
        if (props.onReviewSubmitted) {
            props.onReviewSubmitted();
        }
        // Réinitialisation après soumission
        toast.success('Avis soumis avec succès !');
        courseRating.value = 0;
        courseReview.value = '';
    } catch (error) {
        toast.error('Une erreur est survenue lors de la soumission de l\'avis.');
    }
};
</script>

<style scoped>
.star-rating {
    display: flex;
    cursor: pointer;
}

.star-rating i {
    font-size: 1.5rem;
    margin-right: 5px;
}

.review-form {
    padding: 1rem;
    border-radius: 10px;
}
</style>