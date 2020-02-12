<template>
<el-container>
  <el-main>
    <el-row>
      <el-col :span="1"><router-link :to="{name: 'EndHospitalDetail', params: {'hospital': params }}" style="line-height: 1.5em;"><i class="el-icon-arrow-left"></i></router-link></el-col>
      <el-col :span="20" style="margin-left: 1%;">{{ params.name }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24" align="left">医院情况</el-col>
    </el-row>
    <el-row class="bg-purple-light hospital-detail-info">
      <el-col :span="16" align="left">接收普通孕妇</el-col>
      <el-col :span="8">
        <el-select v-model="receive_normal" placeholder="请选择">
          <el-option
            v-for="item in normalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="16" align="left">可接收疑似/确诊孕妇</el-col>
      <el-col :span="8">
        <el-select v-model="receive_sick" placeholder="请选择">
          <el-option
            v-for="item in sickOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="16" align="left">可做常规产检</el-col>
      <el-col :span="8">
        <el-select v-model="receive_normal_check" placeholder="请选择">
          <el-option
            v-for="item in normalCheckOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="16" align="left">可做孕期产检B超</el-col>
      <el-col :span="8">
        <el-select v-model="receive_ultrasound" placeholder="请选择">
          <el-option
            v-for="item in ultrasoundOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="16" align="left">可做中孕期三维排畸彩超(大排畸)</el-col>
      <el-col :span="8">
        <el-select v-model="receive_clour_ultrasound" placeholder="请选择">
          <el-option
            v-for="item in colorUltrasoundOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="16" align="left">可接生临产孕妇</el-col>
      <el-col :span="8">
        <el-select v-model="receive_accouche" placeholder="请选择">
          <el-option
            v-for="item in accoucheOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="14" align="left">可做核酸检测</el-col>
      <el-col :span="10">
        <el-select v-model="receive_check" placeholder="请选择">
          <el-option
            v-for="item in dnaCheckOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" align="left">补充说明</el-col>
      <el-col :span="18" align="left">
        <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" style="text-align: left;">核实情况</el-col>
        <el-col :span="8" align="left">
        <el-select v-model="verify" placeholder="请选择">
          <el-option
            v-for="item in commonOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="left">医院信息</el-col>
    </el-row>
    <el-row class="bg-purple-light hospital-detail-info">
      <el-row>
        <el-col :span="12" align="left">地区</el-col>
        <el-col :span="12" align="left">蔡甸区</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">地址</el-col>
        <el-col :span="12" align="left">武汉市蔡甸区成功大道111号</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" align="left">电话</el-col>
        <el-col :span="12" align="left">027-83081308（转妇产科分机650521）<br/>027-83897808（产科）</el-col>
      </el-row>
    </el-row>
  </el-main>
  <el-footer><el-button v-on:click="savedata" type="primary" plain>保存</el-button></el-footer>
 </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EndHospitalEdit',
  data () {
    return {
      activeName: 'hospital',
      restaurants: [],
      state: '',
      timeout: null,
      radio1: '全部',
      textarea: '',
      params: '',
      commonOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }],
      normalOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '只收红破水及紧急情况',
        label: '只收红破水及紧急情况'
      }],
      dnaCheckOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '排队送检或其他',
        label: '排队送检或其他'
      }],
      normalCheckOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '其他',
        label: '其他'
      }],
      ultrasoundOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '需预约或其他',
        label: '需预约或其他'
      }],
      accoucheOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '只收红破水及紧急情况',
        label: '只收红破水及紧急情况'
      }],
      colorUltrasoundOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '需预约或其他',
        label: '需预约或其他'
      }],
      sickOptions: [{
        value: '是',
        label: '是'
      }, {
        value: '否',
        label: '否'
      }, {
        value: '只收疑似',
        label: '只收疑似'
      }, {
        value: '只收确诊',
        label: '只收确诊'
      }],
      receive_accouche: '',
      receive_normal: '',
      receive_sick: '',
      receive_normal_check: '',
      receive_ultrasound: '',
      receive_clour_ultrasound: '',
      verify: '',
      receive_check: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSelect (item) {
      console.log(item)
    },
    savedata () {
      axios({'access-token': localStorage.getItem('token')})
      let that = this
      axios({
        method: 'post',
        url: '/wh/admin/manage',
        data: {
          'type': 2,
          'id': this.params.id,
          'name': this.params.name,
          'area': this.params.area,
          'address': this.params.address,
          'receive_accouche': this.receive_accouche,
          'receive_normal': this.receive_normal,
          'receive_sick': this.receive_sick,
          'receive_normal_check': this.receive_normal_check,
          'receive_ultrasound': this.receive_ultrasound,
          'receive_clour_ultrasound': this.receive_clour_ultrasound,
          'verify': this.verify === '是' ? 1 : 0,
          'remark': this.textarea,
          'receive_check': this.receive_check
        },
        headers: {
          'access-token': localStorage.getItem('token')
        }
      }).then(function (response) {
        alert('编辑完成')
        that.$router.push({name: 'EndHospitalDetail', params: { 'hospital': that.params }})
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    console.log(this.$route.params)
    this.params = this.$route.params.hospital
    this.receive_normal = this.$route.params.hospital.receive_normal
    this.receive_accouche = this.$route.params.hospital.receive_accouche
    this.receive_normal = this.$route.params.hospital.receive_normal
    this.receive_sick = this.$route.params.hospital.receive_sick
    this.receive_normal_check = this.$route.params.hospital.receive_normal_check
    this.receive_ultrasound = this.$route.params.hospital.receive_ultrasound
    this.receive_clour_ultrasound = this.$route.params.hospital.receive_clour_ultrasound
    if (this.$route.params.hospital.verify === 1) {
      this.verify = '是'
    } else {
      this.verify = '否'
    }
    this.receive_check = this.$route.params.hospital.receive_check
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-row {
    margin-bottom: 10px;
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
  .hospital-detail-info {
    font-size: 15px;
    padding: 5px 3px;
    border-radius: 5px;
  }
  .el-col-16 {
    margin-top: 2%;
    line-height: 40px;
  }
  .el-col-14 {
    margin-top: 2%;
    line-height: 40px;
  }
  .el-col-8 {
    margin-top: 2%;
  }
  .el-col-10 {
    margin-top: 2%;
  }
  .el-col-18 {
    margin-top: 2%;
  }
</style>
