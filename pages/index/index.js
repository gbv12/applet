// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
  },

  onLoad: function (options) {
    //请求信息
    wx.request({
      url: 'https://autumnfish.cn/toplist/detail',
      success: res => {
        // console.log(res.data.list);
        //将获得的数据赋值给list
        this.setData({
          list: res.data.list.slice(0, 4),
        })
      }
    })
  },
  toTopList(e) {
    wx.navigateTo({
      url: `/pages/toplist/toplist?id=${e.currentTarget.dataset.id}`,
    })
  },

  toSearch() {
    wx.navigateTo({
      url: `/pages/search/search`,
    })
  }
})
