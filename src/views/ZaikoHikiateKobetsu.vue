<template>
  <div>
    <GamenInfo><template v-slot:GamenName>在庫引当&emsp;吊札個別選択</template></GamenInfo>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">輸送指示ヘッダー</span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-row class="pb-0">
              <v-col class="pb-0">
                <v-data-table :headers="shownHeadersShijiH" :items="itemsShijiH" dense fixed-header hide-default-footer height="auto">
                </v-data-table>
              </v-col>
            </v-row>
            <v-row class="pb-0">
              <v-col cols="5">
                <v-data-table :headers="shownHeadersShijiL" :items="itemsShijiL" dense fixed-header hide-default-footer height="auto" width="auto">
                </v-data-table>
              </v-col>
              <v-col></v-col>
              <v-col cols="3" class="d-flex justify-end">
                <v-data-table :headers="shownHeadersSum" :items="itemsSum" dense fixed-header hide-default-footer disable-sort height="auto" width="auto" id="summarys">
                  <template #[`item.hikiateCnt`]="{ item }">
                    <div style="text-align: right;">{{item.hikiateCnt}}</div>
                  </template>
                  <template #[`item.kansanCnt`]="{ item }">
                    <div style="text-align: right;">{{item.kansanCnt}}</div>
                  </template>
                  <template #[`item.fusokuCnt`]="{ item }">
                    <div style="text-align: right;">{{item.fusokuCnt}}</div>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">吊札個別出庫数</span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeadersKobetsu" :items="itemsKobetsu" dense fixed-header height="300px">
              <template #[`item.suryo`]="{ item }">
                <div style="text-align: right;">{{item.suryo}}</div>
              </template>
              <template #[`item.irisu`]="{ item }">
                <div style="text-align: right;">{{item.irisu}}</div>
              </template>
              <template #[`item.hakosu`]="{ item }">
                <div style="text-align: right;">{{item.hakosu}}</div>
              </template>
              <template #[`item.syukkohakosu`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.syukkohakosu" class="syukkoArea textRight" v-if="item.status != 2" @input="changeSyukko"/> 
              </template>
              <template #[`item.tsurifuraBiko`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.tsurifuraBiko" style="bikoArea" /> 
              </template>
              <template #[`item.fudagamiNo`]="{ item }">
                {{ item.fudagamiNo }}
                <!-- ここの条件をフラグ値にすればアイコン出る。 -->
                <v-icon v-if="item.status == 1" color="orange darken-3" text class="btn-icon mr-2" style="background-color: transparent !important" >mdi-arrow-u-left-top-bold</v-icon>
                <v-icon v-if="item.status == 2" color="red darken-3" class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert-circle</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large href="zaiko_hikiate"><span>戻る</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
          <v-btn class="mx-5 mb-3 secondary" large href="zaiko_hikiate_kakutei"><span>引当保留</span></v-btn>
          <v-btn class="mx-5 mb-3 secondary" large href="zaiko_hikiate_kobetsu2"><span>強制決定</span></v-btn>
          <v-btn class="mx-5 mb-3 primary" large href="zaiko_hikiate_kobetsu1"><span>決定</span></v-btn>
        </v-col>
        <v-col class="d-flex justify-end ml-10">
          {{ $route.params.id }}
<!--
          <v-btn class="ml-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
-->
        </v-col>
      </v-row>
    </v-container>
<!--
    <DragSet v-bind:drawerParent="myDrawer" />
-->
  </div>
</template>

