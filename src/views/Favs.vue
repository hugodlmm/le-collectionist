<template>
    <div class="favs">
        <FavMovies />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FavMovies from '@/components/FavMovies.vue';

export default defineComponent({
    name: 'Favs',
    components: {
        FavMovies
    }
})

</script>