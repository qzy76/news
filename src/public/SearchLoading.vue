<template>
	<ul class="big_so">
		<li v-for="(item,index) in 6" :key="index" class="loading">
			<div class="img">Loading</div>
			<div class="vmgroup">
				<div class="vmName"></div>
				<span class="vmTicket"></span>
				<div class="vmPrice">
					<span class="price"></span><span class="sale"></span>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'SearchLoading'
	}
</script>

<style lang="scss" scoped>
$bg:#f5f5f5;
		li.loading  {
			width: 44vw !important;
			border: none !important;
			div,span{
				border-radius: 5px;
			}
			.img {
				border-radius: 5px;
				width: 45vw;
				height: 45vw;
				background: $bg;
				text-align: center;
				line-height: 45vw;
				font-weight: bolder;
				font-size: 36px;
				color: #fff;
			}
			.vmgroup {
				.vmName, .vmTicket {
					height: 25px;
					background: $bg !important;
					
				}
				.vmName {
					margin-top: 5px;
				}
				.vmTicket{
					display: none;
				}
				.vmPrice {
					.price,.sale {
						display: inline-block;
						height: 25px;
						width: 30%;
						background: $bg !important;
					}
					.sale {
						float: right;
					}
				}
			}
		}
</style>