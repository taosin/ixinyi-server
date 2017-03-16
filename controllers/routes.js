/*
* @Author: iMocco
* @Date:   2017-03-16 15:48:57
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-16 15:50:25
*/

var articleRoutes = require('./articleRoutes');
module.exports = function (app) {
	articleRoutes(app);
}