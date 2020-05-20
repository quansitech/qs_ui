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
	.qs-container{
		width: 86%;
		margin: 0 auto;
	}
	.base-btn{
		margin-top: 10rpx;
	}
</style>
