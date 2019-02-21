<template>
  <div class="type">
		<div class="header">
			<div class="top">
				<div class="header_l">
					<a @click="qzy"><i class="icon iconfont">&#xe67c;</i></a>
				</div>
				<div class="header_c">频道管理</div>
			</div>
		</div>
		<div class="choose">
			<div class="del">
				<span class="controlTitle">点击删除以下频道</span>
				<ul>
					<li v-for="(item,index) in classMaps" :key="index" class="tab-item">
						<a @click="dec(index)">{{item.title}}</a>
					</li>
				</ul>
			</div>
			<div class="add">
				<span class="controlTitle">点击添加以下频道</span>
				<ul>
					<li v-for="(item,index) in decMap" :key="index" class="tab-item">
						<a @click="add(index)">{{item.title}}</a>
					</li>
				</ul>
			</div>
		</div>
  </div>
</template>

<script>
import Bus from './bus.js'
  export default {
    name: 'ChooseType',
    props: ['seller'],
		data(){
			return{
				classMaps: this.$store.state.classMap,
				decMap: this.$store.state.decMap
			}
		},
		mounted(){
			Bus.$emit('val', this.classMap)
		},
		methods:{
			dec(type){
				 this.$store.commit('dec',type)
			},
			add(type){
				 this.$store.commit('add',type)
			},
			qzy(){
				this.$router.replace('/news/'+this.classMaps[0].type)
			}
		}
    
  }
</script>

<style lang="scss" scoped>
	@import "../assets/sass/mixin";
	$h:40px;
	$h30: 30px;
  .type {
		background-color:#f5f5f5;
		width: 100%;
		height: 100%;
		position: relative;
		font-family: Arial,Helvetica,Hiragino Sans GB,Microsoft YaHei,sans-serif;
		.header{
			width: 100%;
			height: 50px;
			position: relative;
			background-color: #d43d3d;
			.top{
				padding:10px 18px;
				height: 30px;
				position: relative;
				& div{
					float: left;
				}
				.header_l{
					i{
						font-size: 21px;
						color: #fff;
					}
				}
				.header_c{
					display:inline-block;
					text-align: center;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					font-size: 16px;
					font-weight: bolder;
					color: #fff;
				}
			}
		}
		 .choose{
			.controlTitle{
				display: block;
				padding: 0 10px;
				line-height: 2em;
				background-color: #f5f5f5;
				font-size: 12px;
				color: #666;
			}
			ul{
				margin: 10px 0;
				li{
					display: inline-block;
					width: 25%;
					margin-bottom: 10px;
					-webkit-animation: zoomIn .3s ease;
					animation: zoomIn .3s ease;
					& a{
						font-size: 16px;
						display: block;
						margin: 0 8px;
						border: 1px solid #ccc;
						text-align: center;
						line-height: 2em;
						color: #131313;
					}
					& a:active{
						background:gainsboro;
					}
				}
			}
		 }
		 
  }
</style>