<template>
  <div :class="['wh-container']">
    <div class="hearder-block">
      <HeaderLayout :activeIndex="2"/>
    </div>
    <v-touch v-on:swipeup="handleNav()">
      <div class="launch-main">
        <img
          @click="handleNav()"
          class="launch-btn"
          src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease_button.png"
        />
      </div>
    </v-touch>
    
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
import { wxShare } from "../common/mixins";
import Info from "./info";

export default {
  name: "EaseHandbook",
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {
     
    };
  },
  methods: {
   
    handleNav() {
      this.$router.push('WaitManual')
    },

   
   
  },
  mounted() {

  },
  beforeCreate() {
    this.$nextTick(()=>{
      Info.$emit("frameDisplay", true);
    })
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.block /deep/ .el-drawer:focus {
  outline: none;
}
.block /deep/ .el-backtop {
  color: $--color-easy-main;
}
.block .el-icon-caret-right {
  color: $--color-easy-main;
}
.block .el-icon-caret-bottom {
  color: $--color-easy-main;
  display: none;
}
.block .icon {
  width: 16px;
  height: 16px;
}
.wh-container {
  position: relative;
  height: calc(100vh - 82px);
  color: #333;
}



.jump-link {
  position: absolute;
  height: 22px;
  width: 20%;
  bottom: 10%;
  right: 10%;
  // background: antiquewhite;
  opacity: 0.8;
  &._0101 {
    width: 42%;
    bottom: 20%;
    right: 30%;
  }
  &._03 {
    width: 31%;
    bottom: 10%;
    right: 16%;
  }
  &._06 {
    width: 18%;
    bottom: 70%;
    right: 16%;
  }
  &._0602 {
    bottom: 5%;
    right: 38%;
  }
  &._0108 {
    bottom: 9%;
    right: 23%;
  }
  &._0109 {
    width: 45%;
    bottom: 59%;
    right: 31%;
    &._2 {
      bottom: 45%;
    }
    &._3 {
      bottom: 30%;
    }
  }
  &._0208 {
    bottom: 53%;
    right: 57%;
    &._2 {
      bottom: 36%;
    }
  }
  &._0311 {
    &._1 {
      width: 45%;
      bottom: 67%;
      right: 30%;
    }
    &._2 {
      width: 22%;
      bottom: 55%;
      right: 54%;
    }
    &._3 {
      width: 33%;
      bottom: 43%;
      right: 42%;
    }
    &._4 {
      width: 33%;
      bottom: 24%;
      right: 42%;
    }
  }
  &._4101 {
    width: 33%;
    bottom: 8%;
    right: 38%;
  }
  &._4102 {
    width: 20%;
    bottom: 20%;
    right: 52%;
    &._2 {
      width: 13%;
      bottom: 20%;
      right: 38%;
    }
  }
  &._4103 {
    width: 32%;
    bottom: 30%;
    right: 38%;
  }
  &._4108 {
    width: 37%;
    bottom: 32%;
    right: 38%;
  }
  &._4206 {
    bottom: 65%;
    right: 46%;
  }
  &._4207 {
    width: 47%;
    bottom: 31%;
    right: 29%;
  }
  &._0504 {
    right: 57%;
    &._1 {
      bottom: 60%;
    }
    &._2 {
      bottom: 45%;
    }
    &._3 {
      bottom: 30%;
    }
  }
  &._0604 {
    width: 35%;
    right: 40%;
    &._1 {
      bottom: 56%;
    }
    &._2 {
      bottom: 36%;
    }
  }
  &._0701 {
    width: 33%;
    bottom: 3%;
    right: 38%;
  }
  &._0704 {
    width: 35%;
    bottom: 54%;
    right: 41%;
    &._2 {
      bottom: 37%;
    }
  }
  &._0814 {
    &._1 {
      width: 19%;
      bottom: 54%;
      right: 58%;
    }
    &._2 {
      width: 35%;
      bottom: 35%;
      right: 42%;
    }
  }
  &._0901 {
    &._1 {
      width: 67%;
      bottom: 7%;
      right: 16%;
    }
    &._2 {
      width: 54%;
      bottom: 4%;
      right: 29%;
    }
  }
  &._0903 {
    bottom: 18%;
    right: 19%;
  }
}
.hearder-block {
  margin: 10px 0 0;
}

.arrow_icon_right {
  color: #2aa9ae;
  width: 8.5px;
  height: 10px;
  margin: 5px 12px 0 12px;
}
.arrow_icon_down {
  display: none;
  width: 8.5px;
  height: 10px;
  margin: 5px 12px 0 12px;
}

.launch-main {
  top: 66px;
  width: 100%;
  height: calc(100vh - 69px);
  background-image: url("http://wuhan2099.oss-accelerate.aliyuncs.com/ease_cover.jpg");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: $--color-easy;
  z-index: 2;
}
.launch-btn {
  width: 64%;
  margin-top: 60vh;
  &.mt-10 {
    margin-top: 3vh;
  }
}

// @media screen and (max-width: 350px){
//   .catalog{
//     font-size: 13px;
//     &-header {
//       font-size: 15px;
//     }
//   }
// }
// @media screen and (min-width: 400px){
//   .catalog{
//     font-size: 15px;
//     &-header {
//       font-size: 17px;
//     }
//   }
// }
// .booklet {
//   // position: relative;
//   height: 100%;
//   -webkit-overflow-scrolling : touch;
//   overflow-y: scroll;
//   &-img {
//     width: 100%;
//     display: block;
//   }
//   &-item {
//     position: relative;
//   }
// }
// .goto {
//   width: 26.5%;
//   height: 5%;
//   position: absolute;
//   top: 38.7%;
//   left: 37.5%;
//   display: block;
// }
// .get-more {
//   width: 32.2%;
//   height: 4.5%;
//   position: absolute;
//   right: 13.5%;
//   bottom: 17%;
//   display: block;
// }
img[lazy="loading"] {
  width: 32px;
  margin: 0 auto;
}
</style>

