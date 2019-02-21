<template>
	<div class="type">
		<div class="header">
			<div class="search">
				<div><a @click='shuaxin()' id="href"><i class="icon iconfont break">&#xec73;</i></a></div>
				<div class="check">
					<a><i class="icon iconfont">&#xe60b;</i></a>
					<input type="text" placeholder="搜你想搜的" v-model="world">
					<div v-show="show">
						<ul>
							<li v-for="(item,index) in searchLable" :key="index">
								<a @click="parentMethod(item.id)">{{item.title}}</a>
							</li>
						</ul>
					</div>
				</div>
				<input type="button" value="搜索" @click="submit" v-on:keyup.enter.native="submit" />
			</div>
		</div>
		<error v-if="isLoading"></error>
		<div v-else class="choose">
			<div v-if="hot">
				<ul v-show="hotnews">
					<li>热点新闻</li>
					<li v-for="(item,index) in da" :key="index" class="howNum">
						<a @click="look(index,item.long)"><span>{{index+1}}、</span>{{item.title}}</a>
					</li>
				</ul>
				<div v-show="!hotnews" class="break">
					<a @click='breakcome()' id="href"><i class="icon iconfont break">&#xec73;</i>返回</a>
					<span><a target="_blank" :href="href">点我查看本文原著</a></span>
				</div>
				<iframe v-show="!hotnews" :src="href" width="106%" height="480" frameborder="0" scrolling="yes" style="position: absolute;top:-25px;overflow-x: hidden; margin-left: -1%;"></iframe>
			</div>
			<New-seleter ref="child1" v-else v-bind:world="world" v-bind:newsLable="newsLable"></New-seleter>
		</div>

	</div>
