<template>
  <NavBar />
  <slot />
  <FooterMain />
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'
import FooterMain from '@/components/FooterMain.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    FooterMain,
  }
});
</script>
