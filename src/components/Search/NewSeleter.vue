<template>
	<div class="count" ref="wrapper">
		<loading v-if="isLoading&&world==null"></loading>
		<div v-else class="newTitle">
			<div ref="newslable" v-show="newsLable&news">
				<ul class="title" v-model="world">
					<li v-for="(item,index) in search" :key="index">
						<a class="press" @click="look(item.id)">
							<h3 :class="{onlyOne:Object.keys(item.imageurls).length == 1}">{{item.title}}</h3><!-- Object.keys(数组).length 获取长度 -->
							<span class="imgs" v-show="item.havePic" :class="{onlyOneSpan:Object.keys(item.imageurls).length ==1}">
								<img :src="item1.url" v-for="(item1,i) in item.imageurls.slice(0,3)" :key="i">
							</span>
							<div :class="{onlyOneDiv:Object.keys(item.imageurls).length == 1 }"><span>{{item.source}}</span><span>{{item.pubDate}}</span></div>
						</a>
					</li>
				</ul>
			</div>
			
			<div ref="newtitle" v-show="!news" class="allnews" v-for="(item,index) in details" :key="index">
				<div class="break">
					<a @click='shuaxin()' id="href"><i class="icon iconfont break">&#xec73;</i>返回</a>
					<span><a target="_blank" :href="item.link">点我查看本文原著</a></span>
					<select v-model="to" @change="lang1">
						<option v-for="(item,index) in lang" :key="index" :value="item.lang">{{item.name}}</option>
					</select>
				</div>
				<div>
					<h3>{{item.title}}</h3>
					<span>{{item.pubDate}} &nbsp; {{item.source}}</span>
					<div class="html" v-html="html"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	import Loading from '../../public/Loading'
	import  Vue  from  'vue' 
	import VueJsonp from 'vue-jsonp'
	Vue.use(VueJsonp)
	export default {
		name: 'NewSeleter',
		props: {
			world: {
				type: String,
				require: true
			},
			newsLable: {
				require: true
			}
		},
		data() {
			return {
				isLoading: true, // 是否在加载中
				details: '', // 新闻详情
				id: null, // 新闻id
				search: null, // 新闻列表内容
				news: true ,// 显示新闻列表/新闻详情
				href:null,
				oldlang:'zh',  // 当前语言
				form:'zh',  // 翻译文本的当前语言
				to:'',//目标语言
				lang :  this.$store.state.lang,
				html:null ,// 新闻内容
				appid:'20190105000254745',
				keycode:'9s_UH6qxJ042fJIRV_my'
			}
		},
		components: {
			Loading
		},
		mounted() { // 设置wrapper的高度
			this.$refs.wrapper.style.height = document.getElementById("app").offsetHeight - document.getElementsByClassName(
				"count").offsetTop + "px";
			this.$refs.newslable.style.height = window.getComputedStyle(this.$refs.newslable).height;
			eventPassthrough: 'vertical';
			if (this.world != "") {
				this.$http({
					url: 'http://route.showapi.com/109-35?showapi_appid=84546&showapi_sign=83c384f0fcf849fcba1f25e114c7e523&title=' +
						this.world,
					method: 'GET',
				}).then(response => { // 用箭头函数才能生效
					this.search = response.data.showapi_res_body.pagebean.contentlist;
					console.log(this.search);
					this.isLoading = false;
				}, function(response) {})
			}
		},
		created(){
			this.to = this.lang[0].lang; // 设置默认选对个，不设置的话不显示
		},
		methods: {
			look(id) {
				let that = this;
				that.$http({
					url: 'http://route.showapi.com/109-35?showapi_appid=84546&showapi_sign=83c384f0fcf849fcba1f25e114c7e523&needHtml=1&id='+id,
					method: 'GET',
				}).then(response => {
					this.details = response.data.showapi_res_body.pagebean.contentlist;
					this.html = this.details[0].html;
					// this.$options.methods.en(this.details[0].html,that); /// 调用en()方法
					this.news = false
				}, function(response) {})
			},
			lang1(){ // 百度翻译
			if(this.to=="zh"){
				this.html = this.details[0].html;
				return false;
			}
				let that=this;
				let salt = (new Date).getTime();
				let html = this.details[0].html;
				let str1 = this.appid+html+salt + this.keycode;
				let sign = this.$md5(str1);
				// console.log('http://api.fanyi.baidu.com/api/trans/vip/translate?q='+html+'&appid='+this.appid+'&from='+this.oldlang+'&to='+this.to+'&salt='+salt+'&sign='+sign);
				// console.log('http://api.fanyi.baidu.com/api/trans/vip/translate?q='+this.details[0].html+'&appid='+this.appid+'&from='+this.oldlang+'&to='+this.to+'&salt='+salt+'&sign='+sign);
				this.$jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate',{
					q:html,
					appid:this.appid,
					from:'zh',
					to:'en',
// 					from:this.oldlang,
// 					to:this.to,
					salt:salt,
					sign:sign
				}).then(function(data){
					let da = data.trans_result[0].dst;
					// let dat = decodeURI(decodeURI(da))
					that.html = da;
					this.from=this.to;
				}).catch(function(err){
					console.log(err);
				});
			},
			lang2(){ // 有道翻译
				let that=this;
				let from1 = this.oldlang; // 当前语言
				let to = this.form; // 目标语言
				console.log(that.form)
				if(this.form == 'zh-CHS'){
					this.html = this.details[0].html;
					that.oldlang = that.form;
					return false;
				}
				let appKey = '675f38e818591296';
				let key = 'F1rNq1jkw6gNWNEPRHResxDoBCU3gQpB';
				let salt = (new Date).getTime();
				let query = this.html;
				let str1 = appKey + query + salt +key;
				let sign = this.$md5(str1);
				this.$jsonp('http://openapi.youdao.com/api',{
					q:query,
					appKey:appKey,
					salt:salt,
					from:from1,
					to:to,
					sign:sign
				}).then(function(data){
					that.html = data.translation[0];
					that.oldlang = that.to
                 }).catch(function(){
                     console.log("服务器异常");
             });
			},
			shuaxin(){
				this.news = true;
				this.to = this.lang[0].lang; // 返回时把当前语言改为中文
			}
	},
	watch: {
		data(world) {
			this.$http({
				url: 'http://route.showapi.com/109-35?showapi_appid=84546&showapi_sign=83c384f0fcf849fcba1f25e114c7e523&title=' +
					this.world,
				method: 'GET',
			}).then(response => { // 用箭头函数才能生效
				this.search = response.data.showapi_res_body.pagebean.contentlist;
				console.log(this.search);
				this.isLoading = false;
			}, function(response) {

			})
		}
	}
	}
