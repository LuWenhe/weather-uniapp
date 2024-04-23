import { request } from "@/network/request"

export const livingIndex = (location) => {
	return request({
		method: 'GET',
		url: '/living/today',
		params: {
			location: location
		}
	})
}