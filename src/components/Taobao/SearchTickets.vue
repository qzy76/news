<template>
	<div class="tickets">
		<div class="comebreak">
			<a href="#/taobao"><i class="icon iconfont">&#xec73;</i></a>超级搜<a href="#/taobao"><i class="icon iconfont">&#xe61e;</i></a>
		</div>
		<div class="shopType">
			
		</div>
		
	</div>
</template>

<script>

	export default {
		name: 'Tickets',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.tickets {
		width: 100%;
		height: 100%;
		z-index: 9999;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		overflow-y: scroll;
		overflow-x: hidden;
		.comebreak{
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
			z-index:10;
			text-align: center;
			a{
				position: absolute;
				left: 0;top: 0;
				width: 10vw;
				height: 100%;
				i{
					display: block;
					font-size: 20px;
					width: 10vw;
					height: 100%;
					color: #828282;
				}
			}
			a:last-child{
				left: auto;
				right: 10px;
			}
		}
		.shopType{
			margin-top: 50px;
			background: #fd385d;
			width: 100vw;
			height: 40px;
			overflow: hidden;
			
			
		}
	}
</style>