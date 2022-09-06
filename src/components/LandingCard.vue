<template>
    <div class="landing-card">
        <img :src="basePoster + film.poster_path" :alt="film.title">
        <h4>{{ film.title }}</h4>
        <span>{{ film.vote_average }} / 10</span>
        <span @click="filmLiked(film)" class="like"><i class="gg-heart"
                :class="{ fill: isFilmLiked.default }"></i></span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFilms } from '@/store/like'

export default defineComponent({
    name: 'LandingCard',
    props: {
        film: {
            type: Object,
            default: () => {
                return {
                    overview: "",
                    title: "",
                    poster_path: "",
                    vote_average: 0,
                }
            }
        },
        basePoster: {
            type: String,
            default: "https://image.tmdb.org/t/p/w300"
        },

    },
    data() {
        return {
            isFilmLiked: {
                type: Boolean,
                default: false
            }
        }
    },
    mounted() {
        const filmsLiked = useFilms()
        let listOfFilmsLiked = filmsLiked.filmLiked;
        listOfFilmsLiked.forEach((filmLiked: Record<string, unknown>) => {
            if (filmLiked.title === this.film.title) {
                this.isFilmLiked.default = true
            }
        })
    },
    methods: {
        filmLiked(film: Record<string, unknown>) {
            const filmsLiked = useFilms()
            if (filmsLiked.filmLiked.includes(film) || this.isFilmLiked.default) {
                filmsLiked.removeFilm(film)
                this.isFilmLiked.default = false;
            } else {
                filmsLiked.addFilm(film)
                this.isFilmLiked.default = true;
            }
        }
    }
})
</script>

<style lang="scss">
.landing-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    position: relative;
    align-items: center;

    &:hover .like {
        opacity: 1;
    }

    .like {
        opacity: 0;
        position: absolute;
        cursor: pointer;
        text-decoration: none;
        font-weight: 700;
        border: #fff solid 1px;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        transition-duration: 0.3s;
        display: flex;
        align-items: center;
        min-width: 40px;
        min-height: 40px;
        color: #fff;
        margin: 1rem;
        top: 0;
        right: 0;
    }
}
</style>