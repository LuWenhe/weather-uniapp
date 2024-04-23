<template>
	<view class="container">
		<view class="head">
			<view class="address centered-text" @click="selectAddress">
				<img src="../../static/images/location.svg"></img>
				<view>{{currentAddressName}}</view>
			</view>
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
		<view class="living-index">
			<view class="title">生活指数</view>
			<swiper circular indicator-dots="true" :style="{'height': swiperHeight + 'px'}" :current="currentIndex"
				@change="changeSwiper">
				<swiper-item>
					<view class="content">
						<view class="item" v-for="(item, index) in livingIndexFirstSwipter">
							<img :src="item.livingIndexIconUrl"></img>
							<view>{{item.category}}</view>
							<view class="name">{{item.name}}</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="content">
						<view class="item" v-for="(item, index) in livingIndexSecondSwipter">
							<img :src="item.livingIndexIconUrl"></img>
							<view>{{item.category}}</view>
							<view>{{item.name}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
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
	import {
		livingIndex
	} from '@/network/api/living'

	export default {
		name: "weather",
		data() {
			return {
				nowAirQualityData: {},
				nowWeatherData: {},
				todayWeatherData: {},
				tomorrowWeatherData: {},
				hourlyData: [],
				sevenWeatherData: [],
				livingIndexFirstSwipter: [],
				livingIndexSecondSwipter: [],
				currentIndex: 0,
				swiperHeight: 200,
				currentAddressId: '101010100',
				currentAddressName: '北京'
			}
		},
		onLoad(args) {		
			//动态设置swiper的高度
			this.$nextTick(() => {
				this.setSwiperHeight()
			})
			
			if (Object.keys(args).length != 0) {
				this.currentAddressId = args.addressId
				this.currentAddressName = args.cityName
			}
			
			let location = this.currentAddressId
			
			this.getNowData(location)
			this.getDailyForecastDataForThreeDays(location)
			this.getDailyForecastForSevenDays(location)
			this.getNowAirQuality(location)
			this.getHourlyForecastDataForTwentyFourHours(location)
			this.getLivingIndexData(location)
		},
		methods: {
			selectAddress() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			getHourlyForecastDataForTwentyFourHours(location) {
				hourlyForecastForTwentyFourHours(location).then(res => {
					if (res.code === '200') {
						let hourlyArray = res.hourly

						hourlyArray.forEach(item => {
							let timeStr = item.fxTime
							let index = timeStr.indexOf('T')
							item.hour = timeStr.substring(index + 1, index + 6)
							item.hourlyWeatherIconUrl = '../../static/images/weather/' + item.icon + '.svg'
						})

						this.hourlyData = hourlyArray
					}
				})
			},
			getDailyForecastDataForThreeDays(location) {
				dailyForecastForThreeDays(location).then(res => {
					if (res.code === '200') {
						let todayData = res.daily[0]
						todayData.todayWeatherIconUrl = '../../static/images/weather/' + todayData.iconDay + '.svg'
						this.todayWeatherData = todayData

						let tomorrowData = res.daily[1]
						tomorrowData.tomorrowWeatherIconUrl = '../../static/images/weather/' + tomorrowData.iconDay + '.svg'
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
							item.dayWeatherDayIconUrl = '../../static/images/weather/' + item.iconDay + '.svg'
							item.dayWeatherNightIconUrl = '../../static/images/weather/' + item.iconNight + '.svg'
						})

						this.sevenWeatherData = sevenDaysArray
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
			},
			getLivingIndexData(location) {
				livingIndex(location).then(res => {
					if (res.code === '200') {
						let dailyArray = res.daily
						let firstSwipter = [],
							secondSwipter = []

						dailyArray.forEach(item => {
							if (item.type <= 8) {
								firstSwipter.push(item)
							} else {
								secondSwipter.push(item)
							}

							item.livingIndexIconUrl = '../../static/images/living/' + item.type + '.svg'
							item.name = item.name.slice(0, -2)
						})

						this.livingIndexFirstSwipter = firstSwipter
						this.livingIndexSecondSwipter = secondSwipter
					}
				})
			},
			//手动切换题目
			changeSwiper(e) {
				this.currentIndex = e.detail.current
				//动态设置swiper的高度，使用nextTick延时设置
				this.$nextTick(() => {
					this.setSwiperHeight()
				})
			},
			//动态设置swiper的高度
			setSwiperHeight() {
				let element = "#content-wrap" + this.currentIndex
				let query = uni.createSelectorQuery().in(this)
				query.select(element).boundingClientRect()
				query.exec((res) => {
					if (res && res[0]) {
						this.swiperHeight = res[0].height
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

	.head .address img {
		height: 14px;
		margin-right: 10rpx;
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
		height: 160rpx;
		background-color: #fff;
	}

	.today-and-tomorrow img {
		height: 28px;
	}

	.today-and-tomorrow .today,
	.tomorrow {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.today-and-tomorrow .top {
		margin-bottom: 12rpx;
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
		height: 26px;
	}

	.forecast-content .common-content {
		background-color: #fff;
		border-radius: .16rem;
	}

	.forecast-content .common-content .title {
		padding: 18rpx;
		font-size: 18px;
		font-weight: 600;
	}

	.forecast-content .twenty-four-hours {
		margin-bottom: 20rpx;
	}

	.living-index {
		background-color: #fff;
		border-radius: .16rem;
		margin-bottom: 11px;
	}

	.living-index .title {
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

	.forecast-content .twenty-four-hours,
	.fifteen-days .content {
		white-space: nowrap;
	}

	.forecast-content .fifteen-days .date,
	.tempture {
		font-size: 14px;
	}

	.living-index .content {
		display: flex;
		flex-wrap: wrap;
		/* 允许子元素换行 */
		justify-content: space-between;
		/* 子元素在父容器中平均分布 */
		width: 100%;
		/* 适当设置宽度 */
		height: auto;
		/* 或者适当设置高度 */
		text-align: center;
		font-size: 14px;
	}

	.living-index .content .name {
		color: #999;
	}

	.living-index .content .item {
		flex-basis: calc(25% - 20px);
		/* 计算每个子元素的基础宽度，减去间距 */
		margin: 15rpx;
		/* 适当设置间距 */
	}

	.living-index img {
		height: 26px;
		margin-bottom: 10rpx;
	}
</style>