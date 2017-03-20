/*
* @Author: iMocco
* @Date:   2017-03-20 19:06:46
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-20 19:08:41
*/

'use strict';
var AV = require('leanengine')
module.exports = function (app) {

	// 获取阅读文章
	app.get('/readInfo', function(req, res) {
		var query = new AV.Query('ReadInfo')
		const query = new AV.Query('ReadInfo');
		query.descending('createdAt');
		query.find().then(function(results) {
			res.json({
				code:100,
				data:count
			})
		}, function(error) {
			res.json({
				code:101,
				data:error
			})
		});
	})
}