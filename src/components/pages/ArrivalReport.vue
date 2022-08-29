<template>
  <div id="arrival">
    <GamenInfo><template v-slot:GamenName>入荷登録</template></GamenInfo>
    <v-container fluid>
      <v-row>
        <v-col class="pb-0">
          <v-form>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">入荷情報</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <!-- <span class="px-0 titleFont leyerBottom" style="line-height: 60px;">入荷情報</span> -->
            <v-row>
              <v-col class="pt-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">入荷年月日*</v-subheader>
                <v-text-field class="ymd" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD"></v-text-field>
                <span style="vertical-align: middle" class="pl-1 pr-1 pt-2">～</span>
                <v-text-field class="ymd" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD"></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">事&emsp;注番*</v-subheader>
                <v-text-field class="chuban1" outlined dense clearable hint="" hide-details="auto"></v-text-field>
                <v-text-field class="chuban2" outlined dense clearable hint="" hide-details="auto"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pt-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">工場棟</v-subheader>
                <v-select :items="sokoToList" class="sokoTo" dense outlined hide-details="auto"></v-select>
              </v-col>
              <v-col class="pt-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">入荷区分</v-subheader>
                <v-select :items="nyukaKbnList" class="nyukaKbn" dense outlined hide-details="auto"></v-select>
              </v-col>
            </v-row>
          </v-card>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">内訳／部品／工程</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-row>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">引渡票No<span style="color: red">
                    &nbsp;*
                  </span></v-subheader
                >
                <!-- <span v-bind:class="myClass"></span> -->
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">製造仕様書番号</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">製品区分</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">得意先</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">品名</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">内訳No<span style="color: red">
                    &nbsp;*
                  </span></v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">内訳</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">受注数量</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">単位</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">先方品番</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">内訳名</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">部品№<span style="color: red">
                    &nbsp;*
                  </span></v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">部品名称</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">工程№</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">工程名称</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">生産場所</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">基本巻ｍ(付方)</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">重量</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex">
                <v-subheader class="mr-2">製品入荷累計</v-subheader>
                <v-text-field
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0">
          <v-form>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">搬出元情報</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-row>
              <v-col class="pt-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">搬出日*</v-subheader>
                <v-text-field class="dtUnloading" outlined hide-details="auto" clearable append-icon="mdi-calendar-range" dense hint="YYYY/MM/DD"></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">搬出場所*</v-subheader>
                <v-text-field class="unloadingPlace" outlined dense clearable hint="" hide-details="auto"></v-text-field>
              </v-col>
              <v-col class="pt-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">倉庫*</v-subheader>
                <v-text-field class="warehouse" outlined dense clearable hint="" hide-details="auto"></v-text-field>
              </v-col>
              <v-col class="pt-0 pr-1 d-flex" cols="auto">
                <v-subheader class="mr-2">ブロック</v-subheader>
                <v-text-field class="block" outlined dense clearable hint="" hide-details="auto"></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="pt-0 pb-2 ml-1">
              <span class="titleFont d-flex">入荷明細</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="itemList" item-key="radioButtonID" dense multi-sort fixed-header no-data-text="検索してください。">
              <template #[`item.radioButtonID`]="{ item }">
                <v-radio-group class="TableRadioBtn" dense>
<!--                  <v-radio class="TableRadioBtn" /> -->
                  <v-radio class="TableRadioBtn" v-on:change="onChange(item)" v-model="temp" />
                </v-radio-group>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex pt-0"
          ><v-spacer></v-spacer>
          <v-btn color="primary mr-10" large>
            <span> 戻る </span>
          </v-btn>
          <v-btn color="primary" large>
            <span> 登録 </span> </v-btn
          ><v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import GamenInfo from '../common/Header.vue'
