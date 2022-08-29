<template>
          <v-app>
    <div id="app">
       <GamenInfo><template v-slot:GamenName>推奨移動先登録（製造仕様書番号別）</template></GamenInfo>
    <div id="overlay" v-show="showContent">
      <div id="content">
        <v-row>
          <v-col class="pb-0">
            <v-form>
              <v-card class="pd-10">
                <v-card-title class="pt-0 pb-2 ml-1">
                  <span class="titleFont d-flex">倉庫ＣＤ検索</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                <hr />
                <v-col sm="2"> </v-col>
                <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="9" style="padding-left: 20px">
                      <v-subheader justify="center" class="mr-2" style="width: 120px">倉庫名称</v-subheader>
                      <v-text-field outlined dense background-color="yellow lighten-3" clearable hint="" style="width: 400px" label="日本梱包" ></v-text-field>
                    </v-col>
                  <v-col>                    
                    <v-btn color="primary" large @click="select" dense>
                      <span> 検索 </span>
                    </v-btn>
                  </v-col>
                  <v-data-table hide-default-header :headers="soukoHeader" :items="soukoList" hide-default-footer style="padding-left: 25px" item-key="radioKey">
                    <template #[`item.radioButton`]="{ item }">
                      <input :id="'Radio_' + item.radioKey" type="radio" :value="item.radioKey"  v-model="selectItemList">
                    </template>
                  </v-data-table>
                </v-row>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
        <v-col sm="2"> </v-col>
        <v-col sm="2"> </v-col>
        <v-row>
          <v-col class="d-flex pt-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" large @click="closeModal">
              <span> 決定 </span>
            </v-btn>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </div>
    </div>
          <v-container fluid>
              <span class="px-0 titleFont"
                >一括入力用
              </span>

           <hr />
           <v-col sm="2"> </v-col>
            <v-row dense>
                    <v-col class="pt-0 pr-1 d-flex" cols="3" >
                      <v-subheader class="mr-2" style="width: 120px">倉庫CD</v-subheader>
            
                 <v-text-field
                    v-model="soukoCodeText"
                   append-icon="mdi-magnify"
                   @click:append="appendClick"
                   readonly
                   outlined
                   label="2001"
                   background-color="yellow lighten-3"
                   dense
                  ></v-text-field>
          
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 120px">倉庫棟</v-subheader>
                      <v-select 
                       :items="[
                        { text: 'A', value: '1' },
                        { text: 'B', value: '2' },
                        { text: 'C', value: '3' },
                        { text: 'D', value: '4' },
                        ]"
                      hide-details
                      item-text="text"
                      item-value="value"
                      label="" dense outlined></v-select>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2" style="width: 120px">ブロック</v-subheader>
                      <v-select 
                       :items="[
                        { text: 'A', value: '1' },
                        { text: 'B', value: '2' },
                        { text: 'C', value: '3' },
                        { text: 'D', value: '4' },
                        ]"
                      hide-details
                      item-text="text"
                      item-value="value"
                      label="" dense outlined>
                      </v-select>
                    </v-col>
                    <v-col style="padding-left: 10px;" justify="end">
                    <v-btn color="primary" @click="search" large><span>反映</span></v-btn>
                </v-col>
            </v-row>

            <v-col sm="2"> </v-col>

           <v-col sm="2"> </v-col>
      <v-row>
        <v-col>
          <v-card>
            <v-data-table :headers="headers" :items="itemList" hide-default-footer fixed-header>
              <template v-slot:[`item.soukoToList`]="{ item }">
                <v-select
                  :items="[
                    { text: 'A', value: '1' },
                    { text: 'B', value: '2' },
                    { text: 'C', value: '3' },
                    { text: 'D', value: '4' },
                  ]"
                  hide-details
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  v-model="item.soukoToList"
                ></v-select>
              </template>
              <template v-slot:[`item.blockNameList`]="{ item }">
                <v-select
                  :items="[
                    { text: 'A', value: '1' },
                    { text: 'B', value: '2' },
                    { text: 'C', value: '3' },
                    { text: 'D', value: '4' },
                  ]"
                  hide-details
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  v-model="item.blockNameList"
                ></v-select>
              </template>
              <template v-slot:[`item.soukoNo`]="{ item }">
                <v-text-field
                  append-icon="mdi-magnify"
                   @click:append="appendClick"
                  outlined
                  dense
                  hide-details
                  v-model="item.soukoNo"
                  label=""
                  background-color="yellow lighten-3"
                  style="width: 100px"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
            <v-col style="padding-left: 10px;">
                <v-btn color="mr-10" @click="backMst" large><span>戻る</span></v-btn>
                
            </v-col>
            <v-col style="padding-left: 700px;" justify="end">
                <v-btn color="primary" @click="confirmMst" large><span>確定</span></v-btn>
            </v-col>
        </v-row>
        </v-container>
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
      showContent: false,
         headers: [
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
          width: 90,
        },
        {
          text: '倉庫名称',
          value: 'soukoName',
          width: 150,
        },
        {
          text: '倉庫棟',
          value: 'soukoToList',
          width: 80,
        },
        {
          text: 'ブロック',
          value: 'blockNameList',
          width: 80,
        },
      ],
      selectItemList:[],
      itemList: [
        {
          jigyoNo:"4",
          clientName:"花王株式会社",
          itemName:"４７７１０５　ＭＧＨＩ　ムコウ　ピロー　１Ａ",
          seizyoSiyoNo:"B2C035601001",
          soukoNo:"2001",
          soukoName:"日本梱包　関宿倉庫",
          soukoToName:"B",
          blockName:"C",
        },
        {
          jigyoNo:"4",
          clientName:"花王株式会社",
          itemName:"４７７１４１　ＭＧＨＩ　ユズ　ピロー　１Ａ",
          seizyoSiyoNo:"B2C036401001",
          soukoNo:"",
          soukoName:"",
          soukoToName:"",
          blockName:"",
        },
      ],
      soukoHeader: [
        {
          text: '選択',
          value: 'radioButton',
          width: 60,
          sortable: false,
        },
        {
          text: '得意先',
          value: 'soukoNo',
          width: 70,
        },
        {
          text: '品名',
          value: 'soukoName',
          width: 300,
        },

      ],
      soukoList: [
        {
          radioKey:"1",
          radioButton:"",
          soukoNo:"2001",
          soukoName:"日本梱包　関宿倉庫",
        },
        {
          radioKey:"2",
          radioButton:"",
          soukoNo:"2002",
          soukoName:"日本梱包　幸手倉庫",
        },
        {
          radioKey:"3",
          radioButton:"",
          soukoNo:"2003",
          soukoName:"日本梱包　群馬倉庫",
        },
      ]
    }),
     methods: {
      appendClick: async function () {
      this.showContent = true;
    },
      closeModal() {
      this.showContent = false;
    },
      clear() {
      this.item = [
        
      ];
    },
     searchMst() {
      confirm('kennsaku');
    },
    backMst() {
      var res = confirm("戻ります。よろしいですか？");
      if (res == true) {
        this.$router.push('/suisyoSearch');
      }
    },
    confirmMst() {
      var target = "";
      var res = confirm("製造仕様書番号xxxxxxの推奨移動先情報を登録します。よろしいですか。？"+ target);
      if (res == true) {
        alert("登録しました。");
      }
  },
  },
}
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
#overlay {
  z-index: 10;

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
  z-index: 20;
  width: 35%;
  padding: 1em;
  background: #ffffff;
}
</style>