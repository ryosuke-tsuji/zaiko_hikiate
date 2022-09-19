<template>
  <div>
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
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2">&ensp;出荷日</v-subheader>
                      <v-dialog
                        ref="dialog_date"
                        v-model="modal_date"
                        :return-value.sync="screenModel.sykkYmd"
                        persistent
                        width="30vw"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateRangeText"
                            append-icon="mdi-calendar"
                            readonly
                            dense
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            class="py-0"
                            style="max-width: 250px; height: 40px"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="screenModel.sykkYmd"
                          locale="ja-jp"
                          no-title
                          range
                          :day-format="(d) => new Date(d).getDate()"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            class="subwin_button"
                            color="primary"
                            @click="modal_date = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            class="subwin_button"
                            color="primary"
                            @click="$refs.dialog_date.save(screenModel.sykkYmd)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">引当状況</v-subheader>
                      <v-select
                        v-model="hikiateStatusModel"
                        :items="hikiateStatusList"
                        dense
                        outlined
                        hide-details="auto"
                        multiple
                        style="max-width: 150px"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2">在庫有無</v-subheader>
                      <v-select
                        :items="zaikoUmuList"
                        dense
                        outlined
                        hide-details="auto"
                        style="max-width: 150px"
                      ></v-select>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">輸送手段</v-subheader>
                      <v-select
                        :items="binUnsoCdList"
                        dense
                        outlined
                        hide-details="auto"
                        style="max-width: 90px"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2"
                        ><span style="text-align: center"
                          >管理部署</span
                        ></v-subheader
                      >
                      <v-select
                        :items="kanriBukaList"
                        dense
                        outlined
                        multiple
                        hide-details="auto"
                        style="max-width: 150px"
                      ></v-select>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">事&emsp;注番</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint=""
                        hide-details="auto"
                        class="chuban1"
                        style="max-width: 70px"
                      ></v-text-field>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint=""
                        hide-details="auto"
                        class="chuban2"
                        style="max-width: 200px"
                      ></v-text-field>
                      <div style="width: 15px"></div>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&ensp;品種</v-subheader>
                      <v-select
                        :items="hinsyuList"
                        dense
                        outlined
                        hide-details="auto"
                        multiple
                        style="max-width: 160px"
                      ></v-select>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-col class="d-flex justify-end mr-5">
                      <v-btn
                        class="mr-2 mb-3"
                        depressed
                        outlined
                        large
                        @click="clearList"
                        >クリア</v-btn
                      >
                      <v-btn
                        class="primary mb-3"
                        depressed
                        large
                        @click="select"
                        ><span>検索</span></v-btn
                      >
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
            <v-data-table
              :headers="shownHeaders"
              :items="screenModel.searchedRow"
              item-key="ID"
              dense
              multi-sort
              fixed-header
              show-select
              no-data-text="検索してください。"
              height="400"
            >
              <template #[`item.jn`]="{ item }">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="item.jn"
                  class="junArea textRight compact-form"
                  background-color="white"
                />
              </template>
              <template #[`item.jyry`]="{ item }">
                <div style="text-align: right">
                  {{ item.jyry == null ? '' : item.jyry.toLocaleString()
                  }}kg
                </div>
              </template>
              <template #[`item.sjCnt`]="{ item }">
                <div style="text-align: right">
                  {{
                    item.sjCnt == null ? '' : item.sjCnt.toLocaleString()
                  }}{{ item.shijiCntUnit }}
                </div>
              </template>

              <template #[`item.addr`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.addr }}</span>
                  </template>
                  <span>{{ item.addr }}</span>
                </v-tooltip>
              </template>

              <template #[`item.hnNm`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.hnNm }}</span>
                  </template>
                  <span>{{ item.hnNm }}</span>
                </v-tooltip>
              </template>
            </v-data-table>
            <div style="height: 40px"></div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="hoverBtn">
        <v-col class="d-flex justify-start mr-10">
          <v-btn
            class="mr-10 mb-3"
            depressed
            outlined
            large
            href="zaiko_hikiate"
            ><span>戻る</span></v-btn
          >
        </v-col>

        <v-col class="d-flex justify-center">
          <v-btn class="mx-5 mb-3 secondary" large href="zaiko_hikiate"
            ><span>一括引当</span></v-btn
          >
          <v-btn
            class="mx-5 mb-3 secondary"
            large
            href="zaiko_hikiate_kobetsu/1"
            ><span>個別引当</span></v-btn
          >
          <v-btn class="mx-5 mb-3 secondary" large @click="hikiateCancel"
            ><span>引当取消</span></v-btn
          >
        </v-col>

        <v-col class="d-flex justify-end ml-10">
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
        <draggable v-model="headers" tag="tbody" class="dragArea list-group">
          <tr
            v-for="header in shownHeadersDraggable"
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
</template>

