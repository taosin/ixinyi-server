/*
* @Author: iMocco
* @Date:   2017-03-16 17:46:23
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-17 14:22:33
*/
'use strict'
var co = require('co')
var AV = require('leanengine')
var leancloudDao = require('../storage/leancloudDao')

class ArticleService{
	getCount (json){
		return new Promise(function (resolve, reject) {
			const query = new AV.Query('Articles')
			query.count().then(function (count) {
				resolve(count)
			}, function (error) {
				reject(error)
			})
		})
	}
}
module.exports = new ArticleService()