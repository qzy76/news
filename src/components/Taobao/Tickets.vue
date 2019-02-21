<template>
	<div class="tickets">
		<div class="comebreak">
			<a href="#/taobao"><i class="icon iconfont">&#xec73;</i></a>超级搜
			<a href="#/course"><i class="icon iconfont">&#xe616;</i>查券指南</a>
		</div>
		<div class="banner">
			<img :src="require('../../assets/img/002.png')" alt="">
			<p><span @click="choosetype" :class="{'active':type==1}">大金额限量券<i class="icon iconfont">&#xe610;</i></span>
				<span @click="choosetype" :class="{'active':type==2}">查全网券</span></p>
		</div>
		<div class="menu">
			<ul>
				<router-link exact v-for="(item,index) in menu" :key="index" tag="li" to="/">
					<img :src="item.img">
					<p>{{item.name}}</p>
				</router-link>
			</ul>
			<div class="search-group">
				<input type="text" class="enter" placeholder="宝贝名称/关键词（如：大闸蟹）" v-model="world">
				<i class="icon iconfont">&#xe60b;</i>
				<router-link tag="button" :to="'/searchList/'+world">搜索</router-link>
			</div>
		</div>
		<div class="group bgccc" v-for="(item,index) in typeCoupon" :key="index">
			<div class="big-title">{{item.title}}</div>
			<div class="big">
				<ul>
					<router-link tag="li" :to="'/shop/'+item1.goods_id" v-for="(item1,index) in item.column" :key="index">
						<img :src="item1.pic">
						<p class="name">{{item1.goods_name}}</p>
						<p class="price">¥{{item1.price}}</p>
						<span class="quan">
							<img :src="require('../../assets/img/003.png')"/>
							<span class="number">领券省 ¥{{item1.price_coupons}}</span>
						</span>
					</router-link>
				</ul>
			</div>
		</div>
		<footer-menu/>
	</div>
</template>

<script>
	import FooterMenu from './FooterMenu'
	export default {
		name: 'Tickets',
		data() {
			return {
				type: 1,
				world: null,
				menu: [
					{name: "人气",img: require('../../assets/img/007.png')},
					{name: "天猫",img: require('../../assets/img/004.png')},
					{name: "淘抢购",img: require('../../assets/img/006.png')},
					{name: "聚划算",img: require('../../assets/img/sju.png')},
					{name: "运费险",img: require('../../assets/img/005.png')}
				],
				shopType: [
					{id: "1",classname: "女装"},
					{id: "2",classname: "男装"},
					{id: "3",classname: "内衣"},
					{id: "4",classname: "母婴"},
					{id: "5",classname: "美妆"},
					{id: "6",classname: "居家"},
					{id: "7",classname: "鞋包配饰"},
					{id: "8",classname: "美食"},
					{id: "9",classname: "文体车品"},
					{id: "10",classname: "数码家电"},
					{id: "11",classname: "运动户外"},
					{id: "12",classname: "其他"}
				],
				daCoupon: [],
				typeCoupon:[]
			};
		},
		mounted() {
			this.axios.get('/api/getGoodCoupon')
			.then(res => {
			if(res.result == null) {
				let da = []
				for(let i = 0; i < 9; i++) {
					da = da.concat(JSON.parse(res.data.text).data[i])
					da[i].price_coupons = parseFloat(da[i].price_coupons) // 去掉优惠券后面的零
				}
				da = '{"title":"大额券","column": '+JSON.stringify(da)+'}';
				da = JSON.parse(da)
				this.typeCoupon = this.typeCoupon.concat(da)
				for(let i = 0; i < this.shopType.length;i++) {
					let da  = []
					this.axios.get('/api/getGoodType', {
						params: {
							cid: this.shopType[i].id
						},
					}).then(response => {
						let data1 = JSON.parse(response.data.text).data
						for(let i = 0; i < 9; i++) {
							da = da.concat(data1[i])
							da[i].price_after_coupons = parseFloat(da[i].price_after_coupons) // 去掉优惠券/价格后面的零
							da[i].price_coupons = parseFloat(da[i].price_coupons)
						}
						da = '{"title":"'+this.shopType[i].classname+'","column": '+JSON.stringify(da)+'}';
						da = JSON.parse(da)
						this.typeCoupon = this.typeCoupon.concat(da)
					})
				}
			}
			})
		},
		methods: {
			choosetype() {
				this.type = this.type == 1 ? 2 : 1
			}
		},
		components: {
			FooterMenu
		}
	}
