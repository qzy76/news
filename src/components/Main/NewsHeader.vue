<template>
		<div id="header">
			<div class="top">
				<div class="header_l"><i class="icon iconfont">&#xe6eb;</i></div>
				<div class="header_c"><a class="logo"></a>
				<i @click='shuaxin()' class="icon iconfont icon-shuaxin"></i></div>
				<div class="header_r">
					<a href="#/search"><i class="icon iconfont">&#xe60b;</i></a>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  name: 'NewsHeader',
	methods:{
		shuaxin(){
			this.$router.go(0);
		}
	}
}
</script>
<style scoped lang="scss">
	@import "../../assets/sass/mixin";
	$h30: 30px;
	#header{
		width: 100%;
		height: 44px;
		background: rgb(212,61,61);
		.top{
			padding:7px 18px;
			height: $h30;
			position: relative;
			& div{
				float: left;
				& .iconfont{
					color: #fff;
				}
			}
			.header_l{
				i{
					font-size: 21px;
				}
			}
			.header_c{
				display:inline-block;
				text-align: center;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				a{
					display: inline-block;
					width: 88px;
					height: 25px;
					margin: 7.5px auto;
					@include bg-img("../../assets/img/wap_logo", 88px 25px);
					background-repeat: no-repeat;
					float: left;
				}
				i{
					display: inline-block;
					float: left;
					height: $h30;
					width: $h30;
					line-height: $h30;
					margin-top: 6px;
					font-size: 14px;
				}
			}
			.header_r{
				float: right ;
				i{
				 font-size: 21px;
				}
			}
		}
	}
</style>
