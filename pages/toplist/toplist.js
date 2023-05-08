// pages/toplist/toplist.js
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
    //获取从别的页面跳转携带的参数
    // console.log(options.id);

    wx.request({
      url:`http://124.222.85.215:3000/playlist/detail?id=${options.id}`,
      success:res=>{
        console.log(res.data.playlist);
        this.setData({
          info:res.data.playlist
        })
      }
    })
  },
toPlay(e){
  wx.navigateTo({
    url:`/pages/play/play?id=${e.currentTarget.dataset.id}`,
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