<template>
	<view class="mian">
		<view class="conbox">
			<view class="logobox">
				<image src="../../static/logo.png" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="titbox">
				您还没有授权，未授权将会影响小程序正常体验，快去授权信息吧！
			</view>
			<view class="btnnbox">
				<button type="primary" class="btnn" open-type="getUserInfo"  @getuserinfo="getuserinfo" withCredentials="true">微信授权</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getuserinfo(e){
				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
						console.log(this.userInfo);
						uni.setStorage({
						    key: 'userinfo',
						    data: this.userInfo,
						    success: function () {
						        console.log('success');
						    }
						});
						if(res){
							// console.log('xxx')
							uni.navigateBack({
							    delta: 2
							});
						}
					},
					fail: () => {
						 uni.showToast({title:"微信登录授权失败",icon:"none"});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F8F8F8;
	}
	.conbox{
		width: 100%;
		display: flex;
		align-items: center;
		flex-flow: column;
	}
	.logobox{
		width: 110rpx;
		height: 110rpx;
		border-radius: 80rpx;
		background: white;
		margin-top: 80rpx;
	}
	.titbox{
		margin-top: 80rpx;
		width: 80%;
		font-size: 30rpx;
		color: #999999;
		text-align: center;
	}
	.btnnbox{
		margin-top: 65rpx;
	}
	.btnn{
		background: rgb(26,173,25);
		font-size: 30rpx;
		background: #1aad19;
		color: white;
		width: 520rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}
</style>
