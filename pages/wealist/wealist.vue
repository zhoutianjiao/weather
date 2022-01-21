<!--音乐播放-->
<template>
	<view class="root">
		<view class="play-list-wrap">
			<!-- 播放列表 --> 
			<checkbox-group class="list">
				<view class="item" v-for="(item, index) in playList" :key="item.id">
					<view @click="change_item(index)" class="story">
						<!-- label -->
						<!-- <checkbox value="0" /> -->
						<view class="story-info">
							<view class="title">{{ item.name }}</view>
							<view class="album">{{ item.album }}</view>
						</view>
					</view>
					<view class="controller">
						<!-- 暂停 -->
						<image v-if="!paused && index == playing" @click="pause" src="../../static/music/pause.png" mode="aspectFit"></image>
						<image v-if="paused && index == playing" @click="pause" src="../../static/music/play.png" mode="aspectFit"></image>
						<!-- 收藏 -->
						<image @click="collecte(index, item.id)" v-if="item.status == 1" style="margin-left: 40upx;" src="../../static/music/collected.png" mode="aspectFit"></image>
						<image @click="collecte(index, item.id)" v-else style="margin-left: 40upx;" src="../../static/music/collect.png" mode="aspectFit"></image>
					</view>
				</view>
			</checkbox-group>
		</view>

		<!-- 底部音频控制器 -->
		<!-- 上方控制按钮  -->
		<view class="audio-controller">
			<view class="top">
				<view class="title">{{ playList[playing].name }}</view>
				<view class="controller-icon">
					<image @click="last_song" src="../../static/music/last.png" mode="aspectFit"></image>
					<image v-if="!paused" @click="pause" src="../../static/music/pause.png" mode="aspectFit"></image>
					<image v-else @click="pause" src="../../static/music/play.png" mode="aspectFit"></image>
					<image @click="next_song" src="../../static/music/next.png" mode="aspectFit"></image>
					<!-- <image @click="go_history" src="../../static/img/play-history.png" mode="aspectFit"></image> -->
				</view>
			</view>
			<!-- 下方进度条 -->
			<view class="bottom">
				<view class="progress-bar">
					<slider
						@touchstart="progress_touch_start"
						@change="progress_touch_end"
						blockSize="30"
						blockBgColor="#9a999b"
						bgColor="#f0edf1"
						activeColor="#4fa7df"
						:width="400"
						height="6"
						minDefault="0"
						:maxDefault="progress_max"
					></slider>
				</view>
				<view class="time">
					<text>{{ now }} / {{ duration }}</text>
					<image @click="loop" v-if="recycled" src="../../static/music/recycled.png" mode="aspectFits"></image>
					<image @click="loop" v-else src="../../static/music/recycle.png" mode="aspectFits"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import slider from '../../components/slider/slider.vue';
