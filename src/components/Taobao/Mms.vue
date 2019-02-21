<template>
	<div class="mms">
		<div class="top-bg" :style='{backgroundImage:"url(" + tuijian[index1].banner_path + ")"}'>
			<div class="topBreak">
				<i @click='ComeBreak' class="icon iconfont">&#xec73;</i>
				<div class="search">
					<input type="text" placeholder="作者/品类/专题关键字" v-model="search">
					<i @click='Search' class="icon iconfont">&#xe60b;</i>
				</div>
			</div>
			<div class="pic-wrapper" ref='picWrapper'>
				<ul class="pic-list" ref='picList'>
					<li class="pic-item" v-for="(item,index) in tuijian" :key="index" @click="showtype(item.id,index)">
						<div>
							<i v-if="item.icon!=''" class="icon iconfont" v-html="item.icon"></i>{{item.name}}
						</div>
					</li>
				</ul>
			</div>
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in mmsClassPro" v-if="index==0" :key="index">
					<img :src="item.thumb">
					<div class="right">
						<span class="right-name">{{item.title}}</span>
						<div class="fl">
							<span class="quan">
								<span class="quan-text">券</span>{{item.coupon_amount}}
							</span>
							<div class="clear"></div>
							<div class="buy">
								<span class="quan-num">
									<span class="yang">￥</span>
								<span class="num">{{item.price_coupon}}</span>券后
								</span>
								<a :href="'#/shop/'+item.taobao_id" class="lijiqiang">立即抢购</a>
							</div>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<div class="index-content">
				<ul class="goods_list">
					<li v-for="(item,index) in mmsList" :key="index">
						<div class="head-group">
							<a :href="'#/author/'+item.author_id">
								<img :src="item.avatar" class="head-img" onerror="javascript:this.style.opacity='0'">
								<div class="head-left">
									<div>
										<span class="name">{{item.author}}</span>
										<span class="fenlei">#{{item.class_name}}</span>
										<div class="clear"></div>
										<span class="jieshao"></span>
									</div>
									<div>ID号:{{item.author_id}}</div>
								</div>
								<div class="clear"></div>
							</a>
						</div>
						<a :href="'#/list/'+item.id">
							<div class="video-group">
								<img class="mytupian" :src="item.cover_path"></div>
							<p class="index-title">{{item.title}}</p>
							<span class="text-jianjie" v-html="item.body"></span>
						</a>
						<div class="liulan-dianzan">
							<span class="liulan"><i class="icon iconfont">&#xe6a0;</i>{{item.views}}</span>
							<span class="dianzan"><i class="icon iconfont">&#xe60c;</i>{{item.likes}}</span>
							<div class="clear"></div>
						</div>
						<div class="clear"></div>
					</li>
				</ul>
			</div>
		</div>
		<footer-menu/><!--底部组件-->
		
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
	import FooterMenu from './FooterMenu'
	
	export default {
		data() {
			return {
				footmenu:this.$store.state.taoBaoFooterMenu,
				tuijian: [{
						id: "0",
						name: " 今日推荐",
						banner_path: require('../../assets/img/mms_today_banner.png'),
						icon: "&#xe65f;"
					},
					{
						id: "1",
						name: "\u5973\u795e\u306e\u5e97",
						banner_path: "http://cmspic.judacdn.com/tkjidi/images/mms/bg_2x/nvshen@2x.png",
						icon: ''
					},
					{
						id: "8",
						name: "\u5403\u5403\u5403",
						banner_path: "http://cmspic.judacdn.com/tkjidi/images/mms/bg_2x/chichichi@2x.png",
						icon: ''
					},
					{
						id: "10",
						name: "\u718a\u5b69\u5b50",
						banner_path: "http://cmspic.judacdn.com/tkjidi/images/mms/bg_2x/xionghaizi@2x.png",
						icon: ''
					},
					{
						id: "11",
						name: "\u7537\u4eba\u5e2e",
						banner_path: "http://cmspic.judacdn.com/tkjidi/images/mms/bg_2x/nanrenbang@2x.png",
						icon: ''
					}
				],
				type: null,
				id: this.$route.params.id,
				mmsClassPro: null,
				mmsList: null,
				search: null,
				index1: null // 当前页
			};
		},
		created() {
			if(this.$route.params.type == 'author' || this.$route.params.type == 'keyword') {
				this.type = this.$route.params.type
			} else {
				this.type = 'category'
				if(this.$route.params.id == 1) {
					this.index1 = 1
				} else if(this.$route.params.id == 8) {
					this.index1 = 2
				} else if(this.$route.params.id == 10) {
					this.index1 = 3
				} else if(this.$route.params.id == 11) {
					this.index1 = 4
				} else if(this.$route.params.id == 11) {
					this.index1 = 0
				} else if(this.$route.params.id == 0) {
					this.index1 = 0
				} else {
					this.id = 0
					this.index1 = 0
				}
				this.showtype(this.id, this.index1, true) // true 是给刚打开页面的时候使用,避免值一样无法调用
			}

		},
		mounted() {
			if(!this.picScroll) {
				this.picScroll = new Bscroll(this.$refs.picWrapper, {
					scrollX: true,
					eventPassthrough: 'vertical'
				})
			} else {
				this.picScroll.refresh();
			}
			window.addEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				console.log(scrollTop)
			},
			destroyed() {
				window.removeEventListener('scroll', this.handleScroll)
			},
			ComeBreak() {
				this.$router.replace('/taobao')
				// this.$router.go(-1)
			},
			Search() {
				console.log(this.search)
				if(this.search != null || this.search != '') {
					this.$router.replace('/author/' + this.search)
				}
			},

			showtype(id, index, state) {
				if(this.index1 != index || state) { // state 是给刚打开页面的时候使用,避免值一样无法调用
					this.index1 = index
					this.$router.replace('/mms/category/' + id)
					this.axios.get('/api/mmsClassPro', {
						params: {
							id: id,
						},
					}).then(res => {
						if(res.result == null) {
							this.mmsClassPro = JSON.parse(res.data.text).data.product
						}
					})
					this.axios.get('/api/mmsList', {
						params: {
							id: id,
						},
					}).then(res => {
						if(res.result == null) {
							this.mmsList = JSON.parse(res.data.text).data
							console.log(JSON.parse(res.data.text).data)
						}
					})
				}
			}
			//			showtype1(id,index){  // 类名为pic-item 的,替换为该方法时点击后刷新 
			//				this.$router.replace('/mms/category/'+id)
			//				this.$router.go(0)
			//			}
		},
		components: {
			FooterMenu
		}
	}
