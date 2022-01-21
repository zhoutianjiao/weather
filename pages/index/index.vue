<template>
	<view class="indexbody" :style="{background:(pandan=='晴'?conFontColor:'linear-gradient(to right,#C1C1C1,#EAEAEA )')}">
		<view class="address">
			<view class="addleft">
				<view class="addicon"><image src="https://cdn.qweather.com/img/plugin/190516/icon/h5/location.png" style="width: 100%;height: 100%;"></image></view>
				<view class="addfont">{{newCity}}{{district}}</view>
			</view>
			<view class="addrig">
				<view class="times">{{currentTime}}</view>
			</view>
		</view>
		<view class="datebox">
			<view class="weabox">
				<view class="weabox-1">{{result.temp}}<text>°</text></view>
				<view class="weabox-2">
					<view style="display: flex;">
						{{result.text}}
						<view class="iconbox"><image :src="`../../static/wea/${result.icon}.png`"  alt="天气图标" style="width: 100%;height: 100%;"></image></view>
					</view>
					<view>&nbsp;&nbsp;|&nbsp;&nbsp;</view> 
					<view class="tigbox">{{dt.category | wrcd}} {{dt.aqi}}</view>
				</view>
			</view>
		</view>
		<view class="gglis">
			<view>
				<view>降水</view>
				<view style="margin-top: 40rpx;">{{result.precip}}mm</view>
			</view>
			<view>
				<view>气压</view>
				<view style="margin-top: 40rpx;">{{result.pressure}}hpa</view>
			</view>
			<view>
				<view>{{result.windDir}}</view>
				<view style="margin-top: 40rpx;">{{result.windScale}}级</view>
			</view>
			<view>
				<view>湿度</view>
				<view style="margin-top: 40rpx;">{{result.humidity}}%</view>
			</view>
		</view>
		<view class="twentyfour">
			<view class="lifezhshu">24小时预报</view>
			<scroll-view  scroll-x="true" bindscroll="scroll" style="width: 100%;line-height: 66rpx;color:#68696A ;">
				<view style="display: flex;">
					<view v-for="(item,index) in twenty" @key="index">
						<view style="width: 100rpx;text-align: center;">{{item.fxTime | timego}}</view>
						<view style="text-align: center;">{{item.text}}</view>
						<view class="iconbox-two"><image :src="`../../static/wea/${item.icon}.png`"  alt="天气图标" style="width: 100%;height: 100%;"></image></view>
						<view style="text-align: center;">{{item.temp}}°</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="weekbox">
			<view class="lifezhshu">七天预告</view>
			<view class="sevenbox">
				<view style="width: 13%;">
					<view>日期</view>
					<view>日间</view>
					<view>夜间</view>
					<view>高温</view>
					<view>低温</view>
				</view>
				<view v-for="(item,index) in weeks" @key="index" class="sevenboxcon">
					<view class="text">{{item.fxDate | sevwek}}</view>
					<view class="text">{{item.textDay}}</view>
					<view class="text">{{item.textNight}}</view>
					<view class="text">{{item.tempMax}}°</view>
					<view class="text">{{item.tempMin}}°</view>
				</view>
			</view>
		</view>
		<view class="lifeindex">
			<view class="lifezhshu">生活指数</view>
			<view style="display: flex;flex-wrap: wrap;">
				<view v-for="(item,index) in lifelist" @key="index" class="listbox" @click="lffetype(item.type)">
					<view>
						<view>{{item.name}}</view>
						<view>{{item.category}}></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import  QQMapWX from "../../static/js/qqmap-wx-jssdk.min.js"
	export default {
		data() {
			return {
				timer:"",
				 currentTime: new Date(),
				 // time: new Date(),
				 // date: new Date(),
				 result: {},
				 dt: {},
				 lifelist:[],
				 twenty:[],
				 weeks:[],
				 pandan:'',
				 conFontColor:'',
				 newCity: '', //城市
				 district:'', //区
				 longitude: '', //经度
				 latitude: '',  //纬度
				 lalde: '' //经纬度，
				 // imgSrc: ''
			}
		},
		filters:{
			timego (e) {
				// console.log(e)
				//字符串截取
				let str =  e.substring(11,13)
				// console.log(str)
				if (e) {
					if(str == '00') {
						return '明天'
					}
					return str + '时'
				}
			},
			sevwek (e) {
				// 日期转换成时间
				let obj = new Date(e)
				let res = obj.getDay()
				if (e) {
					if(res == '1') {
						return '周一'
					} else if(res == '2'){
						return '周二'
					} else if(res == '3'){
						return '周三'
					} else if(res == '4'){
						return '周四'
					} else if(res == '5'){
						return '周五'
					} else if(res == '6'){
						return '周六'
					} else if(res == '0'){
						return '周日'
					}
				}
			},
			// 判断污染程度
			wrcd(e) {
				if(e == '优'){
					return '优'
				} else if (e == '良') {
					return '良'
				}else if (e == '轻度污染') {
					return '轻度'
				} else if (e == '中度污染') {
					return '中度'
				} else if (e == '重度污染') {
					return '重度'
				} else if (e == '严重污染') {
					return '严重'
				}
			}
		},
		onLoad() {
			//下拉刷新
			setTimeout(function () {
				// console.log('start pulldown');
			}, 1000);
		    uni.startPullDownRefresh({
				success (res){
					// console.log(res);  //success 返回参数说明
				}
			}),
			this.locals(),
			this.tianqiapi(),
			this.wlapi(),
			this.kqzl(),
			this.shzs(),
			this.week()
		},
		onShow(){
			this.locals()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.tianqiapi(),
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		 mounted() {
		    var vm = this;
			vm.timer = setInterval(() => {
					var y = new Date().getFullYear();
					var m = vm.appendZero(new Date().getMonth() + 1);
					var d = vm.appendZero(new Date().getDate());
					var ho = vm.appendZero(new Date().getHours());
					var mi = vm.appendZero(new Date().getMinutes());
					var se = vm.appendZero(new Date().getSeconds());
				//修改数据date
				vm.currentTime = y + '-' + m + '-' + d + ' ' + ho + ':' + mi;
				// vm.time = ho + ':' + mi
				// vm.date = m+'月'+d+'日'
			}, 1000)
		},
		beforeDestroy() {
		    if (this.timer) {
		      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
		    }
		},
		onShareAppMessage(res) {
		  return {
			 title: 'goodday天气，开心每一天',
			 path: '/pages/index/index',
			 imageUrl: '/static/share.png'
		  }
		},
		methods: {
			//时间过滤加零
			appendZero(obj) {
				if (obj < 10) {
					return "0" + obj;
				} else {
					return obj;
				}
			},
			// 获取用户当前位置
			locals(){
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
						// console.log(_this.lalde)
						_this.tianqiapi(),
						_this.wlapi(),
						_this.kqzl(),
						_this.shzs(),
						_this.week()
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
								// console.log(res)
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
			//请求当天天气
			tianqiapi() {
				// console.log(this.lalde ,'111')
				const res = uni.request({
				    url: 'https://devapi.qweather.com/v7/weather/now?',
					method:'GET',
				    data: {
				        key: '92789d4ac66d4447bf9e7c8469d1decf',
						location: this.lalde
				    },
				    success: (res) => {
						this.result = res.data.now
						this.pandan = this.result.text
						// let inconum = this.result.icon
						// console.log(inconum)
						// this.imgSrc = "'././static/wea/${inconum}.png'"
						 // console.log(this.imgSrc);
				    }
				});
			},
			//请求24小时天气
			wlapi() {
				const res = uni.request({
				    url: 'https://devapi.qweather.com/v7/weather/24h?',
					method:'GET',
				    data: {
				        key: '92789d4ac66d4447bf9e7c8469d1decf',
						location: this.lalde
				    },
				    success: (res) => {
						this.twenty = res.data.hourly
						 // console.log(this.twenty);
				    }
				});
			},
			// 请求空气质量
			kqzl() {
				const res = uni.request({
				    url: 'https://devapi.qweather.com/v7/air/now?',
					method:'GET',
				    data: {
				        key: '92789d4ac66d4447bf9e7c8469d1decf',
						location: this.lalde
				    },
				    success: (res) => {
						 // console.log(res);
						 this.dt = res.data.now
				    }
				});
			},
			// 请求生活指数
			shzs() {
				const res = uni.request({
				    url: 'https://devapi.qweather.com/v7/indices/1d?',
					method:'GET',
				    data: {
				        key: '92789d4ac66d4447bf9e7c8469d1decf',
						location: this.lalde,
						type: '1,2,3,9,13,15'
				    },
				    success: (res) => {
						 this.lifelist = res.data.daily
						  // console.log(this.lifelist);
				    }
				});
			},
			lffetype(e){
				console.log(this.lalde,'传值')
				uni.navigateTo({
				    url: 'lifedet?type='+ e + '&location=' + this.lalde
				});
			},
			// 请求一周预报
			week() {
				const res = uni.request({
				    url: 'https://devapi.qweather.com/v7/weather/7d?',
					method:'GET',
				    data: {
				        key: '92789d4ac66d4447bf9e7c8469d1decf',
						location: this.lalde
				    },
				    success: (res) => {
						 this.weeks = res.data.daily
						  // console.log(this.weeks);
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.indexbody{
		background-image: linear-gradient(to right,#9DD5FD,#EBF7FF );
		margin-top: -5px;
		// background-image: linear-gradient(to right,#C1C1C1,#EAEAEA );
		// background:#9DD5FD;
	}
	.text{text-align: center;}
	//头部
	.address{display: flex;margin-top: 10rpx;
	}
	.addicon{width: 30rpx;height: 40rpx;}
	.addfont{font-size: 30rpx;color: white;}
	.times{font-size: 30rpx;color: white;}
	.addleft{display: flex;}
	.addrig{position: absolute;right: 0;}
	//温度
	.datebox{width: 100%;display: flex;color: #414141;margin-top:10%;}
	.weabox{width:100%;margin: 0 auto;}
	.weabox-1{font-size: 160rpx;padding-left: 20rpx;text-align: center;font-weight: 100;}
	.weabox-2{font-size: 35rpx;text-align: center;display: flex;justify-content: space-between;margin: 0 auto;width: 35%;}
	.tigbox{width: 120rpx;height: 50rpx;background: #FFD752;color:white ;border-radius: 12rpx;display: flex;justify-content: center;}
	//数据
	.gglis{width: 100%;display: flex;margin-top: 90rpx;color:#68696A ;justify-content: space-around;}
	//24小时预报
	.twentyfour{
		width: 100%;
		margin-top: 50rpx;
	}
	//一周预告
	.weekbox{
		width: 100%;
		margin-top: 40rpx;
	}
	.sevenbox{
		display: flex;
		line-height: 70rpx;
		color: #68696A;
	}
	.sevenboxcon{
		width: 13%;
	}
	// 生活指数
	.lifeindex{
		width: 100%;
		margin-top: 40rpx;
	}
	.listbox{
		width: 33%;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		height: 120rpx;
		color: #68696A;
		align-items: center;
	}
	.lifezhshu{
		border-bottom: 1px solid white;font-weight: bold;padding-bottom: 20rpx;
	}
	.iconbox{
		width: 25px;
		height: 25px;
	}
	.iconbox-two{
		width: 25px;
		height: 25px;
		margin: 0 auto;
	}
</style>
