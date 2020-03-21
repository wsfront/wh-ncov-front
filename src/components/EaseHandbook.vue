<template>
  <div :class="['wh-container']">
    <div class="hearder-block">
      <HeaderLayout :activeIndex="2" />
    </div>
    <v-touch v-on:swipeup="handleNav">
      <div class="launch-main">
        <img
          @click="handleNav"
          class="launch-btn"
          src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease_button.png"
        />
      </div>
    </v-touch>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
import { wxShare } from "../common/mixins";
import Info from "./info";

export default {
  name: "EaseHandbook",
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {};
  },
  methods: {
    handleNav() {
      this.$router.push("WaitManual");
    }
  },
  mounted() {},
  beforeCreate() {
    this.$nextTick(() => {
      Info.$emit("frameDisplay", true);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.block /deep/ .el-drawer:focus {
  outline: none;
}
.block /deep/ .el-backtop {
  color: $--color-easy-main;
}
.block .el-icon-caret-right {
  color: $--color-easy-main;
}
.block .el-icon-caret-bottom {
  color: $--color-easy-main;
  display: none;
}
.block .icon {
  width: 16px;
  height: 16px;
}
.wh-container {
  position: relative;
  height: calc(100vh - 82px);
  color: #333;
}

.hearder-block {
  margin: 10px 0 0;
}

.arrow_icon_right {
  color: #2aa9ae;
  width: 8.5px;
  height: 10px;
  margin: 5px 12px 0 12px;
}
.arrow_icon_down {
  display: none;
  width: 8.5px;
  height: 10px;
  margin: 5px 12px 0 12px;
}

.launch-main {
  top: 66px;
  width: 100%;
  height: calc(100vh - 69px);
  background-image: url("http://wuhan2099.oss-accelerate.aliyuncs.com/ease_cover.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: $--color-easy;
  z-index: 2;
}
.launch-btn {
  width: 64%;
  margin-top: 60vh;
  &.mt-10 {
    margin-top: 3vh;
  }
}
img[lazy="loading"] {
  width: 32px;
  margin: 0 auto;
}
</style>
