<template>
	<view class="container">
		<view class="search">
			<input class="input" @input="inputMethod" placeholder="请输入城市名" placeholder-class="search-placeholder"/>
			<view class="cancel" @click="cancelClick">取消</view>
		</view>
		<view class="line"></view>
		<view class="result" v-for="(item, index) in cityList">
			<view class="item" @click="cityClick(item)">{{item.address}}</view>
		</view>
	</view>
</template>

<script>
	import { addressToCoordinateAndAddressId } from '@/network/api/address'
	
	export default {
		name: "search",
		data() {
			return {
				value: '',
				cityList: []
			}
		},
		methods: {
			cancelClick() {
				uni.navigateBack({
					delta: 1
				})
			},
			inputMethod(e) {
				let address = e.detail.value
				this.getCoordinateAndAddressId(address)
			},
			getCoordinateAndAddressId(address) {
				addressToCoordinateAndAddressId(address).then(res => {
					if (res.code === '200') {
						let cityList = res.location
						
						cityList.forEach(item => {
							item.address = item.adm1 + ', ' + item.adm2 + ', ' + item.name
						})
						
						this.cityList = cityList
					}
				})
			},
			cityClick(cityObj) {
				uni.reLaunch({
					url: '/pages/weather/weather?addressId=' + cityObj.id + '&cityName=' + cityObj.adm2 + ' ' + cityObj.name
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
	}
	
	.search {
		display: flex;
		justify-content: space-between;
	  align-items: center;
		padding: 20rpx;
	}

	.search .input {
		flex: 0.95;
		min-height: 60rpx;
		background-color: #f2f2f2;
		border-radius: 10px;
	}
	
	.search-placeholder {
		margin-left: 16rpx;
	}
	
	.line {
		border: 1px solid #f2f2f2;
	}
	
	.result {
		padding: 0 26rpx;
		font-size: 14px;
	}
	
	.result .item {
		display: flex;
		align-items: center;
		height: 76rpx;
		border-bottom: 1px solid #e0e0e0;
	}
</style>