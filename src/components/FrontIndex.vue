<template>
  <div class="wh-container">
    <div class="hearder-block">
      <HeaderLayout :activeIndex="0" />
    </div>
    <div name="hospital">
      <div class="hospital-search-bar">
        <el-dropdown
          trigger="click"
          placement="bottom-start"
          @command="handleSelect"
          @visible-change="changeShowPlace"
        >
          <span class="el-dropdown-link">
            <div class="btn long" :class="{ act: showPlace }">
              <i
                class="el-icon-location"
                :class="itemSelected ? 'btn-icon-act' : 'btn-icon'"
              ></i>
              <div :class="itemSelected ? 'btn-text-act' : 'btn-text'">
                {{ itemSelected ? areas.selected : "选择城区" }}
              </div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown" class="city-filter-dialog">
            <el-dropdown-item
              icon="el-icon-menu"
              command="全部"
              :class="{ act: itemSelected && areas.selected === '全部' }"
              >全部城区</el-dropdown-item
            >
            <el-divider></el-divider>
            <div class="sub-text">中心城区</div>
            <el-dropdown-item
              icon="el-icon-place"
              v-for="area in areas.center"
              :key="area"
              :command="area"
              :class="{ act: areas.selected === area }"
              >{{ area }}</el-dropdown-item
            >
            <div class="sub-text">其他城区</div>
            <el-dropdown-item
              icon="el-icon-place"
              v-for="area in areas.other"
              :key="area"
              :command="area"
              :class="{ act: areas.selected === area }"
              >{{ area }}</el-dropdown-item
            >
            <!-- <el-dropdown-item icon="el-icon-place" v-for="area in areas.new" :key="area" :command="area" :class=" areas.selected === area ? 'act' : 'new-area'">{{ area }}</el-dropdown-item>
            <el-dropdown-item icon="el-icon-place" v-for="area in areas.noData" :key="area" :command="area" :class=" areas.selected === area ? 'act' : 'no-data-area'">{{ area }}</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          trigger="click"
          @command="handleCommandFunc"
          :hide-on-click="false"
          placement="bottom-start"
          @visible-change="changeShowFilter"
        >
          <span class="el-dropdown-link">
            <div
              class="btn long"
              :class="{ act: shouldHighlightFilterButton }"
              ref="domFilter"
            >
              <!-- <img class="btn-icon" src="../assets/filter.png"> -->
              <!-- <img class="btn-icon" src="../assets/filter-act.png"> -->
              <i class="el-icon-s-operation"></i>
              <div class="btn-text">筛选医院</div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown" class="hospital-filter-dialog">
            <!-- <el-checkbox :value="allConditionChecked" @change="checkAllFilterCondition">全部医院信息</el-checkbox> -->
            <!-- <el-dropdown-item
              command="rest"
              icon="el-icon-menu"
              :class="{ act: !conditions.length }"
              >全部医院信息</el-dropdown-item
            >
            <el-divider></el-divider> -->
            <el-checkbox-group v-model="conditions">
              <div class="sub-text">接收</div>
              <el-checkbox
                v-for="condition in acceptConditions"
                :label="condition.symbol"
                :key="condition.symbol"
                >{{ condition.name }}</el-checkbox
              >
              <div class="sub-text">孕检及接生</div>
              <el-checkbox
                v-for="condition in checkConditions"
                :label="condition.symbol"
                :key="condition.symbol"
                >{{ condition.name }}</el-checkbox
              >
              <div class="sub-text">其他</div>
              <el-checkbox
                v-for="condition in otherConditions"
                :label="condition.symbol"
                :key="condition.symbol"
                >{{ condition.name }}</el-checkbox
              >
            </el-checkbox-group>
            <el-divider></el-divider>
            <div class="pop-bottom">
              <span class="pop-bottom__btn" @click="conditions = []">重置</span>
              <span
                class="pop-bottom__btn active"
                @click="searchHospitalByOption(true)"
                >确认查看</span
              >
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="search-con" :class="{ act: input_active }">
          <img class="btn-icon" src="../assets/search.png" />
          <input
            v-model="hospitalname"
            placeholder="搜索医院名字"
            ref="domInput"
            @focus="input_active = true"
            @blur="input_active = false"
            @keyup.enter="searchHospital"
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
              @click="hospital.show = !hospital.show"
            >
              <img
                v-if="!hospital.show"
                class="arrow_icon_right"
                src="../assets/arrow_right.png"
              />
              <img
                v-if="hospital.show"
                class="arrow_icon_down"
                src="../assets/arrow_down.png"
              />
              <div class="info-container">
                <div class="name">{{ hospital.name }}</div>
                <div class="info-text">
                  <span
                    :class="{
                      success: !!hospital.verify,
                      error: !hospital.verify
                    }"
                    >{{ hospital.verify == 1 ? "已核实" : "待核实" }}</span
                  >
                  {{ hospital.update_time }} 更新
                </div>
              </div>
              <div class="tel-btn" @click.stop="showPhoneDialog(hospital)">
                <img class="tel-btn-icon" src="../assets/phone.png" />
                <span class="info-text"> 电话咨询 </span>
              </div>
            </div>
            <div class="hospital-info" v-show="hospital.show">
              <div
                class="info-wrapper"
                v-for="(infos, type) in hopitalInfo"
                :key="type"
              >
                <HospitalInfoItem
                  v-for="item in infos"
                  :key="item.symbol"
                  :name="item.name"
                  :data="hospital[item.symbol]"
                />
              </div>
              <div class="info-wrapper">
                <div class="other-msg-title">医院地址</div>
                <div class="other-msg">{{ hospital.address }}</div>
              </div>
              <div class="info-wrapper">
                <!-- <div class="other-msg-title ">补充说明</div> -->
                <button class="additional-desc">补充说明</button>
                <div class="other-msg">{{ hospital.remark }}</div>
              </div>
              <!-- <div class="address-btn" @click="showAddressDialog(hospital)">
                <i class="el-icon-location" />
                医院地址: {{ hospital.address }}
              </div> -->
            </div>
          </div>
        </div>
        <div class="no-data-text" v-else>
          暂未找到符合的医院
        </div>
      </transition>
    </div>
    <el-dialog
      v-bind:title="currentHospital.name"
      :visible.sync="dialogFormVisible"
      width="80%"
      class="wh-dialog"
    >
      <el-row
        v-for="phone in currentHospital.phones"
        v-bind:key="phone.id"
        class="wh-phone"
      >
        <el-col :span="9" style="color: $--color-text-regular;">{{
          phone.department == "" ? "总机" : phone.department
        }}</el-col>
        <el-col :span="15" style="text-align: right;">
          <a class="wh-phone-btn" v-bind:href="'tel:' + phone.phone">{{
            phone.phone | phonestr(1)
          }}</a
          ><span style="color:$--color-text-regular;display:block">{{
            phone.phone | phonestr(2)
          }}</span>
        </el-col>
      </el-row>
      <!-- <div slot="footer" class="dialog-footer"> -->
      <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      <!-- </div> -->
    </el-dialog>
    <el-dialog
      title="医院地址"
      :visible.sync="addressDialogVisible"
      width="80%"
      class="wh-dialog"
    >
      {{ currentHospital.address }}
    </el-dialog>
    <div
      v-show="isOpening || isShowLaunch"
      class="el-dialog__wrapper wh-dialog"
      style="z-index: 2020">
      <div
        v-show="isOpening"
        class="launch-mask">
        <img class="launch-logo" src="@/assets/launch.jpg" />
      </div>
      <div v-show="isShowLaunch"
        role="dialog"
        class="launch-main"
        @touchmove.prevent>
        <img v-on:click="isShowLaunch = false" class="launch-btn" src="@/assets/btn_launch.png" />
        <a href="https://shimo.im/docs/5zAZVlQzEDc5FgAo/read">
          <img class="launch-aboutme" src="@/assets/aboutme.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HospitalInfoItem from "./HospitalInfoItem";
