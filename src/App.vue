<template>
  <div id="app">
    <div class="tips">
      数据至少两天更新一次
      <span v-if="lastUpdateTime">（{{ lastUpdateTime }}更新）</span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      lastUpdateTime: ""
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fafafa;
  /*margin-top: 60px;*/
}
.tips {
  height: 25px;
  line-height: 25px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(230, 229, 229, 1);
  opacity: 1;
  font-size: 10px;
  font-family: Source Han Sans;
  font-weight: 500;
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
</style>
