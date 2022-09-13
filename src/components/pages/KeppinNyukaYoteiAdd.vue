<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
            <v-expansion-panels v-model="panelState">
              <v-expansion-panel>
                <v-expansion-panel-header class="py-0 d-inline-flex">
                  <span class="px-0 titleFont leyerBottom">引当結果抽出条件</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2"><span style="text-align:center">管理部署</span></v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="2" style="max-width: 70px"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&nbsp;デポ</v-subheader>
                      <v-text-field outlined dense clearable hint="" hide-details="auto" maxlength="4" style="max-width: 90px"></v-text-field>
                    </v-col>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">&ensp;&ensp;品種</v-subheader>
                      <v-select :items="hinsyuList" dense outlined hide-details="auto" multiple style="max-width: 180px"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">生産場所</v-subheader>
                      <ProductPlaceSearch />
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
                      <v-subheader class="mr-2">登録状況</v-subheader>
                      <v-select :items="statusList" dense outlined hide-details="auto" style="max-width: 130px"></v-select>
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
              <span class="titleFont d-flex">引当結果（欠品分）</span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeaders" :items="itemList" dense multi-sort fixed-header show-select no-data-text="検索してください。" height=400>
              <template #[`item.shijiCnt`]="{ item }">
                <div style="text-align: right;">{{ (item.shijiCnt == null ? "" : item.shijiCnt.toLocaleString()) }}{{ item.shijiCntUnit }}</div>
              </template>
              <template #[`item.fusokuCnt`]="{ item }">
                <div v-if="isFusoku(item.fusokuCnt)" class="text-end errorStatus">{{ (item.fusokuCnt == null ? "" : item.fusokuCnt.toLocaleString()) }}</div>
                <div v-else style="text-align: right;">{{ (item.fusokuCnt == null ? "" : item.fusokuCnt.toLocaleString()) }}</div>
              </template>
              <template #[`item.productionTime`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.productionTime" class="compact-form" background-color="white" type="time" /> 
              </template>
              <template #[`item.productPlace`]="{ item }">
                <ProductPlaceSearch :value="item.productPlace" />
              </template>
              <template #[`item.sokoCd`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.sokoCd" class="compact-form" background-color="white"  /> 
              </template>
              <template #[`item.iriCnt`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.iriCnt" class="compact-form" background-color="white"  /> 
              </template>
              <template #[`item.uchiCnt`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.uchiCnt" class="compact-form" background-color="white"  /> 
              </template>
              <template #[`item.hakoCnt`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.hakoCnt" class="compact-form" background-color="white"  /> 
              </template>
              <template #[`item.totalCnt`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.totalCnt" class="compact-form" background-color="white"  /> 
              </template>
              <template #[`item.totalCntUnit`]="{ item }">
                <v-text-field outlined dense hide-details v-model="item.totalCntUnit" class="compact-form" background-color="white"  /> 
              </template>




            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="hoverBtn">
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large href="zaiko_hikiate"><span>戻る</span></v-btn>
          <v-btn class="mx-5 mb-3 secondary" large @click="cancel"><span>取消</span></v-btn>
        </v-col>

        <v-col class="d-flex justify-center">
        </v-col>

        <v-col class="d-flex justify-end ml-10">
            <v-btn class="ml-10 mb-3 primary" depressed large @click="fixClick"><span>確定</span></v-btn>
          <v-btn class="ml-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
