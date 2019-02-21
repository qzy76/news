<template>
	<div class="shop">
		<i @click='ComeBreak();clearVideoUrl();' class="icon iconfont icon_poa comeback">&#xec73;</i>
		<div class="operation">
			<i @click='ComeHome();clearVideoUrl();' class="icon iconfont icon_poa home">&#xe61e;</i>
			<i @click='Find_quan' class="icon iconfont icon_poa camera">&#xe61c;</i>
			<i @click='Search' class="icon iconfont icon_poa search">&#xe62b;</i>
		</div>
		<div class="product">
			<div class="img" v-show="pic1!=null">
				<div class="video" v-if="video!=null" style="">
					<video controls="controls" :poster="pic1">
						<source :src="video" type="video/mp4">
					</video>
				</div>
				<div v-else><img :src="pic1"></div>
				<!--<div v-for="(item1,index) in pic" :key="index"><img :src="item1"></div>-->
			</div>
		</div>
		<div class="goods-bottom-group">
			<div class="goods-title" v-show="name!=null">
				<svg v-if="tmall=='1'" class="icon svg-icon" aria-hidden="true">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tianmao"></use>
				</svg>
				<svg v-else class="icon svg-icon" aria-hidden="true">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-taobao"></use>
				</svg>
				<div class="goods-title-text">{{name}} </div>
			</div>
			<div class="goods-price">
				<div class="goods-bottom-left">
					<div class="money" v-show="after_coupons!=null">￥ {{after_coupons}}<span>券后</span></div>
					<div class="voucher" v-show="price_coupons!=null"> 券 {{price_coupons}}
						<div class="left"></div>
						<div class="right"></div>
					</div>
				</div>
				<div class="goods-bottom-right" v-show="volume!=null">
					<i class="icon iconfont">&#xe612;</i>
					<div class="volume">销量<span>{{volume}}</span></div>
				</div>
			</div>
		</div>
		<div class="recommend" v-show="content!=null">
			<div class="recommend_top">推荐</div>
			<span class="twoLines">{{content}}</span>
		</div>
		<div class="details" v-show="name!=null">
			<div class="detail_image_title" @click='pro_details'>
				<span>宝贝图文详情</span>
				<i v-if="details_show" class="icon iconfont">&#xe60f;</i>
				<i v-else class="icon iconfont">&#xec74;</i>
			</div>
			<div class="detailsall" v-show="details_show" v-html="details"></div>
		</div>
		<div class="T-shadow" v-if="shareImg!=null||Code!=null||ShareTitle">
			<div class="share-box" :class="{'active':Code!=null||ShareTitle==true,'active1':ShareTitle==true}">
				<div class="share" v-show="shareImg!=null">
					<img class="share-box-img" :src="shareImg" alt="加载失败" />
					<div @click="Find_quan"><i class="icon iconfont">&#xe73d;</i></div>
				</div>
				<div class="alertCode" v-show="Code!=null&&!ShareTitle">
					<i class="icon iconfont" @click="alertCode">&#xe60e;</i>
					<div class="alertCode-title">淘口令购买</div>
					<div class="alertCode-code">{{Code}}</div>
					<a class="copy-code" v-if="copyCode=='1'" :data-clipboard-text="Code" ref="copy1">一键复制</a>
					<a class="copy-code" v-else-if="copyCode=='2'" :class="copyCode=='2'?'success':null">已复制</a>
					<a class="copy-code" v-else="copyCode=='3'" :class="copyCode=='3'?'error':null">复制失败</a>
					<p class="erro-copy-worning">(若一键复制失败，请长按文字手动复制)</p>
					<img class="erro-copy-img" :src="require('../../assets/img/5.png')" alt="图片加载失败">
					<div class="alertCode-using">
						<span class="alertCode-using-worning">使用说明:</span>
						<span>复制掏口令后打开[手机淘宝]即可领取优惠券购买!</span>
					</div>
					<div class="alertCode-using">
						<span class="alertCode-using-worning">温馨提示:</span>
						<span>手机无[手机淘宝]者，可以选浏览器购买方式哦~</span>
					</div>
				</div>
				<div class="alertShare" v-show="ShareTitle">
					<i class="icon iconfont" @click="alertShare">&#xe60e;</i>
					<div class="alertShare-title">复制分享文案</div>
					<textarea class="alertShare-code" v-if="content!=null">
