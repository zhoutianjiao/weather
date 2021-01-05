<template>
	<view class="mian">
		<button class="btns">页面故障</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			
		},
		onShow(){
		},
		methods: {
	
		}
	}
</script>

<style lang="scss" scoped>
.mian {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F8F005;
}

button, button::after {
  width: 380rpx;
  height: 86rpx;
  font-size: 36rpx;
	font-weight: bold;
  background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3rpx;
  line-height: 88rpx;
  box-shadow: 6rpx 0rpx 0rpx #00E6F6;
  outline: transparent;
  position: relative;
}

button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6rpx 0 0);
  --slice-2: inset(50% -6rpx 30% 0);
  --slice-3: inset(10% -6rpx 85% 0);
  --slice-4: inset(40% -6rpx 43% 0);
  --slice-5: inset(80% -6rpx 5% 0);
  
  content: 'ERROR';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3rpx -3rpx 0rpx #F8F005, 3rpx 3rpx 0rpx #00E6F6;
  clip-path: var(--slice-0);
}

button::after {
  animation: 1s glitch; //������
  animation-timing-function: steps(1, end); // ��������
  animation-duration:1.8s;
  animation-iteration-count:infinite;//����ѭ��
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20rpx, -10rpx);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10rpx, 10rpx);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10rpx, 10rpx);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0rpx, 5rpx);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5rpx, 0rpx);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5rpx, 0rpx);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5rpx, 10rpx);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10rpx, 10rpx);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20rpx, -10rpx);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10rpx, 0rpx);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}
</style>