import ProductPlaceSearch from '@/components/pages/dialogs/ProductPlaceSearchDialog.vue'
export default {
  data() {
    return {
      drawer: false,
      panelState: 0,
      // datepicker関係の変数定義 --start
      // ダイアログ画面のclose用変数
      modal_date: false,
      // 出荷日用初期日付(fromのみ)
      dates: [new Date().toISOString().substr(0, 10)],
      // datepicker関係の変数定義 --end
      headers: [
        { text:"出荷日",     value:"shippingDate",   width:70,  shown:true,  manage: false, },
        { text:"届先名",     value:"destName",       width:120, shown:true,  manage: false, },
        { text:"注番",       value:"orderNo",        width:100, shown:true,  manage: false, },
        { text:"得意先",     value:"customerName",   width:150, shown:true,  manage: false, },
        { text:"品名",       value:"productName",    width:180, shown:true,  manage: false, },
        { text:"内訳№",     value:"uchiwakeNo",     width:80,  shown:true,  manage: false, },
        { text:"内訳名",     value:"uchiwakeName",   width:100, shown:true,  manage: false, },
        { text:"指示数",     value:"shijiCnt",       width:100, shown:true,  manage: false, },
        { text:"不足数",     value:"fusokuCnt",      width:90,  shown:true,  manage: false, },
        { text:"生産完了日", value:"productionYMD",  width:180, shown:true,  manage: false, },
        { text:"時間",       value:"productionTime", width:120, shown:true,  manage: false, },
        { text:"生産場所",   value:"productPlace",   width:250, shown:true,  manage: false, },
        { text:"倉庫コード", value:"sokoCd",         width:100, shown:true,  manage: false, },
        { text:"入り数",     value:"iriCnt",         width:100, shown:true,  manage: false, },
        { text:"内数",       value:"uchiCnt",        width:60,  shown:true,  manage: false, },
        { text:"箱数",       value:"hakoCnt",        width:60,  shown:true,  manage: false, },
        { text:"総数",       value:"totalCnt",       width:120, shown:true,  manage: false, },
        { text:"単位",       value:"totalCntUnit",   width:80,  shown:true,  manage: false, },
        { text:"ステータス", value:"status",         width:140, shown:true,  manage: false, },
        { text:"",           value:"id",             width:30,  shown:false, manage: true,  },
      ],
      itemList: [],
      itemsKeppinList: [
        {
          id:1,
          shippingDate:"07/15",
          destName:"㈲ヨコヤマ",
          orderNo:"4 8A61Q2",
          customerName:"コカ・コーラ",
          productName:"７ミリヨウチューブ",
          uchiwakeNo:"01",
          uchiwakeName:"本体",
          shijiCnt:64000,
          shijiCntUnit:" S",
          fusokuCnt:-6400,
          productionYMD:"07/15",
          productionTime:"12:00",
          productPlace:"幸手工場",
          sokoCd:"1810",
          iriCnt:"640 S",
          uchiCnt:null,
          hakoCnt:10,
          totalCnt:6400,
          totalCntUnit:"S",
          status:"未登録",
        },
        {
          id:2,
          shippingDate:"07/18",
          destName:"㈲ヨコヤマ",
          orderNo:"4 8A61Q2",
          customerName:"コカ・コーラ",
          productName:"９ミリヨウチューブ",
          uchiwakeNo:"01",
          uchiwakeName:"本体",
          shijiCnt:64000,
          shijiCntUnit:" S",
          fusokuCnt:-6400,
          productionYMD:"07/15",
          productionTime:"12:00",
          productPlace:"幸手工場",
          sokoCd:"1810",
          iriCnt:"640 S",
          uchiCnt:null,
          hakoCnt:10,
          totalCnt:6400,
          totalCntUnit:"S",
          status:"未登録",
        },
      ],
      // リストボックスの中身
      hinsyuList: ["一般", "紙器", "特印", "液体", "プラスチック", "建装", "レーベル"],
      statusList: ["","未登録","登録済"],

    }
  },
  computed: {
    shownHeaders() {
      return this.headers.filter(h => h.shown);
    },
    // datepickerのfrom-to日付ソートとYYYY-MM-DD形式→YYYY/MM/DD形式への変換
    dateRangeText() {
      return this.dates.slice().sort().join(' ～ ').replaceAll('-', '/');
    },
  },
  components: {
    ProductPlaceSearch,
  },
  methods: {
    // クリアボタン
    clearList() {
      this.itemList = [];
    },
    // 検索ボタン
    select() {
      this.itemList = this.itemsKeppinList;
      this.panelState = false;
    },
    // 取消ボタン
    cancel() {

    },
    // 確定ボタン
    fixClick() {

    },
    // 設定ボタン
    setting() {

    },
    isFusoku() {
      return function(fusoku) {
        let fusokuNum = parseInt(fusoku.replace(/,/g, ''));
        if (fusokuNum < 0)
          return true;
        return false;
      }
    },
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
  text-align: center;
}


.errorStatus {
  /* text-danger */
  color: red;
}
.compact-form {
  transform: scale(0.875);
  transform-origin: left;
}


</style>
