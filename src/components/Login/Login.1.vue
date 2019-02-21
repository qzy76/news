<template>
	<div class="login">
		<div class="loginnow">
			<i @click='ComeBreak' class="icon iconfont break">&#xe60e;</i>
			<p class="title">登录你的头条，精彩永不丢失</p>
			<form>
				<div v-if="pLogin">
					<p><input type="text" placeholder="请输入用户名" v-model="uname" @keyup="change"></p>
					<p class="mb5"><input type="password" autocomplete="off" placeholder="请输入密码" v-model="upwd" @keyup="change"></p>
				</div>
				<div v-else>
					<p><input type="number" placeholder="请输入手机号" v-model="uphone" @keyup="change"></p>
					<b v-if="time==60 &codenum<=3" @click="sendCode"> | 发送验证码</b>
					<b v-if="time!=60&codenum<=3">还剩{{time}}秒</b>
					<p class="mb5"><input type="number" placeholder="请输入验证码" v-model="checkCode" @keyup="change"></p>
				</div>
			</form>
			<p class="m0">
				<span v-if="error == 0">&nbsp;</span>
				<span v-if="error ==1">账号或密码错误</span>
				<span v-if="error ==2">验证码错误</span>
				<span v-if="error ==3">账号不能为空</span>
				<span v-if="error ==4">密码不能为空</span>
				<span v-if="error ==5">用户名不存在</span>
				<span v-if="error ==6">手机号码不能为空</span>
				<span v-if="error ==7">验证码不能为空</span>
				<span v-if="error ==8">手机号码错误</span>
				<span v-if="error ==9">验证码发送失败，请使用密码登录</span>
				<span v-if="error ==10">账户已被冻结24小时</span>
			</p>
			<p class="mt5"><input type="button" @click="login" value="进入头条"></p>
			<p>点击查看"<a href="javascript:;">用户协议</a>"和"<a href="javascript:;">隐私政策</a>"</p>
			<div v-if="pLogin">
				<p><a href="#/reg">账号注册 </a> | <a href="javascript:;" @click="upwdLogin"> 验证码登录</a></p>
			</div>
			<div v-else>
				<p><a href="#/reg">账号注册 </a> | <a href="javascript:;" @click="upwdLogin"> 密码登录</a></p>
			</div>
			
			<ul>
				<li><i><svg class="icon" aria-hidden="true"><use xlink:href="#icon-weixin"></use></svg></i></li>
				<li><i><svg class="icon" aria-hidden="true"><use xlink:href="#icon-QQ1"></use></svg></i></li>
				<li><i><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tianyitianyi"></use></svg></i></li>
				<li><i><svg class="icon" aria-hidden="true"><use xlink:href="#icon-youxiang"></use></svg></i></li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name:'Login',
		data() {
			return {
				uname:null,
				upwd:null,
				uphone:null,
				checkCode:null,
				pLogin:true,
				error:0 ,// 1-账号或密码错误 2-验证码错误 3-账号不能为空 4-密码不能为空 5-用户名不存在 6-手机号不能为空 7-验证码不能为空 8-手机号错误
				code:null,
				time:60,
				codenum:0, //验证码获取次数
				num:0 // 密码错误次数
			};
		},
		methods: {
			ComeBreak(){
				this.$router.replace('/person')
			},
			change(){
				this.error = 0
			},
			upwdLogin(){
				//切换的时候清空
				this.uname=null
				this.upwd=null
				this.uphone=null
				this.checkCode=null
				this.error!=10?0:10
				this.pLogin = !this.pLogin
			},
			sendCode(){
				if(this.codenum>=3){
					this.error = 10
					return false
				}else if(this.uphone ==null){ // 手机号为空
					this.error = 6
					return false
				}else if(this.uphone !=localStorage.getItem("uphone")){ // 手机号不存在
					this.error = 8
					return false
				}else{
					this.code = Math.round(Math.random()*1000000);
					console.log(this.code);
					this.$http({
					url: 'http://yuyin1.market.alicloudapi.com/dx/voice_send?code=code:'+this.code+'&phone='+this.uphone,
					method: 'POST',
					headers: {'Authorization': 'APPCODE ad787fb706aa49b280107716a838cc37'}
					}).then(response => {
						if(response.data.return_code=='00000'){
							let int=self.setInterval(clock => {
								if(this.time>0){
									this.time--
								}else{
									int=window.clearInterval(int)
									this.time=60
								}
							},1000);
						}else{
							this.error = 9
						}
						console.log(response.data);
					}, function(response) {})
				}
			},
			login(){
				if(this.codenum>2){
					this.error = 10
					return false
				}else{
					if(this.pLogin){ // 账号密码登录
						if(this.uname ==null){ // 用户名为空
							this.error = 3
							return false
						}else if(this.upwd ==null){ // 密码为空
							this.error = 4
							return false
						}else if(this.uname !=localStorage.getItem("name")){ // 用户名不存在
							this.error = 5
							return false
						}else if(this.uname==localStorage.getItem("name")&&this.$md5(this.upwd)==localStorage.getItem("upwd")){
							this.$store.commit('getuname',localStorage.getItem("name"))
						}else{ // 账号或密码错误
							this.error = 1
							this.upwd=null
							this.codenum++ // 密码/验证码错误次数累加
						}
					}else{ //验证码登录
						if(this.uphone==null){ // 手机号为空
							this.error = 6
							return false
						}else if(this.checkCode==null){ // 验证码为空
							this.error = 7
							return false
						}else if(this.uphone!=localStorage.getItem("uphone")){ // 手机号错误
							this.error = 8
							return false
						}else if(this.checkCode==this.code){
							this.$store.commit('getuname',localStorage.getItem("name"))
							this.time=60
						}else{
							console.log('登录失败！');
							this.codenum++ // 密码/验证码错误次数累加
						}
					}
					this.codenum=0 // 清空错误次数
					console.log('登录成功！');
					this.$router.replace('/person')
				}
			}
		}
	}
