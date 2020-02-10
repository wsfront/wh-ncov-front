<template>
  <div class="hospital-info-item">
     <div class="value" v-if="data=='否'">
        <i class="el-icon-warning" /> 不接收
     </div>
     <div class="value suc" v-if="data!='否'">
        <i class="el-icon-success" /> 接收
     </div>
    <div class="name">{{name}}</div>
  </div>
</template>
<script>
export default {
  props: ['data', 'name'],
  data () {
    return {

    }
  },
  mounted () {

  },

  computed: {

  }

}
</script>
<style scoped>
.hospital-info-item {
  display: flex;
  display: inline-block;
  justify-content: space-between;
  padding: 0 10px;
  height: 20px;
  border-radius: 10px;
  background: #ffce44;
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
</style>
