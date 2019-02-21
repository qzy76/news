<template>
	<div class="count">
		<loading v-if="isLoading"></loading>
		<div v-else ref="wrapper">
			<div v-if="news">
				<ul class="title" ref="content">
					<li v-for="(item,index) in data">
						<a @click="look(item.link)" class="press">
							<h3>{{item.title}}</h3>
							<div><span>{{item.source}}</span><span>{{item.ct}}</span></div>
						</a>
					</li>
				</ul>
			</div>
			<div v-else>
				<div class="break">
					<a @click='breakcome()'><i class="icon iconfont break">&#xec73;</i>返回</a>
					<span><a target="_blank" :href="href">点我查看本文原著</a></span>
				</div>
				<iframe :src="href" width="106%" height="680" frameborder="0" scrolling="yes" style="position: absolute;top:2px;overflow-x: hidden; margin-left: -1%;"></iframe>
			</div>
		</div>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	import Loading from '../../public/Loading'
	export default {
		name: 'AreaNews',
		props: ['data','da'],
		data() {
			return {
				isLoading: true,
				news:true, // 新闻列表（true)新闻页(false)
				href:null, // 新闻链接
				area:'广东'
			}
		},
		components: {
		  Loading
		},
		mounted() {
			this.$refs.wrapper.style.height = document.getElementById("app").offsetHeight - document.getElementsByClassName("title").offsetTop +"px";
			scrollY: true;
			eventPassthrough: 'vertical';
		},
		methods:{
			look(item){
				this.href = item;
				this.news = false;
				// this.da = false;
				// console.log(this.da)
			},
			breakcome(){
				this.news = true;
			}
		},
		watch: {
			data(val){
				if(val!=''){
					this.isLoading = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/sass/mixin";
	.count {
		display: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100vw;
		overflow: hidden;
		background: #fff;
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
					.imgs.onlyOneSpan{
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
					& div.onlyOneDiv{
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
			z-index: 99;
			span{
				position: absolute;
				right: 15px;
				top: 0;
				a{
					color: #333;
				}
			}
		}
	}
</style>
