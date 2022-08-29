<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
            <v-expansion-panels v-model="panelState">
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="pt-0"
                  style="padding-bottom: 0px"
                >
                  <span class="pa-0 titleFont">検索条件</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col class="pt-0 pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">条件１</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pt-0 pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">条件２</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pt-0 pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">条件３</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pt-0 pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">条件４</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pt-0 pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">条件５</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0 pr-1 d-flex" cols="3">
                      <v-subheader class="mr-2">条件６</v-subheader>
                      <v-select
                        :items="selectList"
                        dense
                        outlined
                        hide-details="auto"
                      ></v-select>
                    </v-col>
                    <v-col class="pb-0 pr-1 d-flex" cols="4">
                      <v-subheader class="mr-2">条件７</v-subheader>
                      <v-text-field
                        outlined
                        hide-details="auto"
                        clearable
                        append-icon="mdi-calendar-range"
                        dense
                        hint="YYYY/MM/DD"
                      >
                      </v-text-field>
                      <span
                        style="vertical-align: middle"
                        class="pl-1 pr-1 pt-2"
                        >～</span
                      >
                      <v-text-field
                        outlined
                        hide-details="auto"
                        clearable
                        append-icon="mdi-calendar-range"
                        dense
                        hint="YYYY/MM/DD"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-col class="d-flex justify-end mr-10"
                      ><v-btn
                        class="mr-10 mb-3"
                        depressed
                        outlined
                        large
                        @click="clearList"
                      >
                        クリア </v-btn
                      ><v-btn
                        depressed
                        color="primary mb-3"
                        large
                        @click="select"
                      >
                        <span> 検索 </span>
                      </v-btn>
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
              v-model="selectedRow"
              dense
              :headers="headers"
              :items="itemList"
              item-key="key"
              class="elevation-1"
              multi-sort
              fixed-header
              show-select
              height="380px"
              disable-pagination
              hide-default-footer
              no-data-text="検索してください。"
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex pt-0"
          ><v-spacer></v-spacer>
          <v-dialog v-model="insertDialogFlg" persistent max-width="80%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary mr-10" large v-bind="attrs" v-on="on">
                <span> 新規 </span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="titleFont">新規登録</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col class="pr-1 d-flex">
                      <v-subheader class="mr-2">項目１</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        v-model="insertForm.kmk1"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pr-1 d-flex">
                      <v-subheader class="mr-2">項目２</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk2"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pr-1 d-flex">
                      <v-subheader class="mr-2">項目３</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk3"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pr-1 d-flex">
                      <v-subheader class="mr-2">項目４</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk4"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">項目５</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk5"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">項目６</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk6"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">項目７</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk7"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">項目８</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk8"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">項目９</v-subheader>
                      <v-text-field
                        outlined
                        dense
                        clearable
                        persistent-hint
                        hint="〇〇桁で入力してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk9"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0 pr-1 d-flex">
                      <v-subheader class="mr-2">項目１０</v-subheader>
                      <v-select
                        :items="selectList"
                        dense
                        outlined
                        persistent-hint
                        hint="選択してください。"
                        hide-details="auto"
                        v-model="insertForm.kmk10"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-10 mb-3"
                  depressed
                  outlined
                  large
                  @click="closeInsertDialog"
                >
                  閉じる </v-btn
                ><v-btn depressed color="primary mb-3" large @click="insertMst">
                  <span> 登録 </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <updateDialog :updateList="updateList"></updateDialog>
          <v-btn color="primary mr-10" large @click="deleteMst">
            <span> 削除 </span>
          </v-btn>
          <v-btn color="primary" large @click="revivalMst">
            <span> 復活 </span> </v-btn
          ><v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import updateDialog from './dialogs/updateDialog.vue';
