
const bookKey = "books"

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function saveData(key, obj) {
  wx.setStorage({
    key: key,
    data: obj,
  })
}
function getBooks(){
    try {
        var books = wx.getStorageSync(bookKey)
        if (!books) {
            books = []
        }
        return books
    } catch (e) {
        // Do something when catch error
        return []
    }
    
}
function saveBook(book){
    console.log(book)
    var books = getBooks()
    console.log(books)
    var saveBook = new Object()
    saveBook.id = book._id
    saveBook.cover = book.cover
    saveBook.title = book.title
    //每次添加在数组最后
    //books.push(saveBook)
    //每次添加在数组最前
    books.unshift(saveBook)
    saveData(bookKey,books)
}
function removeBook(id){  
    var books = getBooks()
    for(var i =0 ;i < books.length;i++){
        if(id == books[i].id){
            books.splice(i,1);
            saveData(bookKey,books)
            return;
        }
    }
}
function hasSaveBook(id){
    var books = getBooks()
    for(var i = 0;i < books.length;i++){
        if(id == books[i].id){
            return true
        }
    }
    return false
}

module.exports = {
  formatTime: formatTime,
  saveData: saveData,
  getBooks:getBooks,
  saveBook:saveBook,
  removeBook:removeBook,
  hasSaveBook: hasSaveBook
}