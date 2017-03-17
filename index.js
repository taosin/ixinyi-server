/*
* @Author: iMocco
* @Date:   2017-03-16 
* @Last Modified by:   iMocco
* @Last Modified time: 2017-03-17 14:51:36
*/
'use strict';
var express = require('express')
var app = express();
var Server = require('./server');
var authority = require('./filter/authority')
require('./controllers/routes')(app);
var appServer = new Server(app);
app.use(authority.setCrossDomain)
appServer.start();