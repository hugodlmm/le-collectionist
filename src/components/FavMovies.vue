<template>
    <div class="liked-container" v-if="isLoaded.default">
        <div v-for="(film, i) in filmsLiked" :key="i">
            <FavsCard :film="film" />
        </div>
        <div v-if="isLikedEmpty.default" class="error">
            <p>Vous n'avez pas encore de films favoris</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFilms } from '@/store/like'
import FavsCard from '@/components/FavsCard.vue'

export default defineComponent({
    name: 'FavMovies',
    components: {
        FavsCard
    },
    data() {
        return {
            filmsLiked: {
                type: Array,
                default: () => {
                    return {
                        overview: "",
                        title: "",
                        poster_path: "",
                        vote_average: 0,
                    }
                }
            },
            isLoaded: {
                type: Boolean,
                default: false
            },
            isLikedEmpty: {
                type: Boolean,
                default: false
            }
        }
    },
    mounted() {
        // get all films liked from store
        let filmsLiked = useFilms();
        this.filmsLiked = filmsLiked.filmLiked as any;
        if (filmsLiked.filmLiked.length === 0) {
            this.isLikedEmpty.default = true;
        }
        this.isLoaded.default = true;
    }
})
</script>

<style lang="scss">
.liked-container {
    padding-inline: var(--base-padding);
}
.error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
}
</style>