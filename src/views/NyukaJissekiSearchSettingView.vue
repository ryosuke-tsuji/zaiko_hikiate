<template>
  <div>
    <table>
<!--
      <thead>
        <tr>
          <th scope="col">表示</th>
          <th scope="col">項目名</th>
          <th scope="col">幅</th>
        </tr>
      </thead>
-->
      <draggable :v-model="headerWorkList" @input="$emit('input', $event.target.headerWorkList)" tag="tbody" @start="onStart" @end="onEnd" class="dragArea list-group">
        <tr v-for="header in headerWorkList" :key="header.displayOrder">
          <td class="text-center" scope="row" width="40"><input type="checkbox" v-model="header.shown"></td>
          <td>{{header.text}}</td>
          <td><input type="number" min="1" class="text-end" v-model="header.width" style="width:100px; text-align:right;"></td>
          <td><img src="@/assets/menu.png"></td>
        </tr>
      </draggable>
    </table>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    data: function(){
      return {
        isEdit: false,
      }
    },
    props: [ 'headerWorkList' ],
    components: {
      draggable,
    },

    methods: {
      onStart: (e) => {
        console.log("onStart" + e.methods);
      },
      onEnd: (e) => {
        console.log("onEnd" + e.methods);
        // for (let idx=0; idx<this.headerWorkList.length; idx++) {
        //   console.log("onEnd" + e.methods);
        // }
      },
      send() {
        this.$emit("headerWorkList", this.headerWorkList);
      }
    }
}
</script>

<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  border: solid 1px #777;
}
table tr {
  border-bottom: solid 1px #777;
}
table th, table td {
  background-color: #fff;
  vertical-align: middle;
}

</style>
