<template>
  <div class="favs-container">
    <div class="favs-card">
      <div class="img-container">
        <img :src="basePoster + film.poster_path" :alt="film.title" />
      </div>
      <div class="data-container row">
        <div class="col w-70">
          <div class="col">
            <h4>{{ film.title }}</h4>
            <p>{{ film.overview }}</p>
          </div>
          <button class="row">Regarder <i class="gg-chevron-right"></i></button>
        </div>
        <div class="col w-30">
          <span @click="unlike(film)" class="like"
            ><i class="gg-heart fill"></i
          ></span>
          <span class="vote">{{ film.vote_average }} / 10</span>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFilms } from "@/store/like";

export default defineComponent({
  name: "LandingCard",
  props: {
    film: {
      type: Object,
      default: () => {
        return {
          overview: "",
          title: "",
          poster_path: "",
          vote_average: 0,
        };
      },
    },
    basePoster: {
      type: String,
      default: "https://image.tmdb.org/t/p/w200",
    },
  },
  methods: {
    unlike(film: Record<string, unknown>) {
      const filmsLiked = useFilms();
      filmsLiked.removeFilm(film);
    }
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

.favs-container {
  margin-block: 2rem;

  .like {
    cursor: pointer;
    text-decoration: none;
    font-weight: 700;
    border: #000 solid 1px;
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

    &:hover {
      background-color: #000;
    }
  }

  .favs-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @include respons(tablette) {
      flex-direction: column;
    }

    .img-container {
      width: calc(100% * 1 / 6);

      @include respons(tablette) {
        width: 100%;
      }

      img {
        width: 100%;
      }
    }

    .data-container {
      width: calc(100% * 5 / 6);
      flex-wrap: wrap;

      @include respons(tablette) {
        width: 100%;
      }
    }

    .col {
      &.w-70 {
        padding-inline: 1rem;
        justify-content: space-between;

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
          width: max-content;
          justify-content: space-between;
          background-color: #fff;
          text-transform: uppercase;

          &:hover {
            background-color: #282828;
            color: #fff;
          }
        }

        .col > *,
        button {
          margin-block: 0.5rem;
        }
      }

      &.w-30 {
        justify-content: space-evenly;
        align-items: center;
        padding-inline: 1rem;
      }
    }
  }

  .vote {
    font-weight: 700;
    font-size: 1.5rem;
    color: #fff;
    background-color: #000;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    @include respons(tablette) {
        font-size: 1rem;

        }
  }

  hr {
    margin-block: 2rem;
  }
}
</style>
