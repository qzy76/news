<template>
	<div class="author" v-if="da!=null">
		<i @click='ComeBreak' class="icon iconfont comeback">&#xec73;</i>
		<div class="top-bg">
			<img class="mytupian" :src="da.info.cover_path">
		</div>
		<div class="msg-group">
			<img :src="da.author_info.avatar" class="head-img">
			<div class="name-gp">
				<span class="name">{{da.author_info.author}}</span>
			</div>
			<a :href="'#/author/'+da.author_info.id">看TA更多</a>
		</div>
		<div class="title">
			<h2>{{da.info.title}}</h2>
			<div class="visit-likes">
				<span class="visit"><i class="icon iconfont">&#xe6a0;</i>{{da.info.views}}</span>
				<span class="likes"><i class="icon iconfont">&#xe60c;</i>{{da.info.likes}}</span>
			</div>
		</div>
		<div class="baobei" @click="showGoods">提到的宝贝 {{da.product.length}}</div>
		<div class="text-img" v-html="da.info.body"></div>
		<div class="shadow" v-show="product" @click="showGoods"></div>
		<i class="icon iconfont showGoods" v-show="product" @click="showGoods">&#xe66b;</i>
		<div class="shangpin" v-show="product">
			<p class="namer">文中商品</p>
			<ul>
				<li v-for="(item,index) in Goods" :key="index">
					<img :src="item.thumb" class="right-img">
					<div class="right-right">
						<span class="right-name">{{item.buss_name}}</span>
						<div class="fl">
							<span class="quan">
								<span class="quan-text">券</span>{{item.youhuiquan_price}}
							</span>
							<span class="quan-num">
								<span class="yang">￥</span>
							<span class="num">{{item.price_juanhou}}</span> 券后</span>
						</div>
						<a :href="'#/shop/'+item.goods_id" class="lijiqiang">立即抢购</a>
					</div>
				</li>
			</ul>
		</div>
		<footer-menu/><!--底部组件-->
		
	</div>
</template>

<script>
	import FooterMenu from './FooterMenu'
	
	export default {
		name: 'List',
		data() {
			return {
				id: this.$route.params.id, // 作者id
				da: null, //当前作者的所有数据
				pic: null, // 头像
				author: null,
				product: false,
				Goods: [],
				concat: null
			};
		},
		mounted() {
			this.axios.get('/api/mmsInfo', {
				params: {
					id: this.id,
				},
			}).then(res => {
				if(res.result == null) {
					this.da = JSON.parse(res.data.text).data
					//this.pic = JSON.parse(res.data.text).data.author_info.avatar
					console.log(JSON.parse(res.data.text).data)
				}
			})
		},
		methods: {
			ComeBreak() {
				this.$router.go(-1)
			},
			showGoods() {
				if(this.product == false && this.Goods.length == 0) {
					let len = this.da.product.length;
					for(let i = 0; i < len; i++) {
						this.Goods = this.Goods.concat(JSON.parse(this.da.product[i].product_info)) // 把商品转换为json并合并
						this.Goods[i].youhuiquan_price = parseFloat(this.Goods[i].youhuiquan_price) // 去掉优惠券后面的零
					}

				}
				console.log(this.Goods)
				this.product = !this.product
			}
		},
		components: {
			FooterMenu
		}
	}
</script>
<style lang="scss">
	.author {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 9999;
		background: #fff;
		.comeback {
			position: fixed;
			left: 10px;
			top: 10px;
			font-size: 20px;
			color: #fff;
			z-index: 10;
		}
		.top-bg {
			width: 100%;
			height: 180px;
			img {
				width: 100%;
			}
		}
		.msg-group {
			width: calc(100% - 20px);
			height: 70px;
			display: inline-block;
			margin: 10px;
			.head-img {
				float: left;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				margin-right: 10px;
			}
			.name-gp {
				float: left;
				width: calc(100% - 70px);
				.name {
					font-size: 14px;
					font-family: '微软雅黑';
				}
			}
			a {
				padding: 10px 20px;
				color: #ff381d;
				border: 1px #ff381d solid;
				border-radius: 30px;
				font-size: 12px;
				margin: 10px 0 0 0;
				float: right;
			}
		}
		.title {
			width: calc(100% - 20px);
			height: 50px;
			margin: 0 10px 20px;
			h2 {
				font-size: 16px;
				color: #444;
				margin: 18px 0;
				font-family: '微软雅黑';
			}
			.visit-likes {
				display: block;
				width: 100%;
				span {
					float: left;
					font-size: 12px;
					color: #999;
					margin-right: 10px;
				}
			}
		}
		.baobei {
			position: fixed;
			right: 0;
			top: 50%;
			background: #ff381d;
			border-top-left-radius: 30px;
			border-bottom-left-radius: 30px;
			color: #fff;
			padding: 10px;
			font-size: 12px;
		}
		.text-img {
			margin: 0 10px;
		}
		.shadow {
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 11;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			overflow: auto;
		}
		i.showGoods {
			display: block;
			background: rgba(255, 255, 255, 0.8);
			position: absolute;
			top: calc(50% - 5vh);
			width: 8vw;
			height: 10vh;
			line-height: 10vh;
			left: 7vw;
			text-align: center;
			z-index: 11;
		}
		.shangpin {
			width: 85vw;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.8);
			position: fixed;
			top: 0;
			right: 0;
			padding: 10px;
			overflow-y: scroll;
			overflow: auto;
			height: 100%;
			z-index: 11;
			p {
				margin: 15px 0;
				font-size: 14px;
				font-family: "微软雅黑"
			}
			ul {
				width: calc(85vw -20px);
				li {
					background: #fff;
					width: 100%;
					height: 31vw;
					margin-bottom: 10px;
					overflow: hidden;
					img {
						width: calc(31vw - 10px);
						float: left;
						margin: 5px;
					}
					.right-right {
						width: 60%;
						float: left;
						.right-name {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-size: 12px;
						}
						.fl {
							margin: 10px 0 5px 0;
							.quan {
								background: url(../../assets/img/bgq.png) no-repeat;
								background-size: 95% 100%;
								padding: 3px 10px 3px 5px;
								color: #ff4e36;
								display: inline-block;
								float: left;
								font-size: 12px;
								.quan-text {
									border-right: 1px #ff4e36 dashed;
									padding-right: 5px;
									margin: 0 5px;
								}
							}
							.quan-num {
								float: left;
								color: #999;
								font-size: 12px;
								.yang {
									font-size: 12px;
									color: #ff4e36;
								}
								.num {
									font-size: 14px;
									color: #ff4e36;
									font-weight: bold;
								}
							}
						}
						a.lijiqiang {
							background: #ff4e36;
							padding:5px 10px;
							display: inline-block;
							color: #fff;
							float: right;
							border-radius: 30px;
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>