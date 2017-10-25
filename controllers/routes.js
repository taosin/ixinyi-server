/*
* @Author: iMocco
* @Date:   2017-03-16 15:48:57
* @Last Modified by:   iMocco
* @Last Modified time: 2017-06-23 13:51:37
*/

var articleRoutes = require('./articleRoutes')
var readInfoRoutes = require('./readInfoRoutes')
var codingRoutes = require('./codingRoutes')
module.exports = function (app) {
	articleRoutes(app)
	readInfoRoutes(app)
	codingRoutes(app)
}