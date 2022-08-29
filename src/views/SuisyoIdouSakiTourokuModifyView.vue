<!-- eslint-disable vue/valid-template-root -->
<template>
  <v-app>
    <div id="app">
      <GamenInfo><template v-slot:GamenName>推奨移動先登録（製造仕様書番号別）修正</template></GamenInfo>
      <v-main>
          <v-container fluid>
              <span class="px-0 titleFont"
                >検索条件
              </span>
              
            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">製造仕様書番号</v-subheader>
                      <v-col sm="6" class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: yellow">
                        {{ item.seizyoBango }}</v-col>
                    </v-col>

             <v-col style="padding-left: 10px;">
                <v-btn style="height: 27px;" color="mr-10" @click="clear"><span>クリア</span></v-btn>
                <v-btn style="height: 27px;" color="primary" @click="search"><span>検索</span></v-btn>
             </v-col>
            </v-row>

           <v-col sm="2"> </v-col>
           <hr />
           <v-col sm="2"> </v-col>


        <span class="px-0 titleFont" >アイテムマスタ登録情報</span>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">製造仕様書番号</v-subheader>
                      <v-col sm="5" class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                        {{ item.seizyoBango }}</v-col>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 120px">得意先品番</v-subheader>
                      <v-col sm="5" class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                        {{ item.tokuisakiHinban }}</v-col>
                    </v-col>
            </v-row>
        
            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">管理部署コード</v-subheader>
                      <v-col sm="5" class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                        {{ item.kanribusyoCode }}</v-col>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 120px">事業部コード</v-subheader>
                      <v-col sm="5" class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                        {{ item.jigyobuCode }}</v-col>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">得意先コード</v-subheader>
                      <v-col sm="5" class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                        {{ item.tokuisakiCode }}</v-col>
                    </v-col>
            </v-row>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="8">
                      <v-subheader class="mr-2" style="width: 130px">品名</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                         {{ item.hinnmei }}</v-col>
                    </v-col>
            </v-row>

            <v-col sm="2"> </v-col>
            <v-col sm="2"> </v-col>

            <span class="px-0 titleFont" >移動先倉庫情報</span>

            <v-row dense>
              <v-col class="pt-0 pr-1" cols="4">
                      <v-subheader class="mr-2" style="padding-left: 180px; width: 435px">登録情報</v-subheader>
              </v-col>
              <v-col class="pt-0 pr-1" cols="4">
                      <v-subheader class="mr-2" style="padding-left: 180px; width: 435px">修正内容</v-subheader>
              </v-col>
            </v-row>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2" style="width: 120px">倉庫コード*</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                         {{ item.soukoCode }}</v-col>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0; margin-left: 10px">
                         {{ item.soukoCodeName }}</v-col>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2" style="width: 120px">倉庫コード*</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: yellow">
                         {{ item.soukoCode2 }}
                         <v-img contain class="shrink mr-2" max-width="25" max-height="25" src="../assets/kensakuimage.png"  />
                         </v-col>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="margin-left: 10px">
                         {{ item.soukoCodeName2 }}</v-col>
                    </v-col>
            </v-row>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2" style="width: 120px">倉庫棟*</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                         {{ item.soukoTouCode }}</v-col>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0; margin-left: 10px">
                         {{ item.soukoTouCodeName }}</v-col>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2" style="width: 120px">倉庫棟*</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: yellow">
                         {{ item.soukoTouCode2 }}
                         <v-img contain class="shrink mr-2" max-width="25" max-height="25" src="../assets/kensakuimage.png"  />
                         </v-col>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="margin-left: 10px">
                         {{ item.soukoTouCodeName2 }}</v-col>
                    </v-col>
            </v-row>

            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2" style="width: 120px">ブロック</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                         </v-col>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0; margin-left: 10px">
                         </v-col>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2" style="width: 120px">ブロック</v-subheader>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="background-color: #C0C0C0">
                         <v-img contain class="shrink mr-2" max-width="25" max-height="25" src="../assets/kensakuimage.png"  />
                         </v-col>
                      <v-col class="text-start cols-border pt-0 pr-1 d-flex" style="margin-left: 10px">
                         </v-col>
                    </v-col>
            </v-row>

            <v-row>
              <v-col style="padding-left: 10px;">
                <v-btn style="height: 27px;" color="mr-10" @click="backMst"><span>戻る</span></v-btn>
                
             </v-col>
             <v-col justify="end">
              <v-btn  style="height: 27px;" color="primary" @click="confirmMst"><span>確定</span></v-btn>
             </v-col>
            </v-row>
          </v-container>

        <!-- フッターボタン -->
        <!-- 別Vue参照。サンプル提供のため削除してます -->
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
    results: [
    ],
     item: {
    seizyoBango: 'SIZSHYNO１',
    tokuisakiHinban: 'ＨＮＢ００１',
    kanribusyoCode: '4',
    jigyobuCode: '4',
    tokuisakiCode: '',
    hinnmei: '月桂冠　清酒大容量パック１．８L',
    soukoCode: 'SOU001',
    soukoCodeName: '門前倉庫',
    soukoTouCode: 'TOU0A',
    soukoTouCodeName: 'A棟　xxxxエリア',
    soukoCode2: 'SOUTK1',
    soukoCodeName2: '○○倉庫',
    soukoTouCode2: 'TOU0B',
    soukoTouCodeName2: 'B棟　xxxxエリア',
  }
  }),

  computed: {},
  methods: {
     clear() {
      this.item = [
        
      ];
    },
     search() {
      confirm('kennsaku');
    },
      backMst() {
      alert('戻りますか？');
    },
    confirmMst() {
      var target = "";
      var res = confirm("製造仕様書番号xxxxxxの推奨移動先情報を修正します。よろしいですか。？"+ target);
      if (res == true) {
        alert("修正しました。");
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
</style>
