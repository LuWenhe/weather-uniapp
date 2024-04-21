<template>
	<view class="container">
		<view class="head">
			<view class="address centered-text">南京市</view>
			<view class="info">
				<view class="tempture centered-text">19°</view>
				<view class="middle centered-text">
					<text class="left">多云</text>
					<text class="line"></text>
					<text class="right">93 良</text>
				</view>
				<view class="details centered-text">
					<text class="wind">风力 2级</text>
					<text class="humidity">湿度 67%</text>
					<text class="pressure">气压 1003hpa</text>
				</view>
			</view>
		</view>
		<view class="today-and-tomorrow">
			<view class="today">
				<view class="top">
					<view class="left">今天</view>
					<view class="right">22°/15°</view>
				</view>
				<view class="bottom">
					<view class="left">雾转阴</view>
					<view class="right">图片</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="tomorrow">
				<view class="top">
					<view class="left">明天</view>
					<view class="right">21°/9°</view>
				</view>
				<view class="bottom">
					<view class="left">阴转多云</view>
					<view class="right">图片</view>
				</view>
			</view>
		</view>
		<view class="forecast-content">
			<view class="twenty-four-hours common-content">
				<view class="title">24小时预报</view>
				<view class="content">
					<view class="hour">
						<view class="time">现在</view>
						<view class="twenty-four-img">图片</view>
						<view class="tempture">18°</view>
					</view>
					<view class="hour">
						<view class="time">23:00</view>
						<view class="twenty-four-img">图片</view>
						<view class="tempture">18°</view>
					</view>
				</view>
			</view>
			<view class="fifteen-days common-content">
				<view class="title">15天预报</view>
				<view class="content">
					<view class="day">
						<view class="week">今天</view>
						<view class="date">04/16</view>
						<view class="fifteen-img">图片1</view>
						<view class="tempture">32°/26°</view>
						<view class="fifteen-img">图片2</view>
						<view class="weather">晴</view>
						<view class="wind-direction">北风</view>
						<view class="wind-level">1级</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"weather",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, Hiragino Sans GB, Microsoft Yahei, sans-serif;
		background-color: #eef1f4;
	}
	
	.head {
		display: flex;
		flex-direction: column;
		background: url('@/static/images/weather/background.png') no-repeat;
		background-size: 100%;
		height: 1000rpx;
		color: #fff;
	}
	
	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	
	.centered-text {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.head .address {
		font-size: 16px;
		height: 60rpx;
	}
	
	.head .tempture {
		font-size: 120px;
		font-weight: 100;
	}
	
	.head .middle {
		height: 50rpx;
		font-size: 20px;
	}
	
	.head .middle .left {
		margin-right: 30rpx;
	}
	
	.head .middle .right {
		margin-left: 30rpx;
	}
	
	.head .middle .line {
		height: 40%;
		border: 0.5px solid #fff;
	}
	
	.head .details {
		height: 80rpx;
		font-size: 16px;
	}
	
	.head .details .humidity {
		margin: 0 20rpx;
	}
	
	.today-and-tomorrow {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150rpx;
		background-color: #fff;
	}
	
	.today-and-tomorrow .today, .tomorrow {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	
	.today-and-tomorrow .top {
		margin-bottom: 15rpx;
	}
	
	.today-and-tomorrow .top, .bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.today-and-tomorrow .left {
		margin-left: 18rpx;
	}
	
	.today-and-tomorrow .right {
		margin-right: 18rpx;
	}
	
	.today-and-tomorrow .line {
		height: 80%;
		border: 1px solid #eaecee;
	}
	
	.forecast-content {
		padding: 25rpx 0rpx;
	}
	
	.forecast-content .common-content {
		background-color: #fff;
		border-radius: .16rem;
		margin-bottom: 20rpx;
	}
	
	.forecast-content .common-content .title {
		padding: 16rpx;
		font-size: 18px;
	}
	
	.forecast-content .content {
		display: flex;
		align-items: center;
	}
	
	.forecast-content .content .hour, .day {
		display: flex;
		flex-direction: column;
		width: 120rpx;
		align-items: center;
		font-size: 15px;
	}
	
	.forecast-content .content .time, .twenty-four-img, .fifteen-img, .week, .date, .tempture, 
	.weather, .wind-direction, .wind-level {
		margin-bottom: 14rpx;
	}
	
	.forecast-content .fifteen-days .date, .tempture {
		font-size: 14px;
	}
</style>