【商品名称】 {{name}}

【券前】 {{price}}元 
【券后】{{after_coupons}}元 
【复制此信息打开手机掏宝即可查看并下单】{{Code}}
【必买理由】{{content}}
					</textarea>
					<textarea class="alertShare-code" v-else>
【商品名称】 {{name}}

【券前】 {{price}}元 
【券后】{{after_coupons}}元 
【复制此信息打开手机掏宝即可查看并下单】{{Code}}
					</textarea>
					<a class="share-code error" v-if="Code==null">加载中</a>
					<a class="share-code" v-if="copyCode=='1'&&Code!=null" data-clipboard-action="copy" ref="copy2" data-clipboard-target=".alertShare-code">一键复制</a>
					<a class="share-code" v-if="copyCode=='2'&&Code!=null" :class="copyCode=='2'?'success':null">已复制</a>
					<a class="share-code" v-if="copyCode=='3'&&Code!=null" :class="copyCode=='3'?'error':null">复制失败</a>
					<p class="erro-copy-worning">(长按文字区域手动复制掏口令)</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-share" @click="alertShare">
				<i class="icon iconfont">&#xe6fc;</i>
				<span>分享</span>
			</div>
			<div class="footer-code" @click="alertCode">口令购买</div>
			<div class="footer-link">
				<a :href="quan_link">立即领券</a>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Shop',
		data() {
			return {
				id: this.$route.params.id,
				pic1: null, // 第一张图
				pic: [], // 后面的图
				da: null,
				name: null, // 商品名称
				price: null, // 原价
				da1: null,
				details: null, // 商品详情的图片
				details_show: false,
				content: null, // 推荐词
				after_coupons: null, //券后价
				price_coupons: null, // 券额
				volume: null, // 销量
				tmall: null, // 是否为天猫商品
				shareImg: null, // 券图
				Code: null, // 淘宝口令
				copyCode: '1', // 1 未复制淘口令 2 复制成功 3 复制失败
				url: null, // 商品链接
				quan_link: null, // 券链接
				ShareTitle: false, // 券文本显示
				video: this.$store.state.videoToShop // 视频链接
			};
		},
		mounted() {
			let date = new Date();
			let y = date.getFullYear();
			let M = date.getMonth() + 1;
			M = M < 10 ? ('0' + M) : M;
			let d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			let h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			let m = date.getMinutes();
			m = m < 10 ? ('0' + m) : m;
			let s = date.getSeconds();
			s = s < 10 ? ('0' + s) : s;
			let timestamp = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s; // 时间
			let v = '2.0';
			let app_key = '25526389';
			let method = 'taobao.tbk.item.info.get';
			let sign_method = 'md5';
			let partner_id = 'top-apitools';
			let format = 'json';
			let simplify = 'true';
			let str = '3cf4595bcaea274ecb541a36844a4ad7' + 'app_key' + app_key + 'force_sensitive_param_fuzzytrue' + 'formatjson' + 'methodtaobao.tbk.item.info.get' + 'num_iids' + this.id + 'partner_idtop-apitools' + 'sign_methodmd5' + 'simplifytrue' + 'timestamp' + timestamp + 'v2.0' + '3cf4595bcaea274ecb541a36844a4ad7';
			let sign = this.$md5(str).toUpperCase(); // .toUpperCase()转大写
			//console.log('http://gw.api.taobao.com/router/rest?sign=' + sign + '&timestamp=' + timestamp + '&v=2.0&app_key=25526389&method=taobao.tbk.item.info.get&sign_method=md5&partner_id=top-apitools&format=json&simplify=true&num_iids=' + this.id + '&force_sensitive_param_fuzzy=true')
			this.axios.get('/api/getGoodInfo', {
				params: {
					id: this.id,
					timestamp: timestamp,
					sign: sign
				},
			}).then(response => {
				this.da = JSON.parse(response.data.text).results
				this.pic1 = JSON.parse(response.data.text).results[0].pict_url
				this.pic = JSON.parse(response.data.text).results[0].small_images
				this.volume = JSON.parse(response.data.text).results[0].volume
				this.name = JSON.parse(response.data.text).results[0].title // 商品名称
				this.price = JSON.parse(response.data.text).results[0].zk_final_price //价格
				this.getquan(this)
				//将图片提取出来
				console.log(JSON.parse(response.data.text).results)
			}, function(response) {})
			//			console.log(this.$refs.copy1,174)
			console.log(this.video)
		},
		watch: {
			Code(val) {
				if(val != null && this.ShareTitle == false) {
					
					this.$nextTick(() => {
						let clipboard = new ClipboardJS(this.$refs.copy1);
						clipboard.on('success', () => {
							this.copyCode = '2'
							console.log(this.copyCode)
						});
						clipboard.on('error', () => {
							this.copyCode = '3'
							console.log(this.copyCode)
						});
					})
				}
			},
			ShareTitle(val) {
				if(val && this.copyCode == '1') {
					// console.log('进来了')
					this.$nextTick(() => {
						let clipboard1 = new ClipboardJS(this.$refs.copy2);
						clipboard1.on('success', () => {
							this.copyCode = '2'
							console.log(this.copyCode)
						});
						clipboard1.on('error', () => {
							this.copyCode = '3'
							console.log(this.copyCode)
						});
					})

				}
			}
		},
		methods: {
			clearVideoUrl() {
				this.$store.commit('clearVideoUrl')
			},
			ComeBreak() {
				this.$router.go(-1)
			},
			ComeHome() {
				this.$router.replace('/taobao')
			},
			getquan(that) {
				that.axios.get('/api/getGoodInfo3', {
					params: {
						id: this.id,
					},
				}).then(response => {
					console.log(JSON.parse(response.data.text).data)
					this.tmall = JSON.parse(response.data.text).data.tmall
					this.da1 = JSON.parse(response.data.text).data
					this.content = JSON.parse(response.data.text).data.quan_guid_content
					this.after_coupons = JSON.parse(response.data.text).data.price_after_coupons
					this.price_coupons = parseFloat(JSON.parse(response.data.text).data.price_coupons)
					this.url = JSON.parse(response.data.text).data.goods_url
					this.quan_link = JSON.parse(response.data.text).data.quan_link
					//					console.log(JSON.parse(response.data.text).data.quan_link)
				}, function(err) {
					console.log(err)
				})

			},
			pro_details() {
				if(this.details == null) {
					let date = new Date().getTime();
					//console.log('{"id":"'+this.id+ '","type":"1","f":"TB1yD3FcZfpK1RjSZFO8qu6nFlae"}')
					this.axios.get('/api/getGoodInfo2', {
						params: {
							data: '{"id":"' + this.id + '","type":"1"}',
							time: date,
						},
					}).then(response => {
						this.details = JSON.parse(response.data.text).data.pcDescContent
						this.details_show = true
						console.log(JSON.parse(response.data.text).data.pcDescContent)
					}, function(err) {
						console.log(err)
					})
				} else {
					this.details_show = !this.details_show
				}
			},
			Find_quan() {
				if(this.shareImg == null) {
					let price_quanhou = parseFloat(this.after_coupons)
					//console.log('http://newapi.tkjidi.com/api/tkcms/procamera?id=' + this.id + '&thumb=' + this.pic1 + '&buss_name=' + this.name + '&price_quanhou=' + price_quanhou + '&price_shoujia=' + price + '&yhq_price=' + this.price_coupons + '&sales=' + this.volume + '&tmall=' + this.tmall + '&qrcode_url=http://www.zhongyigo.xyz/?g=wap&r=v&id=14604015')
					this.shareImg = 'http://newapi.tkjidi.com/api/tkcms/procamera?id=' + this.id + '&thumb=' + this.pic1 + '&buss_name=' + this.name + '&price_quanhou=' + price_quanhou + '&price_shoujia=' + this.price + '&yhq_price=' + this.price_coupons + '&sales=' + this.volume + '&tmall=' + this.tmall + '&qrcode_url=http%3a%2f%2fqzy.design%2findex.php%3fr%3dv%26id%3d' + this.da1.id
					console.log(this.shareImg)
				} else {
					this.shareImg = null
				}
			},
			alertShare() {
				this.ShareTitle = !this.ShareTitle
				this.alertCode()
			},
			alertCode() {
				if(this.Code == null) {
					this.axios.get('/api/getGoodCode', {
						params: {
							link: this.url
						},
					}).then(response => {
						if(response.data.text == '生成失败，只有参与了淘宝联盟的商品才能生成淘口令') {
							this.Code = '获取失败,请点击立即领券购买'
						} else {
							this.Code = response.data.text
						}
						console.log(response.data.text)
					})
				} else {
					this.copyCode = '1'
					this.Code = null
				}
			},
			Search() {
				this.$router.replace('/searchList/' + this.name)
			}
		}
	}
