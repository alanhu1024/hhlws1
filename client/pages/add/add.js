Page({

  /**
   * 页面的初始数据
   */
  data: {
    illdate: "日期",
    imagepathList: [],
    scrollLeft: 0
  },
  //多张图片上传
  uploadimg: function (data) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    var that = this
    var i=data.i?data.i:0//当前上传的哪张图片
    var success=data.success?data.success:0//上传成功的个数
    var fail=data.fail?data.fail:0;//上传失败的个数
    wx.uploadFile({
          url: data.url, 
          filePath: data.path[i],
          header:{
            'content-type': 'multipart/form-data'
          },
          name: 'addImage',//这里根据自己的实际情况改
          formData:null,//这里是上传图片时一起上传的数据
          success: (resp) => {
            success++;//图片上传成功，图片上传成功的变量+1
            console.log(resp)
            // console.log(i);
            //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
          },
          fail: (res) => {
            fail++;//图片上传失败，图片上传失败的变量+1
            console.log(res)
            console.log('fail:'+i+"fail:"+fail);
          },
          complete: () => {
            console.log("图片："+i);
            i++;//这个图片执行完上传后，开始上传下一张
            if(i==data.path.length){   //当图片传完时，停止调用          
                console.log('执行完毕');
                console.log('成功：'+success+" 失败："+fail);
            }else{//若图片还没有传完，则继续调用函数
                console.log(i);
                data.i=i;
                data.success=success;
                data.fail=fail;
                that.uploadimg(data);
            }
            wx.hideToast()   
          }
      })
  },
  addImage: function (e) {
    // why that?*
    var that = this;
    var imagePaths = that.data.imagepathList
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // var newpath = that.getObjectValues(tempFilePaths)
        for(var k in tempFilePaths){
          imagePaths.push(tempFilePaths[k])
        }
        that.uploadimg({
          url: "http://127.0.0.1:5000/uploadImage",
          path: tempFilePaths
        })
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          imagepathList: imagePaths
        })
        that.pageScrollToBottom()
      }
    })
  },
  previewImage: function(e) {
    var that = this
    //获取当前图片的下表
    var index = e.currentTarget.dataset.index
    //数据源
    var pictures = that.data.imagepathList
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },
  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function() {
    var that = this
    wx.createSelectorQuery().select('.scroll-view_H').boundingClientRect(function(rect){
      that.setData({
        scrollLeft: rect.right
      })
    }).exec()
  },

  formSubmit: function (e) {
    var that = this
    // that.uploadimg({
    //   url: "http://127.0.0.1:5000/addCard",
    //   path: that.data.imagepathList
    // })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(typeof e.detail.value)
    wx.request({
      url: "http://127.0.0.1:5000/index",
      method: 'POST',
      data: e.detail.value,
      header: {
        //设置参数内容类型为json
        // 'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/json'
        // 'Accept': 'application/json'
      },
      success: function (res) {
        // console.log(res)
        wx.navigateBack({
          delta: 2
        })
      }
    })
    // wx.uploadFile({
    //   url: "http://127.0.0.1:5000/addCard",
    //   filePath: imagepathList,
    //   name: 'file',
    // })
  },

  formReset: function (e) { 
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },

  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      illdate: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currDate = new Date()
    var str_currdate = currDate.toLocaleDateString()
    str_currdate = str_currdate.replace(/\//g,"-")
    this.setData({
      illdate: str_currdate
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
    wx.reLaunch({
      url: "../index/index"
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})