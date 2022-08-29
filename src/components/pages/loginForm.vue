// 学習用のvueファイル１
<template>
  <div id="login-template">
    <div><input type="text" placeholder="ログインID" v-model="userid" /></div>
    <div>
      <input type="password" placeholder="パスワード" v-model="password" />
    </div>
    <div><button @click="login">ログイン</button></div>
    <!-- <h1 :class="$style.message">こんにちわ</h1> -->
    <form novalidate>
      <p :class="alertValidation">{{ validMessage }}</p>
      <textarea @input="onInput" :class="textboxValidation"></textarea>
    </form>
  </div>
</template>

<script>
var auth = {
  login: function (id, pass) {
    window.alert('userid:' + id + '\n' + 'password:' + pass);
  },
};
export default {
  data: function () {
    return {
      valid: false,
      userid: '',
      password: '',
    };
  },
  computed: {
    validMessage() {
      return this.valid ? '入力有' : '入力されてない';
    },
    alertValidation() {
      return this.valid ? this.alertTest.success : this.alertTest.error;
    },
    textboxValidation() {
      return this.valid ? this.textbox.success : this.textbox.error;
    },
  },
  created() {
    console.log('css modules:$style', this.$style);
  },
  methods: {
    isRequired(value) {
      return value.length > 0;
    },
    onInput(e) {
      this.valid = this.isRequired(e.target.value);
    },
    login: function () {
      auth.login(this.userid, this.password);
    },
  },
};
</script>

<style module="alertTest">
.success {
  color: green;
}
.error {
  font-weight: bold;
  color: red;
}
</style>
<style module="textbox">
.success {
  border: solid 2px green;
}
.error {
  border: solid 2px red;
}
</style>
