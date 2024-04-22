import { request } from "@/network/request"

export const nowAirQuality = (location) => {
	return request({
		method: 'GET',
		url: '/air/now',
		params: {
			location: location
		}
	})
}