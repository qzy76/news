<template>
	<div class="jhs">
		聚划算
		<footer-menu/><!--底部组件-->
	</div>
</template>

<script>
	import FooterMenu from './FooterMenu'
	
	export default {
		name:'Ju',
		data() {
			return {
				
			};
		},
		components: {
			FooterMenu
		}
	}
</script>

<style>
.jhs {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 100vw;
		background: rgb(245, 245, 245);
		width: 100%;
		height: 100%;
		z-index: 9999;
		overflow-y: scroll;
		overflow: auto;
		}
</style>
