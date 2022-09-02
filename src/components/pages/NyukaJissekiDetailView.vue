<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
            <v-expansion-panels v-model="panelState">
              <v-expansion-panel>
                <v-expansion-panel-header class="pt-0 d-inline-flex" style="padding-bottom: 0px">
                  <span class="px-0 titleFont">入荷ヘッド</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">注番</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="CHBN01"/>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">製造仕様書№</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="SIZSHYSH01"/>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">得意先</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="○○紙工"/>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">品名</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="○○パッケージ" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">内訳</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="00001：○○ロール" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">部品</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="00001：○○ロール部品１" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">工程</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="00001：A：オフセット" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">製品区分</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="製品" />
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">巻m数(付方)</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="1,000m" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">パレット数</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="3" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">受注数</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="10,000m" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">入荷累計数</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="10,000m" />
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex">
                      <v-subheader class="mr-2">入荷実績数</v-subheader>
                      <v-text-field outlined dense readonly hide-details="auto" value="10,000m" />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-form>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">入荷実績明細一覧</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="itemList" item-key="radioButtonID" v-model="tableSelected" dense>
              <template #[`item.radioButtonID`]="{ item }">
                <input :id="'Radio_' + item.radioButtonID" type="radio" :value="item.radioButtonID"  v-model="selectItemList">
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify mx-10">
          <v-btn href="nyuka" class="mr-10 mb-3" depressed outlined large><span>戻る</span></v-btn><v-spacer/>
          <v-btn class="primary  mb-3" large @click="waste"><span>廃棄</span></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableSelected: [],
      headers: [
        {
          text: '選択',
          value: 'radioButtonID',
          width: 60,
          sortable: false,
        },
        {
          text: '引渡票№',
          value: 'deliveryNo',
          width: 100,
        },
        {
          text: '入荷年月日',
          value: 'nyukaYMD',
          width: 120,
        },
        {
          text: '生産年月日',
          value: 'productionYMD',
          width: 120,
        },
        {
          text: 'ロット',
          value: 'lotNo',
          width: 90,
        },
        {
          text: '入荷区分',
          value: 'nyukaKbn',
          width: 100,
        },
        {
          text: '入数/巻m数',
          value: 'nyukaNum',
          width: 120,
          align: 'end',
        },
        {
          text: '内装',
          value: 'interior',
          width: 80,
          align: 'end',
        },
        {
          text: '箱数',
          value: 'boxNum',
          width: 80,
          align: 'end',
        },
        {
          text: '数量',
          value: 'quantityNum',
          width: 100,
          align: 'end',
        },
        {
          text: '単',
          value: 'quantityUnit',
          width: 80,
        },
        {
          text: '換算数',
          value: 'conversionNum',
          width: 100,
          align: 'end', 
        },
        {
          text: '単',
          value: 'conversionUnit',
          width: 80,
        },
        {
          text: 'ロケーション',
          value: 'location',
          width: 150,
        },
        {
          text: 'ステータス',
          value: 'status',
          width: 120,
        },
        {
          text: '備考',
          value: 'biko',
          width: 200,
        },
        {
          text: '受信時間',
          value: 'receuveTime',
          width: 200,
        },
      ],
      itemList: [
        {
          radioButtonID:"1",
          deliveryNo:"HKWTS01",
          nyukaYMD:"2021/10/18",
          productionYMD:"2021/10/15",
          lotNo:"1",
          nyukaKbn:"通常",
          nyukaNum:"1,000",
          interior:"2",
          boxNum:"1",
          quantityNum:"2,000",
          quantityUnit:"m",
          conversionNum:"2",
          conversionUnit:"巻",
          location:"○○工場",
          status:"入荷済み",
          biko:"正巻",
          receuveTime:"2021/10/15 12:00",
        },
        {
          radioButtonID:"2",
          deliveryNo:"HKWTS02",
          nyukaYMD:"2021/10/18",
          productionYMD:"2021/10/15",
          lotNo:"2",
          nyukaKbn:"通常",
          nyukaNum:"1,000",
          interior:"2",
          boxNum:"1",
          quantityNum:"2,000",
          quantityUnit:"m",
          conversionNum:"2",
          conversionUnit:"巻",
          location:"○○工場",
          status:"入荷済み",
          biko:"正巻",
          receuveTime:"2021/10/15 13:00",
        },
        {
          radioButtonID:"3",
          deliveryNo:"HKWTS03",
          nyukaYMD:"2021/10/18",
          productionYMD:"2021/10/15",
          lotNo:"3",
          nyukaKbn:"通常",
          nyukaNum:"500",
          interior:"1",
          boxNum:"1",
          quantityNum:"500",
          quantityUnit:"m",
          conversionNum:"0.1",
          conversionUnit:"巻",
          location:"○○工場",
          status:"検査中",
          biko:"端巻",
          receuveTime:"2021/10/16 12:00",
        },
      ],
      selectItemList:[],
      panelState: 0,
    }
  },
  methods: {
    waste() {
      var target = "";
      // for (const row of this.tableSelected) {
      //   if (row.radioButtonID) {
      //     target += row.radioButtonID + " " + row.deliveryNo;
      //   }
      // }
      var res = confirm("廃棄します。よろしいですか？\n"+ target);
      if (res == true) {
        alert("廃棄しました。");
      }
    },
  },
  components: {
  },

}

</script>

<style>
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

</style>