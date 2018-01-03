// pages/invitation/index.js
const app = getApp()
var server = app.globalData.server;
var userid = app.globalData.userid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })

    wx.request({
      url: server,
      method: 'GET',
      data: { 'c': 'info', 'userid': userid },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
  }
})