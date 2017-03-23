/*
* @Author: iMocco
* @Date:   2017-03-20 19:06:46
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-23 16:24:33
*/

'use strict';
var http = require('http');
var AV = require('leanengine')
var url = require('url')
module.exports = function (app) {
	// 获取阅读文章
	app.get('/readInfo', function(req, res) {
		var query = new AV.Query('ReadInfo')
		query.descending('createdAt');
		query.find().then(function(results) {
			res.json({
				code:100,
				data:results
			})
		}, function(error) {
			res.json({
				code:101,
				data:error
			})
		});
	})

	// 添加阅读轨迹
	app.post('/addReadInfo', function(req, res) {
		var data = req.body;
		const ReadInfo = AV.Object.extend('ReadInfo');
		const addread = new ReadInfo();
		addread.save({
			title: data.title,
			url: data.url,
			tag: data.tag,
			createTime: data.createTime
		}).then(function(result) {
			res.json({
				code:100,
				data:result
			})
		}, function(error) {
			res.json({
				code:101,
				data:error
			})
		})
	})
	app.get('/getWether', function(reqs, ress) {
		http.get('http://api.avatardata.cn/Weather/Query?key=8d3e011eb3b348d3be3f6309e0ec247a&cityname=上海', function(ress) {
			console.log("Got response: " + ress.statusCode);
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		}); 
	});
}