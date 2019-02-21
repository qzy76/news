<template>
	<div class="index">
		<div class="topBreak">
			<i @click='ComeBreak' class="icon iconfont">&#xec73;</i>
			<h2 @click='ComeBreak'>返回</h2>
			<div class="search">
				<input type="text" :placeholder=placeholder v-model="keyworld">
				<button @click="searchWorld">搜索</button>
			</div>
		</div>
		<div class="column column1">
			<router-link v-for="(item,index) in column1" :to="item.type" :key="index">
				<img :src="item.src">
				<span>{{item.name}}<i v-if="index==0" class="icon iconfont">&#xe619;</i></span>
			</router-link>
		</div>
		<div class="column column2">
			<img :src="require('../../assets/img/tui01.png')" width="100%">
			<div class="huodong">
				<a class="n01" href="#/ju">
					<div class="N01"><img :src="require('../../assets/img/008.png')" style="width: 70%;margin:10px 0 0 10%"><img :src="require('../../assets/img/009.png')" style="width: 80%;margin:32px 0 50px 10%"></div>
				</a>
				<ul ref="wrapper">
					<li v-for="(item,index) in column2" :key="index">
						<a href=""><img :src="item.img1" :style="item.style1"><img :src="item.img2" :style="item.style2"></a>
					</li>
				</ul>
				<div class="clear"></div>
			</div>
		</div>
		<div class="column clear column3">
			<img :src="require('../../assets/img/tui02.jpg')" width="100%">
			<div ref='picWrapper'>
				<div class="huodong">
					<div v-for="(item,index) in dapai" :key="index">
						<a :href="'#/shop/'+item.goods_id">
							<img :src="item.pic" :alt="item.goods_name">
							<div class="content">
								<p class="sheng"> 领券省¥{{item.price_coupons}}</p>
								<p class="name">{{item.goods_name}}</p>
								<div class="jiage">￥{{item.price}} </div>
								<p class="fengqiang">已疯抢{{item.sales}}件</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="column4">
			<img class="title" :src="require('../../assets/img/tui03.png')">
			<div class="huodong">
				<div class="product" v-for="(item,index) in dujia" :key="index">
					<a :href="'#/shop/'+item.goods_id">
						<img :src="item.pic" :alt="item.goods_name">
						<div class="content">
							<p class="name">{{item.goods_name}}</p>
							<div class="sheng"><span>券</span>
								<div>￥{{item.price_coupons}}</div>
							</div>
							<div class="jiage">￥{{item.price_after_coupons}} </div>
							<p class="fengqiang">销量{{item.sales}}</p>
							<button>立即抢券</button>
						</div>
					</a>
				</div>
			</div>
		</div>
		<a href="javascript:;" class="to_top">
			<img :src="require('../../assets/img/back.png')">
		</a>
		<footer-menu/><!--底部组件-->
		<router-view/>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	import FooterMenu from './FooterMenu'
	export default {
		name: 'Tao',
		data() {
			return {
				footmenu:this.$store.state.taoBaoFooterMenu,
				column1: [
					{type: 'mms',name: '喵喵说',src: require('../../assets/img/qb_1.png')},
					{type: 'grabtickets',name: '抢券',src: require('../../assets/img/qb_2.png')},
					{type: 'Freeshipping',name: '8.8包邮',src: require('../../assets/img/qb_3.png')},
					{type: 'ju',name: '聚划算',src: require('../../assets/img/qb_4.png')},
					{type: 'video',name: '看货',src: require('../../assets/img/qb_5.png')}
				],
				column2: [
					{img1: require('../../assets/img/010.png'),img2: require('../../assets/img/011.png'),style1: "width: 70%;margin: 10px 10px",style2: "width: 50%;margin: 0 25%"},
					{img1: require('../../assets/img/012.png'),img2: require('../../assets/img/013.png'),style1: "width: 70%;margin: 10px 10px",style2: "width: 60%;margin: 0 20%"
					},
					{img1: require('../../assets/img/014.png'),img2: require('../../assets/img/015.png'),style1: "width: 80%;margin: 10px 10px",style2: "width: 60%;margin: 0 20%"},
					{img1: require('../../assets/img/016.png'),img2: require('../../assets/img/017.png'),style1: "width: 80%;margin: 10px 10px",style2: "width: 60%;margin: 0 20%"
}
				],
				dapai: null,
				dujia: null,
				appkey: this.$store.state.tbappkey, // 秘钥
				keyworld: null, // 查询词
				placeholder: '请输入要搜索的商品名称'
			}
		},
		created() {
			this.axios.get('/api/dapai')
				.then(res => {
					if(res.result == null) {
						console.log(JSON.parse(res.data.text).data.slice(0, 12))
						this.dapai = JSON.parse(res.data.text).data.slice(0, 12)
						this.dujia = JSON.parse(res.data.text).data.slice(12, 24)
						console.log(JSON.parse(res.data.text).data.slice(12, 24))
						this.picScroll = new Bscroll(this.$refs.picWrapper, {
							scrollX: true,
							eventPassthrough: 'vertical'
						})
					}
				})
		},
		methods: {
			ComeBreak() {
				this.$router.replace('/person')
			},
			searchWorld() {
				this.placeholder = this.keyworld == null || this.keyworld == '' ? '请输入关键词' : '请输入要搜索的商品名称';
				//console.log(this.keyworld)
				if(!(this.keyworld == null || this.keyworld == '')) {
					this.$router.replace('/searchList/' + this.keyworld)
				}

			}
		},
		components: {
			FooterMenu
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		height: 100%;
		z-index: 9999;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		overflow-y: scroll;
		overflow-x:hidden;
		.topBreak {
			width: 100%;
			padding: 0 5px;
			height: 40px;
			line-height: 40px;
			font-size: 18px;
			position: fixed;
			left: 0;
			top: 0;
			background: #fff;
			z-index:10;
			i, h2 {
				float: left;
				padding-bottom: 5px;
			}
			.search {
				width: 80%;
				height: 100%;
				display: block;
				padding-left: 15%;
				input, button {
					height: 30px;
					border-radius: 15px;
					border: 0px;
				}
				input[type='text'] {
					width: 75%;
					padding-left: 10px;
					font-size: 12px;
					background: #f1eaea;
					outline: navajowhite;
				}
				button {
					width: 17%;
					outline: none;
					font-weight: bold;
					background: #c4ebfd;
					color: #ea7e97;
				}
			}
		}
		.column {
			padding: 5px 0;
			width: 100%;
		}
		.column1 {
			display: inline-block;
			margin: 50px 0 10px;
			a {
				display: inline-block;
				width: 20%;
				height: 100%;
				text-align: center;
				img {
					width: 60%;
				}
				span {
					display: block;
					position: relative;
					color: #666;
					i{
						font-size: 8px;
						color: red;
						position: absolute;
    right: -12px;
    top: 0;
					}
				}
			}
		}
		.column2 {
			height: 241px;
			.huodong {
				width: 100%;
				height: 100%;
				img {
					width: 100%;
				}
				a.n01 {
					display: inline-block;
					width: 37.5%;
					height: 100%;
					float: left;
					.N01 {
						width: 100%;
						height: 100%;
					}
				}
				ul {
					float: left;
					display: inline-block;
					width: 62.5%;
					height: 100%;
					li {
						width: 49.5%;
						height: 50%;
						float: left;
						border-left: 1px #f5f5f5 solid;
						border-bottom: 1px #f5f5f5 solid;
					}
				}
			}
		}
		.column3 {
			background: url(../../assets/img/030.png);
			height: 238px;
			.huodong {
				div {
					background: #fff;
					margin-left: 3.3vw;
					float: left;
					width: 30vw;
					img {
						width: 100%;
					}
					.content {
						margin-left: 0;
						position: relative;
						div, p {
							width: 100%;
							text-align: center;
							display: inline-block;
							margin-left: 0;
						}
						div {
							font-size: 16px;
						}
						.sheng {
							position: absolute;
							top: -20px;
							height: 20px;
							line-height: 20px;
							background: rgba(253, 56, 93, 0.8);
							color: #fff;
						}
						.name {
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							color: #444;
						}
						.jiage {
							color: #ff5272;
						}
						.fengqiang {
							color: #666;
						}
					}
				}
			}
		}
		.column4 {
			.title {
				width: 40%;
				margin: 10px 30%;
			}
			.huodong {
				width: 100%;
				div.product {
					width: 100%;
					height: 40vw;
					margin-bottom: 10px;
					a {
						img {
							width: 40%;
							display: inline-block;
						}
						.content {
							width: 55%;
							height: 40vw;
							float: right;
							display: inline-block;
							text-align: center;
							min-height: auto;
							padding: 0 2.5%;
							position: relative;
							.sheng {
								height: 25px;
								padding-right: 5px;
								line-height: 25px;
								color: rgba(253, 56, 93, 1);
								font-size: 14px;
								margin: 7px 0;
								width: auto;
								span {
									background: rgba(253, 56, 93, 1);
									width: 25px;
									height: 25px;
									display: inline-block;
									text-align: center;
									color: #fff;
									line-height: 25px;
									float: left;
									border-top-left-radius: 3px;
									border-bottom-left-radius: 3px;
								}
								div {
									float: left;
									width: fit-content;
									border: 1px rgba(253, 56, 93, 1) solid;
									line-height: 23px;
									text-align: center;
									padding: 0 3px;
									border-top-right-radius: 3px;
									border-bottom-right-radius: 3px;
								}
							}
							.name {
								text-align: justify;
								color: #666;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
							}
							.jiage {
								color: rgba(253, 56, 93, 1);
								font-size: 14px;
								width: 50%;
								float: left;
								text-align: left;
							}
							.fengqiang {
								color: #999999;
								font-size: 14px;
								width: 50%;
								float: right;
								text-align: right;
							}
							button {
								width: 95%;
								margin: 0 2.5%;
								background: #ff5272;
								height: 30px;
								border: 0;
								border-radius: 5px;
								font-size: 16px;
								color: #fff;
								position: absolute;
								right: 0;
								bottom: 0;
							}
						}
					}
				}
			}
		}
		.to_top {
			position: fixed;
			right: 20px;
			bottom: 70px;
			width: 60px;
			height: 60px;
			img {
				width: 60px;
				height: 60px;
			}
		}
	}
</style>