// var arrival = new Vue({
//   el: '#arrival',
//   data: {
//     myClass: 'You loaded this page on ' + new Date().toLocaleString()
//   }
// })
export default {
  dataBD() {
    return {
      isActive: false,
      breakdown: [
        {
          text: '引渡票No',
          value: 'val1',
          width: 100,
        },
        {
          text: '製造仕様書番号',
          value: 'val2',
          width: 100,
        },
        {
          text: '製品区分',
          value: 'val3',
          width: 100,
        },
        {
          text: '得意先',
          value: 'val4',
          width: 100,
        },
        {
          text: '品名',
          value: 'val5',
          width: 100,
        },
        {
          text: '内訳No',
          value: 'val6',
          width: 100,
        },
        {
          text: '内訳',
          value: 'val7',
          width: 100,
        },
        {
          text: '受注数量',
          value: 'val8',
          width: 100,
        },
        {
          text: '単位',
          value: 'val9',
          width: 100,
        },
        {
          text: '先方品番',
          value: 'val10',
          width: 100,
        },
        {
          text: '内訳名',
          value: 'val11',
          width: 100,
        },
        {
          text: '部品№',
          value: 'val12',
          width: 100,
        },
        {
          text: '部品名称',
          value: 'val13',
          width: 100,
        },
        {
          text: '工程№',
          value: 'val14',
          width: 100,
        },
        {
          text: '工程名称',
          value: 'val15',
          width: 100,
        },
        {
          text: '生産場所',
          value: 'val16',
          width: 100,
        },
        {
          text: '基本巻ｍ(付方)',
          value: 'val17',
          width: 100,
        },
        {
          text: '重量',
          value: 'val18',
          width: 100,
        },
        {
          text: '製品入荷累計',
          value: 'val19',
          width: 100,
        },
          {label:"製品入荷累計"}
      ],
      data: [
        {
          val1:"1",
          val2:"500",
          val3:"",
          val4:"4",
          val5:"M",
          val6:"4",
          val7:"1,100x1,100",
          val8:"001-004",
          val9:"10/05",
          val10:"10/05",
          val11:"10/05",
          val12:"10/05",
          val13:"10/05",
          val14:"10/05",
          val15:"10/05",
          val16:"10/05",
          val17:"10/05",
          val18:"10/05",
          val19:"10/05",
        }
      ],
      panelState: 0,
      temp:[],
    };
  },
  data() {
    return {
      headers: [
        {
          text: 'M',
          value: 'orderNo',
          width: 100,
        },
        {
          text: '入数',
          value: 'clientName',
          width: 100,
        },
        {
          text: '内',
          value: 'itemName',
          width: 150,
        },
        {
          text: '箱数',
          value: 'uchiwakeNo',
          width: 90,
        },
        {
          text: '単位',
          value: 'uchiwakeName',
          width: 150,
        },
        {
          text: '枚数',
          value: 'productKbn',
          width: 120,
        },
        {
          text: 'PLサイズ',
          value: 'partsNo',
          width: 90,
        },
        {
          text: 'ロットNo',
          value: 'partsName',
          width: 200,
        },
        {
          text: '備考',
          value: 'processNo',
          width: 90,
        },
      ],
      itemList: [
        {
          orderNo:"1",
          clientName:"500",
          itemName:"",
          uchiwakeNo:"4",
          uchiwakeName:"M",
          productKbn:"4",
          partsNo:"1,100x1,100",
          partsName:"001-004",
          processNo:"10/05",
        },
        {
          orderNo:"2",
          clientName:"500",
          itemName:"",
          uchiwakeNo:"3",
          uchiwakeName:"",
          productKbn:"4",
          partsNo:"A判",
          partsName:"005",
          processNo:"10/05",
        },
        {
          orderNo:"2",
          clientName:"350",
          itemName:"",
          uchiwakeNo:"3",
          uchiwakeName:"",
          productKbn:"4",
          partsNo:"A判",
          partsName:"005",
          processNo:"10/05",
        },
      ],
      panelState: 0,
      temp:[],
      // リストボックスの中身
      nyukaKbnList: ["通常", "サンプル"],
      sokoToList:["あたご", "サンプル"],
      displayKbnList: ["使用済み分も表示", "使用済み分は非表示"],
      productKbnList: ["製品", "その他"],
      chuItemList: ["紙器", "テスト", "その他"],
      statusList: ["入荷済み", "未入荷"],
    }
  },
  methods: {
    // クリアボタン
    clearList() {
      this.itemList = [];
    },
    select() {

    },
    detail() {

    },
    waste() {
      var res = confirm("廃棄します。よろしいですか？");
      if (res == true) {
        alert("廃棄しました。");
      }
    },
    onChange(event) {
      if (event) {
        alert(event.target.tagName);
      }

    }
  },
  components: {
    GamenInfo,
  },
}

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
  background-color: yellow;
}
.depo {
  width: 90px;
  height: 40px;
  background-color: yellow;
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
  background-color: yellow;
}
.chuban2 {
  width: 90px;  
  height: 40px;
  background-color: yellow;
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
