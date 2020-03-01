<template>
  <div>
    <HospitalList type="Front" v-show="isShowList" />
    <div
      v-show="isShowLaunch"
      class="el-dialog__wrapper wh-dialog"
      style="z-index: 2020"
    >
      <div
        v-show="isShowLaunch"
        role="dialog"
        class="launch-main"
        @touchmove.prevent
      >
        <img
          v-on:click="
            () => {
              isShowLaunch = false;
              isShowList = true;
            }
          "
          class="launch-btn"
          src="@/assets/btn_launch.png"
        />
        <a href="https://shimo.im/docs/5zAZVlQzEDc5FgAo/read">
          <img class="launch-aboutme" src="@/assets/aboutme.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HospitalList from "./HospitalList";
import { wxShare } from "../common/mixins";
export default {
  name: "FrontIndx",
  mixins: [wxShare],
  components: { HospitalList },
  data() {
    return {
      isShowList: true,
      isShowLaunch: false
    };
  },
  methods: {
    fetchShowLaunch() {
      let showLaunch = sessionStorage.getItem("isNoLaunch");
      if (!showLaunch) {
        this.isShowList = false;
        this.$http.get("/wh/msg/popup").then(response => {
          if (response.data.code === "0000") {
            let img = new Image();
            img.src = "https://static.qingclouds.cn/bg_launch.jpg";
            let imgLoad = setInterval(() => {
              if (img.complete) {
                clearInterval(imgLoad);
                this.isShowLaunch = true;
                let timer = setTimeout(() => {
                  this.isShowLaunch = false;
                  this.isShowList = true;
                  clearTimeout(timer);
                }, 3000);
              }
            }, 50);
          } else {
            this.isShowList = true;
            sessionStorage.setItem("isNoLaunch", true);
          }
        });
      }
    }
  },
  mounted() {
    this.fetchShowLaunch();
  }
};
</script>

<style lang="scss" scoped>
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
  background-image: url("https://static.qingclouds.cn/bg_launch.jpg");
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
</style>