</script>
<style lang="scss">
	.login{
		width: 100%;
		height: 100%;
		background: #bbb;
		position: absolute;
		z-index: 9999;
		.loginnow{
			position: absolute;
			top: 5%;
			left: 0;
			height: 95%;
			width: 100%;
			background: #fff;
			border-radius: 5px;
			i.break{
			position: absolute;
			right: 0;
			top: 0;
			}
			.title{
				font-size: 20px;
				font-weight: bold;
			}
			p{
				margin:25px auto;
				text-align: center;
				input{
					border:1px solid #a1a1a1;
					padding:10px; 
					width: 70%;
					background:#e8e0e0;
					border-radius:25px;
					-moz-border-radius:25px; /* 老的 Firefox */
					overflow: hidden;
					outline: none;
				}
				input:hover{
					border-color: red;
					background: #fff;
				}
				input[type=button]{
					background: rgba(255,0,0,0.8);
					border:none;
					font-weight: bold;
					color: #fff;
					font-size: 18px;
					width: 75%;
					padding:8px 20px; 
				}
				span{
					color: red;
					transform: scale(1.1);
					transition: all 2s;
				}
			}
			p.m0{
				margin: 0 auto;
			}
			p.mt5{
				margin-top: 5px;
			}
			p.mb5{
				margin-bottom: 5px;
			}
			b{
				font-style: normal;
				font-weight: 500;
				display: block;
				position: absolute;
				right: 15%;
				top:90px;
			}
			ul{
				width: 80%;
				height: 100px;
				text-align: center;
				margin: auto;
				position: absolute;
				left: 10%;
				bottom: 0;
				li{
					display: inline-block;
					i{
						display: block;
						width: 50px;
						height: 50px;
						line-height: 50px;
						margin: 0 auto;
						border-radius: 50%;
						border:1px solid #ccc;
						svg{
							width: 20px;
							height: 20px;
							margin: 15px auto;
						}
					}
					
				}
			}
		}
	}
</style>