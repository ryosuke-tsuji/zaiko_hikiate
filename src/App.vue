<template>
  <v-app>
    <Header />
    <v-main>
      <router-view/>
<!--      <Body />-->
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/common/Header.vue';

// import Body from './components/Body.vue';
import Footer from './components/common/Footer.vue';

export default {
  name: 'App',

  components: {
    // Body,
    Header,
    Footer,
  },

  data: () => ({}),
};
</script>
<style></style>
