/*
* @Author: iMocco
* @Date:   2017-03-16 15:48:57
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-20 19:07:36
*/

var articleRoutes = require('./articleRoutes')
var readInfoRoutes = require('./readInfoRoutes')
module.exports = function (app) {
	articleRoutes(app)
	readInfoRoutes(app)

}