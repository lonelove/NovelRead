//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    id:"",
    books:[],
    modalHidden: true,
  },
  //页面加载
  onLoad: function (options) {
    this.setData({
        books: util.getBooks()
    });
  }, 
  //页面显示
  onShow: function () {
      var books = util.getBooks();
      this.setData({
          books: books
      });
  },
  //readBook
  readBook: function(e){
    //   console.log(e.currentTarget.dataset.id)
      if (this.data.modalHidden){
        var id = e.currentTarget.dataset.id;
        var value = wx.getStorageSync(id);
        wx.navigateTo({
              url: '../chapter/chapter?b_id=' + id + "&index=" + value.contentIndex + "&top=" + value.scrollTop,
        });
      }
  },
  //open model
  openModel: function(e){
      this.setData({
          id: e.currentTarget.dataset.id,
          modalHidden: false
      });
  },
  //remove
  remove: function (e) {
      this.removeBook(this.data.id)
      util.removeBook(this.data.id)
  },
  //close model
  cancel: function (e) {
      this.setData({
          modalHidden: true
      });
  },
  //remove book
  removeBook: function(id){
    var books = this.data.books;
    for (var i = 0; i < books.length;i++){
        if(id == books[i].id){
            books.splice(i,1);
            this.setData({
                books:books,
                modalHidden: true
            })
            return ;
        }
    }
  },
})
