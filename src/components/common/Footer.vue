<template>
  <v-footer color="primary" padless app>
    <v-row justify="center" no-gutters>
      <v-col
        class="primary lighten-1 py-4 pt-0 pb-0 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} —
        <strong>TOPPAN LOGISTICS CO., LTD.</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({}),
};
</script>
