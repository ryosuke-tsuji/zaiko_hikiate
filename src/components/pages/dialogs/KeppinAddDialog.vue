<template>
  <v-dialog v-model="dialog" width="1200" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="isYoteiAdd" class="mx-1 secondary" depressed large v-bind="attrs" v-on="on" @click="calcAddCnt"><span>予定</span></v-btn>
      <v-btn v-else class="mx-1 disable" disabled depressed large><span>予定</span></v-btn>
    </template>

    <v-card class="px-5">
      <v-row>
        <v-col class="pb-0">
          <v-card-title class="pt-2 pb-2 pl-0">
            <span class="titleFont d-flex">欠品分入荷予定&ensp;登録</span>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-end ml-10">
          <v-data-table :headers="headersScoreList" :items="itemsScoreList" dense multi-sort fixed-header hide-default-footer height="auto" id="summarys">
            <template #[`item.fusokuCnt`]="{ item }">
              <div class="text-end errorStatus">{{ item.fusokuCnt.toLocaleString() }}</div>
            </template>
            <template #[`item.addCnt`]="{ item }">
              <div class="text-end">{{ item.addCnt.toLocaleString() }}</div>
            </template>
          </v-data-table>
          <v-btn class="ml-1 secondary" @click="rowAdd">行挿入</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-data-table :headers="shownHeaders" :items="itemsList" v-model="selectItemList" dense multi-sort fixed-header hide-default-footer show-select height=200>
          <template #[`item.productionYMD`]="{ item }">
            <v-dialog ref="dialog_date" v-model="modal_date" :return-value.sync="item.productionYMD" persistent width="30vw">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="item.productionYMD" append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on" outlined class="py-0 compact-form" style="max-width: 250px; height: 40px;"></v-text-field>
              </template>
              <!-- <v-date-picker v-model="item.productionYMD" locale="ja-jp" no-title  :day-format="(d) => new Date(d).getDate()"> -->
              <v-date-picker locale="ja-jp" no-title  :day-format="(d) => new Date(d).getDate()">
                <v-spacer></v-spacer>
                <v-btn text class="subwin_button" color="primary" @click="modal_date = false">Cancel</v-btn>
                <v-btn text class="subwin_button" color="primary" @click="$refs.dialog_date.save(item.productionYMD)">OK</v-btn>
              </v-date-picker>
            </v-dialog>






<!--
              <v-date-picker v-model="dates" locale="ja-jp" no-title range :day-format="(d) => new Date(d).getDate()">
                <v-spacer></v-spacer>
                <v-btn text class="subwin_button" color="primary" @click="modal_date = false">Cancel</v-btn>
                <v-btn text class="subwin_button" color="primary" @click="$refs.dialog_date.save(dates)">OK</v-btn>
              </v-date-picker>

            <v-text-field outlined dense hide-details v-model="item.productionYMD" class="compact-form" background-color="white" /> 
