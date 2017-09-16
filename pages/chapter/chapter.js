var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      loading:true,               //页面加载
      chapters: [],              //章节目录
      content: [],              //章节内容
      contentIndex: 0,          //章节序号
      scrollHeight: 0,
      scrollTop: 0, 
      recordScrollTop:0,
      bookId: "",
      showBottom:false,           //菜单显示
      disabledUp:false,
      disabledNext:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({ 
          bookId: options.b_id, 
          contentIndex:options.index,
          scrollTop: options.top    
      });
      wx.getSystemInfo({
          success: function (res) {
              that.setData({
                  scrollHeight: res.windowHeight
              })
          }
      })
      app.getBookChaptersData(that.data.bookId,function(res){
        that.setData({chapters:res.mixToc.chapters})
        that.processContent()
        if (options.index <= 0) {
            that.setData({ disabledUp: true, disabledNext: false });
        }
        if (options.index >= res.mixToc.chapters.length-1){
            that.setData({ disabledUp: false, disabledNext: true });
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var saveObj = new Object()
    saveObj.contentIndex = this.data.contentIndex
    saveObj.scrollTop = this.data.recordScrollTop
    const key = this.data.bookId
    util.saveData(key,saveObj)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var saveObj = new Object()
    saveObj.contentIndex = this.data.contentIndex
    saveObj.scrollTop = this.data.recordScrollTop
    const key = this.data.bookId
    util.saveData(key, saveObj)
  },

  //记录阅读位置
  scroll:function(e){
      this.setData({
          recordScrollTop: e.detail.scrollTop
      });
  },
  //获取上一章节内容
  upChapter: function(){
      wx.showNavigationBarLoading()
      const contentIndex = --this.data.contentIndex
      if(contentIndex<=0){
        this.setData({ contentIndex: 0, disabledUp:true})
      }else{
        this.setData({contentIndex: contentIndex,disabledUp: false})
      }
      this.setData({
          disabledNext: false,
          content: [],
          scrollTop: 0
      })
      this.processContent()
  },
  //获取下一章节内容
  nextChapter: function(){
      wx.showNavigationBarLoading()
      const index = this.data.chapters.length
      const contentIndex = ++this.data.contentIndex
      if (contentIndex >= index-1) {
          this.setData({ contentIndex: index-1, disabledNext: true })
      } else {
          this.setData({ contentIndex: contentIndex, disabledNext: false })
      }
      this.setData({
          disabledUp: false,
          content: [],
          scrollTop: 0
      })
      this.processContent()
  },
  //菜单显示
  showMenu:function(){
      const showBottom = !this.data.showBottom
      this.setData({
          showBottom: showBottom
      })
  },
  chapterOpen: function (e) {
    var that = this
    this.setData({
      showBottom: false
    })
    wx.redirectTo({
        url: "../list/list?bookId=" + e.currentTarget.dataset.id + "&index=" + that.data.contentIndex
    })
  },
  //处理章节内容
  processContent:function(){
    var that = this
    const contentIndex = this.data.contentIndex
    const contents = this.data.chapters
    app.getBookChapterContact(contents[contentIndex].link,function(res){
        var body = res.chapter.body
        const data = body.replace(/[ ]*/g, "");
        var content = data.split("\n");
        that.setData({ content: content ,loading:false})
        that.setTitle(contents[contentIndex].title)
        wx.hideNavigationBarLoading()
    })
  },

  //设置导航栏Title
  setTitle: function(title){
      wx.setNavigationBarTitle({
          title: title,
      })
  }
})