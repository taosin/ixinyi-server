/*
* @Author: iMocco
* @Date:   2017-03-16 15:50:43
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-17 15:31:05
*/

var AV = require('leanengine')
var articleService = require('../service/articleService')
module.exports = function (app) {

	// 获取文章总数
	app.get('/articlesCount', function(req, res) {
		var query = new AV.Query('Articles')
		query.count().then(function (count) {
			res.json({
				code:100,
				data:count
			})
		}, function (error) {
			res.json({
				code:101,
				data:error
			})
		})
	})
	// 获取文章
	app.get('/articles', function(req, res) {
		var start = req.query.start
		var limit = req.query.limit
		var query = new AV.Query('Articles')
		query.descending('createdAt')
		query.limit(limit?limit:5); 
		query.skip(start?start:0);
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
		})
	})
	// 添加文章
	app.post('/article', function(req, res) {
		var data = req.body;
		console.log(data);
		const Article = AV.Object.extend('Articles');
		const addarticle = new Article();
		addarticle.save({
			title: data.title,
			content: data.content,
			tag: data.tag,
			state: data.state
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
}