</script>

<style lang="scss"> //加上 scoped 引入html样式失效
	@import "../../assets/sass/mixin";
	.count {
		display: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;

		.newTitle {
			.title {
				clear: both;
				width: 90%;
				@include new-height(153*20px);
				padding: 0 5%;
				overflow-x: hidden;
				overflow-y: scroll;

				& li {
					margin: 10px 0;
					height: auto;

					& a.press {
						width: 100%;
						height: 100%;
						display: block;
						clear: both;

						& h3 {
							font-size: 17px;
							color: #000;
							font-weight: 400;
							margin-bottom: 2px;
						}

						& h3.onlyOne {
							width: 70%;
							float: left;
						}

						.imgs {
							display: block;
							width: 100%;
							clear: both;
							height: 75px;

							img {
								width: 1/3*98%;
								height: 100%;
								float: left;
								margin-right: 3px;
							}

							img:last-child {
								margin-right: 0;
							}
						}

						.imgs.onlyOneSpan {
							width: 30%;
							display: inline-block;

							img {
								width: 100%;
								margin-right: 2px;
							}
						}

						& div {
							padding-top: 10px;
							color: #999;
							clear: both;

							& span:last-child {
								padding-left: 5px;
							}
						}

						& div.onlyOneDiv {
							float: left;
							display: inline-block;
							padding-top: 0;
							margin-top: -10px;
							margin-bottom: 10px;
						}
					}
				}

				& li:first-child {
					margin-top: 15px;
				}
			}
			.break{
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 2px;
				background: #fff;
				font-size: 16px;
				position: relative;
				span{
					position: absolute;
					right: 15px;
					top: 0;
					a{
						color: #333;
					}
				}
			}
			.allnews {
				padding: 10px;
				width: auto;
				height: 2100px;
				overflow-x: hidden;
				overflow-y: scroll;

				h3 {
					font-size: 20px;
					padding-bottom: 5px;
				}

				.html {
					width: 100%;
					height: 100%;
					padding-top: 10px;

					p:first-child {
						padding-top: 0;
					}

					p {
						text-align: justify;
						text-indent: 2em;
						font-size: 14px;
						letter-spacing: 1.2px;
						padding: 5px 0;
					}

					img {
						margin-left: -2em;
						max-width: 100%;
					}
				}
			}
		}
	}
</style>