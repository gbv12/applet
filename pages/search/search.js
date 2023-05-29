// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    keyword: '',
    suggestList: [],
    resultList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'https://autumnfish.cn/search/hot/detail',
      success: res => {
        console.log(777777, res.data.data);
        this.setData({
          hotList: res.data.data,
        })
      }
    })
  },

  chan(e) {
    console.log(e);
    this.setData({
      keyword: e.target.dataset.id,
      resultList: [],
    })

    if (!e) return;   // 如果value为空   直接结束；后面的代码不再执行了

    wx.request({
      url: `https://autumnfish.cn/search/suggest?keywords=${e.target.dataset.id}&type=mobile`,
      success: res => {
        // console.log(res);

        this.setData({
          suggestList: res.data.result.allMatch
        })
      }
    })
  },

  change(e) {
    console.log(66666, e.detail.value);
    this.setData({
      keyword: e.detail.value,
      resultList: [],
    })

    if (!e.detail.value) return;   // 如果value为空   直接结束；后面的代码不再执行了

    wx.request({
      url: `https://autumnfish.cn/search/suggest?keywords=${e.detail.value}&type=mobile`,
      success: res => {
        // console.log(res);

        this.setData({
          suggestList: res.data.result.allMatch
        })
      }
    })
  },

  getResult(e) {
    console.log(2222, e.currentTarget.dataset.word);

    wx.request({
      url: `https://autumnfish.cn/search?keywords=${e.currentTarget.dataset.word}`,
      success: res => {
        console.log(1111, res);
        this.setData({
          resultList: res.data.result.songs
        })
      }
    })
  },

  getAll(e) {
    // console.log("回车",e);

    wx.request({
      url: `https://autumnfish.cn/search?keywords=${e.detail.value}`,
      success: res => {
        // console.log(1111,res);
        this.setData({
          resultList: res.data.result.songs
        })
      }
    })
  },
  toPlay(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/play/play?id=${e.currentTarget.dataset.id}`,
    })
  }
})