<template>
  <div class="login-page">
    <el-row align="center" justify="center" >
      <img width="109px" src="@/assets/NCP_Logo.png" />
      <p class="login-title">管理后台</p>
    </el-row>
    <el-row align="center" justify="center" class="mobile-input">
        <el-input placeholder="请输入手机号" v-model="mobile" :class="mobile ? 'login-input-act' : 'login-input'">
              <template slot="prepend" v-if="!mobile">手机号</template>
        </el-input>
    </el-row>
    <el-row align="center" justify="center" class="verify-input" style="font-size:0;margin-top:17px">
        <el-input placeholder="短信验证码" v-model="smsverifycode" :disabled="!smsstate" :class="smsverifycode ? 'login-input-act' : 'login-input'">
            <template slot="prepend" v-if="!smsverifycode">验证码</template>
        </el-input>
        <el-button :class="smsstate ? 'timer-btn' : 'verify-btn'" v-on:click="getVerifycode" v-model="verifyCodeTime">{{this.verifyCodeTime}}</el-button>
    </el-row>
    <el-row align="center" justify="center" v-show="errorMsg">
      <div class="error-msg">
        <img width="12px" style="vertical-align:middle" src="@/assets/info_icon.png" />
        <span class="error-text">{{ errorMsg }}</span>
      </div>
    </el-row>
    <el-row align="center" justify="center">
      <el-col :span="24">
        <el-button :disabled="!smsstate" v-on:click="loginWithCode" :class="smsstate ? 'login-btn-act' : 'login-btn'">登录</el-button>
      </el-col>
    </el-row>
    <!-- <el-dialog
      title="登陆提示"
      :visible.sync="msgModel"
      width="50%"
      center>
      <span>{{errorMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgModel = false">取 消</el-button>
        <el-button type="primary" @click="msgModel = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      verifyCodeTime: '获取',
      timer: 60,
      interval: '',
      smsverifycode: '',
      smsstate: false,
      msgModel: false,
      errorMsg: ''
    }
  },
  methods: {
    getVerifycode () {
      this.errorMsg = ''
      var params = {'phone': this.mobile}
      let that = this
      this.$http.post('/wh/admin/sms', params)
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === '0000') {
            that.smsstate = true
            that.interval = setInterval(that.getVerifyCodeTime, 1000)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getVerifyCodeTime () {
      this.timer--
      if (this.timer < 10) {
        this.verifyCodeTime = '0' + this.timer + 'S'
      } else {
        this.verifyCodeTime = this.timer + 'S'
      }
      if (this.timer === 0 || this.timer < 0) {
        clearInterval(this.interval)
        this.smsstate = false
        this.verifyCodeTime = '重新获取'
        this.timer = 60
      }
    },
    loginWithCode () {
      let that = this
      var params = {'phone': this.mobile,
        'verifyCode': this.smsverifycode}
      this.$http.post('/wh/admin/login', params)
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === '0000') {
            localStorage.setItem('token', response.data.result.token)
            localStorage.setItem('tokendate', new Date())
            that.$router.push({ 'name': 'EndIndex' })
          } else {
            that.smsstate = false
            that.errorMsg = response.data.msg
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-page {
    position: absolute;
    top: 18%;
    left: 0;
    right: 0;
    margin: 20px;
  }
  .mobile-input /deep/ .el-input .el-input__inner{
    height: 31px;
    border-radius: 2px;
    border: none;
    width: 164px;
    text-align: left;
  }
  .mobile-input /deep/ .login-input-act .el-input__inner{
    height: 31px;
    border-radius: 2px;
    border: none;
    width: 220px;
    text-align: left;
    font-size: 11px;
  }
  .verify-input /deep/ .login-input-act .el-input__inner{
    height: 31px;
    border-radius: 2px;
    border: none;
    width: 140px !important;
    text-align: left;
    font-size: 11px;
  }
  .login-page /deep/ .el-input .el-input-group__prepend{
    border-radius: 2px;
    border: 1px solid rgba(226,226,226,1);
    width: 56px;
    padding: 0 5px;
    color: rgba(172,172,172,1);
  }
  .mobile-input /deep/ .el-input {
    border-radius: 2px;
    width: 220px;
  }
  .verify-input /deep/ .el-input .el-input__inner{
    height: 31px;
    border-radius: 2px;
    border: none;
    width: 84px;
    text-align: left;
  }
  .verify-input /deep/ .el-input {
    border-radius: 2px;
    width: 140px;
  }
  .wh-header {
    background: #4093ff;
    color: white;
  }
  .wh-input-width {
    min-width: 200px;
    max-width: 300px;
  }
  .wh-btn-login {
    width: 200px;
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
  .verify-btn {
    background-color: #5887FF;
    color: #fff;
    width: 80px;
    height: 31px;
    font-size: 11px;
    border-radius: 0px 2px 2px 0px;
    border: none;
    padding: 0;
  }
  .timer-btn {
    color: #5887FC;
    width: 80px;
    height: 31px;
    font-size: 11px;
    border-radius: 0px 2px 2px 0px;
    border: 1px solid rgba(88,135,252,1);
    box-shadow:0px 0px 5px rgba(0,0,0,0.1);
    padding: 0;
  }
  .login-input, .login-input-act {
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    border-radius: 2px;
    font-size: 11px;
    font-family: Source Han Sans;
  }
  .login-btn {
    width: 220px;
    height: 31px;
    border: 1px solid rgba(88,135,252,1);
    box-shadow:0px 0px 5px rgba(0,0,0,0.1);
    border-radius: 2px;
    color: #5887FC;
    font-size: 11px;
    font-family: Source Han Sans;
    padding: 0;
    margin-top: 40px;
  }
  .login-btn-act {
    background-color: #5887FF;
    width: 220px;
    height: 31px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    border-radius: 2px;
    color: #FFF;
    font-size: 11px;
    font-family: Source Han Sans;
    padding: 0;
    margin-top: 40px;
  }
  .login-title {
    font-size: 16px;
    font-family: Source Han Sans;
    font-weight: 700;
    line-height: 24px;
    color: rgba(172,172,172,1);
    margin-bottom: 50px;
  }
  .error-msg {
    margin-top: 5px;
  }
  .error-text {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: rgba(221,57,57,1);
    vertical-align: middle;
    margin-left: 2px;
  }
</style>
