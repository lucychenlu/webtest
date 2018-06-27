<template>
    <div class="tab-content">
        <div class="enter_input user_input">
            <input v-model="phone" maxlength="11" placeholder="手机号" type="text" />
        </div>
        <div class="enter_input security_input pr">
            <input v-model="code" class="captcha_input"  placeholder="验证码" type="text" />
            <button v-on:click="onGetCode()" class="captcha_btn" type="button">获取验证码</button>
        </div>
        <p class="login_tips tc">未注册的手机号验证后自动创建爱球迷账号</p>
        <button v-on:click="onLogin()" class="login_btn" type="button">登录</button>
    </div>
</template>

<script>
    import $ from "jquery"
    import * as Cookies from "js-cookie"
    
    export default {
        data() {
            return {
                phone: "",
                code: "",

                //定时器
				countdown:60,
            }
        },
        mounted() {

        },

        methods: {
            //获取验证码
            onGetCode: function () {
                getCode(this);
                settime(this);
            },
            //登录
            onLogin:function(){
                login(this);
            }
        },

    }

    function getCode(self) {
		if (self.phone.length == 0) return;

		self.$api.post("LOGIN_CODE", { phone: self.phone},self.$router, function (code, message, info) {
            if (code != 200) {
				return;
			}
		});

    }
    
    function settime(self) {
        console.log(self.countdown);
		if (self.countdown <= 0) {
			$(".captcha_btn").removeClass("captcha_btn_un").attr("disabled", false).html("获取验证码");
			self.countdown = 60;
		}else {
			$(".captcha_btn").addClass("captcha_btn_un").attr("disabled", true).html("重新获取" + self.countdown + "秒");
			self.countdown--;
			setTimeout(function(){
				settime(self);
			}, 1000)
		}
    }
    

    function login(self) {
		if (self.phone.length == 0) return;
		if (self.code.length == 0) return;

        self.$emit("setLoading", true);

		self.$api.post("LOGIN_QUICK", { phone: self.phone, code: self.code},self.$router, function (code, message, info) {
            self.$emit("setLoading", false);

            if (code != 200) {
				return;
			}

            self.$emit("onLoginDone", info);
		});

    }
    
</script>