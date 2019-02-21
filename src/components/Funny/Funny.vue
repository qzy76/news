<template>
	<div class="funny">
		<ul class="title" ref="content">
			<li v-for="(item,index) in da" :key="index">
				<a class="press" target="_blank" :href="item.videouri">
					<h3 :class="{onlyOne :item.image1==null }"><a class="a">{{item.text}}</a></h3>
					<span class="imgs" :class="{onlyOneSpan:item.image1==null }">
						<img :src="item.cdn_img" v-show="item.cdn_img">
						<img :src="item.image1" v-show="item.image1">
						<img :src="item.profile_image" v-show="item.profile_image">
					</span>
					<div :class="{onlyOneDiv:item.image1==null }"><span>{{item.name}}</span><span>{{item.passtime}}</span></div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				da: null
			};
		},
		created() {
			this.axios.get('/api/funny')
			.then(res => {
				if (res.result == null) {
					console.log(JSON.parse(res.data.text).data)
					this.da = JSON.parse(res.data.text).data
				}
			})
		}
	}
</script>

<style lang="scss">
	@import "../../assets/sass/mixin";
	.funny {
		width: 100%;
		height: 100%;
		.title {
			clear: both;
			width: 90%;
			@include new-height(153*30px);
			padding: 0 5%;
			overflow-x: hidden;
			overflow-y: scroll;
			& li {
				margin: 10px 0;
				height: auto;

				& a.press {
					width: 100%;
					height: 100%;
					display: block;
					clear: both;

					& h3 {
						font-size: 17px;
						color: #000;
						font-weight: 400;
						margin-bottom: 2px;

						a.visit {
							color: #551a8a;
						}
					}

					& h3.onlyOne {
						width: 70%;
						float: left;
					}

					.imgs {
						display: inline-block;
						width: 100%;
						clear: both;
						height: 125px;

						img {
							width: 1/3*99%;
							max-height: 125px;
							float: left;
							border-right: 1px solid #ccc;
						}

						img:last-child {
							border-right: 0;
						}
					}

					.imgs.onlyOneSpan {
						width: 30%;
						display: inline-block;

						img{
							width: 100%;
							height: 100%;
							
							overflow: hidden;
							margin-right: 2px;
						}
					}

					& div {
						padding-top: 10px;
						color: #999;
						clear: both;

						& span:last-child {
							padding-left: 5px;
						}
					}

					& div.onlyOneDiv {
						float: left;
						display: inline-block;
						padding-top: 0;
						margin-top: -10px;
						margin-bottom: 10px;
					}
				}
			}

		}
	}
</style>
