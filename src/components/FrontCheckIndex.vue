<template>
  <div :class="['wh-container']">
    <div class="hearder-block">
      <HeaderLayout :activeIndex="1" />
    </div>
    <v-touch v-on:swipeup="handleNav('SumPrev')">
      <div class="launch-main">
        <div class="launch-poster">
          <img src="//ncp.qingclouds.cn/summer/bg_sumprev.jpg" alt="" class="bg"/>
          <div class="btns">
            <img
              @click.prevent="handleNav('SumPrev')"
              class="launch-btn"
              src="//ncp.qingclouds.cn/summer/btn_sumprev.png"
            />
            <img
              @click="handleNav('EpidemicManual')"
              class="launch-btn mt-10"
              src="//wuhan2099.oss-accelerate.aliyuncs.com/btn_epi.png"
            />
          </div>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script>
import HeaderLayout from './HeaderLayout'
import { wxShare } from '../common/mixins'

export default {
  name: 'FrontCheckIndex',
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {
      diyShareTitle: true,
      loading: true
    }
  },
  methods: {
    handleNav(route, selector = '') {
      this.$router.push({
        path: route,
        // params: { selector },
        query: { selector }
      })
    }
  },
  mounted() {
    ;[
      '//wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_01.jpg',
      '//wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_02.jpg',
      '//wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_03.jpg',
      '//wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_04.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_05.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_06.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev2/prev2_01.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev2/prev2_02.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev2/prev2_03.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev3/prev3_01.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev3/prev3_02.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev3/prev3_03.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev4/prev4_01.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev4/prev4_02.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev4/prev4_03.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_01.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_02.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_03.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_04.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_05.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_06.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev6/prev6_01.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev6/prev6_02.jpg',
      // '//wuhan2099.oss-accelerate.aliyuncs.com/prev6/prev6_03.jpg',
      '//ncp.qingclouds.cn/summer/sumprev_01.png',
      '//ncp.qingclouds.cn/summer/sumprev_02.png',
      '//ncp.qingclouds.cn/summer/sumprev1_01.png'
    ].forEach(url => {
      let imageDom = new Image()
      imageDom.src = url
    })
  }
}
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
  // top: 66px;
  width: 100%;
  height: calc(100vh - 69px);
  // background-image: url('//ncp.qingclouds.cn/summer/bg_sumprev.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #f8dff2;
  z-index: 2;
  overflow: hidden;
  position: relative;
}
.launch-poster {
  position: relative;
  .bg {
    width: 100%;
  }
}
.btns {
  position: absolute;
  top: 54%;
  text-align: right;
  padding-right: 3%;
}
.launch-btn {
  display: inline-block;
  width: 53%;
  &.mt-10 {
    margin-top: 1.5vh;
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
