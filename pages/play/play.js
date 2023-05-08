// pages/play/play.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);

    wx.request({
      url: `http://124.222.85.215:3000/song/detail?ids=${options.id}`,
      success:res=>{
        console.log(res);

        wx.setNavigationBarTitle({
          title: res.data.songs[0].name,
        })

        this.setData({
          info:res.data.songs[0]
        })

        app.globalData.audio.src=`https://music.163.com/song/media/outer/url?id=${options.id}.mp3`;
        app.globalData.audio.title=res.data.songs[0].name;
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})