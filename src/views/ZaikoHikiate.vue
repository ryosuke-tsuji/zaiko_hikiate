<template>
  <div>
    <GamenInfo><template v-slot:GamenName>在庫引当</template></GamenInfo>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
            <v-expansion-panels v-model="panelState">
              <v-expansion-panel>
                <v-expansion-panel-header class="py-0 d-inline-flex">
                    <span class="px-0 titleFont leyerBottom">検索条件</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">管理部署</v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto"></v-text-field>
                      <div style="width:430px"></div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">デポ</v-subheader>
                      <v-text-field class="required" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                      <div style="width:210px"></div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">品種</v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto"></v-text-field>
                      <div style="width:610px"></div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">輸送手段</v-subheader>
                      <v-select :items="binUnsoCdList" dense outlined hide-details="auto"></v-select>
                      <div style="width:80px"></div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="6">
                      <v-subheader class="mr-2">出荷日</v-subheader>
                      <v-text-field class="ymd" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD" @click:append="appendClick"></v-text-field>
                      <span style="vertical-align: middle" class="pl-1 pr-1 pt-2">～</span>
                      <v-text-field class="ymd" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD"></v-text-field>
                      <div style="width:270px"></div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">事&emsp;注番</v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto" class="chuban1"></v-text-field>
                      <v-text-field outlined dense clearable hint="" hide-details="auto" class="chuban2"></v-text-field>
                      <div style="width:15px"></div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">引当状況</v-subheader>
                      <v-select :items="hikiateStatusList" dense outlined hide-details="auto" multiple></v-select>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">在庫有無</v-subheader>
                      <v-select :items="zaikoUmuList" dense outlined hide-details="auto"></v-select>
                      <div style="width:80px"></div>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-col class="d-flex justify-end mr-5">
                      <v-btn class="mr-2 mb-3" depressed outlined large @click="clearList">クリア</v-btn>
                      <v-btn class="primary mb-3" depressed large @click="select"><span>検索</span></v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">検索結果</span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeaders" :items="itemList" item-key="ID" dense multi-sort fixed-header show-select no-data-text="検索してください。" height=400>
              <template #[`item.jun`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.jun" class="junArea textRight" /> 
              </template>
              <template #[`item.weight`]="{ item }">
                <div style="text-align: right;">{{item.weight}}</div>
              </template>
              <template #[`item.shijiCnt`]="{ item }">
                <div style="text-align: right;">{{item.shijiCnt}}</div>
              </template>

              <template #[`item.address`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <span v-on="on">{{item.address}}</span>
                  </template>
                  <span>{{item.address}}</span>
                </v-tooltip>
              </template>

              <template #[`item.productName`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <span v-on="on">{{item.productName}}</span>
                  </template>
                  <span>{{item.productName}}</span>
                </v-tooltip>
              </template>

            </v-data-table>
            <div style="height:40px"></div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="hoverBtn">
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large href="zaiko_hikiate"><span>戻る</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
          <v-btn class="mx-5 mb-3 secondary" large href="zaiko_hikiate"><span>一括引当</span></v-btn>
          <v-btn class="mx-5 mb-3 secondary" large href="zaiko_hikiate_kobetsu/1"><span>個別引当</span></v-btn>
          <v-btn class="mx-5 mb-3 secondary" large @click="hikiateCancel"><span>引当取消</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-end ml-10">
          <v-btn class="ml-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-navigation-drawer v-model="drawer" absolute clipped right>
      <v-list-item>
        <v-list-item-title />
      </v-list-item>
      <v-divider></v-divider>
      <table>
        <draggable v-model="headers" tag="tbody" class="dragArea list-group">
          <tr v-for="header in shownHeaders" :key="header.displayOrder">
            <td class="text-center" scope="row" width="40"><input type="checkbox" v-model="header.shown"></td>
            <td>{{header.text}}</td>
            <td><input type="number" min="1" class="text-end" v-model="header.width" style="width:50px; text-align:right;"></td>
            <td><img src="@/assets/menu.png" width=20></td>
          </tr>
        </draggable>
      </table>
      <v-btn @click="cancel"><span>キャンセル</span></v-btn>
      <v-btn @click="save"><span>保存</span></v-btn>
    </v-navigation-drawer>

  </div>
</template>

