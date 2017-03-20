/*
* @Author: iMocco
* @Date:   2017-03-17 14:47:20
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-20 17:38:36
*/
 
'use strict'
// 映射模型
var checkurls = new Map()
// 哪些url不需要验证
var terminal = ['Macintosh', 'Windows', 'iPhone', 'Linux']

var filter = {
  setCrossDomain: function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*')
    res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since')
    res.append('Access-Control-Allow-Credentials', 'true')
    res.append('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
    res.append('X-Powered-By', '3.2.1')
    res.append('Content-Type', 'application/json;charset=utf-8')
    next()
  }
}

module.exports = filter
