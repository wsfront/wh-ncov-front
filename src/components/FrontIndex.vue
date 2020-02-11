<template>
  <div class="wh-container">
    <HeaderLayout :activeIndex="0" />

    <div name="hospital">
      <div class="hospital-search-bar">
        <div
          class="small-btn"
          :class="{ act: true }"
          @click="showPlace = !showPlace"
        >
          <!-- <img class="btn-icon" src="../assets/place.png"> -->
          <img class="btn-icon" src="../assets/place-act.png" />
          <div class="btn-text">城区</div>
        </div>
        <div
          class="small-btn"
          :class="{ act: false }"
          @click="showFilter = !showFilter"
        >
          <img class="btn-icon" src="../assets/filter.png" />
          <!-- <img class="btn-icon" src="../assets/filter-act.png"> -->
          <div class="btn-text">筛选</div>
        </div>
        <div class="search-con">
          <input v-model="hospitalname" placeholder="请输入医院名字" />
          <img
            class="btn-icon"
            src="../assets/search.png"
            @click="searchHospital"
          />
        </div>
      </div>
      <transition name="fade">
        <div class="hospital-list" v-if="hospitallist.length">
          <div
            class="hospital-con"
            v-for="(hospital, i) in hospitallist"
            v-bind:key="i"
          >
            <div
              class="hospital-con-title"
              :class="{ shadow: !hospital.show }"
              @click="hospital.show = !hospital.show"
            >
              <div class="info-con">
                <div class="name">{{ hospital.name }}</div>
                <div class="updata-time">
                  {{ hospital.verify == 1 ? "已核实" : "未核实" }}
                  {{ hospital.update_time }} 更新
                </div>
              </div>
              <div class="tel-btn" @click.stop="showPhoneDialog(hospital)">
                <img class="tel-btn-icon" src="../assets/phone.png" />
              </div>
            </div>
            <div class="hospital-info" v-show="hospital.show">
              <div class="info-title">可接收:</div>
              <br />
              <HospitalInfoItem
                name="普通孕妇"
                :data="hospital.receive_normal"
              />
              <HospitalInfoItem
                name="疑似/确诊孕妇"
                :data="hospital.receive_sick"
              />
              <el-divider />
              <div class="info-title">可检测:</div>
              <HospitalInfoItem
                name="常规产检"
                :data="hospital.receive_normal_check"
              />
              <HospitalInfoItem
                name="孕期产检B超"
                :data="hospital.receive_ultrasound"
              />
              <HospitalInfoItem
                name="核酸检测"
                :data="hospital.receive_check"
              />
              <HospitalInfoItem
                name="中孕期三维排畸彩超（大排畸）"
                :data="hospital.receive_clour_ultrasound"
              />
              <el-divider />
              <div class="info-title">可接生:</div>
              <HospitalInfoItem name="接生" :data="hospital.receive_accouche" />
              <el-divider />
              <div>
                <div class="other-msg-title">补充说明</div>
                <div class="other-msg">{{ hospital.remark }}</div>
              </div>
              <div class="address-btn">
                <i class="el-icon-location" />
                医院地址: {{ hospital.address }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <el-dialog :visible.sync="showPlace" center>
      <el-menu
        default-active="1"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="全部" style="height:2em;">
          <i class="el-icon-menu"></i>
          <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item v-for="(area, index) in areas" :index="area" :key="index">
          <i class="el-icon-position"></i>
          <span slot="title">{{ area }}</span>
        </el-menu-item>
      </el-menu>
    </el-dialog>
    <el-dialog :visible.sync="showFilter" width="100%" center>
      <div class="filter-con">
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
          <el-col :span="12">普通孕妇</el-col>
          <el-col :span="12">
            <el-radio-group v-model="receive_normal_radio" size="mini">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">疑似/确诊孕妇</el-col>
          <el-col :span="12">
            <el-radio-group v-model="receive_sick_radio" size="mini">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">常规产检</el-col>
          <el-col :span="12">
            <el-radio-group v-model="receive_normal_check_radio" size="mini">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">孕期产检B超</el-col>
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
          <el-col :span="12">核酸检测</el-col>
          <el-col :span="12">
            <el-radio-group v-model="receive_check_radio" size="mini">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            中孕期三维
            <br />排畸彩超（大排畸）
          </el-col>
          <el-col :span="12">
            <el-radio-group
              v-model="receive_clour_ultrasound_radio"
              size="mini"
            >
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <div style="text-align: center; margin: 0;width: 100%">
          <el-button
            type="success"
            size="mini"
            @click="resetHospitalOption"
            style="width: 10em;margin-left: 5%"
            plain
            >重置</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="searchHospitalByOption"
            style="width: 10em;"
            plain
            >查看</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog title="医院信息" :visible.sync="dialogFormVisible" width="80%">
      <el-row v-for="phone in currentHospital.phones" v-bind:key="phone.id">
        <el-col :span="5" style="text-align: left">{{
          phone.department
        }}</el-col>
        <el-col :span="18" style="text-align: left">
          <span>{{ phone.phone }}</span>
          <a
            v-bind:href="'tel:' + phone.phone"
            style="margin-left: 20%;text-decoration-line: none;background-color: #409EFF;color: #fff;padding: 4px;border-radius: 2px"
            >拨打电话</a
          >
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HospitalInfoItem from "./HospitalInfoItem";
import HeaderLayout from "./HeaderLayout";
import SearchParamManager from '../utils/SearchParamManager'

export default {
  name: "FrontIndex",
  components: { HospitalInfoItem, HeaderLayout },
  data() {
    return {
      lastUpdateTime: "",
      areaName: "全部地区",
      areas: [
        "江岸区",
        "江汉区",
        "硚口区",
        "汉阳区",
        "武昌区",
        "青山区",
        "洪山区",
        "蔡甸区",
        "江夏区",
        "黄陂区",
        "新洲区",
        "东西湖区",
        "汉南区"
      ],
      hospitalname: "",
      hospitallist: [],
      visiblemenu: false,
      visibleOption: false,
      radio1: "全部",
      count: 10,
      loading: false,
      dialogFormVisible: false,
      currentHospital: [],
      receive_accouche_radio: "全部",
      receive_normal_radio: "全部",
      receive_sick_radio: "全部",
      receive_normal_check_radio: "全部",
      receive_ultrasound_radio: "全部",
      receive_clour_ultrasound_radio: "全部",
      verify_radio: "全部",
      receive_check_radio: "全部",
      // 新增
      showPlace: false,
      showFilter: false,
      searchParamManager: new SearchParamManager()
    };
  },
  computed: {},
  methods: {
    clickHospital(hospital) {
      console.log(hospital);
      hospital.show = !hospital.show;
    },
    showPhoneDialog(hospital) {
      let that = this;
      this.currentHospital = hospital;
      this.$http
        .get("/wh/msg/phone?uuid=" + hospital.uuid)
        .then(function(response) {
          if (response.data.code === "0000") {
            that.currentHospital.phones = response.data.result;
            console.log(that.currentHospital.phones);
            that.currentHospital = hospital;
            that.dialogFormVisible = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    handleSelect(item, keyPath) {
      console.log(item, keyPath);
      // delete "name", our API doesn't support search name + other criteria together so we have to drop it
      this.hospitalname = ''
      this.searchParamManager.handleAreaChange(item)

      this.fetchHospitalInfo();
    },
    handleOpen() {},
    handleClose() {},
    searchHospital() {
      if (!this.hospitalname) {
        return;
      }
      this.searchParamManager.handleNameChange(this.hospitalname)
      this.fetchHospitalInfo();
    },
    resetHospitalOption() {
      this.receive_accouche_radio = "全部";
      this.receive_normal_radio = "全部";
      this.receive_sick_radio = "全部";
      this.receive_normal_check_radio = "全部";
      this.receive_ultrasound_radio = "全部";
      this.receive_clour_ultrasound_radio = "全部";
      this.verify_radio = "全部";
      this.receive_check_radio = "全部";
    },
    searchHospitalByOption() {
      // delete "name", our API doesn't support search name + other criteria together so we have to drop it
      this.hospitalname = ''
      this.searchParamManager.handleSearchOptionsChange(this)

      this.fetchHospitalInfo();
    },

    fetchHospitalInfo(params) {
      this.hospitallist = [];
      this.$http
        .get("/wh/msg/hospital?page_num=1&page_size=100&" + this.searchParamManager.buildQueryString())
        .then(response => {
          console.log(response);
          if (response.data.code === "0000") {
            response.data.result.forEach(element => {
              element.show = false;
              element.showdetail = false;
              if (element.update_time > this.lastUpdateTime) {
                this.lastUpdateTime = element.update_time;
              }
            });
            this.$EventBus.$emit("refreshUpdateTime", this.lastUpdateTime);
            this.hospitallist = response.data.result;
          }
          this.visibleOption = false;
        })
        .catch(function(error) {
          console.log(error);
          this.visibleOption = false;
        });
    }
  },
  mounted() {
    this.searchHospitalByOption();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.wh-container {
  background: #fafafa;
  color: #333;
  padding: 10px 16px;
}
.el-row {
  margin-bottom: 10px;
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
.hospital-search-bar .small-btn .btn-text {
  /* width: 24px; */
  height: 17px;
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: bold;
  line-height: 17px;
  color: rgba(226, 226, 226, 1);
  opacity: 1;
}
.hospital-search-bar .small-btn.act .btn-text {
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
</style>
