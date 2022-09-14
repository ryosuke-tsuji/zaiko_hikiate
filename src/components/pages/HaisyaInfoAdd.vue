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
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2"><span style="text-align:center">管理部署</span></v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="2" style="max-width: 70px"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&nbsp;デポ<span style="color: red">&nbsp;*</span></v-subheader>
                      <v-text-field background-color="yellow lighten-3" outlined dense clearable hint="" hide-details="auto" maxlength="4" style="max-width: 90px"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&ensp;品種</v-subheader>
                      <v-select :items="hinsyuList" dense outlined hide-details="auto" multiple style="max-width: 180px"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">輸送手段</v-subheader>
                      <v-select :items="binUnsoCdList" dense outlined hide-details="auto" style="max-width: 180px"></v-select>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="6">
                      <v-subheader class="mr-2">&ensp;出荷日</v-subheader>
                      <v-dialog ref="dialog_date" v-model="modal_date" :return-value.sync="dates" persistent width="30vw">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="dateRangeText" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on" outlined class="py-0" style="max-width: 250px; height: 40px;"></v-text-field>
                        </template>
                        <v-date-picker v-model="dates" locale="ja-jp" no-title range :day-format="(d) => new Date(d).getDate()">
                          <v-spacer></v-spacer>
                          <v-btn text class="subwin_button" color="primary" @click="modal_date = false">Cancel</v-btn>
                          <v-btn text class="subwin_button" color="primary" @click="$refs.dialog_date.save(dates)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&ensp;車番</v-subheader>
                      <v-text-field outlined hide-details="auto" clearable append-icon="mdi-magnify" dense @click:append="clickCarNo(-1)" maxlength="5" style="max-width: 130px;" class="textRight" v-model="selectWordCarNo"></v-text-field>
<!-- 車番検索をv-dialog化調査
                      <DTest textFieldStyle="max-width: 130px;"></DTest>
-->
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">運行回数</v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="2" style="max-width: 70px"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">指示状況</v-subheader>
                      <v-select :items="shijiStatusList" dense outlined hide-details="auto" multiple style="max-width: 180px"></v-select>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-col class="d-flex justify-end mr-5">
                      <v-btn class="mr-2 mb-3" depressed outlined large @click="clearList">クリア</v-btn>
                      <v-btn class="primary mr-2 mb-3" depressed large @click="selectShiji"><span>指示単位検索</span></v-btn>
                      <v-btn class="primary mb-3" depressed large @click="selectTodokesaki"><span>届け先単位検索</span></v-btn>
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
              <span class="titleFont d-flex">一括入力用</span>
              <span class="leyerTop" style="text-align: right;">
                <v-row class="text-right mt-3">
                  <v-spacer></v-spacer>
                  <v-col class="pt-0 pr-1 d-flex">
                    <v-subheader class="mr-2">&ensp;&ensp;車番</v-subheader>
                    <v-text-field outlined hide-details="auto" maxlength="5" clearable append-icon="mdi-magnify" dense @click:append="clickCarNo(-2)" v-model="selectCarNo" style="width: 125px"></v-text-field>
<!--
                    <DTest textFieldStyle="width: 125px;"></DTest>
