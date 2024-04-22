<template>
	<view class="container">
		<view class="head">
			<view class="address centered-text">南京市</view>
			<view class="info">
				<view class="tempture centered-text">{{nowWeatherData.temp}}°</view>
				<view class="middle centered-text">
					<text class="left">{{nowWeatherData.text}}</text>
					<text class="line"></text>
					<text class="right">{{nowAirQualityData.valueDisplay}} {{nowAirQualityData.category}}</text>
				</view>
				<view class="details centered-text">
					<text class="wind">风力 {{nowWeatherData.windScale}}</text>
					<text class="humidity">湿度 {{nowWeatherData.humidity}}</text>
					<text class="pressure">气压 {{nowWeatherData.pressure}}hpa</text>
				</view>
			</view>
		</view>
		<view class="today-and-tomorrow">
			<view class="today">
				<view class="top">
					<view class="left">今天</view>
					<view class="right">{{todayWeatherData.tempMax}}°/{{todayWeatherData.tempMin}}°</view>
				</view>
				<view class="bottom">
					<view class="left">{{todayWeatherData.textDay}}</view>
					<img class="right" :src="todayWeatherData.todayWeatherIconUrl"></img>
				</view>
			</view>
			<view class="line"></view>
			<view class="tomorrow">
				<view class="top">
					<view class="left">明天</view>
					<view class="right">{{tomorrowWeatherData.tempMax}}°/{{tomorrowWeatherData.tempMin}}°</view>
				</view>
				<view class="bottom">
					<view class="left">{{tomorrowWeatherData.textDay}}</view>
					<img class="right" :src="tomorrowWeatherData.tomorrowWeatherIconUrl"></img>
				</view>
			</view>
		</view>
		<view class="forecast-content">
			<view class="twenty-four-hours common-content">
				<view class="title">24小时预报</view>
				<scroll-view scroll-x="true" class="content" style="white-space: nowrap;">
					<view v-for="(item, index) in hourlyData" class="hour">
						<view class="time">{{item.hour}}</view>
						<img class="twenty-four-img" :src="item.hourlyWeatherIconUrl"></img>
						<view class="tempture">{{item.temp}}°</view>
					</view>
				</scroll-view>
			</view>
			<view class="fifteen-days common-content">
				<view class="title">7天预报</view>
				<scroll-view scroll-x="true" class="content" style="white-space: nowrap;">
					<view v-for="(item, index) in sevenWeatherData" class="day">
						<view class="date">{{item.date}}</view>
						<img class="fifteen-img" :src="item.dayWeatherDayIconUrl"></img>
						<view class="tempture">{{item.tempMax}}°~{{item.tempMin}}°</view>
						<img class="fifteen-img" :src="item.dayWeatherNightIconUrl"></img>
						<view class="weather">{{item.textDay}}</view>
						<view class="wind-direction">{{item.windDirDay}}</view>
						<view class="wind-level">{{item.windScaleDay}}级</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		nowWeather,
		dailyForecastForThreeDays,
		hourlyForecastForTwentyFourHours,
		dailyForecastForSevenDays
	} from '@/network/api/weather'

	import {
		nowAirQuality
	} from '@/network/api/air'

	export default {
		name: "weather",
		data() {
			return {
				nowAirQualityData: {},
				nowWeatherData: {},
				todayWeatherData: {},
				tomorrowWeatherData: {},
				hourlyData: [],
				sevenWeatherData: []
			}
		},
		created() {
			let location = '101010100'
			this.getNowData(location)
			this.getDailyForecastDataForThreeDays(location)
			this.getDailyForecastForSevenDays(location)
			this.getNowAirQuality(location)
			this.getHourlyForecastDataForTwentyFourHours(location)
		},
		methods: {
			getHourlyForecastDataForTwentyFourHours(location) {
				hourlyForecastForTwentyFourHours(location).then(res => {
					if (res.code === '200') {
						let hourlyArray = res.hourly

						hourlyArray.forEach(item => {
							let timeStr = item.fxTime
							let index = timeStr.indexOf('T')
							item.hour = timeStr.substring(index + 1, index + 6)
							item.hourlyWeatherIconUrl = '../../static/images/icons/' + item.icon + '.svg'
						})

						this.hourlyData = hourlyArray
					}
				})
			},
			getDailyForecastDataForThreeDays(location) {
				dailyForecastForThreeDays(location).then(res => {
					if (res.code === '200') {
						let todayData = res.daily[0]
						todayData.todayWeatherIconUrl = '../../static/images/icons/' + todayData.iconDay + '.svg'
						this.todayWeatherData = todayData

						let tomorrowData = res.daily[1]
						tomorrowData.tomorrowWeatherIconUrl = '../../static/images/icons/' + tomorrowData.iconDay + '.svg'
						this.tomorrowWeatherData = tomorrowData
					}
				})
			},
			getDailyForecastForSevenDays(location) {
				dailyForecastForSevenDays(location).then(res => {
					if (res.code === '200') {
						let sevenDaysArray = res.daily
						
						sevenDaysArray.forEach(item => {
							let timeStr = item.fxDate
							let index = timeStr.indexOf('-')
							item.date = timeStr.substring(index + 1)
							item.dayWeatherDayIconUrl = '../../static/images/icons/' + item.iconDay + '.svg'
							item.dayWeatherNightIconUrl = '../../static/images/icons/' + item.iconNight + '.svg'
						})
						
						this.sevenWeatherData = sevenDaysArray
						console.log(this.sevenWeatherData)
					}
				})
			},
			getNowData(location) {
				nowWeather(location).then(res => {
					if (res.code === '200') {
						this.nowWeatherData = res.now
					}
				})
			},
			getNowAirQuality(location) {
				nowAirQuality(location).then(res => {
					if (res.code === '200') {
						this.nowAirQualityData = res.aqi[1]
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial,
			Roboto, PingFang SC, Hiragino Sans GB, Microsoft Yahei, sans-serif;
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

	.today-and-tomorrow img {
		height: 20px;
	}

	.today-and-tomorrow .today,
	.tomorrow {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.today-and-tomorrow .top {
		margin-bottom: 15rpx;
	}

	.today-and-tomorrow .top,
	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.today-and-tomorrow .left {
		margin-left: 20rpx;
	}

	.today-and-tomorrow .right {
		margin-right: 20rpx;
	}

	.today-and-tomorrow .line {
		height: 80%;
		border: 1px solid #eaecee;
	}

	.forecast-content {
		padding: 20rpx 0rpx;
	}
	
	.forecast-content img {
		height: 20px;
	}

	.forecast-content .common-content {
		background-color: #fff;
		border-radius: .16rem;
		margin-bottom: 20rpx;
	}

	.forecast-content .common-content .title {
		padding: 18rpx;
		font-size: 18px;
		font-weight: 600;
	}

	.forecast-content .hour {
		display: inline-block;
		text-align: center;
		width: 126rpx;
		font-size: 15px;
	}
	
	.forecast-content .day {
		display: inline-block;
		text-align: center;
		width: 128rpx;
		font-size: 15px;
	}

	.forecast-content .time,
	.twenty-four-img,
	.fifteen-img,
	.week,
	.date,
	.tempture,
	.weather,
	.wind-direction,
	.wind-level {
		margin-bottom: 18rpx;
	}

	.forecast-content .twenty-four-hours, .fifteen-days .content {
		white-space: nowrap;
	}

	.forecast-content .fifteen-days .date,
	.tempture {
		font-size: 14px;
	}
</style>