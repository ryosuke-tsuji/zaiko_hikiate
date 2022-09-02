<template>
  <v-card>
    <!-- サイドバー -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <!-- メニュー -->
      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- ヘッダ -->
    <v-app-bar color="primary" app dark clipped-left>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title
          ><span class="mr-3">新物流システム</span></v-toolbar-title
        >
        <v-img
          class="shrink mr-2"
          contain
          src="../../assets/track.png"
          transition="scale-transition"
          max-width="60"
          max-height="50"
        />
      </div>

      <v-spacer></v-spacer>
      <span class="shrink mr-3 hidden-sm-and-down title"
        >{{ headerTitle }}</span
      >
      <v-spacer></v-spacer>

      <div id="loginDepo" class="align-center mr-4">
        <v-select
          v-model="selectedDepo"
          class="center"
          :items="depoList"
          label="Log-in デポ"
          dense
          outlined
          hide-details="false"
        ></v-select>
      </div>

      <span class="mr-2">凸版 太郎</span>
      <v-btn href="/" target="_blank" text>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    links: [
      ['mdi-inbox-arrow-down', '輸送指示管理台帳'],
      ['mdi-send', '輸送指示作成'],
      ['mdi-delete', '在庫引当'],
      ['mdi-alert-octagon', '棚卸'],
    ],
    depoList: ['幸手', '関宿', '滝野紙器', '滝野センター'],
    selectedDepo: '',
  }),

  created: function () {
    this.selectedDepo = '関宿';
  },

  computed: {
    headerTitle: function () {
      switch (this.$route.path) {
        case '/':
/*
          return '新物流システム\u3000メニュー';
*/
          return ' ';
        case '/assortList':
          return '荷揃指示一覧';
        case '/assortInst':
          return '(出庫兼)荷揃指示明細(※原案)';
        case '/assortInst2':
          return '(出庫兼)荷揃指示明細(※A案)';
        case '/searchInst':
          return '輸送指示 \u00a0 管轄デポ・運送会社変更 \u00a0 検索';
        case '/option':
          return 'オプション';
        case '/assortList_sample':
          return '荷揃指示一覧(サンプル)';
        case '/zaiko_hikiate':
          return '在庫引当';
        case '/zaiko_hikiate_kobetsu/1':
        case '/zaiko_hikiate_kobetsu/2':
        case '/zaiko_hikiate_kobetsu/3':
        case '/zaiko_hikiate_kobetsu/4':
          return '在庫引当\u3000吊札個別選択';
        case '/zaiko_hikiate_kakutei':
          return '在庫引当\u3000引当確定';
        default:
          return ' ';
      }
    },
  },
};
</script>
<style scoped>
#loginDepo {
  width: 200px;
}
</style>
