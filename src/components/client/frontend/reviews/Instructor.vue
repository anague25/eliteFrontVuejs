<template>
    <div class="review-form bgcolor1 text">
        <h5 class="white fw-bold">Laisser un avis pour cet instructeur</h5>

        <!-- Affichage des étoiles -->
        <div class="mb-2">
            <label class="form-label white">Note</label>
            <div class="star-rating">
                <i v-for="n in 5" :key="n" class="bi bi-star-fill "
                    :class="{ 'text-white': n <= rating, 'bi bi-star': n > rating }" @click="setRating(n)"></i>
            </div>
        </div>

        <!-- Commentaire -->
        <div class="mb-2">
            <label class="form-label white">Commentaire (max 120 caractères)</label>
            <textarea v-model="comment" class="form-control" rows="3" maxlength="120" placeholder="Votre avis..."
                required></textarea>
            <div class="text-end small text-white">{{ comment.length }}/120</div>
        </div>

        <button type="submit" class="btn btn-primary" @click.prevent="submitReview"
            :disabled="comment.length === 0 || rating === 0">Soumettre</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/plugins/axios';
import { toast } from 'vue3-toastify';

const props = defineProps({
    instructorId: {
        type: Number,
        required: true
    },
    onReviewSubmitted: {
        type: Function,
        required: false
    }
});

const rating = ref(0)
const comment = ref('')

// Fonction pour définir la note
const setRating = (value) => {
    rating.value = value
}


const submitReview = async () => {
    if (comment.value.length > 120) {
        toast.warning('Le commentaire ne doit pas dépasser 120 caractères.')
        return
    }

    try {
        await axios.post('/reviews', {
            reviewable_id: props.instructorId,
            reviewable_type: 'App\\Models\\Instructor',
            rating: rating.value,
            comment: comment.value
        });
        // Appelle la méthode du parent si elle est passée
        if (props.onReviewSubmitted) {
            props.onReviewSubmitted();
        }
        toast.success('Merci pour votre avis !');
        rating.value = 0;
        comment.value = '';
    } catch (error) {
        console.error(error)
        toast.error('Une erreur est survenue lors de la soumission.')
    }
}
</script>

<style scoped>
.review-form {
    padding: 1rem;
    border-radius: 10px;
}

.star-rating i {
    font-size: 1.5rem;
    cursor: pointer;
}

.star-rating i:hover {
    color: #f39c12;
}
</style>