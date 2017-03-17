/*
* @Author: iMocco
* @Date:   2017-03-16 16:59:33
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-17 10:57:40
*/
'use strict'

var AV = require('leanengine')

class leancloudDao {
	getCount(table){
		return new Promise(function (resolve, reject) {
			const query = new AV.Query(table)
			query.count().then(function (count) {
				resolve(count)
			}, function (error) {
				reject(err)
			})
		}.bind(this))
	}
}
module.exports = new leancloudDao()