<template>
  <div class="tab-content box-shadow-3">
      <img src="../../assets/logo.png" width="100px" height="40px">
      <h2>中药材可溯源系统</h2>
    <div class="enter_input user_input">
      <input v-model="phone" maxlength="11" placeholder="请输入用户名称" type="text" />
    </div>
    <div class="enter_input password_input">
      <input v-model="password" placeholder="请输入密码" type="password" />
    </div>
    <!-- <el-checkbox v-model="checked" style="text-align:left;background:#fff;margin-left:5px;">记住密码</el-checkbox>
        <p class="login_tips tr">&ensp;</p> -->
    <el-select v-model="value" placeholder="请选择登录身份" style="width: 100%;height: 43px;margin-top: 25px;" class="">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <button class="login_btn" type="button" v-on:click="onLogin()">登录</button>
  </div>
</template>

<script>
  import * as Cookies from "js-cookie"

  export default {
    data() {
      return {
        phone: "",
        password: "",
        checked: false,

        options: [{
          value: '1',
          label: '系统管理员'
        }, {
          value: '2',
          label: '数据录入员'
        }],
        value: ''
      }
    },
    mounted() {

    },
    methods: {
      //登录
      onLogin: function () {
        login(this);
      }
    },

  }

  function login(self) {
    if (self.phone.length == 0) return;
    if (self.password.length == 0) return;

    self.$emit("setLoading", true);

    self.$api.post("LOGIN", {
      username: self.phone,
      password: self.password
      // type: 1
    }, self.$router, function (code, message, info) {
      self.$emit("setLoading", false);

      if (code != 1) {
        return;
      }

      self.$emit("onLoginDone", info);
      console.log(info);
    });

  }

</script>
<style type="text/css" scoped>
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #003662
  }
/* .haha {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
     font-size: 16px;
} */

  .box-shadow-3 {
    /* border:solid 1px #b7b7b7; */
    border-radius: 10px;
    text-align: center;
    -webkit-box-shadow: 0 0 10px #e7e7e7;
    -moz-box-shadow: 0 0 10px #e7e7e7;
    box-shadow: 10 10 10px #e7e7e7;
    height: 100%;
  }

  /* .box-shadow-3:hover {
    border: solid 1px #f3f3f3;
    border-radius: 10px;
    text-align: center;
    -webkit-box-shadow: 0 0 10px #e7e7e7;
    -moz-box-shadow: 0 0 10px #e7e7e7;
    box-shadow: 5px 5px 10px #e7e7e7;
  } */

</style>
