<template>
  <div>
    <div class="hospital-info-item">
      <div class="name">{{ name }}</div>
      <div :class="data | parentTrans">
        {{ data | wordTrans(name) }} <i :class="data | iconTrans" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data", "name"],
  filters: {
    wordTrans(value, name) {
      let isNormal = name.indexOf("孕妇") > -1;
      let dataWord = "";
      switch (value) {
        case "是":
          dataWord = isNormal ? "接收" : "可做";
          break;
        case "否":
          dataWord = isNormal ? "不接收" : "不可做";
          break;
        default:
          dataWord = value.substr(2);
          break;
      }
      return dataWord;
    },
    iconTrans(value) {
      let dataIcon = "";
      switch (value) {
        case "是":
          dataIcon = "el-icon-success";
          break;
        case "否":
          dataIcon = "el-icon-error";
          break;
        default:
          dataIcon = "el-icon-warning";
          break;
      }
      return dataIcon;
    },
    parentTrans(value) {
      let dataColor = "value";
      switch (value) {
        case "是":
          dataColor = "value suc";
          break;
        case "否":
          dataColor = "value";
          break;
        default:
          dataColor = "value warn";
          break;
      }
      return dataColor;
    }
  },
  computed: {}
};
</script>
<style scoped>
.hospital-info-item {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 10px;
  /* background: #ffce44; */
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 2px;
  margin-bottom: 2px;
}
.hospital-info-item .name {
  display: inline-block;
  height: 17px;
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: 500;
  line-height: 17px;
  color: rgba(47, 48, 54, 1);
  opacity: 1;
}

.hospital-info-item .value {
  display: inline-block;
  height: 17px;
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 17px;
  color: rgba(221, 57, 57, 1);
  opacity: 1;
}
.hospital-info-item .value.suc {
  color: rgba(53, 198, 85, 1);
}
.hospital-info-item .value.warn {
  color: #ee9611;
}
</style>
