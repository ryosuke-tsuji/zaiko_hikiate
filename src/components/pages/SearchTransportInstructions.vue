<template>
  <div>
    <div class="th-sticky_wrap">
      <table class="st-tbl1">
        <thead>
          <tr>
            <th>コード</th>
            <th>名称</th>
            <th>カテゴリ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in searchResults" v-bind:key="result.code">
            <td>{{ result.yshKnyiriNo }}</td>
            <td>{{ result.yshknyiriMisiNo }}</td>
            <td>{{ result.hmmkNm }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <v-row width="50%">
      <v-col class="pb-0">
        <v-form ref="testForm" v-model="valid" :lazy-validation="lazy">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel v-model="panel">
              <v-expansion-panel-header
                class="pt-0"
                style="padding-bottom: 0px"
              >
                <span class="subtitle-1 pa-0">検索条件</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="compact-form">
                <v-row>
                  <v-col class="pt-0 pb-0 pr-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sKnrBsh"
                      outlined
                      clearable
                      append-icon="mdi-magnify"
                      dense
                      background-color="yellow lighten-3"
                      hint="〇〇桁で入力してください"
                      :rules="sKnrBshRules"
                      required
                    >
                      <template v-slot:label>
                        <span class="labelFont">管理部署</span
                        ><span style="color: red"> *</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col class="pt-0 pb-0 pr-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sDp1"
                      background-color="yellow lighten-3"
                      outlined
                      clearable
                      append-icon="mdi-magnify"
                      dense
                      hint="〇〇桁で入力してください"
                    >
                      <template v-slot:label>
                        <span class="labelFont">デポコード1</span
                        ><span style="color: red"> *</span>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col class="pt-0 pb-0 pr-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sDp2"
                      outlined
                      clearable
                      append-icon="mdi-magnify"
                      dense
                      hint="〇〇桁で入力してください"
                    >
                      <template v-slot:label>
                        <span class="labelFont">デポコード2</span>
                      </template></v-text-field
                    >
                  </v-col>

                  <v-col class="pt-0 pb-0 pr-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sDp3"
                      outlined
                      clearable
                      append-icon="mdi-magnify"
                      dense
                      hint="〇〇桁で入力してください"
                      ><template v-slot:label>
                        <span class="labelFont">デポコード3</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0 pr-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sDp4"
                      outlined
                      clearable
                      append-icon="mdi-magnify"
                      dense
                      hint="〇〇桁で入力してください"
                    >
                      <template v-slot:label>
                        <span class="labelFont">デポコード4</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sDp5"
                      outlined
                      clearable
                      append-icon="mdi-magnify"
                      dense
                      hint="〇〇桁で入力してください"
                    >
                      <template v-slot:label>
                        <span class="labelFont">デポコード5</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row d-flex>
                  <v-col class="pt-0 pb-0 pr-0 d-flex" cols="3">
                    <v-text-field
                      class="sWidth"
                      v-model="form.sShkbFrom"
                      outlined
                      clearable
                      append-icon="mdi-calendar-range"
                      dense
                      hint="YYYY/MM/DD"
                    >
                      <template v-slot:label>
                        <span class="labelFont">出荷日(From)</span>
                      </template>
                    </v-text-field>
                    <span style="vertical-align: middle" class="pl-1 pr-1 pt-2"
                      >～</span
                    >
                    <v-text-field
                      class="sWidth"
                      v-model="form.sShkbTo"
                      outlined
                      clearable
                      append-icon="mdi-calendar-range"
                      dense
                      hint="YYYY/MM/DD"
                      ><template v-slot:label>
                        <span class="labelFont">出荷日(To)</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0 pr-0" cols="2">
                    <v-select
                      v-model="selectedDepo"
                      class="center sWidth"
                      :items="chshtsList"
                      dense
                      outlined
                      hide-details="false"
                      ><template v-slot:label>
                        <span class="labelFont">抽出区分</span>
                      </template></v-select
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0 pr-0 d-flex" cols="3">
                    <v-text-field
                      style="width: 45px"
                      class="sWidth pr-1"
                      v-model="sJgyb"
                      outlined
                      dense
                      hint="〇〇桁で入力してください"
                      ><template v-slot:label>
                        <span class="labelFont">事</span>
                      </template></v-text-field
                    >

                    <v-text-field
                      class="sWidth"
                      v-model="sChbn"
                      outlined
                      clearable
                      dense
                      hint="〇〇桁で入力してください"
                      ><template v-slot:label>
                        <span class="labelFont">注番</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="sSjBn"
                      outlined
                      clearable
                      dense
                      hint="〇〇桁で入力してください"
                      ><template v-slot:label>
                        <span class="labelFont">指示番号</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0" cols="2">
                    <v-select
                      v-model="selectedUnso"
                      class="center sWidth"
                      :items="unsoList"
                      dense
                      outlined
                      hide-details="false"
                      ><template v-slot:label>
                        <span class="labelFont">運送区分</span>
                      </template></v-select
                    >
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0" cols="2">
                    <v-text-field
                      class="sWidth"
                      v-model="sSryBng"
                      outlined
                      clearable
                      dense
                      hint="〇〇桁で入力してください"
                      ><template v-slot:label>
                        <span class="labelFont">車両番号</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0" cols="1">
                    <v-text-field
                      class="sWidth"
                      v-model="sKis"
                      outlined
                      clearable
                      dense
                      hint="〇〇桁で入力してください"
                      ><template v-slot:label>
                        <span class="labelFont">回数</span>
                      </template></v-text-field
                    >
                  </v-col>
                  <v-col class="pt-0 pb-0" cols="2">
                    <v-select
                      v-model="selectedSihn"
                      class="center"
                      :items="sihnList"
                      dense
                      outlined
                      hide-details="false"
                      background-color="yellow lighten-3"
                      ><template v-slot:label>
                        <span class="labelFont">製品区分</span
                        ><span style="color: red"> *</span>
                      </template></v-select
                    >
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="1">
                    <v-btn class="pb-0" depressed outlined large>
                      クリア
                    </v-btn>
                  </v-col>
                  <v-col cols="1"
                    ><v-btn
                      depressed
                      color="primary"
                      class="pb-0"
                      large
                      @click="select"
                    >
                      <span> 検索 </span>
                    </v-btn>
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      depressed
                      color="primary"
                      class="pb-0"
                      large
                      @click="update"
                    >
                      <span> 更新 </span>
                    </v-btn>
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      depressed
                      color="primary"
                      class="pb-0"
                      large
                      @click="headerChange"
                    >
                      <span> 登録 </span>
                    </v-btn>
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      depressed
                      color="primary"
                      class="pb-0"
                      large
                      @click="deleteTest"
                    >
                      <span> 削除 </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="pt-0 pb-2">
            <span class="subtitle-1 d-flex">検索結果</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dense
              clearable
              class="shrink"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            dense
            :headers="headers"
            :items="shjList"
            :search="search"
            item-key="key"
            class="elevation-1"
            multi-sort
            height="300px"
            fixed-header
            show-select
            color="primary"
            no-data-text="なし"
          >
            >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" class="pa-0 ma-0" justify="space-around">
      <v-col cols="3">
        <v-btn depressed outlined large> 戻る </v-btn>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="3"
        ><v-btn depressed color="primary" large class="pt-1 pb-1">
          <span>注番単位<br />で登録</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import DatePicker from '../modules/DatePicker';
import * as axios from 'axios';

export default {
  components: {
    // DatePicker,
  },
  name: 'test',
  data: () => ({
    shjList: [
      {
        key: 0,
        dpcd: 'TLA0A',
        shkkb: '10/06',
        tkisk: 'ダスキン',
        jchbn: '5 GCDTS1',
        hnmi: 'ＮＦＭ－ＤＳロール',
        uchwk: 'Ａ',
        kik: 2,
        tihu: 1,
        gki: 3,
        sry: '4,500',
        zikbsh: '川口',
      },
      {
        key: 1,
        dpcd: 'TLA0A',
        shkkb: '10/06',
        tkisk: 'ダスキン',
        jchbn: '5 HFPRP1',
        hnmi: 'ＦＭＤＭポリ',
        uchwk: 'Ａ',
        kik: 2,
        tihu: 0,
        gki: 2,
        sry: '1,000',
        zikbsh: '川口／あたご',
      },
      {
        key: 2,
        dpcd: 'TLA0A',
        shkkb: '10/06',
        tkisk: 'ダスキン',
        jchbn: '5 GFPRP1',
        hnmi: 'ＮＦＭ―ＤＳポリ',
        uchwk: 'Ａ',
        kik: 2,
        tihu: 2,
        gki: 4,
        sry: '8,000',
        zikbsh: 'あたご',
      },
      {
        key: 3,
        dpcd: 'TLA0A',
        shkkb: '10/06',
        tkisk: 'ダスキン',
        jchbn: '5 IFPRP1',
        hnmi: 'ＦＤＢポリ',
        uchwk: 'Ａ',
        kik: 4,
        tihu: 2,
        gki: 6,
        sry: '4,000',
        zikbsh: 'あたご',
      },
      {
        key: 4,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 5,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 6,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 7,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 8,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 9,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 10,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 11,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 12,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 13,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 14,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 15,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 16,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 17,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 18,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 19,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 20,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 21,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 22,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 23,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
      {
        key: 24,
        dpcd: 'xxxxxx',
        shkkb: 'xxxxxx',
        tkisk: 'xxxxxxxxxx',
        jchbn: 'xxxxxxx',
        hnmi: 'xxxxxxxxxxxxxxx',
        uchwk: 'xxx',
        kik: 'xx',
        tihu: 'xx',
        gki: 'xx',
        sry: 'xxxxx',
        zikbsh: 'xxxxxxxx',
      },
    ],
    headers: [
      { text: 'デポコード', value: 'dpcd', width: 'auto' },
      { text: '出荷日', value: 'shkkb', width: 'auto' },
      { text: '得意先', value: 'tkisk', width: 'auto' },
      { text: '事 注番', value: 'jchbn', width: 'auto' },
      { text: '品名', value: 'hnmi', width: 'auto' },
      { text: '内訳', value: 'uchwk', width: 'auto' },
      { text: '区域', value: 'kik', width: 'auto' },
      { text: '地方', value: 'tihu', width: 'auto' },
      { text: '合計', value: 'gki', width: 'auto' },
      { text: '数量', value: 'sry', width: 'auto' },
      { text: '在庫場所', value: 'zikbsh', width: 'auto' },
    ],

    chshtsList: ['', '未処理', '処理済み', '全て'],
    unsoList: ['', '区域', '地方'],
    sihnList: ['製品', '半製品'],
    selectedSihn: '',
    search: '',
    form: {
      sKnrBsh: '',
      sDp1: '',
      sDp2: '',
      sDp3: '',
      sDp4: '',
      sDp5: '',
      sShkbFrom: '',
      sShkbTo: '',
    },
    panel: 0,
    searchResults: [],
    selectedDepo: '',
    sJgyb: '',
    sChbn: '',
    sSjBn: '',
    selectedUnso: '',
    sSryBng: '',
    sKis: '',
    lazy: '',
    valid: '',
    sKnrBshRules: [(v) => !!v || '必須入力です'],
  }),
  methods: {
    get: function () {
      axios.get('http://localhost:8081/search/list').then((response) => {
        this.searchResults = response.data;
      });
    },

    select: function () {
      axios
        .post('http://localhost:8081/search/select', this.form)
        .then((response) => {
          this.searchResults = response.data;
        });
    },

    update: function () {
      axios
        .post('http://localhost:8081/search/update', this.form)
        .then((response) => {
          this.searchResults = response.data;
        });
    },

    insert: function () {
      axios
        .post('http://localhost:8081/search/insert', this.form)
        .then((response) => {
          this.searchResults = response.data;
        });
    },

    deleteTest: function () {
      axios
        .post('http://localhost:8081/search/delete', this.form)
        .then((response) => {
          this.searchResults = response.data;
        });
    },
    headerChange: function () {
      this.headers = [
        { text: '得意先', value: 'tkisk', width: 'auto' },
        { text: 'デポコード', value: 'dpcd', width: 'auto' },
        { text: '出荷日', value: 'shkkb', width: 'auto' },
        { text: '内訳', value: 'uchwk', width: 'auto' },
        { text: '事 注番', value: 'jchbn', width: 'auto' },
        { text: '品名', value: 'hnmi', width: 'auto' },
        { text: '合計', value: 'gki', width: 'auto' },
        { text: '区域', value: 'kik', width: 'auto' },
        { text: '地方', value: 'tihu', width: 'auto' },
        { text: '在庫場所', value: 'zikbsh', width: 'auto' },
        { text: '数量', value: 'sry', width: 'auto' },
      ];
    },
  },
};
</script>
<style scoped>
.sKnrBsh {
  width: 90%;
}
.sDp {
  width: 90%;
}
.labelFont {
  font-size: 0.8rem;
}
</style>
