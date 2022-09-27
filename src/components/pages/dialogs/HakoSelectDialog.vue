<template>
  <v-dialog v-model="dialog" width="300px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="[isSetting == '0' ? 'outlined' : 'secondary'] mx-1"
        depressed
        dense
        v-bind="attrs"
        v-on="on"
        ><span>箱指定</span></v-btn
      >
    </template>

    <v-card class="px-5">
      <v-row>
        <v-col class="pb-0">
          <v-card-title class="pt-2 pb-2 pl-0">
            <span class="titleFont d-flex">箱番号個別引当</span
            ><v-spacer></v-spacer>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex py-1">
          <v-subheader class="mr-2">指示区分</v-subheader>
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <v-radio-group row class="mt-0 pt-0">
              <v-radio dense label="指示型" value="1"></v-radio>
              <v-radio dense label="実績型" value="2"></v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
      <v-row align-content="center">
        <v-col>
          <v-data-table
            :headers="shownHeadersBunkatsu"
            :items="bunkatsuMoto"
            item-key="id"
            v-model="selectMoto"
            dense
            multi-sort
            fixed-header
            hide-default-footer
            show-select
            height="360px"
            no-data-text=""
          >
          </v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-start">
          <v-btn class="mb-3" depressed outlined large @click="cancelModal"
            ><span>戻る</span></v-btn
          >
        </v-col>
        <v-spacer />{{ this.$props.id }}

        <v-col class="d-flex justify-end">
          <v-btn class="mb-3 primary" depressed large @click="closeModal"
            ><span>決定</span></v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isSetting: String,
    id: String,
  },
  data() {
    return {
      dialog: false,
      headersBunkatsu: [
        {
          displayOrder: 3,
          text: '箱番号',
          value: 'hakoNo',
          width: 40,
          shown: true,
        },
        {
          displayOrder: 4,
          text: '数量',
          value: 'num',
          width: 80,
          shown: true,
        },
        {
          displayOrder: 91,
          text: '',
          value: 'numUnit',
          width: 80,
          shown: false,
        },
        { displayOrder: 99, text: '', value: 'id', width: 10, shown: false },
      ],
      bunkatsuMoto: [
        { hakoNo: '1', num: 3000, numUnit: ' S', id: 1 },
        { hakoNo: '2', num: 3000, numUnit: ' S', id: 2 },
        { hakoNo: '3', num: 3000, numUnit: ' S', id: 3 },
        { hakoNo: '4', num: 3000, numUnit: ' S', id: 4 },
        { hakoNo: '5', num: 3000, numUnit: ' S', id: 5 },
        { hakoNo: '6', num: 3000, numUnit: ' S', id: 6 },
        { hakoNo: '7', num: 3000, numUnit: ' S', id: 7 },
        { hakoNo: '8', num: 3000, numUnit: ' S', id: 8 },
        { hakoNo: '9', num: 3000, numUnit: ' S', id: 9 },
        { hakoNo: '10', num: 3000, numUnit: ' S', id: 10 },
      ],
      selectMoto: [],
    };
  },
  methods: {
    showModal() {
      this.dialog = true;
    },
    // 戻るボタン
    cancelModal() {
      this.dialog = false;
      this.$emit('result', { res: false, id: this.id });
    },
    // 決定ボタン
    closeModal() {
      this.dialog = false;
      this.$emit('result', { res: true, id: this.id });
    },
  },
  computed: {
    shownHeadersBunkatsu() {
      return this.headersBunkatsu.filter((h) => h.shown);
    },
  },
};
</script>

<style></style>
