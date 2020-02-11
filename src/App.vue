<template>
  <div id="app">
    <header class="tips">
      <span v-if="lastUpdateTime">{{ lastUpdateTime }}更新; </span>
        数据至少两天更新一次
    </header>
    <router-view />
    <footer class="footer">
      <a href="https://shimo.im/docs/5zAZVlQzEDc5FgAo">关于我们</a>
      <a href="https://shimo.im/forms/XRkgJOZm4YCrFbqM/fill">反馈意见</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      lastUpdateTime: "",
      show: false
    };
  },
  mounted() {
    this.$EventBus.$on("refreshUpdateTime", time => {
      this.lastUpdateTime = time;
    });
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fafafa;
  padding: 0 0 25px;
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
  height: 25px;
  border-radius: 16px 16px 0 0;
  background: white;
  position: fixed;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer a {
  padding: 6px 40px;
  color: #333;
  text-decoration: none;
  font-size: 12px;
  font-weight: bold;
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
