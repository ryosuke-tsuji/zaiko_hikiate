<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">輸送指示ヘッダー</span>
              <span class="leyerTop mr-1" style="width:200px; text-align: right;">
                {{id}}/4
              </span>
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
              <v-col cols="4" class="d-flex justify-end">
                <v-data-table :headers="shownHeadersSum" :items="itemsSum" dense fixed-header hide-default-footer disable-sort height="auto" width="auto" id="summarys">
                  <template #[`item.shijiCnt`]="{ item }">
                    <div style="text-align: right;">{{item.shijiCnt}}</div>
                  </template>
                  <template #[`item.hikiateCnt`]="{ item }">
                    <div style="text-align: right;">{{item.hikiateCnt}}</div>
                  </template>
                  <template #[`item.kansanCnt`]="{ item }">
                    <div style="text-align: right;">{{item.kansanCnt}}</div>
                  </template>
                  <template #[`item.fusokuCnt`]="{ item }">
                    <div v-if="isFusoku(item.fusokuCnt)" class="text-end errorStatus">{{item.fusokuCnt}}</div>
                    <div v-else style="text-align: right;">{{item.fusokuCnt}}</div>
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
              <span class="text-left leyerTop" style="width:400px">
                <v-data-table :headers="headersHikiateJun" :items="itemsHikiateJun" dense fixed-header hide-default-header hide-default-footer calculate-widths height="40px">
                  <template v-slot:item="{ item }">
                    <tr>
                      <td width="100" class="hikiateSyoriJun">{{ item.title }}</td>
                      <td width="300">{{ item.value }}</td>
                    </tr>
                  </template>
                </v-data-table>
                </span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeadersKobetsu" :items="itemsKobetsu" dense multi-sort fixed-header height="300px">
              <template #[`item.suryo`]="{ item }">
                <div style="text-align: right;">{{ (item.suryo == null ? "" : item.suryo.toLocaleString()) }}{{ item.suryoUnit }}</div>
              </template>
              <template #[`item.iriCnt`]="{ item }">
                <div style="text-align: right;">{{(item.iriCnt == null ? "" : item.iriCnt.toLocaleString())}}</div>
              </template>
              <template #[`item.hakosu`]="{ item }">
                <div style="text-align: right;">{{(item.hakosu == null ? "" : item.hakosu.toLocaleString())}}</div>
              </template>
              <template #[`item.syukkohakosu`]="{ item }">
                <div style="display: flex; align-items: center;">
                  <v-text-field outlined dense hide-details v-model="item.syukkohakosu" class="syukkoArea textRight compact-form" background-color="white" v-if="item.status != 2" />
                  <v-spacer></v-spacer>
                  <v-btn :class='[item.isSetting ? "outlined" : "secondary"]' depressed dense @click="hakoShitei(item.ID)"><span>箱指定</span></v-btn>
                </div>
              </template>
              <template #[`item.tsurifuraBiko`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.tsurifuraBiko" style="bikoArea" class="compact-form" background-color="white" /> 
              </template>
              <template #[`item.fudagamiNo`]="{ item }">
                {{ item.fudagamiNo }}
                <!-- ここの条件をフラグ値にすればアイコン出る。 -->
                <v-icon v-if="item.status == 1" color="orange darken-3" text class="btn-icon mr-2" style="background-color: transparent !important" >mdi-arrow-u-left-top-bold</v-icon>
                <v-icon v-if="item.status == 2" color="red darken-3" class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert-circle</v-icon>
              </template>
            </v-data-table>
            <div style="height:60px"></div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="hoverBtn">
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large href="../zaiko_hikiate"><span>戻る</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
          <v-btn class="mx-5 mb-3 secondary" large :href="(parseInt(id)==4) ? '../zaiko_hikiate_kakutei': '../zaiko_hikiate_kobetsu/' + (parseInt(id)+1)"><span>引当保留</span></v-btn>
          <v-btn class="mx-5 mb-3 secondary" large :href="(parseInt(id)==4) ? '../zaiko_hikiate_kakutei': '../zaiko_hikiate_kobetsu/' + (parseInt(id)+1)"><span>強制決定</span></v-btn>
          <v-btn class="mx-5 mb-3 primary"   large :href="(parseInt(id)==4) ? '../zaiko_hikiate_kakutei': '../zaiko_hikiate_kobetsu/' + (parseInt(id)+1)"><span>決定</span></v-btn>
        </v-col>
        <v-col class="d-flex justify-end ml-10">
          <v-btn class="ml-10 mb-3" depressed outlined large @click="redist"><span>再引当</span></v-btn>
          <v-btn class="ml-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
        </v-col>
      </v-row>
    </v-container>
