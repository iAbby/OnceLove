//index.js
//获取应用实例
const app = getApp()

var server = app.globalData.server;
var userid = app.globalData.userid;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    markers: [{
      iconPath: "/images/map.png",
      id: 0,
      latitude: 36.718820,
      longitude: 119.128520,
      width: 50,
      height: 50
    }]
  },
  markertap(e) {
    wx.openLocation({
      latitude: 36.718820,
      longitude: 119.128520,
      scale: 18,
      name: '万达广场',
      address: '山东省潍坊市万达广场'
    })
  },
  onLoad: function () {

    var that = this

    var sessionInfo = wx.getStorageSync('login_token');
    console.log(sessionInfo);
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })

    wx.request({
      url: server,
      method: 'GET',
      data: { 'c': 'info', 'userid': userid},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        that.setData({
          mainInfo: res.data.mainInfo,
          zanLog: res.data.zanLog,
          zanNum: res.data.zanNum
        });
      }
    }),
    wx.request({
      url: server,
      data: {'c':'photo'},
      header: {},
      method: "GET",
      dataType: "json",
      success: res => {
        // console.log(res.data);
        that.setData({
          slideList: res.data
        });
        //    console.log(this.data.slideList);
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (options) {
    //console.log(options);
    return {
      title: '标题111',
      desc: '描述22',
      path: '/pages/index/',
    }
  },
  zan: function (event) {
    var that = this;
    wx.request({
      url: server,
      data: {'c':'zan','userid':userid},
      header: {},
      method: "GET",
      dataType: "json",
      success: res => {
        // console.log(res.data);
        that.setData({
          zansta: res.data.zansta
        });       
        wx.showToast({
          title: '感谢支持！',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
})
