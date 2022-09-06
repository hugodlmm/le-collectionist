<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from './layouts/default.vue'

export default defineComponent({
  name: 'App',
  components: {
    Layout,
  }
});
</script>

<style lang="scss">
@import url("//fonts.googleapis.com/css2?family=Raleway");
@import url("assets/icons.scss");

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

:root {
  --base-padding: 12.5%;

  @include respons(sdesk) {
    --base-padding: 10%;
  }

  @include respons(tablette) {
    --base-padding: 5%;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
}





.w-50 {
  width: 50%;
}

.w-100 {
  width: 100%;
}

.w-30 {
  width: 30%;
}

.w-70 {
  width: 70%;
}

.row {
  display: flex;
  flex-direction: row;
}

ul {
  list-style: none;
}

.col {
  display: flex;
  flex-direction: column;
}
</style>