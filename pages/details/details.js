
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,               //页面加载
    gender:"",
    major:"",
    minor:"",
    mins:null,
    start:0,
    limit:20,
    books:[],
    changeColor:0,
    scrollHeight:0,
    hasMore:true,            //书籍是否还有更多
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //字符串分割
    var mins = []
    mins = options.mins.split(",")
    mins.unshift("全部")
    that.setData({gender:options.gender,major:options.major,mins:mins})
    var title = options.major
    wx.setNavigationBarTitle({
        title: title,
    })
    wx.getSystemInfo({
        success: function (res) {
            that.setData({
                scrollHeight: res.windowHeight
            })
        }
    })
    //获取分类全部信息
    app.getDetailsData(that.data.gender, that.data.major, that.data.minor, that.data.start, that.data.limit,function(res){
        console.log(res)
        that.setData({ books: res.data.books })
        that.setData({ loading: false })
    })
  },

  /**
   * 选中子分类以及修改选中背景颜色
   */
  changeClick: function(e){
    var that = this
    var minor = e.target.dataset.minor
    if(minor == "全部")
        minor = ""
    that.setData({ minor: minor, changeColor: e.target.id})
    //获取子分类全部信息
    app.getDetailsData(this.data.gender, this.data.major, this.data.minor, this.data.start, this.data.limit, function (res) {
        that.setData({ books: res.data.books })
    })
  },
  /**
   * 跳转到书籍详情页面
   */
  btnClick: function(e){
      var bookid = e.currentTarget.dataset.id
      var author = e.currentTarget.dataset.author
      console.log(bookid)
      wx.navigateTo({
          url: '../book/book?b_id='+bookid+"&author="+author,
      })
  },
  //加载更多数据
  loadMore: function(){
      if (this.data.isLoading) {
          return;
      }
      this.setData({
          isLoading: true
      });
      var that = this
      app.getDetailsData(that.data.gender, that.data.major, that.data.minor, that.data.books.length, that.data.limit,function (res)         {
            const books = that.data.books.concat(res.data.books)
            that.setData({
                books: books,
                isLoading: false
            })
        })
  },

})