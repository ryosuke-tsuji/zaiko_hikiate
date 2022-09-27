<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      width="100%"
      style="margin-top: 0px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-5 mb-3 secondary"
          large
          v-bind="attrs"
          v-on="on"
          @click="selectData"
          ><span>個別引当</span></v-btn
        >
      </template>

      <div style="margin-top: 64px; background-color: white">
        <v-container fluid>
          <v-row>
            <v-col class="pb-0">
              <v-card>
                <v-card-title class="pt-0 pb-2 ml-1">
                  <span class="titleFont d-flex">輸送指示ヘッダー</span>
                  <span
                    class="leyerTop mr-1"
                    style="width: 200px; text-align: right"
                  >
                    {{ parseInt(this.$props.kobetsuIdx) + 1 }}/{{
                      this.$props.selectRowList.length
                    }}
                  </span>
                  <v-spacer></v-spacer>
                </v-card-title>
              </v-card>
              <v-card>
                <v-row class="pb-0">
                  <v-col class="pb-0">
                    <v-data-table
                      :headers="headersShijiH"
                      :items="screenModel.upperInfo"
                      dense
                      fixed-header
                      hide-default-footer
                      height="auto"
                      disable-sort
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row class="pb-0">
                  <v-col cols="4">
                    <v-data-table
                      :headers="headersShijiL"
                      :items="screenModel.upperInfo"
                      dense
                      fixed-header
                      hide-default-footer
                      height="auto"
                      width="auto"
                      disable-sort
                    >
                    </v-data-table>
                  </v-col>
                  <v-col cols="3">
                    <v-data-table
                      :headers="headersCaution"
                      :items="screenModel.upperInfo"
                      dense
                      fixed-header
                      hide-default-footer
                      disable-sort
                      height="auto"
                      width="auto"
                      id="caution"
                    />
                  </v-col>
                  <v-col cols="5" class="d-flex justify-end">
                    <v-data-table
                      :headers="headersSum"
                      :items="screenModel.upperInfo"
                      dense
                      fixed-header
                      hide-default-footer
                      disable-sort
                      height="auto"
                      width="auto"
                      id="summarys"
                    >
                      <template #[`item.sjNum`]="{ item }">
                        <div style="text-align: right">
                          {{
                            item.sjNum == null
                              ? ''
                              : item.sjNum.toLocaleString()
                          }}
                        </div>
                      </template>
                      <template #[`item.hkatNum`]="{}">
                        <!-- 出庫箱数から自動で計算 -->
                        <div style="text-align: right">
                          {{ hkatSum.toLocaleString() }}
                        </div>
                      </template>
                      <template #[`item.knsnNum`]="{ item }">
                        <div style="text-align: right">
                          {{
                            item.knsnNum == null
                              ? ''
                              : item.knsnNum.toLocaleString()
                          }}
                        </div>
                      </template>
                      <template #[`item.fskNum`]="{}">
                        <div
                          v-if="isFusoku(fskSum)"
                          class="text-end errorStatus"
                        >
                          {{ fskSum.toLocaleString() }}
                        </div>
                        <div v-else style="text-align: right">
                          {{ fskSum.toLocaleString() }}
                        </div>
                      </template>
                    </v-data-table>
                    <keppin-add-dlg :isYoteiAdd="isYoteiAdd"></keppin-add-dlg>
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
                  <div class="text-left leyerTop" style="width: 400px">
                    <v-data-table
                      :headers="headersHikiateJun"
                      :items="itemsHikiateJun"
                      dense
                      fixed-header
                      hide-default-header
                      hide-default-footer
                      calculate-widths
                      height="40px"
                    >
                      <template v-slot:item="{ item }">
                        <tr>
                          <td max-width="100" class="hikiateSyoriJun">
                            {{ item.title }}
                          </td>
                          <td max-width="300">{{ item.value }}</td>
                        </tr>
                      </template>
                    </v-data-table>
                  </div>
                  <v-spacer></v-spacer>
                </v-card-title>
              </v-card>
              <v-card>
                <v-data-table
                  :headers="shownHeadersKobetsu"
                  :items="screenModel.lowerInfo"
                  dense
                  multi-sort
                  fixed-header
                  :height="tableHeight"
                >
                  <template #[`item.num`]="{ item }">
                    <div style="text-align: right">
                      {{ item.num == null ? '' : item.num.toLocaleString()
                      }}{{ item.numUnit }}
                    </div>
                  </template>
                  <template #[`item.iriNum`]="{ item }">
                    <div style="text-align: right">
                      {{
                        item.iriNum == null ? '' : item.iriNum.toLocaleString()
                      }}{{ item.iriNumUnit }}
                    </div>
                  </template>
                  <template #[`item.uchNum`]="{ item }">
                    <div style="text-align: right">
                      {{
                        item.uchNum == null ? '' : item.uchNum.toLocaleString()
                      }}{{ item.uchNumUnit }}
                    </div>
                  </template>

                  <template #[`item.hkNum`]="{ item }">
                    <div style="text-align: right">
                      {{ item.hkNum == null ? '' : item.hkNum.toLocaleString()
                      }}{{ item.hkNumUnit }}
                    </div>
                  </template>
                  <template #[`item.shkkHkNum`]="{ item }">
                    <div style="display: flex; align-items: center">
                      <v-text-field
                        outlined
                        dense
                        hide-details
                        v-model="item.shkkHkNum"
                        class="syukkoArea textRight compact-form"
                        background-color="white"
                        v-if="item.status != 2"
                      />
                      <v-spacer></v-spacer>
                      <hakoSelDlg
                        :isSetting="item.isSetting"
                        :id="item.id"
                        @result="resDialog"
                      />
                    </div>
                  </template>
                  <template #[`item.trfdBik`]="{ item }">
                    <v-text-field
                      outlined
                      dense
                      hide-details
                      v-model="item.trfdBik"
                      style="bikoArea"
                      class="compact-form"
                      background-color="white"
                    />
                  </template>
                  <template #[`item.fdgmNo`]="{ item }">
                    {{ item.fdgmNo }}
                    <!-- ここの条件をフラグ値にすればアイコン出る。 -->
                    <v-icon
                      v-if="item.status == 1"
                      color="orange darken-3"
                      text
                      class="btn-icon mr-2"
                      style="background-color: transparent !important"
                      >mdi-arrow-u-left-top-bold</v-icon
                    >
                    <v-icon
                      v-if="item.status == 2"
                      color="red darken-3"
                      class="btn-icon mr-2"
                      style="background-color: transparent !important"
                      >mdi-alert-circle</v-icon
                    >
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-start mr-10">
              <v-btn
                class="mr-10 mb-3"
                depressed
                outlined
                large
                @click="dialog = false"
                ><span>戻る</span></v-btn
              >
            </v-col>

            <v-col class="d-flex justify-center">
              <v-btn class="mx-5 mb-3 secondary" large @click="hold"
                ><span>引当保留</span></v-btn
              >
              <v-btn class="mx-5 mb-3 secondary" large @click="force"
                ><span>強制決定</span></v-btn
              >
              <v-btn
                class="mx-5 mb-3 primary"
                large
                @click="decide"
                id="btnDecide"
                ><span>決定</span></v-btn
              >
            </v-col>
            <v-col class="d-flex justify-end ml-10">
              <v-btn class="ml-10 mb-3" depressed outlined large @click="redist"
                ><span>再引当</span></v-btn
              >
              <v-btn
                class="ml-10 mb-3"
                depressed
                outlined
                large
                @click.stop="setting"
                ><span>設定</span></v-btn
              >
            </v-col>
          </v-row>
        </v-container>

        <v-navigation-drawer v-model="drawer" absolute clipped right>
          <v-list-item>
            <v-list-item-title />
          </v-list-item>
          <v-divider></v-divider>
          <table>
            <draggable
              v-model="headersKobetsu"
              tag="tbody"
              class="dragArea list-group"
            >
              <tr
                v-for="header in shownHeadersKobetsuDraggable"
                :key="header.displayOrder"
              >
                <td class="text-center" scope="row" width="40">
                  <input type="checkbox" v-model="header.shown" />
                </td>
                <td>{{ header.text }}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    class="text-end"
                    v-model="header.width"
                    style="width: 50px; text-align: right"
                  />
                </td>
                <td><img src="@/assets/menu.png" width="20" /></td>
              </tr>
            </draggable>
          </table>
          <v-btn @click="cancel"><span>キャンセル</span></v-btn>
          <v-btn @click="save"><span>保存</span></v-btn>
        </v-navigation-drawer>
      </div>
      <Footer />
    </v-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import KeppinAddDlg from '@/components/pages/dialogs/KeppinAddDialog.vue';
