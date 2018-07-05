// pages/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  /**
   * 组件的过滤器
   */
  filter:{

  },
  /**
   * 组件的初始数据
   */
  data: {
    "dataList": [
      {
        "id": 1,
        "date":"2018-7-2",
        "hostpital":"协和",
        "labels":['没救了','等死吧'],
        "image": ["wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png"],
        "desc":"",
        "name": "hehe"
      },
      {
        "id": 2,
        "date": "2018-7-2",
        "hostpital": "协和",
        "labels": ['没救了', '等死吧', '等死吧', '等死吧', '等死吧', '等死吧'],
        "image": ["wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png", 
          "wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png",
          "wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png",
          "wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png",
          "wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png",
          "wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png","wx47b749cba8fbf848.o6zAJs02Jqfu9-EImOJB5CzBm7Bk.2fJR8miilADO9f0fcea8ddc30fac53c258007b9536a8.png"] ,
        "desc": "描述内容描述内容描述内",
        "name": "hehe"
      },
    ],
    "id":0,
    "temp":3
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add(){
      
      this.dataList.push();
    }
  }
})
