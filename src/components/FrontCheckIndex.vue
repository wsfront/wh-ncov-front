<template>
  <div class="wh-container">
    <HeaderLayout :activeIndex="1" />
    <el-row class="wh-content-container">
      <el-col :span="24" class="wh-intro">
        <h3>发热孕妇确诊流程</h3>
        <p>
          因各个医院对确诊孕妇的就诊的规定不一，请根据以下流程来进
          行发热孕妇的确诊并获取相关资料。此流程根据1月X日XXX规定
          制作且仅确保适用于湖北省的疫情规范。其他省份请根据各自省
          份对新型冠状病毒的诊断标准进行确诊。
        </p>
      </el-col>
      <el-col :span="24">
        <el-collapse v-model="activeNames" class="wh-collapse">
          <el-collapse-item title="确诊流程图" name="1">
            <img width="100%" src="../assets/check-flow.png" />
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="24" class="wh-intro">
        <h3>疫期建议必查产检项目</h3>
        <p>
          疫情期为降低因出门而遭受病毒感染的可能，我们建议孕期
          妈妈们按下方的孕期表安排最低限度共五次的常规检查。每次产
          检由：常规产检、血检和以下特殊检查组成。
        </p>
      </el-col>

      <el-col :span="24">
        <el-collapse v-model="activeNames" class="wh-collapse">
          <el-collapse-item
            title="早孕期（6-8周）确定宫内妊娠，预约NT"
            name="2"
          >
            <p>建议36-37周检测。决定分娩方式和时间</p>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :span="24">
        <el-collapse v-model="activeNames" class="wh-collapse">
          <el-collapse-item title="早孕期（11-14周）建议在12周检测" name="3">
            <p>
              血常规、尿常规、B超、 NT、 无创DNA、甲状腺、传染病
              筛查、血型、凝血功能、生化全套
            </p>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :span="24">
        <el-collapse v-model="activeNames" class="wh-collapse">
          <el-collapse-item
            title="中孕期（20-28周）建议在24周检测。主要做大排"
            name="4"
          >
            <p>血常规、尿常规、唐氏、糖尿病筛查、B超大畸形排查、肝肾功能</p>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :span="24">
        <el-collapse v-model="activeNames" class="wh-collapse">
          <el-collapse-item
            title="晚孕期（30-41周）建议30-32周检测。主要做小排畸，根据
有无并发症再评估风险 "
            name="5"
          >
            <p>产科超声检查、NST检查、血常规、尿常规</p>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :span="24">
        <el-collapse v-model="activeNames" class="wh-collapse">
          <el-collapse-item
            title="晚孕期（30-41周）建议36-37周检测。决定分娩方式和时间"
            name="6"
          >
            <p>要查啥？</p>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
export default {
  name: "FrontCheckIndex",
  components: { HeaderLayout },
  data() {
    return {
      activeNames: [],
      activeName: "obstetricCheck"
    };
  },
  methods: {
    tabChange(activeNameParam) {
      let routerPath = "/";
      this.activeName = activeNameParam;
      switch (activeNameParam) {
        case "hospital":
          routerPath = "/FrontIndex";
          break;
        case "obstetricCheck":
          routerPath = "/FrontCheckIndex";
          break;
        default:
          break;
      }
      this.$router.push(routerPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wh-content-container {
  padding: 0 20px;
}
.wh-intro {
  text-align: left;
}
.wh-collapse {
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
.wh-content-container .el-col-24 {
  margin-bottom: 10px;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 5px 0;
}
.el-collapse-item__header {
  display: block;
  line-height: 24px;
  padding: 10px;
  height: 100%;
  text-align: left;
}
.el-collapse-item__content {
  text-align: left;
  padding: 0 10px;
  padding-bottom: 0px;
}
</style>
