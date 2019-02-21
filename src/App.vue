<template>
	<div id="app">
		<div class="buttom">
			<ul class="tabs">
				<li v-for="(item,index) in classMap" :key="index" class="tab-item" @click='choose(index)'>
					<router-link :to='item.type' :class="{'active':num==index}"><i class="icon iconfont" v-html="item.icon"></i>{{item.title}}</router-link>
				</li>
			</ul>
		</div>
		<router-view/>
	</div>
</template>
<script>
	export default {
		name: 'App',
		data(){
			return{
				classMap: [
					{type:'/',title:'主页',icon:'&#xe603;'},
					{type:'/area',title:'地区',icon:'&#xe61b;'},
					{type:'/funny',title:'段子',icon:'&#xe604;'},
					{type:'/person',title:'个人',icon:'&#xe60d;'},
				],
				num:0
			}
		},
		mounted(){
			if(this.$route.path == '/top'){
				this.$router.replace('/')
			}
		},
		methods: {
			choose(data){
				this.num = data
			}
		}
	}
</script>
<style lang="scss">
	#app {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		min-width: 300px;
		.buttom{
			width: 100%;
			height: 40px;
			position: absolute;
			z-index: 999;
			left: 0;
			bottom: 0px;
			border-top: 1px solid #ccc;
			background: #f9f9f9;
			& ul.tabs{
				width: 100%;
				height: 40px;
				& li.tab-item{
					width: 25%;
					height: 40px;
					float: left;display: inline-block;
					text-align: center;
					line-height:40px;
					a{
						width: 100%;
						height: 100%;
						display: block;
						color: #000;
						font-size: 14px;
						i.icon{
							display: inline-block;
							color: #000;
							width: 16px;
							height: 16px;
							margin-right: 2px;
						}
					}
					a.active{
						color: red;
						i{
							color: red;
						}
					}
					a:active{
						background: #e2afaf;
						color: #fff;
						i.icon{
							color: #fff;
						}
					}
					
				}
			}
		}
	}
</style>
