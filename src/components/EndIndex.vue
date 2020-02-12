<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="医院" name="hospital">
      <el-row>
        <el-col :span="19">
          <el-input v-model="hospitalname" placeholder="请输入医院名字"  ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-search" circle v-on:click="searchHospital"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-popover
            placement="bottom-start"
            width="400"
            v-model="visiblemenu">
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24">
                  <el-menu
                    default-active="1"
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="全部" style="height:2em;">
                      <i class="el-icon-menu"></i>
                      <span slot="title">全部</span>
                    </el-menu-item>
                    <el-menu-item index="江岸区">
                      <i class="el-icon-position"></i>
                      <span slot="title">江岸区</span>
                    </el-menu-item>
                    <el-menu-item index="江汉区">
                      <i class="el-icon-position"></i>
                      <span slot="title">江汉区</span>
                    </el-menu-item>
                    <el-menu-item index="硚口区">
                      <i class="el-icon-position"></i>
                      <span slot="title">硚口区</span>
                    </el-menu-item>
                    <el-menu-item index="汉阳区">
                      <i class="el-icon-position"></i>
                      <span slot="title">汉阳区</span>
                    </el-menu-item>
                    <el-menu-item index="武昌区">
                      <i class="el-icon-position"></i>
                      <span slot="title">武昌区</span>
                    </el-menu-item>
                    <el-menu-item index="青山区">
                      <i class="el-icon-position"></i>
                      <span slot="title">青山区</span>
                    </el-menu-item>
                    <el-menu-item index="洪山区">
                      <i class="el-icon-position"></i>
                      <span slot="title">洪山区</span>
                    </el-menu-item>
                    <el-menu-item index="蔡甸区">
                      <i class="el-icon-position"></i>
                      <span slot="title">蔡甸区</span>
                    </el-menu-item>
                    <el-menu-item index="江夏区">
                      <i class="el-icon-position"></i>
                      <span slot="title">江夏区</span>
                    </el-menu-item>
                    <el-menu-item index="黄陂区">
                      <i class="el-icon-position"></i>
                      <span slot="title">黄陂区</span>
                    </el-menu-item>
                    <el-menu-item index="新洲区">
                      <i class="el-icon-position"></i>
                      <span slot="title">新洲区</span>
                    </el-menu-item>
                    <el-menu-item index="东西湖区">
                      <i class="el-icon-position"></i>
                      <span slot="title">东西湖区</span>
                    </el-menu-item>
                    <el-menu-item index="汉南区">
                      <i class="el-icon-position"></i>
                      <span slot="title">汉南区</span>
                    </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-button slot="reference" v-model="areaName" >{{this.areaName}}<i class="el-icon-caret-bottom el-icon--right"></i> </el-button>
           </el-popover>
        </el-col>
        <el-col :span="12">
           <el-popover
            placement="bottom-start"
            width="300"
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
            <div style="text-align: center; margin: 0">
                <el-button size="mini" type="text" @click="resetHospitalOption">重置</el-button>
                <el-button type="primary" size="mini" @click="searchHospitalByOption">查看</el-button>
            </div>
            <el-button slot="reference">筛选<i class="el-icon-caret-bottom el-icon--right"></i> </el-button>
           </el-popover>
        </el-col>
      </el-row>
      <el-row v-for="hospital in hospitallist" v-bind:key="hospital.uuid" class="hospital-detail-info">
        <router-link :to="{name: 'EndHospitalDetail', params: {'hospital':hospital}}">
          <el-col :span="20" align="left">{{ hospital.name }}</el-col>
          <el-col :span="4"><i class="el-icon-arrow-right"></i></el-col>
        </router-link>
          <el-divider></el-divider>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="产检知识" name="obstetricCheck">产检知识</el-tab-pane>
    <el-dialog title="医院信息" :visible.sync="dialogFormVisible" width="80%">
      <el-row v-for="phone in currentHospital.phones" v-bind:key="phone.id">
        <el-col :span="4">
          {{phone.department}}
        </el-col>
        <el-col :span="12">
          <a v-bind:href="'tel:'+phone.phone">{{phone.phone}}</a>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-tabs>
</template>

<script>
export default {
  name: 'EndIndex',
  data () {
    return {
      activeName: 'hospital',
      areaName: '全部地区',
      restaurants: [],
      state: '',
      activeNames: ['1'],
      hospitalname: '',
      hospitallist: [],
      timeout: null,
      visiblemenu: false,
      visibleOption: false,
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
    noMore () {
      return this.count >= 200 || this.nomoredata
    },
    disabled () {
      return this.loading || this.noMore
    }
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
    loadAll () {
      return []
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item, keyPath) {
      console.log(item, keyPath)
      let that = this
      var params = ''
      if (item === '全部') {
        params = 'all=1'
      } else {
        params = 'all=3&area=' + item
      }
      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            response.data.result.forEach(element => {
              element.show = false
              element.showdetail = false
            })
            that.areaName = item
            that.hospitallist = response.data.result
          }
          that.visiblemenu = false
        })
        .catch(function (error) {
          console.log(error)
          that.visiblemenu = false
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
      }
      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            response.data.result.forEach(element => {
              element.show = false
              element.showdetail = false
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

      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
          console.log(response)
          if (response.data.code === '0000') {
            response.data.result.forEach(element => {
              element.show = false
              element.showdetail = false
            })
            that.hospitallist = response.data.result
          }
          that.visibleOption = false
        })
        .catch(function (error) {
          console.log(error)
          that.visibleOption = false
        })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .content-color-normal {
    color:rgb(77, 235, 19);
  }
  .content-color-warning {
    color:rgb(228, 39, 15);
  }
  .el-divider{
    display: none;
  }
</style>
