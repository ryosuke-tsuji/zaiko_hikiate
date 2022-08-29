//学習用のvueファイル２
<template>
  <div>
    {{ message }}
    <ul>
      <li v-for="item in items" :key="item.name">
        {{ item.name }}の個数：<input
          type="number"
          v-model="item.quantity"
          min="0"
        />
      </li>
    </ul>
    <hr />
    <p>{{ items[0].name }}:{{ items[0].price }} x {{ items[0].quantity }}</p>
    <button
      id="b-button"
      v-bind:title="LoggedInButton"
      v-bind:disabled="!canBuy"
    >
      購入
    </button>
    <div v-bind:style="errorMessageStyle">
      <ul>
        <li v-for="item in items" :key="item.name">
          {{ item.name }}:{{ item.price }}*{{ item.quantity }}=
          {{ (item.price * item.quantity) | numberWithDelimiter }}円
        </li>
      </ul>
      {{ items[0].price * items[0].quantity }}
      <p>フィルタ処理例{{ 1000 | numberWithDelimiter }}</p>
      <p>小計{{ totalPrice | numberWithDelimiter }}</p>
      <p>合計{{ totalPriceWithTax | numberWithDelimiter }}</p>
      <p v-bind:show="!canBuy">
        {{ 1000 | numberWithDelimiter }}円以上からご購入いただけます
      </p>
    </div>
    <p v-bind:class="{ shark: true, mecha: false }"></p>
    <ul>
      <li v-for="(v, i, a) in object" :key="i">{{ i }}:{{ v }}:{{ a }}</li>
    </ul>
    <hr />
    <br />
    <!-- {{ count }} -->
    <!-- <li>{{ fruitsItem.name }}</li> -->
    <span>{{ counter }}個<button v-on:click="addToCart">追加</button></span>
  </div>
</template>

<script>
var items = [
  { name: '鉛筆', price: 300, quantity: 0 },
  { name: 'ノート', price: 400, quantity: 0 },
  { name: '消しゴム', price: 500, quantity: 0 },
];
export default {
  name: 'vue-test',
  props: {
    fruitsItem: {
      type: Object,
    },
  },
  data: () => ({
    message: 'こんにちわ',
    items: items,
    LoggedInButton: 'ログイン済みの為購入できます',
    jpns: ['あいうえお', 'かきくけこ', 'さしすせそ'],
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10',
    },
    //count: 0,
    counter: 0,
    timerId: null,
  }),
  created: function () {
    console.log('created');
    var that = this;
    // console.log(this.count);
    console.log(this.$el);
    this.timerId = setInterval(function () {
      that.count += 1;
    }, 1000);
  },
  mounted: function () {
    console.log('mounted');
    console.log(this.$el);
  },
  beforeDestroy: function () {
    console.log('beforeDestroy');
    clearInterval(this.timerId);
  },
  filters: {
    //文字列フォーマット用のコンストラクタオプション
    //Vue.filterでフィルタ定義刷ればUtilとして活用できる。
    numberWithDelimiter: function (value) {
      if (!value) {
        return '0';
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    },
  },
  computed: {
    totalPrice: function () {
      return this.items.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0);
    },
    totalPriceWithTax: function () {
      return Math.floor(this.totalPrice * 1.1);
    },
    canBuy: function () {
      return this.totalPrice >= 1000;
    },
    errorMessageClass: function () {
      return { error: !this.canBuy };
    },
    errorMessageStyle: function () {
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red',
      };
    },
  },
  methods: {
    addToCart: function () {
      this.counter += 1;
      this.$emit('increment');
    },
  },
};
</script>

<style></style>
