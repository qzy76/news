<template>
	<div class="tickets">
		<div class="comebreak">
			<a href="#/taobao"><i class="icon iconfont">&#xec73;</i></a>专享券直播
			<a href="#/taobao"><i class="icon iconfont">&#xe61e;</i></a>
		</div>
		<div class="shopType">
			<ul>
				<li v-for="(item,index) in shopType" :key="index">
					<a :href="'#/tickets/'+item.link">{{item.name}}</a>
				</li>
			</ul>
		</div>
		<div class="liveTitle">
			<select>
				<option>所有</option>
				<option v-for="(item,index) in screen" :key="index">{{item}}</option>
			</select>
			<a href="#">每日必拍券</a>
			<a href="#">大牌券(品牌)</a>
		</div>
		<div class="shaixuan_">
			<ul>
				<li class="active">默认</li>
				<li>销量</li>
				<li>券价格</li>
				<li>价格</li>
			</ul>
		</div>
		<div class="shopping">
			<ul>
				<li v-for="(item,index) in da" :key="index">
					<i class="icon iconfont">&#xe617;</i>
					<a :href="'#/shop/'+item.goods_id" class="vmImage">
						<img :src="item.pic">
					</a>
					<div class="vmgroup">
						<div class="vmName">
							<a href="'#/shop/'+item.goods_id">
								<svg v-if="item.src=='1'" class="icon svg-icon" aria-hidden="true">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tianmao"></use>
								</svg>
								<svg v-else class="icon svg-icon" aria-hidden="true">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-taobao"></use>
								</svg>
								<span>{{item.goods_name}}</span>
							</a>
						</div>
						<p><span>¥{{item.price_after_coupons}}</span>(券后价)</p>
						<div class="vmPrice">
							<span class="span_">销量 {{item.sales}}</span>
							<a :href="item.quan_link">
								<span class="vmTicket">
								<span class="ticket">券</span>
							<span class="num">¥{{item.price_coupons}}</span>
							</span>
							</a>
							
						</div>
					</div>
				</li>
			</ul>
		</div>
		<footer-menu/>
		<!--底部组件-->
	</div>
</template>

