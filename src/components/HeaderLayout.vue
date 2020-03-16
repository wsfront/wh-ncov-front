<template>
  <div class="tab-btn-con">
    <router-link class="tab-btn" :class="{ act: activeIndex === 0 }" to="/">
      医院信息
    </router-link>
    <router-link
      class="tab-btn"
      :class="{ act: activeIndex === 1 }"
      to="/FrontCheckIndex"
    >
      孕妇防疫
    </router-link>
    <router-link class="tab-btn" :class="{ act: activeIndex === 2}" to="/EaseHandbook">
     安心待产
    </router-link>
  </div>
</template>
<script>
export default {
  name: "HeaderLayout",
  props: {
    activeIndex: Number
  }
};
</script>

<style scoped lang="scss">
/* 新增样式 */
.tab-btn-con {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  border-bottom: 1px solid $--color-text-placeholder;
}
.tab-btn-con .tab-btn {
  font-size: 16px;
  font-weight: bold;
  color: #c1c5cd;
  margin: 2px 18px -2px 18px;
  padding-bottom: 8px;
  text-decoration: none;
}
.tab-btn.act {
  color: #5887ff;
  border-bottom: 2px solid #5887ff;
}
</style>
