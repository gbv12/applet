// pages/toplist/toplist.js
Page({

  data: {
    info: {},
    count: 1.1,
  },

  onLoad(options) {
    
    wx.request({
      url: `https://autumnfish.cn/playlist/detail?id=${options.id}`,
      success: res => {
        console.log(res.data.playlist);
        this.setData({
          info: res.data.playlist,
          count: Math.round(res.data.playlist.playCount / 100000000 * 100) / 100
        })
      }
    })
  },
  toPlay(e) {
    wx.navigateTo({
      url: `/pages/play/play?id=${e.currentTarget.dataset.id}`,
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