<script>
	import FooterMenu from './FooterMenu'

	export default {
		name: 'Grabtickets',
		data() {
			return {
				shopType: [
					//				{name:'全部',link:''},{name:'女装',link:''},{name:'男装',link:''},
					//				{name:'内衣',link:''},{name:'母婴',link:''},{name:'美妆',link:''},
					//				{name:'居家',link:''},{name:'鞋包配饰',link:''},{name:'美食',link:''},
					//				{name:'文体车品',link:''},{name:'数码家电',link:''},{name:'运动户外',link:''},
					// {name:'其他',link:''}
					{name:'全部',link:''},{name:'女装',link:''},{name:'男装',link:''},
					{name:'内衣',link:''},{name:'母婴',link:''},{name:'美妆',link:''},
					{name:'居家',link:''},{name:'鞋包配饰',link:''},{name:'美食',link:''},
					{name:'文体车品',link:''},{name:'数码家电',link:''},{name:'运动户外',link:''},
					{name:'其他',link:''}
				],
				screen: ['天猫', '聚划算', '淘抢购', '金牌卖家', '运费险', '海淘商品'],
				da: null,
				type:null, // classify 分类；dapai：大牌推荐领券；bipai：每日比拍领券 top100：人气领券；
				src: false, // 天猫商品显示
				jhs: false, //聚划算商品显示
				tqg: false, //淘抢购商品显示
				gold: false, //金牌卖家显示
				freight: false, // 运费险显示
				abroad: false, //海淘商品显示
				sort:null, // sales:销量； coupon:优惠券； price:商品价格； real_price:到手价
				sort_type:null, // asc:从低到高排序； desc:从高到低排序 （sort不为空时必填）
				page: 1
			};
		},
		mounted() {
			this.axios.get('/api/getGood88', {
				params: {
					page: this.page
				},
			}).then(response => {
				this.da = JSON.parse(response.data.text).data

				for(let i = 0; i < this.da.length; i++) {
					this.da[i].price_after_coupons = parseFloat(this.da[i].price_after_coupons) // 去掉优惠券/价格后面的零
					this.da[i].price_coupons = parseFloat(this.da[i].price_coupons)
				}
				console.log(this.da)
			}, function(response) {})
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
		.comebreak {
			width: 100%;
			padding: 0 5px;
			height: 50px;
			line-height: 50px;
			font-size: 20px;
			font-family: "微软雅黑";
			position: fixed;
			left: 0;
			top: 0;
			background: #f5f5f5;
			z-index: 10;
			text-align: center;
			a {
				display: inline-block;
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
					color: #828282;
				}
			}
			a:last-child {
				left: auto;
				right: 10px;
			}
		}
		.shopType {
			margin-top: 50px;
			background: #fd385d;
			width: 100vw;
			height: 40px;
			overflow: hidden;
			ul {
				height: 40px;
				line-height: 100%;
				li {
					float: left;
					width: calc(100vw / 5);
					display: inline-block;
					height: 40px;
					line-height: 40px;
					text-align: center;
					a {
						color: #fff;
					}
				}
			}
		}
		.liveTitle {
			border-bottom: 1px solid #ddd;
			select, a {
				display: inline-block;
				width: 30%;
				height: 30px;
				text-align: center;
				color: #000;
			}
			select {
				padding: 0 1vw;
				width: 24vw;
				text-align: center;
				border: 0px solid transparent;
				/*-webkit-appearance: none;
				-moz-appearance: none;*/
				outline: none;
				background: #fff;
				option {
					width: 100vw;
					height: 30px;
					text-align: center;
					border-bottom: 1px solid #ccc;
					background: transparent;
					border: none;
					outline: none;
				}
			}
		}
		.shaixuan_ {
			width: 100vw;
			height: 30px;
			line-height: 30px;
			border-bottom: 3px solid #ddd;
			ul {
				width: 100vw;
				height: 30px;
				li {
					display: inline-block;
					width: 24vw;
					height: 30px;
					text-align: center;
				}
			}
		}
		.shopping {
			width: 100%;
			ul {
				width: 100%;
				li {
					width: 49%;
					float: left;
					display: inline-block;
					vertical-align: top;
					position: relative;
					border: 1px #eeeeee solid;
					margin-bottom: calc(2vw - 4px);
					padding-bottom: 5px;
					background: #fff;
					i{
						display: inline-block;
						position: absolute;
						width: 10vw;
						height: 10vw;
						font-size: 10vw;
						color: #72ddd4;
						z-index: 9999;
						left: 0;
						top: -7px;
					}
					a {
						display: block;
						width: 100%;
						text-align: center;
						position: relative;
						img {
							width: 100%;
						}
					}
					.vmgroup {
						.vmName {
							a {
								width: 100%;
								height: 25px;
								display: block;
								svg {
									width: 10%;
									height: 16px;
									float: left;
									margin: 4.5px 0 4.5px 5px;
								}
								span {
									display: inline-block;
									float: left;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									float: left;
									width: calc(90% - 15px);
									margin-left: 5px;
									color: #333;
									height: 25px;
									line-height: 25px;
								}
							}
						}
						p {
							width: calc(100% -10px);
							margin: 0 5px;
							height: 25px;
							line-height: 25px;
							font-size: 14px;
							color: #ed145b;
							span {
								font-size: 18px;
								font-weight: bold;
							}
						}
						.vmPrice {
							width: calc(100% -10px);
							margin: 0 5px;
							height: 30px;
							line-height: 30px;
							font-size: 12px;
							.span_ {
								display: inline-block;
								color: #4e4e4e;
								float: left;
							}
							.vmTicket {
								display: inline-block;
								height: 20px;
								padding-right: 5px;
								line-height: 25px;
								color: rgba(253, 56, 93, 1);
								font-size: 12px;
								float: right;
								margin-top: 5px;
								.ticket {
									background: rgba(253, 56, 93, 1);
									width: 20px;
									height: 20px;
									display: block;
									text-align: center;
									color: #fff;
									line-height: 20px;
									float: left;
									border-top-left-radius: 3px;
									border-bottom-left-radius: 3px;
								}
								.num {
									float: left;
									border: 1px rgba(253, 56, 93, 1) solid;
									line-height: 18px;
									text-align: center;
									padding: 0 2px;
									border-top-right-radius: 3px;
									border-bottom-right-radius: 3px;
								}
							}
						}
					}
				}
				li:nth-child(even) {
					float: right;
				}
			}
		}
	}
</style>