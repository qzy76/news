<template>
  <div class="type" ref='picWrapper'>
		<ul class="tabs topLeble" ref="lable" :style="{width:width1 + 'px'}">
			<li v-for="(item,index) in classMaps" :key="index" class="tab-item">
				<a :href='"#/news/"+item.type' @click="tab(item.type,index)" :class="num==index?'active':''">{{item.title}}</a>
			</li>
		</ul>
		<a class="choose" href="#/type"><i class="icon iconfont">&#xe620;</i></a>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  export default {
    name: 'NewsType',
	data(){
		return{
			classMaps: this.$store.state.classMap,
			width1:null,
			type:'nesw/top',
			num:0
		}
	},
	mounted(){
		// console.log(this.$route.path)
		if(this.$route.path == '/news/shehui'){
			this.num = 1
		}else if(this.$route.path == '/news/guonei'){
			this.num = 2
		}else if(this.$route.path == '/news/guoji'){
			this.num = 3
		}else if(this.$route.path == '/news/yule'){
			this.num = 4
		}else if(this.$route.path == '/news/tiyu'){
			this.num = 5
		}else if(this.$route.path == '/news/junshi'){
			this.num = 6
		}else if(this.$route.path == '/news/keji'){
			this.num = 7
		}else if(this.$route.path == '/news/caijing'){
			this.num = 8
		}else if(this.$route.path == '/news/shishang'){
			this.num = 9
		}
		this.picScroll = new Bscroll(this.$refs.picWrapper,{
			scrollX: true,
			eventPassthrough: 'vertical'
		})
		this.width1 = this.$store.state.classMap.length * 59 +40 // 动态设置宽度
    },
	methods:{
		tab(data,index){
			if(this.type!=data){
				this.type = data
				this.$emit('type', data)
				this.num = index
			}
		}
	},
  }
</script>

<style lang="scss" scoped>
	$w: 59px;
	$h:40px;
  .type {
		background-color: #f4f5f6;
		position: relative;
   .tabs {
		height: $h;
		min-width: 100%;
       .tab-item {
         line-height: $h;
         font-size: 14px;
         text-align: center;
		 height: 100%;
		 width:$w;
		 display: inline-block;
        & > a {
           display: inline-block;
           width: 100%;
           height: 100%;
           color: rgb(77, 85, 93);
			font-size: 17px;
         }
   
         & > .active {
           color: rgb(240, 20, 20);
         }
       }
     }
	.choose{
		display: block;
		width: $h;
		height: $h;
		background-color: #f4f5f6;
		position: absolute;
		top: 0;right: 0;
		color: #f85959;
		text-align: center;
		line-height: $h;
	 }
		 
  }
</style>