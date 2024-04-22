import { request } from "@/network/request"

export const nowWeather = (location) => {
	return request({
		method: 'GET',
		url: '/weather/now',
		params: {
			location: location
		}
	})
}

export const hourlyForecastForTwentyFourHours = (location) => {
	return request({
		method: 'GET',
		url: '/weather/24h',
		params: {
			location: location
		}
	})
}

export const dailyForecastForThreeDays = (location) => {
	return request({
		method: 'GET',
		url: '/weather/3d',
		params: {
			location: location
		}
	})
}

export const dailyForecastForSevenDays = (location) => {
	return request({
		method: 'GET',
		url: '/weather/7d',
		params: {
			location: location
		}
	})
}

export const dailyForecastForTenDays = (location) => {
	return request({
		method: 'GET',
		url: '/weather/10d',
		params: {
			location: location
		}
	})
}

export const dailyForecastForFifteenDays = (location) => {
	return request({
		method: 'GET',
		url: '/weather/15d',
		params: {
			location: location
		}
	})
}
