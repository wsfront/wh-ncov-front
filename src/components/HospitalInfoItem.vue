<template>
<div>
  <div class="hospital-info-item" v-if="name=='普通孕妇'">
     <div class="name">{{name}}</div>
     <div class="value" v-if="data=='否'">
       不接收 <i class="el-icon-error"/>
     </div>
     <div class="value suc" v-else-if="data='是'">
        可接收 <i class="el-icon-success"/>
     </div>
     <div class="value warn" v-else>
       {{itemStatus}}
     </div>
  </div>
   <div class="hospital-info-item" v-else>
     <div class="name">{{name}}</div>
     <div class="value" v-if="data=='否'">
       不接收 <i class="el-icon-error"/>
     </div>
     <div class="value suc" v-else-if="data=='是'">
        可做 <i class="el-icon-success"/>
     </div>
     <div class="value warn" v-else>
       {{itemStatus}} <i class="el-icon-warning"/>
     </div>
  </div>
</div>
</template>
<script>
export default {
  props: ["data", "name"],
  data() {
    return {};
  },
  computed: {
    itemStatus: function () {
      return this.data.includes('是,') ? this.data.replace('是,', ' ') : this.data
    }
  }
}
</script>
<style scoped>
.hospital-info-item {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 20px;
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
