<template>
  <div>
    <div class="tips" v-if="lastUpdateTime" style="font-size: 12px">{{lastUpdateTime}}更新;数据至少两天更新一次</div>
    <div class="tab-btn-con">
      <div class="tab-btn" size="small" @click="tabChange('hospital')" :class="{act:activeName=='hospital'}">
        医院信息
      </div>
      <div class="tab-btn" :class="{act:activeName=='obstetricCheck'}" size="small" @click="tabChange('obstetricCheck')">
        疫期产检
      </div>
    </div>
    <div name="hospital" v-show="activeName=='hospital'">
      <div class="hospital-search-bar">
        <!-- <div class="small-btn" :class="{act:true}" @click="showPlace=!showPlace">
          <img class="btn-icon" src="../assets/place-act.png">
          <div class="btn-text">城区</div>
        </div> -->
        <el-dropdown trigger="click" @command="handleSelect" @visible-change="changeShowPlace">
          <span class="el-dropdown-link">
            <div class="small-btn" :class="{act:showPlace}">
              <!-- <img class="btn-icon" src="../assets/place-act.png"> -->
              <i class="el-icon-location"></i>
              <div class="btn-text">城区</div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-menu" command="全部" :class="{act : areas.selected === '全部'}">全部城区</el-dropdown-item>
            <el-divider></el-divider>
            <div class="sub-text">中心城区</div>
            <el-dropdown-item icon="el-icon-place" v-for="area in areas.center" :key="area" :command="area" :class="{act : areas.selected === area}">{{ area }}</el-dropdown-item>
            <div class="sub-text">其他城区</div>
            <el-dropdown-item icon="el-icon-place" v-for="area in areas.other" :key="area" :command="area" :class="{act : areas.selected === area}">{{ area }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div class="small-btn" :class="{act:false}" @click="showFilter=!showFilter">
          <img class="btn-icon" src="../assets/filter.png"> -->
          <!-- <img class="btn-icon" src="../assets/filter-act.png"> -->
          
          <!-- <i class="el-icon-s-operation"></i>
          <div class="btn-text">筛选</div>
        </div> -->
        <el-dropdown trigger="click" :hide-on-click="false" placement="bottom" @visible-change="changeShowFilter">
          <div class="small-btn" :class="{act:showFilter}" ref="domFilter">
            <!-- <img class="btn-icon" src="../assets/filter.png"> -->
            <!-- <img class="btn-icon" src="../assets/filter-act.png"> -->
            <i class="el-icon-s-operation"></i>
            <div class="btn-text">筛选</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-checkbox :value="allConditionChecked" @change="checkAllFilterCondition">全部医院信息</el-checkbox> -->
            <el-dropdown-item icon="el-icon-menu" :class="{act : !conditions.length}">全部医院信息</el-dropdown-item>
              <el-divider></el-divider>
              <el-checkbox-group v-model="conditions" >
                <div class="sub-text">接收</div>
                <el-checkbox v-for="condition in acceptConditions" :label="condition.symbol" :key="condition.symbol">{{condition.name}}</el-checkbox>
                <div class="sub-text">孕检及接生</div>
                <el-checkbox v-for="condition in checkConditions" :label="condition.symbol" :key="condition.symbol">{{condition.name}}</el-checkbox>
                <div class="sub-text">其他</div>
                <el-checkbox v-for="condition in otherConditions" :label="condition.symbol" :key="condition.symbol">{{condition.name}}</el-checkbox>
            </el-checkbox-group>
            <el-divider></el-divider>
            <div class="pop-bottom">
              <span class="pop-bottom__btn" @click="conditions=[]">重置</span>
              <el-divider direction="vertical"></el-divider>
              <span class="pop-bottom__btn active" @click="searchHospitalByOption(true)">确认查看</span>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="search-con">
          <input v-model="hospitalname" placeholder="请输入医院名字">
          <img class="btn-icon" src="../assets/search.png" @click="searchHospital">
        </div>
      </div>

      <div class="hospital-con" v-for="(hospital,i) in hospitallist" v-bind:key="i">
        <div class="hospital-con-title" :class="{shadow:!hospital.show}" @click="hospital.show=!hospital.show">
          <div class="info-con">
            <div class="name">
              {{ hospital.name }}
            </div>
            <div class="updata-time">
              {{hospital.verify == 1?'已核实':'未核实'}} {{hospital.update_time}} 更新
            </div>
          </div>
          <div class="tel-btn" @click.stop="showPhoneDialog(hospital)">
            <img class="tel-btn-icon" src="../assets/phone.png">
          </div>
        </div>
        <div class="hospital-info" v-show="hospital.show">
          <div class="info-title">可接收:</div><br>
          <HospitalInfoItem name="普通孕妇" :data="hospital.receive_normal" />
          <HospitalInfoItem name="疑似/确诊孕妇" :data="hospital.receive_sick" />
          <el-divider />
          <div class="info-title">可检测:</div>
          <HospitalInfoItem name="常规产检" :data="hospital.receive_normal_check" />
          <HospitalInfoItem name="孕期产检B超" :data="hospital.receive_ultrasound" />
          <HospitalInfoItem name="核酸检测" :data="hospital.receive_check" />
          <HospitalInfoItem name="中孕期三维排畸彩超（大排畸）" :data="hospital.receive_clour_ultrasound" />
          <el-divider />
          <div class="info-title">可接生:</div>
          <HospitalInfoItem name="接生" :data="hospital.receive_accouche" />
          <el-divider />
          <div>
            <div class="other-msg-title">补充说明</div>
            <div class="other-msg">{{ hospital.remark }}</div>
          </div>
          <div class="address-btn">
            <i class="el-icon-location" /> 医院地址: {{ hospital.address }}
          </div>
        </div>
      </div>
    </div>

    <div :class="{act:activeName=='obstetricCheck'}" v-show="activeName=='obstetricCheck'">
      正在积极努力中！
    </div>
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
  </div>
</template>

<script>

import HospitalInfoItem from './HospitalInfoItem'
export default {
  name: 'FrontIndex',
  components: { HospitalInfoItem },
  data () {
    return {
      lastUpdateTime: '',
      areaName: '全部地区',
      areas: {
        center: ['江岸区', '江汉区', '硚口区', '汉阳区', '武昌区', '青山区', '洪山区'],
        other: ['蔡甸区', '江夏区', '黄陂区', '新洲区', '东西湖区', '汉南区'],
        selected: '全部'
      },
      filterConditions: [
        {type: 'accept', symbol: 'receive_normal', name: '普通孕妇', checked: false},
        {type: 'accept', symbol: 'receive_sick', name: '疑似/确诊孕妇', checked: false},
        {type: 'check', symbol: 'receive_normal_check', name: '常规产检', checked: false},
        {type: 'check', symbol: 'receive_ultrasound', name: '孕期产检B超', checked: false},
        {type: 'check', symbol: 'receive_clour_ultrasound', name: '中孕期三维排畸彩超（大排畸）', checked: false},
        {type: 'check', symbol: 'receive_accouche', name: '可接生', checked: false},
        {type: 'other', symbol: 'receive_check', name: '可做核酸检测', checked: false},
        {type: 'other', symbol: 'verify', name: '医院信息已核实', checked: false},
      ],
      conditions: [],
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
      // receive_accouche_radio: '全部',
      // receive_normal_radio: '全部',
      // receive_sick_radio: '全部',
      // receive_normal_check_radio: '全部',
      // receive_ultrasound_radio: '全部',
      // receive_clour_ultrasound_radio: '全部',
      // verify_radio: '全部',
      // receive_check_radio: '全部',
      // 新增
      showPlace: false,
      showFilter: false,
      activeName: 'hospital'
    }
  },
  computed: {
    acceptConditions () {
      return this.filterConditions.filter(i => i.type === 'accept')
    },
    checkConditions () {
      return this.filterConditions.filter(i => i.type === 'check')
    },
    otherConditions () {
      return this.filterConditions.filter(i => i.type === 'other')
    },
    allConditionChecked () {
      console.log('999', this.filterConditions.length === this.conditions.length)
      return this.filterConditions.length === this.conditions.length
    }
  },
  methods: {
    changeShowPlace (visible) {
      this.showPlace = visible
    },
    changeShowFilter (visible) {
      this.showFilter = visible
    },
    clickHospital (hospital) {
      console.log(hospital)
      hospital.show = !hospital.show
    },
    toggleFilterCondition (condition) {
      this.filterConditions.forEach(c => {
        if (c.symbol === condition.symbol) {
          c.checked = !c.checked
        }
      })
    },
    checkAllFilterCondition () {
      const checked = this.allConditionChecked
      if (!checked) {
        this.conditions = this.filterConditions.map(c => c.symbol)
      } else {
        this.conditions = []
      }
    },
    showPhoneDialog (hospital) {
      let that = this
      this.currentHospital = hospital
      this.$http.get('/wh/msg/phone?uuid=' + hospital.uuid)
        .then(function (response) {
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
    tabChange (activeNameParam) {
      let routerPath = '/'
      this.activeName = activeNameParam
      switch (activeNameParam) {
        case 'hospital':
          routerPath = '/FrontIndex'
          break
        case 'obstetricCheck':
          routerPath = '/FrontCheckIndex'
          break
        default:
          break
      }
      this.$router.push(routerPath)
    },
    handleSelect (item) {
      console.log(item)
      this.showPlace = !this.showPlace
      this.areas.selected = item
      let that = this
      var params = ''
      if (item === '全部') {
        params = 'all=1'
      } else {
        params = 'all=3&area=' + item
      }
      this.conditions.forEach(c => {
        params += `&${c}=是`
      })

      this.$http.get('/wh/msg/hospital?page_num=1&page_size=100&' + params)
        .then(function (response) {
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
    // resetHospitalOption () {
    //   this.receive_accouche_radio = '全部'
    //   this.receive_normal_radio = '全部'
    //   this.receive_sick_radio = '全部'
    //   this.receive_normal_check_radio = '全部'
    //   this.receive_ultrasound_radio = '全部'
    //   this.receive_clour_ultrasound_radio = '全部'
    //   this.verify_radio = '全部'
    //   this.receive_check_radio = '全部'
    // },
    searchHospitalByOption (filterClick) {
      let that = this
      var params = ''
      if (!this.conditions.length) {
        params = 'all=1'
      } else {
        params = 'all=2'

        this.conditions.forEach(c => {
          params += `&${c}=是`
        })
      }
      if (this.areas.selected !== '全部') {
        params = params + '&area=' + this.areas.selected
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
          that.visibleOption = false
        })
        .catch(function (error) {
          console.log(error)
          that.visibleOption = false
        })
        .finally(() => {
          // that.showFilter = false
          if (filterClick) {
            that.$refs.domFilter.click()
          }
        })
    }
  },
  mounted () {
    this.restaurants = this.searchHospitalByOption()
  }
}
</script>

<style scoped style="css">
  .sub-text{
    color: #ACACAC;
    font-size: 12px;
    padding: 5px 0 5px 12px;
  }
  .el-button+.el-button {
    margin-left: 0px;
  }
  .el-button.sort{
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .pop-bottom{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
  }
  .pop-bottom__btn{
    flex: 1;
    color: #9D9D9D;
    text-align: center;
  }
  .pop-bottom__btn.active{
    color: #5887FF;
  }

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-checkbox__label{
  font-size: 12px;
}
.el-dropdown-menu {
  max-height: 72vh;
  overflow: scroll;
}
.el-dropdown-menu__item.act{
  color: #6792FC
}
.el-checkbox {
  display: block;
  margin: 10px 12px;
}
  .el-dialog__footer{
    padding: 0;
  }
.el-row {
  margin-bottom: 10px;
  /* &:last-child {
      margin-bottom: 0;
    } */
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
  height: 2em;
  line-height: 2em;
}
.el-tabs__item {
  width: 10em;
}
.hospital-detail-info {
  font-size: 15px;
}
.content-color-normal-black {
  color: #2c3e50;
}
.content-color-warning {
  color: rgb(228, 39, 15);
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 5px 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px 8px;
}

/* 新增样式 */
.tab-btn-con {
  margin-top:10px ;
  width: 100%;
  height: 37px;
  display: flex;
  justify-content: space-around;
  align-items: top;
  padding: 0 40px;
  box-sizing: border-box;
}
.tab-btn-con .tab-btn {
  height: 26px;
  font-size: 18px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 26px;
  color: rgba(193, 197, 205, 1);
  opacity: 1;
  padding: 0 15px;
  position: relative;
}
.tab-btn-con .tab-btn.act {
  height: 26px;
  font-size: 18px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 26px;
  color: rgba(88, 135, 255, 1);
  opacity: 1;
  padding: 0 15px;
  color: #5887ff;
  display: flex;
  position: relative;
}
.tab-btn-con .tab-btn.act::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 34px;
  height: 4px;
  background: rgba(88, 135, 255, 1);
  opacity: 1;
  border-radius: 5px;
}
.hospital-search-bar {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
.hospital-search-bar .small-btn {
  width: 64px;
  height: 31px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hospital-search-bar .small-btn .btn-icon {
  width: 12px;
  height: 16px;
  margin-right: 5px;
}
.hospital-search-bar .small-btn{
  color: #ACACAC;
}
.hospital-search-bar .small-btn .btn-text {
  /* width: 24px; */
  height: 17px;
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 17px;
  /* color: rgba(226, 226, 226, 1); */
  opacity: 1;
}
.hospital-search-bar .small-btn.act {
  color: #5887ff;
}
.hospital-search-bar .search-con {
  width: 196px;
  height: 31px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 2px;
  position: relative;
}
.hospital-search-bar .search-con input {
  border-radius: 2px;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  /* width:196px; */
  height: 31px;
  padding: 0 10px;
}
.hospital-search-bar .search-con img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 13px;
  height: 13px;
}
.filter-con {
  width: 300px;
}
.hospital-con {
  font-size: 0;
}
.hospital-con-title {
  padding: 10px 10px;
  margin-top: 10px;
  width: 100%;
  /* height: 47px; */
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: top;
  box-sizing: border-box;
}
.hospital-con-title.shadow {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}

.info-con {
  position: relative;
  width: 280px;
}
.info-con .name {
  margin-bottom: 5px;
  text-align: left;
  /* height: 20px; */
  font-size: 14px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 20px;
  color: rgba(47, 48, 54, 1);
  opacity: 1;
}
.info-con .updata-time {
  text-align: left;
  height: 11px;
  font-size: 8px;
  font-family: Source Han Sans;
  font-weight: 400;
  line-height: 11px;
  color: rgba(172, 172, 172, 1);
  opacity: 1;
}
.tel-btn {
  /* width: 70px; */
}

.tel-btn .tel-btn-icon {
  display: inline-block;

  margin-bottom: 5px;

  width: 25px;
  height: 25px;
}
.tel-btn .tel-btn-text {
  text-align: center;

  height: 11px;
  font-size: 8px;
  font-family: Source Han Sans;
  font-weight: 400;
  line-height: 11px;
  color: rgba(172, 172, 172, 1);
  opacity: 1;
  white-space: nowrap;
}
.hospital-info {
  border-top: solid #dcdfe6 1px;
  padding-top: 10px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 2px;
  text-align: left;
}
.hospital-info .info-title {
  font-size: 17px;
  font-weight: bold;
  text-align: left;
}
.other-msg-title {
  margin-top: 10px;
  padding: 0 10px;
  text-align: left;
  height: 17px;
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: 500;
  line-height: 17px;
  color: rgba(47, 48, 54, 1);
  opacity: 1;
  box-sizing: border-box;
}
.other-msg {
  text-align: left;
  padding: 0 10px;
  width: 100%;
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: 500;
  line-height: 17px;
  color: rgba(47, 48, 54, 1);
  opacity: 1;
  box-sizing: border-box;
}
.address-btn {
  padding: 10px 0;
  text-align: center;
  height: 20px;
  font-size: 14px;
  font-family: Source Han Sans;
  font-weight: 500;
  line-height: 20px;
  color: rgba(172, 172, 172, 1);
  opacity: 1;
}
.tips {
  height: 25px;
  line-height: 25px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(230, 229, 229, 1);
  opacity: 1;
  font-size: 10px;
  font-family: Source Han Sans;
  font-weight: 500;
}
</style>
