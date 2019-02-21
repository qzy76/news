<template>
	<div class="author">
		<i @click='ComeBreak' class="icon iconfont comeback">&#xec73;</i>
		<div class="group-up">
			<div class="top-bg" :style='{backgroundImage:"url(" + pic + ")"}'></div>
		</div>
		<div class="msg">
			<img :src="pic" class="head">
			<span class="name">{{author}}</span>
			<ul>
				<li>
					<p>{{visit}}</p><span>看过</span></li>
				<li>
					<p>{{likes}}</p><span>喜欢</span></li>
			</ul>
		</div>
		<div class="list">
			<div class="titler">
				<span>ta的文章</span>
			</div>
			<ul class="goods_list">
				<li v-for="(item,index) in da" :key="index">
					<a :href="'#/list/'+item.id">
						<img :src="item.cover_path" class="little-img">
						<div class="like-right">
							<p class="title">{{item.title}}</p>
							<div class="name-liulan">
								<span class="name">
									<span>栏目</span>{{item.class_name}}</span>
								<span class="liulan"><i class="icon iconfont">&#xe6a0;</i>{{item.views}}</span>
							</div>
						</div>
					</a>
				</li>
				<center>
					<p style="margin: 20px;color: #888888;font-size:12px">客官，加载完毕啦～</p>
				</center>
			</ul>
		</div>
		<footer-menu/><!--底部组件-->
	</div>
</template>

<script>
	import FooterMenu from './FooterMenu'
	export default {
		name: 'Author',
		data() {
			return {
				id: this.$route.params.id, // 作者id
				da: null, //当前作者的所有数据
				bg: null, // 头像背景
				pic: null, // 头像
				author: null,
				visit:null, // 浏览量
				likes:null // 喜欢量
			};
		},
		mounted() {
			this.axios.get('/api/mmsList', {
				params: {
					aid: this.id,
				},
			}).then(res => {
				if(res.result == null) {
					this.da = JSON.parse(res.data.text).data
					this.pic = JSON.parse(res.data.text).data[0].avatar
					this.bg = JSON.parse(res.data.text).data[0].cover_path
					this.author = JSON.parse(res.data.text).data[0].author
					this.searchVisit(JSON.parse(res.data.text).data[0].id) // 查阅读量和喜欢量
				}
			})
		},
		methods: {
			ComeBreak() {
				this.$router.go(-1)
			},
			searchVisit(data){
				this.axios.get('/api/mmsInfo', {
				params: {
					id: data,
				},
			}).then(res => {
				if(res.result == null) {
					let da = JSON.parse(res.data.text).data
					console.log(da)
					this.visit = JSON.parse(res.data.text).data.author_info.views_count
					this.likes = JSON.parse(res.data.text).data.author_info.likes_count
				}
			})
			}
		},
		components: {
			FooterMenu
		}
	}
</script>
<style lang="scss">
	.author {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 9999;
		background: #f5f5f5;
		overflow-y: scroll;
    overflow: auto;
		.comeback {
			position: fixed;
			left: 10px;
			top: 10px;
			font-size: 20px;
			color: #fff;
			z-index: 10;
		}
		.group-up {
			width: 100%;
			height: 180px;
			.top-bg {
				width: 100%;
				height: 200px;
				background: no-repeat;
				background-size: 100% 100%;
				filter: blur(5px);
				-webkit-filter: blur(5px);
			}
		}
		.msg {
			width: 100%;
			height: 120px;
			position: relative;
			text-align: center;
			background: #fff;
			img {
				width: 64px;
				height: 64px;
				border-radius: 50%;
				position: absolute;
				top: -40px;
				left: calc(50vw - 32px);
				border: 3px #fff solid;
			}
			span.name {
				display: block;
				clear: both;
				padding-top: 40px;
				font-size: 14px;
				color: #444;
			}
			ul {
				margin: 10px auto 20px;
				li {
					float: left;
					width: 50%;
					p {
						font-size: 14px;
						color: #444;
					}
				}
			}
		}
		.list {
			width: 100%;
			margin-top: 10px;
			background: #fff;
			.titler {
				width: 100%;
				height: 60px;
				line-height: 60px;
				text-align: center;
				span {
					font-size: 12px;
					color: #999;
					padding: 0 20px;
					background: #fff;
				}
			}
			ul.goods_list {
				li {
					clear: both;
					width: 100%;
					height: 80px;
					margin-bottom: 20px;
					a {
						img {
							width: 40vw;
							max-height: 80px;
							float: left;
						}
						.like-right {
							width: 54%;
							margin: 0 3%;
							float: left;
							height: 100%;
							position: relative;
							.title {
								font-size: 13px;
								color: #444;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								margin: 0;
							}
							.name-liulan {
								position: absolute;
								left: 0;
								bottom: 0;
								.name {
									float: left;
									width: 50%;
									overflow: hidden;
									color: #444;
									height: 20px;
									font-size: 12px;
									span{
										color: #999;
									}
								}
								.liulan {
									float: right;
									color: #999;
									font-size: 12px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>