-->
                  </v-col>
                  <v-col class="pt-0 pr-1 d-flex">
                    <v-subheader class="mr-2">運行回数</v-subheader>
                    <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="2" v-model="selectShippingCnt" style="width: 70px"></v-text-field>
                  </v-col>
                  <v-col class="pt-0 pr-1 d-flex">
                    <v-subheader class="mr-2">&ensp;&ensp;積込</v-subheader>
                    <v-select :items="loadingList" item-text="text" item-value="value" hide-details dense outlined v-model="selectLoading" style="width: 110px"></v-select>
                  </v-col>
                  <v-col class="pt-0 pr-1 d-flex">
                    <v-subheader class="mr-2">&ensp;&ensp;積卸</v-subheader>
                    <v-select :items="unloadingList" item-text="text" item-value="value" hide-details dense outlined v-model="selectUnloading" style="width: 240px"></v-select>
                  </v-col>
                  <v-col class="pt-0 pr-1 d-flex">
                    <v-btn class="primary mb-3" depressed large @click="copy"><span>反映</span></v-btn>
                  </v-col>
                </v-row>
              </span>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">
                <span v-if="searchTarget == '0'">検索結果（指示単位）</span>
                <span v-else-if="searchTarget == '1'">検索結果（届け先単位）</span>
                <span v-else>検索結果</span>
              </span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeaders" :items="itemList" v-model="selectRowList" dense multi-sort fixed-header show-select no-data-text="検索してください。" height=400 :item-class="rowClass">
              <template #[`item.shijiCnt`]="{ item }">
                <div style="text-align: right;">{{ (item.shijiCnt == nul ? "" : item.shijiCnt.toLocaleString()) }}{{ item.shijiCntUnit }}</div>
              </template>
              <template #[`item.weight`]="{ item }">
                <div style="text-align: right;">{{ (item.weight == null ? "" : item.weight.toLocaleString()) }}{{ item.weightUnit }}</div>
              </template>
              <template #[`item.fudagamiCnt`]="{ item }">
                <div style="text-align: right;">{{ (item.fudagamiCnt == null ? "" : item.fudagamiCnt.toLocaleString()) }}</div>
              </template>
              <template #[`item.hakoCnt`]="{ item }">
                <div style="text-align: right;">{{ (item.hakoCnt == null ? "" : item.hakoCnt.toLocaleString()) }}</div>
              </template>
              <template #[`item.cnt`]="{ item }">
                <div style="text-align: right;">{{ item.cnt }}</div>
              </template>
              <template #[`item.hikiate`]="{ item }">
                <span v-if="item.stateCd == 1" class="errorStatus">
                  <v-icon color="yellow darken-3" text class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert</v-icon>
                  {{ item.hikiate }}
                </span>
                <span v-else-if="item.stateCd == 2" class="errorStatus">
                  <v-icon color="yellow darken-3" text class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert</v-icon>
                  {{ item.hikiate }}
                </span>
                <span v-else-if="item.stateCd == 3" class="errorStatus">
                  <v-icon color="yellow darken-3" text class="btn-icon mr-2" style="background-color: transparent !important">mdi-alert</v-icon>
                  {{ item.hikiate }}
                </span>
                <span v-else>
                  {{ item.hikiate }}
                </span>
              </template>
              <template #[`item.carNo`]="{ item }">
                <v-text-field outlined dense hide-details="auto" background-color="white" clearable class="carNoArea textRight compact-form pl-0" maxlength="5" v-model="item.carNo" append-icon="mdi-magnify" @click:append="clickCarNo(item.id)" />
              </template>
              <template #[`item.shippingCnt`]="{ item }">
                <v-text-field outlined dense hide-details="auto" background-color="white" clearable class="textRight compact-form" maxlength="2" v-model="item.shippingCnt" />
              </template>
              <template #[`item.loading`]="{ item }">
                <v-select outlined dense hide-details="auto" background-color="white" class="compact-form" v-model="item.loading" :items="loadingList" item-text="text" item-value="value" ></v-select>
              </template>
              <template #[`item.unloading`]="{ item }">
                <v-select outlined dense hide-details="auto" background-color="white" class="compact-form" v-model="item.unloading" :items="unloadingList" item-text="text" item-value="value" ></v-select>
              </template>
              <template #[`item.kodateExcl`]="{ item }">
                <v-select outlined dense hide-details="auto" background-color="white" class="compact-form" v-model="item.kodateExcl" :items="kodateExclList" item-text="text" item-value="value" ></v-select>
              </template>
              <template #[`item.spShipping`]="{ item }">
                <v-select outlined dense hide-details="auto" background-color="white" class="compact-form" v-model="item.spShipping" :items="spShippingList" item-text="text" item-value="value" ></v-select>
              </template>
              <template #[`item.returnBin`]="{ item }">
                <v-select outlined dense hide-details="auto" background-color="white" class="compact-form" v-model="item.returnBin" :items="returnBinList" item-text="text" item-value="value" ></v-select>
              </template>
