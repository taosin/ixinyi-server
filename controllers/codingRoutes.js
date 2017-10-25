/*
* @Author: iMocco
* @Date:   2017-06-23 13:50:10
* @Last Modified by:   iMocco
* @Last Modified time: 2017-06-26 10:48:15
*/

'use strict';
var http = require('http');
var AV = require('leanengine')
var url = require('url')
var https = require('https');
var querystring = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
module.exports = function (app) {

	// 获取冒泡列表
	app.get('/getPao', function(req, res) {
		var time = new Date().getTime()
		https.get('https://coding.net/api/social/tweet/public_tweets?sort=time&last_time='+ time +'&size=10&filter=true', function(ress){
			var str = [];
			ress.on('data', function (chunk) {
				str += chunk
				// var id = result.data[0].id
				// var data = querystring.stringify({});
				// var options = {
				// 	host: 'coding.net',
				// 	path:'/api/social/tweet/'+ id +'/like',
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/x-www-form-urlencoded',
				// 		'Cookie':'sid=fb54a6bf-2af9-4ab7-9ccd-68ea3b1f91sd'
				// 	}
				// };
				// var reqq = https.request(options, function(resss) {
				// 	resss.setEncoding('utf8');
				// 	resss.on('data', function (chunk) {
				// 		str.push(id);
				// 		res.json({
				// 			result: {
				// 				code:100,
				// 				data:str
				// 			}
				// 		})
				// 	});
				// 	resss.on('end',function(chunk){
				// 		// console.log("end: " + chunk);
				// 	})
				// });
				// // reqq.write(data);
				// reqq.end();
			});
			ress.on('end', function () {
				var result = JSON.parse(str)
				console.log('result:',result);
				res.json({
					result:result
				})
			});
			console.log('str2:',str);
		});
	})

	// 登录
	app.post('/loginCoding', function(req, res) {
		var data = querystring.stringify({
			account:"18512115504",
			password:"2fd0da67cf3343c3f360c280be1d0a241d7c072e"
		});
		var options = {
			host: 'coding.net',
			path:'/api/v2/account/login',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cookie':'sid=fb54a6bf-2af9-4ab7-9ccd-68ea3b1f91sd'
			}
		};
		var reqq = https.request(options, function(ress) {
			ress.setEncoding('utf8');
			ress.on('data', function (chunk) {
				res.json({
					result: JSON.parse(chunk)
				})
			});
			ress.on('end',function(chunk){
				console.log("body: " + chunk);
			})
		});
		reqq.write(data);
		reqq.end();
	})

	// 发送冒泡
	app.post('/tweet', function(req, res) {
		var data = querystring.stringify({
			content:"#早安# 你好！世界"
		});
		var options = {
			host: 'coding.net',
			path:'/api/social/tweet',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		var reqq = https.request(options, function(ress) {
			ress.setEncoding('utf8');
			ress.on('data', function (chunk) {
				res.json({
					result: JSON.parse(chunk)
				})
			});
			ress.on('end',function(chunk){
				console.log("body: " + chunk);
			})
		});
		reqq.write(data);
		reqq.end();
	})

	app.get('/spider', function(req, res) {
		request('http://wufazhuce.com', function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);
				var cat = $('img.fp-one-imagen')['0'].attribs.src
				var text = $('.fp-one-cita a')[0].children[0].data
				console.log(text);
				res.json({
					src: cat
				});
			}
		})
	});
}