// pages/play/play.js
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    lyric: [],
    current: 0,
    status: false,  // 暂停
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);

    wx.request({  // 获取歌曲信息 专辑图片、歌曲名称
      url: `https://autumnfish.cn/song/detail?ids=${options.id}`,
      success: res => {  // 歌曲信息获取成功
        console.log(res);



        this.setData({
          info: res.data.songs[0]
        })


        // 将options.id传递到getLyric方法里面去
        this.getLyric(options.id),  // 获取歌词
          this.getComments(options.id)
      }
    })
  },
  //   id = options.id
  getLyric(id) {  // 获取歌词
    wx.request({
      url: `https://autumnfish.cn/lyric?id=${id}`,
      success: res => {

        // split 将整个字符串以某个字符进行切割，得到一个数组
        // \n 就是换行符
        var arr = res.data.lrc.lyric.split('\n')

        // console.log(arr);  // ['[00:00:000] 作词xxx', '[00:01:000] 作曲']

        var arr2 = [];

        arr.forEach(item => {
          // console.log(item);

          if (!item) return;

          var timeAndWord = item.split(']');
          // console.log(timeAndWord);
          var timeStr = timeAndWord[0].substr(1);
          // console.log(timeStr);
          // 字符 * 数字 = 数字   '30' * 2 = 60
          var time = timeStr.split(':')[0] * 60 + timeStr.split(':')[1] * 1;

          // push 往数组尾部添加新的元素
          arr2.push({
            time: time,
            word: timeAndWord[1]
          })
        })

        // console.log(arr2);


        this.setData({
          lyric: arr2
        })


        // 播放音乐
        app.globalData.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

        // 必须设置title  否则无法播放
        app.globalData.audio.title = this.data.info.name;


        // 背景音频播放进度更新事件的监听函数
        app.globalData.audio.onTimeUpdate(() => {
          // currentTime 音乐播放器 当前播放的音乐的进度时间
          // console.log(666666, app.globalData.audio.currentTime);

          // 通过当前播放的进度和数组中的每一个time进行对比，获取到哪一个歌词在数组中的下标位置


          // findIndex 数组api  通过一个条件  找到符合条件的这一项所在数组中的下标值
          var index = this.data.lyric.findIndex(item => item.time >= app.globalData.audio.currentTime);

          // console.log(index);

          this.setData({
            current: index
          })
        })
      }
    })
  },


  toggle() {  // 暂停和播放

    this.setData({
      status: !this.data.status
    })


    if (this.data.status) {  // 暂停播放
      app.globalData.audio.pause()
    } else {  // 继续播放
      app.globalData.audio.play()
    }

  },

  getComments(id) {
    wx.request({
      url: `https://autumnfish.cn/comment/music?id=${id}`,
      success: res => {
        console.log(6666, res.data.comments);

        this.setData({
          comments: res.data.comments,
        })
      }
    })
  }

})