
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,               //页面加载
    male:null,
    female:null,
    details:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this
        app.getClassifyData(function (res) {
            that.setData({ male: res.data.male, female: res.data.female })
            that.setData({ loading: false })
        }) 
        app.getSubClassifyData(function (res){
            var result = {
                male:res.data.male,
                female:res.data.female
            }
            that.setData({ details: result })
            that.setData({ loading: false })
        })
  },
  btnClick: function(e){
        var name = e.target.dataset.name
        var detail = e.target.dataset.detail
        var male = this.data.details.male
        var female = this.data.details.female
        console.log(name+' '+detail)
        if(detail == "male"){
            for(var i=0;i<male.length;i++){
                if(name == male[i].major)
                {
                    console.log(male[i].mins)
                    wx.navigateTo({
                        url: '../details/details?gender=male&major='+name+'&mins='+male[i].mins,
                    })
                }
            }
        }else{
            for (var i = 0; i < female.length; i++) {
                if (name == female[i].major) {
                    console.log(female[i].mins)
                    wx.navigateTo({
                        url: '../details/details?gender=female&major=' + name + '&mins=' + female[i].mins,
                    })
                }
            }
        }
  }
})