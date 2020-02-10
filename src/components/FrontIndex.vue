<template>
  <div>
  <el-row>
    <el-col v-model="lastUpdateTime" style="font-size: 12px">{{this.lastUpdateTime}}更新;数据至少两天更新一次</el-col>
  </el-row>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="医院" name="hospital">
      <el-row class="wh-search-row">
        <el-col :span="18">
          <el-input v-model="hospitalname" placeholder="请输入医院名字" ></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button icon="el-icon-search" circle  v-on:click="searchHospital"></el-button>
        </el-col>
      </el-row>
      <el-row class="wh-align-left">
        <el-col :span="12">
          <el-popover
            placement="bottom-start"
            width="400"
            class="wh-select"
            v-model="visiblemenu">
            <el-row>
                <el-col :span="24">
                  <el-menu
                    default-active="1"
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="全部" style="height:2em;" :disabled="menustate">
                      <i class="el-icon-menu"></i>
                      <span slot="title">全部</span>
                    </el-menu-item>
                    <el-menu-item index="江岸区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">江岸区</span>
                    </el-menu-item>
                    <el-menu-item index="江汉区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">江汉区</span>
                    </el-menu-item>
                    <el-menu-item index="硚口区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">硚口区</span>
                    </el-menu-item>
                    <el-menu-item index="汉阳区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">汉阳区</span>
                    </el-menu-item>
                    <el-menu-item index="武昌区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">武昌区</span>
                    </el-menu-item>
                    <el-menu-item index="青山区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">青山区</span>
                    </el-menu-item>
                    <el-menu-item index="洪山区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">洪山区</span>
                    </el-menu-item>
                    <el-menu-item index="蔡甸区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">蔡甸区</span>
                    </el-menu-item>
                    <el-menu-item index="江夏区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">江夏区</span>
                    </el-menu-item>
                    <el-menu-item index="黄陂区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">黄陂区</span>
                    </el-menu-item>
                    <el-menu-item index="新洲区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">新洲区</span>
                    </el-menu-item>
                    <el-menu-item index="东西湖区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">东西湖区</span>
                    </el-menu-item>
                    <el-menu-item index="汉南区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">汉南区</span>
                    </el-menu-item>
                    <el-menu-item index="东湖高新技术开发区" :disabled="menustate">
                      <i class="el-icon-position"></i>
                      <span slot="title">东湖高新技术开发区</span>
                    </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-button slot="reference" v-model="areaName" >{{this.areaName}}<i class="el-icon-caret-bottom el-icon--right"></i> </el-button>
           </el-popover>
        </el-col>
        <el-col :span="10" :offset="1">
           <el-popover
            placement="bottom-start"
            width="300"
            class="wh-select"
            v-model="visibleOption">
            <el-row type="flex">
                <el-col :span="12">医院核实情况</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="verify_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row type="flex">
                <el-col :span="12">可接收普通孕妇</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_normal_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">可接收疑似/确诊孕妇</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_sick_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">可做常规产检</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_normal_check_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">可做孕期产检B超</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_ultrasound_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">可接生</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_accouche_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">可做核酸检测</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_check_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">可做中孕期三维<br/>排畸彩超（大排畸）</el-col>
                <el-col :span="12">
                    <el-radio-group v-model="receive_clour_ultrasound_radio" size="mini">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="是"></el-radio-button>
                    <el-radio-button label="否"></el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <div class="wh-btn-row">
                <el-button class="wh-btn" type="primary" size="small" @click="resetHospitalOption" plain>重 置</el-button>
                <el-button class="wh-btn" type="primary" size="small" @click="searchHospitalByOption"  plain>确 认</el-button>
            </div>
            <el-button slot="reference">筛选<i class="el-icon-caret-bottom el-icon--right"></i> </el-button>
           </el-popover>
        </el-col>
      </el-row>
      <el-row v-for="hospital in hospitallist" v-bind:key="hospital.uuid">
        <el-col :span="24">
          <el-divider></el-divider>
          <el-row>
            <el-col :span="16" align="left">
              <i v-bind:class="hospital.show?'el-icon-caret-top':'el-icon-caret-bottom'" v-on:click="clickHospital(hospital)">
                <span >{{ hospital.name }}</span><br/>
                <el-button size="mini" :disabled=true v-if="hospital.verify == 1" type="primary" plain round >已核实</el-button>
                <el-button size="mini" :disabled=true v-else  type="warning" plain round >未核实</el-button><span style="font-size:10px;">&nbsp;&nbsp;{{hospital.update_time}}更新</span>
            </i>
            </el-col>
            <el-col :span="8"><el-button v-on:click="showPhoneDialog(hospital)" type="primary" round plain size="small">联系医院</el-button></el-col>
          </el-row>
          <el-row v-show="hospital.show" class="bg-purple-light hospital-detail-info">
            <el-col :span="24">
              <el-row class="bg-purple-light">
                <el-col :span="16" align="left">可接收普通孕妇</el-col>
                <el-col :span="8" align="center" v-bind:class="hospital.receive_normal === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_normal }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="16" align="left">可接收疑似/确诊孕妇</el-col>
                <el-col :span="8" align="center"  v-bind:class="hospital.receive_sick === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_sick }}</el-col>
              </el-row>
              <el-row class="bg-purple-light">
                <el-col :span="16" align="left">可做常规产检</el-col>
                <el-col :span="8" align="center"  v-bind:class="hospital.receive_normal_check === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_normal_check }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="16" align="left">可做孕期产检B超</el-col>
                <el-col :span="8" align="center"  v-bind:class="hospital.receive_ultrasound === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_ultrasound }}</el-col>
              </el-row>
              <el-row class="bg-purple-light">
                <el-col :span="16" align="left">可做中孕期三维排畸彩超（大排畸）</el-col>
                <el-col :span="8" align="center"  v-bind:class="hospital.receive_clour_ultrasound === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_clour_ultrasound }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="16" align="left">可接生</el-col>
                <el-col :span="8" align="center"  v-bind:class="hospital.receive_accouche === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_accouche }}</el-col>
              </el-row>
              <el-row class="bg-purple-light">
                <el-col :span="16" align="left">可做核酸检测</el-col>
                <el-col :span="8" align="center"  v-bind:class="hospital.receive_check === '否' ?'content-color-warning':'content-color-normal-black'">{{ hospital.receive_check }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" align="left">补充说明</el-col>
                <el-col :span="18" align="left">{{ hospital.remark }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6" align="left">地址</el-col>
                <el-col :span="18" align="left">{{ hospital.address }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="产检知识" name="obstetricCheck">正在积极努力中！</el-tab-pane>
    <el-dialog title="医院信息" :visible.sync="dialogFormVisible" width="80%">
      <el-row v-for="phone in currentHospital.phones" v-bind:key="phone.id">
        <el-col :span="5" style="text-align: left">
          {{phone.department}}
        </el-col>
        <el-col :span="18" style="text-align: left">
          <span>{{phone.phone}}</span><a v-bind:href="'tel:'+phone.phone" style="margin-left: 20%;text-decoration-line: none;background-color: #409EFF;color: #fff;padding: 4px;border-radius: 2px">拨打电话</a>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      </div>
    </el-dialog>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'FrontIndex',
  data () {
    return {
      activeName: 'hospital',
      lastUpdateTime: '',
      areaName: '全部地区',
      restaurants: [],
      state: '',
      activeNames: ['1'],
      hospitalname: '',
      hospitallist: [],
      timeout: null,
      visiblemenu: false,
      visibleOption: false,
      menustate: false,
      radio1: '全部',
      count: 10,
      loading: false,
      nomordata: false,
      dialogFormVisible: false,
      currentHospital: [],
      receive_accouche_radio: '全部',
      receive_normal_radio: '全部',
      receive_sick_radio: '全部',
      receive_normal_check_radio: '全部',
      receive_ultrasound_radio: '全部',
      receive_clour_ultrasound_radio: '全部',
      verify_radio: '全部',
      receive_check_radio: '全部'
    }
  },
  computed: {
  },
  methods: {
    clickHospital (hospital) {
      console.log(hospital)
      hospital.show = !hospital.show
    },
    showPhoneDialog (hospital) {
      let that = this
      this.currentHospital = hospital
      this.$http.get('/wh/msg/phone?uuid=' + hospital.uuid)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            that.currentHospital.phones = response.data.result
            console.log(that.currentHospital.phones)
            that.currentHospital = hospital
            that.dialogFormVisible = true
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChange (val) {
      console.log(val)
    },
    handleSelect (item, keyPath) {
      var params = 'all=2'
      if (this.receive_accouche_radio !== '全部') {
        params = params + '&receive_accouche=' + this.receive_accouche_radio
      }
      if (this.receive_normal_radio !== '全部') {
        params = params + '&receive_normal=' + this.receive_normal_radio
      }
      if (this.receive_sick_radio !== '全部') {
        params = params + '&receive_sick=' + this.receive_sick_radio
      }
      if (this.receive_normal_check_radio !== '全部') {
        params = params + '&receive_normal_check=' + this.receive_normal_check_radio
      }
      if (this.receive_ultrasound_radio !== '全部') {
        params = params + '&receive_ultrasound=' + this.receive_ultrasound_radio
      }
      if (this.receive_clour_ultrasound_radio !== '全部') {
        params = params + '&receive_clour_ultrasound=' + this.receive_clour_ultrasound_radio
      }
      if (this.verify_radio !== '全部') {
        params = params + '&verify=' + this.verify_radio
      }
      if (this.receive_check_radio !== '全部') {
        params = params + '&receive_check=' + this.receive_check_radio
      }
      if (this.areaName !== '全部地区') {
        params = params + '&area=' + this.areaName
      }
      if (params === 'all=2') {
        params = 'all=1'
      }

      let that = this
      if (params === 'all=1') {
        if (item === '全部') {
          params = 'all=1'
        } else {
          params = 'all=3&area=' + item
        }
      } else {
        if (item === '全部') {
        } else {
          params = params + '&area=' + item
        }
      }
      this.menustate = true
      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            response.data.result.forEach(element => {
              element.show = false
              element.showdetail = false
              if (element.update_time > that.lastUpdateTime) {
                that.lastUpdateTime = element.update_time
              }
            })
            that.hospitallist = response.data.result
            that.areaName = item
          }
          that.visiblemenu = false
          that.menustate = false
        })
        .catch(function (error) {
          console.log(error)
          that.visiblemenu = false
          that.menustate = false
        })
    },
    handleOpen () {
    },
    handleClose () {
    },
    searchHospital () {
      let that = this
      var params = 'all=0'
      if (this.hospitalname !== '') {
        params = params + '&name=' + this.hospitalname
      } else {
        return
      }
      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            response.data.result.forEach(element => {
              element.show = false
              element.showdetail = false
              if (element.update_time > that.lastUpdateTime) {
                that.lastUpdateTime = element.update_time
              }
            })
            that.hospitallist = response.data.result
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    resetHospitalOption () {
      this.receive_accouche_radio = '全部'
      this.receive_normal_radio = '全部'
      this.receive_sick_radio = '全部'
      this.receive_normal_check_radio = '全部'
      this.receive_ultrasound_radio = '全部'
      this.receive_clour_ultrasound_radio = '全部'
      this.verify_radio = '全部'
      this.receive_check_radio = '全部'
    },
    searchHospitalByOption () {
      let that = this
      var params = ''
      params = 'all=2'
      if (this.receive_accouche_radio !== '全部') {
        params = params + '&receive_accouche=' + this.receive_accouche_radio
      }
      if (this.receive_normal_radio !== '全部') {
        params = params + '&receive_normal=' + this.receive_normal_radio
      }
      if (this.receive_sick_radio !== '全部') {
        params = params + '&receive_sick=' + this.receive_sick_radio
      }
      if (this.receive_normal_check_radio !== '全部') {
        params = params + '&receive_normal_check=' + this.receive_normal_check_radio
      }
      if (this.receive_ultrasound_radio !== '全部') {
        params = params + '&receive_ultrasound=' + this.receive_ultrasound_radio
      }
      if (this.receive_clour_ultrasound_radio !== '全部') {
        params = params + '&receive_clour_ultrasound=' + this.receive_clour_ultrasound_radio
      }
      if (this.verify_radio !== '全部') {
        params = params + '&verify=' + this.verify_radio
      }
      if (this.receive_check_radio !== '全部') {
        params = params + '&receive_check=' + this.receive_check_radio
      }
      if (this.areaName !== '全部地区') {
        params = params + '&area=' + this.areaName
      }
      if (params === 'all=2') {
        params = 'all=1'
      }
      this.menustate = true
      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            response.data.result.forEach(element => {
              element.show = false
              element.showdetail = false
              if (element.update_time > that.lastUpdateTime) {
                that.lastUpdateTime = element.update_time
              }
            })
            that.hospitallist = response.data.result
          }
          that.visibleOption = false
          that.menustate = false
        })
        .catch(function (error) {
          console.log(error)
          that.visibleOption = false
          that.menustate = false
        })
    }
  },
  mounted () {
    var params = 'all=1'
    let that = this
    this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
      .then(function (response) {
        console.log(response)
        if (response.data.code === '0000') {
          response.data.result.forEach(element => {
            element.show = false
            element.showdetail = false
            if (element.update_time > that.lastUpdateTime) {
              that.lastUpdateTime = element.update_time
            }
          })
          that.hospitallist = response.data.result
        }
        that.visiblemenu = false
      })
      .catch(function (error) {
        console.log(error)
        that.visiblemenu = false
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .wh-search-row {
    margin: auto;
    left: 0;
    right: 0;
    padding: 0 20px;
  }
  .wh-align-left{
    text-align: left;
  }
  .wh-select{
    padding: 20px
  }
  .wh-btn-row {
    text-align: center;
  }
  .wh-btn {
    width: 145px;
    height: 48px;
    display: inline-block;
    margin: 0 !important;
    border: 0;
  }
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
  .el-menu-item {
    height:2em;
    line-height: 2em;
  }
  .el-tabs__item {
    width: 10em;
  }
  .hospital-detail-info {
    font-size: 15px;
  }
  .content-color-normal-black {
    color:#2c3e50;
  }
  .content-color-warning {
    color:rgb(228, 39, 15);
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 5px 0;
  }
  .el-button--mini, .el-button--mini.is-round {
    padding: 3px 8px;
  }
</style>
