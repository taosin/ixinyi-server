/*
* @Author: iMocco
* @Date:   2017-03-16 16:57:26
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-16 16:58:01
*/

var utils = {

  /**
   * 从请求里面获取 参数的json格式
   *
   * @param {*} obj
   * @return {Boolean}
   */
   getJson: function (req, params) {
    var body = req.query
    if (body && Object.keys(body).length === 0) {
      body = req.body
    }
    var json = {}
    params.forEach(function (key) {
      if (body && body[key] || body && body[key] === 0) {
        json[key] = body[key]
      }
    })
    return json
  },
  getActivity(qrCodeId){

  },
  /**
   * 从json中获取部分字段
   *
   * @param {*} obj
   * @return {Boolean}
   */
   filterJson: function (json, params) {
    var result = {}
    params.forEach(function (key) {
      if (json && json[key] || json && json[key] === 0) {
        result[key] = json[key]
      }
    })
    return result
  },

  /**
   * 是否是字符串
   *
   * @param {*} obj
   * @return {Boolean}
   */
   isString: function (str) {
    return typeof (str) === 'string'
  },
  
  /**
   * 是否是布尔值
   *
   * @param {*} obj
   * @return {Boolean}
   */
   isBoolean: function (bool) {
    return typeof (bool) === 'boolean'
  },

  /**
   * 是否是数字
   *
   * @param {*} obj
   * @return {Boolean}
   */
   isNumber: function (num) {
    return typeof (num) === 'number' && !isNaN(num)
  },

  /**
   * 是否函数
   *
   * @param {*} obj
   * @return {Boolean}
   */
   isFunc: function (fn) {
    return fn instanceof Function
  },

  /**
   * 是否Generator函数
   *
   * @param {*} function
   * @return {Boolean}
   */
   isGenerator: function (func) {
    return typeof (func === 'function') && (func.constructor.name === 'GeneratorFunction')
  },

  /**
   * 是否数组
   *
   * @param {*} obj
   * @return {Boolean}
   */
   isArray: function (obj) {
    return Array.isArray(obj)
  },

  /**
   * 是否对象
   * for plain JavaScript objects.
   *
   * @param {*} obj
   * @return {Boolean}
   */
   isObject: function (o) {
    return Object.prototype.toString.call(o) === '[object Object]'
  },

  /**
   * 设置不可枚举的类属性
   *
   * @param {Object} obj
   * @param {String} key
   * @param {*} val
   */
   defineProperty: function (obj, key, val) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: false,
      writable: true,
      configurable: true
    })
  },

  timeIfNull70: function (t) {
    if (!t) {
      return new Date(0)
    }else {
      var r = new Date(t)
      r.setHours(r.getHours() + 8)
      return r
    }
  },

  timeIfNullNow: function (t) {
    var r
    if (!t) {
      r = new Date()
    }else {
      r = new Date(t)
    }
    r.setHours(r.getHours() + 8)
    return r
  },
  getEndDate: function (t) {
    var r = new Date(t)
    r.setDate(r.getDate()+ 10)
    r.setHours(r.getHours() + 8)
    return r
  },

  timeIfNullM24: function (t) {
    var r
    if (!t) {
      r = new Date()
    }else {
      r = new Date(t)
    }
    r.setHours(r.getHours() + 8 - 24)
    return r
  },

  formatDate: function (input, format) {
    if (!input || !format) {
      return ''
    }
    input = new Date(new Date(input).getTime() - 8 * 3600 * 1000)
    var date = {
      'M+': input.getMonth() + 1,
      'd+': input.getDate(),
      'h+': input.getHours(),
      'm+': input.getMinutes(),
      's+': input.getSeconds(),
      'q+': Math.floor((input.getMonth() + 3) / 3),
      'S+': input.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (input.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  },

  /**
     * 获取特定的一个时间对象
     *
     * @param {*} int
     * @return {Date}
     */
     timeSpecify: function (year, month, day, hour) {
      var str = '' + month + ' ' + day + ',' + year + ' ' + hour + ':00:00'
      console.info('', str)

      var r = new Date(str)
      return r
    },
  /**
   * 获取字符串是否以一个特定的字符串结尾
   * @param  {str}    需要判定的字符串
   * @param  {endStr} 是否endStr结尾
   * @return {boolean}
   */
   isStringEnd: function (str, endStr) {
    var d = str.length - endStr.length
    return (d >= 0 && str.lastIndexOf(endStr) === d)
  },

  xlsxTimeChange:function(xlsxTime){
    var date = new Date(1900,0,parseInt(xlsxTime)-1)
    var time = date.getFullYear()+'-'
    + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) +'-'
    + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    return time
  }


}

module.exports = utils
