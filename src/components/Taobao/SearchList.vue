<template>
	<div class="search">
		<div class="top">
			<div class="cha">
				<div class="comebreak" @click='ComeBreak'>
					<i class="icon iconfont">&#xec73;</i>
				</div>
				<div class="search_center">
					<div class="searchBtn">
						<i class="icon iconfont">&#xe60b;</i>
					</div>
					<input :placeholder=placeholder type="text" name="kwd" v-model="keyworld">
					<div class="clearBtn" @click="clearWorld" v-show="keyworld != null && keyworld != ''">
						<i class="icon iconfont">&#xe73d;</i>
					</div>
				</div>
				<div class="search_right">
					<div :class="proType?'active' :null" @click="check(true)">搜大额</div>
					<div :class="!proType?'active' :null" @click="check(false)">搜全网</div>
				</div>
			</div>
			<div class="shaixuan" v-if="proType">
				<ul>
					<!--接口http://www.tkjidi.com/cms/detail-->
					<!--<li @click="filter(index)" v-for="(item,index) in screen" :key="index">{{item}}</li>-->
					<li :class="src?'active':null" @click="filter(0)">天猫</li>
					<li :class="jhs?'active':null" @click="filter(1)">聚划算</li>
					<li :class="tqg?'active':null" @click="filter(2)">淘抢购</li>
					<li :class="gold?'active':null" @click="filter(3)">金牌卖家</li>
					<li :class="freight?'active':null" @click="filter(4)">运费险</li>
					<li :class="abroad?'active':null" @click="filter(5)">海淘商品</li>
				</ul>
			</div>
			<div class="shaixuan_">
				<ul v-if="proType">
					<li :class="index=='0'?'active':null" @click="sortFind('0')">默认</li>
					<li :class="index=='1'?'active':null" @click="sortFind('1','sales')">销量</li>
					<li :class="index=='2'?'active':null" @click="sortFind('2','coupon')">券价格</li>
					<li :class="index=='3'?'active':null" @click="sortFind('3','real_price','asc')">价格</li>
				</ul>
				<ul class="quanwang" v-else>
					<li :class="index=='0'?'active':null" @click="sortFind('0')">综合</li>
					<li :class="index=='1'?'active':null" @click="sortFind('1','sales')">天猫</li>
					<li :class="index=='2'?'active':null" @click="sortFind('2','coupon')">销量</li>
				</ul>
				<div>
					<i v-if="viewType" @click="viewLableType" class="icon iconfont">&#xe6d7;</i>
					<i v-else @click="viewLableType" class="icon iconfont">&#xe61d;</i>
					<span>筛选</span>
					<i class="icon iconfont">&#xe654;</i>
				</div>
			</div>
		</div>
		<div class="shpping" :class="!proType?'active' :null">
			<div class="shopView">
				<ul class="big_so" :class="!viewType?'view':null">
					<loading v-if="pro==null" />
					<li v-else v-for="(item,index) in pro" :key="index" v-show="!src&&!jhs&&!tqg&&!gold&&!freight&&!abroad||src&&item.src=='1'||jhs&&item.jhs=='1'||tqg&&item.tqg=='1'||gold&&item.gold=='1'||freight&&item.freight=='1'||abroad&&item.abroad=='1'">
						<a class="vmImage" :href="'#/shop/'+item.goods_id"><img :src="item.pic"></a>
						<div class="vmgroup">
							<div class="vmName">
								<a :href="'#/shop/'+item.goods_id">
									<svg v-if="item.src=='1'" class="icon svg-icon" aria-hidden="true">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tianmao"></use>
									</svg>
									<svg v-else class="icon svg-icon" aria-hidden="true">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-taobao"></use>
									</svg>
									<span>{{item.goods_name}}</span>
								</a>
							</div>
							<span class="vmTicket" v-show="item.price_coupons>0">
								<span class="ticket">券</span>
							<span class="num">¥{{item.price_coupons}}</span>
							</span>
							<div class="vmPrice"> <span class="price">¥{{item.price_after_coupons}}</span> <span class="span_">销量 {{item.sales}}</span></div>
							<p class="yuanjia" v-show="!viewType">¥{{item.price}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Loading from '../../public/SearchLoading';
	export default {
		name: 'SearchList',
		data() {
			return {
				keyworld: this.$route.params.keyworld,
				viewType: true, // true 左右两格列表   false  上下列表
				proType: true, // true 搜大额  false 搜全网
				placeholder: '购物先领券，优惠等你搜',
				pro: null,
				index: '0', // 筛选第二栏
				type: 'so',
				page: '1',
				sort: 'desc',
				sort_type: null,
				screen: ['天猫', '聚划算', '淘抢购', '金牌卖家', '运费险', '海淘商品'],
				filter_type: null, // 过滤类型
				src: false, // 天猫商品显示
				jhs: false, //聚划算商品显示
				tqg: false, //淘抢购商品显示
				gold: false, //金牌卖家显示
				freight: false, // 运费险显示
				abroad: false, //海淘商品显示
			}
		},
		components: {
			Loading
		},
		mounted() {
			this.find(this.type, this.page)
		},
		methods: {
			ComeBreak() { // 返回
				this.$router.replace('/taobao')
			},
			check(data) { // 查商品
				if(this.keyworld != null && this.keyworld != '') {
					this.index = '0'
					this.proType = data == true ? true : false
					this.find(this.type, this.page, this.sort, this.sort_type)
				} else {
					this.placeholder = '请输入搜索关键词！'
				}
			},
			clearWorld() { // 清除搜索词
				this.keyworld = null
			},
			filter(data) {
				//console.log(event.currentTarget);
				switch(data) {
					case 0:
						this.src = !this.src
						break;
					case 1:
						this.jhs = !this.jhs
						break;
					case 2:
						this.tqg = !this.tqg
						break;
					case 3:
						this.gold = !this.gold
						break;
					case 4:
						this.freight = !this.freight
						break;
					default:
						this.abroad = !this.abroad
						break;
				}
				console.log(this.src, this.jhs, this.tqg, this.gold, this.freight, this.abroad);
			},
			sortFind(index, sort, sort_type) {
				this.index = index
				this.sort = sort
				this.sort_type = sort_type
				this.find(this.type, this.page, this.sort, this.sort_type)
			},
			find(type, page, sort, sort_type) { // 大额
				if(this.keyworld == null || this.keyworld == '') {
					this.placeholder = '请输入搜索关键词！'
				} else {
					this.placeholder = '购物先领券，优惠等你搜'
					this.$router.replace('/searchList/' + this.keyworld)
					this.pro = null
					//http://www.tkjidi.com/cms/detail
					if(this.proType) {
						this.axios.get('/api/findGoods', {
							params: {
								keyworld: this.keyworld,
								type: type,
								page: page,
								sort: sort,
								sort_type: sort_type
							},
						}).then(response => {
							if(JSON.parse(response.data.text).status != '200') { // 没有数据或请求失败
								console.log(response.data)
								console.log('找不到商品')
							} else { // 正确的返回
								this.pro = JSON.parse(response.data.text).data
							}
						}, function(response) {
							console.log('请求失败')
						})
					} else {
						this.axios.get('/api/checkWhole', {
							params: {
								keyworld: this.keyworld,
								page: page,
								sort: sort,
								sort_type: sort_type
							},
						}).then(response => {
							this.pro = JSON.parse(response.data.text).data.data
							//							console.log(JSON.parse(response.data.text).data.data)
						}, function(response) {})
					}
				}
			},
			viewLableType() {
				console.log(this.viewType)
				this.viewType = this.viewType == true ? false : true
			}
		}
	}
</script>

<style lang="scss">
	.search {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 9999;
		background: #fff;
    overflow-y: scroll;
    overflow: auto;
		.top {
			position: fixed;
			z-index: 9999;
			width: 100%;
			min-height: 100px;
			background: #fff;
			div {
				float: left;
			}
			i, div, ul, li {
				display: inline-block;
			}
			a {
				color: #000;
			}
			.cha {
				width: 100%;
				height: 30px;
				padding: 10px 0;
				line-height: 30px;
				border-bottom: 1px solid #f5f5f5;
				.comebreak {
					width: 10vw;
					i {
						text-align: center;
						width: 10vw;
					}
				}
				.search_center {
					background: #f5f5f5;
					width: 60vw;
					height: 36px;
					border-radius: 25px;
					position: relative;
					input {
						border: none;
						background: #f5f5f5;
						outline: none;
						width: 75%;
					}
					i {
						font-size: 18px;
						color: #adadad;
					}
					.searchBtn i {
						margin: 3px 1px 3px 10px;
						font-size: 20px;
					}
					.clearBtn {
						position: absolute;
						right: 5px;
						top: 5px;
					}
				}
				.search_right {
					width: 28vw;
					height: 100%;
					div {
						display: inline-block;
						width: 48%;
						height: 100%;
						text-align: center;
					}
					.active {
						color: red;
					}
				}
			}
			/*.shaixuan*/
			.shaixuan, .shaixuan_ {
				width: 100%;
				height: 38px;
				border-bottom: 1px solid #f5f5f5;
				overflow: hidden;
				clear: both;
				ul {
					width: 100%;
					height: 38px;
					li {
						display: inline-block;
						width: calc((100% / 6) - 4px);
						text-align: center;
						height: 38px;
						line-height: 38px;
					}
					li.active {
						color: #ff5800;
					}
				}
			}
			.shaixuan_ {
				height: 36px;
				padding-bottom: 6px;
				ul {
					width: 74%;
					float: left;
					li {
						width: 23%;
					}
					li.active {
						border-bottom: 2px #ff5800 solid;
					}
				}
				div {
					width: 26%;
					height: 38px;
					line-height: 38px;
					display: inline-block;
					i {
						width: 20%;
						display: inline-block;
						font-size: 18px;
					}
					span {
						width: 45%;
						text-align: center;
						display: inline-block;
						border-left: 1px solid #f5f5f5;
					}
				}
			}
		}
		.shpping {
			width: 100vw;
			padding-top: 133px;
			height: calc(100% - 133px);
			.shopView {
				margin: 10px 2.5vw;
				.big_so, .big_so.view {
					li {
						width: 49%;
						float: left;
						display: inline-block;
						vertical-align: top;
						position: relative;
						border: 1px #f5f5f5 solid;
						margin-bottom: 10px;
						a.vmImage {
							display: block;
							width: 100%;
							text-align: center;
							position: relative;
							img {
								width: 100%;
							}
						}
						.vmgroup {
							width: 94%;
							margin: 0 3%;
							.vmName {
								a {
									display: block;
									width: 100%;
									height: 20px;
									line-height: 25px;
									svg {
										width: 10%;
										height: 16px;
										float: left;
										margin: 4.5px auto;
									}
									span {
										display: inline-block;
										float: right;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										float: left;
										width: 90%;
										color: #333;
									}
								}
							}
							.vmTicket {
								position: absolute;
								background: #ff5800;
								padding: 2px 6px;
								color: #fff;
								bottom: 75px;
								right: 5px;
								border-radius: 15px;
								font-size: 10px;
							}
							.vmPrice {
								margin: 10px 0;
								font-size: 14px;
								color: #ff5800;
								float: left;
								width: 100%;
								height: 22px;
								line-height: 22px;
								.price {
									float: left;
								}
								.span_ {
									float: right;
									color: #4e4e4e;
									font-size: 12px;
								}
							}
						}
					}
					li:nth-child(odd) {
						float: left;
					}
					li:nth-child(even) {
						float: right;
					}
				}
				.big_so.view {
					li {
						width: 100%;
						a.vmImage {
							width: 30%;
							float: left;
							display: inline-block;
						}
						.vmgroup {
							float: left;
							display: inline-block;
							width: 64%;
							/*6%给图片magin*/
							.vmName {
								a {
									span {
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
									}
								}
							}
							.vmTicket {
								position: static;
								border: 1px #ff5800 solid;
								padding: 0;
								margin: 5px 0;
								display: inline-block;
								border-radius: 4px;
								background: #fff;
								height: 20px;
								span{
									display: inline-block;
									height: 100%;
								}
								.ticket{
									background: #ff5800;
									padding-left: 5px;
								}
								.num{
									color: #ff5800;
									padding-right: 5px;
								}
							}
							.vmPrice{
								
								.price{
									vertical-align: bottom;
									font-size: 16px;
								}
								.span_{
									padding-left: 5px;
									float: left;
									font-size: 12px;
									vertical-align: bottom;
									color: #666;
								}
								
							}
							.yuanjia{
								text-decoration: line-through;
								color: #999;
							}
						}
					}
				}
			}
		}
		.shpping.active {
			padding-top: 90px;
			height: calc(100% - 90px);
		}
	}
</style>