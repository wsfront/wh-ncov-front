<template>
  <div class="wh-container full">
    <div class="block">
      <div @click="backHome" class="el-backhome" style="top: 30px; left: 20px;">
        <i class="el-icon-s-home"></i>
      </div>
      <div v-if="!isShow" @click="isShow = true" class="catalog-btn">
        <i class="el-icon-s-fold"></i>
        <span class="catalog-btn-text">目录</span>
      </div>
      <el-drawer :visible.sync="isShow" size="64%" :with-header="false">
        <div class="catalog">
          <div class="catalog-header">
            孕产妇夏季防疫指南
          </div>
          <div class="catalog-main">
            <ul class="catalog-body">
              <li
                v-for="item in catalogs"
                :key="item.code"
                class="catalog-item mt-6"
              >
                <span
                  @click="goAnchor(item)"
                  :class="[
                    'catalog-title',
                    { active: activeCode === item.code }
                  ]"
                  >{{ item.name }}</span
                >
                <ul
                  v-if="item.children && item.children.length"
                  class="catalog-ul-body"
                >
                  <li
                    v-for="citem in item.children"
                    :key="citem.code"
                    :class="[
                      'catalog-item',
                      { active: activeCode === citem.code }
                    ]"
                  >
                    <span @click="goAnchor(citem)">{{ citem.name }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </el-drawer>
      <div class="booklet">
        <div id="sumprev0_00" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev_01.png"
          />
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev_02.png"
          />
        </div>
        <div id="sumprev1_01" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev1_01.png"
          />
        </div>
        <div id="sumprev1_02" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev1_02.png"
          />
        </div>
        <div id="sumprev1_03" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev1_03.png"
          />
        </div>
        <div id="sumprev2_01" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_01.png"
          />
        </div>
        <div id="sumprev2_02" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_02.png"
          />
        </div>
        <div id="sumprev2_03" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_03.png"
          />
          <a
            class="jump-link _2_03"
            href="javascript:void(0);"
            @click.stop.prevent="goAnchor('sumprev4_01')"
          ></a>
        </div>
        <div id="sumprev2_04" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_04.png"
          />
        </div>
        <!-- <div id="sumprev2_05" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_05.png"
          />
        </div>
        <div id="sumprev2_06" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_06.png"
          />
        </div>
        <div id="sumprev2_07" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_07.png"
          />
        </div>
        <div id="sumprev2_08" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev2_08.png"
          />
          <a
            class="jump-link _0208 _1"
            href="https://mp.weixin.qq.com/s/ybr7ilvo6OCMsY6Mnx-hdg"
          ></a>
          <a
            class="jump-link _0208 _2"
            href="https://mp.weixin.qq.com/s/XKdf7jws70K1yisl-CLauA"
          ></a>
        </div> -->

        <!-- <div id="sumprev3_00" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev3_00.png"
          />
        </div> -->
        <div id="sumprev3_01" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev3_01.png"
          />
        </div>
        <div id="sumprev3_02" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev3_02.png"
          />
        </div>
        <div id="sumprev3_03" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev3_03.png"
          />
          <a
            class="jump-link _3_03"
            href="javascript:void(0);"
            @click.stop.prevent="goAnchor('sumprev1_01')"
          ></a>
        </div>
        <div id="sumprev4_01" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev4_01.png"
          />
        </div>
        <div id="sumprev4_02" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev4_02.png"
          />
        </div>
        <div id="sumprev5_01" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev5_01.png"
          />
        </div>
        <div id="sumprev5_02" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev5_02.png"
          />
        </div>
        <div id="sumprev5_03" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev5_03.png"
          />
        </div>
        <div id="sumprev5_04" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev5_04.png"
          />
          <!-- <a
            class="jump-link _0504 _1"
            href="https://mp.weixin.qq.com/s/YpeCW6MG9iCS_E0an4dwwQ"
          ></a>
          <a
            class="jump-link _0504 _2"
            href="https://mp.weixin.qq.com/s/Qce07ZQksUpf5lO8Kc1-_Q"
          ></a>
          <a
            class="jump-link _0504 _3"
            href="https://mp.weixin.qq.com/s/cCGXPwG4IXD8OfrM3hw3Qw"
          ></a> -->
        </div>
        <div id="sumprev5_05" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev5_05.png"
          />
        </div>
        <div id="sumprev5_06" class="booklet-item">
          <img
            class="booklet-img"
            src="//ncp.qingclouds.cn/summer/sumprev5_06.png"
          />
        </div>
      </div>
    </div>
    <el-backtop
      :right="20"
      :bottom="40"
    ></el-backtop>
  </div>
</template>

<script>
import HeaderLayout from './HeaderLayout'
import { wxShare } from '../common/mixins'
import Info from './info'

let pageHeight
let scrollEvent

function throlle(func) {
  let lock = false
  return (...args) => {
    if (lock) return
    func(...args)
    lock = true
    requestAnimationFrame(() => {
      lock = false
    })
  }
}
export default {
  name: 'EaseHandbook',
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {
      // diyShareTitle: true,
      // loading: true,
      // activeIndex: 0,
      currentIndex: null,
      isShow: false,
      activeCode: 'sumprev_02',
      // flag: [],
      // backTopShow: false,
      catalogs: [
        {
          code: 'sumprev1_01',
          name: '一、居家防疫',
          children: [
            {
              code: 'sumprev1_02',
              name: '01 - 在家勤消毒否'
            },
            {
              code: 'sumprev1_03',
              name: '02 - 夏季居家留心'
            }
          ]
        },
        {
          code: 'sumprev2_01',
          name: '二、工作场所防疫',
          children: [
            {
              code: 'sumprev2_02',
              name: '01 - 个人防护'
            },
            {
              code: 'sumprev2_03',
              name: '02 - 压力处理'
            },
            {
              code: 'sumprev2_04',
              name: '03 - 职场夏季背奶'
            }
          ]
        },
        {
          code: 'sumprev3_01',
          name: '三、公共场所防疫',
          children: [
            {
              code: 'sumprev3_02',
              name: '01 - 医院防护注意'
            },
            {
              code: 'sumprev3_03',
              name: '02 - 外出游玩提醒'
            }
          ]
        },
        {
          code: 'sumprev4_01',
          name: '四、个人心理防护',
          children: [
            {
              code: 'sumprev4_02',
              name: '01 - 情绪波动原因及调节'
            }
          ]
        },
        {
          code: 'sumprev5_01',
          name: '五、宝宝防疫',
          children: [
            {
              code: 'sumprev5_02',
              name: '01 - 宝宝夏季防护'
            },
            { code: 'sumprev5_03', name: '02 - 宝宝疫苗接种' },
            { code: 'sumprev5_04', name: '03 - 宝宝发烧' }
          ]
        },
        {
          code: 'sumprev5_06',
          name: '参考来源和医学顾问'
        },
        {
          code: 'innerLink',
          name: '查看安心待产手册',
          path: 'WaitManual'
        }
      ]
    }
  },
  methods: {
    showHide(index, selector) {
      if (this.$refs.child[index].style.display === 'list-item') {
        this.$refs.child[index].style.display = 'none'
        this.$refs.close[index].style.display = 'inline-block'
        this.$refs.open[index].style.display = 'none'
        this.currentIndex = null
      } else {
        this.$refs.child[index].style.display = 'list-item'
        this.$refs.close[index].style.display = 'none'
        this.$refs.open[index].style.display = 'inline-block'
        if (this.currentIndex !== null) {
          this.$refs.child[this.currentIndex].style.display = 'none'
          this.$refs.close[this.currentIndex].style.display = 'inline-block'
          this.$refs.open[this.currentIndex].style.display = 'none'
        }
        this.currentIndex = index
      }
    },
    backHome() {
      this.$router.push('FrontCheckIndex')
    },
    bindProcess() {
      // let that = this;
      let imgList = this.$el.querySelectorAll('.booklet-img')
      let len = imgList.length

      // console.log(imgList)
      setTimeout(() => {
        ;[...imgList].forEach(s => {
          s.onload = function() {
            len--
            if (!len) {
              requestAnimationFrame(() => {
                pageHeight = document.body.scrollHeight
                // console.log(document.body.scrollHeight)/
                // if(window.pageYOffset == 0){debugger}
                scrollEvent = throlle(function() {
                  sessionStorage.setItem(
                    'sumprev-process',
                    (window.pageYOffset / pageHeight).toString()
                  )
                  // }
                })
                window.addEventListener('scroll', scrollEvent)
              })
            }
          }
        })
      }, 0)
    },
    goAnchor(target) {
      this.isShow = false

      let selector = typeof target === 'object' ? target.code : target
      if (selector === 'innerLink') {
        this.$router.push({
          path: target.path,
          query: { from: 'sumprev' }
        })
        return
      }
      if (selector === this.$route.query.selector) {
        return
      }
      let that = this
      this.activeCode = selector
      let targetImg = that.$el.querySelector('#' + that.activeCode + ' img')
      let targetPosition = that.$el.querySelector('#' + that.activeCode)
      // this.$router.push()
      this.$router.push({
        path: 'SumPrev',
        // params: { selector },
        query: { selector }
      })

      this.$nextTick(function() {
        // Code that will run only after the
        // entire view has been re-rendered
        if (targetImg.complete && targetImg.src.indexOf(that.activeCode) > -1) {
          targetPosition.scrollIntoView()
        }
      })
    }
  },
  mounted() {
    // let that = this;
    this.bindProcess()
    // window.addEventListener('scroll', () => {
    //   if (!this.backTopShow) {
    //     return
    //   }
    //   if (window.scrollY > 200) {
    //     this.backTopShow = true
    //   } else {
    //     this.backTopShow = false
    //   }
    // })
  },
  beforeRouteEnter(to, from, next) {
    Info.$emit('frameDisplay', false)
    next(vm => {
      // access to component instance via `vm`

      // console.log('routerin')

      scrollEvent && window.addEventListener('scroll', scrollEvent)
      if (from.name === 'FrontCheckIndex') {
      } else {
        var pageProcess = Number(sessionStorage.getItem('sumprev-process'))
        if (pageProcess && pageHeight) {
          window.scrollTo({
            top: pageProcess * pageHeight
          })
        }
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    // debugger
    scrollEvent && window.removeEventListener('scroll', scrollEvent)
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.block /deep/ .el-drawer:focus {
  outline: none;
}
.hearder-block {
  margin: 10px 0 0;
}
.wh-container {
  position: relative;
  // height: calc(100vh - 82px);
  color: #333;
  &.full {
    // height: 100vh;
  }
}
.el-backhome {
  // background: red;
  // z-index: 2222222;
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #5887ff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 20px;
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
}
.jump-link {
  position: absolute;
  height: 22px;
  width: 20%;
  bottom: 10%;
  left: 10%;
  // background: antiquewhite;
  opacity: 0.8;
  &._2_03 {
    width: 25%;
    bottom: 17.3%;
    left: 16%;
  }
  &._3_03 {
    bottom: 34.2%;
    left: 32%;
    width: 24%;
  }
}

.block {
  // height: 100%;
  background: #faf1fa;
  box-sizing: border-box;
  // overflow-y: scroll;
  .el-drawer:focus {
    box-shadow: none;
  }
}
.home-btn {
  position: fixed;
  width: 60px;
  top: 30px;
  left: 10px;
  z-index: 1;
}
.catalog {
  font-size: 14px;
  color: #2f3036;
  &-btn {
    position: fixed;
    top: 50%;
    margin-top: -30px;
    right: 0;
    background-color: #fff;
    width: 80px;
    height: 40px;
    border-radius: 20px 0 0 20px;
    color: $--color-primary;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 20px;
    -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 5;
  }
  &-btn-text {
    font-size: 14px;
    color: $--color-primary;
    font-weight: 500;
    padding-left: 5px;
  }
  &-header {
    line-height: 56px;
    border-bottom: 1px solid #e6e5e5;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    padding-left: 20px;
    color: $--color-primary;
    span {
      float: right;
    }
  }
  &-main {
    height: calc(100vh - 55px);
    box-sizing: border-box;
    overflow-y: scroll;
  }
  &-body {
    margin: 0 0 30px;
    padding: 0;
    text-align: left;
    list-style: none;
  }
  &-ul-body {
    padding: 0;
    .active {
      font-weight: bold;
      color: white;
      background-color: $--color-primary;
    }
  }
  &-item {
    line-height: 36px;
    text-decoration: none;
    list-style: none;
    span {
      padding-left: 52px;
    }
  }
  &-title {
    margin-top: 10px;
    padding-left: 20px !important;
    font-weight: bold;
    font-size: 16px;
    color: $--color-primary;
    display: block;
  }
}
@media screen and (max-width: 350px) {
  .catalog {
    &-title {
      font-size: 15px;
    }
  }
}
.booklet {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  &-img {
    width: 100%;
    display: block;
  }
  &-item {
    position: relative;
  }
}
.goto {
  width: 26.5%;
  height: 5%;
  position: absolute;
  top: 38.7%;
  left: 37.5%;
  display: block;
}
.findme {
  width: 32.25%;
  height: 2.35%;
  position: absolute;
  left: 14%;
  bottom: 8.35%;
  display: block;
}
.get-more {
  width: 32.2%;
  height: 4.5%;
  position: absolute;
  right: 13.5%;
  bottom: 17%;
  display: block;
}
img[lazy='loading'] {
  width: 32px;
  margin: 0 auto;
}
</style>
