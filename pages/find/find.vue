<template>
	<view class="cont">
		<view class="addbox">
			<view class="titfont">记录你的生活~</view>
			<view class="addcon" @click="addcons">
				<view style="width: 50px;height: 50px;">
					<image src="../../static/adds.png" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
		</view>
		<view class="conslist" v-if="ycy">
			<view class="alist" v-for="(item,index) in clist" @click="conslistdet">
				<view class="blist">
					<view style="font-weight: 600;">{{item.title}}</view>
					<view>{{item.time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ycy:false,
				userinfo:{},
				clist:[
					{
						id:1,
						title:'标题标题标题',
						time:'2021年2月23日'
					},
					{
						id:2,
						title:'标题标题标题',
						time:'2021年2月23日'
					},
					{
						id:3,
						title:'标题标题标题',
						time:'2021年2月23日'
					},
					{
						id:4,
						title:'标题标题标题',
						time:'2021年2月23日'
					},
					{
						id:5, 
						title:'标题标题标题',
						time:'2021年2月23日'
					}
				]
			}
		},
		onShow() {
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
						_this.ycy = true
					}
				 }
			})
		},
		onLoad() { 
			// 获取用户信息
			let _this = this
			uni.getStorage({
			    key: 'userinfo',
			    success: function (res) {
					_this.userinfo = res.data
					 console.log(_this.userinfo,'xxx');
			    }
			});
		},
		methods: {
			addcons () {
				uni.getSetting({
					// 判断用户是否授权
					 success(res) {
						if (!res.authSetting['scope.userInfo']) {
							//这里调用授权
							console.log("当前未授权");
							uni.showModal({
							    title: '提示',
							    content: '您还没有登录,点击确定授权登录',
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										uni.navigateTo({
										    url: '../about/grant'
										});
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
							
						} else {
							console.log("当前已授权");
							uni.navigateTo({
								url: 'addnote'
							})
						}
					 }
				})
			},
			conslistdet () {
				console.log('xxx')
			}
		}
	}
</script>  

<style lang="scss">
page{
	background-color: #F8F8F8;
}
.titfont{
	font-size: 15px;
	text-align: center;
	margin: 10px 0;
}
.addcon{
	width: 90%;
	margin: 0 auto;
	height: 300rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	background-color: #FFFFFF;
}
.blist{
	width: 95%;
	height: 70px;
	margin: 0 auto;
	border-radius: 10px;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 15px;
}
</style>