-->
          </template>
          <template #[`item.productionTime`]="{ item }">
            <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.productionTime" class="compact-form" background-color="white" type="time" /> 
            <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.productionTime" class="compact-form" background-color="white" type="time" readonly /> 
          </template>
          <template #[`item.productPlace`]="{ item }">
            <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.productPlace" class="compact-form" background-color="white" /> 
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
            <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.hakoCnt" class="compact-form" background-color="white" /> 
            <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.hakoCnt" class="compact-form" background-color="white" readonly /> 
          </template>
          <template #[`item.totalCnt`]="{ item }">
            <v-text-field v-if="item.statusCd=='0'" outlined dense hide-details v-model="item.totalCnt" class="compact-form" background-color="white" /> 
            <v-text-field v-if="item.statusCd=='1'" outlined dense hide-details v-model="item.totalCnt" class="compact-form" background-color="white" readonly /> 
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
      </v-row>

      <v-row>
        <v-col class="d-flex justify-start mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large @click="cancelModal"><span>戻る</span></v-btn>
        </v-col>
        <v-spacer/>
        <v-col class="d-flex justify-end ml-10">
          <v-btn class="ml-10 mb-3 primary" depressed large @click="closeModal"><span>決定</span></v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isYoteiAdd: Boolean,
  },
  data() {
    return {
      dialog: false,
      selectItemList: [],
      // ダイアログ画面のclose用変数
      modal_date: false,
      // 出荷日用初期日付(fromのみ)
      // dates: [new Date().toISOString().substr(0, 10)],
      // dates: "2022-07-14",
      headers: [
        { text:"生産完了日", value:"productionYMD",  width:180, shown:true, },
        { text:"時間",       value:"productionTime", width:120, shown:true, },
        { text:"生産場所",   value:"productPlace",   width:150,  shown:true, },
        { text:"倉庫コード", value:"sokoCd",         width:100, shown:true, },
        { text:"入り数",     value:"iriCnt",         width:100, shown:true, },
        { text:"内数",       value:"uchiCnt",        width:60,  shown:true, },
        { text:"箱数",       value:"hakoCnt",        width:60,  shown:true, },
        { text:"総数",       value:"totalCnt",       width:120, shown:true, },
        { text:"単位",       value:"totalCntUnit",   width:80,  shown:true,},
        { text:"ステータス", value:"statusCd",       width:100, shown:true, },
        { text:"削除",       value:"delRow",         width:90, shown:true, },
        { text:"",           value:"id",             width:30,  shown:false,},
      ],
      headersScoreList: [
        { text:"不足数", value:"fusokuCnt", width:90, shown:true, },
        { text:"登録数", value:"addCnt",    width:90, shown:true, },
      ],
      itemsList: [
        {
          id:1,
          productionYMD:"07/15",
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
          productionYMD:"07/15",
          productionTime:"12:00",
          productPlace:"△△工場",
          sokoCd:"1810",
          iriCnt:"640 S",
          uchiCnt:null,
          hakoCnt:10,
          totalCnt:6400,
          totalCntUnit:"S",
          statusCd:"1",
          delRow:null,
        },
      ],
      itemsScoreList: [
        { fusokuCnt:-6400, addCnt:null, },
      ],
    }
  },
  methods: {
    // 行追加ボタン
    rowAdd() {
      if (this.itemsList.length == 0) {
        // 強制入力
        this.itemsList.splice(1, 0, this.makeNewRecord(1));
        return;
      }
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
      return ({id:newId,productionYMD:null,productionTime:null,productPlace:null,sokoCd:null,iriCnt:null,uchiCnt:null,hakoCnt:0,totalCnt:0,totalCntUnit:null,statusCd:"0"});
    },
    // 行削除ボタン
    delRow(delId) {
      var result = confirm("行を削除します。よろしいですか？");
      if (result) {
        for (var idx = 0; idx < this.itemsList.length; idx++) {
          if (delId == this.itemsList[idx].id) {
            this.itemsList.splice(idx, 1);
            alert("削除しました。");
            return;
          }
        }
      }
    },
    showModal() {
      this.dialog = true;
    },
    // 戻るボタン
    cancelModal() {
      this.dialog = false;
    },
    // 決定ボタン
    closeModal() {
      this.dialog = false;
    },
    calcAddCnt() {
      var totalAddCnt = 0;
      for (const rowInfo of this.itemsList) {
        totalAddCnt += parseInt(rowInfo.totalCnt) || 0;
      }
      this.itemsScoreList[0].addCnt = totalAddCnt;
    },
    // datepickerクリア処理
    clear: function () {
      // this.dates = [new Date().toISOString().substr(0, 10)];
      // this.dates = "2022-07-14";
    },

  },
  computed: {
    shownHeaders() {
      return this.headers.filter(h => h.shown);
    },
    // datepickerのfrom-to日付ソートとYYYY-MM-DD形式→YYYY/MM/DD形式への変換
    dateRangeText() {
//      return this.dates.slice().sort().join(' ～ ').replaceAll('-', '/');
      return this.dates.replaceAll('-', '/');
    },
  },
  watch: {
    // 値変更監視
    itemsList: {
      handler: function() {
        this.calcAddCnt();
      },
      deep: true,
    }
  }
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
  width:90px;
  background-color: #cfd8dc;
  font-weight: bold;
  border-radius: 3px;
  white-space: nowrap;
}

.compact-form {
  transform: scale(0.875);
  transform-origin: left;
}


/* サマリ表示専用 */
#summarys.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > th {
  font-size:15px  !important;
  background-color: #FFe699 !important;
}
#summarys.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > td {
  background-color: #FFE699 !important;
}

.errorStatus {
  /* text-danger */
  color: red;
}


</style>
