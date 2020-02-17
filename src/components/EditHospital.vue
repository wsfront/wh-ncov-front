<template>
  <div class="info-wrapper">
    <el-form
      label-position="left"
      label-width="100px"
      size="small"
    >
      <el-form-item  v-for="item in info" :key="item.key" :label="item.name" class="form-title">

        <el-switch
        v-if="item.type==='switch'"
        v-model="item.value"
        :disabled="readonly"
        active-color="#13ce66"
        inactive-color="#ff4949">
        </el-switch>

        <el-input
         v-else-if="item.type==='textarea'"
         type="textarea"
         :disabled="readonly"
         :autosize="{ minRows: 2, maxRows: 8}"
        v-model="item.value">
        </el-input>

        <div v-else-if="item.type==='special'"
           v-for="phone in item.value"
           :key="phone.id">
          <el-input
          :disabled="readonly"
          v-model="phone.department">
          </el-input>
          <el-input
          :disabled="readonly"
          v-model="phone.phone">
          </el-input>
        </div>

        <el-input
          v-else
          v-model="item.value"
          :disabled="readonly"
        ></el-input>

      </el-form-item>
    </el-form>
    <div>
      <div v-if="readonly">
        <el-button @click="goToList">返回</el-button>
        <el-button @click="goEdit">编辑</el-button>
      </div>
      <div v-else>
        <el-button @click="goCancel">取消</el-button>
        <el-button @click="goSave">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    //   console.log('ddd',this)
    return {
      info: [
        {
          type: "switch",
          key: "verify",
          name: "已核实",
          value: ''
        },
        {
          type: "accept",
          key: "receive_normal",
          name: "普通孕妇",
          value: ''
        },
        {
          type: "accept",
          key: "receive_sick",
          name: "疑似/确诊孕妇",
          value: ''
        },
        {
          type: "check",
          key: "receive_normal_check",
          name: "常规产检",
          value: ''
        },
        {
          type: "check",
          key: "receive_ultrasound",
          name: "孕期产检B超",
          value: ''
        },
        {
          type: "check",
          key: "receive_clour_ultrasound",
          name: "中孕期三维排畸彩超（大排畸）",
          value: ''
        },
        {
          type: "check",
          key: "receive_accouche",
          name: "接生",
          value: ''
        },
        {
          type: "other",
          key: "receive_check",
          name: "核酸检测",
          value: ''
        },
        {
          type: "textarea",
          key: "remark",
          name: "补充说明",
          value: ''
        },
        {
          type: "base",
          key: "area",
          name: "地区",
          value: ''
        },
        {
          type: "textarea",
          key: "address",
          name: "地址",
          value: ''
        },

        {
          type: "special",
          key: "phones",
          name: "电话",
          value: [
            {
              department: "院办",
              id: 1,
              phone: "027-84918001"
            }
          ]
        }
      ],
      readonly: true
    };
  },
  methods: {
    goToList() {
      this.$emit("back");
    },
    goEdit() {
      console.log(this.info)
      this.readonly = false;
    },
    goCancel() {
      Object.assign(this.info, this.current);
      this.readonly = true;
    },
    goSave() { },
    updateData(v) {
      this.info.forEach(item => {
        item.value = v[item.key]
      })
    }
  }
};
</script>
<style lang="scss">
.info-wrapper /deep/.el-form-item--small{
  padding:0 10px;
}
</style>