</script>
<style lang="scss">
	.shop {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		background: #f5f5f5;
		overflow-y: scroll;
		overflow: auto;
		div {
			background: #fff;
		}
		i.icon_poa {
			display: block;
			width: 12vw;
			height: 12vw;
			border-radius: 50%;
			background: rgba(10, 10, 10, 0.5);
			font-weight: 300;
			text-align: center;
			line-height: 12vw;
			font-size: 7vw;
			color: #fff;
		}
		i.comeback, .operation {
			position: fixed;
			top: 3vh;
			left: 4vw;
			z-index: 9999;
		}
		.operation {
			left: auto;
			right: 4vw;
			background: transparent;
			i {
				margin-bottom: 10px;
			}
		}
		.product {
			position: absolute;
			z-index: 1;
			width: 100vw;
			height: 100vw;
			left: 0;
			top: 0;
			.img {
				width: 100vw;
				height: 100vw;
				.video {
					width: 100vw;
					height: 100vw;
					background: #000;
					position: relative;
					video::-webkit-media-controls {
						position: absolute !important;
						top: 13px !important;
						left: 0 !important;
					}
					video {
						width: 100vw;
						max-height: 100vw;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
						object-fit: fill;
					}
				}
				div {
					img {
						width: 100vw;
					}
				}
			}
		}
		.goods-bottom-group {
			width: 93.3vw;
			height: 70px;
			padding: 0.12vh 3.4vw;
			margin-top: 100vw;
			.goods-title {
				svg {
					width: 16px;
					height: 16px;
					float: left;
					margin: 4.5px 1vw 4.5px 0;
				}
				.goods-title-text {
					line-height: 25px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			.goods-price {
				width: 100%;
				height: 38px;
				line-height: 38px;
				margin: 0 auto;
				.goods-bottom-left {
					float: left;
					width: auto;
					height: 100%;
					.money {
						font-size: 16px;
						color: #fd385d;
						font-weight: 900;
						margin-right: 2px;
						float: left;
					}
					.voucher {
						float: left;
						width: 50px;
						padding: 4px 0;
						margin: 9px 0 9px 5px;
						border-radius: 2px;
						background: #fd385d;
						color: #fff;
						position: relative;
						text-align: center;
						font-size: 12px;
						line-height: 100%;
						div {
							width: 5px;
							height: 5px;
							border-radius: 50%;
							position: absolute;
							top: 8px;
							left: -2.5px;
							background: #fff;
						}
						.right {
							left: auto;
							right: -2px;
						}
					}
				}
				.goods-bottom-right {
					float: right;
					i, .volume {
						display: inline-block;
					}
					i {
						color: #e52e2d;
					}
					.volume span {
						color: #999;
						font-size: 14px;
						padding-left: 5px;
					}
				}
			}
		}
		.recommend {
			margin-top: 5px;
			padding: 10px;
			position: relative;
			line-height: 22px;
			.recommend_top {
				position: absolute;
				top: 10px;
				left: 10px;
				font-size: 14px;
				padding: 0 3px;
				text-align: center;
				/*line-height: 0.34rem;*/
				color: #ff6800;
				border: 1px solid #ff6800;
				border-radius: 2px;
				margin-right: 5px;
			}
			span {
				font-size: 12px;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				text-indent: 40px;
				color: #999;
			}
		}
		.details {
			margin-top: 5px;
			.detail_image_title {
				width: 100%;
				text-align: center;
				margin-bottom: 5px;
				height: 50px;
				line-height: 50px;
				span {
					font-size: 14px;
					font-weight: bold;
					color: #333;
				}
			}
			img {
				width: 94vw;
				margin: 0 3vw;
			}
		}
		.T-shadow {
			width: 100vw;
			height: 100vh;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 9999!important;
			background: rgba(0, 0, 0, 0.4);
			overflow: hidden;
			.share-box {
				width: 80vw;
				height: 65vh;
				background: #fff;
				/*display: none;*/
				position: absolute;
				left: 50%;
				margin-left: -40vw;
				top: 50%;
				margin-top: -34vh;
				.share {
					img {
						width: 100%;
					}
					div {
						width: 36px;
						height: 36px;
						position: absolute;
						right: -18px;
						top: -18px;
						border-radius: 50%;
						background: #fff;
						i {
							width: 36px;
							height: 36px;
							display: inline-block;
							position: absolute;
							right: 0px;
							top: -9px;
							font-size: 36px;
							color: #cecece;
						}
					}
				}
			}
			.share-box.active {
				border-radius: 6px;
				overflow: hidden;
				height: 65vh;
				width: 75vw;
				margin-top: -33vh;
				margin-left: -35vw;
				font-size: 18px;
				text-align: center;
				.alertCode, .alertShare {
					i {
						font-size: 25px;
						width: 25px;
						height: 25px;
						position: absolute;
						right: 5px;
						top: 5px;
						color: #d2d2d2;
					}
					.alertCode-title, .alertShare-title {
						width: 100%;
						height: 60px;
						line-height: 60px;
						font-weight: bold;
					}
					.alertCode-code {
						width: 70%;
						height: 50px;
						line-height: 50px;
						overflow: hidden;
						margin: 0 auto;
						border: 1.5px dashed #FF4E65;
						border-top: 0px;
						border-radius: 5px;
						color: #666;
					}
					.copy-code, .share-code {
						display: inline-block;
						color: #fff;
						width: 40%;
						height: 40px;
						line-height: 40px;
						margin-top: 10px;
						border-radius: 5px;
						background: #FF4E65;
					}
					.copy-code.success, .share-code.success {
						background: #ff954e;
					}
					.copy-code.error, .share-code.error {
						background: #ccc;
					}
					.erro-copy-worning {
						display: block;
						height: 50px;
						line-height: 50px;
						font-size: 12px;
						text-align: center;
						color: #999;
					}
					.erro-copy-img {
						width: 60vw;
					}
					.alertCode-using {
						width: 60vw;
						margin: 5px 5vw;
						text-align: justify;
						span {
							font-size: 10px;
						}
						.alertCode-using-worning {
							color: #FF4E65;
						}
					}
				}
			}
			.share-box.active1 {
				height: 72vh;
				width: 90vw;
				margin-top: -36vh;
				margin-left: -45vw;
				.alertShare {
					.alertShare-code {
						width: calc(85% - 10px);
						height: calc(38vh - 10px);
						padding: 5px;
						font-size: 16px;
						padding: 3px;
						background: #eee;
						color: #666;
						outline: none;
						border: 0px;
					}
				}
			}
		}
		.footer {
			width: 100vw;
			height: 48px;
			line-height: 48px;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			font-size: 16px;
			div {
				display: inline-block;
				float: left;
				text-align: center;
				width: calc(100vw / 3);
			}
			.footer-share {
				i {
					color: #e96e89;
				}
				span {
					padding-left: 5px;
				}
			}
			.footer-code {
				background: #e96e89;
				color: #fff;
			}
			.footer-link {
				background: #e53258;
				a {
					color: #fff;
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>