<template>
    <div class="landing-container row">
        <div class="left">
            <h2>Nouveauté :</h2>
            <h3>{{ res.title }}</h3>
            <p>{{ res.overview }}</p>
            <div class="button-container row">
                <button class="row">Regarder <i class="gg-chevron-right"></i></button>
                <button @click="filmLiked(res)">
                    <i class="gg-heart" :class="{ fill: isMainFilmLiked.default }"></i>
                </button>
            </div>
            <hr />
            <h2>Découvrez aussi :</h2>
            <ul class="row discover" v-if="res.overview != ''">
                <li v-for="(film, i) in discover" :key="i">
                    <LandingCard :film="film" />
                </li>
            </ul>
        </div>
        <div class="right">
            <img v-if="res.poster_path != ''" class="w-100" :src="basePoster.value + res.poster_path"
                :alt="res.title" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFilms } from "@/store/like";
import LandingCard from "@/components/LandingCard.vue";
import axios from "axios";

export default defineComponent({
  name: "LandingPage",
  components: {
    LandingCard,
  },
  data() {
    return {
      baseUrl: {
        type: String,
        value: "https://api.themoviedb.org/3",
      },
      basePoster: {
        type: String,
        value: "https://image.tmdb.org/t/p/w500",
      },
      queryUrl: {
        type: String,
        value: "/discover/movie",
      },
      api_key: {
        type: String,
        value: "2d719bf4dd2be14a393b7b3acd41f1cd",
      },
      discover: {
        type: Array,
        default: () => {
          return {
            overview: "",
            title: "",
            poster_path: "",
            vote_average: 0,
          };
        },
      },
      res: {
        type: Object,
        overview: "",
        title: "",
        poster_path: "",
        vote_average: 0,
      },
      isMainFilmLiked: {
        type: Boolean,
        default: false,
      },
    };
  },
  methods: {
    filmLiked(film: Record<string, unknown>) {
      const filmsLiked = useFilms();
      if (filmsLiked.filmLiked.includes(film) || this.isMainFilmLiked.default) {
        filmsLiked.removeFilm(film);
        this.isMainFilmLiked.default = false;
      } else {
        filmsLiked.addFilm(film);
        this.isMainFilmLiked.default = true;
      }
    },
  },
  mounted() {
    axios
      .get(
        this.baseUrl.value + this.queryUrl.value + "?api_key=" + this.api_key.value
      )
      .then((response) => {
        this.res = response.data.results[0];
        this.discover = response.data.results.slice(1, 5);

        const filmsLiked = useFilms();
        let listOfFilmsLiked = filmsLiked.filmLiked;
        listOfFilmsLiked.forEach((filmLiked: Record<string, unknown>) => {
          if (filmLiked.title === this.res.title) {
            this.isMainFilmLiked.default = true;
          }
        });

      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>

<style lang="scss">
@mixin respons($bkp) {
    @if $bkp ==phone {
        @media screen and (max-width: 600px) {
            @content;
        }
    }

    @if $bkp ==tablette {
        @media screen and (max-width: 900px) {
            @content;
        }
    }

    @if $bkp ==sdesk {
        @media screen and (max-width: 1200px) {
            @content;
        }
    }

    @if $bkp ==ldesk {
        @media screen and (min-width: 1800px) {
            @content;
        }
    }
}

.landing-container {
    padding-inline: var(--base-padding);
    height: calc(100vh - 180px);
    overflow: hidden;
    position: relative;

    @include respons(tablette) {
        height: max-content;

    }

    .button-container {
        justify-content: space-between;
    }

    .left {
        width: 50%;

        @include respons(tablette) {
            width: 100%;

        }

        &>* {
            padding-right: 2rem;
            margin-top: 1.625rem;
        }

        button {
            cursor: pointer;
            color: #282828;
            text-decoration: none;
            font-weight: 700;
            border: #282828 solid 1px;
            padding: 0.5rem 1rem;
            border-radius: 50px;
            transition-duration: 0.3s;
            display: flex;
            align-items: center;
            min-width: 40px;
            min-height: 40px;
            justify-content: space-between;
            background-color: #fff;
            text-transform: uppercase;

            &:hover {
                background-color: #282828;
                color: #fff;
            }
        }
    }

    .discover {
        position: relative;
        flex-wrap: wrap;

        li {
            width: 25%;
            min-width: 100px;
            padding: 0.625rem;
            margin-inline: auto;

            img {
                max-width: 100%;
            }
        }
    }

    .right {
        position: relative;
        width: 50%;

        @include respons(tablette) {
            position: absolute;
            z-index: -1;
            width: 20%;
            top: 0;
            right: 0;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(270deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 1) 100%);
        }
    }
}
</style>
