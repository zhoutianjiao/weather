<template>
	<view class="mian">
		<view class="xbox">
			<view class="xhrbox">
				<image src="../../static/404/x1.png" class="alls"></image>
			</view>
			<view class="yxbox">
				<view v-for="(item,index) in xhrlist" @key="index" class="sizebox">
					<img :src="item.imgurl" class="alls"/>
				</view>
			</view>
			<view class="fontbox">小黄人把页面偷走了</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xhrlist:[
					{
						id:1,
						imgurl:require("../../static/404/x2.png")
					},
					{
						id:2,
						imgurl:require("../../static/404/x3.png")
					},
					{
						id:3,
						imgurl:require("../../static/404/x4.png")
					},
					{
						id:4,
						imgurl:require("../../static/404/x5.png")
					},
					{
						id:5,
						imgurl:require("../../static/404/x6.png")
					},
					{
						id:6,
						imgurl:require("../../static/404/x7.png")
					},
					{
						id:7,
						imgurl:require("../../static/404/x8.png")
					}
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
		},
		onShareAppMessage(res) {
		   return {
				 title: 'goodday天气，开心每一天',
				 path: '/pages/index/index',
				 imageUrl: '/static/share.png'
		   }
		},
		methods: {
	
		}
	}
</script>

<style lang="scss">
page{background: #4238ff;}
.alls{width: 100%;height: 100%;}
.xbox{width: 100%;     margin-top: 40%;}
.xhrbox{width:100rpx;height: 100rpx;margin: 0 auto;}
.sizebox{width: 80rpx;height: 80rpx;}
.yxbox{display: flex;justify-content: center;align-item: center;margin-top: 5%;}
.fontbox{font-size: 20px;font-weight: bold;color: white;text-align: center;}
</style>
