<template>
  <div :class="['wh-container', { 'full': activeIndex !== 0 }]">
    <div v-show="activeIndex === 0" class="hearder-block">
      <HeaderLayout :activeIndex="1" @click="removeEvent"/>
    </div>
    <v-touch v-on:swipeup="handleNav('prev1_01')">
      <div v-if="activeIndex === 0" class="launch-main">
        <img @click="handleNav('prev1_01')" class="launch-btn" src="http://wuhan2099.oss-accelerate.aliyuncs.com/btn_epi.png" />
        <img @click="handleNav('prev5_01')" class="launch-btn mt-10" src="http://wuhan2099.oss-accelerate.aliyuncs.com/btn_won.png" />
      </div>
    </v-touch>
    <div v-show="activeIndex !== 0" class="block">
      <div @click="backHome" class="el-backtop" style="top: 30px; left: 20px;"><i class="el-icon-s-home"></i>
      </div>
      <div v-if="!isShow"
        @click="isShow = true" class="catalog-btn"
        ><i class="el-icon-s-fold"></i>
        <span class="catalog-btn-text">目录</span>
      </div>
      <el-drawer
        :visible.sync="isShow"
        size="64%"
        :with-header="false">
        <div class="catalog">
          <div class="catalog-header">
            孕妇防疫手册
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
                  class="catalog-ul-body">
                  <li
                    v-for="citem in item.children"
                    :key="citem.code"
                    :class="['catalog-item', { 'active': activeCode === citem.code }]"
                  >
                    <span @click="goAnchor(citem.code)">{{ citem.name }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </el-drawer>
      <div class="booklet">
        <el-backtop target=".booklet" :right="20" :bottom="40"></el-backtop>
        <div id="prev1_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_01.jpg" />
        </div>
        <div id="prev1_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_02.jpg" />
        </div>
        <div id="prev1_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_03.jpg" />
        </div>
        <div id="prev1_04" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_04.jpg" />
        </div>
        <div id="prev1_05" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_05.jpg" />
        </div>
        <div id="prev1_06" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev1/prev1_06.jpg" />
          <a class="goto" href="http://yf.shcnwl.cn/"></a>
        </div>

        <div id="prev2_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev2/prev2_01.jpg" />
        </div>
        <div id="prev2_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev2/prev2_02.jpg" />
        </div>
        <div id="prev2_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev2/prev2_03.jpg" />
        </div>

        <div id="prev3_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev3/prev3_01.jpg" />
        </div>
        <div id="prev3_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev3/prev3_02.jpg" />
        </div>
        <div id="prev3_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev3/prev3_03.jpg" />
          <a class="findme" href="https://weibo.com/ncplifecare"></a>
        </div>

        <div id="prev4_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev4/prev4_01.jpg" />
        </div>
        <div id="prev4_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev4/prev4_02.jpg" />
        </div>
        <div id="prev4_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev4/prev4_03.jpg" />
        </div>

        <div id="prev5_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_01.jpg" />
        </div>
        <div id="prev5_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_02.jpg" />
        </div>
        <div id="prev5_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_03.jpg" />
        </div>
        <div id="prev5_04" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_04.jpg" />
        </div>
        <div id="prev5_05" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_05.jpg" />
        </div>
        <div id="prev5_06" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev5/prev5_06.jpg" />
        </div>

        <div id="prev6_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev6/prev6_01.jpg" />
        </div>
        <div id="prev6_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev6/prev6_02.jpg" />
          <a class="get-more" href="https://weibo.com/u/6892480749"></a>
        </div>
        <div id="prev6_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/prev6/prev6_03.jpg" />
        </div>
      </div>
    </div>
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
      activeIndex: 0,
      isShow: false,
      activeCode: "prev1_01",
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
          code: "prev6_01",
          name: "参考来源"
        },
        {
          code: "prev6_02",
          name: "手册制作团队"
        },
        {
          code: "prev6_03",
          name: "版权声明"
        }
      ]
    };
  },
  methods: {
    handleNav(selector) {
      document.documentElement.scrollTop = 0;
      if (!selector) {
        this.backHome();
      }
      this.activeIndex = selector;
      this.goAnchor(selector);
    },
    backHome() {
      window.scrollTo(0, 0);
      let currentHistory = this.$router.history.current;
      if (
        currentHistory.path === "/FrontCheckIndex" &&
        !currentHistory.query.hasOwnProperty("preid")
      ) {
        console.log("same");
      } else {
        this.$router
          .push({
            path: "/FrontCheckIndex",
            query: {} // preid: undefined
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.activeIndex = 0;
      this.activeCode = false;
    },
    goAnchor(selector) {
      this.isShow = false;
      let currentHistory = this.$router.history.current;
      if (
        currentHistory.path === "/FrontCheckIndex" &&
        currentHistory.query.hasOwnProperty("preid") &&
        currentHistory.query.preid === selector
      ) {
        console.log("same");
      } else {
        this.$router
          .push({
            path: "/FrontCheckIndex",
            query: { preid: selector }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.activeCode = selector;
    },
    removeEvent() {
      let that = this;
      window.removeEventListener(
        "hashchange",
        that.handleHash.bind(that, event),
        false
      );
    },
    handleHash(event) {
      let selector = this.$route.query.preid;
      let currentHistory = this.$router.history.current;
      if (currentHistory.path === "/FrontCheckIndex") {
        if (selector) {
          this.handleNav(selector);
        } else {
          this.backHome();
        }
      }
    }
  },
  mounted() {
    let that = this;
    that.handleHash();
    window.addEventListener(
      "hashchange",
      that.handleHash.bind(that, event),
      false
    );
  },
  beforeCreate() {
    localStorage.setItem("activeCode", null);
  },
  beforeDestroy() {
    this.removeEvent();
  },
  updated() {
    let that = this;
    let targetImg = that.$el.querySelector("#" + that.activeCode + " img");
    let targetPosition = that.$el.querySelector("#" + that.activeCode);
    if (!that.activeCode) {
      return;
    }
    if (that.isShow) {
      return;
    }
    if (that.activeCode === localStorage.getItem("activeCode")) {
      return;
    }

    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
      if (targetImg.complete && targetImg.src.indexOf(that.activeCode) > -1) {
        targetPosition.scrollIntoView();
        // store current postion if there is no catelog operation
        localStorage.setItem("activeCode", that.activeCode);
      }
    });
    targetImg.onload = function() {
      targetPosition.scrollIntoView();
      localStorage.setItem("activeCode", that.activeCode);
    };
  }
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
    position: fixed;
    top: 50%;
    margin-top: -30px;
    right: 0;
    background-color: #fff;
    width: 80px;
    height: 40px;
    border-radius: 20px 0 0 20px;
    color: $--color-primary;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 20px;
    -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 5;
  }
  &-btn-text {
    font-size: 14px;
    color: $--color-primary;
    font-weight: 500;
    padding-left: 5px;
  }
  &-header {
    line-height: 56px;
    border-bottom: 1px solid #e6e5e5;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    padding-left: 20px;
    color: $--color-primary;
    span {
      float: right;
    }
  }
  &-main {
    height: calc(100vh - 55px);
    box-sizing: border-box;
    overflow-y: scroll;
  }
  &-body {
    margin: 0 0 30px;
    padding: 0;
    text-align: left;
    list-style: none;
  }
  &-ul-body {
    padding: 0;
    .active {
      font-weight: bold;
      color: white;
      background-color: $--color-primary;
    }
  }
  &-item {
    line-height: 36px;
    text-decoration: none;
    list-style: none;
    span {
      padding-left: 52px;
    }
  }
  &-title {
    margin-top: 10px;
    padding-left: 20px !important;
    font-weight: bold;
    font-size: 16px;
    color: $--color-primary;
    display: block;
  }
}
@media screen and (max-width: 350px){
  .catalog{
    &-title {
      font-size: 15px;
    }
  }
}
.booklet {
  height: 100%;
  -webkit-overflow-scrolling : touch;
  overflow-y: scroll;
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
img[lazy="loading"] {
  width: 32px;
  margin: 0 auto;
}
</style>
