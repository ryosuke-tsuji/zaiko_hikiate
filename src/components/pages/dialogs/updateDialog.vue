<template>
  <v-dialog v-model="updateDialogFlg" persistent max-width="80%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary mr-10" large v-bind="attrs" v-on="on">
        <span> 修正 </span>
      </v-btn>
    </template>
    <v-card max-height="80%">
      <v-card-title>
        <span class="titleFont">修正</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card outlined v-for="(updateTrgt, index) in updateList" :key="index">
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
                  v-model="updateTrgt.value1"
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
                  v-model="updateTrgt.value2"
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
                  v-model="updateTrgt.value3"
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
                  v-model="updateTrgt.value4"
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
                  v-model="updateTrgt.value5"
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
                  v-model="updateTrgt.value6"
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
                  v-model="updateTrgt.value7"
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
                  v-model="updateTrgt.value8"
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
                  v-model="updateTrgt.value9"
                >
                </v-text-field>
              </v-col>
              <v-col class="pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">項目１０</v-subheader>
                <v-select
                  :items="['', 'セレクト１', 'セレクト２', 'セレクト３']"
                  dense
                  outlined
                  persistent-hint
                  hint="選択してください。"
                  hide-details="auto"
                  v-model="updateTrgt.value10"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-10 mb-3"
          depressed
          outlined
          large
          @click="closeUpdateDialog"
        >
          閉じる </v-btn
        ><v-btn depressed color="primary mb-3" large @click="updateMst">
          <span> 登録 </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'updateDialog',
  data: () => ({ updateDialogFlg: false }),
  props: {
    updateList: [],
  },
  methods: {
    closeUpdateDialog() {
      console.log(this.selectedRow);
      console.log(this.updateList);
      this.updateForm = {};
      this.updateDialogFlg = false;
    },
    updateMst() {
      this.updateForm = {};
      this.updateDialogFlg = false;
    },
  },
};
</script>

<style></style>
