<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	@import url("./static/styles/main.less");
	@import url("./static/styles/icon.less");
	.base-btn{
		margin-top: 10rpx;
	}
</style>
