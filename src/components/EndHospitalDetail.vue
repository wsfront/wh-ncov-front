<template>
<el-container>
  <el-main>
    <el-row>
      <el-col :span="1"><router-link :to="{name: 'EndIndex', params: {type: params }}" style="line-height: 1.5em;"><i class="el-icon-arrow-left"></i></router-link></el-col>
      <el-col :span="20" style="margin-left: 1%;">{{ params.name }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24" align="left">医院情况</el-col>
    </el-row>
    <div class="hospital-info">
      <el-row>
        <el-col :span="12" align="left">接收正常的孕妇</el-col>
        <el-col :span="12" align="right">{{ params.receive_normal }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">可接收疑似/确诊孕妇</el-col>
        <el-col :span="12" align="right">{{ params.receive_sick }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">可做常规产检</el-col>
        <el-col :span="12" align="right">{{ params.receive_normal_check }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">可做孕期产检B超</el-col>
        <el-col :span="12" align="right">{{ params.receive_ultrasound }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">可做中孕期三维排畸彩超（大排畸）</el-col>
        <el-col :span="12" align="right">{{ params.receive_clour_ultrasound }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">可接生</el-col>
        <el-col :span="12" align="right">{{ params.receive_accouche }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">可做核酸检测</el-col>
        <el-col :span="12" align="right">{{ params.receive_check }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">核实情况</el-col>
        <el-col :span="12" align="right" v-if="params.verify == 1">已核实</el-col>
        <el-col :span="12" align="right" v-else>待核实</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">补充说明</el-col>
        <el-col :span="12" align="right">{{ params.remark }}</el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="24" align="left" style="margin-top: 3%;">医院信息</el-col>
    </el-row>
    <div class="hospital-info">
      <el-row>
        <el-col :span="12" align="left">地区</el-col>
        <el-col :span="12" align="left">{{ params.area }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">地址</el-col>
        <el-col :span="12" align="left">{{ params.address }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">电话</el-col>
        <el-col :span="12" align="left"><span v-for="phone in phones" v-bind:key="phone.id">{{ phone.department}}:{{ phone.phone }}<br/></span></el-col>
      </el-row>
    </div>
  </el-main>
  <el-footer><el-button type="primary" plain><router-link :to="{name: 'EndHospitalEdit', params: {'hospital': params }}" style="text-decoration-line: none;color: #409EFF;">编辑</router-link></el-button></el-footer>
</el-container>
</template>

<script>
export default {
  name: 'EndDetail',
  data () {
    return {
      params: {},
      phones: ''
    }
  },
  methods: {
  },
  created () {
    this.params = this.$route.params.hospital
    let that = this
    this.$http.get('/wh/msg/phone?uuid=' + this.params.uuid)
      .then(function (response) {
        console.log(response)
        if (response.data.code === '0000') {
          that.phones = response.data.result
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .hospital-info{
    background-color: #efefef;
    padding: 3px 5px;
    border-radius: 5px;
  }
  .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px 10px;
  }
</style>
