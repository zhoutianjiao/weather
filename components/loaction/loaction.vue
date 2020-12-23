<template>
	<view>
		
	</view>
</template>

<script>
	import  QQMapWX from "../../static/js/qqmap-wx-jssdk.min.js"
	export default {
		data() {
			return {
				newCity: '', //城市
				district:'', //区
				longitude: '', //经度
				latitude: '',  //纬度
				lalde: ''
			}
		},
		onLoad() {
			this.locals()
		},
		methods: {
			locals () {
				let qqmapsdk = new QQMapWX({
					 // 填写自己的Key值，这个值是与AppID绑定的
					 key: 'IROBZ-RBB3W-KVPRO-RKR7W-HMJH5-FFFSJ'
				 });
				 let _this = this;
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						_this.longitude = res.longitude
						_this.latitude = res.latitude
						_this.lalde = res.longitude + ','+ res.latitude
						console.log(_this.lalde)
						// console.log('当前位置的经度：' + res.longitude);
						// console.log('当前位置的纬度：' + res.latitude);
						// 逆地址解析方法
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success(res) {
								var newCity = ''
								var district = ''
								console.log(res)
								// 取到用户的定位城市，赋值传递出去
								newCity = res.result.address_component.city;
								district = res.result.address_component.district;
								// console.log(district)
								_this.newCity = newCity
								// console.log(_this.newCity)
								_this.district = district
							}
						})	
					},
					fail: function () {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon:'none'
						});
					}
			
				});
			},
		}
	}
</script>

<style>

</style>