<script>
import GamenInfo from '@/components/common/Header.vue'
import draggable from "vuedraggable"
export default {
  data() {
    return {
      drawer: false,
      panelState: 0,
      headers: [
        { displayOrder: 2,  text: '順',       value: 'jun',           width: 65,  shown: '1', },
        { displayOrder: 3,  text: '出荷日',   value: 'shippingDate',  width: 90,  shown: '1', },
        { displayOrder: 4,  text: '到着日時', value: 'arrivalTime',   width: 120, shown: '1', },
        { displayOrder: 5,  text: '住所',     value: 'address',       width: 150, shown: '1', },
        { displayOrder: 6,  text: '届先名',   value: 'destName',      width: 120, shown: '1', },
        { displayOrder: 7,  text: '注番',     value: 'orderNo',       width: 130, shown: '1', },
        { displayOrder: 8,  text: '得意先',   value: 'customerName',  width: 150, shown: '1', },
        { displayOrder: 9,  text: '品名',     value: 'productName',   width: 180, shown: '1', },
        { displayOrder: 10, text: '内訳№',   value: 'uchiwakeNo',    width: 90,  shown: '1', },
        { displayOrder: 11, text: '内訳名',   value: 'uchiwakeName',  width: 100, shown: '1', },
        { displayOrder: 12, text: '重量',     value: 'weight',        width: 100, shown: '1', },
        { displayOrder: 13, text: '指示数',   value: 'shijiCnt',      width: 100, shown: '1', },
        { displayOrder: 14, text: '営業備考', value: 'eigyoBiko',     width: 120, shown: '1', },
        { displayOrder: 1,  text: '',         value: 'ID',            width: 65,  shown: '2', sortable: false, },
      ],
      itemList: [],
      resultList: [
        {
          ID: "1",
          jun: "",
          shippingDate: "07/15",
          arrivalTime: "07/15 08:00 - 12:00",
          address: "東京都墨田区文花２－１－３",
          destName: "東京工場",
          orderNo: "4	QDA9Q2",
          customerName: "花王",
          productName: "９１８６４３　ＰＶキープＢＣＮ　ＴＰ９Ｂ",
          uchiwakeNo: "－",
          uchiwakeName: "",
          weight: "1,800kg",
          shijiCnt: "42,000 S",
          eigyoBiko: "",
        },
        {
          ID: "2",
          jun: "",
          shippingDate: "07/15",
          arrivalTime: "07/15",
          address: "東京都江戸川区小松川４－９２",
          destName: "㈲ヨコヤマ",
          orderNo: "4	8A61Q2",
          customerName: "コカ・コーラ",
          productName: "７ミリヨウチューブ",
          uchiwakeNo: "01",
          uchiwakeName: "本体",
          weight: "300kg",
          shijiCnt: "64,000 S",
          eigyoBiko: "",
        },
        {
          ID: "3",
          jun: "",
          shippingDate: "07/15",
          arrivalTime: "07/15",
          address: "東京都江戸川区小松川４－９２",
          destName: "㈲ヨコヤマ",
          orderNo: "4	8O45S2",
          customerName: "コカ・コーラ",
          productName: "１１５＿７Ｍ／Ｍ　ヨウ　リング",
          uchiwakeNo: "01",
          uchiwakeName: "本体",
          weight: "500kg",
          shijiCnt: "52,000 S",
          eigyoBiko: "",
        },
        {
          ID: "4",
          jun: "",
          shippingDate: "07/15",
          arrivalTime: "07/15",
          address: "埼玉県志木市中宗岡３－２５－１４",
          destName: "㈲双葉商事",
          orderNo: "4	QBA1R2",
          customerName: "丸美屋食品",
          productName: "７３ＣＪ　チイカワヨウキイリデイカワ",
          uchiwakeNo: "01",
          uchiwakeName: "本体",
          weight: "200kg",
          shijiCnt: "6,048 S",
          eigyoBiko: "",
        },
        // {
        //   ID: "5",
        //   jun: "",
        //   shippingDate: "07/15",
        //   arrivalTime: "07/15 12:00-07/15 17:00",
        //   address: "東京都江戸川区",
        //   destName: "㈲ヨコヤマ",
        //   orderNo: "4 8A61Q2",
        //   customerName: "コカ・コーラ",
        //   productName: "７ミリヨウチューブ",
        //   uchiwakeNo: "01",
        //   uchiwakeName: "",
        //   weight: "300kg",
        //   shijiCnt: "64.000 S",
        //   eigyoBiko: "",
        // },
      ],
      // リストボックスの中身
      inputKbnList: ["新規", "引当取消", "強制完了"],
      binUnsoCdList: ["", "全て", "車建（区域）", "個配（地方）"],
      hikiateStatusList: ["未引当分", "一部引当中", "引当済"],
      zaikoUmuList: ["", "在庫有り分", "在庫無し分"],
      headersBack: null,
    }
  },
  methods: {
    // クリアボタン
    clearList() {
      this.itemList = [];
    },
    select() {
      this.itemList = this.resultList;
      this.panelState = false;
    },
    setting() {
      // 現在の状態を退避
      this.headersBack = this.headers;
      // サブ画面表示
      this.drawer = !this.drawer;
    },
    changeHeaders(headersChild) {
      this.headers = headersChild;
    },
    save() {
      // DB更新処理

      this.drawer = false;
    },
    cancel() {
      // 退避から戻す
      this.headers = this.headersBack;
      this.drawer = false;
    },
    appendClick() {
      // alert("クリックテスト");
    },
    hikiateCancel() {
      var result = confirm("引当を取り消します。よろしいですか？");
      if (result) {
        alert("取り消しました。");
      }
    }
  },
  computed: {
    shownHeaders() {
      return this.headers.filter(h => h.shown == "1");
    },
    draggableHeaders() {
      return this.headers.filter(h => h.shown != "2")
    }
  },
  components: {
    GamenInfo,
    draggable,
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
  background-color: #cfd8dc;
  font-weight: bold;
  border-radius: 3px;
  white-space: nowrap;
}
.required {
  background-color: yellow;
}
.textRight input {
  text-align: right;
}
.chuban1 {
  width: 50px;
}
.chuban2 {
  width: 90px;  
}
.junArea {
  width: 50px;
}

.hoverBtn {
  position: fixed;
  background-color: white;
  bottom: 30px;
  width: 100%;
}
</style>
