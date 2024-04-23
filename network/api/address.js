import { request } from "@/network/request"

export const addressToCoordinateAndAddressId = (address) => {
	return request({
		method: 'GET',
		url: '/address/addressToCoordinate',
		params: {
			address: address
		}
	})
}
