<template>
  <div class="landing">
    <LandingPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingPage from '@/components/LandingPage.vue'

export default defineComponent({
  name: 'Home',
  components: {
    LandingPage,
  }
});
</script>