<!-- テーブルインテーブルはボツ
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-data-table v-if="itemDetailList.find(e => e.parentId == item.id)" :items="itemDetailList.find(e => e.parentId == item.id)?.detail" :headers="showHeadersDetail" dense multi-sort fixed-header hide-default-footer height=100></v-data-table>
                </td>
              </template>
-->
            </v-data-table>
            <div style="height:40px"></div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="hoverBtn">
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large @click="goBack"><span>戻る</span></v-btn>
          <v-btn class="mr-10 mb-3 secondary" large @click="shijiCancel"><span>指示取消</span></v-btn>
          <v-btn class="mr-10 mb-3 secondary" large @click="split"><span>輸送指示分割</span></v-btn>
          <v-btn class="mr-10 mb-3 secondary" large @click="integrageReq"><span>統合配車依頼</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
          <d-test textFieldStyle="max-width: 10px;"></d-test>
        </v-col>

        <v-col class="d-flex justify-end ml-10">
          <v-btn class="ml-5 mb-3 primary" large @click="add"><span>決定</span></v-btn>
          <v-btn class="ml-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- 車両番号 輸送会社選択画面 -->
    <car-no-search :showContent="showContent" @result="resDialog"></car-no-search>
  </div>    
</template>

<script>
import CarNoSearch from './dialogs/CarNoSearchDialog.vue'
export default {
  data() {
    return {
      panelState: 0,
      searchTarget: null,
      showContent: false,
      // ダイアログ画面のclose用変数
      modal_date: false,
      // 出荷日用初期日付(fromのみ)
      dates: [new Date().toISOString().substr(0, 10)],
      headers: [
        [
          { displayOrder: 1,  text: '出荷日',   value: 'shippingDate',  width: 70,  shown: true, manage: false, },
          { displayOrder: 2,  text: '到着日時', value: 'arrivalTime',   width: 180, shown: true, manage: false, },
          { displayOrder: 3,  text: '住所',     value: 'address',       width: 150, shown: true, manage: false, },
          { displayOrder: 4,  text: '届先名',   value: 'destName',      width: 120, shown: true, manage: false, },
          { displayOrder: 5,  text: '注番',     value: 'orderNo',       width: 120, shown: true, manage: false, },
          { displayOrder: 6,  text: '得意先',   value: 'customerName',  width: 150, shown: true, manage: false, },
          { displayOrder: 7,  text: '品名',     value: 'productName',   width: 180, shown: true, manage: false, },
          { displayOrder: 8,  text: '内訳№',   value: 'uchiwakeNo',    width: 80,  shown: true, manage: false, },
          { displayOrder: 9,  text: '内訳名',   value: 'uchiwakeName',  width: 100, shown: true, manage: false, },
          { displayOrder: 10, text: '指示数',   value: 'shijiCnt',      width: 100, shown: true, manage: false, },
          { displayOrder: 11, text: '重量',     value: 'weight',        width: 100, shown: true, manage: false, },
          { displayOrder: 12, text: '札紙枚数', value: 'fudagamiCnt',   width: 100, shown: true, manage: false, },
          { displayOrder: 13, text: '箱数',     value: 'hakoCnt',       width: 80,  shown: true, manage: false, },
          { displayOrder: 14, text: '引当',     value: 'hikiate',       width: 150, shown: true, manage: false, },
          { displayOrder: 15, text: '輸送手段', value: 'shippingWay',   width: 100, shown: true, manage: false, },
          { displayOrder: 16, text: '車番',     value: 'carNo',         width: 140, shown: true, manage: false, },
          { displayOrder: 17, text: '運行回数', value: 'shippingCnt',   width: 80, shown: true, manage: false, },
          { displayOrder: 18, text: '積込',     value: 'loading',       width: 140, shown: true, manage: false, },
          { displayOrder: 19, text: '積卸',     value: 'unloading',     width: 270, shown: true, manage: false, },
          { displayOrder: 20, text: '個建除外', value: 'kodateExcl',    width: 170, shown: true, manage: false, },
          { displayOrder: 21, text: '特別輸送', value: 'spShipping',    width: 200, shown: true, manage: false, },
          { displayOrder: 22, text: '帰り便',   value: 'returnBin',     width: 100, shown: true, manage: false, },
          { displayOrder: 23, text: '営業備考', value: 'eigyoBiko',     width: 120, shown: true, manage: false, },
          { displayOrder: 24, text: '指示状況', value: 'shijiStatus',   width: 150, shown: true, manage: false, },
          { displayOrder: 95, text: '',         value: 'shijiCntUnit',  width: 100, shown: false, manage: true, },
          { displayOrder: 96, text: '',         value: 'weightUnit',    width: 100, shown: false, manage: true, },
          { displayOrder: 97, text: '',         value: 'integrageState', width: 65, shown: false, manage: true, sortable: false, },
          { displayOrder: 98, text: '',         value: 'stateCd',       width: 65,  shown: false, manage: true, sortable: false, },
          { displayOrder: 99, text: '',         value: 'id',            width: 65,  shown: false, manage: true, sortable: false, },
        ],
        [
          { displayOrder: 1,  text: '出荷日',   value: 'shippingDate',  width: 70,  shown: true, manage: false, },
          { displayOrder: 2,  text: '到着日時', value: 'arrivalTime',   width: 180, shown: true, manage: false, },
          { displayOrder: 3,  text: '住所',     value: 'address',       width: 150, shown: true, manage: false, },
          { displayOrder: 4,  text: '届先名',   value: 'destName',      width: 120, shown: true, manage: false, },
          { displayOrder: 5,  text: '件数',     value: 'cnt',           width: 70, shown: true, manage: false, },
          { displayOrder: 6,  text: '重量',     value: 'weight',        width: 120, shown: true, manage: false, },
          { displayOrder: 7,  text: '札紙枚数', value: 'fudagamiCnt',   width: 100, shown: true, manage: false, },
          { displayOrder: 8,  text: '引当',     value: 'hikiate',       width: 150, shown: true, manage: false, },
          { displayOrder: 9,  text: '箱数',     value: 'hakoCnt',       width: 80,  shown: true, manage: false, },
          { displayOrder: 10, text: '輸送手段', value: 'shippingWay',   width: 100, shown: true, manage: false, },
          { displayOrder: 11, text: '車番',     value: 'carNo',         width: 140, shown: true, manage: false, },
          { displayOrder: 12, text: '運行回数', value: 'shippingCnt',   width: 80,  shown: true, manage: false, },
          { displayOrder: 13, text: '積込',     value: 'loading',       width: 140, shown: true, manage: false, },
          { displayOrder: 14, text: '積卸',     value: 'unloading',     width: 270, shown: true, manage: false, },
          { displayOrder: 15, text: '帰り便',   value: 'returnBin',     width: 100, shown: true, manage: false, },
          { displayOrder: 16, text: '営業備考', value: 'eigyoBiko',     width: 120, shown: true, manage: false, },
          { displayOrder: 17, text: '指示状況', value: 'shijiStatus',   width: 150, shown: true, manage: false, },
          { displayOrder: 91, text: '',         value: 'weightUnit',    width: 100, shown: false, manage: true, },
          { displayOrder: 97, text: '',         value: 'integrageState', width: 65, shown: false, manage: true, sortable: false, },
          { displayOrder: 98, text: '',         value: 'stateCd',       width: 65,  shown: false, manage: true, sortable: false, },
          { displayOrder: 99, text: '',         value: 'ID',            width: 65,  shown: false, manage: true, sortable: false, },
        ],
      ],
      headersDetail: [
        { text: '注番',     value: 'orderNo',        width: 120, shown: true, },
        { text: '得意先',   value: 'customerName',   width: 150, shown: true, },
        { text: '品名',     value: 'productName',    width: 180, shown: true, },
        { text: '内訳№',   value: 'uchiwakeNo',     width: 80,  shown: true,  },
        { text: '内訳名',   value: 'uchiwakeName',   width: 100, shown: true, },
        { text: '指示数',   value: 'shijiCnt',       width: 100, shown: true, },
        { text: '札紙枚数', value: 'fudagamiCnt',    width: 100, shown: true, },
        { text: '箱数',     value: 'hakoCnt',        width: 80,  shown: true,  },
        { text: '引当',     value: 'hikiate',        width: 150, shown: true, },
        { text: '重量',     value: 'weight',         width: 100, shown: true, },
        { text: '営業備考', value: 'eigyoBiko',      width: 120, shown: true, },
        { text: '指示状況', value: 'shijiStatus',    width: 150, shown: true, },
        { text: '',         value: 'integrageState', width: 65,  shown: false, },
        { text: '',         value: 'stateCd',        width: 65,  shown: false, },
        { text: '',         value: 'shijiCntUnit',   width: 100, shown: false, },
        { text: '',         value: 'weightUnit',     width: 100, shown: false, },
        { text: '',         value: 'id',             width: 65,  shown: false, },
      ],
      itemList: [],
      resultList: [
        [
          // 0:指示単位検索
          {
            id: 1,
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
            shijiCnt: 42000,
            shijiCntUnit: " S",
            fudagamiCnt: 2,
            hakoCnt: 14,
            hikiate: "全数引当済",
            shippingWay: "車建",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            kodateExcl: null,
            spShipping: null,
            returnBin: "",
            weight: 1800,
            weightUnit: "kg",
            eigyoBiko: "",
            shijiStatus: "",
            integrageState: "未指示",
            stateCd: "0",
          },
          {
            id: 2,
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
            shijiCnt: 64000,
            shijiCntUnit: " S",
            fudagamiCnt: 1,
            hakoCnt: 90,
            hikiate: "一部欠品",
            shippingWay: "車建",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            kodateExcl: null,
            spShipping: null,
            returnBin: "",
            weight: 300,
            weightUnit: "kg",
            eigyoBiko: "",
            shijiStatus: "統合配車依頼済",
            integrageState: "1",
            stateCd: "1",
          },
          {
            id: 3,
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
            shijiCnt: 52000,
            shijiCntUnit: " S",
            fudagamiCnt: 2,
            hakoCnt: 6,
            hikiate: "強制決定",
            shippingWay: "車建",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            kobetsuExcl: null,
            spShipping: null,
            returnBin: "",
            weight: 500,
            weightUnit: "kg",
            eigyoBiko: "",
            shijiStatus: "統合配車依頼済",
            integrageState: "1",
            stateCd: "2",
          },
          {
            id: 4,
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
            shijiCnt: 6048,
            shijiCntUnit: " S",
            fudagamiCnt: 1,
            hakoCnt: 14,
            hikiate: "引当保留",
            shippingWay: "個配",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            kodateExcl: null,
            spShipping: null,
            returnBin: "",
            weight: 200,
            weightUnit: "kg",
            eigyoBiko: "",
            shijiStatus: "指示済",
            integrageState: "",
            stateCd: "3",
          },
        ],
        [
          {
            id: 1,
            shippingDate: "07/15",
            arrivalTime: "07/15 08:00 - 12:00",
            address: "東京都墨田区文花２－１－３",
            destName: "東京工場",
            cnt: 1,
            weight: 1800,
            fudagamiCnt: 3,
            hikiate: "全数引当済",
            hakoCnt: 14,
            shippingWay: "車建",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            returnBin: "",
            eigyoBiko: "",
            shijiStatus: "",
            weightUnit: "kg",
            integrageState: "",
            stateCd: "0",
          },
          {
            id: 2,
            shippingDate: "07/15",
            arrivalTime: "07/15",
            address: "東京都江戸川区小松川４－９２",
            destName: "㈲ヨコヤマ",
            cnt: 2,
            weight: 800,
            fudagamiCnt: 3,
            hikiate: "一部欠品",
            hakoCnt: 96,
            shippingWay: "車建",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            returnBin: "",
            eigyoBiko: "",
            shijiStatus: "統合配車依頼済",
            weightUnit: "kg",
            stateCd: "1",            
          },
          {
            id: 3,
            shippingDate: "07/15",
            arrivalTime: "07/15",
            address: "埼玉県志木市中宗岡３－２５－１４",
            destName: "㈲双葉商事",
            cnt: 1,
            weight: 200,
            fudagamiCnt: 1,
            hikiate: "引当保留",
            hakoCnt: 14,
            shippingWay: "個配",
            carNo: "",
            shippingCnt: "",
            loading: null,
            unloading: null,
            returnBin: "",
            eigyoBiko: "",
            shijiStatus: "統合配車依頼済",
            weightUnit: "kg",
            stateCd: "3",            
          },
        ]
      ],
      itemDetailList: [
        {},
        {
          parentId: 2,
          detail:[
            {
              id: 1,
              orderNo: "4	8A61Q2",
              customerName: "コカ・コーラ",
              productName: "７ミリヨウチューブ",
              uchiwakeNo: "01",
              uchiwakeName: "本体",
              shijiCnt: 64000,
              shijiCntUnit: " S",
              fudagamiCnt: 1,
              hakoCnt: 90,
              hikiate: "一部欠品",
              weight: 300,
              weightUnit: "kg",
              eigyoBiko: "",
              shijiStatus: "統合配車依頼済",
              integrageState: "1",
              stateCd: "1",
            },
            {
              id: 2,
              orderNo: "4	8O45S2",
              customerName: "コカ・コーラ",
              productName: "１１５＿７Ｍ／Ｍ　ヨウ　リング",
              uchiwakeNo: "01",
              uchiwakeName: "本体",
              shijiCnt: 52000,
              shijiCntUnit: " S",
              fudagamiCnt: 2,
              hakoCnt: 6,
              hikiate: "強制決定",
              weight: 500,
              weightUnit: "kg",
              eigyoBiko: "",
              shijiStatus: "統合配車依頼済",
              integrageState: "1",
              stateCd: "2",
            }
          ]
        },
        {},
      ],
      selectRowList: [],
      selectCarNo: null,
      selectShippingCnt: null,
      selectLoading: null,
      selectUnloading: null,
      selectWordCarNo: null,
      // リストボックスの中身
      hinsyuList: ["一般", "紙器", "特印", "液体", "プラスチック", "建装", "レーベル"],
      binUnsoCdList: ["", "全て", "車建（区域）", "個配（地方）"],
      shijiStatusList: ["未指示","指示済","統合配車指示済"],
      loadingList: [
        { text:"", value: null },
        { text:"積置き",value:"0" }, 
        { text:"朝積み", value:"1" }
      ],
      unloadingList: [
        { text:"", value: null },
        { text:"PL積み・PL卸し",value:"0" }, 
        { text:"PL積み・手卸し",value:"1" }, 
        { text:"PL積み・指定PL積替え",value:"2" }, 
        { text:"手積み・指定PL積替え",value:"3" }, 
        { text:"手積み・手卸し",value:"4" }, 
      ],
      kodateExclList: [
        { text:"", value: null },
        { text:"実費請求", value:"0" },
        { text:"請求不可", value:"1" },
      ],
      spShippingList: [
        { text:"", value: null },
        { text:"緊急輸送指示", value:"0" },
        { text:"配送条件", value:"1" },
        { text:"入荷遅延", value:"2" },
      ],
      returnBinList: [
        { text:"", value: null },

      ],
    }
  },
  methods: {
    // クリアボタン
    clearList() {
      this.itemList = [];
      this.panelState = 0;
    },
    // 指示単位検索ボタン
    selectShiji() {
      this.searchTarget = 0;
      this.itemList = this.resultList[this.searchTarget];
      this.panelState = false;
    },
    // 届け先単位検索ボタン
    selectTodokesaki() {
      this.searchTarget = 1;
      this.itemList = this.resultList[this.searchTarget];
      this.panelState = false;
    },
    // 戻るボタン
    goBack() {
      this.$$router.push("haisya_add");
    },
    // 指示取消ボタン
    shijiCancel() {

    },
    // 輸送指示分割ボタン
    split() {

    },
    // 統合配車依頼ボタン
    integrageReq() {
      var result = confirm("統合配車依頼を行います。よろしいですか？");
      if (result) {
        for (const rowInfo of this.selectRowList) {
          if (rowInfo.integrageState != "1") {
            rowInfo.integrageState = "1";
            rowInfo.shijiStatus = "統合配車依頼済";
          }
        }
        this.selectRowList = [];
        alert("依頼しました。");
      }
    },
    // 決定ボタン
    add() {
      var result = confirm("輸送指示を確定します。よろしいですか？");
      if (result) {
        alert("確定しました。");
      }
    },
    // 設定ボタン
    setting() {

    },
    // 反映ボタン
    copy() {
      var result = confirm("入力内容を反映させます。よろしいですか？");
      if (result) {
        for (const rowInfo of this.selectRowList) {
          rowInfo.carNo = this.selectCarNo;
          rowInfo.shippingCnt = this.selectShippingCnt;
          rowInfo.loading = this.selectLoading;
          rowInfo.unloading = this.selectUnloading;
        }
        this.selectRowList = [];
        alert("反映しました。");
      }
    },
    // 車番検索ボタン
     clickCarNo(idx) {
      this.idx = idx;
      this.showContent = true;
    },
    // 一覧表内文字色動的変更
    rowClass(item) {
      // 総合配車依頼済の場合、文字色を青に変更
      if (item.integrageState == "1") {
        return "successStatus";
      }
      return "errorStatus";
    },
    // 車両検索結果
    resDialog(obj) {
      if (obj.res) {
        switch (this.idx) {
          case -1:  // 検索条件
            this.selectWordCarNo = obj.carNo;
            break;
          case -2:  // 一括入力
            this.selectCarNo = obj.carNo;
            break;
          default:
            for (const rowInfo of this.itemList) {
              if (rowInfo.id == this.idx) {
                rowInfo.carNo = obj.carNo;
                break;
              }
            }
        }
      }
      this.showContent = false;
    },
    // datepickerクリア処理
    clear: function () {
      this.dates = [new Date().toISOString().substr(0, 10)];
    },

  },
  computed: {
    shownHeaders() {
      if (this.searchTarget == null)
        return [];
      return this.headers[this.searchTarget].filter(h => h.shown);
    },
    showHeadersDetail() {
      return this.headersDetail.filter(h => h.shown);
    },
    // datepickerのfrom-to日付ソートとYYYY-MM-DD形式→YYYY/MM/DD形式への変換
    dateRangeText() {
      return this.dates.slice().sort().join(' ～ ').replaceAll('-', '/');
    },
  },
  components: {
    CarNoSearch,
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

.compact-form {
  transform: scale(0.75);
/*  transform-origin: right;*/
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




.textRight input {
  text-align: right;
}
.errorStatus {
  /* text-danger */
  color: red;
}

.carNoArea {
  width: 125px;
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
<style>
.successStatus {
  color: blue;
}
</style>