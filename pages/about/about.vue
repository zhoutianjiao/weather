<template>
	<view class="mian">
		<uni-notice-bar speed="90" showIcon="true" scrollable="true" single="true" text="推荐音乐播放功能由于小程序主体是个人号的原因审核不通过,所以暂时关闭推荐部分功能!"></uni-notice-bar>
		<view class="myself">
			<view class="mybox" @click="logins" v-if="statuss">
				<image src="../../static/user/超人.png" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="mybox" v-if="stats">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="mytit" @click="logins" v-if="statuss">请登录</view>
			<view class="mytit" v-if="stats"><open-data type="userNickName"></open-data></view>
		</view>
		<view style="margin-top: 40rpx;">
			<uni-list>
			    <uni-list-item  title="个人信息" showArrow="true" link="#"></uni-list-item>
				<uni-list-item  title="笔记" showArrow="true" link="#"></uni-list-item>
				<uni-list-item  title="关于我们" showArrow="true" link="#"></uni-list-item>
				 <!-- to="/pages/about/mysports" -->
			</uni-list>
		</view>
		<!-- 测试自定义封装组件 -->
		<!-- <tianbtn></tianbtn> -->
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	//引入自定义封装组件
	import tianbtn from '@/components/tina-btn/tian-btn.vue'
	export default {
		name: 'UniNoticeBar',
		components:{uniNoticeBar,tianbtn},
		data() {
			return {
				userinfo:{},
				stats: false,
				statuss:true
			}
		},
		onLoad(){
			// 获取本地用户信息
			let _this = this
			uni.getStorage({
			    key: 'userinfo',
			    success: function (res) {
					_this.userinfo = res.data
					 console.log(_this.userinfo,'xxx');
			    }
			});
		},
		onShow(){
			let _this = this
			uni.getSetting({
				// 判断用户是否授权
				 success(res) {
					console.log("授权：",res);
					if (!res.authSetting['scope.userInfo']) {
						//这里调用授权
						console.log("当前未授权");
					} else {
						//用户已经授权过了
						console.log("当前已授权");
						_this.stats = true,
						_this.statuss = false
					}
				 }
			})
		},
		onShareAppMessage(res) {
		   return {
			 title: 'goodday天气，开心每一天',
			 path: '/pages/index/index',
			 imageUrl: '/static/share.png'
		   }
		},
		methods: {
			// 点击获取授权
			logins () {
				// console.log('fun')
				uni.showModal({
				    // title: '提示',
				    content: '您需要登录账号',
				    success: function (res) {
				        if (res.confirm) {
				            // console.log('用户点击确定');
							uni.navigateTo({
							    url: 'grant'
							});
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F8F8F8;
	}
	//个人信息部分
	.myself{
		width: 100%;
		height: 300rpx;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}
	.mybox{
		width: 130rpx;
		height: 130rpx;
		background: pink;
		border-radius: 80rpx;
	}
	.mytit{
		font-size: 30rpx;;
		margin-top: 20rpx;
	}
</style>
