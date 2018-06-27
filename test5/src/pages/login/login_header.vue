<template>
    <div class="login_header">
        <div class="lh_content">
            <img :src="logoImage" class="fl">
			<div class="fl">
				<p style="font-size:20px;">北京市足球运动协会</p>
				<p style="font-size:12px;">BEIJING FOOTBALL ASSOCIATION</p>
			</div>
        </div>
    </div>
</template>

<script>
    import logo from "@/assets/images/cfa_logo_110000.png"

    export default {
		name: 'App',
		data() {
			return {
				logoImage: logo,
			}
		},
		mounted() {
		
		},
		
		methods: {
			
		},
		created() {
			
		}
    }
    
</script>