<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
            <v-expansion-panels v-model="panelState">
              <v-expansion-panel>
                <v-expansion-panel-header class="py-0 d-inline-flex">
                  <span class="px-0 titleFont leyerBottom">検索条件</span><span class="text-left leyerTop">※「入荷年月日」か「注番」のどちらかを必須</span><v-spacer></v-spacer>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pt-0 pb-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">デポ(入荷場所)*</v-subheader>
                      <v-text-field class="depo" outlined dense clearable hint="" hide-details="auto" background-color="yellow lighten-3"></v-text-field>
                      <v-text-field class="depoName" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">入荷年月日*</v-subheader>
                      <v-text-field class="ymd" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD" background-color="yellow lighten-3"></v-text-field>
                      <span style="vertical-align: middle" class="pl-1 pr-1 pt-2">～</span>
                      <v-text-field class="ymd" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD" background-color="yellow lighten-3"></v-text-field>
                    </v-col>

                    <v-col class="pt-0 pb-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">荷主</v-subheader>
                      <v-text-field class="ninushi" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">入荷区分</v-subheader>
                      <v-select :items="nyukaKbnList" class="nyukaKbn" dense outlined hide-details="auto"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pb-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">事&emsp;注番*</v-subheader>
                      <v-text-field class="chuban1" outlined dense clearable hint="" hide-details="auto" background-color="yellow lighten-3"></v-text-field>
                      <v-text-field class="chuban2" outlined dense clearable hint="" hide-details="auto" background-color="yellow lighten-3"></v-text-field>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">倉庫棟</v-subheader>
                      <v-select :items="sokoToList" class="sokoTo" dense outlined hide-details="auto"></v-select>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">表示区分</v-subheader>
                      <v-select :items="displayKbnList" class="displayKbn" dense outlined hide-details="auto"></v-select>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">製品区分</v-subheader>
                      <v-select :items="productKbnList" class="productKbnC" dense outlined hide-details="auto"></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pt-0 pb-1 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">大品種</v-subheader>
                      <v-text-field class="daiHinsyu" dense outlined clearable hint="" hide-details="auto"></v-text-field>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">中品種</v-subheader>
                      <v-select :items="chuItemList" class="chuHinsyu" dense outlined hide-details="auto"></v-select>
                    </v-col>

                    <v-col class="pt-0 pr-1 d-flex" cols="auto">
                      <v-subheader class="mr-2">ステータス</v-subheader>
                      <v-select :items="statusList" class="status" dense outlined hide-details="auto"></v-select>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col class="d-flex justify-end mr-10">
                        <v-btn class="mr-10 mb-3" depressed outlined large @click="clearList">クリア</v-btn>
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
              <span class="titleFont d-flex">入荷実績一覧</span>
              <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
          <v-card>
            <v-data-table :headers="shownHeaders" :items="itemList" item-key="radioButtonID" dense multi-sort fixed-header no-data-text="検索してください。" height=400>
              <template #[`item.radioButtonID`]="{ item }">
                <input :id="'Radio_' + item.radioButtonID" type="radio" :value="item.radioButtonID"  v-model="selectItemList">
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-end mr-10">
          <v-btn class="mr-10 mb-3" depressed outlined large @click.stop="setting"><span>設定</span></v-btn>
          <v-btn class="mr-10 mb-3" depressed outlined large href="nyuka_dtl"><span>詳細</span></v-btn>
          <v-btn class="primary mb-3" large @click="waste"><span>廃棄</span></v-btn>
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
import draggable from "vuedraggable"
export default {
  data() {
    return {
      drawer: false,
      headers: [
        {
          displayOrder: 1,
          text: '選択',
          value: 'radioButtonID',
          width: 60,
          shown: true,
          sortable: false,
        },
        {
          displayOrder: 2,
          text: '注番',
          value: 'orderNo',
          width: 100,
          shown: true,
        },
        {
          displayOrder: 3,
          text: '得意先',
          value: 'clientName',
          width: 100,
          shown: true,
        },
        {
          displayOrder: 4,
          text: '品名',
          value: 'itemName',
          width: 150,
          shown: true,
        },
        {
          displayOrder: 5,
          text: '内訳№',
          value: 'uchiwakeNo',
          width: 90,
          shown: true,
        },
        {
          displayOrder: 6,
          text: '内訳名',
          value: 'uchiwakeName',
          width: 150,
          shown: true,
        },
        {
          displayOrder: 7,
          text: '製品区分',
          value: 'productKbn',
          width: 120,
          shown: true,
        },
        {
          displayOrder: 8,
          text: '部品№',
          value: 'partsNo',
          width: 90,
          shown: true,
        },
        {
          displayOrder: 9,
          text: '部品名',
          value: 'partsName',
          width: 200,
          shown: true,
        },
        {
          displayOrder: 10,
          text: '工程№',
          value: 'processNo',
          width: 90,
          shown: true,
        },
        {
          displayOrder: 11,
          text: '工程名',
          value: 'processName',
          width: 150,
          shown: true,
        },
        {
          displayOrder: 12,
          text: '主材料№',
          value: 'mainMaterialNo',
          width: 100,
          shown: true,
        },
        {
          displayOrder: 13,
          text: '主材料名',
          value: 'mainMaterialName',
          width: 100,
          shown: true,
        },
        {
          displayOrder: 14,
          text: 'ステータス',
          value: 'status',
          width: 120,
          shown: true,
        },
        {
          displayOrder: 15,
          text: '生産場所',
          value: 'productPlace',
          width: 100,
          shown: true,
        },
        {
          displayOrder: 16,
          text: '製造年月日',
          value: 'productYMD',
          width: 200,
          shown: true,
        },
        {
          displayOrder: 17,
          text: '倉庫棟',
          value: 'warehouseBuilding',
          width: 100,
          shown: true,
        },
        {
          displayOrder: 18,
          text: '入荷実績年月日',
          value: 'nyukaJissekiYMD',
          width: 200,
          shown: true,
        },
        {
          displayOrder: 19,
          text: '入荷区分',
          value: 'nyukaKbn',
          width: 100,
          shown: true,
        },
      ],
      itemList: [],
      resultList: [
        {
          radioButtonID:"1",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"○○ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"入荷済",
          productPlace:"～工場",
          productYMD:"2021/10/18",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/18",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"2",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"○○ロール部品１",
          processNo:"00002",
          processName:"部品１工程２",
          mainMaterialNo:"00002",
          mainMaterialName:"主材料２",
          status:"入荷済",
          productPlace:"～工場",
          productYMD:"2021/10/18",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/18",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"3",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00002",
          partsName:"○○ロール部品２",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"4",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"××パッケージ",
          uchiwakeNo:"00002",
          uchiwakeName:"××ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"××ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"5",
          orderNo:"CHBN02",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"6",
          orderNo:"CHBN03",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"7",
          orderNo:"CHBN04",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"8",
          orderNo:"CHBN05",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"9",
          orderNo:"CHBN06",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"10",
          orderNo:"CHBN07",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"11",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"○○ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"入荷済",
          productPlace:"～工場",
          productYMD:"2021/10/18",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/18",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"12",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"○○ロール部品１",
          processNo:"00002",
          processName:"部品１工程２",
          mainMaterialNo:"00002",
          mainMaterialName:"主材料２",
          status:"入荷済",
          productPlace:"～工場",
          productYMD:"2021/10/18",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/18",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"13",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00002",
          partsName:"○○ロール部品２",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"14",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"××パッケージ",
          uchiwakeNo:"00002",
          uchiwakeName:"××ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"××ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"15",
          orderNo:"CHBN02",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"16",
          orderNo:"CHBN03",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"17",
          orderNo:"CHBN04",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"18",
          orderNo:"CHBN05",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"19",
          orderNo:"CHBN06",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"20",
          orderNo:"CHBN07",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"21",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"○○ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"入荷済",
          productPlace:"～工場",
          productYMD:"2021/10/18",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/18",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"22",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"○○ロール部品１",
          processNo:"00002",
          processName:"部品１工程２",
          mainMaterialNo:"00002",
          mainMaterialName:"主材料２",
          status:"入荷済",
          productPlace:"～工場",
          productYMD:"2021/10/18",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/18",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"23",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"○○パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"○○ロール",
          productKbn:"製品",
          partsNo:"00002",
          partsName:"○○ロール部品２",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"24",
          orderNo:"CHBN01",
          clientName:"○○紙工",
          itemName:"××パッケージ",
          uchiwakeNo:"00002",
          uchiwakeName:"××ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"××ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"25",
          orderNo:"CHBN02",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"26",
          orderNo:"CHBN03",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"27",
          orderNo:"CHBN04",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"28",
          orderNo:"CHBN05",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"29",
          orderNo:"CHBN06",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
        {
          radioButtonID:"30",
          orderNo:"CHBN07",
          clientName:"○○紙工",
          itemName:"△△パッケージ",
          uchiwakeNo:"00001",
          uchiwakeName:"△△ロール",
          productKbn:"製品",
          partsNo:"00001",
          partsName:"△△ロール部品１",
          processNo:"00001",
          processName:"部品１工程１",
          mainMaterialNo:"00001",
          mainMaterialName:"主材料１",
          status:"検査中",
          productPlace:"～工場",
          productYMD:"2021/10/19",
          warehouseBuilding:"あたご",
          nyukaJissekiYMD:"2021/10/19",
          nyukaKbn:"通常",
        },
      ],
      panelState: 0,
      selectItemList:[],
      // リストボックスの中身
      nyukaKbnList: ["通常", "サンプル"],
      sokoToList:["あたご", "サンプル"],
      displayKbnList: ["使用済み分も表示", "使用済み分は非表示"],
      productKbnList: ["製品", "その他"],
      chuItemList: ["紙器", "テスト", "その他"],
      statusList: ["入荷済み", "未入荷"],
      headersBack: null,
      ptn1Cnt: 3,
      fixed_header_num: 2,
      fixed_column_num: 1,

    }
  },
  methods: {
    // クリアボタン
    clearList() {
      this.itemList = [];
    },
    select() {
      // this.itemList = Array.of(...this.resultList);
      this.itemList = this.resultList;
    },
    detail() {

    },
    waste() {
      var res = confirm("廃棄します。よろしいですか？");
      if (res == true) {
        alert("廃棄しました。");
      }
    },
    setting() {
      // 現在の状態を退避
      this.headersBack = this.headers;
      // サブ画面表示
      this.drawer = !this.drawer;
      // this.$router.push({name: 'nyuka_setting', params: {headerWorkList: this.headers}})
      // 別画面表示 値渡せない なぜ
      // let routeSetting = this.$router.resolve({name: 'nyuka_setting', params: {headerWorkList: this.headers}});
      // window.open(routeSetting.href, '_blank');
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
    draggable,
  },

}

</script>
<style scope lang="scss">
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






.TableRadioBtn {
  height: 12px;
  margin: 0;
  padding: 0;
}
.layerBottom {
  position: absolute; 
  z-index: 50;
}
.leyerTop {
  position: absolute; 
  left: 150px;
  z-index: 100;
}

.ymd {
  width: 170px;
  height: 40px;
}
.depo {
  width: 90px;
  height: 40px;
}
.depoName {
  width: 120px;
}
.ninushi {
  width: 60px;
}
.nyukaKbn {
  width: 120px;
}
.chuban1 {
  width: 60px;
  height: 40px;
}
.chuban2 {
  width: 90px;  
  height: 40px;
}
.sokoTo {
  width: 120px;
}
.displayKbn {
  width: 220px;
}
.productKbnC {
  width: 150px;
}
.daiHinsyu {
  width: 150px;
}
.chuHinsyu {
  width: 150px;
}
.status {
  width: 150px;
}


</style>
