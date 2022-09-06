<template>
    <div class="discover-container">
        <div class="tags row">
            <div class="tag" v-for="(tag, i) in categories.default" :key="i">
                <span :class="{ active: tag.active }" @click="activeTag(i)">{{ tag.name }}</span>
            </div>
        </div>
        <div>
            <ul class="row discover">
                <li v-for="(film, i) in discover.default" :key="i">
                    <LandingCard :film="film" />
                </li>
            </ul>
            <div v-if="isFilmsExist.default" class="error">
                <p>Aucun film trouvé</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LandingCard from '@/components/LandingCard.vue'
import axios from 'axios'

export default defineComponent({
    name: 'Discover',
    components: {
        LandingCard
    },
    data() {
        return {
            categories: {
                type: Array,
                default: [
                    { name: "Action", id: 28, active: false },
                    { name: "Animation", id: 16, active: false },
                    { name: "Aventure", id: 12, active: false },
                    { name: "Comédie", id: 35, active: false },
                    { name: "Documentaire", id: 99, active: false },
                ]
            },
            baseUrl: {
                type: String,
                value: "https://api.themoviedb.org/3"
            },
            basePoster: {
                type: String,
                value: "https://image.tmdb.org/t/p/w500"
            },
            queryUrl: {
                type: String,
                value: "/discover/movie"
            },
            api_key: {
                type: String,
                value: "2d719bf4dd2be14a393b7b3acd41f1cd"
            },
            listOfAllFilms: {
                type: Array,
                default: [],
            },
            discover: {
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
            isFilmsExist: {
                type: Boolean,
                default: false,
            },
        }
    },
    mounted() {
        axios.get(this.baseUrl.value + this.queryUrl.value + "?api_key=" + this.api_key.value)
            .then((response) => {
                this.discover.default = response.data.results;
                this.listOfAllFilms.default = response.data.results;
            })
            .catch((error) => {
                console.log(error);
            })
    },
    methods: {
        convertProxyToArray(proxyObj: any) {
            let proxy = new Proxy(proxyObj, {})
            return JSON.parse(JSON.stringify(proxy))
        },
        activeTag(i: number) {
            this.discover.default = this.listOfAllFilms.default as any;
            if (this.categories.default[i].active) {
                this.categories.default[i].active = false;
            } else {
                this.categories.default.forEach((tag) => {
                    tag.active = false;
                });
                this.categories.default[i].active = true;
            }

            let convertedArray = this.convertProxyToArray(this.discover);
            let listOfFilms: Array<any> = [];
            listOfFilms = convertedArray.default.filter((film: any) => {
                return film.genre_ids.includes(this.categories.default[i].id)
            })

            // if at least one categorie is active
            if (this.categories.default.some((tag) => tag.active)) {
                let filteredArray = this.filterFilm(listOfFilms)
                this.discover.default = filteredArray as any;
                if (filteredArray.length > 0) {
                    this.isFilmsExist.default = false;
                } else {
                    this.isFilmsExist.default = true;
                }
            } else {
                this.discover.default = this.listOfAllFilms.default as any;
            }
        },
        filterFilm(listOfFilms: Array<any>) {
            return listOfFilms.filter((film: any) => {
                return this.categories.default.find((tag) => {
                    return tag.active && film.genre_ids.includes(tag.id);
                });
            });
        }
    }
})
</script>

<style lang="scss">
.discover-container {
    padding-inline: var(--base-padding);

    .tags {
        flex-wrap: wrap;
    }

    .discover {
        margin-top: 3rem;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
            margin-bottom: 2rem;
            margin-inline: auto;
        }
    }

    .tag {
        margin-block: 0.5rem;
        span {
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
            margin-right: 2rem;

            &:hover,
            &.active {
                background-color: #282828;
                color: #fff;
            }
        }
    }
}
</style>