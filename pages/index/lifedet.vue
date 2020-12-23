<template>
	<view>
		<view class="con" v-for="(item,index) in lifelist" @key="index">
			<view style="width:100rpx;height:100rpx;margin: 0 auto;margin-top: 20rpx;"><image src="../../static/bg/mg.png" style="width: 100%;height: 100%;"></image></view>
			<h3 style="color: white;text-align: center;">{{item.name}}</h3>
			<view style="color: white;">
				<view class="lifetit">
					推荐指数:{{item.category}}
				</view>
				<view class="lifefont">
					{{item.text}}
				</view>
			</view>
			<!-- <loaction></loaction> -->
		</view>
	</view>
</template>

<script>
	// import loaction from '../../components/loaction/loaction.vue'
	export default {
		// components:{
		// 	loaction
		// },
		data() {
			return {
				lifelist:[]
			}
		},
		onLoad(e) {
			console.log(e)
			this.type = e.type
			this.location = e.location
			// console.log(e.type)
			this.lifenum()
		},
		methods: {
			lifenum(){
				const res = uni.request({
				    url: 'https://devapi.qweather.com/v7/indices/1d?',
					method:'GET',
				    data: {
				        key: '92789d4ac66d4447bf9e7c8469d1decf',
						location: this.location,
						type: this.type
				    },
				    success: (res) => {
						 this.lifelist = res.data.daily
						  console.log(this.lifelist);
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
page{background: #99CCFF;}
.lifetit{
	text-align: center;
	margin-top: 100rpx;
	font-weight: 600;
}
.lifefont{
	padding-top: 50rpx;
    width: 89%;
    margin: 0 auto;
}
</style>
