<template>
  <div id="overlay" v-show="showContent">
    <div id="content">
      <v-row>
        <v-col class="pb-0">
            <v-card-title class="pt-2 pb-2 pl-0">
              <span class="titleFont d-flex">車両番号&ensp;輸送会社選択画面</span>
            </v-card-title>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex py-1" cols="4">
          <v-subheader class="mr-2">管理部署</v-subheader>
          <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="2" style="max-width: 70px"></v-text-field>
        </v-col>
        <v-col class="d-flex py-1" cols="4">
          <v-subheader class="mr-2"><div style="text-align:center; width:100%;">デポ</div></v-subheader>
          <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="4" style="max-width: 90px"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex py-1" cols="4">
          <v-subheader class="mr-2"><div style="text-align:center; width:100%;">屯車</div></v-subheader>
          <v-select :items="tonList" dense outlined hide-details="auto" style="max-width: 90px"></v-select>
        </v-col>
        <v-col class="d-flex py-1" cols="4">
          <v-subheader class="mr-2"><div style="text-align:center">運送会社</div></v-subheader>
          <v-text-field outlined dense clearable hint="" hide-details="auto" style="max-width: 150px"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex py-1" cols="4">
          <v-subheader class="mr-2 pl-3"><div style="text-align:center">ドライバー</div></v-subheader>
          <v-text-field outlined dense clearable hint="" hide-details="auto" style="max-width: 150px"></v-text-field>
        </v-col>
        <v-col class="d-flex py-1" cols="5">
          <v-subheader class="mr-2"><div style="text-align:center; width:100%;">使用便</div></v-subheader>
          <v-select outlined dense hide-details="auto" :items="useBinList" item-text="text" item-value="value" multiple style="max-width: 250px"></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end mr-5">
          <v-btn class="mr-2 mb-0" depressed outlined large @click="clearList">クリア</v-btn>
          <v-btn class="primary mb-0" depressed large @click="select"><span>検索</span></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table :headers="headersCarSearch" :items="itemsCarSearch" item-key="ID" dense multi-sort fixed-header hide-default-footer height=200>
            <template #[`item.ID`]="{ item }">
              <input :id="'Radio_' + item.ID" type="radio" :value="item.ID"  v-model="selectItemList">
            </template>
            <template #[`item.ton`]="{ item }">
              <div style="text-align: right;">{{ item.ton }}{{ item.tonUnit }}</div>
            </template>
            <template #[`item.carNo`]="{ item }">
              <div style="text-align: right;">{{ item.carNo }}</div>
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
          <v-btn class="ml-10 mb-3" depressed outlined large @click.stop="settingModal"><span>設定</span></v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showContent: Boolean,
  },
  data() {
    return {
      headersCarSearch: [
        { text:"",             value:"ID",          width:30, },
        { text:"屯車",         value:"ton",         width:70, },
        { text:"車番",         value:"carNo",       width:80, },
        { text:"運送会社",     value:"companyName", width:300, },
        { text:"ドライバー名", value:"driverName",  width:100, },
        { text:"プレート№",   value:"noPlate",     width:150, },
        { text:"使用便",       value:"useBin",      width:100, },
      ],
      itemsCarSearch: [
        { ID:"1", ton:7.0,  tonUnit:"t", carNo:"99999", companyName:"1640 ヤクルトロジスティックス", driverName:"凸物　太郎", noPlate:"足立 99 あ 1234", useBin:"常傭便", shown: true, manage: false,  },
        { ID:"2", ton:10.0, tonUnit:"t", carNo:"2",     companyName:"", driverName:"", noPlate:"", useBin:"", shown: true, manage: false,  },
        { ID:"3", ton:7.0,  tonUnit:"t", carNo:"33",    companyName:"", driverName:"", noPlate:"", useBin:"", shown: true, manage: false,  },
        { ID:"4", ton:10.0, tonUnit:"t", carNo:"1234",  companyName:"", driverName:"", noPlate:"", useBin:"", shown: true, manage: false,  },
        { ID:"5", ton:7.0,  tonUnit:"t", carNo:"56789", companyName:"", driverName:"", noPlate:"", useBin:"", shown: true, manage: false,  },
      ],
      tonList: ["軽","2.0","3.0","4.0","5.0","6.0","7.0","8.0","10.0","13.0",],
      useBinList: [
        { text:"常傭",                     value: "1" },
        { text:"自社車両",                 value: "2" },
        { text:"仮車版",                   value: "3" },
        { text:"臨時便",                   value: "4" },
        { text:"路線",                     value: "5" },
        { text:"路線（着店チャーター）",   value: "6" },
        { text:"車建（遠距離チャーター）", value: "7" },
        { text:"広域混載便",               value: "8" },
        { text:"宅配",                     value: "A" },
        { text:"軽貨物",                   value: "B" },
        { text:"航空",                     value: "C" },
        { text:"航空（着店チャーター）",   value: "D" },
        { text:"鉄道コンテナ",             value: "E" },
        { text:"営業持ち込み",             value: "F" },
        { text:"生産管理持ち込み",         value: "G" },
        { text:"海上コンテナ",             value: "J" },
        { text:"メール便",                 value: "K" },
        { text:"宅配航空",                 value: "P" },
        { text:"宅配冷蔵",                 value: "Q" },
        { text:"国際（航空）",             value: "V" },
        { text:"国際（海上コンテナ）",     value: "W" },
        { text:"一括委託",                 value: "Y" },
      ],
      selectItemList:[],
    }
  },
  methods: {
    // クリアボタン
    clearList() {
    },
    select() {
    },
    // ダイアログ 戻るボタン
    cancelModal() {
      // this.props.showContent = false;
      this.$emit('result', { res: false });
    },
    // ダイアログ 決定ボタン
    closeModal() {
      // this.props.showContent = false;
      for (const rowInfo of this.itemsCarSearch) {
        if (rowInfo.ID == this.selectItemList) {
          this.$emit('result', { res: true, carNo:rowInfo.carNo });
          break;
        }
      }
    },
    // ダイアログ 設定ボタン
    settingModal() {

    },
  }
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