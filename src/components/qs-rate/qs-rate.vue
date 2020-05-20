<template>
  <view class="qs-rate">
    <view class="qs-star-wrap"
          v-for="(item, index) in count"
          :key="index">
      <text :class="['cuIcon-favorfill',activeIndex > index ? activeIcon : inactiveIcon]"
            @click="click(index + 1, $event)"
            :color="activeIndex > index ? activeColor : inactiveColor"
            :style="{
                    fontSize: size + 'rpx',
                    padding: `0 ${gutter / 2 + 'rpx'}`
                }"></text>
    </view>
  </view>
</template>

<script>
/**
 * rate 评分
 * @event {Function} change 选中的星星发生变化时触发
 * @example <qs-rate :count="count" :current="2"></qs-rate>
 */
export default {
  name: "qs-rate",
  props: {
    // 要显示的星星数量
    count: {
      type: [Number, String],
      default: 5
    },
    // 当前需要默认选中的星星(选中的个数)
    current: {
      type: [Number, String],
      default: 0
    },
    // 是否不可选中
    disabled: {
      type: Boolean,
      default: false
    },
    // 星星的大小，单位rpx
    size: {
      type: [Number, String],
      default: 32
    },
    // 未选中时的颜色
    inactiveColor: {
      type: String,
      default: "#b2b2b2"
    },
    // 选中的颜色
    activeColor: {
      type: String,
      default: "#FA3534"
    },
    // 星星之间的间距，单位rpx
    gutter: {
      type: [Number, String],
      default: 10
    },
    // 最少能选择的星星个数
    minCount: {
      type: [Number, String],
      default: 0
    },
    // 是否允许半星(功能尚未实现)
    allowHalf: {
      type: Boolean,
      default: false
    },
    // 选中时的图标(星星)
    activeIcon: {
      type: String,
      default: "star-fill"
    },
    // 未选中时的图标(星星)
    inactiveIcon: {
      type: String,
      default: "star"
    }
  },
  data() {
    return {
      activeIndex: this.current, // 当前激活的星星的index
      starWidth: 0, // 每个星星的宽度
      starWidthArr: [] //每个星星最右边到组件盒子最左边的距离
    };
  },
  watch: {
    current(val) {
      this.activeIndex = val;
    }
  },
  methods: {
    // 通过点击，直接选中
    click(index, e) {
      if (this.disabled) {
        return;
      }
      // 半星选择，尚未实现
      if (this.allowHalf) {
      }
      // 对第一个星星特殊处理，只有一个的时候，点击可以取消，否则无法作0星评价
      if (index == 1) {
        if (this.activeIndex == 1) this.activeIndex = 0;
        else this.activeIndex = 1;
      } else {
        this.activeIndex = index;
      }
      // 对最少颗星星的限制
      if (this.activeIndex < this.minCount) this.activeIndex = this.minCount;
      this.$emit("change", this.activeIndex);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.qs-rate {
  display: -webkit-inline-flex;
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.qs-icon {
  box-sizing: border-box;
}
.star-fill{
    color: red;
}
.star{
    color: '#e6e6e6';
}
</style>
