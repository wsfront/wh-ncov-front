<template>
  <div class="info-wrapper">
    <el-form label-position="left" label-width="180px" size="small">
      <el-form-item
        v-for="item in info"
        :key="item.key"
        :label="item.name"
        class="form-title"
      >
        <el-switch
          v-if="item.type === 'switch'"
          v-model="item.value"
          :disabled="readonly"
          active-color="#13ce66"
          inactive-color="#ff4949"
          style="float:right"
        >
        </el-switch>

        <el-input
          v-else-if="item.type === 'textarea'"
          type="textarea"
          :disabled="readonly"
          :autosize="{ minRows: 2, maxRows: 8 }"
          v-model="item.value"
        >
        </el-input>

        <el-select
          v-else-if="item.type === 'base'"
          :disabled="readonly"
          v-model="item.value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <div
          v-else-if="item.type === 'special'"
          v-for="phone in item.value"
          :key="phone.id"
        >
          <el-input :disabled="readonly" v-model="phone.department"> </el-input>
          <el-input :disabled="readonly" v-model="phone.phone"> </el-input>
        </div>

        <el-input v-else v-model="item.value" :disabled="readonly"> </el-input>
      </el-form-item>
    </el-form>
    <div>
      <div v-if="readonly">
        <el-button @click="goToList" class="cancel-btn">返回列表</el-button>
        <el-button @click="goEdit" class="save-btn">编辑</el-button>
      </div>
      <div v-else>
        <el-button @click="goCancel" class="cancel-btn">取消</el-button>
        <el-button @click="goSave" :disabled="saveBtn" class="save-btn"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      info: [
        {
          type: "switch",
          key: "verify",
          name: "已核实",
          value: ""
        },
        {
          type: "accept",
          key: "receive_normal",
          name: "普通孕妇",
          value: ""
        },
        {
          type: "accept",
          key: "receive_sick",
          name: "疑似/确诊孕妇",
          value: ""
        },
        {
          type: "check",
          key: "receive_normal_check",
          name: "常规产检",
          value: ""
        },
        {
          type: "check",
          key: "receive_ultrasound",
          name: "孕期产检B超",
          value: ""
        },
        {
          type: "check",
          key: "receive_accouche",
          name: "接生",
          value: ""
        },
        {
          type: "check",
          key: "receive_clour_ultrasound",
          name: "中孕期三维排畸彩超（大排畸）",
          value: ""
        },
        {
          type: "check",
          key: "dna",
          name: "无创 DNA",
          value: ""
        },
        {
          type: "check",
          key: "puncture",
          name: "羊水穿刺",
          value: ""
        },
        {
          type: "other",
          key: "receive_check",
          name: "核酸检测",
          value: ""
        },
        {
          type: "textarea",
          key: "remark",
          name: "补充说明",
          value: ""
        },
        {
          type: "base",
          key: "area",
          name: "地区",
          value: ""
        },
        {
          type: "textarea",
          key: "address",
          name: "地址",
          value: ""
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
      readonly: true,
      saveBtn: false,
      originData: null,
      options: [
        {
          value: "江岸区"
        },
        {
          value: "江汉区"
        },
        {
          value: "硚口区"
        },
        {
          value: "汉阳区"
        },
        {
          value: "武昌区"
        },
        {
          value: "青山区"
        },
        {
          value: "洪山区"
        },
        {
          value: "蔡甸区"
        },
        {
          value: "江夏区"
        },
        {
          value: "黄陂区"
        },
        {
          value: "新洲区"
        },
        {
          value: "东西湖区"
        },
        {
          value: "汉南区"
        },
        {
          value: "东湖高新技术开发区"
        },
        {
          value: "经济技术开发区"
        },
        {
          value: "临空港开发区"
        }
      ]
    };
  },
  methods: {
    goToList() {
      this.$emit("back");
    },
    goEdit() {
      this.readonly = false;
    },
    goCancel() {
      Object.assign(this.info, this.originData);
      this.readonly = true;
    },
    async goSave() {
      this.saveBtn = true;
      let { hospitalData, phoneData } = this.dataHandle();
      await this.sendData(2, hospitalData);
      await this.sendData(1, phoneData);
      this.saveBtn = false;
      this.readonly = true;
      this.$emit("back");
    },
    sendData(type, data) {
      let params = Object.assign(data, { type });
      this.$http
        .post("/wh/admin/manage?", params, {
          headers: { "access-token": this.token }
        })
        .then(function(response) {
          if (response.data.code === "0000") {
            console.log(response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    dataHandle() {
      let [type, isPhoneChange, isHospitalChange, phoneData, hospitalData] = [
        0,
        false,
        false,
        {},
        {}
      ]; // eslint-disable-line no-unused-vars
      console.log(type, isPhoneChange);
      this.info.forEach(item => {
        switch (item.key) {
          case "verify":
            let value = item.value ? 1 : 0;
            isHospitalChange =
              this.originData["verify"] === value ? isHospitalChange : true;
            hospitalData = Object.assign(hospitalData, { verify: value });
            break;
          case "phones":
            // isPhoneChange = this.originData["phones"] === item.value ? isPhoneChange : true
            phoneData = Object.assign(phoneData, { phone_list: item.value });
            break;
          default:
            isHospitalChange =
              this.originData[item.key] === item.value
                ? isHospitalChange
                : true;
            hospitalData = Object.assign(hospitalData, {
              [item.key]: item.value
            });
        }
      });
      hospitalData = Object.assign(hospitalData, {
        id: this.originData.id,
        name: this.originData.name
      });
      return { hospitalData, phoneData };
    },
    updateData(v) {
      this.originData = Object.assign({}, v);
      this.info.forEach(item => {
        switch (item.key) {
          case "verify":
            item.value = v[item.key] === 1;
            break;
          default:
            item.value = v[item.key];
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.info-wrapper /deep/.el-form-item--small {
  padding: 0 20px;
}
.info-wrapper .el-form {
  padding-top: 10px;
}
.info-wrapper /deep/ .el-form-item__label {
  font-size: 12px;
  font-weight: bold;
}
.el-form-item--small,
.el-form-item__label {
  line-height: 17px;
}
.el-form-item /deep/ .el-input,
.el-form-item__content,
.el-input__inner {
  height: 24px;
}
.el-form-item--small .el-form-item__label {
  line-height: 24px;
}
.el-form-item /deep/ .el-input__inner {
  height: 24px;
  border: 1px solid rgba(193, 197, 205, 1);
  border-radius: 2px;
  padding: 0 10px;
  font-size: 12px;
}
.el-form-item /deep/ .el-textarea__inner {
  border: 1px solid rgba(193, 197, 205, 1);
  border-radius: 2px;
  padding: 5px 10px;
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 2px;
}
.info-wrapper /deep/ .el-input__icon {
  line-height: 24px;
}
.info-wrapper /deep/ .el-select {
  color: #acacac;
}
.cancel-btn {
  width: 50%;
  height: 31px;
  border: 1px solid rgba(112, 112, 112, 1);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 2px 0px 0px 2px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 7px;
  color: rgba(47, 48, 54, 1);
  margin-right: 0;
  margin-top: 20px;
}
.save-btn {
  width: 50%;
  height: 31px;
  border: 1px solid #5887ff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 2px 0px 0px 2px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 7px;
  color: #5887ff;
  margin-left: 0;
}
.info-wrapper /deep/ .el-input.is-disabled .el-input__inner {
  color: #acacac;
}
.info-wrapper /deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #acacac;
}
.info-wrapper /deep/ .el-input__inner::-webkit-input-placeholder {
  color: #acacac;
}
.info-wrapper /deep/ .el-input__inner::-moz-placeholder {
  color: #acacac;
}
.info-wrapper /deep/ .el-input__inner::-ms-input-placeholder {
  color: #acacac;
}
.info-wrapper /deep/ input:focus {
  border-color: #5887ff;
  color: #5887ff;
}
.info-wrapper /deep/ textarea:focus {
  border-color: #5887ff;
  color: #5887ff;
}
</style>
