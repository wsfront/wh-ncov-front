<template>
  <div :class="['wh-container']">
    <div v-show="activeIndex === 0" class="hearder-block">
      <HeaderLayout :activeIndex="1" />
    </div>
    <v-touch v-on:swipeup="handleNav()">
      <div v-if="activeIndex === 0" class="launch-main">
        <img
          @click="handleNav()"
          class="launch-btn"
          src="http://wuhan2099.oss-accelerate.aliyuncs.com/btn_epi.png"
        />
        <img
          @click.prevent="handleNav('prev5_01')"
          class="launch-btn mt-10"
          src="http://wuhan2099.oss-accelerate.aliyuncs.com/btn_won.png"
        />
      </div>
    </v-touch>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
import { wxShare } from "../common/mixins";

export default {
  name: "FrontCheckIndex",
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {
      diyShareTitle: true,
      loading: true,
      activeIndex: 0
    };
  },
  methods: {
    handleNav(selector = "") {
      this.$router.push({
        path: "EpidemicManual",
        // params: { selector },
        query: { selector }
      });
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.block /deep/ .el-drawer:focus {
  outline: none;
}
.hearder-block {
  margin: 10px 0 0;
}
.wh-container {
  position: relative;
  height: calc(100vh - 82px);
  color: #333;
  &.full {
    height: 100vh;
  }
}
.launch-main {
  top: 66px;
  width: 100%;
  height: calc(100vh - 69px);
  background-image: url("http://wuhan2099.oss-accelerate.aliyuncs.com/bg_antie.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #d9f1fb;
  z-index: 2;
}
.launch-btn {
  width: 64%;
  margin-top: 50vh;
  &.mt-10 {
    margin-top: 3vh;
  }
}
.block {
  height: 100%;
  background: #faf1fa;
  box-sizing: border-box;
  overflow-y: scroll;
  .el-drawer:focus {
    box-shadow: none;
  }
}

</style>
