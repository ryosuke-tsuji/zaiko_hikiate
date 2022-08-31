<template>
  <div>
    <GamenInfo><template v-slot:GamenName>在庫引当&emsp;引当確定</template></GamenInfo>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
            <v-expansion-panels v-model="panelState">
              <v-expansion-panel>
                <v-expansion-panel-header class="py-0 d-inline-flex">
                    <span class="px-0 titleFont leyerBottom">輸送指示抽出条件</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">管理部署</v-subheader>
                      <div>生活産業</div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">デポ</v-subheader>
                      <div>EW0A 幸手</div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">品種</v-subheader>
                      <div></div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">輸送手段</v-subheader>
                      <div>車建</div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="6">
                      <v-subheader class="mr-2">出荷日</v-subheader>
                      <div>2022/07/15 ～ 2022/07/15</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">事&emsp;注番</v-subheader>
                      <div></div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">引当状況</v-subheader>
                      <div>未引当分</div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex align-center" cols="3">
                      <v-subheader class="mr-2">在庫有無</v-subheader>
                      <div></div>
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
        <v-col class="pb-0">
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">引当結果</span><v-spacer></v-spacer><span class="text-right leyerTop"></span>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeaders" :items="itemList" item-key="ID" dense multi-sort fixed-header show-select height="300px">
              <template #[`item.status`]="{ item }">
                <!-- ここの条件をフラグ値にすればアイコン出る。 -->
                <v-icon v-if="item.statusCd == 1" color="yellow darken-3" text class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert</v-icon>
                <v-icon v-if="item.statusCd == 2" color="yellow darken-3" text class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert</v-icon>
                <v-icon v-if="item.statusCd == 3" color="yellow darken-3" text class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert</v-icon>
                <span class="errorStatus">{{ item.status }}</span>
              </template>
              <template #[`item.shijiCnt`]="{ item }">
                <div style="text-align: right;">{{item.shijiCnt}}</div>
              </template>
              <template #[`item.hikiateCnt`]="{ item }">
                <div style="text-align: right;">{{item.hikiateCnt}}</div>
              </template>
              <template #[`item.fusokuCnt`]="{ item }">
                <div v-if="item.fusokuCnt==0" style="text-align: right;">{{item.fusokuCnt}}</div>
                <div v-else class="text-end errorStatus" >{{item.fusokuCnt}}</div>
              </template>
              <template #[`item.data-table-select`]="{ item, isSelected, select }">
                <v-simple-checkbox v-if="item.fusokuCnt != ``" :value="isSelected" @input="select($event)"></v-simple-checkbox>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large href="zaiko_hikiate"><span>戻る</span></v-btn>
          <v-btn class="mr-10 mb-3 secondary" large href="zaiko_hikiate_kobetsu/1"><span>修正</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
<!--
          <v-btn class="mx-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
