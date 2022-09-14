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
                      <ProductPlaceSearch fStyle="max-width: 300px;" />
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
              <div class="text-right leyerTop" style="width:400px;">
                <v-btn class="mt-3 mb-3 secondary" depressed large @click="rowAdd"><span>行挿入</span></v-btn>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeaders" :items="itemsList" v-model="selectItemList" dense multi-sort fixed-header show-select no-data-text="検索してください。" height=400>
              <template #[`item.shijiCnt`]="{ item }">
                <div style="text-align: right;">{{ (item.shijiCnt == null ? "" : item.shijiCnt.toLocaleString()) }}{{ item.shijiCntUnit }}</div>
              </template>
              <template #[`item.fusokuCnt`]="{ item }">
                <div v-if="isFusoku(item.fusokuCnt)" class="text-end errorStatus">{{ (item.fusokuCnt == null ? "" : item.fusokuCnt.toLocaleString()) }}</div>
                <div v-else style="text-align: right;">{{ (item.fusokuCnt == null ? "" : item.fusokuCnt.toLocaleString()) }}</div>
              </template>

              <!-- TODO: text-fieldからdate-pickerへの値渡し、dialog表示条件など要件等 -->
              <template #[`item.productionYMD`]="{ item }">
                <v-dialog ref="dialog_date[item.id]" v-model="modal_date" :return-value.sync="item.productionYMD" persistent width="30vw">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="item.productionYMD" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on" outlined class="py-0 compact-form" style="max-width: 250px; max-height: 38px;" background-color="white" />
                  </template>
                  <v-date-picker v-model="item.productionYMD" locale="ja-jp" no-title  :day-format="(d) => new Date(d).getDate()">
                    <!-- {{item.productionYMD}} -->
                    <v-spacer></v-spacer>
                    <v-btn text class="subwin_button" color="primary" @click="modal_date = false">Cancel</v-btn>
                    <v-btn text class="subwin_button" color="primary" @click="modal_date = false">OK</v-btn>
                    <!-- <v-btn text class="subwin_button" color="primary" @click="$refs.dialog_date[item.id].save(item.productionYMD)">OK</v-btn> -->
                  </v-date-picker>
                </v-dialog>
              </template>

              <template #[`item.productionTime`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.productionTime" class="compact-form" background-color="white" type="time" /> 
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.productionTime" class="compact-form" background-color="white" type="time" readonly /> 
              </template>
              <template #[`item.productPlace`]="{ item }">
                <ProductPlaceSearch v-if="item.statusCd=='0'" :value="item.productPlace" fStyle="max-width: 300px;background-color: white;" class="compact-form"/>
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.productPlace" class="compact-form" background-color="white" readonly /> 
              </template>
              <template #[`item.sokoCd`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.sokoCd" class="compact-form" background-color="white" /> 
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.sokoCd" class="compact-form" background-color="white" readonly /> 
              </template>
              <template #[`item.iriCnt`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.iriCnt" class="compact-form" background-color="white" />
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.iriCnt" class="compact-form" background-color="white" readonly />
              </template>
              <template #[`item.uchiCnt`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.uchiCnt" class="compact-form" background-color="white" /> 
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.uchiCnt" class="compact-form" background-color="white" readonly /> 
              </template>
              <template #[`item.hakoCnt`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.hakoCnt" class="compact-form textRight" background-color="white" /> 
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.hakoCnt" class="compact-form textRight" background-color="white" readonly />
              </template>
              <template #[`item.totalCnt`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.totalCnt" class="compact-form textRight" background-color="white" /> 
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.totalCnt" class="compact-form textRight" background-color="white" readonly /> 
              </template>
              <template #[`item.totalCntUnit`]="{ item }">
                <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.totalCntUnit" class="compact-form" background-color="white" /> 
                <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.totalCntUnit" class="compact-form" background-color="white" readonly /> 
              </template>
              <template #[`item.statusCd`]="{ item }">
                <div v-if="item.statusCd=='0'">未登録</div>
                <div v-if="item.statusCd=='1'">登録済</div>
              </template>
              <template #[`item.delRow`]="{ item }">
                <div class="align-middle"><v-btn class="secondary" depressed dense @click="delRow(item.id)"><span>行削除</span></v-btn></div>
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
        { text:"ステータス", value:"statusCd",       width:140, shown:true,  manage: false, },
        { text:"削除",       value:"delRow",         width:90, shown:true,  manage: false, },
        { text:"",           value:"id",             width:30,  shown:false, manage: true,  },
      ],
      itemsList: [],
      itemsKeppinList: [
        {
          id:1,
          shippingDate:"07/13",
          destName:"㈲ヨコヤマ",
          orderNo:"4 8A61Q2",
          customerName:"コカ・コーラ",
          productName:"７ミリヨウチューブ",
          uchiwakeNo:"01",
          uchiwakeName:"本体",
          shijiCnt:64000,
          shijiCntUnit:" S",
          fusokuCnt:-6400,
          productionYMD:'2022-07-15',
          productionTime:"12:00",
          productPlace:"幸手工場",
          sokoCd:"1810",
          iriCnt:"640 S",
          uchiCnt:null,
          hakoCnt:10,
          totalCnt:6400,
          totalCntUnit:"S",
          statusCd:"0",
          delRow:null,
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
          productionYMD:"2022-09-09",
          productionTime:"12:00",
          productPlace:"幸手工場",
          sokoCd:"1810",
          iriCnt:"640 S",
          uchiCnt:null,
          hakoCnt:10,
          totalCnt:6400,
          totalCntUnit:"S",
          statusCd:"0",
          delRow:null,
        },
      ],
      selectItemList: [],

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
      this.itemsList = [];
    },
    // 検索ボタン
    select() {
      this.itemsList = this.itemsKeppinList;
      this.panelState = false;
    },
    // 取消ボタン
    cancel() {
      var result = confirm("確定を取り消します。よろしいですか？");
      if (result) {
        for (const selectInfo of this.selectItemList) {
          if (selectInfo.statusCd == "1")
            selectInfo.statusCd = "0";
        }
        alert("取り消しました。");
      }

    },
    // 確定ボタン
    fixClick() {
      var result = confirm("確定します。よろしいですか？");
      if (result) {
        for (const selectInfo of this.selectItemList) {
          if (selectInfo.statusCd == "0")
            selectInfo.statusCd = "1";
        }
        alert("確定しました。");
      }
    },
    // 設定ボタン
    setting() {

    },
    // 行挿入ボタン
    rowAdd() {
      // if (this.itemsList.length == 0) {
      //   this.itemsList.splice(0, 0, this.makeNewRecord(1));
      //   return;
      // }
      for (const selectInfo of this.selectItemList.reverse()) {
        var idx = 1;
        var target = -1;
        for (const rowInfo of this.itemsList) {
          if (selectInfo.id == rowInfo.id) {
            target = idx;
          } else if (selectInfo.id < rowInfo.id) {
            rowInfo.id++;
          }
          idx++;
        }
        if (target != -1) {
          this.itemsList.splice(target, 0, this.makeNewRecord(selectInfo.id+1));
        }
      }
      this.selectItemList = [];
    },
    // 行挿入用の初期データ
    makeNewRecord(newId) {
      return ({id:newId,shippingDate:null,destName:null,orderNo:null,customerName:null,productName:null,uchiwakeNo:null,uchiwakeName:null,shijiCnt:null,shijiCntUnit:null,fusokuCnt:null,productionYMD:null,productionTime:null,productPlace:null,sokoCd:null,iriCnt:null,uchiCnt:null,hakoCnt:0,totalCnt:0,totalCntUnit:null,statusCd:"0",});
    },
    // 行削除ボタン
    delRow(delId) {
      var result = confirm("行を削除します。よろしいですか？");
      if (result) {
        for (var idx = 0; idx < this.itemsList.length; idx++) {
          if (delId == this.itemsList[idx].id) {
            // 削除行の左側に情報があり、次に行がある場合
            if (this.itemsList[idx].shippingDate != null && idx + 1 < this.itemsList.length) {
              // 次の行の左側がnullの場合、削除行の内容をコピー
              if (this.itemsList[idx+1].shippingDate == null) {
                this.itemsList[idx+1].shippingDate = this.itemsList[idx].shippingDate;
                this.itemsList[idx+1].destName = this.itemsList[idx].destName;
                this.itemsList[idx+1].orderNo = this.itemsList[idx].orderNo;
                this.itemsList[idx+1].customerName = this.itemsList[idx].customerName;
                this.itemsList[idx+1].productName = this.itemsList[idx].productName;
                this.itemsList[idx+1].uchiwakeNo = this.itemsList[idx].uchiwakeNo;
                this.itemsList[idx+1].uchiwakeName = this.itemsList[idx].uchiwakeName;
                this.itemsList[idx+1].shijiCnt = this.itemsList[idx].shijiCnt;
                this.itemsList[idx+1].shijiCntUnit = this.itemsList[idx].shijiCntUnit;
                this.itemsList[idx+1].fusokuCnt = this.itemsList[idx].fusokuCnt;
              }
            }
            this.itemsList.splice(idx, 1);
            alert("削除しました。");
            return;
          }
        }
      }
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
}


.errorStatus {
  /* text-danger */
  color: red;
}
.compact-form {
  transform: scale(0.875);
  transform-origin: left;
}
.textRight input {
  text-align: right;
}
.leyerTop {
  position: absolute; 
  right: 0px;
  z-index: 2;
}
</style>
