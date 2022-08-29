// テーブル列入れ替えテスト
<template>
  <div id="app">
    <v-app id="inspire">
      <p>{{ msg }}：{{ selected }}</p>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :pagination.sync="pagination"
        select-all
        item-key="name"
        class="elevation-1"
        multi-sort
      >
        <template v-slot:header="{ props, on }">
          {{ props.headers.sortBy }}
          <thead class="v-data-table-header">
            <tr id="sort_key">
              <th
                v-for="(header, i) in props.headers"
                :key="i"
                @click="on.sort(header.value)"
              >
                <span>{{ header.text }}</span>
              </th>
            </tr>
          </thead>
        </template>
        <template v-slot:items="props">
          <tr>
            <td v-for="(header, index) in headers" :key="index">
              {{ props.item[header.value] }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
// Default SortableJS
import Sortable from 'sortablejs';

export default {
  props: {
    msg: {
      type: String,
      default: () => {
        return 'でふぉるとちいいいいいい';
      },
    },
  },
  data: () => ({
    options: {
      sortBy: 'name',
    },

    selected: [],
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'left',
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 4.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 5.0,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 5.0,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 5.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 5.0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 5.0,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 5.0,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 5.0,
        iron: '6%',
      },
    ],
  }),
  mounted() {
    console.log(document.getElementById('sort_key'));
    this.$nextTick(() => {
      const element = document.getElementById('sort_key');
      const _self = this;
      console.log(document);
      Sortable.create(element, {
        onEnd({ newIndex, oldIndex }) {
          const headerSelected = _self.headers.splice(oldIndex, 1)[0];
          _self.headers.splice(newIndex, 0, headerSelected);
        },
      });
    });
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
  },
};
</script>

<style>
.myCheckBox .v-icon {
  opacity: 0.6 !important;
  font-size: 24px !important;
  transform: none !important;
}

table {
  border-collapse: collapse;
  box-sizing: border-box;
  width: 1400px;
}

table th {
  font-size: 16px;
  color: #333;
}

table thead th {
  border: 1px solid #ccc;
  text-align: center;
  overflow: hidden;
  background-color: #efefef;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 0px solid #ccc;
  resize: horizontal;
}

table tbody th {
  text-align: center;
  overflow: hidden;
  background-color: #efefef;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  resize: vertical;
}

.table {
  max-height: 380px;
  overflow: auto;
}

table thead th,
table thead td {
  position: sticky;
  top: 0;
}

.tableDummy {
  max-width: 1000px;
  width: auto;
}
.noBlock {
  width: 20px;
}
</style>
