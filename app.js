//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  //调用api获取分类信息
  getClassifyData:function(cb){
    wx.request({
        url: 'https://novel.krito.cn/categories',
		header: {
			'content-type': 'application/json' 
		},
        success:function(res){
            cb(res.data)
        }
    })
  },
  //调用api获取子分类信息
  getSubClassifyData: function(cb){
    wx.request({
        url: 'https://novel.krito.cn/subCategories',
		header: {
			'content-type': 'application/json'
		},
        success: function(res){
            cb(res.data)
        }
    })
  },
  //调用api获取分类详情
  getDetailsData: function(gender, major, minor, start, limit,cb){
      var url = "https://novel.krito.cn/categoryInfo?gender=" + 
          gender + '&type=hot&major=' + encodeURIComponent(major) + '&minor=' +
          encodeURIComponent(minor) + '&start=' + start + '&limit=' + limit;
      console.log(url);
      wx.request({
          url: url,
		  header: {
			  'content-type': 'application/json'
		  },
          success: function(res){
            console.log()
            cb(res.data)
          }
      })
  },
  //调用api获取书籍详情
  getBookData: function(id,cb){
    wx.request({
        url: 'https://novel.krito.cn/bookInfo/' + id,
		header: {
			'content-type': 'application/json'
		},
        success: function(res){
            cb(res.data)
        }
    })
  },
  //获取书籍相关推荐
  getBookRecommendData: function(id,cb){
      wx.request({
          url: 'https://novel.krito.cn/recommend/' + id,
		  header: {
			  'content-type': 'application/json'
		  },
          success: function (res) {
              cb(res.data)
          }
      })
  },
  //获取作者的所有书籍
  getAllAuthorBookData: function(author,cb){
      wx.request({
          url: 'https://novel.krito.cn/books?author=' + encodeURIComponent(author),
		  header: {
			  'content-type': 'application/json'
		  },
          success: function (res) {
              cb(res.data)
          }
      })
  },
  //获取书籍全部目录
  getBookChaptersData: function(id,cb){
      wx.request({
          url: 'https://novel.krito.cn/contents/' + id ,
		  header: {
			  'content-type': 'application/json'
		  },
          success: function (res) {
              cb(res.data)
          }
      })
  },
  //获取章节详细内容
  getBookChapterContact: function(contents,cb){
      const url = "https://novel.krito.cn/chapter?link="+encodeURIComponent(contents)
      console.log(url)
      wx.request({
		  url: url,
		  header: {
			  'content-type': 'application/json'
		  },
          success: function (res) {
              cb(res.data)
          }
      })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
