<template>
	<div class="course">
		<div class="comebreak">
			<i @click="ComeBreak" class="icon iconfont">&#xec73;</i>查券指南
		</div>
		<img :src="require('../../assets/img/zhinan.jpg')"/>
	</div>
</template>

<script>
	export default {
		name: 'Course',
		methods: {
			ComeBreak() {
				this.$router.go(-1)
			}
		}
		
	}
</script>

<style lang="scss">
	.course {
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
		.comebreak {
			width: 100%;
			padding: 0 5px;
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			font-family: "微软雅黑";
			position: fixed;
			left: 0;
			top: 0;
			background: #fff;
			text-align: center;
			border-bottom: 1px solid #f5f5f5;
			i {
				position: absolute;
				left: 0;
				top: 0;
				width: 10vw;
				height: 100%;
				display: block;
				font-size: 20px;
				color: #2f2f2f;
			}
		}
		img{
			margin-top: 50px;
			width: 100vw;
		}
	}
</style>