<script>
import GamenInfo from '@/components/common/Header.vue'
// import DragSet from '@/components/common/DragSetting.vue'
export default {
  props: ["id"],
  data() {
    return {
      myDrawer: null,
      headersShijiH: [
        { displayOrder: 1, text: '届先名',   value: 'destinationName', width: 150,  shown: true },
        { displayOrder: 2, text: '注番',     value: 'orderNo',       width: 100, shown: true, },
        { displayOrder: 3, text: '得意先',   value: 'customerName',  width: 150, shown: true, },
        { displayOrder: 4, text: '品名',     value: 'productName',   width: 180, shown: true, },
        { displayOrder: 5, text: '内訳№',   value: 'uchiwakeNo',    width: 90,  shown: true, },
        { displayOrder: 6, text: '内訳名',   value: 'uchiwakeName',  width: 100, shown: true, },
        { displayOrder: 7, text: '重量',     value: 'weight',        width: 100, shown: true, },
        { displayOrder: 8, text: '指示数',   value: 'shijiCnt',      width: 100, shown: true, },
      ],
      headersShijiL: [
        { displayOrder: 1, text: '営業備考',   value: 'eigyoBiko', width: 150,  shown: true },
      ],
      headersSum: [
        { displayOrder: 1,  text: '引当数', value: 'hikiateCnt', width: 100,  shown: true, },
        { displayOrder: 2,  text: '換算数', value: 'kansanCnt',  width: 100,  shown: true, },
        { displayOrder: 3,  text: '不足数', value: 'fusokuCnt',  width: 100,  shown: true, },
      ],
      headersKobetsu: [
        { displayOrder: 1,  text: '',           value: 'ID',            width: 150,  shown: false },
        { displayOrder: 2,  text: '入荷日',     value: 'nyukaYmd',      width: 100,  shown: true },
        { displayOrder: 3,  text: '倉庫',       value: 'soko',          width: 100,  shown: true },
        { displayOrder: 4,  text: '棚番',       value: 'tanaBan',       width: 100,  shown: true },
        { displayOrder: 5,  text: '札紙番号',   value: 'fudagamiNo',    width: 200,  shown: true },
        { displayOrder: 6,  text: 'サブ',       value: 'fudagamiSabu',  width: 80,  shown: true },
        { displayOrder: 7,  text: '札紙連番',   value: 'fudagamiSeq',   width: 80,  shown: true },
        { displayOrder: 8,  text: '製造年月日', value: 'productYmd',    width: 100,  shown: true },
        { displayOrder: 9,  text: '数量',       value: 'suryo',         width: 80,  shown: true, },
        { displayOrder: 10, text: '入り数',     value: 'irisu',         width: 70,  shown: true, },
        { displayOrder: 11, text: '箱数',       value: 'hakosu',        width: 60,  shown: true, },
        { displayOrder: 12, text: '出庫箱数',   value: 'syukkohakosu',    width: 100,  shown: true },
        { displayOrder: 13, text: '吊札備考',   value: 'tsurifuraBiko', width: 200,  shown: true },
        { displayOrder: 14, text: '',          value: 'status',         width: 200,  shown: false },
      ],
      itemsShijiH: [
        {
          destinationName: "東京工場",
          orderNo: "4	QDA9Q2",
          customerName: "花王",
          productName: "９１８６４３　ＰＶキープＢＣＮ　ＴＰ９Ｂ",
          uchiwakeNo: "-",
          uchiwakeName: "",
          weight: "1,800Kg",
          shijiCnt: "42,000 S",
        }
      ],
      itemsShijiL: [
        {
          eigyoBiko: "",
        }
      ],
      itemsSum: [
        { hikiateCnt: "42,000 S", kansanCnt: "42,000 S", fusokuCnt: "0 S"}
      ],
      itemsKobetsu: [
        {
          ID: 1,
          nyukaYmd: '22/07/14',
          soko: '1810 関宿物流センター',
          tanaBan: '070230',
          fudagamiNo: '5056001108061X',
          fudagamiSabu: '',
          fudagamiSeq: '001',
          productYmd: '22/07/13',
          suryo: '30,000 S',
          irisu: '3,000',
          hakosu: '10',
          syukkohakosu: '10',
          tsurifuraBiko: '',
          status: "0",
        },
        {
          ID: 2,
          nyukaYmd: '22/07/14',
          soko: '1810 関宿物流センター',
          tanaBan: '061603',
          fudagamiNo: '5056001108063Z',
          fudagamiSabu: '',
          fudagamiSeq: '002',
          productYmd: '22/07/14',
          suryo: '30,000 S',
          irisu: '3,000',
          hakosu: '10',
          syukkohakosu: '4',
          tsurifuraBiko: '',
          status: "0",
        },
        {
          ID: 3,
          nyukaYmd: '22/07/14',
          soko: '1810 関宿物流センター',
          tanaBan: '080802',
          fudagamiNo: '5056001131548$',
          fudagamiSabu: '',
          fudagamiSeq: '003',
          productYmd: '22/07/14',
          suryo: '30,000 S',
          irisu: '3,000',
          hakosu: '10',
          syukkohakosu: '',
          tsurifuraBiko: '',
          status: "0",
        },
      ],
    }
  },
  created() {
    // if (this.props.id === undefined) {
    //   this.itemsKobetsu = this.itemsKobetsuPages[0].concat();
    // }
  },
  computed: {
    shownHeadersShijiH() {
      return this.headersShijiH.filter(h => h.shown);
    },
    shownHeadersShijiL() {
      return this.headersShijiL.filter(h => h.shown);
    },
    shownHeadersSum() {
      return this.headersSum.filter(h => h.shown);
    },
    shownHeadersKobetsu() {
      return this.headersKobetsu.filter(h => h.shown);
    },
  },
  methods: {
    setting() {
      this.myDrawer = !this.myDrawer;
    },
    changeSyukko() {
    },
  },
  components: {
    GamenInfo,
    // DragSet,
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

.required {
  background-color: yellow;
}

/* サマリ表示専用 */
#summarys.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > th {
  font-size:15px  !important;
  background-color: #FFe699 !important;
}
#summarys.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > td {
  background-color: #FFE699 !important;
}

.textRight input {
  text-align: right;
}

.syukkoArea {
  width: 50px;
}
.bikoArea {
  width: 200px;
}
</style>