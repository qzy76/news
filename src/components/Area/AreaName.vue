<template>
	<div>
		<div class="type" ref='picWrapper'>
			<div class="header" ref="wrapper">
				<ul class="tabs" ref="width">
					<li v-for="(item,index) in cityList" @click="change(item.areaName)" :key="index" class="tab-item" :class="{active:item.areaName==area}">{{item.areaName}}</li>
				</ul>
				
			</div>
			<a class="choose" href="#/type"><i class="icon iconfont">&#xe60b;</i></a>
		</div>
		<area-news :data="newsdata" :da="news1"></area-news>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	import AreaNews from './AreaNews'
	export default {
		name: 'NewsType',
		data() {
			return {
				cityList: [
					{areaName:"北京"},{areaName:"上海"},{areaName:"天津"},{areaName:"重庆"},
					{areaName:"广东"},{areaName:"河北"},{areaName:"辽宁"},{areaName:"吉林"},
					{areaName:"甘肃"},{areaName:"山西"},{areaName:"四川"},{areaName:"陕西"},
					{areaName:"河南"},{areaName:"山东"},{areaName:"湖南"},{areaName:"湖北"},
					{areaName:"江西"},{areaName:"江苏"},{areaName:"浙江"},{areaName:"安徽"},
					{areaName:"福建"},{areaName:"广西"},{areaName:"贵州"},{areaName:"香港"},
					{areaName:"澳门"},{areaName:"海南"},{areaName:"台湾"},{areaName:"云南"},
					{areaName:"内蒙古"},{areaName:"青海"},{areaName:"宁夏"},{areaName:"新疆"},
					{areaName:"西藏"},{areaName:"黑龙江"}
				],
				newsdata:null, // 新闻内容
				area:'广东',
				news1:true
			}
		},
		components: {
		  AreaNews
		},
		mounted() { 
			this.$options.methods.en(this.area,this); /// 调用methods中en()方法
		},
		methods:{
			en(data,that){ // 传参就获取地区新闻，不传就所有地区
				that.$http({
					url: 'http://route.showapi.com/170-47?showapi_appid=85195&showapi_sign=5be3708bbf558f477b9f593629aa76e1&areaName='+data,
					method: 'GET',
				}).then(response => { // 用箭头函数才能生效
					console.log(response.data);
					that.newsdata = response.data.showapi_res_body.pagebean.contentlist;
				}, function(response) {});
				
				that.picScroll = new Bscroll(that.$refs.picWrapper, {
					scrollX: true,
					eventPassthrough: 'vertical'
				})
			},
			en1(data,that){ // 传参就获取地区新闻，不传就所有地区
				that.$http({
					url: 'http://route.showapi.com/170-47?showapi_appid=85196&showapi_sign=2d4affd9b92a4cbc89dcbb6f559cb884&areaName='+data,
					method: 'GET',
				}).then(response => { // 用箭头函数才能生效
					console.log(response.data);
					that.newsdata = response.data.showapi_res_body.pagebean.contentlist;
				}, function(response) {});
				that.picScroll = new Bscroll(that.$refs.picWrapper, {
					scrollX: true,
					eventPassthrough: 'vertical'
				})
			},
			change(data){
				this.area = data;
				this.$options.methods.en1(data,this); // 调用methods中en()方法
			}
		}
	}
</script>

<style lang="scss" scoped>
	$w: 59px;
	$h:40px;

	.type {
		background-color: #f4f5f6;
		position: relative;
		z-index: 9999;
		background: #fff;
		height: $h;
		width: 100%;
		.header{
			height: $h;
			width: $w*34+$h;
			.tabs {
				height: $h;
				width: $w*34+$h;

				.tab-item {
					line-height: $h;
					text-align: center;
					height: 100%;
					width: $w;
					display: inline-block;
					color: rgb(77, 85, 93);
					font-size: 17px;
				}
				.tab-item.active {
					color: rgb(240, 20, 20);
				}
			}
			
		}
		.choose {
			display: block;
			width: $h;
			height: $h;
			background-color: #f4f5f6;
			position: absolute;
			top: 0;
			right: 0;
			color: #f85959;
			text-align: center;
			line-height: $h;
		}
	}
</style>
