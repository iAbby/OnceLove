//index.js
//获取应用实例
const app = getApp()
var server = app.globalData.server;
var userid = app.globalData.userid;
Page({
  data: {
    userInfo: {},
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
      name: '万达铂尔曼酒店',
      address: '山东省潍坊市奎文区鸢飞路福寿街路口东200米'
    })
  },
  onLoad: function () {
    var that = this
    
    wx.getUserInfo({
      success: function(res){
        that.setData({
          userInfo: res.userInfo
        })
      }
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
          zanNum: res.data.zanNum,        
          slideList: res.data.slideList
        });
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
    console.log(options);
    return {
      title: '我们结婚啦！',
      desc: '我们的幸福需要您的祝福与见证，诚意邀请您参加我们的婚礼',
      imageUrl: '/images/share.jpg',
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  onPullDownRefresh(){
　　console.log('--------下拉刷新-------')
　　 wx.showNavigationBarLoading() //在标题栏中显示加载  
    var that = this;
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
          zanNum: res.data.zanNum,        
          slideList: res.data.slideList
        });
      }
    })
  },
  zan: function (event) {
    var that = this;

    var userInfo = that.data.userInfo;
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;
    wx.request({
      url: server,
      data: {'c':'zan','userid':userid,'nickname':name,'face':face},
      header: {},
      method: "GET",
      dataType: "json",
      success: res => {
        console.log(res.data);
        that.setData({
          zansta: res.data.zansta
        }); 
        
        if (res.data.success) {      
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
})
