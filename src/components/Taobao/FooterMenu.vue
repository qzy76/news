<template>
	<div>
		<div class="clearFooterH"></div>
	<div class="footer">
		<!--底部组件-->
		<ul>
			<!--<li v-for="(item,index) in footmenu" :key="index">
				<a :href="item.link"><i class="icon iconfont" v-html="item.icon"></i><br><span class="active">{{item.name}}</span></a>
			</li>-->
			<router-link
				 v-for="(item,index) in footmenu" :key="index"
				tag="li"
				:to="'/'+item.link"
				>
				<i class="icon iconfont" v-html="item.icon"></i><br><span>{{item.name}}</span>
			</router-link>
		</ul>
	</div>
	</div>
</template>
<script>
	export default {
		name: 'FooterMenu',
		data() {
			return {
				footmenu: this.$store.state.taoBaoFooterMenu
			};
		}
	}
</script>

<style lang="scss">
		.clearFooterH{
			width: 100%;
			height: 0px;
			padding-top: 50px;
			background-color: transparent;
			clear: both;
		}
	.footer {
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		ul {
			width: 100%;
			height: 50px;
			li {
				width: 20vw;
				height: 50px;
				display: inline-block;
				float: left;
				text-align: center;
				color: #000;
			}
			li.active{
				color: red;
			}
		}
	}
</style>