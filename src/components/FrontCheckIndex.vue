<template>
  <div class="wh-container">
    <div v-show="activeIndex === 0" class="hearder-block">
      <HeaderLayout :activeIndex="1" />
    </div>
    <div v-if="activeIndex === 0" class="launch-main">
      <img @click="handleNav('prev1_01')" class="launch-btn" src="@/assets/btn_epi.png" />
      <img @click="handleNav('prev5_01')" class="launch-btn mt-10" src="@/assets/btn_won.png" />
    </div>
    <div v-show="activeIndex !== 0" class="block">
      <img @click="backHome" class="home-btn" src="@/assets/btn_home.png" />
      <img
        v-if="!isShow"
        @click="isShow = true"
        class="catalog-btn"
        src="@/assets/prev_catalog.png" />
      <el-drawer
        :visible.sync="isShow"
        size="64%"
        :with-header="false">
        <div class="catalog">
          <div class="catalog-header">
            <h2>孕妇防疫手册</h2>
            <span @click="goAnchor('prev1_01')">回到顶部<i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="catalog-main">
            <ul class="catalog-body">
              <li
                v-for="item in catalogs"
                :key="item.code"
                class="catalog-item mt-6">
                <span
                  @click="goAnchor(item.code)"
                  :class="['catalog-title', { 'active': activeCode === item.code }]">{{ item.name }}</span>
                <ul
                  v-if="item.children && item.children.length"
                  class="catalog-body">
                  <li
                    v-for="citem in item.children"
                    :key="citem.code"
                    :class="['catalog-item', { 'active': activeCode === citem.code }]"
                    style="padding-left: 40px;">
                    <span @click="goAnchor(citem.code)">{{ citem.name }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </el-drawer>
      <div class="booklet">
        <div id="prev1_01" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev1/prev1_01.jpg'" />
        </div>
        <div id="prev1_02" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev1/prev1_02.jpg'" />
        </div>
        <div id="prev1_03" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev1/prev1_03.jpg'" />
        </div>
        <div id="prev1_04" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev1/prev1_04.jpg'" />
        </div>
        <div id="prev1_05" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev1/prev1_05.jpg'" />
        </div>
        <div id="prev1_06" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev1/prev1_06.jpg'" />
          <a class="goto" href="http://yf.shcnwl.cn/"></a>
        </div>

        <div id="prev2_01" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev2/prev2_01.jpg'" />
        </div>
        <div id="prev2_02" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev2/prev2_02.jpg'" />
        </div>
        <div id="prev2_03" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev2/prev2_03.jpg'" />
        </div>

        <div id="prev3_01" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev3/prev3_01.jpg'" />
        </div>
        <div id="prev3_02" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev3/prev3_02.jpg'" />
        </div>
        <div id="prev3_03" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev3/prev3_03.jpg'" />
          <a class="findme" href="https://weibo.com/ncplifecare"></a>
        </div>

        <div id="prev4_01" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev4/prev4_01.jpg'" />
        </div>
        <div id="prev4_02" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev4/prev4_02.jpg'" />
        </div>
        <div id="prev4_03" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev4/prev4_03.jpg'" />
        </div>

        <div id="prev5_01" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev5/prev5_01.jpg'" />
        </div>
        <div id="prev5_02" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev5/prev5_02.jpg'" />
        </div>
        <div id="prev5_03" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev5/prev5_03.jpg'" />
        </div>
        <div id="prev5_04" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev5/prev5_04.jpg'" />
        </div>
        <div id="prev5_05" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev5/prev5_05.jpg'" />
        </div>
        <div id="prev5_06" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev5/prev5_06.jpg'" />
        </div>

        <div id="prev6_ref" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev6/prev6_ref.jpg'" />
        </div>
        <div id="prev6_team" class="booklet-item">
          <img class="booklet-img" v-lazy="'/static/img/prev6/prev6_team.jpg'" />
          <a class="get-more" href="https://weibo.com/u/6892480749"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
import {wxShare} from "../common/mixins";

export default {
  name: "FrontCheckIndex",
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {
      loading: true,
      activeIndex: 0,
      isShow: false,
      activeCode: 'prev1_01',
      catalogs: [
        {
          code: "prev1_01",
          name: "一、产前防疫",
          children: [
            { code: "prev1_02", name: "01 产检频率" },
            { code: "prev1_05", name: "02 产检防护" },
            { code: "prev1_06", name: "03 武汉孕妇就诊指南" }
          ]
        },
        {
          code: "prev2_01",
          name: "二、产后防疫",
          children: [
            { code: "prev2_02", name: "01 产后发热" },
            { code: "prev2_03", name: "02 母乳喂养" }
          ]
        },
        {
          code: "prev3_01",
          name: "三、心理抗疫",
          children: [
            { code: "prev3_02", name: "01 识别症状" },
            { code: "prev3_03", name: "02 缓解方式" }
          ]
        },
        {
          code: "prev4_01",
          name: "四、宝宝防疫",
          children: [
            { code: "prev4_02", name: "01 新生儿隔离" },
            { code: "prev4_03", name: "02 宝宝防护和用品清洁" }
          ]
        },
        {
          code: "prev5_01",
          name: "五、疑似/感染孕产妇须知",
          children: [
            { code: "prev5_02", name: "01 胸部CT检查" },
            { code: "prev5_03", name: "02 接诊医院" },
            { code: "prev5_04", name: "03 用药须知" },
            { code: "prev5_05", name: "04 感染康复后" },
            { code: "prev5_06", name: "05 宝宝隔离" }
          ]
        },
        {
          code: "prev6_ref",
          name: "参考来源"
        },
        {
          code: "prev6_team",
          name: "手册制作团队"
        }
      ]
    };
  },
  methods: {
    handleNav(selector) {
      this.activeIndex = selector;
      this.goAnchor(selector);
    },
    backHome() {
      window.scrollTo(0, 0);
      this.activeIndex = 0;
    },
    goAnchor(selector) {
      this.isShow = false;
      this.activeCode = selector;
      this.$el.querySelector('#' + selector).scrollIntoView();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hearder-block {
  margin: 10px 0 0;
}
.wh-container {
  position: relative;
  height: calc(100vh - 82px);
  color: #333;
}
.launch-main {
  position: fixed;
  top: 66px;
  width: 100%;
  height: calc(100vh - 69px);
  background-image: url("/static/img/bg_antie.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #fff;
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
.home-btn {
  position: fixed;
  width: 60px;
  top: 30px;
  left: 10px;
  z-index: 1;
}
.catalog {
  font-size: 14px;
  color: #2f3036;
  &-btn {
    height: 60px;
    position: fixed;
    top: 50%;
    margin-top: -30px;
    right: 0;
    z-index: 1;
  }
  &-header {
    height: 64px;
    position: relative;
    border-bottom: 1px solid #e6e5e5;
    h2 {
      position: absolute;
      left: 20px;
      font-size: 24px;
      color: #453cd3;
    }
    span {
      position: absolute;
      top: 50%;
      margin-top: -7px;
      right: 10px;
    }
  }
  &-main {
    height: calc(100vh - 44px);
    padding: 10px 0 14px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  &-body {
    margin: 0;
    padding: 0;
    text-align: left;
    list-style: none;
    .active {
      font-weight: bold;
      background-color: rgba(0, 0, 0, .08);
    }
  }
  &-item {
    line-height: 40px;
  }
  &-title {
    margin-top: 15px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #453cd3;
    display: block;
  }
}
.booklet {
  position: relative;
  &-img {
    width: 100%;
    display: block;
  }
  &-item {
    position: relative;
  }
}
.goto {
  width: 26.5%;
  height: 5%;
  position: absolute;
  top: 38.7%;
  left: 37.5%;
  display: block;
}
.findme {
  width: 32.25%;
  height: 2.35%;
  position: absolute;
  left: 14%;
  bottom: 8.35%;
  display: block;
}
.get-more {
  width: 32.2%;
  height: 4.5%;
  position: absolute;
  right: 13.5%;
  bottom: 17%;
  display: block;
}
img[lazy=loading] {
  width: 50px;
  margin: 0 auto;
}
</style>
