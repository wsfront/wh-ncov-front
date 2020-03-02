import wx from 'weixin-js-sdk';

let {origin} = location;
const shareConf = {
  title: 'NCP生命支援-武汉孕妇就诊指南',
  desc: '为爱战“疫” 守护新生',
  imgUrl: `${origin}/static/img/NCPlogo.jpg`
}

export const wxShare = {
  created() {
    this.initJsSdk(['onMenuShareAppMessage', 'onMenuShareTimeline'])
      .then(wxEnv => {
        console.log(wxEnv)
        wxEnv.onMenuShareTimeline({
          ...shareConf,
          link: location.href
        });
        wxEnv.onMenuShareAppMessage({
          ...shareConf,
          link: location.href,
          type: 'link'
        });
      }).catch(() => {})
  },
  methods: {
    initJsSdk(jsApiListConf) {
      return new Promise((resolve, reject) => {
        this.$http
          .post("/wh/wx/sign", {url: location.href.split('#')[0]})
          .then(function(response) {
            if (response.data.code === "0000") {
              let config = response.data.result;
              let debug = false // process.env.NODE_ENV === 'production'
              let jsApiList = jsApiListConf || ['chooseImage', 'previewImage', 'uploadImage', 'openLocation', 'getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'scanQRCode'];

              wx.config({debug, ...config, jsApiList});
              wx.ready(function () {
                console.log('wx ready')
                resolve(wx) // 把变量传出去
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      })
    }
  }
}
