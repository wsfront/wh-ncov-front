<template>
  <div id="app">
    <header class="tips">
      数据至少两天更新一次
      <span v-if="lastUpdateTime">（{{ lastUpdateTime }}更新）</span>
    </header>
    <router-view />
    <footer></footer>
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
  padding-top: 25px;
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
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
