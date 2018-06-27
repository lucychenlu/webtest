<template>
	<div>
		<!-- <HLogin></HLogin> -->
		<div class="">
			<div class="login_dialog" v-loading="is_loading">
				<input type="radio" name="demo" id="tab-switch-input1" checked="">
				<input type="radio" name="demo" id="tab-switch-input2">
				<!-- <div class="tab-box-label">
					<label for="tab-switch-input1">账号密码</label>
					<label for="tab-switch-input2">手机验证码</label>
				</div> -->
				<div class="tab-contents">
					<ALogin v-on:setLoading="setLoading" v-on:onLoginDone="onLoginDone"></ALogin>
					<!-- <PLogin v-on:setLoading="setLoading" v-on:onLoginDone="onLoginDone"></PLogin> -->
				</div>
			</div>
		</div>
		<!-- <FLogin></FLogin> -->
	</div>
</template>

<script>
	import * as Cookies from "js-cookie"
	import $ from "jquery"
	import "@/assets/css/login.css"


	import HLogin from "./login_header.vue"
	import ALogin from "./login_account.vue"
	import PLogin from "./login_phone.vue"
	import FLogin from "./login_footer.vue"

	export default {
		name: 'App',
		data() {
			return {
				is_loading: false,
			}
		},
		mounted() {
			var self = this;
			$(".enter_input input").focus(function () {
				$(this).parent().addClass("enter_input_focus")
			})
			$(".enter_input input").blur(function () {
				$(this).parent().removeClass("enter_input_focus")
			})
		},
		components: {
			HLogin,
			ALogin,
			PLogin,
			FLogin
		},
		methods: {
			//登录
			setLoading: function (is_loading) {
				this.is_loading = is_loading;
			},
			//登录成功
			onLoginDone: function (info) {
				let token = info.token;

				Cookies.set('user', info.user);
				//打开页面
				this.$router.push({ path: '/home/people', query: {token:token} });
			}
		},
		created() {
			Cookies.set('token', '');
			Cookies.set('user', '');
		}
	}

</script>