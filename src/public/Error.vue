<template>
    <div class="loading">
			<div></div>
			<p>在这个星球中找不到</p>
    </div>
</template>

<script>
    export default {
        name: 'Loading'
    }
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
		div{
			width: 100%;
			height: 200PX;
			text-align: center;
			background: url("../assets/img/error.png") no-repeat center bottom;
			background-size: 60%;
			
		}
		p{
			color: #999;
			text-align: center;
			font-size: 14px;
			margin-top: -30px;
		}
  }
</style>
