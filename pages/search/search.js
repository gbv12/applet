// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    keyword:'',
    suggestList:[],
    resultList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'http://124.222.85.215:3000/search/hot/detail',
      success:res =>{
        console.log(res.data.data);
        this.setData({
          hotList: res.data.data
        })
      }
    })
  },
  change(e) {
    console.log(66666, e.detail.value);
    this.setData({
      keyword: e.detail.value,
      resultList:[],
    })

    if (!e.detail.value) return;   // 如果value为空   直接结束；后面的代码不再执行了

    wx.request({
      url: `http://124.222.85.215:3000/search/suggest?keywords=${e.detail.value}&type=mobile`,
      success:res =>{
        console.log(res);

        this.setData({
          suggestList: res.data.result.allMatch
        })
      }
    })
  },

  getResult(e) {
    console.log(e.currentTarget.dataset.word);

    wx.request({
      url: `http://124.222.85.215:3000/search?keywords=${e.currentTarget.dataset.word}`,
      success:res =>{
        console.log(res);
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