</script>

<style lang="scss">
	.tickets {
		width: 100%;
		height: 100%;
		z-index: 9999;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		overflow-y: scroll;
		overflow-x: hidden;
		font-family: "微软雅黑";
		.comebreak {
			width: 100%;
			padding: 0 5px;
			height: 50px;
			line-height: 50px;
			font-size: 13px;
			font-family: "微软雅黑";
			position: fixed;
			left: 0;
			top: 0;
			background: #fff;
			z-index: 10;
			text-align: center;
			a {
				position: absolute;
				left: 0;
				top: 0;
				width: 10vw;
				height: 100%;
				i {
					display: block;
					font-size: 20px;
					width: 10vw;
					height: 100%;
					color: #2f2f2f;
				}
			}
			a:first-child {
				font-weight: bold;
			}
			a:last-child {
				left: auto;
				right: 10px;
				width: 30vw;
				font-size: 13px;
				color: #000;
				i {
					width: auto;
					float: left;
					font-size: 20px;
					color: #ec6e44;
				}
			}
		}
		.banner {
			width: 100%;
			position: relative;
			height: 137px;
			margin-top: 50px;
			img {
				width: 100%;
			}
			p {
				text-align: center;
				width: 100%;
				height: 25px;
				margin-top: -10px;
				border-bottom: 1px solid #ccc;
				span {
					display: inline-block;
					width: 40%;
					height: 25px;
					line-height: 25px;
					font-size: 12px;
					border-radius: 10px 10px 0 0;
					background: #fff;
					color: #e7572a;
					vertical-align: text-bottom;
				}
				span.active {
					color: #fff;
					background: linear-gradient(to right, #ea8446, #e7572a);
				}
			}
		}
		.menu {
			width: 80%;
			height: 130px;
			padding: 10vw;
			ul {
				display: block;
				width: 80vw;
				height: 20vw;
				li {
					width: 20%;
					height: 100%;
					display: inline-block;
					float: left;
					text-align: center;
					img {
						width: 80%;
					}
				}
			}
			.search-group {
				width: 94vw;
				height: 50px;
				display: inline-block;
				margin: 10px 0;
				position: relative;
				left: -7vw;
				font-size: 12px;
				input, button {
					height: 40px;
					border: 0px;
				}
				input {
					background: #f1f1f1;
					width: calc(75% - 40px);
					float: left;
					padding: 5px 0 5px 40px;
					border-radius: 5px 0 0 5px;
					outline: none;
				}
				i {
					position: absolute;
					left: 0;
					top: 0;
					font-size: 16px;
					width: 40px;
					height: 50px;
					line-height: 50px;
					text-align: center;
				}
				button {
					display: inline-block;
					width: 25%;
					float: right;
					border-radius: 0 5px 5px 0;
					padding-left: 0;
					height: 50px;
					line-height: 50px;
					color: #fff;
					background: linear-gradient(to right, #ea8446, #e7572a);
				}
			}
		}
		.group {
			width: 100%;
			height: 600px;
			.big-title {
				width: 100%;
				background: #f5f5f5;
				text-align: center;
				color: #ff5400;
				font-size: 18px;
				height: 50px;
				line-height: 50px;
			}
			.big {
				width: 100vw;
				height: 550px;
				background: #fff;
				margin-top: 20px;
				ul {
					width: 96%;
					height: 90%;
					margin: 5% 2%;
					li {
						width: 32%;
						height: 33%;
						display: inline-block;
						background: #fff;
						margin-right: 2%;
						img {
							width: 100%;
							background: #fff;
						}
						p.name {
							font-size: 13px;
							color: #444;
							display: block;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.price {
							font-size: 14px;
							color: #ff5400;
							text-align: center;
						}
						.quan {
							position: relative;
							width: 100%;
							height: 33px;
							img {
								width: 100%;
								background: transparent;
							}
							span {
								display: block;
								height: 33px;
								line-height: 33px;
								position: absolute;
								left: 55%;
								top: 0px;
								transform: translate(-50%, -50%);
								text-align: center;
								width: 30vw;
								color: #fff;
							}
						}
					}
					li:nth-child(3n) {
						margin-right: 0;
					}
				}
			}
		}
		.bgccc {
			.big {
				ul {
					li {
						background: #f5f5f5;
					}
				}
			}
		}
	}
</style>