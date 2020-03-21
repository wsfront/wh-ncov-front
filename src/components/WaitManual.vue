<template>
  <div>
    <div class="block">
      <div @click="backHome" class="el-backtop" style="top: 30px; left: 20px;">
        <i class="el-icon-s-home"></i>
      </div>
      <div v-if="!isShow" @click="isShow = true" class="catalog-btn">
        <i class="el-icon-s-fold"></i>
        <span class="catalog-btn-text">目录</span>
      </div>
      <el-drawer :visible.sync="isShow" size="72%" :with-header="false">
        <div class="catalog">
          <div class="catalog-header">
            安心待产手册
            <!-- <p target=".booklet" :right="30" :top="20">回到顶部></p> -->
          </div>
          <div class="catalog-main">
            <ul class="catalog-body">
              <li
                v-for="(item, index) in catalogs"
                :key="item.code"
                class="catalog-body-container mt-6"
              >
                <span
                  v-if="index < 8"
                  class="catalog-title"
                  @click="showHide(index, item.code)"
                >
                  <i class="el-icon-caret-right icon" ref="close" />
                  <i ref="open" class="el-icon-caret-bottom icon" />
                  <span class="catalog-title-text">{{ item.name }}</span>
                </span>
                <span
                  v-else
                  :class="[
                    'catalog-title',
                    { active: activeCode === item.code }
                  ]"
                  @click="goAnchor(item.code)"
                  >{{ item.name }}</span
                >
                <ul
                  v-if="item.children && item.children.length"
                  class="catalog-ul-body"
                  ref="child"
                >
                  <li
                    v-for="citem in item.children"
                    :key="citem.code"
                    class="catalog-item mt-6"
                    :class="{
                      active:
                        activeCode === citem.code &&
                        !(citem.children && citem.children.length)
                    }"
                  >
                    <span
                      :class="{
                        'catalog-bold': citem.children && citem.children.length
                      }"
                      @click="goAnchor(citem.code)"
                      >{{ citem.name }}</span
                    >
                    <ul
                      class="catalog-sub-ul-body"
                      v-if="citem.children && citem.children.length"
                    >
                      <li
                        v-for="subcitem in citem.children"
                        :key="subcitem.code"
                        :class="[
                          'catalog-item',
                          { active: activeCode === subcitem.code }
                        ]"
                      >
                        <span @click="goAnchor(subcitem.code)">{{
                          subcitem.name
                        }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </el-drawer>
      <div class="booklet">
        <el-backtop target=".booklet" :right="20" :bottom="40"></el-backtop>
        <div id="ease0_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease0_00.png"
          />
        </div>

        <div id="ease1_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_00.png"
          />
        </div>
        <div id="ease1_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_01.png"
          />
          <a
            class="jump-link _0101"
            href="/#/FrontCheckIndex?preid=prev1_02"
          ></a>
        </div>
        <div id="ease1_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_02.png"
          />
        </div>
        <div id="ease1_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_03.png"
          />
          <a
            class="jump-link _03"
            href="javascript:void(0);"
            @click="goAnchor('ease3_06')"
          ></a>
        </div>
        <div id="ease1_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_04.png"
          />
        </div>
        <div id="ease1_05" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_05.png"
          />
        </div>
        <div id="ease1_06" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_06.png"
          />
          <!-- <a class="goto" href="http://yf.shcnwl.cn/"></a> -->
          <a
            class="jump-link _06"
            href="javascript:void(0);"
            @click="goAnchor('ease8_01')"
          ></a>
          <a class="jump-link _0602" href="/"></a>
        </div>
        <div id="ease1_07" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_07.png"
          />
          <a class="goto" href="http://yf.shcnwl.cn/"></a>
        </div>
        <div id="ease1_08" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_08.png"
          />
          <a
            class="jump-link _0108"
            href="javascript:void(0);"
            @click="goAnchor('ease8_01')"
          ></a>
        </div>
        <div id="ease1_09" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease1/ease1_09.png"
          />
          <a
            class="jump-link _0109 _1"
            href="https://mp.weixin.qq.com/s/JT_1i0EUK5fYmEJ80G_QQg"
          ></a>
          <a
            class="jump-link _0109 _2"
            href="https://mp.weixin.qq.com/s/giltubRO0bEGNwc8ArJZdw"
          ></a>
          <a
            class="jump-link _0109 _3"
            href="https://mp.weixin.qq.com/s/ZVicqJ2WIIeXjsAVDySwfw"
          ></a>
        </div>

        <div id="ease2_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_00.png"
          />
        </div>
        <div id="ease2_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_01.png"
          />
        </div>
        <div id="ease2_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_02.png"
          />
        </div>
        <div id="ease2_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_03.png"
          />
        </div>
        <div id="ease2_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_04.png"
          />
        </div>
        <div id="ease2_05" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_05.png"
          />
        </div>
        <div id="ease2_06" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_06.png"
          />
        </div>
        <div id="ease2_07" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_07.png"
          />
        </div>
        <div id="ease2_08" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease2/ease2_08.png"
          />
          <a
            class="jump-link _0208 _1"
            href="https://mp.weixin.qq.com/s/ybr7ilvo6OCMsY6Mnx-hdg"
          ></a>
          <a
            class="jump-link _0208 _2"
            href="https://mp.weixin.qq.com/s/XKdf7jws70K1yisl-CLauA"
          ></a>
        </div>

        <div id="ease3_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_00.png"
          />
        </div>
        <div id="ease3_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_01.png"
          />
        </div>
        <div id="ease3_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_02.png"
          />
        </div>
        <div id="ease3_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_03.png"
          />
        </div>
        <div id="ease3_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_04.png"
          />
        </div>
        <div id="ease3_05" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_05.png"
          />
        </div>
        <div id="ease3_06" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_06.png"
          />
        </div>
        <div id="ease3_07" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_07.png"
          />
          <!--  -->
        </div>
        <div id="ease3_08" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_08.png"
          />
          <!--  -->
        </div>
        <div id="ease3_09" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_09.png"
          />
          <!--  -->
        </div>
        <div id="ease3_10" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_10.png"
          />
          <!--  -->
        </div>
        <div id="ease3_11" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease3/ease3_11.png"
          />
          <a
            class="jump-link _0311 _1"
            href="https://mp.weixin.qq.com/s/6wM0H_-YoQwwsD113HHVVQ"
          ></a>
          <a
            class="jump-link _0311 _2"
            href="https://mp.weixin.qq.com/s/uTELIEQnnmTRwrdGeAHfAA"
          ></a>
          <a
            class="jump-link _0311 _3"
            href="https://mp.weixin.qq.com/s/G3L5-cjJ-4Zpwz80T4aRgg"
          ></a>
          <a
            class="jump-link _0311 _4"
            href="https://mp.weixin.qq.com/s/1EOMi6WZ86tN9JMuz9M_2w"
          ></a>
        </div>

        <div id="ease4_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease4_00.png"
          />
        </div>
        <div id="ease41_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_01.png"
          />
          <a
            class="jump-link _4101"
            href="javascript:void(0);"
            @click="goAnchor('ease8_05')"
          ></a>
        </div>
        <div id="ease41_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_02.png"
          />
          <a
            class="jump-link _4102 _1"
            href="javascript:void(0);"
            @click="goAnchor('ease7_01')"
          ></a>
          <a
            class="jump-link _4102 _2"
            href="javascript:void(0);"
            @click="goAnchor('ease8_01')"
          ></a>
        </div>
        <div id="ease41_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_03.png"
          />
          <a
            class="jump-link _4103"
            href="javascript:void(0);"
            @click="goAnchor('ease8_05')"
          ></a>
        </div>
        <div id="ease41_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_04.png"
          />
        </div>
        <div id="ease41_05" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_05.png"
          />
        </div>
        <div id="ease41_06" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_06.png"
          />
        </div>
        <div id="ease41_07" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_07.png"
          />
        </div>
        <div id="ease41_08" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease41_08.png"
          />
          <a
            class="jump-link _4108"
            href="https://mp.weixin.qq.com/s/ptKpJm9bvm93gcUOY1ex5w"
          ></a>
        </div>
        <div id="ease42_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_01.png"
          />
        </div>
        <div id="ease42_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_02.png"
          />
        </div>
        <div id="ease42_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_03.png"
          />
        </div>
        <div id="ease42_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_04.png"
          />
        </div>
        <div id="ease42_05" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_05.png"
          />
        </div>
        <div id="ease42_06" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_06.png"
          />
          <a
            class="jump-link _4206"
            href="javascript:void(0);"
            @click="goAnchor('ease2_05')"
          ></a>
        </div>
        <div id="ease42_07" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease42_07.png"
          />
          <a
            class="jump-link _4207"
            href="https://mp.weixin.qq.com/s/ZNeDLvQ3hWIHo3hImMFyPQ"
          ></a>
        </div>
        <div id="ease43_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease43_01.png"
          />
        </div>
        <div id="ease43_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease43_02.png"
          />
        </div>
        <div id="ease43_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease4/ease43_03.png"
          />
        </div>

        <div id="ease5_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease5/ease5_00.png"
          />
        </div>
        <div id="ease5_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease5/ease5_01.png"
          />
        </div>
        <div id="ease5_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease5/ease5_02.png"
          />
        </div>
        <div id="ease5_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease5/ease5_03.png"
          />
        </div>
        <div id="ease5_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease5/ease5_04.png"
          />
          <a
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
          ></a>
        </div>

        <div id="ease6_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_00.png"
          />
        </div>
        <div id="ease6_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_01.png"
          />
        </div>
        <div id="ease6_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_02.png"
          />
          <a class="get-more" href="https://weibo.com/u/6892480749"></a>
        </div>
        <div id="ease6_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_03.png"
          />
        </div>
        <div id="ease6_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_04.png"
          />
          <a
            class="jump-link _0604 _1"
            href="https://m.youku.com/video/id_XNTQwOTE1NDk2"
          ></a>
          <a
            class="jump-link _0604 _2"
            href="https://mp.weixin.qq.com/s/pQZXL2jLff3wpIPywJhDhA"
          ></a>
        </div>

        <!-- <div id="ease6_01" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_01.png" />
        </div>
        <div id="ease6_02" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_02.png" />
          <a class="get-more" href="https://weibo.com/u/6892480749"></a>
        </div>
        <div id="ease6_03" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_03.png" />
        </div>
        <div id="ease6_04" class="booklet-item">
          <img class="booklet-img" src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease6/ease6_04.png" />
        </div> -->
        <div id="ease7_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease7/ease7_00.png"
          />
        </div>
        <div id="ease7_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease7/ease7_01.png"
          />
          <a
            class="jump-link _0701"
            href="javascript:void(0);"
            @click="goAnchor('ease8_05')"
          ></a>
        </div>
        <div id="ease7_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease7/ease7_02.png"
          />
          <a class="get-more" href="https://weibo.com/u/6892480749"></a>
        </div>
        <div id="ease7_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease7/ease7_03.png"
          />
        </div>
        <div id="ease7_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease7/ease7_04.png"
          />
          <a
            class="jump-link _0704 _1"
            href="https://mp.weixin.qq.com/s/-kpqtpQSpsOfmbmv97J3nA"
          ></a>
          <a
            class="jump-link _0704 _2"
            href="https://mp.weixin.qq.com/s/d1kSt1R-Ldh7hW3Qq1aeKA"
          ></a>
        </div>

        <div id="ease8_00" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_00.png"
          />
        </div>
        <div id="ease8_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_01.png"
          />
        </div>
        <div id="ease8_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_02.png"
          />
        </div>
        <div id="ease8_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_03.png"
          />
        </div>
        <div id="ease8_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_04.png"
          />
        </div>
        <div id="ease8_05" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_05.png"
          />
        </div>
        <div id="ease8_06" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_06.png"
          />
        </div>
        <div id="ease8_07" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_07.png"
          />
        </div>
        <div id="ease8_08" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_08.png"
          />
        </div>
        <div id="ease8_09" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_09.png"
          />
        </div>
        <div id="ease8_10" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_10.png"
          />
        </div>
        <div id="ease8_11" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_11.png"
          />
        </div>
        <div id="ease8_12" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_12.png"
          />
        </div>
        <div id="ease8_13" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_13.png"
          />
        </div>
        <div id="ease8_14" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease8/ease8_14.png"
          />
          <a
            class="jump-link _0814 _1"
            href="https://mp.weixin.qq.com/s/p1MlMry_8EemeztyfLSFoQ"
          ></a>
          <a
            class="jump-link _0814 _2"
            href="https://mp.weixin.qq.com/s/o-hdevvXf6gswpYh-JJNBg"
          ></a>
        </div>

        <div id="ease9_01" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease9/ease9_01.png"
          />
          <a
            class="jump-link _0901 _1"
            href="https://zhuanlan.zhihu.com/p/53282194"
          ></a>
          <a
            class="jump-link _0901 _2"
            href="https://www.bilibili.com/video/av38408846/"
          ></a>
        </div>
        <div id="ease9_02" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease9/ease9_02.png"
          />
        </div>
        <div id="ease9_03" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease9/ease9_03.png"
          />
          <a class="jump-link _0903" href="https://weibo.com/u/6892480749"></a>
        </div>
        <div id="ease9_04" class="booklet-item">
          <img
            class="booklet-img"
            src="http://wuhan2099.oss-accelerate.aliyuncs.com/ease9/ease9_04.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
import { wxShare } from "../common/mixins";
import Info from "./info";

let pageHeight;
let scrollEvent;

function throlle(func) {
  let lock = false;
  return (...args) => {
    if (lock) return;
    func(...args);
    lock = true;
    requestAnimationFrame(() => {
      lock = false;
    });
  };
}
export default {
  name: "EaseHandbook",
  mixins: [wxShare],
  components: { HeaderLayout },
  data() {
    return {
      // diyShareTitle: true,
      // loading: true,
      // activeIndex: 0,
      currentIndex: null,
      isShow: false,
      activeCode: "ease1_00",
      // flag: [],
      catalogs: [
        {
          code: "ease1_00",
          name: "一、产检和产检报告",
          children: [
            {
              code: "ease1_01",
              name: "01 - 疫情期间，哪些是最重要的产检项目？"
            },
            { code: "ease1_02", name: "02 - 大排畸不做，做小排畸可以吗？" },
            { code: "ease1_03", name: "03 - 糖筛可以跳过吗？" },
            {
              code: "ease1_04",
              name: "04 - 36-37周小结可以不做，直接等生产吗？"
            },
            { code: "ease1_05", name: "05 - 哪些属于孕期常见的不适情况？" },
            { code: "ease1_06", name: "06 - 哪些情况必须要去医院做检查？" },
            {
              code: "ease1_07",
              name:
                "07 - 临床孕周和超声孕周有何区别？应该以哪个为准？超生孕周偏大或偏小要紧吗？"
            },
            { code: "ease1_08", name: "08 - 脐带绕颈" },
            { code: "ease1_09", name: "延伸阅读" }
          ]
        },
        {
          code: "ease2_00",
          name: "二、心肺和睡眠问题",
          children: [
            { code: "ease2_01", name: "01 - 孕期心跳加速是怎么回事？" },
            {
              code: "ease2_02",
              name: "02 - 晚上睡觉时感到呼吸困难/胸闷是怎么回事？"
            },
            {
              code: "ease2_03",
              name: "03 - 睡觉盗汗怕热，胸口出汗很多，是怎么回事？"
            },
            {
              code: "ease2_04",
              name: "04 - 何种情况需要就诊，确认是否有心功能异常？"
            },
            { code: "ease2_05", name: "05 - 孕期一定要左侧卧睡吗？" },
            { code: "ease2_06", name: "06 - 孕期失眠该怎么办？" },
            { code: "ease2_07", name: "07 - 怀孕之后做梦特别多，是怎么回事？" },
            { code: "ease2_08", name: "延伸阅读" }
          ]
        },
        {
          code: "ease3_00",
          name: "三、孕期营养的血糖血压问题",
          children: [
            { code: "ease3_01", name: "01 - 骨头、手腕痛是不是缺钙？" },
            { code: "ease3_02", name: "02 - 头晕是不是缺铁或贫血？" },
            { code: "ease3_03", name: "03 - 为什么孕期会缺铁？" },
            { code: "ease3_04", name: "04 - 孕期如何补铁？" },
            { code: "ease3_05", name: "05 - 孕期有哪些忌口食物？" },
            { code: "ease3_06", name: "06 - 什么情况会被视为孕期血糖偏高？" },
            { code: "ease3_07", name: "07 - 孕期血糖偏高如何管理？" },
            { code: "ease3_08", name: "08 - 血压偏低正常吗？" },
            { code: "ease3_09", name: "09 - 什么情况会被视为孕期血压偏高？" },
            { code: "ease3_10", name: "10 - 孕期高血压有哪些注意事项？" },
            { code: "ease3_11", name: "延伸阅读" }
          ]
        },
        {
          code: "ease4_00",
          name: "四、身体疼痛、皮肤和口腔问题",
          children: [
            {
              code: "ease41_01",
              name: "4.1 身体疼痛",
              children: [
                { code: "ease41_01", name: "01 - 孕早期腹痛是怎么回事？" },
                { code: "ease41_02", name: "02 - 孕中期腹痛是怎么回事？" },
                { code: "ease41_03", name: "03 - 孕晚期腹痛是怎么回事？" },
                {
                  code: "ease41_04",
                  name: "04 - 胸部胀痛是怎么回事？如何缓解？"
                },
                {
                  code: "ease41_05",
                  name: "05 - 耻骨联合分离和耻骨痛如何缓解？"
                },
                {
                  code: "ease41_06",
                  name: "06 - 孕期腰酸和脚后跟痛是怎么回事？如何缓解？"
                },
                { code: "ease41_07", name: "07 - 手腕痛是怎么回事？" },
                { code: "ease41_08", name: "延伸阅读" }
              ]
            },
            {
              code: "ease42_01",
              name: "4.2 皮肤问题",
              children: [
                {
                  code: "ease42_01",
                  name: "01 - 孕期红疹有哪些原因，可如何缓解？"
                },
                {
                  code: "ease42_02",
                  name: "02 - 什么情况是由胆汁酸引起的瘙痒？"
                },
                {
                  code: "ease42_03",
                  name: "03 - 如何缓解过敏引起的皮肤瘙痒？"
                },
                { code: "ease42_04", name: "04 - 什么是孕期水肿？" },
                { code: "ease42_05", name: "05 - 什么样的肿胀是不正常的？" },
                { code: "ease42_06", name: "06 - 如何预防孕期水肿？" },
                { code: "ease42_07", name: "延伸阅读" }
              ]
            },
            {
              code: "ease43_01",
              name: "4.3 口腔问题",
              children: [
                {
                  code: "ease43_01",
                  name: "01 - 孕期牙龈出血有什么原因？该如何缓解？"
                },
                {
                  code: "ease43_02",
                  name: "02 - 牙髓炎引起的疼痛该如何缓解？"
                },
                { code: "ease43_03", name: "03 - 嘴里发苦、反酸正常吗？" }
              ]
            }
          ]
        },
        {
          code: "ease5_00",
          name: "五、便秘、腹泻、痔疮",
          children: [
            { code: "ease5_01", name: "01 - 如何避免便秘的发生或加重？" },
            { code: "ease5_02", name: "02 - 孕期腹泻怎么办？" },
            { code: "ease5_03", name: "03 - 孕期痔疮怎么办？" },
            { code: "ease5_04", name: "延伸阅读" }
          ]
        },
        {
          code: "ease6_00",
          name: "六、母胎关系",
          children: [
            { code: "ease6_01", name: "01 - 一般感冒发热对胎儿有何影响？" },
            { code: "ease6_02", name: "02 - 辐射对胎儿有何影响？" },
            { code: "ease6_03", name: "03 - CT对胎儿有何影响？" },
            { code: "ease6_04", name: "延伸阅读" }
          ]
        },
        {
          code: "ease7_00",
          name: "七、阴道分泌物变化",
          children: [
            {
              code: "ease7_01",
              name: "01 - 阴道有红色或褐色果冻状分泌物是怎么回事？"
            },
            { code: "ease7_02", name: "02 - 哪些属于正常的白带增多现象？" },
            {
              code: "ease7_03",
              name: "03 - 孕期出现何种阴道分泌物时，应立刻就诊？"
            },
            { code: "ease7_04", name: "延伸阅读" }
          ]
        },
        {
          code: "ease8_00",
          name: "八、胎动、见红、破水、宫缩",
          children: [
            { code: "ease8_01", name: "01 - 什么是胎动？" },
            { code: "ease8_02", name: "02 - 怎么数胎动？" },
            { code: "ease8_03", name: "03 - 为什么晚上会胎动频繁？" },
            { code: "ease8_04", name: "04 - 肚子一跳一跳的像心跳怎么回事？" },
            { code: "ease8_05", name: "05 - 临产前出现何种情况需要立即就诊？" },
            { code: "ease8_06", name: "06 - 什么是见红？" },
            { code: "ease8_07", name: "07 - 见红后何时需就诊？" },
            { code: "ease8_08", name: "08 - 什么是破水？" },
            { code: "ease8_09", name: "09 - 破水和漏尿有什么区别？" },
            { code: "ease8_10", name: "10 - 破水后多久会分娩？" },
            { code: "ease8_11", name: "11 - 破水之后要注意什么？" },
            {
              code: "ease8_12",
              name: "12 - 什么是宫缩？什么是假性宫缩？什么是真性宫缩？"
            },
            { code: "ease8_13", name: "13 - 开始宫缩后何时需就诊？" },
            { code: "ease8_14", name: "延伸阅读" }
          ]
        },
        {
          code: "ease9_01",
          name: "附：顺产呼吸法"
        },
        {
          code: "ease9_02",
          name: "参考来源"
        },
        {
          code: "ease9_03",
          name: "手册制作团队"
        },
        {
          code: "ease9_04",
          name: "版权申明"
        }
      ]
    };
  },
  methods: {
    showHide(index, selector) {
      if (this.$refs.child[index].style.display === "list-item") {
        this.$refs.child[index].style.display = "none";
        this.$refs.close[index].style.display = "inline-block";
        this.$refs.open[index].style.display = "none";
        this.currentIndex = null;
      } else {
        this.$refs.child[index].style.display = "list-item";
        this.$refs.close[index].style.display = "none";
        this.$refs.open[index].style.display = "inline-block";
        if (this.currentIndex !== null) {
          this.$refs.child[this.currentIndex].style.display = "none";
          this.$refs.close[this.currentIndex].style.display = "inline-block";
          this.$refs.open[this.currentIndex].style.display = "none";
        }
        this.currentIndex = index;
      }
    },
    backHome() {
      this.$router.push("EaseHandbook");
    },
    bindProcess() {
      // let that = this;
      let imgList = this.$el.querySelectorAll(".booklet-img");
      let len = imgList.length;

      // console.log(imgList)
      setTimeout(() => {
        [...imgList].forEach(s => {
          s.onload = function() {
            len--;
            if (!len) {
              requestAnimationFrame(() => {
                pageHeight = document.body.scrollHeight;
                // console.log(document.body.scrollHeight)/
                // if(window.pageYOffset == 0){debugger}
                scrollEvent = throlle(function() {
                  sessionStorage.setItem(
                    "page-process",
                    (window.pageYOffset / pageHeight).toString()
                  );
                  // }
                });
                window.addEventListener("scroll", scrollEvent);
              });
            }
          };
        });
      }, 0);
    },
    goAnchor(selector) {
      this.isShow = false;
      let that = this;
      this.activeCode = selector;
      let targetImg = that.$el.querySelector("#" + that.activeCode + " img");
      let targetPosition = that.$el.querySelector("#" + that.activeCode);

      this.$nextTick(function() {
        // Code that will run only after the
        // entire view has been re-rendered
        if (targetImg.complete && targetImg.src.indexOf(that.activeCode) > -1) {
          targetPosition.scrollIntoView();
        }
      });
    }
  },
  mounted() {
    // let that = this;
    this.bindProcess();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // access to component instance via `vm`
      scrollEvent && window.addEventListener("scroll", scrollEvent);
      console.log(from);
      if (from.name === "EaseHandbook") {
      } else {
        var pageProcess = Number(sessionStorage.getItem("page-process"));
        if (pageProcess && pageHeight) {
          window.scrollTo({
            top: pageProcess * pageHeight
          });
        }
      }
    });
  },
  beforeCreate() {
    this.$nextTick(() => {
      Info.$emit("frameDisplay", false);
    });
  },
  beforeRouteLeave(to, from, next) {
    // debugger
    scrollEvent && window.removeEventListener("scroll", scrollEvent);
    setTimeout(() => {
      next();
    }, 0);
  }
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
    bottom: 9%;
    right: 19%;
  }
}
.hearder-block {
  margin: 10px 0 0;
}
.wh-container {
  position: relative;
  height: calc(100vh - 82px);
  color: #333;
  &.full {
    height: 100vh;
  }
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
.block {
  height: 100%;
  background: #faf1fa;
  box-sizing: border-box;
  overflow-y: scroll;
  scroll-behavior: smooth;
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
    color: #2aa9ae;
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
    color: #2aa9ae;
    font-weight: 500;
    padding-left: 5px;
  }
  &-header {
    line-height: 54px;
    padding-left: 20px;
    border-bottom: 1px solid #e6e5e5;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    color: #2aa9ae;
    .catalog-header-back {
      float: right;
      font-size: 0.36rem;
      font-weight: bold;
      padding-left: 10px;
      color: #666;
    }
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
  &-body-container {
    line-height: 36px;
    text-decoration: none;
    list-style: none;
  }
  &-ul-body {
    display: none;
    padding-left: 0px;
    .active {
      background: rgba(0, 0, 0, 0.08);
      // font-weight: bold;
      // color: white;
      // background-color: #2aa9ae;
    }
  }
  &-sub-ul-body {
    padding-left: 0px;
  }
  &-item {
    // line-height: 36px;
    text-decoration: none;
    list-style: none;
    span {
      padding-left: 40px;
      padding-right: 10px;
      line-height: 20px;
      padding-top: 10px;
      display: inline-block;
    }
  }
  &-title {
    margin-top: 10px;
    padding-left: 20px;
    font-weight: bold;
    color: #2aa9ae;
    display: block;
    font-weight: bold;
  }
  &-bold {
    font-weight: bold;
  }
}
@media screen and (max-width: 350px) {
  .catalog {
    font-size: 13px;
    &-header {
      font-size: 15px;
    }
  }
}
@media screen and (min-width: 400px) {
  .catalog {
    font-size: 15px;
    &-header {
      font-size: 17px;
    }
  }
}
.booklet {
  // position: relative;
  // height: 100%;
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
.get-more {
  width: 32.2%;
  height: 4.5%;
  position: absolute;
  right: 13.5%;
  bottom: 17%;
  display: block;
}
img[lazy="loading"] {
  width: 32px;
  margin: 0 auto;
}
</style>
