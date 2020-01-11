<template>
  <view class="content">
    <image
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578746313414&di=4aa98525db13a4e1a6ab6b82d40d2b6f&imgtype=0&src=http%3A%2F%2Fimages1.6zcool.com%2Fpic%2Fbe8ea8d3542b4465f27714d4f248d28f-0.jpg"
    />
	<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578762530549&di=a71e0c35f3b859be96da6bd3d7fcdde2&imgtype=0&src=http%3A%2F%2Fimages4.fanpop.com%2Fimage%2Fphotos%2F18500000%2FMinato-naruto-shippuuden-18553277-1280-720.jpg"/>
    <saveImage
      :isTempDir="false"
      :fileUrl="['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578746313414&di=4aa98525db13a4e1a6ab6b82d40d2b6f&imgtype=0&src=http%3A%2F%2Fimages1.6zcool.com%2Fpic%2Fbe8ea8d3542b4465f27714d4f248d28f-0.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578762530549&di=a71e0c35f3b859be96da6bd3d7fcdde2&imgtype=0&src=http%3A%2F%2Fimages4.fanpop.com%2Fimage%2Fphotos%2F18500000%2FMinato-naruto-shippuuden-18553277-1280-720.jpg']"
	  customClass="bgBlue"
    ></saveImage>
    <button @click="openSetting">打开设置</button>
  </view>
</template>

<script>
import saveImage from "../../components/save-image/save-image.vue";
export default {
  components: {
    saveImage
  },
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {},
  methods: {
    getAuthCode() {
      my.getAuthCode({
        scopes: "auth_user",
        success: ({ authCode }) => {
          my.alert({
            content: authCode
          });
        }
      });
	},
	openSetting: function() {
      uni.openSetting({
        success: set => {
          console.log(set);
        },
        fail: error => {
          console.log(error);
        }
      });
    }
  }
};
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
.bgBlue{
	background-color: blue;
}
</style>