<!--
    <DragSet v-bind:drawerParent="myDrawer" />
-->

    <v-navigation-drawer v-model="drawer" absolute clipped right>
      <v-list-item>
        <v-list-item-title />
      </v-list-item>
      <v-divider></v-divider>
      <table>
        <draggable v-model="headersKobetsu" tag="tbody" class="dragArea list-group">
          <tr v-for="header in shownHeadersKobetsuDraggable" :key="header.displayOrder">
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

    <!-- 箱番号個別引当画面 -->
    <div id="overlay" v-show="showContent">
      <div id="content">
        <v-row>
          <v-col class="pb-0">
            <v-card class="pd-10">
              <v-card-title class="pt-0 pb-2 ml-1">
                <span class="titleFont d-flex">箱番号個別引当</span>
                <v-spacer></v-spacer>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex py-1" >
            <v-subheader class="mr-2">指示区分</v-subheader>
            <div style="display: flex; align-items: center; justify-content: center;">
              <v-radio-group row>
                <v-radio dense label="指示型" value="1"></v-radio>
                <v-radio dense label="実績型" value="2"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
        <v-row align-content="center">
          <v-col>
            <v-data-table :headers="shownHeadersBunkatsu" :items="bunkatsuMoto" item-key="id" v-model="selectMoto" dense multi-sort fixed-header hide-default-footer show-select height="360px" no-data-text="">
              <template #[`item.hakoNo`]="{ item }">
                <div style="text-align: right;">{{item.hakoNo}}</div>
              </template>
              <template #[`item.suryo`]="{ item }">
                <div style="text-align: right;">{{ (item.suryo == null ? "" : item.suryo.toLocaleString()) }}{{ item.suryoUnit }}</div>
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
      </div>
    </div>

  </div>
</template>