var that = null;
const innerAudioContext = uni.getBackgroundAudioManager();
innerAudioContext.autoplay = false;
export default {
	data() {
		return {
			id: '', //数据请求id
			paused: false,
			recycled: false,
			playing: 0,
			playList: [
				{
					id: 0,
					src: '#',
					name: 'I can do all things!',
					album: 'sc',
					status: 0
				},
				{
					id: 1,
					src: 'https://webfs.yun.kugou.com/202101111730/4f1b078b2eb8022172f4be5687714cc4/KGTX/CLTX001/d132e9663881d5f9a58ae2c53606bfb2.mp3',
					name: '说散就散',
					album: 'Nicky',
					status: 0
				},
				{
					id: 2,
					src: 'https://webfs.yun.kugou.com/202101111731/cceb1788324909c1cd73f7044c92cb97/G099/M02/1F/01/Q5QEAFkdMhuAfAXDACx6nrttR1s796.mp3',
					name: '南来北往',
					album: '花粥',
					status: 0
				},
				{
					id:3,
					name: '美丽的神话',
					album: '小眼鑫',
					src: 'https://webfs.yun.kugou.com/202101111730/77a9a1515ec578b9e5feb86f08a4cf11/KGTX/CLTX001/958d50fbb5cc7404f5d464663c761924.mp3',
					status: 0
				},
				{
					id:4,
					name: '踏山河',
					album: '是七叔呢',
					src: 'https://webfs.yun.kugou.com/202101111732/77e09ee26e1baf819dd87c2cd3a16c26/G239/M00/0D/04/j4cBAF-87BmAQpz0ACkRT30fEHU644.mp3',
					status: 0
				},
				{
					id:5,
					name: '你是人间四月天',
					album: '邵帅',
					src: 'https://webfs.yun.kugou.com/202101111734/1573db9880b8de135ea1731bfd35dd52/G221/M06/14/09/HQ4DAF8kF7OAfakQACuekunHv_Q428.mp3',
					status: 0
				},
				{
					id:6,
					name: '醒不来的梦',
					album: '回小仙',
					src: 'https://webfs.yun.kugou.com/202101111737/94a39cbc098ee1fb65827d158681f5c8/G234/M01/1F/19/ypQEAF9solOAFy9MADi7ZgAxc_0558.mp3',
					status: 0
				},
				{
					id:7,
					name: '说散就散',
					album: 'Nicky',
					src: 'https://webfs.yun.kugou.com/202101111738/4bbcb65e39a924d018d9bb06ab6c38b2/G237/M09/17/05/LQ4DAF-Y7p-ABxdmADinQVlNU6w285.mp3',
					status: 0
				},
				{
					id:8,
					name: '说散就散',
					album: '等什么君',
					src: 'https://webfs.yun.kugou.com/202101111736/2672d11e6b277bead19f1dd66ba486c4/G164/M02/19/09/hJQEAF1ou5aAVrTxADlcwhIMwfQ617.mp3',
					status: 0
				},
				{
					id:9,
					name: '白月光与朱砂痣',
					album: '大籽',
					src: 'https://webfs.yun.kugou.com/202101111739/e569738edd3577f29ddefffb86d88541/KGTX/CLTX001/eaa6565b38f2f39c7c3e3e31cf382925.mp3',
					status: 0
				}
			],
			now: '00:00',
			duration: '00:00',
			progress_max: 0
		};
	},
	watch: {
		// 监听播放列表的变化
		playing(val, odlVal) {
			let userInfo = uni.getStorageSync('userInfo');
			console.log('playing:', val);
			console.log('odlVal:', odlVal);
		}
	},
	onLoad(options) {
		that = this;
		innerAudioContext.autoplay = false;
		console.log(innerAudioContext.autoplay)
		innerAudioContext.onPlay(() => {
			uni.hideLoading();
		});
		innerAudioContext.onWaiting(function() {
			uni.showLoading({
				title: '正在加载'
			});
		});
		innerAudioContext.onCanplay(function() {
			uni.hideLoading();
		});
		innerAudioContext.onPrev(() => {
			that.last_song();
		});
		innerAudioContext.onNext(() => {
			that.next_song();
		});
		innerAudioContext.onError(res => {
			console.log(res.errMsg);
			console.log(res.errCode);
		});
		innerAudioContext.onTimeUpdate(() => {
			that.now = that.time_format(innerAudioContext.currentTime);
			that.duration = that.time_format(innerAudioContext.duration);
			that.progress_max = parseInt(100 * (innerAudioContext.currentTime / innerAudioContext.duration));
			// 在此可做试听限制，比如试听15s
			// if (parseInt(innerAudioContext.currentTime) > 15) {
			// 	innerAudioContext.pause();
			// 	innerAudioContext.destroy();
			// 	// 自定义提示
			// }
			// console.log(that.time_format(innerAudioContext.currentTime))
			// console.log(that.time_format(innerAudioContext.duration))
		});
		innerAudioContext.onSeeked(function() {
			innerAudioContext.play();
		});
		innerAudioContext.onPause(function() {
			that.paused = true;
		});
		innerAudioContext.onPlay(function() {
			that.paused = false;
		});
		innerAudioContext.onEnded(() => {
			console.log(':end');
			if (!that.recycled && that.playing < that.playList.length - 1) {
				that.playing++;
				innerAudioContext.src = that.playList[that.playing].src;
				innerAudioContext.title = that.playList[that.playing].name;
			} else if (that.recycled) {
				innerAudioContext.seek(0);
				innerAudioContext.src = that.playList[that.playing].src;
				innerAudioContext.title = that.playList[that.playing].name;
			} else if (!that.recycled && that.playing == that.playList.length - 1) {
				that.playing = 0;
				innerAudioContext.src = that.playList[that.playing].src;
				innerAudioContext.title = that.playList[that.playing].name;
			}
		});
	},
	onShow() {
		innerAudioContext.autoplay = false;
		innerAudioContext.src = that.playList[that.playing].src;
		innerAudioContext.title = that.playList[that.playing].name;
		// 保持屏幕常亮
		uni.setKeepScreenOn({
			keepScreenOn: true
		});
	},
	onHide() {
		console.log('hide:');
	},
	onUnload() {
		console.log('onUnload pause innerAudioContext');
	},
	components: {
		slider
	},
	methods: {
		//播放器控制相关
		last_song() {
			if (that.playing != 0) {
				that.playing--;
				innerAudioContext.src = that.playList[that.playing].src;
				innerAudioContext.title = that.playList[that.playing].name;
			}
		},
		next_song() {
			if (that.playing < that.playList.length - 1) {
				that.playing++;
				innerAudioContext.src = that.playList[that.playing].src;
				innerAudioContext.title = that.playList[that.playing].name;
			} else if (that.playing == that.playList.length - 1) {
				that.playing = 0;
				innerAudioContext.src = that.playList[that.playing].src;
				innerAudioContext.title = that.playList[that.playing].name;
				uni.pageScrollTo({
					scrollTop: 0
				});
			}else{
				console.log('do nothing ');
			}
		},
		pause() {
			if (innerAudioContext.paused) {
				innerAudioContext.play();
			} else {
				innerAudioContext.pause();
			}
		},
		loop() {
			// innerAudioContext.loop = !innerAudioContext.loop //loop属性为true时不会触发 onEnded()
			this.recycled = !that.recycled;
			if (that.recycled) {
				uni.showToast({
					icon: 'none',
					title: '开启循环'
				});
			}
		},
		go_history() {},
		// 进度条相关
		progress_touch_start() {
			innerAudioContext.pause();
		},
		progress_touch_end(percent) {
			console.log('num :>> ', percent.detail.__args__[0]);
			let s = (percent.detail.__args__[0] / 100) * innerAudioContext.duration;
			innerAudioContext.seek(parseInt(s));
		},
		// 业务逻辑
		change_item(index) {
			that.playing = index;
			innerAudioContext.src = that.playList[that.playing].src;
			innerAudioContext.title = that.playList[that.playing].name;
		},
		// 点赞
		collecte(index, id) {
			that.playList[index].status == 0 ? (that.playList[index].status = 1) : (that.playList[index].status = 0);
		},
		time_format(second) {
			let m = Math.floor((second / 60) % 60) < 10 ? '0' + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
			let s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);
			return `${m}:${s}`;
		}
	}
};
</script>