import hakoSelDlg from '@/components/pages/dialogs/HakoSelectDialog.vue';
import Footer from '@/components/common/Footer.vue';
import * as axios from 'axios';
export default {
  props: ['kobetsuIdx', 'selectRowList'],
  data() {
    return {
      drawer: false,
      myDrawer: null,
      dialog: false,

      // 画面モデル
      screenModel: {
        // 上段情報
        upperInfo: [],
        // 下段情報
        lowerInfo: [],
      },
      headersShijiH: [
        {
          text: '届先名',
          value: 'tdkskNm',
          width: 150,
        },
        {
          text: '注番',
          value: 'chuNo',
          width: 100,
        },
        {
          text: '得意先',
          value: 'tkisk',
          width: 150,
        },
        {
          text: '品名',
          value: 'hnNm',
          width: 180,
        },
        {
          text: '内訳№',
          value: 'ucwkNo',
          width: 90,
        },
        {
          text: '内訳名',
          value: 'ucwkNm',
          width: 100,
        },
      ],
      headersShijiL: [
        {
          text: '営業備考',
          value: 'aigyBku',
          width: 150,
        },
      ],
      headersCaution: [
        {
          text: '注意事項',
          value: 'chiJku',
          width: 300,
        },
      ],
      headersSum: [
        {
          text: '指示数',
          value: 'sjNum',
          width: 100,
        },
        {
          text: '引当数',
          value: 'hkatNum',
          width: 100,
        },
        {
          text: '換算数',
          value: 'knsnNum',
          width: 100,
        },
        {
          text: '不足数',
          value: 'fskNum',
          width: 100,
        },
      ],
      headersKobetsu: [
        {
          displayOrder: 2,
          text: '入荷日',
          value: 'nykDt',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 3,
          text: '倉庫',
          value: 'sko',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 4,
          text: '棚番',
          value: 'tnNo',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 5,
          text: '札紙番号',
          value: 'fdgmNo',
          width: 200,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 6,
          text: '札紙連番',
          value: 'fdgmSeq',
          width: 80,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 7,
          text: 'サブ',
          value: 'sb',
          width: 80,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 8,
          text: '製造年月日',
          value: 'sizDt',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 9,
          text: '数量',
          value: 'num',
          width: 80,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 10,
          text: '入り数',
          value: 'iriNum',
          width: 70,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 11,
          text: '内数',
          value: 'uchNum',
          width: 60,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 12,
          text: '箱数',
          value: 'hkNum',
          width: 60,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 13,
          text: '出庫箱数',
          value: 'shkkHkNum',
          width: 180,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 14,
          text: '吊札備考',
          value: 'trfdBik',
          width: 200,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 91,
          text: '',
          value: 'numUnit',
          width: 80,
          shown: false,
          manage: true,
        },
        {
          displayOrder: 97,
          text: '',
          value: 'isSetting',
          width: 10,
          shown: false,
          manage: true,
        },
        {
          displayOrder: 98,
          text: '',
          value: 'status',
          width: 200,
          shown: false,
          manage: true,
        },
        {
          displayOrder: 99,
          text: '',
          value: 'ID',
          width: 150,
          shown: false,
          manage: true,
        },
      ],
      headersBunkatsu: [
        {
          displayOrder: 3,
          text: '箱番号',
          value: 'hakoNo',
          width: 40,
          shown: true,
        },
        {
          displayOrder: 4,
          text: '数量',
          value: 'num',
          width: 80,
          shown: true,
        },
        {
          displayOrder: 91,
          text: '',
          value: 'numUnit',
          width: 80,
          shown: false,
        },
        { displayOrder: 99, text: '', value: 'id', width: 10, shown: false },
      ],
      headersHikiateJun: [
        { text: '引当処理順', value: 'title', width: '25%' },
        { text: '札紙番号⇒入荷日', value: 'value', width: '75%' },
      ],
      itemsHikiateJun: [{ title: '引当処理順', value: '札紙番号⇒入荷日' }],
      headersBack: null,
      procId: 0,
    };
  },
  // mounted() {
  //   document.addEventListener('keydown', this.checkKeyDown);
  // },
  // beforeDestroy() {
  //   document.removeEventListener('keydown', this.checkKeyDown);
  // },
  computed: {
    shownHeadersKobetsu() {
      return this.headersKobetsu.filter((h) => h.shown);
    },
    shownHeadersKobetsuDraggable() {
      return this.headersKobetsu.filter((h) => !h.manage);
    },
    isFusoku() {
      return function (fusoku) {
        let fusokuNum = parseInt(fusoku);
        if (fusokuNum < 0) return true;
        return false;
      };
    },
    isYoteiAdd() {
      // 予定ボタン表示制御
      var work = new String(this.calcFskNum());
      return work.substring(0, 1) == '-';
    },
    classObject: function (id) {
      return {
        active: this.screenModel.lowerInfo[id].isSetting,
        primary: 'errorClass',
      };
    },
    hkatSum: function () {
      return this.calcHkateNum();
    },
    fskSum: function () {
      return this.calcFskNum();
    },
    // 解像度に応じてテーブル高さを変更（改良の余地あり）
    tableHeight: function () {
      return this.$vuetify.breakpoint.name === 'xl' ? '750px' : '230px';
    },
  },
  methods: {
    selectData() {
      if (this.$props.selectRowList.length > 0) {
        this.dialog = true;
        this.getData(this.$props.kobetsuIdx);
      }
    },
    async getData(idx) {
      // ページ表示時のデータ検索
      try {
        this.screenModel.chuNoH = this.$props.selectRowList[idx].jgyhmbCd;
        this.screenModel.chuNoL = this.$props.selectRowList[idx].sirNo;
        const res = await axios.post(
          'http://localhost:8081/ssb01002pc/select',
          this.screenModel
        );
        if (res.data) {
          this.screenModel.upperInfo = res.data.upperInfo;
          this.screenModel.lowerInfo = res.data.lowerInfo;
          // 「決定」ボタンにフォーカス設定
          document.getElementById('btnDecide').focus();
        }
      } catch (error) {
        alert('検索に失敗しました。');
      }
    },
    calcHkateNum() {
      // 引当数算出
      let sum = 0;
      for (const rowInfo of this.screenModel.lowerInfo) {
        sum += parseInt(rowInfo.shkkHkNum || 0) * parseInt(rowInfo.iriNum);
      }
      return sum;
    },
    calcFskNum() {
      let sjNum = this.screenModel.upperInfo[0]?.sjNum;
      return this.calcHkateNum() - sjNum;
    },
    hold() {
      // 引当保留
      this.$emit('result', { res: true, status: 3 });
    },
    force() {
      // 強制決定
      this.$emit('result', { res: true, status: 2 });
    },
    decide() {
      // 決定
      this.$emit('result', { res: true, status: 1 });
    },
    setting() {
      // 現在の状態を退避
      this.headersBack = JSON.parse(JSON.stringify(this.headersKobetsu));
      // サブ画面表示
      this.drawer = !this.drawer;
    },
    dialogClose() {
      this.dialog = false;
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
      this.procId = id;
    },
    yoteiAdd() {
      // 予定ボタン 欠品分入荷予定登録
    },
    redist() {
      // // 現在の引当クリア
      // for (let idx = 0; idx < this.itemsKobetsu.length; idx++) {
      //   this.itemsKobetsu[idx].shkkHkNum = '';
      // }
      // // 残り要求数
      // let lastRequest = parseInt(this.itemsSum[0].hikiateNum);
      // for (let idx = 0; idx < this.itemsKobetsu.length; idx++) {
      //   let syukko = 0;
      //   for (
      //     let hako = parseInt(this.itemsKobetsu[idx].hkNum);
      //     hako > 0;
      //     hako--
      //   ) {
      //     if (lastRequest <= 0) break;
      //     lastRequest -= parseInt(this.itemsKobetsu[idx].iriNum);
      //     syukko += 1;
      //   }
      //   this.itemsKobetsu[idx].shkkHkNum = syukko;
      // }
    },
    // 箱指定結果
    resDialog(obj) {
      if (obj.res) {
        for (const rowInfo of this.screenModel.lowerInfo) {
          if (rowInfo.id == obj.id) {
            rowInfo.isSetting = '1';
            break;
          }
        }
      }
    },
    checkKeyDown(event) {
      if (event.key == 'Enter') {
        this.decide();
      }
    },
  },
  components: {
    draggable,
    KeppinAddDlg,
    hakoSelDlg,
    Footer,
  },
};
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

/* 注意事項 */
#caution.v-data-table--fixed-header
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-size: 15px !important;
  background-color: #f1b386 !important;
}
#caution.v-data-table--fixed-header
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  background-color: #f1b386 !important;
}

/* サマリ表示専用 */
#summarys.v-data-table--fixed-header
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-size: 15px !important;
  background-color: #ffe699 !important;
}
#summarys.v-data-table--fixed-header
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  background-color: #ffe699 !important;
}
#hikiateSyoriJun.v-data-table td:nth-child(odd) {
  background-color: #ffe699;
}
td.hikiateSyoriJun {
  background-color: #ffe699 !important;
}
.hikiateSyoriJun {
  background-color: #ffe699 !important;
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

.errorStatus {
  /* text-danger */
  color: red;
}

.v-input--selection-controls {
  margin: 2px;
}

.leyerTop {
  position: absolute;
  right: 86px;
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
