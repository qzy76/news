<template>
	<div>
			<news-header/>
		</keep-alive>
		<keep-alive exclude="Detail">
			<news-type ref="headerChild" v-on:type="type"></news-type>
		</keep-alive>
		<div class="count" ref="wrapper">
			<loading v-if="isLoading"></loading>
			<div v-else v-show="lable">
				<ul class="title" ref="content">
					<li v-for="(item,index) in da" :key="index">
						<a class="press" @click="look(index,item.url,item.title,item.date,item.author_name)">
							<h3 :class="{onlyOne :item.thumbnail_pic_s02==null }"><a class="a">{{item.title}}</a></h3>
							<span class="imgs" :class="{onlyOneSpan:item.thumbnail_pic_s02==null }">
								<img :src="item.thumbnail_pic_s" v-show="item.thumbnail_pic_s">
								<img :src="item.thumbnail_pic_s02" v-show="item.thumbnail_pic_s02">
								<img :src="item.thumbnail_pic_s03" v-show="item.thumbnail_pic_s03">
							</span>
							<div :class="{onlyOneDiv:item.thumbnail_pic_s02==null }"><span>{{item.author_name}}</span><span>{{item.date}}</span></div>
						</a>
					</li>
				</ul>
			</div>
			<div class="break" v-show="lable==false">
				<a @click='shuaxin()' id="href"><i class="icon iconfont break">&#xec73;</i>返回</a>
				<span><a target="_blank" :href="this.href">点我查看本文原著</a></span>
				<select v-model="to" @change="lang1">
					<option v-for="(item,index) in lang" :key="index" :value="item.lang">{{item.name}}</option>
				</select>
			</div>
			<div ref="newtitle" v-show="lable==false" class="allnews">
				<div>
					<h3>{{this.title}}</h3>
					<span>{{this.date}} &nbsp; {{this.author}}</span>
					<div class="html" v-html="html"></div>
				</div>
			</div>
		</div>
		<router-view/>
	</div>
</template>
<script>
	import NewsHeader from './NewsHeader'
	import NewsType from './NewsType'
	import Bscroll from 'better-scroll'
	import Loading from '../../public/Loading'
	export default {
		name: 'NewsLable',
		data() {
			return {
				da: null,
				isLoading: true,
				lable:true,
				href:null, // 网址
				title:null, // 文章标题
				date:null, // 时间
				author:null ,// 作者
				html:null ,// 新闻内容
				lang : this.$store.state.lang, // 语言
				appid:'20190105000254745',
				keycode:'9s_UH6qxJ042fJIRV_my',
				type1:null
			}
		},
		components: {
			NewsHeader,
			NewsType,
			Loading
		},
		created() {
			this.to = this.lang[0].lang; // 设置默认选对个，不设置的话不显示
		},
		mounted() {
			console.log(this.$route.path)
			if(this.$route.path == 'shehui'||this.$route.path == 'guonei'||this.$route.path == 'guoji'||this.$route.path == 'yule'||this.$route.path == 'tiyu'||
			this.$route.path == 'junshi'||this.$route.path == 'keji'||this.$route.path == 'caijing'||this.$route.path == 'shishang'){
				this.type1 = this.$route.path
			}else{
				this.type1 = 'top'
			}
			// console.log(this.type1)
			this.$options.methods.search(this.type1,this);
			// 设置wrapper的高度
			this.$refs.wrapper.style.height = document.getElementById("app").offsetHeight - document.getElementsByClassName("count").offsetTop +"px";
			scrollY: true;
			eventPassthrough: 'vertical'
		},
		methods: {
			search(data,that){
				that.$http({
					url: 'http://toutiao-ali.juheapi.com/toutiao/index?type='+data,
					method: 'GET',
					headers: {'Authorization': 'APPCODE ad787fb706aa49b280107716a838cc37'}
				}).then(response => {
					that.da = response.data.result.data
					that.result = response.data
					that.isLoading = false
					console.log(response.data.result.data)
				}, function(response) {})
			},
			look(who,href,title,date,author) { // 位置，网址，标题，时间，作者
				document.getElementsByClassName('press')[who].firstChild.firstChild.className = "visit"
				this.href = href;
				this.title = title;
				this.date = date;
				this.author = author;
				this.lable = false
				href = encodeURIComponent(href); //网址转格式
				console.log('http://ali-extract.showapi.com/extract?AppCode=ad787fb706aa49b280107716a838cc37&url='+href)
				this.$http({
					url: 'http://ali-extract.showapi.com/extract?url='+href,
					method: 'GET',
					headers: {'Authorization': 'APPCODE ad787fb706aa49b280107716a838cc37'}
				}).then(response => {
					this.html = response.data.showapi_res_body.html;
					// console.log(response.data);
				}, function(response) {})
			},
			shuaxin(){
				this.lable = true
			},
			lang1(){ // 百度翻译
				let that=this;
				let salt = (new Date).getTime();
				let html = this.html;
				let str1 = this.appid+html+salt + this.keycode;
				let sign = this.$md5(str1);
				console.log('http://api.fanyi.baidu.com/api/trans/vip/translate?q='+html+'&appid='+this.appid+'&from='+this.oldlang+'&to='+this.to+'&salt='+salt+'&sign='+sign);
				console.log('http://api.fanyi.baidu.com/api/trans/vip/translate?q='+this.html+'&appid='+this.appid+'&from='+this.oldlang+'&to='+this.to+'&salt='+salt+'&sign='+sign);
				this.$jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate',{
					q:html,
					appid:this.appid,
					from:'zh',
					to:'en',
					salt:salt,
					sign:sign
				}).then(function(data){
					let da = data.trans_result[0].dst;
					// let dat = decodeURI(decodeURI(da))
					that.html = da;
					// this.from=this.to;
				}).catch(function(err){
					console.log(err);
				});
			},
			type(val){
				console.log(val)
				this.type1 = val
				this.$options.methods.search(this.type1,this);
			}
		}
	}
</script>

<style lang="scss">
	@import "../../assets/sass/mixin";
	.count {
		display: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;

		.title {
			clear: both;
			width: 90%;
			@include new-height(153*30px);
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
						a.visit{
							color: #551a8a;
						}
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
							width: 1/3*99%;
							float: left;
							border-right: 1px solid #ccc;
						}

						img:last-child {
							border-right: 0;
						}
					}

					.imgs.onlyOneSpan {
						width: 30%;
						display: inline-block;

						img {
							width: 100%;
							height: 100%;
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
</style>