<style lang="scss">
.root {
	width: 100%;
}

.play-list-wrap {
	margin-bottom: 300upx;
}
.imgbox{
	width:80rpx ;
	height:80rpx ;
	
}
.list {
	width: 100%;

	.item {
		width: 96%;
		padding: 25upx 3%;
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #f0edf1;

		.all {
			font-size: 28upx;

			text {
				display: inline-block;
				margin-left: 15upx;
				font-size: 32upx;
				padding-top: 5upx;
			}
		}

		.delete {
			background: rgba(245, 49, 49, 1);
			border-radius: 8upx;
			padding: 5upx 15upx;
			color: #ffffff;
			font-size: 26upx;
		}

		.story {
			display: flex;
			width: 80%;
			checkbox {
				margin-top: 15upx;
			}

			.story-info {
				margin-left: 15upx;

				.title {
					font-size: 28upx;
					font-weight: 600;
				}

				.album {
					font-size: 24upx;
					margin-top: 5upx;
				}
			}
		}

		.controller {
			margin-top: 25upx;
			image {
				display: inline-block;
				width: 32upx;
				height: 32upx;
				margin-right: 20upx;
			}
		}
	}
}

.audio-controller {
	position: fixed;
	z-index: 999;
	width: 100%;
	background: #ffffff;
	bottom: 0upx;

	.top {
		display: flex;
		justify-content: space-between;

		.title {
			width: 57%;
			margin-left: 3%;
			font-size: 30upx;
		}

		.controller-icon {
			display: flex;
			justify-content: space-around;
			width: 40%;

			image {
				display: inline-block;
				height: 30upx;
				width: 30upx;
			}
		}
	}

	.bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.time {
			margin-top: 26upx;
			margin-right: 20upx;
			color: #808080;
			font-size: 28upx;
			display: flex;
			font-weight: 600;
			image {
				display: block;
				width: 30upx;
				height: 30upx;
				margin-left: 30upx;
				margin-top: 5upx;
			}
		}
	}
}
</style>
