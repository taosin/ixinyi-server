/*
* @Author: iMocco
* @Date:   2017-03-16 15:50:43
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-16 15:59:49
*/

'use strict'
var AV = require('leanengine');
module.exports = function (app) {
	app.get('/articles', function(req, res) {
		new AV.Query('Articles').find().then(function(articles) {
			res.json(articles);
		}).catch(function(err) {
			res.status(500).json({
				error: err.message
			});
		});
	});
}