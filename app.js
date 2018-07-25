// app.js
App({
    onLaunch: function () {
        //var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            // wx.login({
            //     success: function () {
            //         wx.getUserInfo({
            //             success: function (res) {
            //                 //console.info(res);
            //                 that.globalData.userInfo = res.userInfo;
            //                 typeof cb == "function" && cb(that.globalData.userInfo)
            //             }
            //         })
            //     }
            // });
        }

    },
    onHide: function () {
        wx.pauseBackgroundAudio();
    },
    onShow: function () {
        wx.playBackgroundAudio()
    },
    globalData: {
        userInfo: null,
        appid: 'wx4feb8e53536131a2',
        server: 'https://wx.qiaker.cn/api',
        music_url: ''
    }
});

