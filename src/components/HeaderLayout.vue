<template>
  <div>
    <div class="tips">
      <span v-if="lastUpdateTime">{{ lastUpdateTime }}更新;</span
      >数据至少两天更新一次
    </div>
    <div class="tab-btn-con">
      <router-link class="tab-btn" :class="{ act: activeIndex === 0 }" to="/">
        医院信息
      </router-link>
      <router-link
        class="tab-btn"
        :class="{ act: activeIndex === 1 }"
        to="/FrontCheckIndex"
      >
        疫期产检
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderLayout",
  props: {
    activeIndex: Number,
    lastUpdateTime: String
  }
};
</script>

<style scoped>
/* 新增样式 */

.tips {
  font-size: 12px;
}
.tab-btn-con {
  margin-top: 10px;
  width: 100%;
  height: 37px;
  display: flex;
  justify-content: space-around;
  align-items: top;
  padding: 0 40px;
  box-sizing: border-box;
}
.tab-btn-con .tab-btn {
  height: 26px;
  font-size: 18px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 26px;
  color: rgba(193, 197, 205, 1);
  opacity: 1;
  padding: 0 15px;
  position: relative;
  text-decoration: none;
}
.tab-btn.act {
  color: #5887ff;
}
.tab-btn.act::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 34px;
  height: 4px;
  background: rgba(88, 135, 255, 1);
  opacity: 1;
  border-radius: 5px;
}
</style>