import HeaderLayout from "./HeaderLayout";
import {wxShare} from "../common/mixins";

export default {
  name: "FrontIndex",
  mixins: [wxShare],
  components: { HospitalInfoItem, HeaderLayout },
  data() {
    return {
      lastUpdateTime: "",
      areaName: "全部地区",
      areas: {
        center: [
          "江岸区",
          "江汉区",
          "硚口区",
          "汉阳区",
          "武昌区",
          "青山区",
          "洪山区"
        ],
        other: [
          "蔡甸区",
          "江夏区",
          "黄陂区",
          "新洲区",
          "东西湖区",
          "汉南区",
          "东湖高新技术开发区",
          "经济技术开发区",
          "临空港开发区"
        ],
        // new: [],
        // noData: [],
        selected: "全部"
      },
      filterConditions: [
        {
          type: "accept",
          symbol: "receive_normal",
          name: "普通孕妇",
          checked: false
        },
        {
          type: "accept",
          symbol: "receive_sick",
          name: "疑似/确诊孕妇",
          checked: false
        },
        {
          type: "check",
          symbol: "receive_normal_check",
          name: "常规产检",
          checked: false
        },
        {
          type: "check",
          symbol: "receive_ultrasound",
          name: "孕期产检B超",
          checked: false
        },
        {
          type: "check",
          symbol: "receive_clour_ultrasound",
          name: "中孕期三维排畸彩超（大排畸）",
          checked: false
        },
        {
          type: "check",
          symbol: "receive_accouche",
          name: "接生",
          checked: false
        },
        {
          type: "other",
          symbol: "receive_check",
          name: "核酸检测",
          checked: false
        },
        {
          type: "other",
          symbol: "verify",
          name: "医院信息已核实",
          checked: false
        }
      ],
      conditions: [],
      restaurants: [],
      state: "",
      activeNames: ["1"],
      hospitalname: "",
      input_active: false,
      hospitallist: [],
      visiblemenu: false,
      visibleOption: false,
      radio1: "全部",
      count: 10,
      loading: false,
      dialogFormVisible: false,
      addressDialogVisible: false,
      currentHospital: {},
      // 新增
      showPlace: false,
      showFilter: false,
      activeName: "hospital",
      itemSelected: false,
      isOpening: false,
      isShowLaunch: false
    };
  },
  computed: {
    hopitalInfo() {
      const initdata = {
        accept: [],
        check: [],
        delive: []
      };
      return this.filterConditions
        .filter(item => item.symbol !== "verify")
        .reduce((sofar, curr) => {
          curr.type === "accept"
            ? sofar.accept.push(curr)
            : curr.symbol === "receive_check"
            ? sofar.delive.push(curr)
            : sofar.check.push(curr);
          return sofar;
        }, initdata);
    },

    acceptConditions() {
      return this.filterConditions.filter(i => i.type === "accept");
    },
    checkConditions() {
      return this.filterConditions.filter(i => i.type === "check");
    },
    otherConditions() {
      return this.filterConditions.filter(i => i.type === "other");
    },
    allConditionChecked() {
      return this.filterConditions.length === this.conditions.length;
    },
    /**
     * highlight the filter button if the filter dialog is open, or if there are existing filter conditions
     */
    shouldHighlightFilterButton() {
      return this.conditions.length !== 0 || this.showFilter;
    }
  },
  filters: {
    phonestr(str, idx) {
      console.log(idx);
      if (!str) return "";
      if (str.indexOf("转") > -1) {
        let tempArr = str.split("转");
        if (idx === 1) return tempArr[0];
        if (idx === 2) return "转" + tempArr[1];
      } else {
        if (idx === 1) return str;
        if (idx === 2) return "";
      }
    }
  },
  methods: {
    handleCommandFunc(action) {
      if (action === "rest") {
        this.conditions = [];
        this.$refs.domFilter.click();
      }
    },
    changeShowPlace(visible) {
      this.showPlace = visible;
    },
    changeShowFilter(visible) {
      this.showFilter = visible;
    },
    clickHospital(hospital) {
      hospital.show = !hospital.show;
    },
    toggleFilterCondition(condition) {
      this.filterConditions.forEach(c => {
        if (c.symbol === condition.symbol) {
          c.checked = !c.checked;
        }
      });
    },
    checkAllFilterCondition() {
      const checked = this.allConditionChecked;
      if (!checked) {
        this.conditions = this.filterConditions.map(c => c.symbol);
      } else {
        this.conditions = [];
      }
    },
    showPhoneDialog(hospital) {
      let that = this;
      this.currentHospital = hospital;
      this.$http
        .get("/wh/msg/phone?uuid=" + hospital.uuid)
        .then(function(response) {
          if (response.data.code === "0000") {
            that.currentHospital.phones = response.data.result;
            that.dialogFormVisible = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showAddressDialog(hospital) {
      this.currentHospital = hospital;
      this.addressDialogVisible = true;
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    handleSelect(item) {
      this.showPlace = !this.showPlace;
      this.itemSelected = true;
      this.areas.selected = item;
      this.hospitalname = "";
      var params = "";
      if (item === "全部" && this.conditions.length < 1) {
        params = "all=1";
      }
      if (item === "全部" && this.conditions.length > 0) {
        params = "all=2";
      }
      if (item !== "全部" && this.conditions.length > 0) {
        params = "all=2&area=" + item;
      }
      if (item !== "全部" && this.conditions.length < 1) {
        params = "all=3&area=" + item;
      }
      this.conditions.forEach(c => {
        params += `&${c}=是`;
      });
      this.fetchHospitalInfo(params);
    },
    handleOpen() {},
    handleClose() {},
    searchHospital() {
      this.$refs.domInput.blur();
      let params = "all=0";
      if (this.hospitalname !== "") {
        params = params + "&name=" + this.hospitalname;
      } else {
        this.searchHospitalByOption(false);
        return;
      }
      this.fetchHospitalInfo(params);
      // reset other filters
      this.conditions = [];
      this.areas.selected = "全部";
      this.itemSelected = false;
    },
    searchHospitalByOption(filterClick) {
      let that = this;
      var params = "";
      if (!this.conditions.length) {
        params = "all=1";
      } else {
        params = "all=2";

        this.conditions.forEach(c => {
          params += `&${c}=是`;
        });
      }
      if (this.areas.selected !== "全部") {
        params = params + "&area=" + this.areas.selected;
      }
      this.fetchHospitalInfo(params);
      if (filterClick) {
        that.$refs.domFilter.click();
      }
    },

    fetchHospitalInfo(params) {
      this.hospitallist = [];
      this.$http
        .get("/wh/msg/hospital?page_num=1&page_size=100&" + params)
        .then(response => {
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
    },

    fetchShowLaunch() {
      let showLaunch = sessionStorage.getItem("isNoLaunch");
      if (!showLaunch) {
        this.isOpening = true;
        this.$http
          .get("/wh/msg/popup")
          .then(response => {
            this.isOpening = false;
            if (response.data.code === "0000") {
              this.isShowLaunch = true;
              let timer = setTimeout(() => {
                this.isShowLaunch = false;
                clearTimeout(timer);
              }, 3000);
            } else {
              sessionStorage.setItem("isNoLaunch", true)
            }
          })
      } else {
        this.isOpening = false;
      }
    }
  },
  mounted() {
    this.fetchShowLaunch();
    this.searchHospitalByOption();
  }
};
</script>

<style scoped lang="scss">
.sub-text {
  color: $--color-text-secondary;
  font-size: 12px;
  padding: 5px 0 5px 12px;
}
.el-button + .el-button {
  margin-left: 0px;
}
.el-button.sort {
  margin-right: 10px;
  margin-bottom: 10px;
}
.pop-bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pop-bottom__btn {
  flex: 1;
  height: 100%;
  padding: 10px;
  color: #9d9d9d;
  text-align: center;
  border-right: 1px #dcdfe6 solid;
}
.pop-bottom__btn:last-child {
  border-right: none;
}
.pop-bottom__btn.active {
  color: $--color-primary;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wh-phone {
  text-align: left;
  padding: 0px 0 10px;
  border-bottom: 1px solid #f0f0f0;
}
.wh-phone:last-child {
  border-bottom: none;
}
.wh-phone-btn {
  text-decoration-line: none;
  color: $--color-primary;
}
.wh-dialog /deep/.el-dialog__title {
  display: inline-block;
  margin-right: 20px;
}
.el-checkbox__label {
  font-size: 12px;
}
.success {
  margin-right: 5px;
  color: $--color-success;
}
.error {
  margin-right: 5px;
  color: $--color-error;
}
.el-dropdown-menu {
  max-height: 72vh;
  overflow: scroll;
}
.city-filter-dialog .el-dropdown-menu__item.act {
  color: $--color-primary;
}
.hospital-filter-dialog {
  padding-bottom: 0;
}
.city-filter-dialog /deep/ .el-dropdown-menu__item {
  font-size: 12px;
  font-weight: normal;
  color: #2f3036;
}
.hospital-filter-dialog /deep/ .el-checkbox .el-checkbox__label {
  font-size: 12px;
  font-weight: normal;
  color: #2f3036;
}
.el-checkbox {
  display: block;
  margin: 10px 12px;
}
.el-dialog__footer {
  padding: 0;
}
.wh-container {
  position: relative;
  height: calc(100vh - 81px);
  color: #333;
  padding: 10px 16px;
}
// .hearder-block {
//   margin: 0 -16px 15px -16px;
// }
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
  margin: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px 8px;
}
.hospital-search-bar {
  margin: 15px -4px 0 -4px;
  display: flex;
  justify-content: space-between;
}

.hospital-search-bar > div {
  margin: 0 2px;
  box-sizing: border-box;
}
.hospital-search-bar .btn {
  height: 30px;
  padding: 0 6px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hospital-search-bar .btn.small {
  width: 64px;
}
.hospital-search-bar .btn.long {
  max-width: 100px;
  min-width: 64px;
}

.hospital-search-bar .btn .btn-icon {
  width: 12px;
  height: 16px;
  margin-right: 5px;
}
.hospital-search-bar .btn {
  color: $--color-text-secondary;
}
.hospital-search-bar .btn .btn-text {
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.btn-text-act {
  font-size: 12px;
  font-family: Source Han Sans;
  font-weight: bold;
  color: $--color-primary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-icon-act {
  color: $--color-primary;
}
.new-area {
  color: #d0595c;
}
.no-data-area {
  color: #e4af3d;
}
.hospital-search-bar .btn.act {
  color: $--color-primary;
}
.hospital-search-bar .search-con {
  width: 50%;
  height: 30px;
  padding: 0 6px;
  background: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  display: flex;
  align-items: center;
}
.hospital-search-bar .search-con input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 2px;
  border: none;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none;
  margin-left: 4px;
}
.hospital-search-bar .search-con.act {
  border: $--color-primary 1px solid;
  border-radius: 2px;
}
.hospital-search-bar .search-con img {
  width: 13px;
  height: 13px;
}
.hospital-list {
  padding-bottom: 50px;
}
.filter-con {
  width: 300px;
}
.hospital-con {
  font-size: 0;
  background: #fff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
.hospital-icon {
  display: block;
  width: 20px;
  height: 20px;
  color: $--color-text-secondary;
  font-size: 14px;
  margin-top: 10px;
}
.hospital-con-title {
  padding: 10px 10px;
  margin-top: 10px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: top;
  box-sizing: border-box;
}
.info-container {
  position: relative;
  width: 100%;
  padding-right: 25px;
}
.info-container .name {
  margin-bottom: 5px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  color: $--color-text-regular;
}
.info-container .info-text {
  text-align: left;
  font-size: 8px;
  color: $--color-text-secondary;
}
.tel-btn .info-text {
  text-align: left;
  font-size: 8px;
  color: $--color-text-secondary;
  white-space: nowrap;
  display: block;
}
.tel-btn .tel-btn-icon {
  display: inline-block;
  margin-bottom: 6px;
  width: 20px;
  height: 20px;
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
  // border-top: solid #dcdfe6 1px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 2px;
  text-align: left;
}
.hospital-info .info-wrapper {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
.hospital-info .info-title {
  font-size: 17px;
  font-weight: bold;
  text-align: left;
}
.other-msg-title {
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
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: rgba(172, 172, 172, 1);
  opacity: 1;
}
.additional-desc {
  // width: 68px;
  height: 20px;
  background: rgba(88, 135, 255, 1);
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  box-shadow: none;
  border: none;
  margin: 5px 10px 10px 10px;
}
.arrow_icon_right {
  width: 8.5px;
  height: 10px;
  margin: 5px 12px 0 12px;
}
.arrow_icon_down {
  width: 12px;
  height: 6px;
  margin: 7px 12px 0 9px;
}
.launch-mask {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.launch-logo {
  width: 75%;
  margin-top: 25vh;
}
.launch-btn {
  width: 58%;
  margin-top: 54vh;
}
.launch-main {
  width: 100%;
  height: 100%;
  background-image: url("/static/img/bg_launch.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #fff;
}
.launch-aboutme {
  width: 20%;
  position: absolute;
  bottom: 2vh;
  left: 40%;
}
.no-data-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #acacac;
}
</style>
