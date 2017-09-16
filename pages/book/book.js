
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,               //页面加载
    _id:"",
    author:"",
    cover:"",
    longIntro:"",
    title:"",
    majorCate:"",
    minorCate:"",
    recom_books:null,
    author_books:null,
    toast:true,
    book:{},
    isBookSave:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    this.setData({ isBookSave: util.hasSaveBook(options.b_id)})

    app.getBookData(options.b_id,function(res){
        var d = res.data
        var book = {
            _id:d._id,cover:d.cover,title:d.title
        }
        that.setData({ _id: d._id, author: d.author, cover: d.cover, longIntro: d.longIntro,
            title: d.title, majorCate: d.majorCate, minorCate: d.minorCate})
        that.setData({book,book})
        
        var title = d.title
        wx.setNavigationBarTitle({
             title: title,
        })
        that.setData({ loading: false })
    })
    app.getBookRecommendData(options.b_id,function(res){
        that.setData({ recom_books: res.data.books})
    })
    app.getAllAuthorBookData(options.author,function(res){
        that.setData({ author_books:res.data.books })
    })
  },
  readBook: function(){
    var id  = this.data._id;
    var value = wx.getStorageSync(id);
    if(!value){
        value = new Object();
        value.contentIndex = 0;
        value.scrollTop = 0;
    }
    wx.navigateTo({
        url: '../chapter/chapter?b_id=' + id + "&index=" + value.contentIndex + "&top=" + value.scrollTop,
    })
  },
  btnClick: function(e){
      var bookid = e.currentTarget.dataset.id
      var author = e.currentTarget.dataset.author
      wx.redirectTo({
          url: '../book/book?b_id=' + bookid + "&author=" + author,
      })
  },
  //添加书籍到书架
  addBookStore:function(){
      util.saveBook(this.data.book)
      var isBookSave = !this.data.isBookSave
      this.setData({
          isBookSave: isBookSave,
          toast: false
      })
  },
  toastHide: function(){
     this.setData({
         toast:true
     })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})