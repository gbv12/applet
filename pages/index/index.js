// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    
  },

  onLoad:function(options){
    //请求信息
    wx.request({
      url: 'http://124.222.85.215:3000/toplist/detail',
      success:res=>{
        // console.log(res.data.list);
        //将获得的数据赋值给list
        this.setData({
          list: res.data.list.slice(0,4),
        
        })
        
      }
    })
  },
toTopList(e){
  wx.navigateTo({
   url:`/pages/toplist/toplist?id=${e.currentTarget.dataset.id}`,
  })
},

toSearch(){
  wx.navigateTo({
    url:`/pages/search/search`,
  })
}
  // toResult() {
  //   wx.showLoading({
  //     title: '加载中...',
  //   })

  //   //等待2s关闭
  //   //延时器
  //   setTimeout(
  //     () => {    //括号里面为2s之后要执行的程序
  //       wx.hideLoading(),
  //         wx.navigateTo({    //需要跳转的页面
  //           url: "/pages/result/result",
  //         })
  //     }, 2000);
  // }
})
