<template>
  <div class="wh-container">
    <div class="block">
      <HeaderLayout :activeIndex="1" />
    </div>
    <div class="wh-tab">
      <div class="wh-tab-item" @click="activeIndex=0" :class="{ active: activeIndex === 0 }">发热孕妇确诊流程</div>
      <div class="wh-tab-item" @click="activeIndex=1" :class="{ active: activeIndex === 1 }">疫期建议必查产检项目</div>
    </div>
    <div class="block">
      <el-row class="wh-content-container" v-show="activeIndex === 0">
        <el-col :span="24" class="wh-intro">
          <!--<h3>发热孕妇确诊流程</h3>-->
          <p class="wh-intro-p">
            因各个医院对确诊孕妇的就诊的规定不一，请根据以下流程来进
            行发热孕妇的确诊并获取相关资料。此流程根据1月X日XXX规定
            制作且仅确保适用于湖北省的疫情规范。其他省份请根据各自省
            份对新型冠状病毒的诊断标准进行确诊。
          </p>
        </el-col>
        <el-col class="process-box">
          <div class="process-title">确诊流程图<span style="color: #666;padding-left: 4px;">(点击图片可放大)</span></div>
          <img @click="dialogShow=true" width="100%" src="@/assets/check-flow.png" />
        </el-col>
      </el-row>
      <div class="wh-content-container" v-show="activeIndex === 1">
        <div class="wh-intro">
          <!--<h3>疫期建议必查产检项目</h3>-->
          <p class="wh-intro-p">
            疫情期为降低因出门而遭受病毒感染的可能，我们建议孕期 妈妈们按下方的孕期表安排最低限度共五次的常规检查。每次产检由：常规产检、血检和以下特殊检查组成。<br/><br/>
          </p>
          <p class="wh-intro-p">
            这里的信息仅囊括最基础的产检项目，若诊断为高危产妇，请加强产检，与医生沟通来制定适合个人情况的治疗方案。
          </p>
        </div>
        <div style="height: 15px"></div>

        <div class="info-box">
          <div class="head">
            <span class="label">早孕期（6-8周）</span>
            <span class="title">确定宫内妊娠，预约NT</span>
          </div>
          <p class="content">血/尿HCG、彩超、 宫颈TCT + HPV</p>
        </div>

        <div class="info-box">
          <div class="head">
            <span class="label">早孕期（11-14周）</span>
            <span class="title">建议在12周检测</span>
          </div>
          <p class="content">血常规、尿常规、B超、 NT、 无创DNA、甲状腺、传染病筛查、血型、凝血功能、生化全套</p>
        </div>

        <div class="info-box">
          <div class="head">
            <span class="label">中孕期（20-28周）</span>
            <span class="title">建议在24周检测。主要做大排畸</span>
          </div>
          <p class="content">血常规、尿常规、唐氏、糖尿病筛查、B超大畸形排查、肝肾功能</p>
        </div>

        <div class="info-box">
          <div class="head">
            <span class="label">晚孕期（30-32周）</span>
            <span class="title">建议在32周检测。并发症再评估风险</span>
          </div>
          <p class="content">血常规、尿常规、小排畸超声、ICP筛查</p>
        </div>

        <div class="info-box">
          <div class="head">
            <span class="label">晚孕期（30-41周）</span>
            <span class="title">建议36-37周检测。决定分娩方式和时间</span>
          </div>
          <p class="content">产科超声检查、NST检查</p>
        </div>

      </div>
    </div>
    <div class="dialog" v-if="dialogShow" >
      <img @click="dialogShow=false" width="100%" src="@/assets/check-flow.png" />
    </div>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
export default {
  name: "FrontCheckIndex",
  components: { HeaderLayout },
  data() {
    return {
      activeIndex: 0,
      activeNames: [],
      dialogShow: false,
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
<style scoped>
.dialog{
  position: fixed;
  z-index: 99;
  padding: 10px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fafafa;
  overflow-x: hidden;
  overflow-y: scroll;
}
.info-box{
  padding: 0 15px;
  display: block;
  color: #2F3036;
  font-size: 12px;
  box-shadow: rgba(0,0,0,.1) 0 0 5px;
  margin-bottom: 10px;
}
.info-box .head{
  display: block;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F0F0F0;
  text-align: left;
}
.info-box .head .label{
  font-weight: bold;
  line-height: 20px;
  /*display: inline-block;*/
  margin: 0;
  padding: 0;
}
.info-box .head .title{
  line-height: 20px;
  /*display: inline-block;*/
}
.info-box .content{
  padding: 8px 0;
  margin: 0;
  text-align: left;
}
.block{
  padding: 10px 16px;
}
.wh-tab{
  display: flex;
  height: 36px;
  line-height: 36px;
  border-top:1px solid #E2E2E2;
  border-bottom: 5px solid #F0F0F0;
  font-size: 14px;
  padding: 0 -16px;
}
.wh-tab-item{
  flex: 1;
  text-align: center;
  color: #ACACAC;
}
.wh-tab-item.active{
  color: #5887FF;
}

.process-title{
  color: #2F3036;
  font-size: 12px;
  height: 36px;
  padding-left: 15px;
  line-height: 36px;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #F0F0F0;
}

.wh-content-container {
  padding: 0px;
}
.process-box{
  box-shadow: rgba(0,0,0,.1) 0 0 5px;
}
.wh-intro {
  text-align: left;
}
.wh-intro-p{
  margin: 10px 0;
  line-height: 20px;
  font-size: 14px;
  color: #2F3036;
}
.wh-collapse {
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
.wh-container {
  background: #fafafa;
  color: #333;

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
