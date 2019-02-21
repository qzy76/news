<template>
	<div class="ba">
		<div class="comebreak">
			<a href="#/taobao"><i class="icon iconfont">&#xec73;</i></a>8.8包邮
			<a href="#/taobao"><i class="icon iconfont">&#xe61e;</i></a>
		</div>
		<div class="shopping">
			<ul>
				<li v-for="(item,index) in da" :key="index">
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
		name: 'Freeshipping',
		data() {
			return {
				da: null,
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
	.ba {
		width: 100%;
		height: 100%;
		z-index: 9999;
		background: #f5f5f5;
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
		.shopping {
			margin-top: 50px;
			width: 100%;
			border-top: 3px solid #dedede;
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