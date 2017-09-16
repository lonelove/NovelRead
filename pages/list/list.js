 
 var app = getApp()

 Page({
 
   /**
    * 页面的初始数据
    */
  data: {
     loading: true,               //页面加载
     bookId:"",
     chapters:[],
     scrollHeight: 0,
     scrollTop: 0, 
     index: 0,
     changeColor: 0
   },
 
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     var that = this
     this.setData({ bookId: options.bookId, index: options.index, changeColor: options.index })
     console.log(that.data.bookId)
     wx.getSystemInfo({
         success: function (res) {
             that.setData({
                 scrollHeight: res.windowHeight,
                 scrollTop: that.data.index * 40 - res.windowHeight/2
             })
         }
     })
    app.getBookChaptersData(that.data.bookId,function(res){
        that.setData({ chapters: res.mixToc.chapters })
        that.setData({ loading: false })
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
     
   },
 
   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
     
   },
   //获取章节数
   readBook:function(e){
       var that = this
       this.setData({ changeColor: e.currentTarget.id})
       wx.redirectTo({
           url: '../chapter/chapter?b_id=' + that.data.bookId + "&index=" + e.currentTarget.id + "&top=0",
       })
   },
 })