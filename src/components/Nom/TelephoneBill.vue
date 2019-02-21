<template>
	<div class="pay">
		<div>
			<i @click='ComeBreak' class="icon iconfont break">&#xec73;</i><h2>广东移动充值</h2>
		</div>
		<iframe src="http://wap.gd.10086.cn/nwap/rech/hsh.jsps?Date=6&isdecrypt=1&recoempltel=5a71387a76654c7a6f57336b6d38624f4e44426d31513d3d&city=200&hzhbjr=452b5375436e3353644a7662354f514b7173706658513d3d&substoreid=516b2b65754c356a6245413d&transtype=6"width="100%" height="500px" frameborder="0"></iframe>
	</div>
</template>

<script>
	export default {
		name:'TelephoneBill',
		methods:{
			ComeBreak(){
				this.$emit('returnHome');
			}
		}
	}
</script>

<style lang="scss">
.pay{
	width: 100%;
	height: 100%;
	display: inline-block;
	div{
		width: 100%;
		padding:0 5px;
		height: 40px;
		line-height: 40px;
		font-size:18px;
		.break{
			display: inline-block;
			float: left;
		}
		
		h2{
			display: inline-block;
			float: left;
			padding-bottom: 5px;
		}
	}
}
</style>