-->
        </v-col>

        <v-col class="d-flex justify-end ml-10">
          <v-btn class="ml-10 mb-3 primary" large @click="kakutei"><span>確定</span></v-btn>
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
          <tr v-for="header in headers" :key="header.displayOrder">
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
      headers: [
        { displayOrder: 2,  text: '出荷日',     value: 'shippingDate',  width: 90,  shown: true, },
        { displayOrder: 3,  text: '届先名',     value: 'destName',      width: 120, shown: true, },
        { displayOrder: 4,  text: '注番',       value: 'orderNo',       width: 130, shown: true, },
        { displayOrder: 5,  text: '得意先',     value: 'customerName',  width: 150, shown: true, },
        { displayOrder: 6,  text: '品名',       value: 'productName',   width: 180, shown: true, },
        { displayOrder: 7,  text: '内訳№',     value: 'uchiwakeNo',    width: 90,  shown: true, },
        { displayOrder: 8,  text: '内訳名',     value: 'uchiwakeName',  width: 100, shown: true, },
        { displayOrder: 9,  text: '指示数',     value: 'shijiCnt',      width: 100, shown: true, },
        { displayOrder: 10, text: '引当数',     value: 'hikiateCnt',    width: 100, shown: true, },
        { displayOrder: 11, text: '不足数',     value: 'fusokuCnt',     width: 100, shown: true, },
        { displayOrder: 12, text: 'ステータス', value: 'status',        width: 100, shown: true, },
        { displayOrder: 13, text: '倉庫',       value: 'soko',          width: 100, shown: true, },
        { displayOrder: 14, text: '',           value: 'statusCd',      width: 100, shown: false, },
        { displayOrder: 15, text: '',           value: 'ID',            width: 65,  shown: false, sortable: false, },
      ],
      itemList: [
        {
          ID: "1",
          shippingDate: "07/15",
          destName: "東京工場",
          orderNo: "4	QDA9Q2",
          customerName: "花王",
          productName: "９１８６４３　ＰＶキープＢＣＮ　ＴＰ９Ｂ",
          uchiwakeNo: "－",
          uchiwakeName: "",
          shijiCnt: "42,000 S",
          hikiateCnt: "42,000",
          fusokuCnt: "0",
          status: "",
          statusCd: "0",
          soko: "1810 関宿物流センター",
        },
        {
          ID: "2",
          shippingDate: "07/15",
          destName: "㈲ヨコヤマ",
          orderNo: "4	8A61Q2",
          customerName: "コカ・コーラ",
          productName: "７ミリヨウチューブ",
          uchiwakeNo: "01",
          uchiwakeName: "本体",
          shijiCnt: "64,000 S",
          hikiateCnt: "57,600",
          fusokuCnt: "-6,400",
          status: "一部欠品",
          statusCd: "1",
          soko: "1810 関宿物流センター",
        },
        {
          ID: "3",
          shippingDate: "07/15",
          destName: "㈲ヨコヤマ",
          orderNo: "4	8O45S2",
          customerName: "コカ・コーラ",
          productName: "１１５＿７Ｍ／Ｍ　ヨウ　リング",
          uchiwakeNo: "01",
          uchiwakeName: "本体",
          shijiCnt: "52,000 S",
          hikiateCnt: "37,500",
          fusokuCnt: "0",
          status: "強制決定",
          statusCd: "2",
          soko: "1810 関宿物流センター",
        },
        {
          ID: "4",
          shippingDate: "",
          destName: "",
          orderNo: "",
          customerName: "",
          productName: "",
          uchiwakeNo: "",
          uchiwakeName: "",
          shijiCnt: "",
          hikiateCnt: "7,500",
          fusokuCnt: "",
          status: "",
          statusCd: "",
          soko: "1220 盛運羽生倉庫",
        },
        {
          ID: "5",
          shippingDate: "07/15",
          destName: "㈲双葉商事",
          orderNo: "4	QBA1R2",
          customerName: "丸美屋食品",
          productName: "７３ＣＪ　チイカワヨウキイリデイカワ",
          uchiwakeNo: "01",
          uchiwakeName: "本体",
          shijiCnt: "6,048 S",
          hikiateCnt: "0",
          fusokuCnt: "0",
          status: "引当保留",
          statusCd: "3",
          soko: "",
        },
      ],
      headersBack: null,
      panelState: 0,
    }
  },
  methods: {
    kakutei() {
      var result = confirm("引当を確定します。よろしいですか？");
      if (result) {
        alert("確定しました。");
        this.$router.push("zaiko_hikiate");
      }
    },
    setting() {
      // 現在の状態を退避
      this.headersBack = this.headers;
      // サブ画面表示
      this.drawer = !this.drawer;
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
  },
  computed: {
    shownHeaders() {
      return this.headers.filter(h => h.shown);
    },
  },
  components: {
    GamenInfo,
    draggable,
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

.errorStatus {
  /* text-danger */
  color: red;
}

.leyerTop {
  position: absolute; 
  left: 150px;
  z-index: 100;
}

</style>