<template>
  <v-navigation-drawer v-model=drawer absolute clipped right>
    <v-list-item>
      <v-list-item-title>test</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    {{drawerParent}} / {{drawer}}
    <v-btn @click="cancel"><span>キャンセル</span></v-btn>
    <v-btn @click="save"><span>保存</span></v-btn>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawerParent: {
      type: Boolean,
      defalut: true,//kikanai
    },
  },
  data() {
    return {
      drawer: null,
//      drawerParent: false,
    }
  },
  methods: {
    save() {
      this.drawer = true;
    },
    cancel() {
      this.drawer = false;
//      drawerParent != this.drawerParent;
    },
  },
  components: {
  },
}
</script>
<style>
</style>