import _ from 'lodash';
export default {
  components: {
    updateDialog,
  },
  data: () => ({
    dataTest: '',
    searchForm: {},
    insertForm: {
      kmk1: '',
      kmk2: '',
      kmk3: '',
      kmk4: '',
      kmk5: '',
      kmk6: '',
      kmk7: '',
      kmk8: '',
      kmk9: '',
      kmk10: '',
    },
    insertDialogFlg: false,

    panelState: 0,
    selectList: ['', 'セレクト１', 'セレクト２', 'セレクト３'],
    selectedRow: [],
    headers: [
      { text: '項目１', value: 'value1', width: 'auto' },
      { text: '項目２', value: 'value2', width: 'auto' },
      { text: '項目３', value: 'value3', width: 'auto' },
      { text: '項目４', value: 'value4', width: 'auto' },
      { text: '項目５', value: 'value5', width: 'auto' },
      { text: '項目６', value: 'value6', width: 'auto' },
      { text: '項目７', value: 'value7', width: 'auto' },
      { text: '項目８', value: 'value8', width: 'auto' },
      { text: '項目９', value: 'value9', width: 'auto' },
      { text: '項目１０', value: 'value10', width: 'auto' },
    ],
    itemList: [
      {
        key: 0,
        value1: '項目1-値01',
        value2: '項目2-値01',
        value3: '項目3-値01',
        value4: '項目4-値01',
        value5: '項目5-値01',
        value6: '項目6-値01',
        value7: '項目7-値01',
        value8: '項目8-値01',
        value9: '項目9-値01',
        value10: '項目10-値01',
      },
      {
        key: 1,
        value1: '項目1-値02',
        value2: '項目2-値02',
        value3: '項目3-値02',
        value4: '項目4-値02',
        value5: '項目5-値02',
        value6: '項目6-値02',
        value7: '項目7-値02',
        value8: '項目8-値02',
        value9: '項目9-値02',
        value10: '項目10-値02',
      },
      {
        key: 2,
        value1: '項目1-値03',
        value2: '項目2-値03',
        value3: '項目3-値03',
        value4: '項目4-値03',
        value5: '項目5-値03',
        value6: '項目6-値03',
        value7: '項目7-値03',
        value8: '項目8-値03',
        value9: '項目9-値03',
        value10: '項目10-値03',
      },
      {
        key: 3,
        value1: '項目1-値04',
        value2: '項目2-値04',
        value3: '項目3-値04',
        value4: '項目4-値04',
        value5: '項目5-値04',
        value6: '項目6-値04',
        value7: '項目7-値04',
        value8: '項目8-値04',
        value9: '項目9-値04',
        value10: '項目10-値04',
      },
      {
        key: 4,
        value1: '項目1-値05',
        value2: '項目2-値05',
        value3: '項目3-値05',
        value4: '項目4-値05',
        value5: '項目5-値05',
        value6: '項目6-値05',
        value7: '項目7-値05',
        value8: '項目8-値05',
        value9: '項目9-値05',
        value10: '項目10-値05',
      },
      {
        key: 5,
        value1: '項目1-値06',
        value2: '項目2-値06',
        value3: '項目3-値06',
        value4: '項目4-値06',
        value5: '項目5-値06',
        value6: '項目6-値06',
        value7: '項目7-値06',
        value8: '項目8-値06',
        value9: '項目9-値06',
        value10: '項目10-値06',
      },
      {
        key: 6,
        value1: '項目1-値07',
        value2: '項目2-値07',
        value3: '項目3-値07',
        value4: '項目4-値07',
        value5: '項目5-値07',
        value6: '項目6-値07',
        value7: '項目7-値07',
        value8: '項目8-値07',
        value9: '項目9-値07',
        value10: '項目10-値07',
      },
      {
        key: 7,
        value1: '項目1-値08',
        value2: '項目2-値08',
        value3: '項目3-値08',
        value4: '項目4-値08',
        value5: '項目5-値08',
        value6: '項目6-値08',
        value7: '項目7-値08',
        value8: '項目8-値08',
        value9: '項目9-値08',
        value10: '項目10-値08',
      },
      {
        key: 8,
        value1: '項目1-値09',
        value2: '項目2-値09',
        value3: '項目3-値09',
        value4: '項目4-値09',
        value5: '項目5-値09',
        value6: '項目6-値09',
        value7: '項目7-値09',
        value8: '項目8-値09',
        value9: '項目9-値09',
        value10: '項目10-値09',
      },
      {
        key: 9,
        value1: '項目1-値10',
        value2: '項目2-値10',
        value3: '項目3-値10',
        value4: '項目4-値10',
        value5: '項目5-値10',
        value6: '項目6-値10',
        value7: '項目7-値10',
        value8: '項目8-値10',
        value9: '項目9-値10',
        value10: '項目10-値10',
      },
      {
        key: 10,
        value1: '項目1-値11',
        value2: '項目2-値11',
        value3: '項目3-値11',
        value4: '項目4-値11',
        value5: '項目5-値11',
        value6: '項目6-値11',
        value7: '項目7-値11',
        value8: '項目8-値11',
        value9: '項目9-値11',
        value10: '項目10-値11',
      },
      {
        key: 11,
        value1: '項目1-値12',
        value2: '項目2-値12',
        value3: '項目3-値12',
        value4: '項目4-値12',
        value5: '項目5-値12',
        value6: '項目6-値12',
        value7: '項目7-値12',
        value8: '項目8-値12',
        value9: '項目9-値12',
        value10: '項目10-値12',
      },
      {
        key: 12,
        value1: '項目1-値13',
        value2: '項目2-値13',
        value3: '項目3-値13',
        value4: '項目4-値13',
        value5: '項目5-値13',
        value6: '項目6-値13',
        value7: '項目7-値13',
        value8: '項目8-値13',
        value9: '項目9-値13',
        value10: '項目10-値13',
      },
      {
        key: 13,
        value1: '項目1-値14',
        value2: '項目2-値14',
        value3: '項目3-値14',
        value4: '項目4-値14',
        value5: '項目5-値14',
        value6: '項目6-値14',
        value7: '項目7-値14',
        value8: '項目8-値14',
        value9: '項目9-値14',
        value10: '項目10-値14',
      },
      {
        key: 14,
        value1: '項目1-値15',
        value2: '項目2-値15',
        value3: '項目3-値15',
        value4: '項目4-値15',
        value5: '項目5-値15',
        value6: '項目6-値15',
        value7: '項目7-値15',
        value8: '項目8-値15',
        value9: '項目9-値15',
        value10: '項目10-値15',
      },
      {
        key: 15,
        value1: '項目1-値16',
        value2: '項目2-値16',
        value3: '項目3-値16',
        value4: '項目4-値16',
        value5: '項目5-値16',
        value6: '項目6-値16',
        value7: '項目7-値16',
        value8: '項目8-値16',
        value9: '項目9-値16',
        value10: '項目10-値16',
      },
      {
        key: 16,
        value1: '項目1-値17',
        value2: '項目2-値17',
        value3: '項目3-値17',
        value4: '項目4-値17',
        value5: '項目5-値17',
        value6: '項目6-値17',
        value7: '項目7-値17',
        value8: '項目8-値17',
        value9: '項目9-値17',
        value10: '項目10-値17',
      },
      {
        key: 17,
        value1: '項目1-値18',
        value2: '項目2-値18',
        value3: '項目3-値18',
        value4: '項目4-値18',
        value5: '項目5-値18',
        value6: '項目6-値18',
        value7: '項目7-値18',
        value8: '項目8-値18',
        value9: '項目9-値18',
        value10: '項目10-値18',
      },
      {
        key: 18,
        value1: '項目1-値19',
        value2: '項目2-値19',
        value3: '項目3-値19',
        value4: '項目4-値19',
        value5: '項目5-値19',
        value6: '項目6-値19',
        value7: '項目7-値19',
        value8: '項目8-値19',
        value9: '項目9-値19',
        value10: '項目10-値19',
      },
      {
        key: 19,
        value1: '項目1-値20',
        value2: '項目2-値20',
        value3: '項目3-値20',
        value4: '項目4-値20',
        value5: '項目5-値20',
        value6: '項目6-値20',
        value7: '項目7-値20',
        value8: '項目8-値20',
        value9: '項目9-値20',
        value10: '項目10-値20',
      },
      {
        key: 20,
        value1: '項目1-値21',
        value2: '項目2-値21',
        value3: '項目3-値21',
        value4: '項目4-値21',
        value5: '項目5-値21',
        value6: '項目6-値21',
        value7: '項目7-値21',
        value8: '項目8-値21',
        value9: '項目9-値21',
        value10: '項目10-値21',
      },
      {
        key: 21,
        value1: '項目1-値22',
        value2: '項目2-値22',
        value3: '項目3-値22',
        value4: '項目4-値22',
        value5: '項目5-値22',
        value6: '項目6-値22',
        value7: '項目7-値22',
        value8: '項目8-値22',
        value9: '項目9-値22',
        value10: '項目10-値22',
      },
      {
        key: 22,
        value1: '項目1-値23',
        value2: '項目2-値23',
        value3: '項目3-値23',
        value4: '項目4-値23',
        value5: '項目5-値23',
        value6: '項目6-値23',
        value7: '項目7-値23',
        value8: '項目8-値23',
        value9: '項目9-値23',
        value10: '項目10-値23',
      },
      {
        key: 23,
        value1: '項目1-値24',
        value2: '項目2-値24',
        value3: '項目3-値24',
        value4: '項目4-値24',
        value5: '項目5-値24',
        value6: '項目6-値24',
        value7: '項目7-値24',
        value8: '項目8-値24',
        value9: '項目9-値24',
        value10: '項目10-値24',
      },
      {
        key: 24,
        value1: '項目1-値25',
        value2: '項目2-値25',
        value3: '項目3-値25',
        value4: '項目4-値25',
        value5: '項目5-値25',
        value6: '項目6-値25',
        value7: '項目7-値25',
        value8: '項目8-値25',
        value9: '項目9-値25',
        value10: '項目10-値25',
      },
      {
        key: 25,
        value1: '項目1-値26',
        value2: '項目2-値26',
        value3: '項目3-値26',
        value4: '項目4-値26',
        value5: '項目5-値26',
        value6: '項目6-値26',
        value7: '項目7-値26',
        value8: '項目8-値26',
        value9: '項目9-値26',
        value10: '項目10-値26',
      },
      {
        key: 26,
        value1: '項目1-値27',
        value2: '項目2-値27',
        value3: '項目3-値27',
        value4: '項目4-値27',
        value5: '項目5-値27',
        value6: '項目6-値27',
        value7: '項目7-値27',
        value8: '項目8-値27',
        value9: '項目9-値27',
        value10: '項目10-値27',
      },
      {
        key: 27,
        value1: '項目1-値28',
        value2: '項目2-値28',
        value3: '項目3-値28',
        value4: '項目4-値28',
        value5: '項目5-値28',
        value6: '項目6-値28',
        value7: '項目7-値28',
        value8: '項目8-値28',
        value9: '項目9-値28',
        value10: '項目10-値28',
      },
      {
        key: 28,
        value1: '項目1-値29',
        value2: '項目2-値29',
        value3: '項目3-値29',
        value4: '項目4-値29',
        value5: '項目5-値29',
        value6: '項目6-値29',
        value7: '項目7-値29',
        value8: '項目8-値29',
        value9: '項目9-値29',
        value10: '項目10-値29',
      },
      {
        key: 29,
        value1: '項目1-値30',
        value2: '項目2-値30',
        value3: '項目3-値30',
        value4: '項目4-値30',
        value5: '項目5-値30',
        value6: '項目6-値30',
        value7: '項目7-値30',
        value8: '項目8-値30',
        value9: '項目9-値30',
        value10: '項目10-値30',
      },
    ],
  }),
  computed: {
    updateList: function () {
      return _.cloneDeep(this.selectedRow);
    },
  },

  methods: {
    clearList() {
      this.itemList = [];
    },
    closeInsertDialog() {
      this.insertForm = {};
      this.insertDialogFlg = false;
    },
    insertMst() {
      this.insertForm = {};
      this.insertDialogFlg = false;
    },

    deleteMst() {
      alert('削除しますか？');
    },
    revivalMst() {
      alert('復活させますか？');
    },
    select() {},
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
</style>
