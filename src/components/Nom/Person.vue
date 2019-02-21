<template>
	<div class="person">
		<div class="a" ref="a" v-if="state==null">
			<div class="header">
				<div class="icon" v-if="uname==null" @click="login">
					<i class="icon iconfont oat">&#xe606;</i><i class="icon iconfont huaquan">&#xe646;</i><!-- <i class="icon iconfont login">&#xe608;</i> --><i class="uname">登录</i>
				</div>
				<div class="icon" v-else>
					<i class="icon iconfont oat">&#xe606;</i><i class="icon iconfont huaquan">&#xe646;</i><i class="uname">{{uname}}</i>
				</div>
			</div>
			<div class="operate">
				<ul>
					<li v-for="(item,index) in operate" :key="index">
						<i class="icon iconfont" v-html="item.icon" :style="{color:item.color}"></i>
						<span>{{item.title}}</span>
					</li>
				</ul>
			</div>
			<div>
				<div class="column" v-for="(item,index) in column" :key="index">
					<ul>
						<li v-for="(item1,i) in item.column" :key="i" @click='run(item1.click)'>
							{{item1.name}}
							<span>
								{{item1.news}}
								<i class="icon iconfont">&#xe66b;</i>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-else>
			<express-delivery v-if="state=='express'" v-on:returnHome="returnHome"></express-delivery>
			<telephone-bill v-if="state=='pay'" v-on:returnHome="returnHome"></telephone-bill>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import ExpressDelivery from './ExpressDelivery'
	import TelephoneBill from './TelephoneBill'
	export default {
		name: 'Person',
		data() {
			return {
				operate: [{
						icon: '&#xe64e;',
						color: '#f0b637',
						title: '我的收藏'
					},
					{
						icon: '&#xe636;',
						color: '#375df0',
						title: '我的评论'
					},
					{
						icon: '&#xe601;',
						color: '#f08e37',
						title: '我的点赞'
					},
					{
						icon: '&#xe602;',
						color: '#168e1a',
						title: '浏览历史'
					}
				],
				column:this.$store.state.column, // 栏目
				state:null,
				delivery:false ,// 快递
				pay:false ,// 充话费
				uname: this.$store.state.uname// 当前用户
			};
		},
		mounted() {
			console.log(Number(this.$refs.a.scrollHeight + 40))
			this.$refs.a.style.height = Number(this.$refs.a.scrollHeight + 40) + "px";
			scrollY: true;
			eventPassthrough: 'vertical'
		},
		methods: {
			run(data){
				if(data!=""){
					if(data =='express'){ // 我的快递
						this.state='express'
					}else if(data=='taobao'){ // 淘宝优惠券
						this.$router.replace('/taobao')
					}else if(data=='TelephoneBill'){ // 我的钱包 手机充值
						this.state='pay'
					}
				}
			},
			login() { // 登录
				this.$router.replace('/login/pwd')
			},
			returnHome(returnHome){ // 子组件返回
				this.state = null
			}
		},
		components:{
			ExpressDelivery,
			TelephoneBill
		}
	}
</script>

<style lang="scss">
	@import "../../assets/sass/mixin";
	$color: #cec8c8;

	.person {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		overflow-x: hidden;
		overflow-y: scroll;
		display: block;
		.a {
			width: 100vw;
		}

		& div {
			width: 100%;
			min-height: 1px;
			border-bottom: 3px solid #cec8c8;
		}

		& div:last-child {
			border-bottom: 0;
		}

		.header {
			height: 150px;
			background: #f7f7f7;
			background: url(../../assets/img/login.jpg);
			background-size: 100%;
			position: relative;

			.icon {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 120px;
				height: 120px;

				i {
					position: absolute;
					font-size: 114px;
					color: #fff;
					width: 120px;
					height: 120px;
					text-align: center;
					line-height: 120px;
				}

				.huaquan {
					color: red;
					font-size: 81px;
				}

				.login,.uname {
					font-size: 20px;
					font-style: normal;
				}
			}

		}

		.operate {
			ul {
				li {
					width: 25%;
					padding: 10px 0;
					display: inline-block;
					text-align: center;

					i {
						display: block;
						height: 20px;
						font-size: 20px;
						padding-bottom: 6px;

					}
				}
			}
		}

		.column {
			width: auto;
			height: auto;
			min-height: 40px;

			ul {
				width: 96.5%;
				margin-left: 3.5%;
				li:hover,li:hover span{
					color: red;
				}
				li {
					line-height: 40px;
					width: 100%;
					height: 40px;
					border-bottom: 1px solid $color;

					span {
						float: right;
						margin-right: 3.5%;
						color: #969896;
						font-size: 14px;

						i {
							font-weight: bold;
						}
					}
				}

				li:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
