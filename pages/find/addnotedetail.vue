<!--修改或查看详情-->
<template>
	<view class="consts">
		<view class="titbox">
			<view class="uni-form-item uni-column inputed">
				<view class="title">输入标题</view>
				<input class="uni-input" maxlength="10" placeholder="请输入您的标题" />
			</view>
		</view>
		<view class="contbox">
			<view>编辑文章</view>
			<view>
				 <view class="uni-textarea">
					 <textarea  placeholder="请输入您的内容"/>
				 </view>
			 </view>
		</view>
		<view class="btnbox" @click="preservation">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			preservation(){
				console.log(this.titles)
				console.log(this.contents)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F8F8F8;
}
.consts{}
.titbox{
	width: 95%;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius:10px ;
	margin-top: 20px;
}
.title{
	font-size: 17px;
	border-bottom: 1px s;
}
.uni-input{
	height: 40px;
}
.contbox{
	width: 95%;
	margin: 0 auto;
	margin-top: 10px;
	border-radius:10px ;
	background-color: #ffffff;
}
.btnbox{
	width: 70px;
	height: 35px;
	background-color: #409EFF;
	border-radius: 9px;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	font-weight: 600;
	margin-top: 30px;
}
</style>