</template>
<script>
	import Error from '../../public/Error'
	import NewSeleter from './NewSeleter'
	export default {
		name: 'Search',
		data() {
			return {
				isLoading: true, // 是否在缓冲中
				hot: true, // 默认显示热点新闻
				da: null, // 热门新闻内容
				hotnews: true, // 显示热门新闻详情 true(不显示)
				href:null, // 热门新闻链接
				world: '', // 搜索词
				show: false, // 搜索提示框显示与否
				searchLable: [], // 搜索提示框内容
				newsLable: true, // 显示新闻列表(true)/新闻详情(false)
			}
		},
		components: {
			Error,
			NewSeleter
		},
		watch: {
			world() {
				this.$http({ // API参数详见https://www.showapi.com/api/view/109
					url: 'http://route.showapi.com/109-35?showapi_appid=84546&showapi_sign=83c384f0fcf849fcba1f25e114c7e523&maxResult=6&title=' +
						this.world,
					method: 'GET',
				}).then(response => { // 用箭头函数才能生效
					this.searchLable = response.data.showapi_res_body.pagebean.contentlist;
					// console.log(typeof(this.seleter));
					if (this.world == "") {
						this.show = false
					} else {
						this.show = true
					}
				}, function(response) {})
			}
		},
		methods: {
			shuaxin(){
				if(this.hot == false){
					this.hot = true
				}else{
					document.getElementById("href").setAttribute("href","#/"); 
				}
			},
			look(who,data) {
				// console.log(who)
				who++
				document.getElementsByClassName('howNum')[who].firstChild.className = "visit"
				this.href = data
				this.hotnews = false
				// console.log(this.href)
			},
			breakcome(){
				this.hotnews = true
			},
			submit() {
				this.$http({ // API参数详见https://www.showapi.com/api/view/109
					url: 'http://route.showapi.com/109-35?showapi_appid=84546&showapi_sign=83c384f0fcf849fcba1f25e114c7e523&maxResult=10&title=' +
						this.world,
					method: 'GET',
				}).then(response => {
					this.search = response.data.showapi_res_body.pagebean.contentlist;
					console.log(
						'http://route.showapi.com/109-35?showapi_appid=84546&showapi_sign=83c384f0fcf849fcba1f25e114c7e523&maxResult=10&title=' +
						this.world);
					console.log(this.search);
					this.show = false
					this.hot = false
					this.seleter = true
					this.newsLable = true
					
					console.log(typeof(this.newsLable))
				}, function(response) {})
			},
			parentMethod(id) {
				this.$refs.child1.look(id);
			}
		},
		created() {
			this.axios.get('/api/hot')
				.then(res => {
					if (res.result == null) {
						this.da = (JSON.parse(res.data.text)).showapi_res_body.list.list
						// console.log(this.da.length>0)
						this.result = res.data
						if (this.da.length > 0) {
							this.isLoading = false
						}
					}
				})
			// 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
			var lett = this;
			document.onkeydown = function(e) {
				var key = window.event.keyCode;
				if (key == 13) {
					lett.submit();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../assets/sass/mixin";
	$h:40px;
	$h25: 25px;
	$h30: 30px;
	$border:1px solid #b9b9b9;

	.type {
		width: 100%;
		height: 100%;
		position: relative;
		font-family: Arial, Helvetica, Hiragino Sans GB, Microsoft YaHei, sans-serif;

		.header {
			width: 100%;
			height: $h;
			position: relative;
			padding: 7px 7.5px;
			border-bottom: $border;
			z-index: 2;
			background: #fff;
			.search {
				width: auto;
				height: 100%;

				div {
					width: $h30;
					height: $h;
					margin: auto;
					float: left;

					a {
						display: block;
						width: $h30;
						height: $h;
						line-height: $h;
						text-align: center;

						.break {
							color: #666;
						}
					}
				}

				& input {
					border-radius: 4px;
					display: inline-block;
					outline-color: #d43d3d;
					overflow: hidden;
				}

				.check {
					width: 77%;
					height: calc(100% - 2px);
					line-height: $h;
					float: left;
					display: block;
					position: relative;
					top: 0;
					left: 0;

					a {
						display: inline-block;
						height: $h;
						line-height: $h;
						position: absolute;

						i {
							color: #efefef;
						}
					}

					input[type='text'] {
						width: 90%;
						height: 100%;
						border: $border;
						padding-left: 9%;
					}

					div {
						position: absolute;
						left: 0px;
						top: calc(100%);
						width: calc(100% - 3px);
						height: $h25*6+5px;
						border: $border;
						background: #fff;

						ul {
							width: 100%;
							height: $h25*6;

							li {
								width: 100%;
								height: $h25;
								@include border-bottom-1px(#ccc);
								line-height: $h25;

								a {
									display: inline-block;
									text-align: justify;
									overflow: hidden;
									width: 90%;
									height: 100%;
									padding: 0 5%;
									color: #000;
									line-height: $h25;
									text-overflow: ellipsis;
									white-space: nowrap;
									overflow: hidden;
								}
							}
						}
					}
				}

				input[type='button'] {
					margin-left: 1px;
					padding: 0 5px;
					float: left;
					width: auto;
					height: $h;
					line-height: 100%;
					text-align: center;
					border: 0px;
					background: #fff;
					font-size: 18px;
					color: #b9b9b9;
					font-family: '黑体';
					outline: none;

				}
			}
		}

		.choose {
			width: 100%;
			position: relative;
			z-index: 1;
			ul {
				width: calc(100%-20px);
				position: relative;
				width: calc(100%-10px*2);

				li {
					width: 100%;
					font-size: 16px;
					display: inline-block;
					margin: 0 10px;
					-webkit-animation: zoomIn .3s ease;
					animation: zoomIn .3s ease;

					& a {
						font-size: 14px;
						width: 90%;
						display: block;
						margin: 0 8px;
						text-align: justify;
						line-height: 2em;
						color: #131313;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;

						span {
							display: inline-block;
							width: 16px;
							height: 16px;
						}
					}
					& a.visit{
						color: #551a8a;
					}
				}

				li:first-child {
					background: #f7f7f7;
					border-bottom: 1px solid #b9b9b9;
					margin-left: 0;
					padding-left: 20px;
					height: $h30;
					line-height: $h30;
				}
			}
			.break{
				width: 100%;
				height: 30px;
				line-height: 30px;
				padding-left: 2px;
				background: #fff;
				font-size: 16px;
				position: relative;
				z-index: 99;
				span{
					position: absolute;
					right: 15px;
					top: 0;
					a{
						color: #333;
					}
				}
			}
		}
	}
</style>
