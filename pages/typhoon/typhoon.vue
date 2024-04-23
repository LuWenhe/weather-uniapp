<!-- <template>
	<view class="web-view-container">
		<web-view :src="url" ></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//url: 'http://typhoon.nmc.cn/web.html',
				url: 'http://typhoon.nmc.cn/mobile.html',
			}
		},
		methods: {
			
		},
			
			

	}
</script>

<style>
	.web-view-container {
	  position: fixed;
	  top: -30rpx; /* 设置距离顶部的距离，单位可以根据需要进行调整 */
	  width: 100%;
	  height: 1300rpx;
	}
</style> -->


<template>
	<view>
		<web-view :src="url" ></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//url: 'http://typhoon.nmc.cn/web.html',
				url: 'https://tf.istrongcloud.com/release/index-fj.html?popularize=false&%23route=&from=timeline&isappinstalled=0',
			}
		},
		methods: {
			
		},
	}
</script>

<style>

</style>