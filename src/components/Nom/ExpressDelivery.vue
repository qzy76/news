<template>
	<div class="express">
		<div class="check">
			<i @click='ComeBreak' class="icon iconfont">&#xec73;</i>
			<h2>快递查询</h2>
			<div>
				<select v-model="type">
					<option value="auto" selected>自动识别</option>
					<option v-for="item in express" :value="item.code">{{item.name}}</option>
				</select>
				<input type="number" v-model="code" placeholder="请输入快递单号">
				<button @click="check">查询</button><!-- <b>75121261713301</b> -->
			</div>
		</div>
		<div class="view">
			<loading v-if="isLoading"></loading>
			<div v-else>
				<Error v-if="isError"></Error>
				<ul v-else>
					<li v-for="(item,index) in list" :key="index">
						<p>{{item.content}}</p>
						<span>{{item.time}}</span>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>
<script>
	import Loading from '../../public/Loading'
	import Error from '../../public/Error'
	export default {
		name: 'ExpressDelivery',
		data() {
			return {
				isLoading: false,
				isError: false,
				express: this.$store.state.express, // 快递名
				type: 'auto', // 当前快递
				code: '75121261713301', // 快递单号
				list: null,
			};
		},
		methods: {
			ComeBreak() {
				this.$emit('returnHome');
			},
			check() {
				this.isLoading = 'ture';
				this.$http({
					url: 'http://cexpress.market.alicloudapi.com/cexpress?no=' + this.code + '&type=' + this.type,
					method: 'GET',
					headers: {
						'Authorization': 'APPCODE ad787fb706aa49b280107716a838cc37'
					}
				}).then(response => {
					console.log(response.data.code);
					if (response.data.code == '205') {
						this.isLoading = false;
						this.isError = true;
						console.log(this.isError)
					} else {
						this.list = response.data.list;
						this.isLoading = false;
						this.isError = false;
					}
				})
			}
		},
		components: {
			Loading,
			Error
		}
	}
</script>

<style lang="scss">
	@import "../../assets/sass/mixin";

	.express {
		display: block;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		background: #fff;
		position: relative;
		
		.check {
			padding: 2%;
			position: fixed;
			background: #fff;
			z-index: 9999;
			border-bottom: 0;
			i,h2 {
				float: left;
				line-height: 16px;
				vertical-align:text-top;
				margin-bottom: 5px;
			}

			div {
				width: 100%;
				clear: both;
				display: inline-block;


				select {
					width: 32%;
					height: 30px;
					padding: 0 2%;
					margin: 0;
					option {
						text-align: center;
					}
				}
					input,select,option,button {
						display: inline-block;
						vertical-align: top;
						outline-color: #e47c7c;
						height: 30px;
					}

					input {
						height: 26px;
						padding-left: 2px;
						width: 40%;
					}

					button {
						padding: 1px 4px;
						font-size: 18px;
						border-radius: 4px;
						background: #e47c7c;
						border: none;
						font-weight: bold;
						overflow: hidden;
					}
				}

			}

			.view {
				width: 100%;
				height: 100%;
				position: relative;
				top: 70px;

				ul {

					li {
						padding: 2.5%;
					}

					li:nth-child(odd) {
						background: #efdcdc;
					}

					li:nth-child(even) {
						background: #ece8e8;
					}

					li:first-child {
						background: #e6d4d4;
					}

					li:hover {
						background: #f9f9f9;
					}
				}
			}
		}
</style>
