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
                        :return-value.sync="screenModel.sykkYmdList"
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
                            style="max-width: 275px; height: 40px"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="screenModel.sykkYmdList"
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
                            @click="
                              $refs.dialog_date.save(screenModel.sykkYmdList)
                            "
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">引当状況</v-subheader>
                      <v-select
                        v-model="screenModel.hkatJykyList"
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
                        v-model="screenModel.zikUm"
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
                        v-model="screenModel.ysuSydn"
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
                        v-model="screenModel.knrbmn"
                        :items="kanriBukaList"
                        dense
                        outlined
                        multiple
                        hide-details="auto"
                        style="max-width: 150px"
                      ></v-select>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2">事&emsp;注番</v-subheader>
                      <v-text-field
                        v-model="screenModel.chuNoH"
                        outlined
                        dense
                        clearable
                        hint=""
                        hide-details="auto"
                        maxlength="2"
                        style="max-width: 70px"
                      ></v-text-field>
                      <v-text-field
                        v-model="screenModel.chuNoL"
                        outlined
                        dense
                        clearable
                        hint=""
                        hide-details="auto"
                        maxlength="7"
                        style="max-width: 155px"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&ensp;品種</v-subheader>
                      <v-select
                        v-model="screenModel.hnsy"
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
              v-model="selectRowList"
              dense
              multi-sort
              fixed-header
              show-select
              :loading="loadingFlg"
              no-data-text="検索してください。"
              loading-text="検索中です。"
              :height="tableHeight"
            >
              <template #[`item.jn`]="{ item }">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  v-model="item.jn"
                  class="compact-form textRight"
                  background-color="white"
                  type="number"
                  min="0"
                />
              </template>
              <template #[`item.jyry`]="{ item }">
                <div style="text-align: right">
                  {{ item.jyry == null ? '' : item.jyry.toLocaleString() }}
                  kg
                </div>
              </template>
              <template #[`item.sjNum`]="{ item }">
                <div style="text-align: right">
                  {{ item.sjNum == null ? '' : item.sjNum.toLocaleString()
                  }}{{ item.sjNumUnit }}
                </div>
              </template>

              <template #[`item.tutykDt`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.tutykDt }}</span>
                  </template>
                  <span>{{ item.tutykDt }}</span>
                </v-tooltip>
              </template>
              <template #[`item.addr`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.addr }}</span>
                  </template>
                  <span>{{ item.addr }}</span>
                </v-tooltip>
              </template>
              <template #[`item.tdkskNm`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.tdkskNm }}</span>
                  </template>
                  <span>{{ item.tdkskNm }}</span>
                </v-tooltip>
              </template>
              <template #[`item.tkisk`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.tkisk }}</span>
                  </template>
                  <span>{{ item.tkisk }}</span>
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
              <template #[`item.aigyBku`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.aigyBku }}</span>
                  </template>
                  <span>{{ item.aigyBku }}</span>
                </v-tooltip>
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
            href="zaiko_hikiate"
            ><span>戻る</span></v-btn
          >
        </v-col>

        <v-col class="d-flex justify-center">
          <v-btn class="mx-5 mb-3 secondary" large href="zaiko_hikiate"
            ><span>一括引当</span></v-btn
          >
          <KobetsuDlg
            :kobetsuIdx="this.kobetsuIdx"
            :selectRowList="this.selectRowList"
            @result="resDialog"
            ref="kobetsu"
          />
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
import KobetsuDlg from '@/components/pages/Ssb01002Pc.vue';
export default {
  data() {
    return {
      drawer: false,
      panelState: 0,
      loadingFlg: false,
      today: new Date(),
      // ダイアログ画面のclose用変数
      modal_date: false,
      // 個別画面表示用モデル
      showKobetsuContent: false,

      // 画面モデル
      screenModel: {
        // 検索条件
        // 出荷日
        sykkYmdList: [],
        // 引当状況
        hkatJykyList: [],
        // 在庫有無
        zikUm: null,
        // 輸送手段
        ysuSydn: null,
        // 管理部署
        knrbmn: [],
        // 事 注番
        chuNoH: null,
        chuNoL: null,
        // 品種
        hnsy: [],

        // 検索結果一覧
        searchedRow: [],
      },

      headers: [
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
          value: 'sjNum',
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
          displayOrder: 15,
          text: '順',
          value: 'jn',
          width: 90,
          shown: true,
          manage: false,
        },
        {
          displayOrder: 99,
          text: '',
          value: 'id',
          width: 65,
          shown: false,
          manage: true,
          sortable: false,
        },
      ],
      // リストボックスの中身
      binUnsoCdList: [
        { text: '', value: null },
        { text: '車建', value: '0' },
        { text: '個配', value: '1' },
      ],
      hikiateStatusList: [
        { text: '未引当', value: '0' },
        { text: '一部引当中', value: '1' },
        { text: '引当済', value: '2' },
      ],
      zaikoUmuList: [
        { text: '', value: null },
        { text: '在庫有り分', value: '0' },
        { text: '在庫無し分', value: '1' },
      ],
      hinsyuList: [
        { text: '一般', value: '0' },
        { text: '紙器', value: '1' },
        { text: '特印', value: '2' },
        { text: '液体', value: '3' },
        { text: 'プラスチック', value: '4' },
        { text: '建装', value: '5' },
        { text: 'レーベル', value: '6' },
      ],
      kanriBukaList: [
        { text: '4 生活産業', value: '4' },
        { text: '6 西日本', value: '6' },
      ],

      selectRowList: [],
      kobetsuIdx: 0,
      hikiateArray: [],
      headersBack: null,
    };
  },
  methods: {
    // クリアボタン
    clearList() {
      var nextDay = new Date();
      nextDay.setDate(new Date().getDate() + 1);
      this.screenModel.searchedRow = [];
      this.screenModel.sykkYmdList = [nextDay.toISOString().substr(0, 10)];
      this.screenModel.hkatJykyList = ['0'];
      this.screenModel.zikUm = null;
      this.screenModel.ysuSydn = null;
      this.screenModel.knrbmn = [];
      this.screenModel.chuNoH = null;
      this.screenModel.chuNoL = null;
      this.screenModel.hnsy = [];
    },
    select: async function () {
      try {
        this.loadingFlg = true;
        this.selectRowList = [];
        const res = await axios.post(
          'http://localhost:8081/ssb01001pc/select',
          this.screenModel
        );
        this.loadingFlg = false;
        if (res.data) {
          this.screenModel.searchedRow = res.data.searchedRow;
          this.panelState = '1';
        }
      } catch (error) {
        alert('検索に失敗しました。');
        this.loadingFlg = false;
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
    kobetsu_hikiate() {
      this.hikiateArray = [];
      var currentId = 1;
      var chuNo = null;
      for (const rowInfo of this.selectRowList) {
        this.hikiateArray.push({
          targetId: currentId++,
          chuNo: rowInfo.chuNo,
          proc: false,
        });
        chuNo = rowInfo.chuNo;
      }
      if (this.hikiateArray.length > 0) {
        this.$router.push({
          name: 'zaiko_hikiate_kobetsu',
          params: {
            chuNo: chuNo,
            id: 1,
          },
        });
      }
    },
    hikiateCancel() {
      var result = confirm('引当を取り消します。よろしいですか？');
      if (result) {
        alert('取り消しました。');
      }
    },
    // datepickerクリア処理
    clear: function () {
      this.screenModel.sykkYmdList = ['2022-07-15'];
    },
    // 個別画面戻り
    resDialog(obj) {
      if (obj.res) {
        // 決定:1, 強制決定:2, 引当保留:3
        this.screenModel.searchedRow[this.kobetsuIdx].kobetsuStatus =
          obj.status;
        if (this.selectRowList.length > this.kobetsuIdx + 1) {
          // 次の個別画面へ
          this.kobetsuIdx++;
          this.$refs.kobetsu.getData(this.kobetsuIdx);
        } else {
          // 確定画面へ
          this.$refs.kobetsu.dialogClose();
          this.kobetsuIdx = 0;
        }
      }
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
      return this.screenModel.sykkYmdList
        .slice()
        .sort()
        .join(' ～ ')
        .replaceAll('-', '/');
    },

    // 解像度に応じてテーブル高さを変更（改良の余地あり）
    tableHeight: function () {
      return this.panelState === undefined || this.panelState === '1'
        ? this.$vuetify.breakpoint.name === 'xl'
          ? '750px'
          : '340px'
        : this.$vuetify.breakpoint.name === 'xl'
        ? '570px'
        : '95px'; //検索条件5行の場合20だとぴたり
    },
  },
  components: {
    draggable,
    KobetsuDlg,
  },
  mounted: function () {
    this.clearList();
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

.hoverBtn {
  position: fixed;
  background-color: white;
  bottom: 30px;
  width: 100%;
}

.compact-form {
  transform: scale(0.75);
  transform-origin: left;
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
