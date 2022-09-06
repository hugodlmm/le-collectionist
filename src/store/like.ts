import { defineStore } from "pinia";

export const useFilms = defineStore("liked", {
  state: () => ({
    likedFilm: Array<any>(),
  }),
  getters: {
    filmLiked(state) {
      return state.likedFilm;
    },
  },
  actions: {
    addFilm(film: Record<string, unknown>) {
      this.likedFilm.push(film);
    },
    removeFilm(film: Record<string, unknown>) {
      this.likedFilm.splice(this.likedFilm.indexOf(film), 1);
    },
  },
});
