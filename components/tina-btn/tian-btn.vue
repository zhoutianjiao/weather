<!-- 自定义封装组件 -->
<template>
	<view>
		<button class="tiancss">按钮组件</button>
	</view>
</template>

<script>
	export default {
		name:'tianbtn',
		props:{},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.tiancss{width: 400px;height: 50px;background: pink;font-size: 20px;color: white;}
</style>