<script>
import draggable from 'vuedraggable';
import * as axios from 'axios';
export default {
  data() {
    return {
      drawer: false,
      panelState: 0,
      // ダイアログ画面のclose用変数
      modal_date: false,
      // 出荷日用初期日付(fromのみ)
      // dates: [new Date().toISOString().substr(0, 10)],
      dates: ['2022-07-15'],

      // 画面モデル
      screenModel: {
        // 検索条件
        sykkYmd: ['2022-07-15'],
        hkatJyky: [],
        zikUm: null,
        ysuSydn: null,
        chuNoH: null,
        chuNoL: null,
        hnsy: null,

        // 検索結果一覧
        searchedRow: [],
      },

      headers: [
        {
          displayOrder: 2,
          text: '順',
          value: 'jn',
          width: 65,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 3,
          text: '出荷日',
          value: 'shkkYmd',
          width: 90,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 4,
          text: '到着日時',
          value: 'tutykDt',
          width: 120,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 5,
          text: '住所',
          value: 'addr',
          width: 150,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 6,
          text: '届先名',
          value: 'tdkskNm',
          width: 120,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 7,
          text: '注番',
          value: 'chuNo',
          width: 130,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 8,
          text: '得意先',
          value: 'tkisk',
          width: 150,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 9,
          text: '品名',
          value: 'hnNm',
          width: 180,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 10,
          text: '内訳№',
          value: 'ucwkNo',
          width: 90,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 11,
          text: '内訳名',
          value: 'ucwkNm',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 12,
          text: '重量',
          value: 'jyry',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 13,
          text: '指示数',
          value: 'sjCnt',
          width: 100,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 14,
          text: '営業備考',
          value: 'aigyBku',
          width: 120,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 1,
          text: '',
          value: 'ID',
          width: 65,
          shown: false,
          manage: true,
          sortable: false,
        },
      ],
      itemList: [],
      // リストボックスの初期値
      hikiateStatusModel: '未引当',
      // リストボックスの中身
      inputKbnList: ['新規', '引当取消', '強制完了'],
      binUnsoCdList: ['', '車建', '個配'],
      hikiateStatusList: ['未引当', '一部引当中', '引当済'],
      zaikoUmuList: ['', '在庫有り分', '在庫無し分'],
      hinsyuList: [
        '一般',
        '紙器',
        '特印',
        '液体',
        'プラスチック',
        '建装',
        'レーベル',
      ],
      kanriBukaList: [
        { text: '4 生活産業', value: '4' },
        { text: '6 西日本', value: '6' },
      ],

      headersBack: null,
    };
  },
  methods: {
    // クリアボタン
    clearList() {
      this.itemList = [];
    },
    // select() {
    //   this.itemList = this.resultList;
    //   this.panelState = false;
    // },
    select: async function () {
      try {
        const res = await axios.post(
          'http://localhost:8081/ssb01001pc/select',
          this.screenModel
        );
        if (res.data) {
          this.screenModel.searchedRow = res.data.searchedRow;
        }
      } catch (error) {
        alert('検索に失敗しました。');
      }
    },
    setting() {
      // 現在の状態を退避
      this.headersBack = JSON.parse(JSON.stringify(this.headers));
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
      this.headers = this.headersBack.concat();
      this.drawer = false;
    },
    appendClick() {
      // alert("クリックテスト");
    },
    hikiateCancel() {
      var result = confirm('引当を取り消します。よろしいですか？');
      if (result) {
        alert('取り消しました。');
      }
    },
    // datepickerクリア処理
    clear: function () {
      // this.dates = [new Date().toISOString().substr(0, 10)];
//      this.dates = ['2022-07-15'];
      this.screenModel.sykkYmd = ['2022-07-15'];
    },
  },
  computed: {
    shownHeaders() {
      return this.headers.filter((h) => h.shown);
    },
    shownHeadersDraggable() {
      return this.headers.filter((h) => !h.manage);
    },
    // datepickerのfrom-to日付ソートとYYYY-MM-DD形式→YYYY/MM/DD形式への変換
    dateRangeText() {
//      return this.dates.slice().sort().join(' ～ ').replaceAll('-', '/');
      return this.screenModel.sykkYmd.slice().sort().join(' ～ ').replaceAll('-', '/');
    },
  },
  components: {
    draggable,
  },
};
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
  text-align: center;
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

.compact-form {
  transform: scale(0.75);
  transform-origin: right;
}

/* datepicker ボタン定義 */
.subwin_button {
  width: 20%;
  text-align: center;
  margin: 10px;
  padding: 3px 3px;
  background: #bad6ee;
  border-radius: 10px;
}
</style>