<script>
import draggable from "vuedraggable"
// import DragSet from '@/components/common/DragSetting.vue'
export default {
  props: ["id"],
  data() {
    return {
      drawer: false,
      showContent: false,
      myDrawer: null,
      headersShijiH: [
        { displayOrder: 1, text: '届先名',   value: 'destinationName', width: 150,  shown: true },
        { displayOrder: 2, text: '注番',     value: 'orderNo',       width: 100, shown: true, },
        { displayOrder: 3, text: '得意先',   value: 'customerName',  width: 150, shown: true, },
        { displayOrder: 4, text: '品名',     value: 'productName',   width: 180, shown: true, },
        { displayOrder: 5, text: '内訳№',   value: 'uchiwakeNo',    width: 90,  shown: true, },
        { displayOrder: 6, text: '内訳名',   value: 'uchiwakeName',  width: 100, shown: true, },
//        { displayOrder: 7, text: '重量',     value: 'weight',        width: 100, shown: true, },
//        { displayOrder: 8, text: '指示数',   value: 'shijiCnt',      width: 100, shown: true, },
      ],
      headersShijiL: [
        { displayOrder: 1, text: '営業備考',   value: 'eigyoBiko', width: 150,  shown: true },
      ],
      headersSum: [
        { displayOrder: 1,  text: '指示数', value: 'shijiCnt',   width: 100,  shown: true, },
        { displayOrder: 2,  text: '引当数', value: 'hikiateCnt', width: 100,  shown: true, },
        { displayOrder: 3,  text: '換算数', value: 'kansanCnt',  width: 100,  shown: true, },
        { displayOrder: 4,  text: '不足数', value: 'fusokuCnt',  width: 100,  shown: true, },
      ],
      headersKobetsu: [
        { displayOrder: 2,  text: '入荷日',     value: 'nyukaYmd',      width: 100,  shown: true, manage: false, },
        { displayOrder: 3,  text: '倉庫',       value: 'soko',          width: 100,  shown: true, manage: false, },
        { displayOrder: 4,  text: '棚番',       value: 'tanaBan',       width: 100,  shown: true, manage: false, },
        { displayOrder: 5,  text: '札紙番号',   value: 'fudagamiNo',    width: 200,  shown: true, manage: false, },
        { displayOrder: 6,  text: '札紙連番',   value: 'fudagamiSeq',   width: 80,  shown: true, manage: false, },
        { displayOrder: 7,  text: 'サブ',       value: 'fudagamiSabu',  width: 80,  shown: true, manage: false, },
        { displayOrder: 8,  text: '製造年月日', value: 'productYmd',    width: 100,  shown: true, manage: false, },
        { displayOrder: 9,  text: '数量',       value: 'suryo',         width: 80,  shown: true, manage: false, },
        { displayOrder: 10, text: '入り数',     value: 'iriCnt',        width: 70,  shown: true, manage: false, },
        { displayOrder: 11, text: '内数',       value: 'uchisu',        width: 60,  shown: true, manage: false, },
        { displayOrder: 12, text: '箱数',       value: 'hakosu',        width: 60,  shown: true, manage: false, },
        { displayOrder: 13, text: '出庫箱数',   value: 'syukkohakosu',  width: 180,  shown: true, manage: false, },
        { displayOrder: 14, text: '吊札備考',   value: 'tsurifuraBiko', width: 200,  shown: true, manage: false, },
        { displayOrder: 91, text: '',           value: 'suryoUnit',     width: 80,  shown: false, manage: true, },
        { displayOrder: 98, text: '',          value: 'status',         width: 200,  shown: false, manage: true, },
        { displayOrder: 99, text: '',           value: 'ID',            width: 150,  shown: false, manage: true, },
      ],
      headersBunkatsu: [
        { displayOrder: 3,  text: '箱番号',   value: 'hakoNo', width: 40,  shown: true },
        { displayOrder: 4,  text: '数量',     value: 'suryo',  width: 80,  shown: true },
        { displayOrder: 91, text: '',         value: 'suryoUnit',width: 80,shown: false },
        { displayOrder: 99, text: '',         value: 'id',     width: 10,  shown: false },
      ],
      itemsShijiH:[],
      itemsShijiHList: [
        [
          // 1明細目
          {
            destinationName: "東京工場",
            orderNo: "4	QDA9Q2",
            customerName: "花王",
            productName: "９１８６４３　ＰＶキープＢＣＮ　ＴＰ９Ｂ",
            uchiwakeNo: "-",
            uchiwakeName: "",
//            weight: "1,800Kg",
//            shijiCnt: "42,000 S",
          }
        ],
        [
          // 2明細目
          {
            destinationName: "㈲ヨコヤマ",
            orderNo: "4 8A61Q2",
            customerName: "コカ・コーラ",
            productName: "７ミリヨウチューブ",
            uchiwakeNo: "01",
            uchiwakeName: "本体",
//            weight: "300Kg",
//            shijiCnt: "64,000 S",
          }
        ],
        [
          // 3明細目
          {
            destinationName: "㈲ヨコヤマ",
            orderNo: "4 8O45S2",
            customerName: "コカ・コーラ",
            productName: "１１５＿７Ｍ／Ｍ　ヨウ　リング",
            uchiwakeNo: "01",
            uchiwakeName: "本体",
//            weight: "500kg",
//            shijiCnt: "52,500 S",
          }
        ],
        [
          // 4明細目
          {
            destinationName: "㈲双葉商事",
            orderNo: "4	QBA1R2",
            customerName: "丸美屋食品",
            productName: "７３ＣＪ　チイカワヨウキイリデイカワ",
            uchiwakeNo: "01",
            uchiwakeName: "本体",
//            weight: "200Kg",
//            shijiCnt: "6,048 S",
          }
        ],
      ],
      itemsShijiL: [],
      itemsShijiLList: [
        [
          {
            eigyoBiko: "",
          }
        ],
        [
          {
            eigyoBiko: "",
          }
        ],
        [
          {
            eigyoBiko: "",
          }
        ],
        [
          {
            eigyoBiko: "",
          }
        ],
      ],
      itemsSum: [],
      itemsSumList: [
        [
          { shijiCnt: "42,000 S", hikiateCnt: "42,000 S", kansanCnt: "42,000 S", fusokuCnt: "0 S"},
        ],
        [
          { shijiCnt: "64,000 S", hikiateCnt: "57,600 S", kansanCnt: "57,600 S", fusokuCnt: "-6,400 S"}
        ],
        [
          { shijiCnt: "52,500 S", hikiateCnt: "45,000 S", kansanCnt: "45,000 S", fusokuCnt: "-7,500 S"}
        ],
        [
          { shijiCnt: "6,048 S", hikiateCnt: "6,048 S", kansanCnt: "6,048 S", fusokuCnt: "0 S"}
        ],
      ],
      itemsKobetsu: [],
      itemsKobetsuList: [
        [
          // 1明細目
          {
            ID: 1,
            nyukaYmd: '22/07/14',
            soko: '1810 関宿物流センター',
            tanaBan: '070230',
            fudagamiNo: '5056001108061X',
            fudagamiSabu: '1',
            fudagamiSeq: '001',
            productYmd: '22/07/13',
            suryo: 30000,
            suryoUnit: " S",
            iriCnt: 3000,
            uchisu: null,
            hakosu: 10,
            syukkohakosu: 10,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
          {
            ID: 2,
            nyukaYmd: '22/07/14',
            soko: '1810 関宿物流センター',
            tanaBan: '061603',
            fudagamiNo: '5056001108063Z',
            fudagamiSabu: '1',
            fudagamiSeq: '002',
            productYmd: '22/07/14',
            suryo: 30000,
            suryoUnit: " S",
            iriCnt: 3000,
            uchisu: null,
            hakosu: 10,
            syukkohakosu: 4,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
          {
            ID: 3,
            nyukaYmd: '22/07/14',
            soko: '1810 関宿物流センター',
            tanaBan: '080802',
            fudagamiNo: '5056001131548$',
            fudagamiSabu: '1',
            fudagamiSeq: '003',
            productYmd: '22/07/14',
            suryo: 30000,
            suryoUnit: " S",
            iriCnt: 3000,
            uchisu: null,
            hakosu: 10,
            syukkohakosu: null,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
        ],
        [
          // 2明細目
          {
            ID: 1,
            nyukaYmd: '22/07/14',
            soko: '1810 関宿物流センター',
            tanaBan: '020201',
            fudagamiNo: '438940398593$%',
            fudagamiSabu: '1',
            fudagamiSeq: '001',
            productYmd: '22/07/14',
            suryo: 64000,
            suryoUnit: " S",
            iriCnt: 640,
            uchisu: null,
            hakosu: 90,
            syukkohakosu: 90,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
        ],
        [
          // 3明細目
          {
            ID: 1,
            nyukaYmd: '22/07/14',
            soko: '1810 関宿物流センター',
            tanaBan: '010101',
            fudagamiNo: '3248990234890A',
            fudagamiSabu: '1',
            fudagamiSeq: '001',
            productYmd: '22/07/14',
            suryo: 37500,
            suryoUnit: " S",
            iriCnt: 7500,
            uchisu: null,
            hakosu: 5,
            syukkohakosu: 5,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
          {
            ID: 2,
            nyukaYmd: '22/07/14',
            soko: '1220 盛運羽生倉庫',
            tanaBan: '999999',
            fudagamiNo: '9394938953889B',
            fudagamiSabu: '1',
            fudagamiSeq: '002',
            productYmd: '22/07/14',
            suryo: 37500,
            suryoUnit: " S",
            iriCnt: 7500,
            uchisu: null,
            hakosu: 1,
            syukkohakosu: 1,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
        ],
        [
          // 4明細目
          {
            ID: 1,
            nyukaYmd: '22/07/12',
            soko: '1810 関宿物流センター',
            tanaBan: '090403',
            fudagamiNo: '3948038034589C',
            fudagamiSabu: '1',
            fudagamiSeq: '001',
            productYmd: '22/07/12',
            suryo: 8640,
            suryoUnit: " S",
            iriCnt: 432,
            uchisu: null,
            hakosu: 20,
            syukkohakosu: 14,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
          {
            ID: 2,
            nyukaYmd: '22/07/13',
            soko: '1810 関宿物流センター',
            tanaBan: '090404',
            fudagamiNo: '3948038035628D',
            fudagamiSabu: '1',
            fudagamiSeq: '002',
            productYmd: '22/07/12',
            suryo: 8640,
            suryoUnit: " S",
            iriCnt: 432,
            uchisu: null,
            hakosu: 20,
            syukkohakosu: null,
            tsurifuraBiko: '',
            status: "0",
            isSetting: false,
          },
        ],
      ],
      headersHikiateJun: [
        { text: "引当処理順", value: "title", width: '25%', },
        { text: "札紙番号⇒入荷日", value: "value", width: '75%', },
      ],
      itemsHikiateJun: [
        { title:"引当処理順", value:"札紙番号⇒入荷日"}
      ],
      bunkatsuMoto: [
        { hakoNo:"1",  suryo:3000, suryoUnit: " S",id:1 },
        { hakoNo:"2",  suryo:3000, suryoUnit: " S",id:2 },
        { hakoNo:"3",  suryo:3000, suryoUnit: " S",id:3 },
        { hakoNo:"4",  suryo:3000, suryoUnit: " S",id:4 },
        { hakoNo:"5",  suryo:3000, suryoUnit: " S",id:5 },
        { hakoNo:"6",  suryo:3000, suryoUnit: " S",id:6 },
        { hakoNo:"7",  suryo:3000, suryoUnit: " S",id:7 },
        { hakoNo:"8",  suryo:3000, suryoUnit: " S",id:8 },
        { hakoNo:"9",  suryo:3000, suryoUnit: " S",id:9 },
        { hakoNo:"10", suryo:3000, suryoUnit: " S",id:10 },
      ],
      selectMoto: [],
      headersBack: null,
      procId: 0,
    }
  },
  mounted: function() {
    this.itemsShijiH = this.itemsShijiHList[parseInt(this._props.id) - 1];
    this.itemsShijiL = this.itemsShijiLList[parseInt(this._props.id) - 1];
    this.itemsSum = this.itemsSumList[parseInt(this._props.id) - 1];
    this.itemsKobetsu = this.itemsKobetsuList[parseInt(this._props.id) - 1];
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
    shownHeadersKobetsuDraggable() {
      return this.headersKobetsu.filter(h => !h.manage);
    },
    shownHeadersBunkatsu() {
      return this.headersBunkatsu.filter(h => h.shown);
    },
    isFusoku() {
      return function(fusoku) {
        let fusokuNum = parseInt(fusoku.replace(/,/g, ''));
        if (fusokuNum < 0)
          return true;
        return false;
      }
    },
    classObject: function(id) {
      return {
        active: this.itemsKobetsu[id].isSetting, "primary" : "errorClass"
      }
    }
  },
  methods: {
    setting() {
      // 現在の状態を退避
      this.headersBack = JSON.parse(JSON.stringify(this.headersKobetsu));
      // サブ画面表示
      this.drawer = !this.drawer;
    },
    save() {
      // DB更新処理

      this.drawer = false;
    },
    cancel() {
      // 退避から戻す
      this.headersKobetsu = this.headersBack;
      this.drawer = false;
    },
    hakoShitei: async function (id) {
      // データ準備
      this.selectMoto = [];
      this.showContent = true;
      this.procId = id-1;
    },
    closeModal() {
      this.itemsKobetsu[this.procId].isSetting = true;
      this.showContent = false;
    },
    cancelModal() {
      this.showContent = false;
    },
    redist() {
      // 現在の引当クリア
      for (let idx = 0; idx < this.itemsKobetsu.length; idx++) {
        this.itemsKobetsu[idx].syukkohakosu = "";
      }
      // 残り要求数
      let lastRequest = parseInt(this.itemsSum[0].hikiateCnt);
      for (let idx = 0; idx < this.itemsKobetsu.length; idx++) {
        let syukko = 0;
        for (let hako = parseInt(this.itemsKobetsu[idx].hakosu); hako > 0; hako--) {
          if (lastRequest <= 0)
            break;
          lastRequest -= parseInt(this.itemsKobetsu[idx].iriCnt);
          syukko += 1;
        }
        this.itemsKobetsu[idx].syukkohakosu = syukko;

      }
    },
  },
  components: {
    draggable,
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

/* サマリ表示専用 */
#summarys.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > th {
  font-size:15px  !important;
  background-color: #FFe699 !important;
}
#summarys.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > td {
  background-color: #FFE699 !important;
}
#hikiateSyoriJun.v-data-table td:nth-child(odd) {
  background-color: #FFE699;
}
td.hikiateSyoriJun {
  background-color: #FFE699 !important;
}
.hikiateSyoriJun {background-color: #FFE699 !important;}

.textRight input {
  text-align: right;
}

.syukkoArea {
  width: 50px;
}
.bikoArea {
  width: 200px;
}

.errorStatus {
  /* text-danger */
  color: red;
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
  width: "200px";
  height: "350px";
  padding: 1em;
  background: #ffffff;
}

.v-input--selection-controls {
  margin: 2px;
}

.leyerTop {
  position: absolute; 
  right: 0;
  z-index: 2;
}

.hoverBtn {
  position: fixed;
  background-color: white;
  bottom: 30px;
  width: 100%;
}

.compact-form {
  transform: scale(0.875);
  transform-origin: left;
}

</style>