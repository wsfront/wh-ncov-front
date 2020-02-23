<template>
  <div id="app">
    <header class="tips">
      <span v-if="lastUpdateTime">{{ lastUpdateTime }}更新; </span>
        数据至少两天更新一次
    </header>
    <router-view />
    <footer class="footer">
      <el-row :gutter="10" style="width: 100%;">
        <el-col :span="12">
          <a href="https://shimo.im/docs/5zAZVlQzEDc5FgAo">
            <img class="text-icon" src="@/assets/icon_atme.png" />
          </a>
        </el-col>
        <el-col :span="12">
          <a href="https://shimo.im/forms/XRkgJOZm4YCrFbqM/fill">
            <img class="text-icon" src="@/assets/icon_fb.png" />
          </a>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      lastUpdateTime: "",
      show: false
    };
  },
  created() {
    const lastUpdateTime = sessionStorage.getItem("lastUpdateTime");
    if (lastUpdateTime) {
      this.lastUpdateTime = lastUpdateTime;
    }
  },
  mounted() {
    this.$EventBus.$on("refreshUpdateTime", time => {
      sessionStorage.setItem("lastUpdateTime", time);
      this.lastUpdateTime = time;
    });
    let showLaunch = sessionStorage.getItem("isNoLaunch");
    if (!showLaunch) {
      sessionStorage.setItem("isNoLaunch", false)
    } else {
      sessionStorage.setItem("isNoLaunch", true)
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #fafafa;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background: #fafafa; */
  padding: 0 0 36px;
  /*margin-top: 60px;*/
}
.tips {
  height: 25px;
  line-height: 25px;
  border-bottom: 1px solid #e6e5e5;
  font-size: 10px;
  color: #acacac;
  box-sizing: border-box;
  background: white;
  width: 100%;
}
.footer {
  /* height: 36px;
  border-radius: 16px 16px 0 0; */
  /* background: white; */
  position: fixed;
  /* box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05); */
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 5px;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
}
.footer a {
  margin-bottom: 10px;
  padding: 8px 0;
  color: #acacac;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0 10px rgba(0, 0, 0, 0.1);
  display: block;
}
.footer a .text-icon {
  height: 18px;
}
.footer a:hover {
  cursor: pointer;
  color: #5887ff;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #e2e2e2;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #e2e2e2;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #e2e2e2;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #e2e2e2;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
