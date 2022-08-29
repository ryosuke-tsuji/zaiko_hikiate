<template>
      <v-app>
    <div id="app">
       <GamenInfo><template v-slot:GamenName>推奨移動先登録（製造仕様書番号別）</template></GamenInfo>
      <v-main>
          <v-container fluid>
              <span class="px-0 titleFont"
                >検索条件
              </span>

           <hr />
           <v-col sm="2"> </v-col>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 116px">製造仕様書番号</v-subheader>
                     <v-text-field v-model="kensakuZyoken.seizyoSiyouNoSearch" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                    </v-col>


            </v-row>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader justify="center" class="mr-2" style="width: 120px">得意先</v-subheader>
                      <v-text-field v-model="kensakuZyoken.tokuiSakiSearch" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 120px">品名</v-subheader>
                     <v-text-field v-model="kensakuZyoken.hinMeiSearch" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 120px">登録区分
                      </v-subheader>
                      <v-select :items="tourokuKubunList" label="区分" dense outlined hide-details="auto"></v-select>
                    </v-col>
            </v-row>

            <v-row>
              <v-col></v-col>
               <v-col></v-col>
                <v-col></v-col>
                <v-col style="padding-left: 10px;" justify="end">
                    <v-btn style="height: 27px;" color="mr-10" @click="clear"><span>クリア</span></v-btn>
                    <v-btn style="height: 27px;" color="primary" @click="search"><span>検索</span></v-btn>
                </v-col>
            </v-row>

            <v-col sm="2"> </v-col>
            <span class="px-0 titleFont"
                >検索結果
            </span>

            <hr />
           <v-col sm="2"> </v-col>
      <v-row>
        <v-col>
          <v-card>
            <v-row no-gutters>
              <v-radio style="padding-left: 15px" class="radio"></v-radio><v-col class="mr-2" sm="4">全選択</v-col>
            </v-row>
            <v-data-table :headers="headers" :items="itemList" hide-default-footer>
              <template #[`item.radioButton`]="{ item }">
                <v-radio-group v-model="item.radioButton" class="radio">
                  <v-radio />
                </v-radio-group>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
            <v-col style="padding-left: 10px;">
                <v-btn style="height: 27px;" color="mr-10" @click="backMst"><span>戻る</span></v-btn>
                
            </v-col>
            <v-col style="padding-left: 10px;">
                <v-btn style="height: 27px;" color="mr-10" @click="confirmMst"><span>登録</span></v-btn>
                <v-btn style="height: 27px;" color="mr-10" @click="wasteMst"><span>破棄</span></v-btn>
                <v-btn style="height: 27px;" color="mr-10" @click="hukatuMst"><span>復活</span></v-btn>
            </v-col>
            </v-row>
          </v-container>
      </v-main>
    </div>
      </v-app>

</template>
<script>
import GamenInfo from '../components/common/Header.vue'
export default {
  components: {
    GamenInfo
  },

  data: () => ({
    kensakuZyoken: {
    seizyoSiyouNoSearch: '',
    hinMeiSearch: '',
    tokuiSakiSearch: '',
    },
    results: [
    ],
     headers: [
        {
          text: '選択',
          value: 'radioButton',
          width: 30,
          sortable: false,
        },
        {
          text: '事業部',
          value: 'jigyoNo',
          width: 60,
        },
        {
          text: '得意先',
          value: 'clientName',
          width: 70,
        },
        {
          text: '品名',
          value: 'itemName',
          width: 300,
        },
        {
          text: '製造仕様書番号',
          value: 'seizyoSiyoNo',
          width: 60,
        },
        {
          text: '倉庫CD',
          value: 'soukoNo',
          width: 60,
        },
        {
          text: '倉庫棟',
          value: 'soukoToName',
          width: 60,
        },
        {
          text: 'ブロック',
          value: 'blockName',
          width: 70,
        },
        {
          text: '廃棄',
          value: 'hakiName',
          width: 60,
        },
      ],
      itemList: [
        {
          radioButton:"",
          jigyoNo:"4",
          clientName:"花王株式会社",
          itemName:"４７７１３１　ＭＧＨＩ　カモ　ピロー　１Ａ",
          seizyoSiyoNo:"B2C036101001",
          soukoNo:"1810",
          soukoToName:"A",
          blockName:"",
          hakiName:"D",
        },
        {
          radioButton:"",
          jigyoNo:"4",
          clientName:"花王株式会社",
          itemName:"４７７１０５　ＭＧＨＩ　ムコウ　ピロー　１Ａ",
          seizyoSiyoNo:"B2C035601001",
          soukoNo:"1810",
          soukoToName:"B",
          blockName:"C",
          hakiName:"",
        },
        {
          radioButton:"",
          jigyoNo:"4",
          clientName:"花王株式会社",
          itemName:"４７７１４１　ＭＧＨＩ　ユズ　ピロー　１Ａ",
          seizyoSiyoNo:"B2C036401001",
          soukoNoe:"",
          soukoToName:"",
          blockName:"",
          hakiName:"",
        },
        {
          radioButton:"",
          jigyoNo:"4",
          clientName:"花王株式会社",
          itemName:"４７７１０５　ＭＧＨＩ　ムコウ　ピロー　１Ａ",
          seizyoSiyoNo:"B2C035601001",
          soukoNo:"",
          soukoToName:"",
          blockName:"",
          hakiName:"",
        },
      ],
    tourokuKubunList:["登録", "未登録"],
  }),

  computed: {},
  methods: {
      clear() {
      this.itemList = [
        
      ];

      this.kensakuZyoken = [

      ]
    },
     searchMst() {
      confirm('kennsaku');
    },
     backMst() {
      alert('戻りますか？');
    },
    confirmMst() {
      var target = "";
      var res = confirm("製造仕様書番号xxxxxxの推奨移動先情報を登録します。よろしいですか。？"+ target);
      if (res == true) {
        alert("登録しました。");
      }
  },
  },
};
</script>
<style scoped>
.fields {
  margin: 10px 10px 10px 10px;
}
.cols-border {
  border: 1px solid black !important;
  font-weight: bolder;
  white-space: nowrap;
}
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
  background-color: #cfd8dc;
  font-weight: bold;
  border-radius: 3px;
  white-space: nowrap;
}

.TableRadioBtn {
  height: 12px;
  margin: 0;
  padding: 0;
}
.layerBottom {
  position: absolute; 
  z-index: 50;
}
.leyerTop {
  position: absolute; 
  left: 150px;
  z-index: 100;
}

.ymd {
  width: 170px;
  height: 40px;
  background-color: yellow;
}
.depo {
  width: 90px;
  height: 40px;
  background-color: yellow;
}
.depoName {
  width: 120px;
}
.ninushi {
  width: 60px;
}
.nyukaKbn {
  width: 120px;
}
.chuban1 {
  width: 60px;
  height: 40px;
  background-color: yellow;
}
.chuban2 {
  width: 90px;  
  height: 40px;
  background-color: yellow;
}
.sokoTo {
  width: 120px;
}
.displayKbn {
  width: 220px;
}
.productKbnC {
  width: 150px;
}
.daiHinsyu {
  width: 150px;
}
.chuHinsyu {
  width: 150px;
}
.status {
  width: 150px;
}
</style>