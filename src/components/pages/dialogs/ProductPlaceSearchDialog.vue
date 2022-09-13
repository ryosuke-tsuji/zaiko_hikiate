<template>
  <div>
    <v-text-field outlined dense clearable hint="" hide-details="auto" style="max-width: 130px" append-icon="mdi-magnify" @click:append="dialog=true" v-model="place"></v-text-field>

    <v-dialog v-model="dialog" width="600" persistent>
      <v-card class="px-5">
        <v-row>
          <v-col class="pb-0">
            <v-card-title class="pt-2 pb-2 pl-0">
              <span class="titleFont d-flex">生産場所検索</span>
            </v-card-title>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pt-0 pr-1 d-flex" cols="9">
            <v-subheader class="mr-2">検索区分</v-subheader>
            <v-radio-group row dense class="my-0 py-0">
              <v-radio dense label="協力会社" value="1" />
              <v-radio dense label="社内・FK" value="2" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0 pr-1 d-flex" cols="6">
            <v-subheader class="mr-2">生産場所コード</v-subheader>
            <v-text-field outlined dense clearable hint="" hide-details="auto" style="max-width: 150px" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0 pr-1 d-flex" cols="7">
            <v-subheader class="mr-2">生産場所名</v-subheader>
            <v-text-field outlined dense clearable hint="" hide-details="auto" style="max-width: 250px" />
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="pt-0 pr-1 d-flex" cols="4">
            <v-btn class="mr-2 mb-0" depressed outlined large @click="clearList">クリア</v-btn>
            <v-btn class="primary mb-0" depressed large @click="select"><span>検索</span></v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-data-table :headers="shownHeaders" :items="items" dense multi-sort fixed-header hide-default-footer height=200>
              <template #[`item.id`]="{ item }">
                <div style="text-align: left;"><input :id="'Radio_' + item.id" type="radio" :value="item.id"  v-model="selectItem"></div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-start mr-10">
            <v-btn class="mr-10 mb-3" depressed outlined large @click="cancelModal"><span>戻る</span></v-btn>
          </v-col>

          <v-col class="d-flex justify-center">
          </v-col>

          <v-col class="d-flex justify-end ml-10">
            <v-btn class="ml-10 mb-3 primary" depressed large @click="closeModal"><span>決定</span></v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      dialog: false,
      headersPlace: [
        { text:"選択",           value:"id",               width:80,  shown: true, },
        { text:"生産場所コード", value:"producePlaceCd",   width:150, shown: true, },
        { text:"生産場所名称",   value:"producePlaceName", width:300, shown: true, },
      ],
      items: [],
      itemsPlaceList: [
        { id:1, producePlaceCd:"BD001", producePlaceName:"ＴＣＰ・朝霞・進行管理" },
        { id:2, producePlaceCd:"BD002", producePlaceName:"ＴＣＰ・坂戸・進行管理" },
        { id:3, producePlaceCd:"BD003", producePlaceName:"ＴＣＰ・朝霞・刷版" },
        { id:5, producePlaceCd:"ZZ995", producePlaceName:"サンプルＡ"},
        { id:6, producePlaceCd:"ZZ996", producePlaceName:"サンプルＢ"},
        { id:7, producePlaceCd:"ZZ997", producePlaceName:"サンプルＣ"},
        { id:8, producePlaceCd:"ZZ998", producePlaceName:"サンプルＤ"},
        { id:9, producePlaceCd:"ZZ999", producePlaceName:"サンプルＥ"},
      ],
      selectItem:[],
      place: null,
    }
  },
  methods: {
    // クリアボタン
    clearList() {
      this.items = [];
    },
    select() {
      this.items = this.itemsPlaceList;
    },
    // ダイアログ 戻るボタン
    cancelModal() {
      this.dialog = false;
      // this.$emit('result', { res: false });
    },
    // ダイアログ 決定ボタン
    closeModal() {
      this.dialog = false;
      for (const rowInfo of this.itemsPlaceList) {
        if (rowInfo.id == this.selectItem) {
          // this.place = rowInfo.producePlaceCd;
          this.place = rowInfo.producePlaceName;
          // this.$emit('result', { res: true, cd: rowInfo.producePlaceCd });
          break;
        }
      }
    },
  },
  computed: {
    shownHeaders() {
      return this.headersPlace.filter(h => h.shown);
    },
  },
  mounted: function() {
    this.place = this.value;
  },
}
</script>

<style scoped>
.backColor {
  background-color: #74992e;
}
.titleFont {
  font-weight: bold;
  color: blue;
  font-size: 1.3rem;
}
.outer {
  display: table;
  width: 100%;
}
.searchCondition {
  background-color: gray;
}
.textBox {
  font-size: 16px; /*フォントサイズ*/
  border: 1px solid #999999; /*ボーダー*/
  padding: 2px; /*パディング*/
  border-radius: 3px; /*角丸にする*/
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1) inset; /*影を付ける*/
  width: 300px;
  height: 40px;
}
.v-subheader {
  height: 40px;
  min-width: 90px;
  max-width:90px;
  width:90px;
  background-color: #cfd8dc;
  font-weight: bold;
  border-radius: 3px;
  white-space: nowrap;
}

.compact-form {
  transform: scale(0.75);
/*  transform-origin: right;*/
}

#overlay {
  z-index: 99;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  z-index: 100;
  width: "900px";
  height: "350px";
  padding: 1em;
  background: #ffffff;
}

.size-f {
  transform: scale(0.75);
}
</style>