<script setup lang="ts">
import Rating from 'primevue/rating';
import type { Review } from '@/interfaces/Review';
import { watch } from 'vue';
import router from '@/router';


const props = defineProps<{
    review: Review,
    userId: number,
}>()

//When changing link in review, fetch vendor profile
// watch(() => props.userId, () => {
//     props.fetchReviews();
//     router.push({
//         path: `/vendor/${props.userId}/posts`,

//     })
// })

</script>
<template>
    <article
        class="w-100 post-row mt-1 d-flex flex-wrap position-relative flex-md-nowrap gap-4 align-items-center justify-content-start py-2 px-3">
        <div class="img-box">
            <img :src="review.post.post_photos[0]" alt="post-img">
        </div>
        <div class="info-box w-75">
            <h3 class="price-box">{{ review.post.post_title }}</h3>
            <Rating :model-value="review.review_punctuation" :cancel="false" readonly></Rating>
            <p class="mt-4">{{ review.review_description }}</p>
            <p><b> Por {{ review.user_buyer.user_name }}</b></p>
            <div>
                <img class="img" :src="review.user_buyer.user_photo" alt="user_buyer_photo">
            </div>
        </div>
    </article>
</template>
<style>
/*Vue star color */
.p-rating-icon {
    color: #9F87F5;
}
</style>

<style scoped>
.img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.underline {
    text-decoration: underline;
    color: #795aea;
}

.img-box {
    min-width: 15%;
}

.img-box>img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
}

.title-box {
    font-size: 1.5rem;
}

.price-box {
    font-size: 2rem;
    font-weight: 700;
}

.published p,
.updated p,
.title-box {
    color: rgb(187, 187, 187);
}

.post-row {
    overflow: hidden;
}

.post-row,
.icon-box {
    background: rgba(255, 255, 255, 0.94);
    border-radius: 10px;
    border: 2px solid rgb(229, 229, 229);
    transition: all 0.2s ease-out;
}

.icon-box {
    height: 2.9rem;
}

.post-row:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

@media (max-width: 623px) {
    .img-box {
        width: 50%;
    }
}
</style>

