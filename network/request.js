import config from '@/config'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams} from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl

export function request(config) {
	// 是否需要设置 token
	config.header = {
		'content-Type': 'application/json'
	}

	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}

	return new Promise((resolve, reject) => {
		uni.request({
				method: config.method || 'get',
				timeout: config.timeout || timeout,
				url: config.baseUrl || baseUrl + config.url,
				data: config.data,
				header: config.header,
				dataType: 'json'
			}).then(response => {
				let code = response.data.code
				let msg = errorCode[code] || response.errMsg
				
				if (code != 200 && code != 204) {
					toast(msg)
					reject(code)
				}
				
				resolve(response.data)
			}).catch(error => {
				let { message } = error
				
				if (message === 'Network Error') {
					message = '后端接口连接异常'
				} else if (message.includes('timeout')) {
					message = '系统接口请求超时'
				} else if (message.includes('Request failed with status code')) {
					message = '系统接口' + message.substr(message.length - 3) + '异常'
				}
				toast(message)
				reject(error)
			})
	})
}