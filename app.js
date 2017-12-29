// app.js
var aldstat = require("./utils/ald-stat.js");
App({
  onLaunch: function () {
    console.log('start!');
    login();
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    hasLogin: false,
    userInfo: null,
    userid:1,
    server: 'https://wx.qiaker.cn/api'
  }
});

function login() {
  wx.login({
    success: function (data) {
      var code = data.code;
      wx.getUserInfo({
        success: function (data) {
          console.info(data);
          var rawData = data.rawData;
          var signature = data.signature;
          var encryptedData = data.encryptedData;
          var iv = data.iv;
          var userInfo = data.userInfo;
          var session3rd = wx.getStorageSync('login_token');
          var shopToken = getApp().globalData.shopToken;    
        }
      })
    }
  })
}

