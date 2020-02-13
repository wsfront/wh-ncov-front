<template>
  <div class="wh-container">
    <HeaderLayout :activeIndex="0" />

    <div name="hospital">
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
          <div class="small-btn" :class="{act:shouldHighlightFilterButton}" ref="domFilter">
            <!-- <img class="btn-icon" src="../assets/filter.png"> -->
            <!-- <img class="btn-icon" src="../assets/filter-act.png"> -->
            <i class="el-icon-s-operation"></i>
            <div class="btn-text">筛选</div>
          </div>
          <el-dropdown-menu slot="dropdown" class="hospital-filter-dialog">
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
              <span class="pop-bottom__btn active" @click="searchHospitalByOption(true)">确认查看</span>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="search-con" :class="{act:shouldHighlightSearchBar}">
          <input v-model="hospitalname" placeholder="请输入医院名字"  @focus="input_active = true" @blur="input_active = false"/>
          <img v-if="!input_active"
            class="btn-icon"
            src="../assets/search.png"
            @click="searchHospital"
          />
          <img v-if="input_active"
            class="btn-icon"
            src="../assets/search-blue.png"
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
              <i class="el-collapse-item__arrow el-icon-arrow-right hospital-icon" :class="{'is-active': hospital.show}"></i>
              <div class="info-container">
                <div class="name">{{ hospital.name }}</div>
                <div class="info-text">
                  <span :class="{success:!!hospital.verify,error:!hospital.verify}">{{ hospital.verify == 1 ? "已核实" : "待核实" }}</span>
                  {{ hospital.update_time }} 更新
                </div>
              </div>
              <div class="tel-btn" @click.stop="showPhoneDialog(hospital)">
                <img class="tel-btn-icon" src="../assets/phone.png" />
                <span class="info-text"> 电话咨询 </span>
              </div>
            </div>
            <div class="hospital-info" v-show="hospital.show">
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
              <HospitalInfoItem name="接生" :data="hospital.receive_accouche" />
              <el-divider />
              <div>
                <div class="other-msg-title">补充说明</div>
                <div class="other-msg">{{ hospital.remark }}</div>
              </div>
              <div class="address-btn" @click="showAddressDialog(hospital)">
                <i class="el-icon-location" />
                医院地址: {{ hospital.address }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <el-dialog v-bind:title="currentHospital.name" :visible.sync="dialogFormVisible" width="80%" class="wh-dialog">
      <el-row v-for="phone in currentHospital.phones" v-bind:key="phone.id" class="wh-phone">
        <el-col :span="6">{{phone.department==''?"--":phone.department}}</el-col>
        <el-col :span="10" :offset="8">
          <a class="wh-phone-btn" v-bind:href="'tel:' + phone.phone">{{ phone.phone }}</a
          >
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      </div>
    </el-dialog>
    <el-dialog title="医院地址" :visible.sync="addressDialogVisible" width="80%" class="wh-dialog">
      {{currentHospital.address}}
    </el-dialog>
  </div>
</template>

<script>
import HospitalInfoItem from "./HospitalInfoItem";
import HeaderLayout from "./HeaderLayout";
export default {
  name: "FrontIndex",
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
        other: ["蔡甸区", "江夏区", "黄陂区", "新洲区", "东西湖区", "汉南区"],
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
          name: "可接生",
          checked: false
        },
        {
          type: "other",
          symbol: "receive_check",
          name: "可做核酸检测",
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
      activeName: "hospital"
    };
  },
  computed: {
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
      console.log(
        "999",
        this.filterConditions.length === this.conditions.length
      );
      return this.filterConditions.length === this.conditions.length;
    },
    /**
     * highlight the filter button if the filter dialog is open, or if there are existing filter conditions
     */
    shouldHighlightFilterButton() {
      return this.conditions.length !== 0 || this.showFilter;
    },
    /**
     * highlight the text search bar when input is not empty.
     */
    shouldHighlightSearchBar() {
      return this.hospitalname !== "" || this.input_active;
    }
  },
  methods: {
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
      this.areas.selected = item;
      var params = "";
      if (item === "全部") {
        params = "all=1";
      } else if (this.conditions.length > 0) {
        params = "all=2&area=" + item;
      } else {
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
    }
  },
  mounted() {
    this.searchHospitalByOption();
  }
};
</script>

<style scoped lang="scss">
.sub-text {
  color: #acacac;
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
}
.wh-phone-btn {
  text-decoration-line: none;
  color: $--color-primary;
}
.wh-dialog .el-dialog__title {
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
.el-dropdown-menu__item.act {
  color: $--color-primary;
}
.hospital-filter-dialog {
  padding-bottom: 0;
}
.el-checkbox {
  display: block;
  margin: 10px 12px;
}
.el-dialog__footer {
  padding: 0;
}
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
  margin: 0;
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
.hospital-search-bar .small-btn {
  color: #acacac;
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
  color: $--color-primary;
}
.hospital-search-bar .search-con {
  width: 196px;
  height: 31px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 4px;
  position: relative;
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  transition: border 0.5s;
  &:active, &:focus, &:hover{
    border-color: $--color-primary;
  }
}
.hospital-search-bar .search-con.act {
  border-style: solid;
  border-width: 2px;
  border-color: $--color-primary;
}
.hospital-search-bar .search-con input {
  border-radius: 2px;
  border: none;
  outline: none;
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
.hospital-icon {
  display: block;
  width: 20px;
  height: 20px;
  color: #acacac;
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
.hospital-con-title.shadow {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
}
.info-container {
  position: relative;
  width: 100%;
}
.info-container .name {
  margin-bottom: 5px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  color: #2f3036;
}
.info-container .info-text {
  text-align: left;
  font-size: 8px;
  color: #acacac;
}
.tel-btn .info-text {
  text-align: left;
  font-size: 8px;
  color: #acacac;
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
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  color: rgba(172, 172, 172, 1);
  opacity: 1;
}
</style>