</script>

<style lang="scss">
	.mms {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100vw;
		background: rgb(245, 245, 245);
		width: 100%;
		height: 100%;
		z-index: 9999;
		overflow-y: scroll;
		overflow: auto;
		.top-bg {
			width: 100%;
			height: 300px;
			background-size: 100%;
			position: relative;
			.topBreak {
				width: 100vw;
				height: 40px;
				line-height: 40px;
				font-size: 18px;
				padding: 3px 0;
				position: fixed;
				z-index: 10;
				i {
					color: #fff;
					float: left;
					padding-bottom: 5px;
					padding-left: 10px;
				}
				.search {
					width: 78%;
					height: 100%;
					display: inline-block;
					padding-left: 3%;
					position: relative;
					input {
						height: 30px;
						border-radius: 15px;
						border: 0px;
						width: 100%;
						padding-left: 10px;
						font-size: 14px;
						background: rgba(255, 255, 255, 0.6);
						outline: navajowhite;
					}
					input::-webkit-input-placeholder {
						color: #fff;
					}
					input::-moz-placeholder {
						color: #fff;
					}
					input:-moz-placeholder {
						color: #fff;
					}
					input:-ms-input-placeholder {
						color: #fff;
					}
					i {
						display: inline-block;
						line-height: 30px;
						position: absolute;
						right: 0;
						top: 9px;
						font-weight: bold;
						font-size: 18px;
					}
				}
			}
			.pic-wrapper {
				width: 100vw;
				overflow: hidden;
				height: 30px;
				padding-top: 40px;
				.pic-list {
					font-size: 0;
					white-space: nowrap;
					height: 30px;
					.pic-item {
						float: left;
						display: inline-block;
						width: 25vw;
						height: 30px;
						line-height: 30px;
						div {
							text-align: center;
							font-size: 12px;
							color: #fff;
							width: 100%;
							height: 100%;
							font-family: '微软雅黑';
						}
					}
					.pic-item:first-child {
						div {
							margin-left: 6px;
							text-align: left;
						}
					}
				}
			}
			.swiper-wrapper {
				width: 100vw;
				overflow: hidden;
				.swiper-slide {
					display: inline-block;
					border-radius: 8px;
					background: #fff;
					overflow: hidden;
					padding: 10px;
					margin: 168px 5% 0 5% !important;
					img {
						width: 35%;
						float: left;
					}
					.right {
						float: left;
						width: 62%;
						padding-left: 3%;
						height: 100%;
						.right-name {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							font-size: 12px;
						}
						.fl {
							.quan {
								background: url(../../assets/img/bgq.png) no-repeat;
								background-size: 95% 100%;
								padding: 3px 10px 3px 5px;
								color: #ff4e36;
								margin: 10px 0 5px 0;
								display: inline-block;
								float: left;
								font-size: 12px;
								.quan-text {
									border-right: 1px #ff4e36 dashed;
									padding-right: 5px;
									margin: 0 5px;
								}
							}
							.buy {
								width: 100%;
								height: 30px;
								position: relative;
								.quan-num {
									position: absolute;
									left: 0;
									bottom: 0;
									color: #999;
									display: inline-block;
									vertical-align: bottom;
									.yang {
										font-size: 12px;
										color: #444;
									}
									.num {
										font-size: 18px;
										color: #444;
										font-weight: bold;
										margin-right: 5px;
									}
								}
								.lijiqiang {
									position: absolute;
									right: 0;
									bottom: 0;
									vertical-align: bottom;
									background: #ff4e36;
									padding: 10px;
									display: inline-block;
									color: #fff;
									float: right;
									border-radius: 30px;
									font-size: 12px;
									// margin: 20px 0 0 0;
								}
							}
						}
					}
				}
			}
			.index-content {
				margin: 15px 0 0 0;
				background: #fff;
				width: 100vw;
				.goods_list {
					width: 100vw;
					li {
						width: 95vw;
						padding: 2.5vw;
						padding-bottom: 0;
						border-bottom: 10px solid rgb(245, 245, 245);
						.head-group {
							a {
								img {
									width: 35px;
									height: 35px;
									float: left;
									margin: 0 5px 0 0;
									border-radius: 50%;
								}
								.head-left {
									float: left;
									width: 80%;
									.name {
										float: left;
										font-size: 13px;
										color: #444;
									}
									.fenlei {
										float: left;
										font-size: 12px;
										color: #ff4e36;
										margin: 1px 0 0 5px;
									}
								}
							}
						}
						a {
							.video-group {
								width: 100%;
								position: relative;
								text-align: center;
								max-height: 220px;
								overflow: hidden;
								// margin: 10px 0;
								img {
									margin: 10px 0;
									width: 100%;
									-moz-border-radius: 10px;
									-ms-border-radius: 10px;
									-o-border-radius: 10px;
									border-radius: 10px;
									overflow: hidden;
								}
							}
							.index-title {
								display: block;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								font-size: 14px;
								color: #444;
								margin: 5px 0;
							}
							.text-jianjie {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								font-size: 12px !important;
								color: #999;
								height: 38px;
								overflow: hidden;
								& span {
									font-size: 12px !important;
								}
							}
						}
						.liulan-dianzan {
							float: right;
							margin: 10px 0;
							span {
								float: left;
								font-size: 12px;
								color: #999;
								margin-right: 10px;
							}
							.dianzan {
								padding-left: 3px;
								background-size: 16px;
							}
						}
					}
				}
			}
		}
	}
</style>