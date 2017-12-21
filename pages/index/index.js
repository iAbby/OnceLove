//index.js
//获取应用实例
const app = getApp()

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
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })

    wx.request({
      url: 'https://wx.qiaker.cn/api',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.data.items = res.data
      }
    }),
    wx.request({
      url: "https://wx.qiaker.cn/api",
      data: {'c':'photo'},
      header: {},
      method: "GET",
      dataType: "json",
      success: res => {
        console.log(res.data);
        this.setData({
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
  }
})
